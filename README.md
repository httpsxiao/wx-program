# wx-program
wechat miniprogram -- Movie Information System

原生微信小程序实现电影网站，实现电影信息排名，搜索，留言，其他等一些功能。

## 学习心得: 

#### 1. 小程序组件

小程序自从 1.6.3 版本之后开始支持组件化编程，每个组件和页面一样，也是由 js、json、wxml、wxss 组成，只是其中的 js 调用的 api 是`Component`，不是`Page`。

*以 A 页面使用 B 组件为例*

B 组件的 js 文件在属性`properties`可以设置 A 页面传来的参数；还可以在事件中调用方法`triggerEvent`来触发 A 页面的事件。更多属性可查看 [微信小程序组件属性](APIhttps://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/component.html)

``` html
<--  B.wxml -->

<view data-key="value" bindtap="bEvent">{{Object.text}}</view>

<--  data-key 用于事件传参，不能直接写在bEvent中 -->
```
	
	
``` javascript
// B.js
	
Component({
	properties: {
		AData: { // A页面传过来的数据
			type: Object,
			value: {}, // 默认值
			observer: (newData, oldData) => {}
		}
	},
	methods: {
		bEvent(event) {
			// 触发 A 中事件，并向其中传参
			this.triggerEvent('aEvent', {value: event.currentTarget.dataset.key})
		}
	}
})
```

A 页面需要修改在 js，json，wxml 文件使用B，json文件中`usingComponents`值B组件的路径，名字自定义用于在 wxml 中引用

``` json
{
  "usingComponents": {
    "B": "/components/B/B"
  }
}
```

``` wxml
<B AData="{ text: '我是A中的数据' }" bind:aEvent="myEvent"></B>
```

``` javascript
Page({
	myEvent (eventDetail) {
		console.log(eventDetail.detail.value) // 传过来的事件参数
	}
})
```





