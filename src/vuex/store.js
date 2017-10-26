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
 	allLocksData:[],   //电子锁数据
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
		$.post("/web/Common/Common", {
				FTokenID: state.FTokenID,
				FAction: "QueryVehicleList",
				FVersion: "1.0.0"
			},
			function (res) {

				//console.log("车辆列表原始数据",res);

				let data = [];//本系统下所属车辆列表
				var temp = [];
				var temp1 = [];
				var temp2 = [];
				var idArr = [];
				var idArr1 = [];
				var idArr2 = [];

				//设定顶级公司名称
				let mainCompany={
					name:state.FShortName,
					ID:state.FAgentGUID
				}

				//第er次遍历 编译公司 车队 车辆数据
				//@A 表示顶级公司  @B 表示二级公司 @C 表示所有车队
				$.each(res.FObject, function (i, item) {

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
						//车辆对象
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
							message: null
						}

						if (idArr2.indexOf(obj2.id) == -1 &&  obj2.id != null) {
							idArr2.push(obj2.id);
							temp2.push(obj2)
						};

					}
				});

				state.allCarsList = data
				//console.log("本系统全部车辆列表",data);
				temp = temp.concat(temp1, temp2)
				function transTreeData(items) {
					if (items.length > 0) {
						var curparentId = 0 //parentId=0，为最上层节点 ，即无父节点
						var parent = findChild(curparentId);//数组
						return parent;
					} else {
						return [];
					}
				}
				//找子节点
				function findChild(curparentId) {
					//console.log(curparentId)
					var _arr = [];
					var items = temp;
					var length = items.length;
					for (var i = 0; i < length; i++) {
						if (items[i].parentId == curparentId) {
							var _obj = items[i];
							//_obj.children = findChild(_obj.id.replace(/@A|@B|@C/g, ''));
							_obj.children = findChild(_obj.id);
							$.each(_obj.children, function (index, item) {
								if (item.count != undefined) {
									_obj.count += item.count
								}else {
									_obj.count +=1
								}
							})
							_arr.push(_obj);
						}
					}
					return _arr;
				}

				state.allCarsData = transTreeData(temp);
				//console.log("车辆列表",state.allCarsData);
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
/*
				state.allLocksData = [
					{
						FAssetID: "@A",
						FVehicleName: state.FShortName,
						count: res.FObject.length,
						children: res.FObject
					}
				]
*/

				let obj = {
					id: "@A",
					label: state.FShortName,
					parentId:0,
					count: res.FObject.length,
					open: true,
					checked: false,
					nodeSelectNotAll: false,//新增参数，表示父框可以半钩状态
					visible: true,
					searched: false,
					children:[],
					rootType:1
				};
				res.FObject.map(function(item,index){
					let children={
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
						message: null
					}
					obj.children.push(children)

				})

				state.allLocksData.push(obj);

				console.log('树形数据', state.allLocksData)
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


