/**
 * Created by DELL on 2017/6/17.
 */

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
//数据  页面调用方法  this.$store.state.count
const state = {
	//开发测试数据
	FUserName:"admin",
	FTokenID:"a4bfdec1-6734-4203-b7cb-e2d1f1b2be27",
	FShortName:"长沙五六联盟",
	FAgentGUID:"39398d49-955e-478f-8ec6-7af21a0a1c48",

	//上线数据清空
	//FUserName:null,
	//FTokenID:null,
	//FShortName:null,
	//FAgentGUID:null,

	FUserInterfaceAddress:"http://cloud.jointcontrols.cn:56080",
	allCarsList: [],     //原始数据
	allLockList:null,
	allCarsData:null,    //分析后数据
    allCarTeam:null,     //车队数据
 	mapLocksData:[],     //电子锁数据 (实时监控/轨迹回放 列表)
 	allLocksData:[],     //电子锁数据 (其他页面)
	noLockVehicle:[],    //无锁车辆数据
	choiceSystemID:null, //所选择系统信息
	remoteUnlockLimits:0, //远程开锁权限  0无开锁权限 1有开锁权限
	language:'CN',       //全局语言类型  CN 中文  EN 英文
 	globalMapType :0,    //全局地图类型  0百度地图 1谷歌地图
  	mapType :0 ,         //地图页面  地图类型   0百度地图 1谷歌地图
	LowPowerThreshold:10  //全局低电量阈值  单位%  小于等于此阈值的  文字标红  class='text-red'
};

//方法 页面调用方法  this.$store.commit('changeTokenID',"parameters")
const mutations={
	changeTokenID: (state,id) => state.FTokenID=id,
	changeUserName: (state,userName) => state.FUserName=userName,
	changeInterfaceAddress: (state,address) => state.FUserInterfaceAddress=address,
	changeShortName: (state,data) => state.FShortName=data,
	changeAgentGUID: (state,data) => state.FAgentGUID=data,
	goLogin: (state) => {
		window.name="";			//清除登录信息
		sessionStorage.clear();     //清除本地数据
		window.location.href = state.FUserInterfaceAddress
	},
	getAllCarsData: (state, callback) => {
		let lockObj=new Object(); //绑定车辆的锁容器
		let lockArr=[];           //未绑定车辆的锁容器
		let vehicleIDArr=[];      //绑定车辆的ID数组容器
		if(state.choiceSystemID==2){
			let lockPostData={
				FTokenID: state.FTokenID,
				FAction: "QueryLBSAssetListByFUserGUID",
				FVersion: "1.0.0"
			};
			//电子锁系统下 先请求锁数据 （同步请求）
			$.ajax({
				url: "/web/Lock/Lock_LBS",
				cache: false,
				async: false,
				type: 'Post',
				dataType: 'json',
				contentType: 'application/json;charset=utf-8',
				global: false,
				data:JSON.stringify(lockPostData),
				success: function (res) {
					console.log("电子锁", res);
					if(res.Result==200){
						state.allLockList = res.FObject;
						state.allLocksData = [
							{
								FAssetID: "@A",
								FVehicleName: state.FShortName,
								count: res.FObject.length,
								children: res.FObject
							}
						]
						res.FObject.map(function(item,index){
							if(item.FVehicleGUID==null || item.FVehicleGUID==""){
								lockArr.push(item);

							}else{
								vehicleIDArr.push(item.FVehicleGUID);

								lockObj[item.FVehicleGUID]=item;
							}

						})
						//console.log(lockArr);
						//console.log(vehicleIDArr);
						//console.log(lockObj);
					}

				}
			});
		}


		//获得电子锁数据后 请求车队数据 并与电子锁合并
		$.post("/web/Common/Common", {
				FTokenID: state.FTokenID,
				FAction: "QueryVehicleList",
				FVersion: "1.0.0"
			},
			function (res) {

				//console.log("车辆列表原始数据",res);

				let data = [],//本系统下所属车辆列表
				    temp = [],    //公司对象容器
				    temp1 = [],   //车队对象容器
				    temp2 = [],   //车辆对象容器
				    temp3 = [],   //绑定车辆电子锁车辆对象容器
				    temp4 = [],   //未绑定电子锁车辆对象容器
				    idArr = [],   //公司ID容器
				    idArr1 = [],  //车队ID容器
				    idArr2 = [],  //车辆ID容器
				    idArr3 = [],  //绑定车辆电子锁车辆ID容器
				    idArr4 = [];  //未绑定电子锁车辆ID容器

				//设定顶级公司名称
				let mainCompany={
					name:state.FShortName,
					ID:state.FAgentGUID
				}

				//第er次遍历 编译公司 车队 车辆数据
				//@A 表示顶级公司  @B 表示二级公司 @C 表示所有车队
				$.each(res.FObject, function (i, item)  {

					if (item.FSystemType == state.choiceSystemID || item.FSystemType == 0 ) {
            		    data.push(item);
						let companyID,         //公司ID
							companyParentID,   //公司父级ID
							companyOpen,       //树形默认打开状态
							FatherGroupID,     //车队父级ID
							carFatherID;      //车辆父级ID


						if (item.FAgentGUID == mainCompany.ID) {
							companyID="@A"+item.FAgentGUID ;
							companyParentID=0;
							companyOpen=true;

							if(item.FFatherGroupGUID==null){
								FatherGroupID="@A" + mainCompany.ID;
								if(item.FVehicleGroupGUID==null){
									carFatherID="@A"+mainCompany.ID
								}else {
									carFatherID="@C"+item.FVehicleGroupGUID
								}
							}else {
								FatherGroupID="@C" +item.FFatherGroupGUID;
								carFatherID="@C"+item.FVehicleGroupGUID
							}
						} else {

							companyID="@B"+item.FAgentGUID ; //使用角色ID代替公司ID
							companyParentID="@A"+mainCompany.ID;
							companyOpen=false;

							if(item.FFatherGroupGUID==null){
								FatherGroupID="@B" + item.FAgentGUID ;
								if(item.FVehicleGroupGUID==null){
									carFatherID="@B"+item.FAgentGUID
								}else {
									carFatherID="@C"+item.FVehicleGroupGUID
								}
							}else {
								FatherGroupID="@C" + item.FFatherGroupGUID;
								carFatherID="@C"+item.FVehicleGroupGUID
							}

						}

						//公司对象
						let obj = {
							id: companyID,
							label: item.FShortName,
							parentId:companyParentID,
							count: 0,
							open: companyOpen,
							checked: false,
							nodeSelectNotAll: false,//新增参数，表示父框可以半钩状态
							visible: true,
							searched: false,
							children:[],
							rootType:1
						};
						if (idArr.indexOf(obj.id) == -1) {
							idArr.push(obj.id);
							temp.push(obj)
						}

						//车队对象
						let obj1 = {
							id: "@C" + item.FVehicleGroupGUID,
							label: item.FVehicleGroupFullName,
							parentId: FatherGroupID,
							count: 0,
							open: false,
							checked: false,
							nodeSelectNotAll: false,//新增参数，表示父框可以半钩状态
							visible: true,
							searched: false,
							children:[],
							rootType:2
						};

						if (idArr1.indexOf(obj1.id) == -1) {
							idArr1.push(obj1.id);
							temp1.push(obj1)
						}

						//console.log(carFatherID, item.FVehicleName);


						//车辆对象 (非电子锁系统)
						let obj2 = {
							id: item.FGUID,
							label: item.FVehicleName,
							FAssetGUID: item.FAssetGUID,
							parentId:carFatherID,
							FAlarmOffLine: item.FAlarmOffLine,
							FCamera: item.FCamera,
							FRFID: item.FRFID,
							FScreen: item.FScreen,
							FStatus: item.FStatus,
							FTHS: item.FTHS,
							FTPMS: item.FTPMS,
							FVideo: item.FVideo,
							ISConfigSensorid: item.ISConfigSensorid,
							IsConfigFuel:item.FIsConfigFuel,
							FVehicleSerialCode: item.FVehicleSerialCode,
							open: true,
							checked: false,
							nodeSelectNotAll: false,//新增参数，表示父框可以半钩状态
							visible: true,
							searched: false,
							message: null,
							iconType:0, //图标类型 0车 1锁
						}
						if (obj2!=null && idArr2.indexOf(obj2.id) == -1 && obj2.id != null&&obj2.FStatus) {
							idArr2.push(obj2.id);
							temp2.push(obj2)
						};


						let obj3=null;
						if(state.choiceSystemID==2){

							if(vehicleIDArr.indexOf(item.FGUID)!=-1){
								//过滤绑定车辆的电子锁
								let n=vehicleIDArr.indexOf(item.FGUID);
								//vehicleIDArr.splice(n,1)   //测试数据用
								//console.log(vehicleIDArr); //测试数据用
								let data=lockObj[item.FGUID];
								//锁对象 (电子锁系统)
								obj3 = {
									id: data.FAssetGUID,
									label:data.FAssetID,
									subLabel:data.FVehicleName==null?'':data.FVehicleName,
									FVehicleGUID: data.FVehicleGUID,
									parentId:"@A",
									FAlarmOffLine: 0,
									FCamera: 0,
									FRFID: 0,
									FScreen: 0,
									FStatus: 0,
									FTHS: 0,
									FTPMS: 0,
									FVideo:0,
									ISConfigSensorid: 0,
									IsConfigFuel:0,
									FVehicleSerialCode: 0,
									open: true,
									checked: false,
									nodeSelectNotAll: false,//新增参数，表示父框可以半钩状态
									visible: true,
									searched: false,
									message: null,
									iconType:1, //图标类型 0车 1锁
								}
								if (obj3!=null && idArr3.indexOf(obj3.id) == -1 && obj3.id != null) {
									idArr3.push(obj3.id);
									temp3.push(obj3)
								};
							}else {
								//未绑定车辆的电子锁
								obj3 = {
									id: item.FGUID,
									label: item.FVehicleName,
									FAssetGUID: item.FAssetGUID,
									parentId:carFatherID,
									FAlarmOffLine: item.FAlarmOffLine,
									FCamera: item.FCamera,
									FRFID: item.FRFID,
									FScreen: item.FScreen,
									FStatus: item.FStatus,
									FTHS: item.FTHS,
									FTPMS: item.FTPMS,
									FVideo: item.FVideo,
									ISConfigSensorid: item.ISConfigSensorid,
									IsConfigFuel:item.FIsConfigFuel,
									FVehicleSerialCode: item.FVehicleSerialCode,
									open: true,
									checked: false,
									nodeSelectNotAll: false,//新增参数，表示父框可以半钩状态
									visible: true,
									searched: false,
									message: null,
									iconType:0, //图标类型 0车 1锁
								}
								if (obj3!=null && idArr4.indexOf(obj3.id) == -1 && obj3.id != null) {
									idArr4.push(obj3.id);
									temp4.push(obj3)
								};

							}
						}

					}
				});
				//将剩余未绑定车辆的锁加入列表
				if(state.choiceSystemID==2 && lockArr.length!=0){
					lockArr.map(function(item,index){
						let obj = {
							id: item.FAssetGUID,
							label:item.FAssetID,
							subLabel:item.FVehicleName==null?'':item.FVehicleName,
							FVehicleGUID: item.FVehicleGUID,
							parentId:"@A",
							FAlarmOffLine: 0,
							FCamera: 0,
							FRFID: 0,
							FScreen: 0,
							FStatus: 0,
							FTHS: 0,
							FTPMS: 0,
							FVideo:0,
							ISConfigSensorid: 0,
							IsConfigFuel:0,
							FVehicleSerialCode: 0,
							open: true,
							checked: false,
							nodeSelectNotAll: false,//新增参数，表示父框可以半钩状态
							visible: true,
							searched: false,
							message: null,
							iconType:1, //图标类型 0车 1锁
						}
						temp3.push(obj);
					})
				}

				state.allCarsList = data;      //本系统下车辆原始数据
				//console.log("本系统全部车辆列表",data);
                //公共部分  系统车辆列表
				let newArrA=[];
				let team=JSON.parse(JSON.stringify(newArrA.concat(temp,temp1)));
				state.allCarTeam = transTreeData(team);
				state.allCarsData = transTreeData(JSON.parse(JSON.stringify(newArrA.concat(temp,temp1,temp2))));
				console.log("车辆列表",state.allCarsData);

				if(state.choiceSystemID==2){
					//电子锁系统  锁列表
					let obj = {
						id: "@A",
						label: state.FShortName,
						parentId:0,
						count:temp3.length,
						open: true,
						checked: false,
						nodeSelectNotAll: false,//新增参数，表示父框可以半钩状态
						visible: true,
						searched: false,
						children:temp3,
						rootType:1
					};

					state.mapLocksData=[];
					state.mapLocksData.push(obj);

					let newArrB=[];
					state.noLockVehicle = transTreeData(JSON.parse(JSON.stringify(newArrB.concat(temp,temp1,temp4))));
					console.log("未绑定电子锁车辆列表",state.noLockVehicle);
				}


				function transTreeData(items) {
					if (items.length > 0) {
						var curparentId = 0 //parentId=0，为最上层节点 ，即无父节点
						var parent = findChild(curparentId,items);//数组
						return parent;
					} else {
						return [];
					}
				}
				//找子节点
				function findChild(curparentId,items) {
					//console.log(curparentId)
					var _arr = [];
					var length = items.length;
					for (var i = 0; i < length; i++) {
						if (items[i].parentId == curparentId) {
							var _obj = items[i];
							//_obj.children = findChild(_obj.id.replace(/@A|@B|@C/g, ''));
							_obj.children = findChild(_obj.id,items);
							$.each(_obj.children, function (index, item) {
								if (item.count != undefined) {
									_obj.count += item.count
								}else {
									_obj.count +=1
								}
							})
							//进行一个简单的排序 有内容的unshift 没内容的push
							if(_obj.count!=0){
								_arr.unshift(_obj);
							}else {
								_arr.push(_obj);
							}
						}
					}
					return _arr;
				}

				if (callback != null && callback != "") {
					callback();
				}
			})

	},
    //电子锁数据
    getAllLocksData:(state,callback) =>{
		$.post("/web/Lock/Lock_LBS", {
				FTokenID: state.FTokenID,
				FAction: "QueryLBSAssetListByFUserGUID",
				FVersion: "1.0.0"
			},
			function (res) {
				console.log("电子锁", res)
				state.allLockList = res.FObject;
				state.allLocksData = [
					{
						FAssetID: "@A",
						FVehicleName: state.FShortName,
						count: res.FObject.length,
						children: res.FObject
					}
				]

				if (callback != null && callback != "") {
					callback();
				}
			})

	},
	changeLanguage:(state,language) => state.language=language,
	changeSystemID:(state,id) => state.choiceSystemID=id,
	changeGlobalMapType:(state,type) => state.globalMapType=type,
	changeMapType:(state,type) => state.mapType=type,
}


export default new Vuex.Store({
	state,mutations
})


