# @frame/mylib

使用UI [ANTD2.X](http://2x.ant.design/docs/react/introduce)

这是一个简单的组件库项目

## 安装

###第一步，手动向package.json devDependencies中添加
``` sh

"@frame/mylib":"git+http://private:yitu8.cn@gitlab.dev.io.yitu8.net/dev/front/yitu8_web_frame/mylib.git#master"

```
**注:** 根据npm install 协议添加 git项目为npm私有库. 详情[npm 安装 git 仓库的协议](https://www.cnblogs.com/dreamless/p/8616670.html)

###第二步
``` sh
npm install @frame/mylib

```





### 项目开发流程
- npm install
- npm start
- http://localhost:3000
- 
### 简单使用
``` javascript
import {UpFile} from '@frame/mylib';
<UpFile
 />
```

### 包含项目
``` javascript
module.exports = {
    AreaSelect,//区域选择
    Layout,//item布局
    ModalBase,//模态框
    UpFile,//上传文件
    Utils:Utils,//工具包
}
```


### Layout API说明
使用：布局input upfile select等组件，交收集数据

``` javascript
 <Layout/>
```
| 属性                                |                   类型                   | 描述                           |
| --------------------------------------- | :--------------------------------------: | :--------------------------------------- |
| colCount                                |           number (default 4)           | Layout而已显示列数，行数为自动（例5条数据列2，显示3行，以重左向右，重向至下顺序显示）               |
| parameterArr                                   |                  array(default [])                  |Layout数据源，数据源属性说明，详见Layout.Item说明 |
| formItemLayout                                  |                  Object (default formItemLayout:{labelCol: {span: 8},wrapperCol: {span: 16, offset: 0}, })   | 每一个子Item布局样式,详见Layout. formItemLayout ，假如其中有Item样式不满足于通用样式，可以子Item中配置formItemLayout 属性|
### Layout.formItemLayout API说明

| 属性                                |                   类型                   | 描述                           |
| --------------------------------------- | :--------------------------------------: | :--------------------------------------- |
| labelCol                                |           number or object           | 左侧格栅数        |
| wrapperCol                                   |                  number or object |右侧左侧格栅数  |

### Layout.Item API说明


| 属性                                |                   类型                   | 描述                           |
| --------------------------------------- | :--------------------------------------: | :--------------------------------------- |
| type                                    | string           | Item显示类型 每一个类型说明，详见Layout.Item.*      |
| ver                                     |bool|是否验证Item   |
| reg                                    |  reg or function           | 当ver:true时，验证的条件 reg:正则表达式 例：reg: /^\S{1,5}$/      或函数function:(value)=>{return bool}|
| verMessage                                     | string | 错误信息提示，当ver验证不通过时，提示文案 例：最少输入5个字符 |
| required                                     | bool | 是否为必填项目，当required:true 采集数据时，必须填写  |
| field                                     | string | 提交数据时，显示字段名 |
| option                                     | object | 每一个Item的props信息 |
| data                                     | array | 当Item包含数据集时，填充数据 |
| component                                     | Component | 扩展一个新的Item到Layout中 |
| apiConfig                                     | object | 当apiConfig存在时，代理请求服务数据，到data对像|
| apiConfig.apiType                                     | string | 代理请求类型 可选值  post get put delete|
| apiConfig.url                                    | string | 请求地址|
| apiConfig.param                                    | param | 请求参数 例：{id:1}|
### Layout.Item.Input API说明
| 属性                                |                   类型                   | 描述                           |
| --------------------------------------- | :--------------------------------------: | :--------------------------------------- 
| option                                   |                  object |所有参数，详见 [antd input](http://2x.ant.design/components/input/)|
### Layout.Item.TextArea API说明
| 属性                                |                   类型                   | 描述                           |
| --------------------------------------- | :--------------------------------------: | :--------------------------------------- 
| option                                   |                  object |所有参数，详见 [antd input](http://2x.ant.design/components/input/)|
### Layout.Item.InputNumber API说明
| 属性                                |                   类型                   | 描述                           |
| --------------------------------------- | :--------------------------------------: | :--------------------------------------- 
| option                                   |                  object |所有参数，详见 [antd InputNumber](http://2x.ant.design/components/input-number/)|
### Layout.Item.AreaSelect API说明
| 属性                                |                   类型                   | 描述                           |
| --------------------------------------- | :--------------------------------------: | :--------------------------------------- 
| option                                   |         object         |没有编写|
### Layout.Item.Select API说明

| 属性                                |                   类型                   | 描述                           |
| --------------------------------------- | :--------------------------------------: | :--------------------------------------- |
| selectType                                |           string | 可选值:title 收集数据为：data[0].title 男 可选值: value 收集数据为：data[0].value 0       |
| data                                   |                  array |下拉数据显示值[ {title:"男",value:"0"}]  |
| option.defaultValue                                   |                  object |当 selectType:"title"时 {key:"0",title:"男"}      当 selectType:"value"时 {key:"0",value:"0"}|
| option                                   |                  object |所有参数，详见 [antd select](http://2x.ant.design/components/select/)|


### Layout.Item.UpFile API说明
可单独使用(import {UpFile} from "@frame/mylib")

| 属性                                |                   类型                   | 描述                           |
| --------------------------------------- | :--------------------------------------: | :--------------------------------------- 
| fileList                                   |                  array[string] |默认文件地址列表 例：["http://1.png","http://2.mp4"]|
| size                                   |                number (default 1024 * 1024 * 2) 2MB |文件上传大小，单字：字节|
| thumbSize                                   |                object (default{width:100,height:100}) |文件缩略图大小|
| max                                   |                number (default 9 )|文件上传数量限制|
| rcUpload                                   | object|文件上传回调限制 详见：[rc-upload](http://github.com/react-component/upload)|
| rcUpload.accept                                   | string|文件类型限制 例：上传图片类型 image/* 所有类型：\*/\*|
| item.uploadIngView                                   | function(file)=>{return div}|可自定义上传样式,上传中模板|
| item.doneView                                   | function(file)=>{return div}|可自定义上传样式,上传完成模板|
| item.downIngView                                   | function(file)=>{return div}|可自定义上传样式,资源下载中模板|
| item.uploadButtonView                                   | function(file)=>{return div}|可自定义上传样式,上传按钮模板|
| item.getContentView                                   | function(file)=>{return div}|可自定义上传样式,此模板，包含所有模板，高级配置|

### ModalBase API说明
使用：弹出一个模态框，用于辅助Layout

``` javascript
let MB = new ModalBase();
MB.show(option,props,apiConfig)
```
| 属性                                |                   类型                   | 描述                           |
| --------------------------------------- | :--------------------------------------: | :--------------------------------------- 
| option.title                                   |                  string |模态框标题|
| option.okTitle                                   |                  string |模态框确定按钮文字 无值不显示|
| option.closeTitle                                   |                  string |模态框取消按钮文字 无值不显示|
| option.maskClosable                                   |                  bool (default false) |点击模态框背景是否关闭|
| props                                   |                object |属性中传到Layout布局，详情请查看[Layout API]()|
| apiConfig.beforeSubmit                                   |                function (default null) |API执行之前回function(parameter)=>{}回调|
| apiConfig.otherParam                                   |                object |额外参数配置 例:{appid:xxx} 将会被组装数据提交|
| apiConfig.apiType                                     | string | 代理请求类型 可选值  post get put delete|
| apiConfig.url                                    | string | 请求地址|


### License
ISC
