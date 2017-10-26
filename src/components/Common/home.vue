<template>
	<div class="mycontainer">

		<!--弹出框-->
		<div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
			 aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h5 class="modal-title" id="myModalLabel">_请选择需要添加的车辆曲线图_</h5>
					</div>
					<div class="modal-body" style="height: 100%">
						<ul>
							<li v-for="value in filterLineChartArr">
								<label>{{value|translate1}}</label>
								<input type="checkbox" class="pull-right" :value="value" v-model="checkName">
							</li>
						</ul>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary" data-dismiss="modal" @click="addLineChart">_确定_</button>
						<button type="reset" class="btn btn-default" data-dismiss="modal">_取消_</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		<!--弹出框结束-->
		<div class="modal fade" id="modal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
			 aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h5 class="modal-title" id="myModalLabe2">_请选择需要添加的车辆环形比例图_</h5>
					</div>
					<div class="modal-body" style="height: 100%">
						<ul>
							<span v-if="!filterAnnularChartArr.length">_没有可添加的项_</span>
							<li v-for="value in filterAnnularChartArr"><label>{{value|translate2}}</label><input
								type="radio" class="pull-right" v-bind:value="value" v-model="checkName1"></li>
						</ul>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary" data-dismiss="modal" @click="addAnnularChart">
							_确定_
						</button>
						<button type="reset" class="btn btn-default" data-dismiss="modal">_取消_</button>
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>
		<!--标签栏-->
		<div class="panel panel-default">
			<!--接甩挂系统   标签栏-->
			<div  class="header panel-heading "
				 style="position: relative;padding-bottom: 0px;background:#f5f5f5!important;">

				<ul class="row sortable">
					<li class="col-md-2 carstatus-container" v-if="carjson.status!='FNoAlarmCount'"
						v-for="carjson in filtercarJsons"
						v-dragging="{ item: carjson, list: carJsons ,group: 'carjson'}"
						:key='carjson.status'
						@click="choiceTagData(carjson.status)">
						<div class="park" :class="carjson.status">
							<div class="img-icon left-icon"></div>
							<div class="text">
								<p class="number" v-if="carjson.status=='FOffLineCount'">{{
									carjson.number+carjson.noposition}}<span>/{{carjson.noposition}}</span></p>
								<p class="number" v-if="carjson.status!='FOffLineCount'">{{ carjson.number}}</p>
								<p v-if="SystemID!=2" class="carstatus">{{ carjson.status|translate}}<span v-if="carjson.status=='FOffLineCount'">/_无设备_</span></p>
								<p v-if="SystemID==2" class="carstatus">{{ carjson.status|translateLock}}<span v-if="carjson.status=='FOffLineCount'">/_无设备_</span></p>
							</div>
						</div>

					</li>
				</ul>
				<a @click="showAll=!showAll" class="tagMore">{{work}} <span class="glyphicon " v-bind:class="pointer"></span></a>
			</div>

			<!--地图  柱状图 -->
			<div class="chart panel-body">
				<div class="mapContainer col-md-5" id="mapContainer">
				</div>
				<div class="hightchart col-md-7" id="myChart"></div>
			</div>
		</div>
		<!--饼状图-->
		<div class="circle panel panel-default">
			<div style="position: absolute;width: 33%;height: 200px;left:30%;top:25px;border-left: 1px dashed #e6e6e6;border-right: 1px dashed #e6e6e6;"></div>
			<ul>
				<li class="col-md-4" v-for="(value,key,index) in FAnnularPair" v-bind:id="key"></li>
				<i v-if="SystemID!=4" class="glyphicon glyphicon-plus" data-toggle="modal" data-target="#modal2"
				   style="font-size: 20px;line-height: 20px;color:#bb9360;position: absolute;left:98%;top: 20px;cursor: pointer"></i>
			</ul>
		</div>
		<!--里程统计-->
		<div class="panel panel-default">
			<div class="panel-heading " style="line-height: 20px;background: #ffffff">
				<span class="chart-title" @click="sendLink(linkTo0)">{{value1|translate1}}</span>
				<div class="selectBox">
					<label for="">_时间_</label>
					<el-select v-model="value" placeholder="请选择" class="selectoption" @change="getTimeValue">
						<el-option
							v-for="item in  timeOption"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</div>
				<div class="selectBox ">
					<label for="">_报表类型_</label>
					<el-select v-model="value1" placeholder="请选择" class="selectoption" @change="getReportType">
						<el-option
							v-for="item in  reportType"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</div>
			</div>
			<div class="panel-body">
				<div class="carRunStopReport" id="carRunStopReport">
				</div>
			</div>
		</div>
		<!--超速报警line-->
		<div class="panel panel-default " v-show="AlarmOverSpeedCount">
			<div class="panel-heading " style="background: #ffffff">
				<span class="chart-title" @click="sendLink(linkTo1)">{{reportvalue1|translate1}}</span>
				<div class="selectBox">
					<label for="">_时间_</label>
					<el-select v-model="timevalue1" placeholder="_请选择_" class="selectoption" @change="getTimeValue1">
						<el-option
							v-for="item in  timeOption"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
					<el-button class="el-icon-circle-cross" size="mini" style="float: right;margin-right: -34px"
							   @click="deleteLineChart('AlarmOverSpeedCount','FLineChart2')"></el-button>
				</div>
				<div class="selectBox ">
					<label for="">_报表类型_</label>
					<el-select v-model="reportvalue1" placeholder="_请选择_" class="selectoption" @change="getReportType1">
						<el-option
							v-for="item in  reportType"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</div>
			</div>
			<div class="panel-body">
				<div class="carRunStopReport" id="AlarmOverSpeed">
				</div>
			</div>
		</div>
		<!--不同系统特有line-->
		<div class="panel panel-default" v-show="FLockOpenCount ||TemperatureAbNormalCount|| CouplingCount|| FuelImproper">
			<div class="panel-heading " style="background: #ffffff">
				<span class="chart-title"  @click="sendLink(linkTo2)">{{reportvalue2|translate1}}</span>
				<div class="selectBox">
					<label for="">_时间_</label>
					<el-select v-model="timevalue2" placeholder="_请选择_" class="selectoption" @change="getTimeValue2">
						<el-option
							v-for="item in  timeOption"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
					<el-button v-show="CouplingCount" class="el-icon-circle-cross" size="mini" style="padding-left:0px;float: right;margin-right: -34px"
							   @click="deleteLineChart('CouplingCount','FLineChart3')"></el-button>
					<el-button v-show="FLockOpenCount" class="el-icon-circle-cross" size="mini" style="padding-left:0px;float: right;margin-right: -34px"
							   @click="deleteLineChart('FLockOpenCount','FLineChart3')"></el-button>
					<el-button v-show="TemperatureAbNormalCount" class="el-icon-circle-cross" size="mini" style="padding-left:0px;float: right;margin-right: -34px"
							   @click="deleteLineChart('TemperatureAbNormalCount','FLineChart3')"></el-button>
					<el-button v-show="FuelImproper" class="el-icon-circle-cross" size="mini" style="padding-left:0px;float: right;margin-right: -34px"
							   @click="deleteLineChart('FuelImproper','FLineChart3')"></el-button>
				</div>
				<div class="selectBox ">
					<label for="">_报表类型_</label>
					<el-select v-model="reportvalue2" placeholder="_请选择_" class="selectoption" @change="getReportType2">
						<el-option
							v-for="item in  reportType"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</div>
			</div>
			<div class="panel-body">
				<!--接甩挂line-->
				<div v-show="CouplingCount" class="carRunStopReport" id="CouplingCount"></div>
				<!--开锁次数line-->
				<div v-show="FLockOpenCount" class="carRunStopReport" id="FLockOpenCount1"></div>
				<!--温度异常line-->
				<div v-show="TemperatureAbNormalCount" class="carRunStopReport" id="TemperatureAbNormalCount"></div>
				<!--温度异常line-->
				<div v-show="FuelImproper" class="carRunStopReport" id="FuelImproper"></div>
			</div>
		</div>
		<div class="panel panel-default" v-show="EfficiencyCount">
			<div class="panel-heading " style="background: #ffffff">
				<span class="chart-title" @click="sendLink(linkTo3)">{{reportvalue3|translate1}}</span>
				<div class="selectBox">
					<label for="">_时间_</label>
					<el-select v-model="timevalue3" placeholder="_请选择_" class="selectoption" @change="getTimeValue3">
						<el-option
							v-for="item in  timeOption"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
					<el-button class="el-icon-circle-cross" size="mini" style="float: right;margin-right: -34px"
							   @click="deleteLineChart('EfficiencyCount','FLineChart4')"></el-button>
				</div>
				<div class="selectBox ">
					<label for="">_报表类型_</label>
					<el-select v-model="reportvalue3" placeholder="_请选择_" class="selectoption" @change="getReportType3">
						<el-option
							v-for="item in  reportType"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
				</div>
			</div>
			<div class="panel-body">
				<div class="carRunStopReport" id="EfficiencyCount">
				</div>
			</div>
		</div>
		<!--添加line-->
		<div v-show="FLineChart.FLineChart1==''||FLineChart.FLineChart2==''||FLineChart.FLineChart3==''||FLineChart.FLineChart4==''"
			class="panel panel-default addChart" style="height: 60px" data-toggle="modal" data-target="#modal">
			<i class="glyphicon glyphicon-plus" style="font-size: 20px;line-height: 60px;color:#999;font-weight: lighter;margin-right: 10px "></i>
			<span style="position: relative;bottom:2px;font-size: 18px;color: #bb9360">_点击增加折线图_</span>
		</div>
	</div>

</template>
<script>

	import HighCharts from 'highcharts/highstock'
	import Highcharts from 'highcharts/highmaps'
	require('highcharts/modules/drilldown')(Highcharts)
	import baidu  from 'js/GIS/Baidu/BaiduAPI'
	let _this
	export default {
		data() {
			_this = this
			return {
				/*******各系统相同数据******/
				SystemID:null,//系统id
				interval:null, //存储定时器
				leaveTime:false,//离开首页超过五分钟开关
				finishMap: false,//绘图完成开关
				checkName: [],
				checkName1: null,
				showAll: false,
				statusStyle: '',
				currentIndex: '',
				carJsons: '',
				provinceArray: null,
				carArray: '',
				cityArray: '',
				carCityArray: '',

				FStatusBlock:[],
				FAnnularPair: {
					FAnnularPair1: '',
					FAnnularPair2: '',
					FAnnularPair3: '',
				},
				FLineChart: {
					FLineChart1: '',
					FLineChart2: '',
					FLineChart3: '',
					FLineChart4: '',
					FLineChart5: '',
					FLineChart6: ''
				},
				AlarmOverSpeedCount: false,
				CouplingCount: false,
				EfficiencyCount: false,
				value: '_最近一周_',
				value1: '_里程统计报表_',
				timevalue1: '_最近一周_',
				timevalue2: '_最近一周_',
				timevalue3: '_最近一周_',
				reportvalue1: '_超速报警报表_',
				reportvalue3: '_运行效率统计_',
				reportTypeValue: '',
				reportTypeValue1: '',
				reportTypeValue2: '',
				reportTypeValue3: '',
				linkTo0: {
					tabsText: "_行驶统计_",
					router: "xingshi"
				},
				linkTo1: {
					tabsText: "_超速报警_",
					router: "speedAlarm"
				},
				linkTo3: {
					tabsText: "_运行效率分析_",
					router: "xiaolv"
				},
				time: '',
				time1: '',
				time2: '',
				time3: '',
				//省级柱状图公共参数
				option: {
					chart: {
						type: 'column',
                        //panning: true,
                        //panKey: 'shift'
						zoomType: 'x',
						resetZoomButton: {
							position: {
								align: "right",
								verticalAlign: "top",
								x: 0,
								y: -40,
							}
						}
					},
					legend: {
						enabled: false
					},
					scrollbar: {
						enabled: true,
						barBackgroundColor: "#2885eb",
						liveRedraw: true,
						showFull: false
					},
					loading:{
						labelStyle:{
							"display":"none",
/*
							"fontWeight": "bold",
							"fontSize":"46px",
*/
						},
						style: {
							"background":'url(/static/img/loading.gif) no-repeat center 100px'
						}
					},
					credits: {
						enabled: false
					},
					title: {
						text: '_分布柱状图_',
						style: {"fontFamily": '微软雅黑'}
					},
					xAxis: {
//						categories: '',
						type: 'category',
						crosshair: true,
					},
					yAxis: {
						allowDecimals: false,
						min: 0,
						title: {
							text: '_单位_（_台_）',
							rotation: 0,
							align: 'high',
							y: -20,
							x: 0,
							margin: -50,
						}
					},
					tooltip: {
						headerFormat: '<span style="font-size:10px">{point.key}</span><table style="width: 100px; overflow: hidden">',
						pointFormat: '<tr><td style="color:{series.color};padding:0"> </td>' +
						'<td style="padding:0"><b>{point.y:.0f} _台_</b></td></tr>',
						footerFormat: '</table>',
						shared: true,
						useHTML: true
					},
					plotOptions: {
						column: {
							pointPadding: 0.2,
							borderWidth: 0,
						}
					},
					series: ''
				},
				//饼状图公共参数
				pieData: {
					chart: {
						plotBackgroundColor: null,
						plotBorderWidth: null,
						plotShadow: false,
						marginLeft: 0,
						spacing: [25, 0, 5, 100]
					},
					legend: {
						align: 'left',
						verticalAlign: 'middle',
						layout: 'vertical',
						symbolHeight: 20,
						symbolWidth: 20,
						itemMarginBottom: 20,
						itemStyle: {
							color: '#bb9360',
						},
						y: 85,
						x: -100,
						labelFormatter:function(){
							return this.name.replace(/\([^\)]*\)/g,'')
						}
					},
					credits: {
						enabled: false
					},
					tooltip: {
						pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
					},
					plotOptions: {
						pie: {
							allowPointSelect: true,
							cursor: 'pointer',
							innerSize: 140,
							dataLabels: {
								enabled: false
							},
							showInLegend: true,
							size: 200,
							dataLabels: {
								enabled: true,
								allowOverlap: false,
								distance: -50,
								overflow: "none",
								format: '<b>{point.name}</b>: {point.percentage:.1f} %',
								style: {
									color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
								}
							},
							point: {
								events: {
									mouseOver: function (e) {  // 鼠标滑过时动态更新标题
										// 标题更新函数，API 地址：https:/.hcharts.cn/highcharts#Chart.setTitle

									}
									//,
									// click: function(e) { // 同样的可以在点击事件里处理
									//     chart.setTitle({
									//         text: e.point.name+ '\t'+ e.point.y + ' %'
									//     });
									// }
								}
							},
						}
					},
					series: '',
					title: {
						floating: true,
						verticalAlign: 'top',
						y: 0,
						x: -100,
						text: '',
						align: 'left',
						style: {"fontWeight": "bold", "fontFamily": '微软雅黑', "fontSize": "16px"}
					},
				},
				//折线图公共参数
				run: {
					chart: {
						marginLeft: 40,
						marginTop: 40,
						type: 'area'
					},
					title: {
						text: '',
						x: -20
					},
					credits: {
						enabled: false,
					},
					xAxis: {
						categories: ''
					},
					yAxis: {
						allowDecimals: false,
						title: {
							text: '',
							rotation: 0,
							align: 'high',
							y: -20,
							x: 70
						},
						labels: {
							x: 0,
							style: {
								whiteSpace: 'nowrap',
							}

						},
						tickPixelInterval: 50,
						plotLines: [{
							value: 0,
							width: 1,
							color: '#808080'
						}]
					},
					plotOptions: {
						series: {
							lineWidth: 3,
							fillOpacity: 0.1,
						},
//            area:{
//              color:"#e8f1fa",
//              lineColor:"rgb(124, 181, 236)"
//            }
					},
					tooltip: {
						valueSuffix: '',
						formatter: null
					},
					legend: {
						enabled: false
					},
					series: ''
				},
				timeOption: [
					{
					value: '1',
					label: '_最近一周_'
					}, {
					value: '2',
					label: '_最近_15_天_'
					}, {
					value: '3',
					label: '_最近_30_天_'
					}
				],
				FCouplingCount1: {},
				FOnLineCount1: {},
				FRunningCount1: {},
				FContainerCount1: {},
				FLockOpenCount1:{},
				FRefrigeratorWorkCount1:{},
				FRunningOnDayCount:{},
				FTemperatureNormalCount1:{},
				FRefrigeratorWorkCount1:{},


                /*******各系统不同数据******/
				lineChartArr:[],
				lineChartArr1: [
					"MileageCount",
					"AlarmOverSpeedCount",
					"CouplingCount",
					"EfficiencyCount"
				],
				lineChartArr2: [
					"MileageCount",
					"AlarmOverSpeedCount",
					"FLockOpenCount",
					"EfficiencyCount"
				],
				lineChartArr3: [
					"MileageCount",
					"AlarmOverSpeedCount",
					"TemperatureAbNormalCount",
					"EfficiencyCount"
				],
				lineChartArr4: [
					"MileageCount",
					"AlarmOverSpeedCount",
					"FuelImproper",
					"EfficiencyCount"
				],
				annularChartArr:[],
				annularChartArr1: [
					"FCouplingCount",
					"FOnLineCount",
					"FContainerCount",
					"FRunningCount",
					"FRunningOnDayCount"
				],
				annularChartArr2: [
					"FOnLineCount",
					"FRunningCount",
					"FLockOpenCount",
					"FRunningOnDayCount",
				],
				annularChartArr3: [
					"FOnLineCount",
					"FRunningCount",
					"FTemperatureNormalCount",
					"FRunningOnDayCount"
				],
				annularChartArr4: [
					"FOnLineCount",
					"FRunningCount",
					"FRunningOnDayCount"
				],

				reportvalue2: null,
				reportvalue2A: 'CouplingCount',
				reportvalue2B: 'FLockOpenCount',
				reportvalue2C: 'TemperatureAbNormalCount',
				reportvalue2D: 'FuelImproper',

				linkTo2:null,
				linkTo2A: {
					tabsText: "_接甩挂报表_",
					router: "TrailerReport"
				},
				linkTo2B:{
					tabsText:"_异常开锁报表_",
					router:"temperatureAlarm"
				},
				linkTo2C:{
					tabsText:"_温度异常报表_",
					router:"temperatureAlarm"
				},
				linkTo2D:{
					tabsText:"_油耗分析_",
					router:"OilWear"
				},

				reportType:[],
				reportType1: [
					{
					value: 'MileageCount',
					label: '_里程统计报表_'
				    },
					{
					value: 'EfficiencyCount',
					label: '_运行效率统计_'
				   },
				   {
					value: 'AlarmOverSpeedCount',
					label: '_超速报警报表_'
				   },
					{
					value: 'CouplingCount',
					label: '_接甩挂报表_'
				   }
				],
				reportType2: [
					{
					value: 'MileageCount',
					label: '_里程统计报表_'
				},
					{
					value: 'EfficiencyCount',
					label: '_运行效率统计_'
				},
				{
					value: 'AlarmOverSpeedCount',
					label: '_超速报警报表_'
				},
					{
					value: 'FLockOpenCount',
					label: '_开锁次数统计_'
				}
				],
				reportType3: [
					{
					value: 'MileageCount',
					label: '_里程统计报表_'
				},
					{
					value: 'EfficiencyCount',
					label: '_运行效率统计_'
				},
				{
					value: 'AlarmOverSpeedCount',
					label: '_超速报警报表_'
				}, {
					value: 'TemperatureAbNormalCount',
					label: '_温度异常统计_'
				}
				],
				reportType4: [
					{
						value: 'MileageCount',
						label: '_里程统计报表_'
					},
					{
						value: 'EfficiencyCount',
						label: '_运行效率统计_'
					},
					{
						value: 'AlarmOverSpeedCount',
						label: '_超速报警报表_'
					}, {
						value: 'FuelImproper',
						label: '_异常油耗统计_'
					}
				]
			}
		},
		props: {
			toChildrenSystemID: Number
		},
		filters: {
			translate (value) {
				switch (value){
						case "FHaveDataCount":
							return "_全部车辆_";
						case "FOnLineCount":
							return "_在线车辆_";
						case "FOffLineCount":
							return "_离线_";
						case "FUnCouplingCount":
							return "_甩挂车辆_";
						case "FCouplingCount":
							return "_接挂车辆_";
						case "FContainerCount":
							return "_有厢车辆_";
						case "FUnContainCount":
							return "_无厢车辆_";
						case "FRunningOnDayCount":
							return "_今日运行_";
						case "FStopOnDayCount":
							return "_今日未运行_";
						case "FRunningCount":
							return "_行驶车辆_";
						case "FStopCount":
							return "_停止车辆_";
						case "FAlarmCount":
							return "_报警车辆_";
						case "FNoAlarmCount":
							return "_无报警车辆_";
						case "FTemperatureAbnormalCount":
							return "_温度异常车辆_";
						case "FTemperatureNormalCount":
							return "_温度正常车辆_";
						case "FRefrigeratorNotWorkCount":
							return "_冷机异常车辆_";
						case "FRefrigeratorWorkCount":
							return "_冷机正常车辆_";
						case "FLockOpenCount":
							return "_开锁车辆_";
						case "FLockCloseCount":
							return "_上锁车辆_";
						default:
							return value
					}
			},
			translateLock(value){
				switch (value){
					case "FHaveDataCount":
						return "_全部设备_";
					case "FOnLineCount":
						return "_在线_";
					case "FOffLineCount":
						return "_离线_";
					case "FRunningOnDayCount":
						return "_今日运行_";
					case "FStopOnDayCount":
						return "_今日未运行_";
					case "FRunningCount":
						return "_行驶_";
					case "FStopCount":
						return "_停止_";
					case "FAlarmCount":
						return "_报警_";

					case "FLockOpenCount":
						return "_开锁_";
					case "FLockCloseCount":
						return "_上锁_";
					default:
						return value
				}
			},
			translate1:function (value) {

				switch (value){
					case "MileageCount":
						return "_里程统计报表_";
					case "AlarmOverSpeedCount":
						return "_超速报警报表_";
					case "CouplingCount":
						return "_接甩挂报表_";
					case "EfficiencyCount":
						return "_运行效率统计_";
					case "FLockOpenCount":
						return "_开锁次数统计_";
					case "TemperatureAbNormalCount":
						return "_温度异常统计_";
					case "FuelImproper":
					    return "_异常油耗统计_";
					default:
						return value

				}

			},
			translate2 (value) {
				switch (value) {
					case "FCouplingCount":
						return "_接甩挂比例_";
					case "FOnLineCount":
						return "_在线离线比例_";
					case "FContainerCount":
						return "_有厢无厢比例_";
					case "FRunningCount":
						return "_运行静止比例_";
					case "FLockOpenCount":
						return "_开关锁比例_";
					case "FRunningOnDayCount":
						return "_今日运行比例_";
					case "FRefrigeratorWorkCount":
						return "_冷机异常比例_";
					case "FTemperatureNormalCount":
						return "_温度异常比例_";
				}
			}
		},
		//created () {
		//},
		mounted () {
			console.log(1111)
			HighCharts.setOptions({
				lang: {
					resetZoom: '_重置_'
				}
			});
			Highcharts.setOptions({
				lang: {
					drillUpText: '<_返回_',
				}
			});
			let chart=HighCharts.chart('myChart', _this.option);
			chart.showLoading();
			let map = new Highcharts.Map('mapContainer', {
				title: {
					text: '_地理位置分布图_',
					style: {"fontFamily": '微软雅黑'}
				},
				loading:{
					credits: {
						enabled: false
					},
					labelStyle:{
						"display":"none",
						/*
						 "fontWeight": "bold",
						 "fontSize":"46px",
						 */
					},
					style: {
						"background":'url(/static/img/loading.gif) no-repeat center 100px'
					}
				}
			});
			map.showLoading();
			_this.dragging();

		},
		watch: {
			toChildrenSystemID () {
				this.SystemID=this.$store.state.choiceSystemID;
				//注意：由于数值变化会调用select的change事件
				switch (this.SystemID){
					case 1:
						this.lineChartArr=this.lineChartArr1;
						this.annularChartArr=this.annularChartArr1;
						this.reportvalue2=this.reportvalue2A;
						this.linkTo2=this.linkTo2A;
						this.reportType=this.reportType1;
						break;
					case 2:
						this.lineChartArr=this.lineChartArr2;
						this.annularChartArr=this.annularChartArr2;
						this.reportvalue2=this.reportvalue2B;
						this.linkTo2=this.linkTo2B;
						this.reportType=this.reportType2;
						break;
					case 3:
						this.lineChartArr=this.lineChartArr3;
						this.annularChartArr=this.annularChartArr3;
						this.reportvalue2=this.reportvalue2C;
						this.linkTo2=this.linkTo2C;
						this.reportType=this.reportType3;
						break;
					case 4:
						this.lineChartArr=this.lineChartArr4;
						this.annularChartArr=this.annularChartArr4;
						this.reportvalue2=this.reportvalue2D;
						this.linkTo2=this.linkTo2D;
						this.reportType=this.reportType4;
						break;
				}
				this.getHomeLastStyle();


				//获取车辆统计数据
				//this.getAllData();
				this.doQuery("carRunStopReport", "time", "reportTypeValue", "MileageCount");
				this.showMap("FHaveDataCount")




			},
			value1: function () {
				console.log("改变了")
			},
			AlarmOverSpeedCount: function () {
				this.doQuery("AlarmOverSpeed", "time1", "reportTypeValue1", "AlarmOverSpeedCount")
			},
/*
			FLockOpenCount: function () {
				this.doQuery("FLockOpenCount1", "time2", "reportTypeValue2", "FLockOpenCount")
			},
			TemperatureAbNormalCount: function () {
				this.doQuery("TemperatureAbNormalCount", "time2", "reportTypeValue2", "TemperatureAbNormalCount")
			},
			CouplingCount: function () {
				this.doQuery("CouplingCount", "time2", "reportTypeValue2", "CouplingCount")
			},
*/
			EfficiencyCount: function () {
				this.doQuery("EfficiencyCount", "time3", "reportTypeValue3", "EfficiencyCount")
			},
		},
		computed: {
			filtercarJsons: function () {
				if (this.showAll == false) {
					return this.carJsons.slice(0, 6)
				} else {
					return this.carJsons
				}
			},
			filterLineChartArr: function () {
				for (let i = _this.lineChartArr.length; i >= 0; i--) {
					$.each(_this.FLineChart, function (key, value) {
						if (_this.lineChartArr[i] == value) {
							_this.lineChartArr.splice(i, 1);
						}
					});
				}
				return this.lineChartArr
			},
			filterAnnularChartArr: function () {
				for (let i = _this.annularChartArr.length; i >= 0; i--) {
					$.each(_this.FAnnularPair, function (key, value) {
						if (_this.annularChartArr[i] == value) {
							_this.annularChartArr.splice(i, 1)
						}
					});
				}
				return this.annularChartArr
			},
			work: function () {
				if (this.showAll == false) {
					return "_点击显示更多状态_"
				} else {
					return "_点击收起_"
				}
			},
			pointer: function () {
				if (this.showAll == false) {
					return 'glyphicon-chevron-down'
				} else {
					return 'glyphicon-chevron-up'
				}
			},
		},
		methods: {
			translateStatus: function (value) {
				if(this.SystemID==2){
					switch (value){
						case "FHaveDataCount":
							return "_全部设备_";
						case "FOnLineCount":
							return "_在线_";
						case "FOffLineCount":
							return "_离线_";
						case "FRunningOnDayCount":
							return "_今日运行_";
						case "FStopOnDayCount":
							return "_今日未运行_";
						case "FRunningCount":
							return "_行驶_";
						case "FStopCount":
							return "_停止_";
						case "FAlarmCount":
							return "_报警_";
						case "FLockOpenCount":
							return "_开锁_";
						case "FLockCloseCount":
							return "_上锁_";
						default:
							return value
					}
				}else {
					switch (value){
						case "FHaveDataCount":
							return "_全部车辆_";
						case "FOnLineCount":
							return "_在线车辆_";
						case "FOffLineCount":
							return "_离线_";
						case "FUnCouplingCount":
							return "_甩挂车辆_";
						case "FCouplingCount":
							return "_接挂车辆_";
						case "FContainerCount":
							return "_有厢车辆_";
						case "FUnContainCount":
							return "_无厢车辆_";
						case "FRunningOnDayCount":
							return "_今日运行_";
						case "FStopOnDayCount":
							return "_今日未运行_";
						case "FRunningCount":
							return "_行驶车辆_";
						case "FStopCount":
							return "_停止车辆_";
						case "FAlarmCount":
							return "_报警车辆_";
						case "FNoAlarmCount":
							return "_无报警车辆_";
						case "FTemperatureAbnormalCount":
							return "_温度异常车辆_";
						case "FTemperatureNormalCount":
							return "_温度正常车辆_";
						case "FRefrigeratorNotWorkCount":
							return "_冷机异常车辆_";
						case "FRefrigeratorWorkCount":
							return "_冷机正常车辆_";
						default:
							return value
					}

				}
			},
			//根据类型解析 linechat title 路由链接数据
			parseRoute(value,type){
				let text,router;
				switch (value){
					case 'AlarmOverSpeedCount':
						text = '_超速报警_';
						router = 'speedAlarm';
						break;
					case 'MileageCount':
						text= '_行驶统计_';
						router = 'xingshi';
						break;
					case 'EfficiencyCount':
						text = '_运行效率分析_';
						router = 'xiaolv';
						break;
					case 'CouplingCount':
						text = '_接甩挂分析_';
						router = 'TrailerReport';
						break;
					case 'FLockOpenCount':
						text='_开锁次数统计_';
						router='FLockOpenCount';
						break;
					case 'TemperatureAbNormalCount':
						text='_温度异常_';
						router='temperatureAlarm';
						break;
					case 'FuelImproper':
						text='_油耗分析_';
						router='OilWear';
						break;
				}
				this[type].tabsText = text;
				this[type].router =router;
			},
			getReportType: function (value) {
				this.parseRoute(value,'linkTo0');
				this.reportTypeValue = value;
				this.doQuery("carRunStopReport", "time", "reportTypeValue", "MileageCount")
			},
			getReportType1: function (value) {
				this.parseRoute(value,'linkTo1');
				this.reportTypeValue1 = value;

				this.doQuery("AlarmOverSpeed", "time1", "reportTypeValue1", "AlarmOverSpeedCount")
			},
			getReportType2: function (value) {
				this.reportTypeValue2 = value;
				this.parseRoute(value,'linkTo2');
				switch (this.SystemID){
					case 1:
						this.doQuery("CouplingCount", "time2", "reportTypeValue2", "CouplingCount")
						break;
					case 2:
						this.doQuery("FLockOpenCount1", "time2", "reportTypeValue2", "FLockOpenCount")
						break;
					case 3:
						this.doQuery("TemperatureAbNormalCount", "time2", "reportTypeValue2", "TemperatureAbNormalCount")
						break;
					case 4:
						this.doQuery("FuelImproper", "time2", "reportTypeValue2", "FuelImproper")
						break;
				}



			},
			getReportType3: function (value) {
				this.reportTypeValue3 = value;
				this.parseRoute(value,'linkTo3');
				this.doQuery("EfficiencyCount", "time3", "reportTypeValue3", "EfficiencyCount")
			},
			getTimeValue: function (value) {
				this.time = value;
				this.doQuery("carRunStopReport", "time", "reportTypeValue", "MileageCount")
			},
			getTimeValue1: function (value) {
				this.time1 = value;
				this.doQuery("AlarmOverSpeed", "time1", "reportTypeValue1", "AlarmOverSpeedCount")
			},
			getTimeValue2: function (value) {
				this.time2 = value;
				switch (this.SystemID){
					case 1:
						this.doQuery("CouplingCount", "time2", "reportTypeValue2", "CouplingCount")
						break;
					case 2:
						this.doQuery("FLockOpenCount1", "time2", "reportTypeValue2", "FLockOpenCount")
						break;
					case 3:
						this.doQuery("TemperatureAbNormalCount", "time2", "reportTypeValue2", "TemperatureAbNormalCount")
						break;
					case 4:
						this.doQuery("FuelImproper", "time2", "reportTypeValue2", "FuelImproper")
						break;
				}
			},
			getTimeValue3: function (value) {
				this.time3 = value;
				this.doQuery("EfficiencyCount", "time3", "reportTypeValue3", "EfficiencyCount")
			},
			//修改首页样式
			updateHomeStyle(){
				let url="/web/Common/Common_HomePage";
				let datajson = JSON.stringify({
					FTokenID: _this.$store.state.FTokenID,
					FAction: 'UpdateHomePageLastStyle',
					FSystemType:this.SystemID,
					FT_HomePageLastStyle: this.FStatusBlock,
					FVersion: "1.0.0"
				});

				$.ajax({
					"url": url,
					"cache": false,
					"async": true,
					"type": "post",
					"dataType": "json",
					"contentType": "application/json; charset=utf-8",
					"data": datajson,
					success: function (json) {
						console.log("首页修改成功");
					},
					error: function () {

					}
				});
			},
			//获取首页最后样式
			getHomeLastStyle(){
				let SystemID=this.SystemID;
				let url="/web/Common/Common_HomePage";
				let postData={
					FTokenID:this.$store.state.FTokenID,
					FAction:"QueryHomePageLastStyle",
					FSystemType:SystemID,
					FVersion:"1.0.0"
				};

				$.ajax({
					"url":url,
					"cache": false,
					"async": true,
					"type": "post",
					"dataType": "json",
					"contentType": "application/json; charset=utf-8",
					"data":JSON.stringify(postData),
					success: function (json) {
						var obj = json;
						console.log("首页样式",obj);
						switch (SystemID){
						    case 1:

								if(obj.FObject.length==0){
									_this.FStatusBlock={
												FStatusBlock1:'FHaveDataCount',
												FStatusBlock2:'FOnLineCount',
												FStatusBlock3:'FOffLineCount',
												FStatusBlock4:'FRunningCount',
												FStatusBlock5:'FStopCount',
												FStatusBlock6:'FAlarmCount',
												FStatusBlock7:'FRunningOnDayCount',
												FStatusBlock8:'FStopOnDayCount',
												FStatusBlock9:'FCouplingCount',
												FStatusBlock10:'FUnCouplingCount',
												FStatusBlock11:'FContainerCount',
												FStatusBlock12:'FUnContainCount',
												FMapStatusIndex:1,
												FAnnularPair1:'FCouplingCount',
												FAnnularPair2:'FContainerCount',
												FAnnularPair3:'FOnLineCount',
												FAnnularPair4:'',
												FAnnularPair5:'',
												FAnnularPair6:'',
												FLineChart1:'MileageCount',
												FLineChart2:'',
												FLineChart3:'',
												FLineChart4:'',
												FLineChart5:'',
												FLineChart6:''
											}
								}else {
									_this.FStatusBlock = obj.FObject[0];
								}
						        break;
						    case 2:
								if(obj.FObject.length==0){
									_this.FStatusBlock={
										FStatusBlock1:'FHaveDataCount',
										FStatusBlock2:'FOnLineCount',
										FStatusBlock3:'FOffLineCount',
										FStatusBlock4:'FRunningCount',
										FStatusBlock5:'FStopCount',
										FStatusBlock6:'FAlarmCount',
										FStatusBlock7:'FRunningOnDayCount',
										FStatusBlock8:'FStopOnDayCount',
										FStatusBlock9:'FLockOpenCount',
										FStatusBlock10:'FLockCloseCount',
										FStatusBlock11:'',
										FStatusBlock12:'',
										FMapStatusIndex:1,
										FAnnularPair1:'FLockOpenCount',
										FAnnularPair2:'FOnLineCount',
										FAnnularPair3:'FRunningCount',
										FAnnularPair4:'',
										FAnnularPair5:'',
										FAnnularPair6:'',
										FLineChart1:'MileageCount',
										FLineChart2:'',
										FLineChart3:'',
										FLineChart4:'',
										FLineChart5:'',
										FLineChart6:''
									}
								}else {
									_this.FStatusBlock = obj.FObject[0];
								}
						        break;
							case 3:
								if(obj.FObject.length==0){
									_this.FStatusBlock={
										FStatusBlock1:'FHaveDataCount',
										FStatusBlock2:'FOnLineCount',
										FStatusBlock3:'FOffLineCount',
										FStatusBlock4:'FRunningCount',
										FStatusBlock5:'FStopCount',
										FStatusBlock6:'FAlarmCount',
										FStatusBlock7:'FRunningOnDayCount',
										FStatusBlock8:'FStopOnDayCount',
										FStatusBlock9:'FTemperatureNormalCount',
										FStatusBlock10:'FRefrigeratorNotWorkCount',
										FStatusBlock11:'',
										FStatusBlock12:'',
										FMapStatusIndex:1,
										FAnnularPair1:'FTemperatureNormalCount',
										FAnnularPair2:'FOnLineCount',
										FAnnularPair3:'FRunningCount',
										FAnnularPair4:'',
										FAnnularPair5:'',
										FAnnularPair6:'',
										FLineChart1:'MileageCount',
										FLineChart2:'',
										FLineChart3:'',
										FLineChart4:'',
										FLineChart5:'',
										FLineChart6:''
									}
								}else {
									_this.FStatusBlock = obj.FObject[0];
								}
								break;
							case 4:
								if(obj.FObject.length==0){
									_this.FStatusBlock={
										FStatusBlock1:'FHaveDataCount',
										FStatusBlock2:'FOnLineCount',
										FStatusBlock3:'FOffLineCount',
										FStatusBlock4:'FRunningCount',
										FStatusBlock5:'FStopCount',
										FStatusBlock6:'FAlarmCount',
										FStatusBlock7:'FRunningOnDayCount',
										FStatusBlock8:'FStopOnDayCount',
										FStatusBlock9:'',
										FStatusBlock10:'',
										FStatusBlock11:'',
										FStatusBlock12:'',
										FMapStatusIndex:1,
										FAnnularPair1:'FRunningOnDayCount',
										FAnnularPair2:'FRunningCount',
										FAnnularPair3:'FOnLineCount',
										FAnnularPair4:'',
										FAnnularPair5:'',
										FAnnularPair6:'',
										FLineChart1:'MileageCount',
										FLineChart2:'',
										FLineChart3:'',
										FLineChart4:'',
										FLineChart5:'',
										FLineChart6:''
									}
								}else {
									_this.FStatusBlock = obj.FObject[0];
								}
								break;
						};
						//console.log("首页状态",_this.FStatusBlock);
						for (let i = 1; i < 4; i++) {
							let k = "FAnnularPair" + i;
							_this.FAnnularPair[k] = _this.FStatusBlock[k];
						};
						//console.log("环形图状态",_this.FAnnularPair);
						for (let i = 1; i < 7; i++) {
							let k = "FLineChart" + i;
							_this.FLineChart[k] = _this.FStatusBlock[k];
						};
						$.each(_this.FAnnularPair, function (key, value) {
							_this[value] = true;
						});
						$.each(_this.FLineChart, function (key, value) {
							_this[value] = true;
						});

						_this.getAllData();


					},
					error: function () {
						console.log("请求失败")
					}
				});

			},
			//获取首页统计数据
			getAllData: function () {
				let url,postData;
				switch (this.SystemID){
				    case 1:
				        url="/web/Trailer/Trailer_HomePage";
						postData={
							FTokenID:_this.$store.state.FTokenID ,
							FAction:"QueryHomePageCount",
							FSystemType:1,
							FVersion:"1.0.0"};
				        break;
				    case 2:
						url="/web/Lock/Lock_HomePage";
						postData={
							FTokenID:_this.$store.state.FTokenID ,
							FAction:"QueryHomePageCount",
							FSystemType:2,
							FVersion:"1.0.0"};
				        break;
					case 3:
						url="/web/ColdChain/ColdChain_HomePage";
						postData={
							FTokenID:_this.$store.state.FTokenID ,
							FAction:"QueryHomePageCount",
							FSystemType:3,
							FVersion:"1.0.0"};
						break;
					case 4:
						url="/web/FleetManager/FleetManager_HomePage";
						postData={
							FTokenID:_this.$store.state.FTokenID ,
							FAction:"QueryHomePageCount",
							FSystemType:4,
							FVersion:"1.0.0"};
						break;
				}


				$.ajax({
					"url":url,
					"cache": false,
					"async": true,
					"type": "post",
					"dataType": "json",
					"contentType": "application/json; charset=utf-8",
					"data":JSON.stringify(postData) ,
					success: function (json) {
						_this.carJsons = [];
						var obj = json;
						console.log("车辆统计数据",obj);

						let all=obj.FObject[0].FHaveDataCount;
						let outLine=all - obj.FObject[0].FOnLineCount;
						let b = all - obj.FObject[0].FOnLineCount - obj.FObject[0].FOffLineCount;

						for (let i = 1; i < 13; i++) {
							let k = "FStatusBlock" + i;
							if(_this.FStatusBlock[k]!=''){
								let tag={
									status :_this.FStatusBlock[k],
									number : obj.FObject[0][_this.FStatusBlock[k]],
									noposition: b
								}
								_this.carJsons.push(tag)

							}



						}



						//在线离线比例

						_this.FOnLineCount1=_this.deepCopy(_this.pieData);
						_this.FOnLineCount1.title.text="_在线离线比例_";
						_this.FOnLineCount1.series = [{
							type: 'pie',
							name: '_比例_',
							data: [
								{name: '_在线_'+'('+obj.FObject[0].FOnLineCount+'/'+all+')', y: obj.FObject[0].FOnLineCount / all * 100, color: '#5b9fd4'},
								{name: '_离线_'+'('+outLine+'/'+all+')', y: outLine/ all * 100, color: '#b4b3b3'}
							],
						}];
						_this.FOnLineCount1.legend.labelFormatter=function(){return this.name.replace(/\([^\)]*\)/g,'')}

						//运行静止比例
						var sum2 = obj.FObject[0].FRunningCount + obj.FObject[0].FStopCount;
						_this.FRunningCount1=_this.deepCopy(_this.pieData);
						_this.FRunningCount1.title.text="_运行静止比例_";
						_this.FRunningCount1.series = [{
							type: 'pie',
							name: '_比例_',
							data: [
								{name: '_运行_'+'('+obj.FObject[0].FRunningCount+'/'+sum2+')', y: obj.FObject[0].FRunningCount/sum2*100, color: '#42a742'},
								{name: '_静止_'+'('+obj.FObject[0].FStopCount+'/'+sum2+')', y: obj.FObject[0].FStopCount / sum2*100, color: '#e69a29'}
							]
						}];
						_this.FRunningCount1.legend.labelFormatter=function(){return this.name.replace(/\([^\)]*\)/g,'')};

						//今日是否运行比例
						var sum3 = obj.FObject[0].FRunningOnDayCount + obj.FObject[0].FStopOnDayCount;
						_this.FRunningOnDayCount1=_this.deepCopy(_this.pieData);
						_this.FRunningOnDayCount1.title.text="_今日运行比例_";
						_this.FRunningOnDayCount1.series = [{
							type: 'pie',
							name: '_比例_',
							data: [
								{name: '_今日运行_'+'('+obj.FObject[0].FRunningOnDayCount+'/'+sum3+')', y: obj.FObject[0].FRunningOnDayCount / sum3 * 100,color:"#6a967b"},
								{name: '_今日未运行_'+'('+obj.FObject[0].FStopOnDayCount+'/'+sum3+')', y: obj.FObject[0].FStopOnDayCount / sum3 * 100,color:"#bb9360"}
							],
						}];
						_this.FRunningOnDayCount1.legend.labelFormatter=function(){return this.name.replace(/\([^\)]*\)/g,'')}


						switch (_this.SystemID){
						    case 1:
								//接甩挂比例
								var sum5 = obj.FObject[0].FCouplingCount + obj.FObject[0].FUnCouplingCount;
								_this.FCouplingCount1 = _this.deepCopy(_this.pieData);
								_this.FCouplingCount1.title.text = "_接甩挂比例_";
								_this.FCouplingCount1.series = [{
									type: 'pie',
									name: '_比例_',
									data: [
										{name: '_接挂_'+'('+obj.FObject[0].FCouplingCount+'/'+sum5+')', y: obj.FObject[0].FCouplingCount / sum5 * 100, color: '#035682'},
										{name: '_甩挂_'+'('+obj.FObject[0].FUnCouplingCount+'/'+sum5+')', y: obj.FObject[0].FUnCouplingCount / sum5 * 100, color: '#498ca6'}
									]
								}];
								_this.FCouplingCount1.legend.labelFormatter=function(){return this.name.replace(/\([^\)]*\)/g,'')}
								//有厢无厢比例
								var sum4 = obj.FObject[0].FContainerCount + obj.FObject[0].FUnContainCount;
								_this.FContainerCount1 = _this.deepCopy(_this.pieData);
								_this.FContainerCount1.title.text = "_有厢无厢比例_";
								_this.FContainerCount1.series = [{
									type: 'pie',
									name: '_比例_',
									data: [
										{name: '_有厢_'+'('+obj.FObject[0].FContainerCount+'/'+sum4+')', y: obj.FObject[0].FContainerCount / sum4 * 100, color: "#6f7ccb"},
										{name: '_无厢_'+'('+obj.FObject[0].FUnContainCount+'/'+sum4+')', y: obj.FObject[0].FUnContainCount / sum4 * 100, color: "#60b19d"}
									]
								}];
								_this.FContainerCount1.legend.labelFormatter=function(){return this.name.replace(/\([^\)]*\)/g,'')}

								break;
						    case 2:
								//开关锁比例
								var sum6 = obj.FObject[0].FLockOpenCount + obj.FObject[0].FLockCloseCount;
								_this.FLockOpenCount1=_this.deepCopy(_this.pieData);
								_this.FLockOpenCount1.title.text="_开关锁比例_";
								_this.FLockOpenCount1.series = [{
									type: 'pie',
									name: '_比例_',
									data: [
										{name: '_开锁车辆_'+'('+obj.FObject[0].FLockOpenCount+'/'+sum6+')',y: obj.FObject[0].FLockOpenCount / sum6 * 100, color: '#035682'},
										{name: '_上锁车辆_'+'('+obj.FObject[0].FLockCloseCount+'/'+sum6+')',y: obj.FObject[0].FLockCloseCount / sum6 * 100, color: '#498ca6'}
									]
								}];
								_this.FLockOpenCount1.legend.labelFormatter=function(){return this.name.replace(/\([^\)]*\)/g,'')}
								break;
							case 3:
								//温度是否正常比例
								var sum7 = obj.FObject[0].FTemperatureNormalCount + obj.FObject[0].FTemperatureAbnormalCount;
								_this.FTemperatureNormalCount1=_this.deepCopy(_this.pieData);
								_this.FTemperatureNormalCount1.title.text="_温度异常比例_";
								_this.FTemperatureNormalCount1.series = [{
									type: 'pie',
									name: '_比例_',
									data: [
										{name: '_温度正常_'+'('+obj.FObject[0].FTemperatureNormalCount+'/'+sum7+')',y: obj.FObject[0].FTemperatureNormalCount / sum7 * 100, color: '#035682'},
										{name: '_温度异常_'+'('+obj.FObject[0].FTemperatureAbnormalCount+'/'+sum7+')',y: obj.FObject[0].FTemperatureAbnormalCount / sum7 * 100, color: '#498ca6'}
									]
								}];
								_this.FTemperatureNormalCount1.legend.labelFormatter=function(){return this.name.replace(/\([^\)]*\)/g,'')}
								break;
						}

						_this.showAnnularChart();

					},
					error: function () {
						console.log("请求失败")
					},
				});
			},
			//绘制环形图
			showAnnularChart: function () {
				$.each(_this.FAnnularPair, function (key, value) {
					HighCharts.chart(key, _this[value + 1]);
				})
			},
			//拖动
			dragging: function () {
				//console.log("注册拖拽事件");
				this.$dragging.$on('dragend', ()=> {
					let arr=_this.carJsons;
					for (let i = 0; i < arr.length; i++) {
						let k = "FStatusBlock" + (i + 1);
						_this.FStatusBlock[k] = arr[i].status
					}
					console.log(_this.FStatusBlock);
					_this.updateHomeStyle();
				})
			},
			//添加环形图
			addAnnularChart: function () {
				if (this.checkName1 != null) {
					_this.annularChartArr.push(_this.FAnnularPair.FAnnularPair1);
					_this.FStatusBlock.FAnnularPair1 = _this.FStatusBlock.FAnnularPair2;
					_this.FStatusBlock.FAnnularPair2 = _this.FStatusBlock.FAnnularPair3;
					_this.FStatusBlock.FAnnularPair3 = this.checkName1;
					_this.FAnnularPair.FAnnularPair1 = _this.FAnnularPair.FAnnularPair2;
					_this.FAnnularPair.FAnnularPair2 = _this.FAnnularPair.FAnnularPair3;
					_this.FAnnularPair.FAnnularPair3 = this.checkName1;
					this.showAnnularChart();
					_this.updateHomeStyle();
					this.checkName1 = null;
				} else {
					this.$message({
						showClose: true,
						message: '_你没有选中_',
						type: 'warning'
					});
				}
			},
			//添加折线图
			addLineChart: function () {
				if (this.checkName.length != 0) {
					for (let i = 0; i < this.checkName.length; i++) {
						switch (this.checkName[i]) {
							case "AlarmOverSpeedCount":
								this.FStatusBlock.FLineChart2 = "AlarmOverSpeedCount";
								this.FLineChart.FLineChart2 = "AlarmOverSpeedCount"
								this.AlarmOverSpeedCount = true;
								break;
							case "CouplingCount":
								this.FStatusBlock.FLineChart3 = "CouplingCount";
								this.FLineChart.FLineChart3 = "CouplingCount"
								this.CouplingCount = true;
								break;
							case "EfficiencyCount":
								this.FStatusBlock.FLineChart4 = "EfficiencyCount";
								this.FLineChart.FLineChart4 = "EfficiencyCount"
								this.EfficiencyCount = true;
								break;
							case "FLockOpenCount":
								this.FStatusBlock.FLineChart3 = "FLockOpenCount";
								this.FLineChart.FLineChart3 = "FLockOpenCount";
								this.FLockOpenCount = true;
								break;
							case "TemperatureAbNormalCount":
								this.FStatusBlock.FLineChart3 = "TemperatureAbNormalCount";
								this.FLineChart.FLineChart3 = "TemperatureAbNormalCount";
								this.TemperatureAbNormalCount = true;
								break;
							case "FuelImproper":
								this.FStatusBlock.FLineChart3 = "FuelImproper";
								this.FLineChart.FLineChart3 = "FuelImproper";
								this.FuelImproper = true;
								break;
						}
					}
					this.updateHomeStyle();
				} else {
					this.$message({
						showClose: true,
						message: '_你没有选中_',
						type: 'warning'
					});
				}
				console.log(this.FLineChart)
			},
			deleteLineChart: function (type, index) {
				this[type] = false;
				if(type=="AlarmOverSpeedCount"){
					this.reportvalue1="AlarmOverSpeedCount";
				}else if(type=="EfficiencyCount"){
					this.reportvalue3="EfficiencyCount";
				}else {
					this.reportvalue2=type;
				}


				this.FStatusBlock[index] = "";
				this.lineChartArr.push(this.FLineChart[index]);
				this.FLineChart[index] = "";
				this.updateHomeStyle();
				console.log(this.FLineChart)

			},
			choiceTagData(status){
				this.showMap(status);
				this.getAllData();
			},
			showMap: function (status) {
				let url,FAction;
				switch (this.SystemID){
				    case 1:
						url="/web/Common/Common_HomePage";
						FAction="QueryVehiclePositionList";
				        break;
				    case 2:
						url="/web/Lock/Lock_HomePage";
						FAction="QueryAssetPositionList";
				        break;
					case 3:
						url="/web/ColdChain/ColdChain_HomePage";
						FAction="QueryVehiclePositionList";
						break;
					case 4:
						url="/web/Common/Common_HomePage";
						FAction="QueryVehiclePositionList";
						break;
				}

				let postData={
					FTokenID:_this.$store.state.FTokenID,
					FAction:FAction,
					FDataType:status,
					FSystemType:_this.SystemID,
					FVersion:"1.0.0"
				};
				$.ajax({
					"url": url,
					"cache": false,
					"async": true,
					"type": "post",
					"dataType": "json",
					"contentType": "application/json; charset=utf-8",
					"data":JSON.stringify(postData),
					success: function (json) {
						console.log("mapData",json)
						var Fobj = json;
						var Baidu = new baidu.baiduAPI();
						_this.option.title.text="_分布柱状图_"+"("+_this.translateStatus(status)+")";

						_this.provinceArray = [];
						_this.carArray = [];
						_this.cityArray = [];
						_this.carCityArray = [];
						var province = [];
						var count = 0;
						var a = 0;
						if (Fobj.FObject.length == 0) {
							//深拷贝 避免破坏原有数据格式
							let option=_this.deepCopy(_this.option);
							option.xAxis.categories = [];
							option.series = [{}];
							option.series[0].data = [];
							 //_this.option.xAxis.max=9;
							 //_this.option.scrollbar=true;
							 //if(_this.provinceArray.length<10){
							 //  _this.option.xAxis.max=_this.provinceArray.length-1;
							 //  _this.option.scrollbar=false;
							 //}else {
							 //}

							HighCharts.chart('myChart', option);

							_this.drawMap();

							return
						}
						//转换经纬度
						$.each(Fobj.FObject, function (index, obj) {
							var point = Baidu.GetPosition(obj.FLongitude, obj.FLatitude);
							var geoc = Baidu.GetClientGeocoder();
							Baidu.Geoco_GetLocation(geoc, point, function (json) {
								//统计各省车辆
								var addre_city = json.addressComponents.city.replace(/地区/g, '市');
								var addre_province = json.addressComponents.province;
                                //if(addre_province==''){
                                //  addre_province='盲区'
                                //}
								if (_this.provinceArray.indexOf(addre_province) == -1) {
									if (addre_province == '') {
										a++;
									} else {
										_this.provinceArray.push(addre_province);
										_this.carArray.push(1);
									}
								} else {
									var index = _this.provinceArray.indexOf(addre_province);
									_this.carArray[index]++;
								}
								if (_this.cityArray.indexOf(addre_city) == -1) {
									_this.cityArray.push(addre_city);
									_this.carCityArray.push(1);
								} else {
									var index = _this.cityArray.indexOf(addre_city);
									_this.carCityArray[index]++
								}
								count++;
								getObj()
							});
							function getObj() {
								if (count == Fobj.FObject.length) {
									for (var i = 0; i < _this.provinceArray.length; i++) {
										province.push({y: _this.carArray[i], name: _this.provinceArray[i]})
									}
									province.sort(function (a, b) {
										return b.y - a.y
									});
									if (a != 0) {
										province.push({y: a, name: "盲区"})
									}
									// setTimeout(function () {
								    //_this.option.xAxis.categories = _this.provinceArray;
									_this.option.series = [{}];
									_this.option.series[0].data = province;
									console.log("开始绘图")
									HighCharts.chart('myChart', _this.option);
									_this.drawMap();
								}
							}

						});

					},
					error: function () {
						console.log("请求失败")
					}

				});
			},
			getDate: function (datestr) {
				var temp = datestr.split("-");
				temp[1]=(temp[1]-1).toString();
				var date = new Date(temp[0], temp[1], temp[2]);
				return date;
			},
			//绘制地图
			drawMap(){
				var map = null,
					geochina = 'https://data.jianshukeji.com/jsonp?filename=geochina/',
				//不能加载的省份或地区，包括台湾、香港、澳门、南海，各直辖市
					unDrilldown = ['taiwan', 'xianggang', 'aomen', 'nanhai', 'beijing', 'tianjin', 'shanghai', 'chongqing'];

				$.getJSON('/static/china.json', function (mapdata) {
					var data = [];
					// 随机数据
					Highcharts.each(mapdata.features, function (md, index) {
						data.push({
							fullname: md.properties.fullname,
							name: md.properties.name,
							drilldown: md.properties.filename, // 赋值 drilldown
							value: 0 // 生成 1 ~ 100 随机值
						});
					});


					for (let i = 0; i < data.length; i++) {
						for (let j = 0; j < _this.provinceArray.length; j++) {
							if (data[i].fullname == _this.provinceArray[j]) {
								data[i].value = _this.carArray[j]
							}
						}
					}
					map = new Highcharts.Map('mapContainer', {
						chart: {
							events: {
								drilldown: function (e) {
									// 异步加载
									if (e.point.drilldown && unDrilldown.indexOf(e.point.drilldown) === -1) {
										var pointName = e.point.properties.fullname;
										map.showLoading('_加载中_，_请稍后_...');
										// 获取二级行政地区数据并更新图表
										$.getJSON(geochina + e.point.drilldown + '.json&callback=?', function (data) {
											data = Highcharts.geojson(data);
											Highcharts.each(data, function (d) {
												d.value = 0
											});
											for (let i = 0; i < data.length; i++) {
												for (let j = 0; j < _this.cityArray.length; j++) {
													if (data[i].properties.fullname == _this.cityArray[j]) {
														data[i].value = _this.carCityArray[j]
													}
												}
											}
											map.hideLoading();
											map.addSeriesAsDrilldown(e.point, {
												name: e.point.name,
												data: data,
												dataLabels: {
													enabled: true,
													format: '{point.name}'
												},
											});
											map.setTitle({
												text: pointName
											});
										});
									}
								},
								drillup: function () {
									map.setTitle({
										text: '_地理位置分布图_'
									});
								}
							}
						},
						title: {
							text: '_地理位置分布图_',
							style: {"fontFamily": '微软雅黑'}
						},
						credits: {
							enabled: false
						},
						mapNavigation: {
							enabled: true,
							buttonOptions: {
								verticalAlign: 'bottom'
							}
						},
						tooltip: {
							useHTML: true,
							headerFormat: '<table><tr><td>{point.name}</td></tr>',
							pointFormat: '<tr><td colspan="2">{point.properties.parent}</td></tr>' +
							'<tr><td colspan="2">{point.properties.fullname}</td></tr>' +
							'<tr><td>_车辆_：</td><td>{point.value}台</td></tr>',
							footerFormat: '</table>'
						},
						colorAxis: {
							min: 0,
							minColor: '#ffffff',
							maxColor: '#1c78d2',
							labels: {
								style: {
									"color": "red", "fontWeight": "bold"
								},
								formatter: function () {
									return this.value.toFixed(0)
								}
							}
						},
						series: [{
							data: data,
							mapData: mapdata,
							joinBy: 'name',
							name: '_中国地图_',
							states: {
								hover: {
									color: '#a4edba'
								}
							},
							dataLabels: {
								enabled: true,
								format: '{point.name}'
							}
						}],
					});
				});
				_this.finishMap = true;
			},
			//车辆运行状况图表
			doQuery: function (c, t, r, init) {
				let url;
				switch (this.SystemID){
					case 1:
						url="/web/Trailer/Trailer_HomePage";
						break;
					case 2:
						url="/web/Lock/Lock_HomePage";
						break;
					case 3:
						url="/web/ColdChain/ColdChain_HomePage";
						break;
					case 4:
						url="/web/Trailer/Trailer_HomePage";
						break;
				}



				//获取时间和报表类型
				var _this = this;
				var reportType;
				var today = new Date();
				var year = today.getFullYear();
				var month = today.getMonth() + 1;
				var day = today.getDate();
				if (month < 10) {
					month = "0" + month;
				}
				if (day < 10) {
					day = "0" + day;
				}
				var endTime = year + "-" + month + "-" + day + ' 23:59:59';
				switch (this[t]) {
					case "1":
					case "" :
						var startday = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);
						var startyear = startday.getFullYear();
						var startmonth = startday.getMonth() + 1;
						var startday = startday.getDate();
						if (startmonth < 10) {
							startmonth = "0" + startmonth;
						}
						if (startday < 10) {
							startday = "0" + startday;
						}
						var startTime = startyear + "-" + startmonth + "-" + startday + ' 00:00:00';
						break;
					case "2":
						var startday = new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000);
						var startyear = startday.getFullYear();
						var startmonth = startday.getMonth() + 1;
						var startday = startday.getDate();
						if (startmonth < 10) {
							startmonth = "0" + startmonth;
						}
						if (startday < 10) {
							startday = "0" + startday;
						}
						var startTime = startyear + "-" + startmonth + "-" + startday + ' 00:00:00';
						break;
					case "3":
						var startday = new Date(today.getTime() - 29 * 24 * 60 * 60 * 1000);
						var startyear = startday.getFullYear();
						var startmonth = startday.getMonth() + 1;
						var startday = startday.getDate();
						if (startmonth < 10) {
							startmonth = "0" + startmonth;
						}
						if (startday < 10) {
							startday = "0" + startday;
						}
						var startTime = startyear + "-" + startmonth + "-" + startday + ' 00:00:00';
						break;
				}

				if (this[r] == '') {
					reportType = init
				} else {
					reportType = this[r];
				}
 				let UTCStartTime=this.parseUTC(startTime),
 				    UTCEndTime=this.parseUTC(endTime);
				$.ajax({
					'url':url,
					'cache': false,
					'async': true,
					'type': 'Post',
					'dataType': 'json',
					'contentType': 'application/json;charset=utf-8',
					'data': '{"FTokenID":"' + _this.$store.state.FTokenID + '","FAction":"QueryHomePageLineChartData","FDataType":"' + reportType + '","FStartTime":"' + UTCStartTime + '","FEndTime":"' + UTCEndTime + '","FSystemType":"'+_this.SystemID+'","FVersion":"1.0.0"}',
					success: function (data) {
						var Fobj = data;
						console.log("类型",reportType,data);
						_this.run.xAxis.categories = [];
						//获取开始时间跟结束之间的每一天
						var startTime1 = _this.getDate(startTime.slice(0, 11));
						var endTime1 = _this.getDate(endTime.slice(0, 11));
						while ((endTime1.getTime() - startTime1.getTime()) >= 0) {
							var year = startTime1.getFullYear();
							var month = (startTime1.getMonth()+1).toString().length == 1 ? "0" + (startTime1.getMonth()+1).toString(): startTime1.getMonth()+1;
							var day = startTime1.getDate().toString().length == 1 ? "0" + startTime1.getDate() : startTime1.getDate();
							var dateStr = year + "-" + month + "-" + day;
							_this.run.xAxis.categories.push(dateStr);
							startTime1.setDate(startTime1.getDate() + 1);
						}
						_this.run.series = [{}];
						_this.run.series[0].data = [];

						let lineOption=_this.deepCopy(_this.run);

						switch (reportType){
						    case 'MileageCount':
								lineOption.series[0].name = '_运行里程_';
								lineOption.yAxis.title.text = '_公里_(km)';
								lineOption.tooltip.formatter = function () {
									return '<b>' + this.x + '</b><br/>' + this.series.name + ': ' + Highcharts.numberFormat(this.y, 0, '.', "") + '_公里_' + '<br/>';
								};
								$.each(Fobj.FObject, function (index, obj) {
									obj.FDate = obj.FDate.split("T")[0];
									var i = lineOption.xAxis.categories.indexOf(obj.FDate);
									if (i != -1) {
										lineOption.series[0].data[i] = obj.FTotalMileage
									}
								});
								for (let i = 0; i < lineOption.xAxis.categories.length; i++) {
									if (lineOption.series[0].data[i] == undefined) {
										lineOption.series[0].data[i] = 0;
									}
								}
								//国内使用单位规则
								if(_this.$store.state.language=="CN"){
									lineOption.yAxis.labels.formatter=function(){
										if(this.value>=10000){
											return this.value/10000+"万"
										}else if(this.value>=10000*100){
											return this.value/(10000*100)+"百万"
										} else {
											return this.value/1000+"千"
										}
									}
								}
						        break;
						    case 'AlarmOverSpeedCount':
								lineOption.series[0].name = '_超速报警次数_';
								lineOption.yAxis.title.text = '_次数_(_次_)';
								lineOption.tooltip.formatter = function () {
									return '<b>' + this.x + '</b><br/>' + this.series.name + ': ' + Highcharts.numberFormat(this.y, 0, '.', "") + '_次_' + '<br/>';
								};
								$.each(Fobj.FObject, function (index, obj) {
									var i = lineOption.xAxis.categories.indexOf(obj.FDate);
									if (i != -1) {
										lineOption.series[0].data[i] = obj.OverSpeedCount
									}
								});
								for (let i = 0; i <lineOption.xAxis.categories.length; i++) {
									if (lineOption.series[0].data[i] == undefined) {
										lineOption.series[0].data[i] = 0;
									}
								}
						        break;
							case 'CouplingCount':
								lineOption.series[0].name = '_接甩挂次数_';
								lineOption.yAxis.title.text = '_次数_(_次_)';
								lineOption.tooltip.formatter = function () {
									return '<b>' + this.x + '</b><br/>' + this.series.name + ': ' + Highcharts.numberFormat(this.y, 0, '.', "") + '_次_' + '<br/>';
								};
								$.each(Fobj.FObject, function (index, obj) {
									var i = lineOption.xAxis.categories.indexOf(obj.FDate);
									if (i != -1) {
										lineOption.series[0].data[i] = obj.FUnCouplingCount
									}
								});
								for (let i = 0; i < lineOption.xAxis.categories.length; i++) {
									if (lineOption.series[0].data[i] == undefined) {
										lineOption.series[0].data[i] = 0;
									}
								}
								break;
							case 'EfficiencyCount':
								lineOption.series[0].name = '_运行效率_';
								lineOption.yAxis.title.text = '_效率_(%)';
								lineOption.tooltip.formatter = function () {
									return '<b>' + this.x + '</b><br/>' + this.series.name + ': ' + Highcharts.numberFormat(this.y, 0, '.', "") + '%' + '<br/>';
								};
								$.each(Fobj.FObject, function (index, obj) {
									obj.FDate = obj.FDate.split("T")[0];
									var i = lineOption.xAxis.categories.indexOf(obj.FDate);
									if (i != -1) {
										lineOption.series[0].data[i] = obj.FRunningDuration/(obj.FAllDuration)*100
									}
								});
								for (let i = 0; i < lineOption.xAxis.categories.length; i++) {
									if (lineOption.series[0].data[i] == undefined) {
										lineOption.series[0].data[i] = 0;
									}
								}
								break;
							case 'FLockOpenCount':
								lineOption.series[0].name = '_开锁次数_';
								lineOption.yAxis.title.text = '_次数_(_次_)';
								lineOption.tooltip.formatter=function () {
									return '<b>' +this.x+ '</b><br/>' + this.series.name + ': ' + Highcharts.numberFormat(this.y, 0, '.', "") +'_次_' +'<br/>';
								};
								$.each(Fobj.FObject, function (index, obj) {
									var i=lineOption.xAxis.categories.indexOf(obj.FDate);
									if(i!=-1){
										lineOption.series[0].data[i]=obj.FLockOpenCount
									}
								});
								for (let i=0;i<_this.run.xAxis.categories.length;i++){
									if(lineOption.series[0].data[i]==undefined){
										lineOption.series[0].data[i]=0;
									}
								}
								break;
							case 'TemperatureAbNormalCount':
								lineOption.series[0].name = '_温度异常统计_';
								lineOption.yAxis.title.text = '_次数_(_次_)';
								lineOption.tooltip.formatter = function () {
									return '<b>' + this.x + '</b><br/>' + this.series.name + ': ' + Highcharts.numberFormat(this.y, 0, '.', "") + '_次_' + '<br/>';
								};
								$.each(Fobj.FObject, function (index, obj) {
									var i = lineOption.xAxis.categories.indexOf(obj.FDate);
									if (i != -1) {
										lineOption.series[0].data[i] = obj.FTemperatureAbNormalCount
									}
								})
								for (let i = 0; i < lineOption.xAxis.categories.length; i++) {
									if (lineOption.series[0].data[i] == undefined) {
										lineOption.series[0].data[i] = 0;
									}
								}
								break;
							case "FuelImproper":
								lineOption.series[0].name = '_异常油耗统计_';
								lineOption.yAxis.title.text = '_次数_(_次_)';
								lineOption.tooltip.formatter = function () {
									return '<b>' + this.x + '</b><br/>' + this.series.name + ': ' + Highcharts.numberFormat(this.y, 0, '.', "") + '_次_' + '<br/>';
								};
								$.each(Fobj.FObject, function (index, obj) {
									var i = lineOption.xAxis.categories.indexOf(obj.FDate);
									if (i != -1) {
										lineOption.series[0].data[i] = obj.FuelImproper
									}
								})
								for (let i = 0; i < lineOption.xAxis.categories.length; i++) {
									if (lineOption.series[0].data[i] == undefined) {
										lineOption.series[0].data[i] = 0;
									}
								}
								break;
						}

						HighCharts.chart(c, lineOption);
					},
					error: function () {
						console.log("请求失败")
					}

				})
			},
			sendLink: function (value) {
				let data=this.deepCopy(value);
				this.$emit('changeRoute', data);
				this.$router.push({path: data.router})
			}
		},
		activated(){

			if(this.leaveTime){
				 _this.showMap("FHaveDataCount");
				 _this.getHomeLastStyle();
				 this.leaveTime=false;
			 }

			this.interval=setInterval(function(){
				_this.getHomeLastStyle();
				_this.showMap("FHaveDataCount")
			},5*60*1000)


			setTimeout(function(){
				_this.leaveTime=true;
			},5*60*1000)
		},
		deactivated(){
			//组件停用时 停止定时器
			if(this.interval!=null) clearInterval(this.interval);
		},
		beforeDestroy: function () {
			console.log("被销毁");
		}

	}

</script>


<style>
  ul li {
    list-style:none;
  }
  .mycontainer {
    width:100%;
    padding:0px;
    margin-top:5px;
    height:100%;
    overflow-y:scroll;
    overflow-x:hidden;
    font-family:'微软雅黑', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
  }

  .sortable {
    padding-left:10px;
    margin-bottom:0px;
  }

  .carstatus-container {
    padding-left:0px;
    padding-right:10px;
  }

  .panel {
    margin-bottom:10px;
  }

  .chart-title {
    font-family:'微软雅黑', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size:18px !important;
    font-weight:bold !important;
    cursor: pointer;
  }
  .park {
    height:74px;
    margin-bottom:10px;
    padding:5px;
    -webkit-border-radius:5px;
    -moz-border-radius:5px;
    border-radius:5px;
    color:#fff;
  }
  .park .left-icon{
    position:absolute;
    left:8%;
    top:14px;
    width:46px;
    height:46px;
  }
  .park:hover {
    box-shadow:6px 6px 2px #cccccc;
    cursor:move;
  }

  .park .text{
    text-align:right;
  }
  .park .number{
    margin-left:35%;
    font-size:28px;
    font-family: "Helvetica Neue";
    line-height:34px;
  }
  .carstatus {
    margin-left:35%;
    font-size:14px;
    line-height:24px;
  }
  .tagMore{
	  position: absolute;
	  bottom: -24px;
	  z-index: 809;
	  width:100%;
	  height: 24px;
	  margin-left:-10px;
	  display:block;
	  text-align: center;
	  cursor: pointer;
	  background: url('/static/img/carIcon/more.png') no-repeat center
  }
  /*车辆状态*/
  .FHaveDataCount {
    border:3px solid #005fc6;
    color:#005fc6;
  }
  .FHaveDataCount .left-icon{
    background-position:0 -279px;
  }

  .FCouplingCount {
    border:3px solid #035682;
    background:#035682;
  }
  .FCouplingCount .left-icon{
    background-position:-46px -279px;
  }
  .FUnCouplingCount {
    border:3px solid #498ca6;
    background:#498ca6;
  }
  .FUnCouplingCount .left-icon{
    background-position:-92px -279px;
  }



  .FOnLineCount {
    border:3px solid #5b9fd4;
    background:#5b9fd4;
  }
  .FOnLineCount .left-icon{
    background-position:-138px -325px;
  }

  .FOffLineCount {
    border:3px solid #b4b3b3;
    background:#b4b3b3;
  }
  .FOffLineCount .left-icon{
    background-position:-184px -325px;
  }

  .FRunningCount {
    border:3px solid #42a742;
    background:#42a742;
  }
  .FRunningCount .left-icon{
    background-position:0 -325px;
  }

  .FStopCount {
    border:3px solid #e69a29;
    background:#e69a29;
  }
  .FStopCount .left-icon{
    background-position:-46px -325px;
  }


  .FContainerCount {
    border:3px solid #6f7ccb;
    background:#6f7ccb;
  }
  .FContainerCount .left-icon{
    background-position:0 -371px;
  }

  .FUnContainCount {
    border:3px solid #60b19d;
    background:#60b19d;
  }
  .FUnContainCount .left-icon{
    background-position:-46px -371px;
  }

  .FAlarmCount {
    border:3px solid #c93a3a;
    background:#c93a3a;
  }
  .FAlarmCount .left-icon{
    background-position:-92px -325px;
  }

  .FRunningOnDayCount {
    border:3px solid #6a967b;
    background:#6a967b;
  }
  .FRunningOnDayCount .left-icon{
    background-position:-138px -279px;
  }

  .FStopOnDayCount {
    border:3px solid #bb9360;
    background:#bb9360;
  }
  .FStopOnDayCount .left-icon{
    background-position:-184px -279px;
  }

  /*电子锁&冷链*/
  .FLockCloseCount,.FTemperatureNormalCount{
    border:3px solid #035682;
    background:#035682;
  }
  .FLockCloseCount .left-icon{
    background-position:-92px -371px;
  }
  .FTemperatureNormalCount .left-icon{
    background-position:0 -417px;
  }
  .FLockOpenCount,.FTemperatureAbnormalCount{
    border:3px solid #498ca6;
    background:#498ca6;
  }
  .FLockOpenCount .left-icon{
    background-position:-138px -371px;
  }
  .FTemperatureAbnormalCount .left-icon{
    background-position:-184px -371px;
  }
  .FRefrigeratorWorkCount{
    border:3px solid #498ca6;
    background:#498ca6;
  }
  .FRefrigeratorNotWorkCount{
    border:3px solid #498ca6;
    background:#498ca6;
  }

  .addstatus {
    border:3px solid #c9c9c9;
    color:#c9c9c9;

  }

  .addcar {
    text-align:center;
    margin-top:40px;
    font-size:14px;
  }

  @media (max-width:1400px){
    .carstatus {
      line-height:18px;
      font-size:12px;
    }
    .park .number{
      font-size:24px;
      line-height:30px;
    }

  }


  .deleteStatus {
    float:right;
    text-decoration:none;
    cursor:pointer;
    font-size:18px;
    font-weight:bold;
    display:none;
  }
  .show {
    display:block;
  }

  .chart {
    height:480px;
    padding-top:30px;
  }

  .mapContainer {
    height:440px;
  }

  .hightchart {
    height:440px;
  }

  .circle {
    height:250px;
    position:relative;
  }

  .circle li {
    height:240px;
  }

  .carRunStopReport {
    height:300px;
  }

  .selectBox {
    float:right;
    width:226px;
    height:40px;

  }

  .modal-dialog {
    width:400px;
    margin-top:300px;
  }

  .modal-title {
    color:#005fc6;
    font-weight:bold;
  }

  .modal-header {
    height:50px;
  }

  .modal-body {
    padding:0px 15px;
  }

  .modal-body ul li {
    height:40px;
    line-height:30px;
    padding:4px;
    border-bottom:1px solid #cccccc;
  }

  .modal-body ul li input {
    width:16px;
    height:16px;
  }

  .modal-footer {
    text-align:center;
    padding-top:10px;
    padding-bottom:0px;
    height:50px;
  }

  .modal-footer button {
    /*width: 40px;*/
  }

  .sortable {
    position:relative;
  }

  .addChart {
    cursor:pointer;
    text-align:center;
    line-height:60px;
  }

  .selectoption {
    width:150px;
    height:20px !important;
  }

  .selectoption input {
    height:24px !important;
  }

  .panel-heading label {
    font-size:14px;
  }

</style>
