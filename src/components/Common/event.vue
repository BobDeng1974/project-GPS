<template>
	<section>
		<div class="mymodal"
			 style="height: 470px;width: 640px;margin-left:-320px;margin-top: -230px;position: fixed;left: 50%;top: 50%;z-index:999;visibility: hidden">
			<div class="modal-header"
				 style="position: absolute;left: 640px;height: 20px;width: 20px;border: none;padding: 0px">
				<button type="button" @click="closeMymodal"
						style="height: 20px;width: 20px;border-radius: 10px;background:#999999"><span
					class="glyphicon glyphicon-remove" style="color: white;font-size:14px;font-weight: normal"></span>
				</button>
			</div>
			<div class="modal-body" style="padding: 0px">
				<baidu-map ref="map" :fa-data="[mapToolShow]"></baidu-map>
			</div>
		</div>
		<!--选择车辆弹窗-->
		<vehical-select-dialog v-on:child.sync="get"></vehical-select-dialog>
		<div id="operate_wrapper"><!--part1 header start-->
			<div class='box-header'>
				<div class="block">
					<span class="operatExp">_选择车辆_</span>
					<div class="search-input-wrap" data-toggle="modal" data-target="#modal"><!---->
						<a href="javascript:;" class="get-carList-dialog">
							<i class="img-icon icon-carList-dialog"></i>
						</a>
						<input type="text" class="search-input">
					</div>
				</div>
				<div class="block">
					<span class="operatExp">_选择时间_</span>
					<el-date-picker
						size="small"
						v-model="queryDate"
						type="daterange"
						:clearable="false"
						@change="getTime"
						:picker-options="pickerOptions"
						placeholder="选择时间范围">
					</el-date-picker>
				</div>
				<div class="btnList">
					<el-button type="primary" class="search" @click="doQueryByAll()">_查询_</el-button>
					<el-button type="primary" class="reset" @click="resetCondition()">_重置_</el-button>
					<!--<el-button type="primary" class="export"><i class="fa fa-share-square-o"></i>导出文件</el-button>-->
					<el-button type="primary" class="read" @click="changeState"><i class="fa fa-envelope-open-o"></i>_设为已读_
					</el-button>
				</div>
			</div>
			<!--饿了么选项卡部分，报警报表，胎压报警里面估计没有，可省略-->
			<el-tabs v-model="activeName" @tab-click="switchoverTable">
				<el-tab-pane label="_全部_" name="first"></el-tab-pane>
				<el-tab-pane label="_已读_" name="second"></el-tab-pane>
				<el-tab-pane label="_未读_" name="third"></el-tab-pane>
			</el-tabs>
		</div><!--part1 header end-->

		<div class="el_table_wrap" id="el_table_wrap"><!--part2 header start-->
			<el-table :data="allEventInfo" stripe style="width: 100%" :height="table_height" v-if="show_allEventInfo"
					  @select="selectRow"
					  @select-all="selectAll"
					  ref="setAllEventInfo">
				<!--表格统一用饿了么组件，类型使用stripe，不要使用border-->
				<el-table-column
					type="selection"
					width="40"
					:selectable="disabledRow">
				</el-table-column>
				<el-table-column tooltip-effect="dark" type="index" align="center" label="_序号_" width="80">
				</el-table-column>
				<el-table-column prop="FDataType" label="_事件名称_" width="180">
				</el-table-column>
				<el-table-column label="_操作_" align="center" width="120">
					<template scope="scope">
						<el-button type="text" size="small" @click="position(scope.$index,scope.row)">_查看位置_</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="FShortName" label="_公司简称_" show-overflow-tooltip width="120">
				</el-table-column>
				<el-table-column prop="FVehicleName" label="_车牌号_" sortable width="120">
				</el-table-column>

				<el-table-column prop="FStartDateTime" label="_时间_" sortable width="180">
				</el-table-column>
				<el-table-column prop="address" label="_位置_" min-width="230">
				</el-table-column>
				<el-table-column prop="FProcessStatus" align="center" label="_状态_" width="120">
				</el-table-column>

			</el-table>
			<el-table :data="readEventInfo" stripe style="width: 100%" :height="table_height" v-if="show_readEventInfo">
				<!--表格统一用饿了么组件，类型使用stripe，不要使用border-->
				<el-table-column
					type="selection"
					width="40">
				</el-table-column>
				<el-table-column tooltip-effect="dark" type="index" align="center" label="_序号_" width="80">
				</el-table-column>
				<el-table-column prop="FDataType" label="_事件名称_" width="180">
				</el-table-column>
				<el-table-column label="_操作_" align="center" width="120">
					<template scope="scope">
						<el-button type="text" size="small" @click="position(scope.$index,scope.row)">_查看位置_</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="FShortName" label="_公司简称_" show-overflow-tooltip width="120">
				</el-table-column>
				<el-table-column prop="FVehicleName" label="_车牌号_" sortable width="120">
				</el-table-column>

				<el-table-column prop="FStartDateTime" label="_时间_" sortable width="180">
				</el-table-column>
				<el-table-column prop="address" label="_位置_" min-width="230">
				</el-table-column>
				<el-table-column prop="FProcessStatus" align="center" label="_状态_" width="120">
				</el-table-column>


			</el-table>
			<el-table :data="noReadEventInfo" stripe style="width: 100%" :height="table_height"
					  v-if="show_noReadEventInfo"
					  ref="setNoReadEventInfo">
				<!--表格统一用饿了么组件，类型使用stripe，不要使用border-->
				<el-table-column
					type="selection"
					width="40"
				>
				</el-table-column>
				<el-table-column tooltip-effect="dark" type="index" align="center" label="_序号_" width="80">
				</el-table-column>
				<el-table-column prop="FDataType" label="_事件名称_" width="180">
				</el-table-column>
				<el-table-column label="_操作_" align="center" width="120">
					<template scope="scope">
						<el-button type="text" size="small" @click="position(scope.$index,scope.row)">_查看位置_</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="FShortName" label="_公司简称_" show-overflow-tooltip width="120">
				</el-table-column>
				<el-table-column prop="FVehicleName" label="_车牌号_" sortable width="120">
				</el-table-column>

				<el-table-column prop="FStartDateTime" label="_时间_" sortable width="180">
				</el-table-column>
				<el-table-column prop="address" label="_位置_" min-width="230">
				</el-table-column>
				<el-table-column prop="FProcessStatus" align="center" label="_状态_" width="120">
				</el-table-column>


			</el-table>
		</div><!--part2 header end-->

		<!--分页还是统一用饿了么的组件，事件、配置都还挺好-->
		<div id="pagination" class="pagination"><!--part3 header start-->
			<div class="block" v-if="show_allEventInfo">
				<el-pagination
					@size-change="handleSizeChangeAll"
					@current-change="handleCurrentChangeAll"
					:page-sizes="[10, 20, 30]"
					:page-size="pageSize_all"
					:current-page="pageIndex_all"
					layout="prev, pager, next, jumper,total,sizes"
					:total="AllFTotalCount">
				</el-pagination>
			</div>
			<div class="block" v-if="show_readEventInfo">
				<el-pagination
					@size-change="handleSizeChangeRead"
					@current-change="handleCurrentChangeRead"
					:page-sizes="[10, 20, 30]"
					:page-size="pageSize_read"
					:current-page="pageIndex_read"
					layout="prev, pager, next, jumper,total,sizes"
					:total="ReadFTotalCount">
				</el-pagination>
			</div>
			<div class="block" v-if="show_noReadEventInfo">
				<el-pagination
					@size-change="handleSizeChangeNoRead"
					@current-change="handleCurrentChangeNoRead"
					:page-sizes="[10, 20, 30]"
					:page-size="pageSize_noRead"
					:current-page="pageIndex_noRead"
					layout="prev, pager, next, jumper,total,sizes"
					:total="NoReadFTotalCount">
				</el-pagination>
			</div>
		</div><!--part3 header end-->
	</section>
</template>
<script type="text/ecmascript-6">
	import VehicalSelectDialog from 'components/Common/vehicalSelectDialog.vue'
	/*这两个文件虽然在这引用，但是作用仍在全局，内容不多，后期估计得加到main.css里面就可以了*/
	require("!style!css!../../css/Common/el_table.css")
	require("!style!css!../../css/Common/el_pager.css")
	import baiduMap from '../Common/baidu_map.vue'
	export default {
		data() {
			return {
				Area: "深圳",
				mapToolShow: false,
				//queryDate: [new Date(), new Date()],
				queryDate: ["", ""],
				activeName: "first",
				show_allEventInfo: true,
				show_readEventInfo: false,
				show_noReadEventInfo: false,
				table_height: null,
				allEventInfo: [],
				readEventInfo: [],
				noReadEventInfo: [],
				multipleSelection: [],
				checkedRow: [],
				pageIndex_all: 1,
				pageSize_all: 10,
				pageIndex_read: 1,
				pageSize_read: 10,
				pageIndex_noRead: 1,
				pageSize_noRead: 10,
				AllFTotalCount: 0,
				ReadFTotalCount: 0,
				NoReadFTotalCount: 0,
				License: "",
				carFGUID: "",
				seachTime:"",
				pickerOptions: {
					shortcuts: [{
						text: '_今天_',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							//start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '_昨天_',
						onClick(picker) {
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
							const end = start;
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '_最近三天_',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 2);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
			}
		},
		/*activated: function () {
			if (this.$route.params.ID != undefined && this.$route.params.startTime != undefined && this.$route.params.endTime != undefined) {
				//console.log(this.$route.params);
				this.License = this.$route.params.vehicle;
				this.carFGUID = this.$route.params.ID;
				let time = this.$route.params.startTime + " - " + this.$route.params.endTime;
				$(".el-date-editor--datetimerange>.el-input__inner").val(time);
				var _this = this;
				window.setTimeout(function () {
					_this.doQueryByAll();
				}, 200)

			}
		},*/

		props: {
			screenHeight: Number
		},
		mounted(){
			this.$refs.map.initMap();
			$("#map-wrapper").height(470);
			setTimeout(() => {
				this.adjustPage();
			}, 100);
		},
		methods: {
			/*Pagination*/
			/*--全部--*/
			handleSizeChangeAll(val) {
				this.pageSize_all = val;
				this.doQuery("-1", "all");
			},
			handleCurrentChangeAll(val) {
				this.pageIndex_all = val;
				this.doQuery("-1", "all");
			},
			/*--全部--*/
			/*--已读--*/
			handleSizeChangeRead(val){
				this.pageSize_read = val;
				this.doQuery("1", "read");
			},
			handleCurrentChangeRead(val){
				this.pageIndex_read = val;
				this.doQuery("1", "read");
			},
			/*--已读--*/
			/*--未读--*/
			handleSizeChangeNoRead(val){
				this.pageSize_noRead = val;
				this.doQuery("0", "noRead");
			},
			handleCurrentChangeNoRead(val){
				this.pageIndex_noRead = val;
				this.doQuery("0", "noRead");
			},
			/*--未读--*/
			adjustPage(){
				this.table_height = this.elementsFlex("el_table_wrap", "main-content", "operate_wrapper", "pagination", true) + 10;
			},

			//切换tabs
			switchoverTable(tab){
				let name = tab.label;
				switch (name) {
					case "_全部_":
						this.doQuery("-1", "all");
						this.show_allEventInfo = true;
						this.show_readEventInfo = false;
						this.show_noReadEventInfo = false;
						break;
					case "_已读_":
						this.doQuery("1", "read");
						this.show_allEventInfo = false;
						this.show_readEventInfo = true;
						this.show_noReadEventInfo = false;
						break;
					case "_未读_":
						this.doQuery("0", "noRead");
						this.show_allEventInfo = false;
						this.show_readEventInfo = false;
						this.show_noReadEventInfo = true;
						break;

				}
			},
			//警告弹窗内容
			warningDialogMsg(msg, type){
				this.$message({
					showClose: true,
					message: msg,
					type: type
				});
			},
			//获取时间
			getTime(value){
				return this.seachTime=value;
			},
			//点击查询按钮
			doQueryByAll(){
				this.doQuery("-1", "all");
				this.doQuery("1", "read");
				this.doQuery("0", "noRead");
			},
			//请求数据
			doQuery(state, arr){
				/*if (this.isdoQuery) {
				 if (this.tempId == "" || this.tempDate == "") {
				 this.tempId = this.License;
				 this.tempDate = $(".el-date-editor--datetimerange>.el-input__inner").val();
				 } else if (this.tempId == this.License && this.tempDate == $(".el-date-editor--datetimerange>.el-input__inner").val()) {
				 this.isReloadData = false;
				 } else {
				 this.isReloadData = true;
				 this.tempId = this.License;
				 this.tempDate = $(".el-date-editor--datetimerange>.el-input__inner").val();
				 }
				 //console.log(this.isReloadData);
				 if (!this.isReloadData) {
				 return
				 }
				 }*/
				//console.log(this.seachTime);
				let time = this.seachTime.split(" - ");
				//console.log(this.queryDate[0].getTime());
				if (this.License == "") {
					this.warningDialogMsg("_请选择车辆_!", "warning");
					return false;
				} else if (time == "") {
					this.warningDialogMsg("_请选择时间_!", "warning");
					return false;
				}
				var _this = this;
				//console.log(time);
				let startTime = this.parseUTC(time[0]+" 00:00:00");
				let endTime = this.parseUTC(time[1]+" 23:59:59");
				//console.log(startTime+","+endTime);
				let letFTokenID = this.$store.state.FTokenID;
				let pageSize;
				let pageIndex;
				switch (state) {
					case "-1":
						pageSize = _this.pageSize_all;
						pageIndex = _this.pageIndex_all;
						break;
					case "1":
						pageSize = _this.pageSize_read;
						pageIndex = _this.pageIndex_read;
						break;
					case "0":
						pageSize = _this.pageSize_noRead;
						pageIndex = _this.pageIndex_noRead;
						break;
					default:
						pageSize = 10;
						pageIndex = 1;
				}
				//console.log(pageIndex + "," + state+","+_this.carFGUID+","+startTime+","+endTime);
				$.post("/web/Common/Common_Message", {
					FTokenID: letFTokenID,
					FAction: "QueryMessageEventByFVehicleGUIDs",
					FVehicleGUIDs: _this.carFGUID,
					FStartTime: startTime,
					FEndTime: endTime,
					FState: state,
					FDataType: "0",
					FPageSize: pageSize,
					FPageIndex: pageIndex,
					FVersion: "1.0.0",
				}, function (data) {
					//console.log(data);
					if (arr == "all") {
						/*console.log(_this.carFGUID);
						 console.log(startTime + "," + endTime);
						 console.log(pageSize + "," + pageIndex);
						 console.log(data);*/
						if(data.FObject.length==0){
							_this.warningDialogMsg("_暂无数据_","error");
							return false;
						}
						_this.AllFTotalCount = data.FObject.Table[0].FTotalCount;
						let tempArr=_this.getUsableData(data.FObject.Table1);
						window.setTimeout(function(){
							_this.allEventInfo=tempArr;
						},200)
					} else if (arr == "read") {
						if(data.FObject.length==0){
							return false;
						}
						_this.ReadFTotalCount = data.FObject.Table[0].FTotalCount;
						let tempArr=_this.getUsableData(data.FObject.Table1);
						window.setTimeout(function(){
							_this.readEventInfo=tempArr;
						},200)
					} else if (arr == "noRead") {
						if(data.FObject.length==0){
							return false;
						}
						_this.NoReadFTotalCount = data.FObject.Table[0].FTotalCount;
						let tempArr=_this.getUsableData(data.FObject.Table1);
						window.setTimeout(function(){
							_this.noReadEventInfo=tempArr;
						},500)
					}
				});
			},
			//优化显示的数据(解析地址+修改字段)
			getUsableData(arr){
				//console.log(arr);
				let result = arr;
				let myGeo = new BMap.Geocoder();
				for (let i = 0; i < result.length; i++) {
					//修改字段
					if (result[i].FProcessStatus == "0") {
						result[i].FProcessStatus = "_未读_";
					} else if (result[i].FProcessStatus == "1") {
						result[i].FProcessStatus = "_已读_";
					}
					if (result[i].FDataType == "1") {
						result[i].FDataType = "ACC_开_";
						result[i].FRemind = "";
					} else if (result[i].FDataType == "2") {
						result[i].FDataType = "ACC_关_";
						result[i].FRemind = "";
					} else if (result[i].FDataType == "3") {
						result[i].FDataType = "_接挂_";
						result[i].FRemind = "";
					} else if (result[i].FDataType == "4") {
						result[i].FDataType = "_甩挂_";
						result[i].FRemind = "";
					}
					result[i].FStartDateTime=this.parseGMT(result[i].FStartDateTime);
					//解析地址
					let lat = result[i].FStartLongitude;
					let lon = result[i].FStartLatitude;
					window.setTimeout(function(){
						myGeo.getLocation(new BMap.Point(lat,lon), function (rs) {
							result[i].address=rs.address;
						});
					},50)

				}
				//console.log(result);
				return result
			},
			//关闭modal窗口
			closeMymodal() {
				$(".mymodal").css('visibility', 'hidden')
			},
			//地图上定位
			position(index, row) {
				$(".mymodal").css('visibility', 'visible');
				//console.log(index, row);
				var point = new BMap.Point(row.FStartLongitude, row.FStartLatitude);
				this.$refs.map.setMark(point);
			},
			//CheckBox选择行
			selectRow(selection, row){
				this.checkedRow.length = 0;
				for (let i = 0; i < selection.length; i++) {
					let id = selection[i].FGUID;
					this.checkedRow.push(id);
				}
			},

			//CheckBox全选
			selectAll(selection){
				this.checkedRow.length = 0;
				for (let i = 0; i < selection.length; i++) {
					let id = selection[i].FGUID;
					this.checkedRow.push(id);
				}
			},
			//改变已读未读状态
			changeState(){
				var _this = this;
				let checkedRowStr = this.checkedRow.join(",");
				//console.log(checkedRowStr);
				$.post("/web/Common/Common_Message", {
					FTokenID: this.$store.state.FTokenID,
					FAction: "UpdateMessageAlarmStatus",
					FGUIDs: checkedRowStr,
					FState: "1",
					FVersion: "1.0.0"
				}, function (data) {
					_this.doQueryByAll();
					//console.log(data);
				});
				if (this.show_allEventInfo) {
					this.$refs.setAllEventInfo.clearSelection();
				} else {
					this.$refs.setNoReadEventInfo.clearSelection();
				}

			},
			//提示信息
			message(msg, type){
				this.$message({
					showClose: true,
					message: msg,
					type: type
				});
			},
			//禁用CheckBox
			disabledRow(row, index){
				if (row.FProcessStatus == "_已读_") {
					return false
				} else {
					return true
				}
			},
			//重置
			resetCondition(){
				$(".search-input").val("");
				this.queryDate = ["", ""];
				this.allEventInfo = [];
				this.readEventInfo = [];
				this.noReadEventInfo = [];
				this.License = "";
				this.carFGUID = "";
				this.pageIndex_all = 1;
				this.pageIndex_read = 1;
				this.pageIndex_noRead = 1;
				this.AllFTotalCount = 0;
				this.ReadFTotalCount = 0;
				this.NoReadFTotalCount = 0;
			},
			//获取车辆信息
			get(data){
				$(".search-input").val("_已选_"+data[0].length+"_辆_");
				this.License = data[0].join(",");
				this.carFGUID = data[1].join(",");
			},
		},
		components: {
			baiduMap,
			VehicalSelectDialog
		},
		watch: {
			screenHeight () {
				this.adjustPage();
			}
		},

	}
</script>
<style scoped>
	.block {
		float:left;
		margin-left:20px;
	}

	.block:nth-child(1) {
		margin-left:0;
	}



	.box-header {
		height:46px;
		line-height:46px;
		color:#444;
		display:block;
		padding:0 0 0 18px;
		position:relative;
		border:1px solid #d9d9d9;
		margin:0 0 5px 0;
		background-color:#fff;
	}

	.search-input-wrap {
		float:left;
		margin:9px 0 0 10px;
	}

	.search-input {
		float:left;
		width:120px;
		height:28px;
		border:1px solid #e6e6e6;
	}

	.operatExp {
		float:left;
		font-size:12px;
	}

	.get-carList-dialog {
		float:left;
		display:flex;
		justify-content:center;
		align-items:center;
		width:28px;
		height:28px;
		border:1px solid #e6e6e6;
		border-right:none;
		text-align:center;
	}

	/*按钮样式 可用于全局 也可单独用在组件，主要看以后表格内的按钮怎么命名*/
	/*.el-button不能全局可能有些报表内部会用到饿了么的按钮组件*/
	.el-button {
		border:none;
		border-radius:0;
		padding:8px 26px;
		font-size:12px;
	}

	.search {
		background-color:#005fc6;
	}

	.reset {
		background-color:#547ca9;
	}

	.export {
		background-color:#4aae58;
		padding:8px 16px;
	}

	button.cancel {
		background-color:transparent;
	}

	.read {
		background-color:#f39b2a;
		padding:8px 16px;
	}

	/*fontawesome 里面字体图标的样式*/
	.fa-share-square-o {
		margin-right:3px;
	}

	.fa-envelope-open-o {
		margin-right:3px;
	}

</style>
<style>
	/*DatePicker 饿了么选择时间插件(后期可放入main.css)*/
	.el-date-editor .el-input__icon {
		left:0;
	}

	.el-date-editor .el-input__inner {
		padding-left:35px;
		border-radius:0;
		border-color:#e6e6e6;
		margin-left:10px;
	}

	.el-date-editor--daterange .el-input__icon + .el-input__inner {
		padding-right:10px;
		height:28px;
		width:195px;
		line-height:28px;
		font-size:12px;
	}

	.el-date-editor--datetimerange .el-input__icon + .el-input__inner {
		width:325px;
		padding-right:10px;
	}

	/*el-tabs 选项卡(后期可放入main.css)*/
	.el-tabs__header {
		margin:0;
	}

	.el-tabs__active-bar {
		background-color:#005fc6;
	}

	.el-tabs__item {
		height:36px;
		line-height:36px;
	}

	.el-tabs__nav-wrap {
		background-color:#fff;
	}

	.el-tabs__item.is-active {
		color:#333;
	}

	label.el-checkbox {
		margin-bottom:0;
	}
</style>

