#!/bin/bash
#
# local_env= pwd

function init_env(){
    if [ ! -d bower_components ]; then
        bower install
    fi
    if [ ! -d node_modules ]; then
        npm  install
    fi
}

function re_init_env(){
    if [ -d bower_components ]; then
          rm -rf ./bower_components
    elif [ -d node_modules ]; then
      rm -rf node_modules
    fi
    bower install
    npm  install
}

function git_branch_checkout(){
  local l_branch="master"
  if [ $1 ]; then
    l_branch=$1
  fi

  if ! git branch --no-column | grep "^\*\s*$l_branch$" 1> /dev/null
  then
    git stash save --include-untracked
    git checkout $l_branch
  fi
}

function git_fetch_all_and_pull(){
  if git status -z 1> /dev/null
  then
    git stash save --include-untracked
  fi
  git pull -f
}

function build_dist(){
  init_env
  git_branch_checkout
  git_fetch_all_and_pull
  gulp build
}


function package(){

    tar_name=gropsxs-`date '+%Y-%m-%d-%H-%M-%S'`.tar.gz
    if [ -d ./dist ]; then
        cp -r dist gropsxs
        tar -czf $tar_name  gropsxs
        rm -rf gropsxs
    fi
    if [ -d /home/frontend/release ]; then 
        ls /home/frontend/release/tar_name
    fi
}

build_dist

case $1 in
    package  )
        package ;;
esac
