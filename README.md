

### 依赖环境
1. nodejs v6.1.0
 * [官网](https://nodejs.org/en/)下载nodejs安装包。
1. npm 3.8.6
 * Windows下安装nodejs会自带npm，部分Linux发行版的包管理工具会把nodejs与npm拆分成两个安装包。
 * 安装完成之后执行如下命令 ```echo "registry=https://registry.npm.taobao.org" >> $YOUR_HOME/.npmrc```，(YOUR_HOME为当前用户家目录，如果是Windows系统，则类似“C:\Users\lenovo”)
 * 分别执行如下命令检查nodejs与npm是否安装成功。如果安装正确，会看到对应的版本号显示。
    ```shell
    node -v

    npm -v

    ```
1. gulp 3.9.1
 * 安装完成nodejs环境之后，执行命令:
    ```shell
    # 如果是Linux系统，则需要sudo权限。
    npm install -g gulp bower
    ```
  * 等待安装过程完成。
  * 执行命令如下检查gulp是否安装成功。
  ```shell
  gulp -v

  bower -v
  ```

1. 从git或者svn中签出代码到本地。
  ```shell
    git checkout https://xxxxx.com/xxx.git

    svn co https://xxxxx.com/xxx
  ```
1. 进入项目根目录,依次执行以下命令。
  ```shell

  npm install

  bower install

  ```

1. 等待安装完成。

1. 如果安装成功则可以继续下一步了。


### 开发

1. 完成安装依赖环境以后就可以进入开发调试状态了，只要执行如下命令。
  ```shell
    gulp serve
  ```
1. 按照项目预设的工程结构进行业务开发即可。

### 项目构建

1. 项目构建在完成依赖环境安装只有可以进行，在项目根目录执行如下命令。
  ```shell
  gulp clean

  gulp build
  ```

1. 构建成功之后再项目根目录下会生成```dist```文件夹。将整个文件夹打包拷贝至web容器中即可完成发布工作。



### 部署

1. 在nginx配置文件中添加如下配置。
    ```conf
      location /ring/grops {
      root /srv/www/;
    }

    ```

1. 在 `/srv/www/` 路径下做如下配置。
    ```shell
    .
    └── ring
        └── grops -> /home/frontend/gongren-ops/dist/

    # grops 文件夹内的内容为当前项目构建成功之后的dist文件夹下的内容。

    ```
