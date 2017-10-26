// router
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './vuex/store.js'

import home from './components/Common/home.vue'
//位置服务
import monitor from 'components/Trailer/MTM/Monitor.vue'
import historical_route from 'components/Trailer/MTM/historical_route.vue'
//胎压监控
import TireTrack from './components/Trailer/TireTrack.vue'
import TireTemAlarm from './components/Trailer/TireTemAlarm.vue'
//报警报表
import fatigueDrivingAlarm from './components/Trailer/fatigueDrivingAlarm.vue'
import speedAlarm from './components/Trailer/speedAlarm.vue'
import DeviceAlarm from './components/Trailer/deviceOffline.vue'
import stopAlarm from './components/Trailer/stopAlarm.vue'
import lowBatteryAlarm from './components/Trailer/lowBatteryAlarm.vue'
//管理员
import user from './components/Common/user.vue'
import juese from './components/Common/juese.vue'
import vehicalmanage from './components/Trailer/vehicalManage.vue'
import equipment from './components/Common/Equipment-manage.vue'
import companyManage from './components/Common/companyManage.vue'
import sim from './components/Common/SIM-manage.vue'
import driver from './components/Common/driver.vue'
import motorcade from './components/Common/motorcade.vue'


//报表分析
import licheng from './components/Common/licheng.vue'
import xingshi from './components/Common/xingshi.vue'
import xiaolv from './components/Common/xiaolv.vue'
import lishiguiji from './components/Common/lishiguiji.vue'
import park from './components/Common/park.vue'
import xingshixiang from './components/Common/xingshixiang.vue'
import lichengxiang from './components/Common/lichengxiang.vue'
//接甩挂分析
import TrailerReport from './components/Trailer/TrailerReport.vue'
//报警设置
import alarmconfiggather from './components/Common/AlarmConfigGather.vue'
//消息中心
import systemInfo from './components/Common/systemInfo.vue'
import event from './components/Common/event.vue'

//温度监控
import temperatureCurve from './components/CCl/temperatureCurve.vue'
import temperatureAlarm from './components/CCl/temperatureAlarm.vue'
import sensorConfig from './components/CCl/sensorConfig.vue'
import alarmConfig from './components/CCl/alarmConfig.vue'

//智能电子锁
import remoteUnlock from'./components/EL/remoteUnlock.vue'
import UnlockConfig from'./components/EL/UnlockConfig.vue'
import switchLock from'./components/EL/switchLock.vue'
import abnormal from'./components/EL/abnormal.vue'
import changePassword from'./components/EL/changePassword.vue'

//油耗分析
import OilWear from'./components/FM/OilWear.vue'
import OilBoxConfig from'./components/FM/OilBoxConfig.vue'

Vue.use(VueRouter)
import index from './index'

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   render: h => h(App)
// })
// 0. 如果使用模块化机制编程， 要调用 Vue.use(VueRouter)

// 1. 定义（路由）组件。
// 可以从其他文件 import 进来
// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点在讨论嵌套路由。
const routes = [
	{ name:"home", path: '/',component: home},
	//位置服务
	{ name:"monitor", path: '/monitor', component: monitor},
	{ name:"historical_route", path: '/historical_route', component: historical_route},
	//胎压监控
	{ path: '/TireTrack',component:TireTrack },
	{ path: '/TireTemAlarm',component:TireTemAlarm },
	//报警报表
	{ path: '/fatigueDrivingAlarm',component:fatigueDrivingAlarm},
	{ path:'/speedAlarm',component:speedAlarm},
	{ path:'/DeviceAlarm', component:DeviceAlarm},
	{ path:'/stopAlarm', component:stopAlarm},
  { path:'/lowBatteryAlarm', component:lowBatteryAlarm},
	//管理员
	{ name:"vehicalmanage", path:'/vehicalManage',component:vehicalmanage},
	{ path: '/user',component: user},
	{ path: '/juese',component:juese},
	{ path: '/companyManage',component:companyManage},
	{ path: '/sim',component:sim},
	{ path: '/driver',component:driver},
	{ path:'/motorcade',component:motorcade},

	{ path: '/equipment',component:equipment},
	//报表分析
	{ path: '/licheng',component: licheng},
	{ path: '/xingshi',component: xingshi},
	{ path: '/xiaolv',component: xiaolv},
	{ path: '/lishiguiji',component: lishiguiji},
	{ path: '/xingshixiang',component:xingshixiang},
	{ path: '/lichengxiang',component:lichengxiang},
	{ path: '/park',component: park},
	//消息中心
	{ path: '/systemInfo',component:systemInfo},
	{ name:"event", path: '/event',component:event},
	//报警设置
	{ path: '/alarmconfiggather',component:alarmconfiggather},
	//接甩挂分析
    { path:'/TrailerReport',component:TrailerReport},
	//温度监控
	{ path:'/temperatureCurve',component:temperatureCurve},
	{ path:'/temperatureAlarm',component:temperatureAlarm},
  { path:'/sensorConfig',component:sensorConfig},
  { path:'/alarmConfig',component:alarmConfig},
  //智能电子锁
  {name:"remoteUnlock", path:'/remoteUnlock',component:remoteUnlock},
  {name:"UnlockConfig", path:'/UnlockConfig',component:UnlockConfig},
  { path:'/switchLock',component:switchLock},
  { path:'/abnormal',component:abnormal},
  { path:'/changePassword',component:changePassword},
	//油耗分析
	{ path:'/OilWear',component:OilWear},
	{ path:'/OilBoxConfig',component:OilBoxConfig},
]


// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
	mode: 'hash',
	hashbang: true,
	routes // （缩写）相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
	 store,
	router,
	render: h => h(index)
}).$mount('#app')

// 现在，应用已经启动了！
//router.push('/')
