<!--百度地图组件-->
<template>
	<div id="map-component">
		<!--地图工具-->
		<ul id="map-tool" v-show="mapToolShow">
			<!--地图选择-->
			<li class="map-tool-item halving-r-line">
				<button data-toggle="dropdown" type="button" class="btn-white btn-custom">
					{{mapType==0?'_百度地图_':'_谷歌地图_'}} <i class="fa fa-caret-down padding-l-4"></i>
					</span>
				</button>
				<ul class="dropdown-menu">
					<li><a @click="choiceMap(0)">_百度地图_</a></li>
					<li><a @click="choiceMap(1)">_谷歌地图_</a></li>
				</ul>

			</li>
			<!--地图选择 end-->
			<!--当前地图中心位置-->
			<li v-if="mapType==1" class="map-tool-item halving-r-line">{{Area}}</li>
			<!--城市选择 star--><!--     -->
			<change-city v-if="mapType==0" ref="city" :Area="Area" @cityData="changeMap"></change-city>
			<!--城市选择 end-->
			<!--智能搜索-->
			<li class="map-tool-item">
				<div v-if="mapType==0" class="search-area">
					<input id="baidu-search" v-model="searchMapText" @keyup.enter="searchMap(searchMapText)" type="text"
						   onfocus="this.select()" onmouseup="this.select()" class="input-custom border-radius-2 width-150" placeholder="_智能搜索_">
					<span class="search-area-btn" @click="searchMap(searchMapText)"><i class="fa fa-search"></i></span>
					<div id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;"></div>
				</div>
				<div v-show="mapType==1" class="search-area">
					<input id="G-search" class="input-custom border-radius-2 width-150" v-model="searchMapText"
						   onfocus="this.select()" onmouseup="this.select()" placeholder="_智能搜索_">
					<span class="search-area-btn" @click="deleteGoogleSearch"><i class="fa fa-close (alias)"></i></span>
				</div>
			</li>
			<li class="map-tool-item halving-r-line" v-if="isShowAreaSearch">
				<button data-toggle="dropdown" type="button" class="btn-white btn-custom">
					<i class="img-icon map-icon map-icon1"></i>_框选查找_</i>
				</button>
				<ul class="dropdown-menu">

					<li><a @click="rectangleSearchCar" href="javascript:;"><i
						class="img-icon sub-map-icon sub-map-icon2"></i>_框选查车_</a></li>
					<li><a @click="rectangleSearch(1)" href="javascript:;"><i
						class="img-icon sub-map-icon sub-map-icon1"></i>_区域检索_</a></li>
					<!--
					<li><a @click="rectangleSearch(1)" href="javascript:;"><i class="img-icon sub-map-icon sub-map-icon3"></i>_找加油站_</a></li>
					<li><a @click="rectangleSearch(2)" href="javascript:;"><i class="img-icon sub-map-icon sub-map-icon4"></i>_找停车场_</a></li>
					<li><a @click="rectangleSearch(3)" href="javascript:;"><i class="img-icon sub-map-icon sub-map-icon5"></i>_找高速出入口_</a></li>
					<li><a @click="rectangleSearch(4)" href="javascript:;"><i class="img-icon sub-map-icon sub-map-icon6"></i>_找收费站_</a></li>
-->
				</ul>
			</li>
			<li class="map-tool-item halving-r-line" v-if="!isShowAreaSearch">
				<button @click="rectangleSearch(1)" data-toggle="dropdown" type="button" class="btn-white btn-custom">

					<i class="img-icon map-icon map-icon1"></i>_区域检索_</i>
				</button>
			</li>
			<li class="map-tool-item halving-r-line">
				<button data-toggle="dropdown" type="button" class="btn-white btn-custom">
					<i class="img-icon map-icon map-icon2"></i>_创建围栏_<i class="fa fa-caret-down padding-l-4"></i>
				</button>
				<ul class="dropdown-menu">
					<!--<li><a @click="setFence(1)" href="javascript:;"><i class="fa fa-circle-o"></i>_圆形围栏_</a></li>-->
					<li><a @click="setFence(2)" href="javascript:;"><i class="fa fa-square-o"></i>_矩形围栏_</a></li>
					<li><a @click="setFence(3)" href="javascript:;"><i class="fa fa-star-o"></i>_多边形围栏_</a></li>
				</ul>
			</li>
			<!--显示围栏-->
			<li class="map-tool-item halving-r-line show-fence">
				<button @click="getFenceData" data-toggle="dropdown" type="button" class="btn-white btn-custom"><i
					class="img-icon map-icon map-icon3"></i>
					_显示围栏_<i class="fa fa-caret-down padding-l-4"></i></button>
				<ul class="dropdown-menu">
					<li class="fence-li">
						<a class="text-center" @click.stop="showFence('all')">_显示全部_({{allFenceData==null?0:allFenceData['all'].length}})</a>
					</li>
					<li class="fence-li" v-if="fenceArr.graph.length!=0">
						<a class="text-center"  @click.stop="hideFence()">_隐藏围栏_</a>
					</li>
					<li v-for="item in fenceTypeData" class="fence-li">
						<a @click.stop="showFence(item.ID)" href="javascript:;" class="clearfix">
							<i class="img-icon fencetype-icon" :class="'fencetype-icon'+item.icon"></i>
							{{item.name}}&nbsp;({{allFenceData==nullsho?0:allFenceData[item.ID].length}})
							<i class="color-box"
							   :style="{borderColor:item.strokeColor,backgroundColor:item.fillColor}"></i>
						</a>
					</li>
				</ul>
			</li>

			<li v-show="mapType==0" class="map-tool-item halving-r-line">
				<button @click="ranging" type="button" class="btn-white btn-custom">
					<i class="img-icon map-icon map-icon4"></i>_测距_
				</button>
			</li>
			<li class="map-tool-item halving-r-line">
				<button @click="roadCondition" :class="{'open':IsActive.road,'':!IsActive.road}"
						type="button" class="btn-white btn-custom">
					<i class="img-icon map-icon map-icon5"></i>_路况_
				</button>

			</li>
			<li class="map-tool-item">
				<button @click="showAllMap" type="button" class="btn-white btn-custom"><i
					class="img-icon map-icon map-icon6"></i>_全图_
				</button>
			</li>
			<li class="map-tool-item  float-right">
				<button @click="openFullScreen" :class="{'open':IsActive.fullScreen,'':!IsActive.fullScreen}"
						type="button"
						class="btn-white btn-custom"><i class="fa fa-arrows-alt padding-r-8"></i>{{IsActive.fullScreen?'_退出全屏_':'_全屏_'}}
				</button>
			</li>
		</ul>
		<!--地图内容-->
		<div id="map-wrapper">
			<div id="map-container"></div>
			<!------进度控制器--------->
			<div class="fatherProgress" v-if="carPointArr!=0">
				<div id="checkboxTable">
					<!--<i class='clicktogg'>点击按钮出现车辆弹框</i>-->
					<div class="checkbox-control">
						<label><input type="checkbox" @change="showPlayPoint(playNumber)"
									  v-model="options.showTime"><span>_时间_</span></label>
						<label><input type="checkbox" @change="showPlayPoint(playNumber)" v-model="options.showMileage"><span>_里程_</span></label>
						<label><input type="checkbox" @change="showPlayPoint(playNumber)"
									  v-model="options.showSpeed"><span>_速度_</span></label>
						<label><input type="checkbox" @change="setStopMarker"
									  v-model="options.showStopTime"><span>_停车点_</span></label>
					</div>
					<div class="amountKilo">_总里程_ : {{allMileage}}km<br>_总时长_ : {{allRunTime}}</div>
					<!--<i class="togg bottom-33"></i>-->
				</div>
				<!--进度条-->
				<div id="my-progressbar" class="progress xs progress-grenn">
					<div v-dragX="moveProgressbar" class="progress-yuan" id="progress-yuan"
						 v-bind:style="{left:getPercent-3+'%'}"></div>

					<div role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"
						 class="progress-bar progress-bar-yellow no-transition" v-bind:style="{width:getPercent+'%'}">
					</div>
				</div>
				<p class="play-speed">_播放速度_：{{playSpeed}}×</p>
				<div class="row padding-6">
					<div class="col-xs-12">
						<div class="text-center" onselectstart="return false;" style="-moz-user-select:none;">
							<a @click="backwardsPlaySpeed" class="control-panel xj-p-backward" id="xj-p-backward"
							   title="_快退_"><i class="ace-icon fa xj-p-backward"></i></a>
							<a @click="subPlaySpeed" class="control-panel xj-p-slow" id="xj-p-slow" title="_减速_"><i
								class="ace-icon fa xj-p-slow"></i></a>
							<a @click="playPoint" :class="{'btn-active':btnActive[0].active,'':!btnActive[0].active}"
							   class="control-panel xj-p-play" id="xj-p-play" title="_播放_"><i
								class="ace-icon fa xj-p-play"></i></a>
							<a @click="stopPlayPoint"
							   :class="{'btn-active':btnActive[1].active,'':!btnActive[1].active}"
							   class="control-panel xj-p-pause" id="xj-p-pause" title="_暂停_"><i
								class="ace-icon fa xj-p-pause"></i></a>
							<a @click="overPlayPoint"
							   :class="{'btn-active':btnActive[2].active,'':!btnActive[2].active}"
							   class="control-panel xj-p-stop" id="xj-p-stop" title="_停止_"><i
								class="ace-icon fa xj-p-stop"></i></a>
							<a @click="addPlaySpeed" class="control-panel xj-p-fast" id="xj-p-fast" title="_加速_"><i
								class="ace-icon fa xj-p-fast"></i></a>
							<a @click="forwardPlaySpeed" class="control-panel xj-p-forward" id="xj-p-forward"
							   title="_快进_"><i class="ace-icon fa xj-p-forward"></i></a>
						</div>
					</div>
				</div>
			</div>
			<!--车辆列表-->
			<div id="map-carlist" class="panel panel-primary map-carlist" v-show="isMapCarlistShow">
				<div v-drag="['map-carlist','map-wrapper']" class="panel-heading">
					<a class="close" @click="closeCarsList">&times;</a>
					<h3 class="panel-title">_选中的车辆_</h3>
				</div>
				<ul class="panel-body">
					<li>
						<p>
							<strong>
								_当前区域内车辆数_：<span class="text-primary">{{areaChoiceArr.length}}</span>_辆_
							</strong>
						</p>
					</li>
					<li class="carlist-content">
						<ul>
							<li v-for="item in carListpage">

								<strong @click="showCarPlace(item.point)" class="cursor-pointer">{{item.name}}</strong>
								<p class="text-muted">{{item.address}}</p>
							</li>
						</ul>
					</li>

					<li v-show="areaChoiceArr.length>5" align="center">
						<el-pagination @current-change="searchCarPage"
									   small layout="prev, pager, next" :page-size="5"
									   :total="areaChoiceArr.length">
						</el-pagination>
					</li>
				</ul>
			</div>
			<!--围栏内容-->
			<div class="modal-backdrop fade in" v-show="isCreateFence"></div>
			<!--创建围栏-->
			<div id="creat-fence" class="panel panel-primary map-fence" v-if="isCreateFence">
				<div v-drag="['creat-fence','map-wrapper']" class="panel-heading">
					<a class="close" @click="closeCreateFencePanel">&times;</a>
					<h3 class="panel-title">_创建围栏_</h3>
				</div>
				<ul class="panel-body">
					<li>
						<label><span class="text-red">*</span>_名称_：</label><input maxlength="20"
																				  v-model="drawingData.name"
																				  type="text">
						<label>_编号_：</label><input maxlength="20" onkeyup="this.value=this.value.replace(/[\W]/g,'')"
												   oninput="this.value=this.value.replace(/[\W]/g,'')"
												   v-model="drawingData.number" type="text">
					</li>
					<li>
						<label><span class="text-red">*</span>_类型_：</label>
						<div class="map-select-wrap">
							<button data-toggle="dropdown" type="button" class="map-select">
								{{choicFenceType}}
								<div class="sp-dd">▼</div>
							</button>
							<ul class="dropdown-menu">
								<li v-for="item in fenceTypeData" class="fence-li">
									<a @click="redrawFence(item)" href="javascript:;">
										<i class="img-icon fencetype-icon" :class="'fencetype-icon'+item.icon"></i>
										{{item.name}}
										<i class="color-box"
										   :style="{borderColor:item.strokeColor,backgroundColor:item.fillColor}"></i>
									</a>
								</li>
							</ul>
						</div>
						<label>_面积_：</label><input v-model="drawingData.area" type="text" disabled>
					</li>
					<li>
						<label>_经度_：</label><input v-model="drawingData.center.lng" type="text" disabled>
						<label>_纬度_：</label><input v-model="drawingData.center.lat" type="text" disabled>
					</li>
					<li>
						<label>_位置_：</label><input class="address-input" v-model="drawingData.address" type="text"
												   disabled>
					</li>
					<li class="textarea-wrap">
						<label>_备注_：</label><textarea @keyup="textareaMaxLength($event)"
													  @paste="textareaMaxLength($event)" v-model="drawingData.remark"
													  maxlength="100"
													  onkeydown="if(this.value.length>100) {event.returnValue=false}"></textarea>
					</li>
					<li style="padding:6px 0 0 70px">
						<button @click="confirmSetFence()" type="button" class="el-button search el-button--primary">
							_保存_
						</button>
						<el-dropdown @command="resetFence">
							<el-button type="primary">
								_重绘类型_<i class="el-icon-caret-bottom el-icon--right"></i>
							</el-button>
							<el-dropdown-menu slot="dropdown">
								<!--<el-dropdown-item command="1">_圆形_</el-dropdown-item>-->
								<el-dropdown-item command="2">_矩形_</el-dropdown-item>
								<el-dropdown-item command="3">_多边形_</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
						<!--
						<button @click="resetFence" type="button" class="el-button reset el-button&#45;&#45;primary">_重绘_</button>
-->
						<button @click="closeCreateFencePanel" type="button"
								class="el-button cancel el-button--primary">_取消_
						</button>
					</li>

				</ul>
			</div>
			<!--编辑围栏-->
			<div id="redact-fence" class="panel panel-primary map-fence" v-if="isRedactFence">
				<div v-drag="['redact-fence','map-wrapper']" class="panel-heading">
					<a class="close" @click="closeRedactFencePanel">&times;</a>
					<h3 class="panel-title">_编辑围栏_</h3>
				</div>
				<ul class="panel-body">
					<li>
						<label><span class="text-red">*</span>_名称_：</label><input maxlength="20"
																				  v-model="drawingData.name"
																				  type="text">
						<label>_编号_：</label><input maxlength="20" onkeyup="this.value=this.value.replace(/[\W]/g,'')"
												   oninput="this.value=this.value.replace(/[\W]/g,'')"
												   v-model="drawingData.number" type="text">
					</li>
					<li>
						<label><span class="text-red">*</span>_类型_：</label>
						<div class="map-select-wrap">
							<button data-toggle="dropdown" type="button" class="map-select">
								{{choicFenceType}}
								<div class="sp-dd">▼</div>
							</button>
							<ul class="dropdown-menu">
								<li v-for="item in fenceTypeData" class="fence-li">

									<a @click="redactRedrawFence(item)" href="javascript:;">
										<i class="img-icon fencetype-icon" :class="'fencetype-icon'+item.icon"></i>
										{{item.name}}
										<i class="color-box"
										   :style="{borderColor:item.strokeColor,backgroundColor:item.fillColor}"></i>
									</a>
								</li>
							</ul>
						</div>
						<label>_面积_：</label><input v-model="drawingData.area" type="text" disabled>
					</li>
					<li>
						<label>_经度_：</label><input v-model="drawingData.center.lng" type="text" disabled>
						<label>_纬度_：</label><input v-model="drawingData.center.lat" type="text" disabled>
					</li>
					<li>
						<label>_位置_：</label><input class="address-input" v-model="drawingData.address" type="text"
												   disabled>
					</li>
					<li class="textarea-wrap">
						<label>_备注_：</label><textarea @keyup="textareaMaxLength($event)"
													  @paste="textareaMaxLength($event)" v-model="drawingData.remark"
													  maxlength="100"
													  onkeydown="if(this.value.length>100) {event.returnValue=false}"></textarea>
					</li>
					<li style="padding:6px 0 0 70px">
						<button @click="confirmSetFence(true)" type="button"
								class="el-button search el-button--primary">_保存_
						</button>
						<el-dropdown @command="redactResetFence">
							<el-button type="primary">
								_重绘类型_<i class="el-icon-caret-bottom el-icon--right"></i>
							</el-button>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item command="1">_圆形_</el-dropdown-item>
								<el-dropdown-item command="2">_矩形_</el-dropdown-item>
								<el-dropdown-item command="3">_多边形_</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
						<!--
												<button @click="resetFence" type="button" class="el-button reset el-button&#45;&#45;primary">_重绘_</button>
						-->
						<button @click="closeRedactFencePanel" type="button"
								class="el-button cancel el-button--primary">_取消_
						</button>
					</li>

				</ul>
			</div>
			<!--错误提示-->
			<div class="errorShow" v-show="isErrorShow">{{errorTxt}}</div>
		</div>
		<!--车辆详情-->
		<el-dialog custom-class="vehical-info" :visible.sync="detailDialog" size="small">
			<span slot="title" style="display: inline-block;margin: -15px 0 15px 0;">_车辆详情_</span>
			<table class="table table-bordered">
				<tbody>
				<tr>
					<td colspan="2" rowspan="3" width="30%">
						<img src="/static/img/user-car.png" style="height:100px;width:100%">
					</td>
					<td>_司机_:</td>
					<td width="18%">{{detail.FDriverName}}</td>
					<td>_所属车队_:</td>
					<td width="18%">{{detail.FVehicleGroupFullName}}</td>
				</tr>
				<tr>

					<td>_发动机号_:</td>
					<td>{{detail.FEngineNumber}}</td>
					<td>_车辆类型_:</td>
					<td>{{detail.FVehicleTypeID}}</td>
				</tr>
				<tr>
					<td>_座位数量_(_个_):</td>
					<td>{{detail.FSeatCount}}</td>
					<td>_吨位_:</td>
					<td>{{detail.FTonnage}}</td>
				</tr>
				<tr>
					<td>_车牌号_:</td>
					<td width="18%">{{detail.FVehicleName}}</td>
					<td>_车辆颜色_:</td>
					<td>{{detail.FColorRGB}}</td>
					<td>_车身长度_(m):</td>
					<td>{{detail.FLength}}</td>
				</tr>
				<tr>
					<td>_车架号_:</td>
					<td>{{detail.FVIN}}</td>
					<td>_百公里油耗_(L):</td>
					<td>{{detail.FFuelConsume}}</td>
					<td>_保险公司_:</td>
					<td>{{detail.FInsuCompany}}</td>
				</tr>
				<tr>
					<td>_自编号_:</td>
					<td>{{detail.FVehicleSerialCode}}</td>
					<td>_车辆购买日期_:</td>
					<td>{{detail.FPurchaseDate}}</td>
					<td>_注册日期_:</td>
					<td>{{detail.FRegisDate}}</td>
				</tr>
				<tr>
					<td>_营运证号_:</td>
					<td>{{detail.FOperPermNumber}}</td>
					<td>_道路运输证号_:</td>
					<td>{{detail.FRoadTranNumber}}</td>
					<td>_道路运输证有效期_:</td>
					<td>{{detail.FRoadTranDate}}</td>
				</tr>
				<tr>
					<td>_设备号_:</td>
					<td>{{detail.FAssetID}}</td>
					<td>_所属公司_:</td>
					<td>{{detail.FShortName}}</td>
					<td>_技术登记有效期_:</td>
					<td>{{detail.FTechRegDate}}</td>
				</tr>
				<tr>
					<td>_运营类型_:</td>
					<td>{{detail.FOperateType}}</td>
					<td>_油箱体积_(m³):</td>
					<td>{{detail.FTankVolume}}</td>
					<td>_状态_:</td>
					<td>{{detail.FStatus}}</td>
				</tr>
				<tr>
					<td>_燃油类型_:</td>
					<td>{{detail.FFuelType}}</td>
					<td>_最大砼容量_(m³):</td>
					<td>{{detail.FMaxVariaLoad}}</td>
					<td>_保险日期_:</td>
					<td>{{detail.FInsuDate}}</td>
				</tr>
				<tr>
					<td>_描述_:</td>
					<td colspan="5">{{detail.FDescription}}</td>
				</tr>
				</tbody>
			</table>
		</el-dialog>
	</div>
</template>
<script>
	import changeCity from "./changeCity.vue"
	require('js/GIS/Baidu/Lib/BaiduAPI_TrafficControl.js')
	require('js/GIS/Baidu/Lib/BaiduAPI_DistanceTool_min.js')
	require('js/GIS/Baidu/Lib/BaiduAPI_DrawingManager_min.js')
	require('js/GIS/Baidu/Lib/BaiduAPI_TextIconOverlay.js')
	require('js/GIS/Baidu/Lib/BaiduAPI_MarkerClusterer.js')
	require('js/GIS/Baidu/Lib/GeoUtils.js')

	require('js/GIS/Google/Lib/markerclusterer.js')

	require('!style!css!plugins/spectrum/spectrum.css')
	require('plugins/spectrum/spectrum.js')
	export default{
		data(){
			return {
				systemID: null,//系统ID
				mapType: null,//地图类型
				level: 5,   //地图缩放等级
				IsActive: {
					road: false,
					ranging: false,
					fullScreen: false,
					isShowIconBox: false
				},
				MarkerClusterer:null, //marker聚合对象
				btnActive: [ //控制按钮激活状态
					{active: false},
					{active: false},
					{active: false}],
				mapToolShow: this.faData[0], //初始化显示工具栏
				isShowAreaSearch: this.faData[1], //是否显示区域检索
				searchMapText: "",  //搜索数据
				Area: null,

				initPoint: {   //初始坐标
					lng: 105.564341,
					lat: 35.643579
				},

				allPointsArr: [],   //全图点坐标数组

				carPointArr: [],       //运行轨迹点的数据
				carRunArr: [],        //运行段数据
				tirePressureArr: [],  //胎压数据

				carStopPointArr: [],  //停车点数据集合
				stopPointIndex: [],   //停车点对应索引值集合

				startTimeIndex: [],  //运行段起始点和终点索引值数组
				endTimeIndex: [],
				allRunTime: 0, //总运行时间
				allMileage: 0,      //总运行里程
				allLineArr: [],		  //轨迹相关所有对象数组
				runLineArr: [],	  //运行段对象数组
				intervalArr: [],   //里程点对象数组
				stopArr: [],       //停车点对象数组
				redPolyline: [],   //报警段
				playPointArr: [],  //播放点对象数组
				startIndex: 6,    //点轨迹开始索引值

				options: {          //显示选项控制
					showTime: true,
					showMileage: true,
					showSpeed: true,
					showStopTime: true
				},

				playSpeed: 1, //播放速度
				playNumber: 0,

				progressWidth: null, //进度条宽度数据
				errorTxt: '', //错误提示内容
				searchResult: [],//保存地图搜索结果
				latelyData: [],  //实时车辆数据
				latelyArr: [],  //实时车辆绘制图标和文字对象容器
				areaChoiceArr: [],  //区域选择车辆容器
				carListpage: [],    //车辆列表分页数据
				drawingArr: [],     //绘制图形容器
				fenceArr: {         //服务器围栏数据绘制对象
					graph: [],
					icon: [],
					closeIcon: []
				},
				isMapCarlistShow: false,
				isCreateFence: false,
				isRedactFence: false,
				isErrorShow: false,
				isRedactRedrawing: true,  //是不是编辑状态不重绘围栏形状 只更改状态
				redactFenceIndex: null,
				drawingData: {    //绘图数据
					name: null,	 //围栏名称
					number: "",   //自定义编号
					remark: "",   //备注
					area: null,   //面积
					formType: 0,  //类型  1圆 2矩形 3多边形
					fenceType: 0,
					path: null,   //多边形&&矩形 各顶点坐标数组  {lng:"",lat:""}
					radius: null, //圆形半径
					center: {lng: null, lat: null},  //围栏近似中心点坐标
					address: null,                //围栏近似中心点地址
				},

				choicFenceType: '_请选择类型_',    //所选围栏类型
				fenceTypeData: [
					/*
					 {
					 ID:1,
					 icon:1,
					 name:"_工厂_",
					 strokeColor:"rgba(237,154,21,.8)",   //围栏描边颜色
					 fillColor:"rgba(237,154,21,.4)",  //围栏填充颜色
					 },
					 {
					 ID:2,
					 icon:2,
					 name:"_收费站_",
					 strokeColor:"rgba(53,106,195,.8)",   //围栏描边颜色
					 fillColor:"rgba(53,106,195,.4)",  //围栏填充颜色
					 },
					 {
					 ID:3,
					 icon:3,
					 name:"_仓库_",
					 strokeColor:"rgba(42,193,156,.8)",   //围栏描边颜色
					 fillColor:"rgba(42,193,156,.4)",  //围栏填充颜色
					 },
					 {
					 ID:4,
					 icon:4,
					 name:"_物流园_",
					 strokeColor:"rgba(0,160,233,.8)",   //围栏描边颜色
					 fillColor:"rgba(0,160,233,.4)",  //围栏填充颜色
					 },
					 {
					 ID:5,
					 icon:5,
					 name:"_码头.堆场_",
					 strokeColor:"rgba(38,26,178,.8)",   //围栏描边颜色
					 fillColor:"rgba(38,26,178,.4)",  //围栏填充颜色
					 }
					 */
				],             //绘图类型 icon 颜色
				fenceTypeObj: null,
				allFenceData: null,               //储存所有围栏信息
				choiceFenceType: null,            //保存当前查看围栏状态
				infoWindowArr: [],                //保存google 地图infoWindow对象

				//详情展示
				detailDialog:false,
				detail:{
					FVehicleName:'',
					FAssetID:'',   //终端号
					FVehicleSerialCode:'',
					FVIN:'',
					FEngineNumber:'',
					FVehicleTypeID:'',   //车辆类型
					FTankVolume:'',
					FSeatCount:'',
					FTonnage:'',
					FMaxVariaLoad:'',
					FColorRGB:'',
					FLength:'',
					FFuelType:'',
					FFuelConsume:'',
					FInsuCompany:'',
					FInsuDate:new Date(),
					FPurchaseDate:new Date(),
					FRegisDate:new Date(),
					FOperPermNumber:'',
					FRoadTranNumber:'',
					FRoadTranDate:new Date(),
					FTechRegDate:new Date(),
					FImage:'',
					FVehicleGroupFullName:'',
					//  FShortName:'',
					FOperateType:'',
					FDriverName:'',
					FDescription:'',
					FStatus:1,
					FAssetGUID:'',  //终端唯一标识ID
					FVehicleGroupGUID:'',  //车队ID
					// FAgentGUID:'',    //代理商ID
					FAdminDriverGUID:''  //司机id
				},

				remoteUnlockLimits:this.$store.state.remoteUnlockLimits   //开锁权限

			}
		},
		components: {
			changeCity
		},
		props: {
			faData: Array
		},
		mounted(){
			this.systemID = this.$store.state.choiceSystemID;
			let _this = this;
			this.progressWidth = $("#my-progressbar").width;


		},
		methods: {
			/**
			 * ************* 1.公共部分********************
			 * */
			// 显示错误提示
			showError(txt){
				let _this = this;
				this.errorTxt = txt;
				this.isErrorShow = true;
				setTimeout(function () {
					_this.isErrorShow = false;
				}, 1500)
			},
			//添加路由标签
			changeRoute(menuData){
				this.$emit('changeRoute', menuData);
			},
			//全屏
			openFullScreen(){
				this.IsActive.fullScreen = !this.IsActive.fullScreen;
				this.$emit('fullScreen', this.IsActive.fullScreen);
			},


			/***
			 * ************* 2.封装地图公共方法***********
			 * ****
			 * */
			//加载地图 0百度 1谷歌
			initMap(){
				let _this = this;
				if (this.mapType == null)    this.mapType = this.$store.state.globalMapType;

				let center = null,
					zoom = null;
				let Mpoint = this.getMapPoint(this.initPoint);
				switch (this.mapType) {
					case 0:
						this.map = new BMap.Map("map-container");
						this.map.addControl(new BMap.NavigationControl());
						this.map.enableScrollWheelZoom();//启用地图滚轮放大缩小
						this.map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
						this.map.enableKeyboard();//启用键盘上下左右键移动地图
						this.map.enableAutoResize();  //启用自动适应容器尺寸变化  主要 否则遮罩层会发生变形

						this.centerAndZoom(Mpoint, this.level);
						_this.getArea(Mpoint, this.level)
						this.map.addEventListener("dragend", function () {
							center = _this.map.getCenter();
							zoom = _this.map.getZoom();
							//console.log(center,zoom)

							_this.getArea(center, zoom)
						});
						this.map.addEventListener("zoomend", function () {
							center = _this.map.getCenter();
							zoom = _this.map.getZoom();
							_this.level = zoom;
							//console.log(center,zoom)
							_this.getArea(center, zoom)
						});

						this.MarkerClusterer = new BMapLib.MarkerClusterer(this.map);
						break;
					case 1:
						console.log("加载谷歌地图")

						let mapOpt = {
							center: new google.maps.LatLng(0, 0),
							zoom: 5,
							mapTypeId: google.maps.MapTypeId.ROADMAP
						};
						this.map = new google.maps.Map(document.getElementById("map-container"), mapOpt);

						this.centerAndZoom(Mpoint, this.level);

						_this.getArea(Mpoint, this.level)
						this.map.addListener("dragend", function () {
							center = _this.map.getCenter();
							zoom = _this.map.getZoom();
							//console.log(center,zoom)
							_this.getArea(center, zoom)
						});
						this.map.addListener("zoom_changed", function () {
							center = _this.map.getCenter();
							zoom = _this.map.getZoom();
							_this.level = zoom;
							//console.log(center,zoom)

							//console.log(zoom)
							_this.getArea(center, zoom)
						});
						this.GoogleSmartSearch();
						this.MarkerClusterer =  new MarkerClusterer(this.map);
						break;
				}
			},
			//地图切换部分  0百度 1谷歌
			choiceMap(type){
				if (this.mapType == type) return
				//切换后初始化数据
				this.searchMapText = "",  //搜索数据
					this.IsActive = {
						road: false,
						ranging: false,
						fullScreen: false,
						isShowIconBox: false
					};
				this.level = 5;
				this.carPointArr = [];
				this.carRunArr = [];
				this.tirePressureArr = [];
				this.startTimeIndex = [];
				this.endTimeIndex = [];
				this.allRunTime = 0;
				this.allMileage = 0;
				this.intervalArr = [];
				this.stopArr = [];
				this.startIndex = 6;
				this.options = {
					showTime: true,
					showMileage: true,
					showSpeed: true,
					showStopTime: true
				};
				this.playSpeed = 1;
				this.playNumber = 0;
				this.progressWidth = null;
				this.errorTxt = '';
				this.searchResult = [];//保存地图搜索结果
				this.latelyData = [];
				this.latelyArr = [];
				this.areaChoiceArr = [];
				this.carListpage = [];
				this.allPointsArr = [];
				this.drawingArr = [];
				this.fenceArr = {
					graph: [],
					icon: [],
					closeIcon: []
				};
				this.isMapCarlistShow = false;
				this.isCreateFence = false;
				this.isRedactFence = false;
				this.isErrorShow = false;
				this.drawingData = {
					name: null,	 //围栏名称
					number: "",   //自定义编号
					remark: "",   //备注
					area: null,     //面积
					formType: 0,     //类型  1圆 2矩形 3多边形
					fenceType: 0,
					path: null,     //多边形&&矩形 各顶点坐标数组  {lng:"",lat:""}
					radius: null,   //圆形半径
					center: {lng: null, lat: null},            //围栏近似中心点坐标
					address: null,                        //围栏近似中心点地址
				};
				this.choicFenceType = '_请选择类型_';


				this.allFenceData = null;
				this.choiceFenceType = null;
				this.infoWindowArr = [];  //保存google 地图infoWindow对象
				//初始化结束

				this.mapType = type;
				this.$store.commit('changeMapType', type);
				//console.log("地图类型",this.$store.state.mapType);
				this.initMap();
			},
			//得到对应的地图坐标对象 point={lat：，lng：}
			getMapPoint(point){
				switch (this.mapType) {
					case 0:
						return new BMap.Point(point.lng, point.lat);
					case 1:
						return new google.maps.LatLng(point.lat, point.lng);

				}
			},
			//设置中心和缩放等级  Mpoint=this.getMapPoint(point);
			centerAndZoom(Mpoint, level){
				switch (this.mapType) {
					case 0:
						//console.log("百度定位",Mpoint,level);
						this.map.centerAndZoom(Mpoint, level)
						break;
					case 1:
						this.map.panTo(Mpoint);
						this.map.setZoom(level);
						break;

				}

			},
			//开启实时路况
			openRoadCondition(){
				switch (this.mapType) {
					case 0:
						this.ctrl = new BMapLibTra.TrafficControl();
						this.map.addControl(this.ctrl);
						this.ctrl.showTraffic();
						break;
					case 1:
						this.ctrl = new google.maps.TrafficLayer();
						this.ctrl.setMap(this.map);
						break;
				}

			},
			//关闭实时路况
			closeRoadCondition(){
				switch (this.mapType) {
					case 0:
						this.ctrl.hideTraffic()
						break;
					case 1:
						this.ctrl.setMap(null);
						break;
				}

			},
			//清除地图覆盖物
			mapRemoveOverlay(overlay){
				switch (this.mapType) {
					case 0:
						this.map.removeOverlay(overlay)
						break;
					case 1:
						if (overlay != null) overlay.setMap(null)
						break;
				}

			},
			//按index清除标记
			removeOverlay(Arr, index){
				if (index != null && index != "" || index === 0) {
					if (Arr[index]) {
						this.mapRemoveOverlay(Arr[index])
					}
				} else {
					if (Arr.length != 0) {
						for (var i = 0; i < Arr.length; i++) {
							let item = Arr[i]
							this.mapRemoveOverlay(item)
						}
					};
					Arr.length = 0;
				}
			},
			//根据坐标点和缩放等级确定省份和城市
			getArea(center, zoom){
				if (center != null) {
					if (zoom == null || zoom == "") zoom = this.level;
					let _this = this;


					switch (this.mapType) {
						case 0:
							let myGeo = new BMap.Geocoder();
							myGeo.getLocation(new BMap.Point(center.lng, center.lat), function (rs) {
								let addComp = rs.addressComponents;
								//console.log(addComp);
								// addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
								if (zoom >= 10) {
									_this.Area = addComp.city
								} else if (zoom > 6 && zoom < 10) {
									_this.Area = addComp.province
								} else if (zoom <= 6) {
									_this.Area = "_全国_"
								}
								_this.$refs.city.setArea(_this.Area);

								_this.BaiduSmartSearch();
							})

							break;
						case 1:
							var geocoder = new google.maps.Geocoder();
							geocoder.geocode({location: center}, function geoResults(results, status) {
								if (status == google.maps.GeocoderStatus.OK) {
									//console.log(results);

									if (zoom >= 10) {
										_this.Area = results[0].address_components[2].long_name
									} else if (zoom > 6 && zoom < 10) {
										_this.Area = results[0].address_components[3].long_name
									} else if (zoom <=6) {
										if(results[0].address_components[4]){
											_this.Area = results[0].address_components[4].long_name
										}else {
											_this.Area = results[0].formatted_address
										}

									}
								}

							})
							break;
					}


				}
			},
			//原始坐标集合转换为地图坐标集合
			parsePointsArr(points){
				let MapPointsArr = [];
				for (var i = 0; i < points.length; i++) {
					MapPointsArr.push(this.getMapPoint(points[i]))
				}
				return MapPointsArr;
			},
			//根据轨迹点选择最佳视图
			setViewport(MapPointsArr, zoom) {

				switch (this.mapType) {
					case 0:
						//let mapPoints=[]
						//for (var i = 0; i <points.length; i++) {
						//	mapPoints.push(this.getMapPoint(points[i]))
						//}
						var view = this.map.getViewport(MapPointsArr);
						var mapZoom;
						if (MapPointsArr.length > 1) {
							mapZoom = (view.zoom) - 1;
						} else {
							mapZoom = zoom;
						}
						var centerPoint = view.center;
						//if (typeof IsSetLockMap != "undefined") {
						//	IsSetLockMap = false
						//}
						this.map.setCenter(centerPoint);
						this.map.setZoom(mapZoom);
						break;
					case 1:
						var bounds = new google.maps.LatLngBounds();
						for (var i = 0; i < MapPointsArr.length; i++) {
							bounds.extend(MapPointsArr[i]);
						}
						if (MapPointsArr.length > 2) {

							this.map.fitBounds(bounds, 80);
						} else {
							let center = bounds.getCenter();

							this.map.panTo(center);
							this.map.setZoom(11);
						}

						break;


				}

			},
			//设置原始marker
			setInitMarker(point){
				let marker, myIcon;
				switch (this.mapType) {
					case 0:
						marker = new BMap.Marker(point);  // 创建标注
						this.map.addOverlay(marker);
						return marker
					case 1:
						marker = new google.maps.Marker({
							position: point,
							map: this.map
						});
						return marker
						break;
				}

			},
			//不同地图-绘制自定义mark
			setMapMarker(point, iconUrl, zIndex, sizeX, sizeY, label,isNoShow){
				let marker, myIcon;
				switch (this.mapType) {
					case 0:
						myIcon = new BMap.Icon(iconUrl, new BMap.Size(sizeX, sizeY));
						marker = new BMap.Marker(point, {icon: myIcon});  // 创建标注
						marker.setLabel(label);
						marker.setZIndex(zIndex);
						if(isNoShow==true) return marker;
						this.map.addOverlay(marker);
						return marker
					case 1:
						myIcon = {
							anchor: new google.maps.Point(sizeX / 2, sizeY / 2),
							url: iconUrl,
							size: new google.maps.Size(sizeX, sizeY),
						};
						if (label != null && label != "") {

							let MarkerWithLabel = require("js/GIS/Google/Lib/markerwithlabel.js")(google.maps);
							marker = new MarkerWithLabel({
								position: point,
								icon: myIcon,
								labelContent: label.text,
								labelAnchor: new google.maps.Point(label.x, label.y),
								//labelClass: "labels", // the CSS class for the label
								labelStyle: {
									color: label.color,
									border: "1px solid #999",
									background: "#fff",
								},
								zIndex: zIndex,
								map: this.map,
								optimized: false

							});

						} else {
							marker = new google.maps.Marker({
								position: point,
								icon: myIcon,
								zIndex: zIndex,
								map: this.map,
								optimized: false
							});
						}
						return marker
						break;
				}

			},
			//不同地图-设置自定义Label
			setMapLabel(text, color){
				let textLabel;
				switch (this.mapType) {
					case 0:
						textLabel = new BMap.Label(text,     //为lable填写内容
							{
								offset: new BMap.Size(25, 3),                  //label的偏移量，为了让label的中心显示在点上
							});//label的位置
						textLabel.setStyle({//给label设置样式，任意的CSS都是可以的
							color: color,
							border: "1px solid #999",
							textAlign: "center",            //文字水平居中显示
						});
						return textLabel
					case 1:
						textLabel = {
							color: color,
							text: text,
							border: "1px solid #999",
							background: "#fff",
							minWidth: "250px",
							x: -15,
							y: 10
						};
						return textLabel
						break;
				}

			},
			//绘制线条
			setMapline(MarPointsArr, option){
				let polyline
				switch (this.mapType) {
					case 0:
						polyline = new BMap.Polyline(MarPointsArr, {
							strokeColor: option.strokeColor,
							strokeWeight: option.strokeWeight, //边线的宽度，以像素为单位。
							strokeOpacity: option.strokeOpacity, //边线透明度，取值范围0 - 1。
							strokeStyle: 'solid', //边线的样式，solID或dashed。
							IsArrow: true,
							zIndex: option.zIndex
						});
						this.map.addOverlay(polyline);
						return polyline
					case 1:
						polyline = new google.maps.Polyline({
							path: MarPointsArr,
							strokeColor: option.strokeColor, // 线条颜色
							strokeWeight: option.strokeWeight, // 线条粗细
							strokeOpacity: option.strokeOpacity, // 线条透明度
							zIndex: option.zIndex
						});
						polyline.setMap(this.map)
						return polyline;
				}
			},


			/**
			 * **************3.业务逻辑部分**************
			 * **/


			/***

			 * * **********************************    ⑴工具栏部分   *****************************************
			 * */

			//百度地图------改变城市地图
			changeMap(cityData){

				this.BaiduSmartSearch();
				this.Area = cityData.name;

				let level;
				if (this.Area.indexOf("全球") != -1) {
					level = 3
				}
				else if (this.Area.indexOf("全国") != -1) {
					level = 5
				} else if (this.Area.indexOf("省") != -1) {
					level = 9
				} else {
					level = 12
				}
				//console.log(cityData.point);
				let Mpoint = this.getMapPoint(cityData.point);
				this.centerAndZoom(Mpoint, level);
			},
			//测距
			ranging(){
				this.showError("_测距工具已开启_,_左键单击地图测距_,_左键双击地图关闭测距_")
				var map = this.map;
				this.myDis = new BMapLibDis.DistanceTool(map, {lineStroke: 5});
				this.myDis.open();
			},
			//开启实时路况
			roadCondition(){
				if (!this.IsActive.road) {
					this.openRoadCondition()
					if (this.level < 7) this.showError("_实时路况已开启_,_缩放地图到省级视野以下查看_")
				} else {
					this.closeRoadCondition();
					this.showError("_实时路况已关闭_")
				}
				this.IsActive.road = !this.IsActive.road

			},
			//全图查看
			showAllMap(){
				if (this.allPointsArr.length == 0) {
					this.showError("_暂无定位车辆_！")
				} else {
					this.setViewport(this.allPointsArr);
				}
			},


			/***

			 * * *****************************     ⑵实时监控部分   ******************************
			 * */

			//显示实时车辆点图标和文字
			getLatelyData(data, points){
				this.latelyData = data;
				this.allPointsArr = this.parsePointsArr(points);
				let markersArr=[];
				this.MarkerClusterer.clearMarkers();
				if (data.length != 0) {
					for (var i = 0; i < data.length; i++) {
						var item = data[i];
						this.removeOverlay(this.latelyArr, i)
						if (item.point.lng >= -180 && item.point.lng <= 180 && item.point.lat >= -90 && item.point.lat <= 90 && item.point.lng != 0 && item.point.lat != 0) {
							let marker=this.showLately(item, i);
							markersArr.push(marker);
						} else {
							this.latelyArr.splice(i, 1, null)
						};

					}

					this.MarkerClusterer.addMarkers(markersArr);
					//console.log(this.latelyArr);
				}
			},
			//显示实时车辆点
			showLately(data, index){
				let _this = this;
				let point = this.getMapPoint(data.point);
				//let reg= /[^\(\)]+(?=\))/g;
				let url = this.iconUrlFun(data.direction, data.type);
				let imgUrl = null;
				switch (this.$store.state.choiceSystemID) {
					case 1:
						imgUrl = "truck.png";
						break;
					case 2:
						imgUrl = "EL.png";
						break;
					case 3:
						imgUrl = "CCL.png";
						break;
					case 4:
						imgUrl = "motorcade.png";
						break;
				}

				var temp = "";
				if (this.$store.state.choiceSystemID == 2) {
					let status;
					if (data.FLockStatus) {
						status = "开锁"
					} else {
						status = "上锁"
					}
					temp += ` <div class="BMap_bubble_header"><i class="fa fa-lock" style="margin-right: 10px;color: #005fc6;font-size: 24px" v-show="false"></i>${data.assetID}(${data.name})</div>
					<div class="BMap_bubble_text">
						<table>
							<tbody>
								<tr>
									<td class="font-bolder text-right">_状态_：</td><td class="link-black">${status}</td>
								</tr>
								<tr>
									<td class="font-bolder text-right">_车牌_：</td><td class="link-black">${data.name}</td>
								</tr>`;

					if (data.type === 3) {
						let alarmText = "";
						if (data.alarmFLockRope == 1) {
							alarmText += "_绳索异常_;"
						}
						if (data.alarmOverSpeed == 1) {
							alarmText += "_超速报警_;"
						}
						if (data.FAlarmLowPower == 1) {
							alarmText += "_低电量报警_;"
						}
						if (data.unCoverBack == 1) {
							alarmText += "_后盖报警_;"
						}
						if (data.longTimeOpened == 1) {
							alarmText += "_长时间未锁_;"
						}
						if (data.fivePasswordError == 1) {
							alarmText += "_五次连续错误_;"
						}
						if (data.illegalCard == 1) {
							alarmText += "_刷非法卡_;"
						}
						if (data.forbiddenAreaOpen == 1) {
							alarmText += "_禁区开锁_;"
						}

						//if(data.alarmOffsetRoad==1){
						//	alarmText+="道路偏移;"
						//}
						temp += `<tr><td class="font-bolder text-right">_报警类型_：</td><td class="link-black text-red">${alarmText}</td></tr>`;
					}


					temp += `<tr>
									<td class="font-bolder text-right">_里程_：</td><td class="link-black">${data.mileage} km</td>
								</tr>
									<tr>
								<td class="font-bolder text-right">_速度_：</td><td class="link-black">${data.speed} km/h</td>
							</tr>
							<tr>
								<td class="font-bolder text-right">_电量值_(%)：</td><td class="link-black">${data.batteryPercent}</td>
							</tr>
							<tr>
								<td class="font-bolder text-right">_最后更新时间_：</td><td class="link-black">${data.time}</td>
							</tr>
							<tr>
								<td class="font-bolder text-right">_位置_：</td><td class="link-black car-address" lng="${data.point.lng}" lat="${data.point.lat}">${data.address}</td>
							</tr>
						</tbody>
					</table>

					</div>
					<div style="width:100%;height:25px;">
						<a carID="${data.assetID}" carName="${data.name}"  class="InfoWindow_btn monitor cursor-pointer" title="轨迹回放"><i></i></a>
						<a carID="${data.FVehicleGUID}" class="InfoWindow_btn carinformation cursor-pointer" title="车辆信息"><i></i></a>
						<a class="InfoWindow_btn road cursor-pointer" title="查看路况"><i></i></a>`;

					if(_this.remoteUnlockLimits==1){
						temp +=`<a class="InfoWindow_btn" assetID="${data.assetID}" title="开锁" id="locking"><i class="img-icon monitor-icon icon-key" style="background-position:-226px -20px "></i></a>`;
					};
					temp +=`</div>`;
				} else {
					temp += ` <div class="BMap_bubble_header"><img src="/static/img/carIcon/${imgUrl}">${data.name}(${data.assetID})</div>
					<div class="BMap_bubble_text">
						<table>
							<tbody>
								<tr>
									<td class="font-bolder text-right">_公司简称_：</td><td class="link-black">${data.company}</td>
								</tr>
								<tr>
									<td class="font-bolder text-right">_业务类型_：</td><td class="link-black">${data.operateType}</td>
								</tr>`;

					if (data.type === 3) {
						let alarmText = "";
						if (data.alarmFatigue == 1) {
							alarmText += "_疲劳驾驶_;"
						}
						if (data.alarmOverSpeed == 1) {
							alarmText += "_超速报警_;"
						}
						if (data.alarmTemperature == 1) {
							alarmText += "_温度报警_;"
						}

						//if(data.alarmOffsetRoad==1){
						//	alarmText+="道路偏移;"
						//}
						temp += `<tr><td class="font-bolder text-right">_报警类型_：</td><td class="link-black text-red">${alarmText}</td></tr>`;
					}

					switch (_this.systemID) {
						case 1:
							temp += `<tr><td class="font-bolder text-right">_厢体状态_：</td><td class="link-black">${data.containerStatus}</td></tr>
							<tr>
								<td class="font-bolder text-right">_接甩挂状态_：</td><td class="link-black">${data.couplingStatus == 1 ? "_接挂_" : "_甩挂_"}</td>
							</tr>`;
							break;
						case 3:
							temp += `<tr><td class="font-bolder text-right">_温度湿度_：</td><td class="link-black">`;
							for (var i = 0; i < data.coldChainEquipment.length; i++) {
								var obj = data.coldChainEquipment[i];
								temp += `<p>
							<span class="tire">${i + 1}</span>
							<span style="padding-right:5px">${obj.tem} ℃</span>
							<span>${obj.hum} %</span>
							</p>`

							}
							temp += `</td></tr>`;
							break;

					}

					temp += `<tr>
								<td class="font-bolder text-right">_里程_：</td><td class="link-black">${data.mileage} km</td>
							</tr>
							<tr>
								<td class="font-bolder text-right">_速度_：</td><td class="link-black">${data.speed} km/h</td>
							</tr>
							<tr>
								<td class="font-bolder text-right">_电量值_(%)：</td><td class="link-black">${data.batteryPercent}</td>
							</tr>
							<tr>
								<td class="font-bolder text-right">_更新时间_：</td><td class="link-black">${data.time}</td>
							</tr>
							<tr>
								<td class="font-bolder text-right">_位置_：</td><td class="link-black car-address" lng="${data.point.lng}" lat="${data.point.lat}">${data.address}</td>
							</tr>
						</tbody>
					</table>

					</div>
					<div style="width:100%;height:25px;">
						<a carID="${data.ID}" carName="${data.name}"  class="InfoWindow_btn monitor cursor-pointer" title="轨迹回放"><i></i></a>
						<a carID="${data.ID}" class="InfoWindow_btn carinformation cursor-pointer" title="车辆信息"><i></i></a>
						<a class="InfoWindow_btn road cursor-pointer" title="查看路况"><i></i></a>
					</div>`;
				}

				let text;
       			 if(this.$store.state.choiceSystemID == 2){
					 text=data.ID+'('+data.name+')'
				}else {
					text= data.name;
				}
				let color = null;
				switch (data.type) {
					case 0:
						color = "#07d703"
						break;
					case 2:
						color = "#df8001"
						break;
					case 3:
						color = "#d9161a"
						break;
					case 4:
						color = "#838383"
						break;
				}


				let textLabel = this.setMapLabel(text, color)

				let marker = this.setMapMarker(point, url, 300, 24, 24, textLabel,true);
				this.setInfoWindow(marker, temp, function () {
					let obj = {address: ''};
					let address = document.getElementsByClassName("car-address")[0];
					let point = {lng: $(address).attr("lng"), lat: $(address).attr("lat")}

					switch (_this.mapType) {
						case 0:
							$(".monitor").bind("click", function () {
								_this.linkHistorical($(this))
							});
							$(".road").bind("click", function () {
								_this.roadCondition()
							});
							$(".carinformation").bind("click", function () {
								let ID = $(this).attr("carID");
								_this.showCarInfo(ID)
							});
							_this.geocoder(_this.$store.state.mapType, point, obj, "address", function () {
								$(address).html(obj.address)

							});
							$("#locking").bind("click", function () {
								_this.linkUnlock($(this))
							});
							break;
						case 1:
							let monitor = document.getElementsByClassName("monitor")[0];
							let road = document.getElementsByClassName("road")[0];
							_this.geocoder(_this.$store.state.mapType, point, obj, "address", function () {
								$(address).html(obj.address)
							})

							google.maps.event.addDomListener(monitor, "click", function () {

								console.log($(this).attr("carId"))
								_this.linkHistorical($(this))
							});
							google.maps.event.addDomListener(road, "click", function () {
								_this.roadCondition()
							});
							google.maps.event.addDomListener(carinformation, "click", function () {
								let ID = $(this).attr("carID");
								_this.showCarInfo(ID)
							});
							break;
					}

				});

				this.latelyArr.splice(index, 1, marker);
				return marker;
			},
			//setInfoWindow  设置信息框
			setInfoWindow(marker, temp, callback){
				let _this = this,
					infoWindow;
				switch (this.mapType) {
					case 0:
						infoWindow = new BMap.InfoWindow(temp);  // 创建信息窗口对象
						marker.addEventListener("click", function () {
							this.openInfoWindow(infoWindow);
							//图片加载完毕重绘infowindow
							document.getElementById('map-container').onload = function () {
								infoWindow.redraw();   //防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
							}
							if (callback != null && callback != "") callback();
						});
						break;
					case 1:
						let infoWindow = new google.maps.InfoWindow({
							content: temp,
						});
						this.infoWindowArr.push(infoWindow);
						this.map.addListener('click', function () {
							infoWindow.close()
						});
						google.maps.event.addListener(marker, 'click', function () {
							_this.infoWindowArr.map(function (item) {
								item.close()
							});
							infoWindow.open(this.map, marker);
							google.maps.event.addListener(infoWindow, "domready", function () {
								if (callback != null && callback != "") callback();
							});

						});
						break;


				}

			},
			//显示所选车辆位置
			showCarPlace(point){
				let Mpoint = this.getMapPoint(point);
				this.centerAndZoom(Mpoint, 19);
				this.getArea(Mpoint, 19);
				this.showChoiceIcon(Mpoint);
			},
			//显示选中效果
			showChoiceIcon(Mpoint){
				let _this = this;
				let url = "/static/img/focus.gif";
				let marker = this.setMapMarker(Mpoint, url, -1, 100, 100)
				setTimeout(function () {
					_this.mapRemoveOverlay(marker);
				}, 3000)
			},
			//清除实时车辆图标和文字
			deleteLately(){
				if(this.latelyArr.length!=0){
					this.removeOverlay(this.latelyArr);
					this.MarkerClusterer.clearMarkers();
				}
			},
			//跳转历史回放
			linkHistorical(obj){
				let ID = $(obj).attr("carID");
				let name = $(obj).attr("carName");
				let menuData = {tabsText: "_轨迹回放_", router: "historical_route"};
				this.changeRoute(menuData);
				this.$router.push({name: "historical_route", params: {ID: ID, name: name}})
			},
			//显示车辆信息
			showCarInfo(ID){
				let _this=this;

				let TokenID = this.$store.state.FTokenID;
				//获取车辆详情
				$.ajax({
					"url": "web/Common/Common_Admin",
					"cache": false,
					"async": true,
					"type": "post",
					"dataType": "json",
					"contentType": "application/json; charset=utf-8",
					"data": '{"FTokenID": "' + TokenID + '","FAction": "QueryAdminVehicleByFGUID","FVersion": "1.0.0","FGUID":"' + ID + '"}',
					success: function (data) {
						console.log(data);
						var Fobj = data;
						if(Fobj.Result == 200){
							_this.detailDialog=true;
							_this.detail=Fobj.FObject[0];
							_this.detail.FInsuDate=Fobj.FObject[0].FInsuDate.substring(0,10);
							_this.detail.FPurchaseDate=Fobj.FObject[0].FPurchaseDate.substring(0,10);
							_this.detail.FRegisDate=Fobj.FObject[0].FRegisDate.substring(0,10);
							_this.detail.FRoadTranDate=Fobj.FObject[0].FRoadTranDate.substring(0,10);
							_this.detail.FTechRegDate=Fobj.FObject[0].FTechRegDate.substring(0,10);
							_this.detail.FStatus=Fobj.FObject[0].FStatus?'_启用_':'_禁用_';
							_this.detail.FVehicleTypeID=Fobj.FObject[0].FVehicleTypeID=='0'?'_厢车_':Fobj.FObject[0].FVehicleTypeID=='1'?'_罐车_':Fobj.FObject[0].FVehicleTypeID=='2'?'_其他_':'其他';
							_this.detail.FColorRGB=Fobj.FObject[0].FColorRGB=='0'?'_红_':Fobj.FObject[0].FColorRGB=='1'?'_黄_':Fobj.FObject[0].FColorRGB=='2'?'_蓝_':Fobj.FObject[0].FColorRGB=='3'?'_橙_':Fobj.FObject[0].FColorRGB=='4'?'_紫_':Fobj.FObject[0].FColorRGB=='5'?'_绿_':Fobj.FObject[0].FColorRGB=='6'?'_其他_':'其他';

						}else {
							_this.showError('_未查询到车辆_')
						}

					},
					error: function () {
						console.log('_请求失败_')
					}
				});
			},
			//跳转远程开锁
			linkUnlock(obj){
				let assetID = $(obj).attr("assetID");
				let menuData = {tabsText: "_远程开锁_", router: "remoteUnlock"};
				this.changeRoute(menuData);
				this.$router.push({name: "remoteUnlock", params: {ID: assetID, name: ""}})
			},

			/***
			 * * ******************************   ⑶历史轨迹部分    **************************************************
			 * */

			//绘制普通mark点
			setMark(point){
				let Mpoint = this.getMapPoint(point);
				if (this.searchResult.length != 0) this.removeOverlay(this.searchResult);
				let marker = this.setInitMarker(Mpoint)
				this.centerAndZoom(Mpoint, 15);
				this.searchResult.push(marker);
			},
			/*
			 *	获取图标路径
			 *   direction 坐标方向
			 *   toggle 显示图标类型  0运行车辆 1 车辆行驶方向标记点  2停止车辆  3报警车辆 4离线车辆
			 * */
			iconUrlFun(direction, toggle) {
				let direc = parseInt((parseInt(direction) + 22) / 45);
				let carType = null;
				switch (toggle) {
					case 0:
						carType = "/static/img/xjaddpic/greencar"
						break;
					case 1:
						switch (direc) { //车辆行驶方向标记点
							case 0:
								return "/static/img/carIcon/north.png";
							case 1:
								return "/static/img/carIcon/northeast.png";
							case 2:
								return "/static/img/carIcon/east.png";
							case 3:
								return "/static/img/carIcon/southeast.png";
							case 4:
								return "/static/img/carIcon/south.png";
							case 5:
								return "/static/img/carIcon/southwest.png";
							case 6:
								return "/static/img/carIcon/west.png";
							case 7:
								return "/static/img/carIcon/northwest.png";
							default:
								return "/static/img/carIcon/north.png";
						}
						break;
					case 2:
						carType = "/static/img/xjaddpic/purplecar"
						break;
					case 3:
						carType = "/static/img/xjaddpic/redcar"
						break;
					case 4:
						carType = "/static/img/xjaddpic/greycar"
						break;
					default:
				}
				;
				switch (direc) {
					case 0:
						return carType + "_north.gif";
					case 1:
						return carType + "_northeast.gif";
					case 2:
						return carType + "_east.gif";
					case 3:
						return carType + "_southeast.gif";
					case 4:
						return carType + "_south.gif";
					case 5:
						return carType + "_southwest.gif";
					case 6:
						return carType + "_west.gif";
					case 7:
						return carType + "_northwest.gif";
					default:
						return carType + "_north.gif";
				}


			},
			//还原路线
			showCarRoute(carPointArr, points) {
				this.carPointArr = carPointArr;
				//清除上一次绘制点
				if(this.allLineArr.length!=0) this.removeOverlay(this.allLineArr);

				//转换地图坐标数组
				this.allPointsArr = this.parsePointsArr(points);
				let option = {
					strokeColor: "#336699",
					strokeWeight: 5, //边线的宽度，以像素为单位。
					strokeOpacity: 1, //边线透明度，取值范围0 - 1。
					zIndex: 1
				};
				let startPoint = this.allPointsArr[0];
				let endPoint = this.allPointsArr[this.allPointsArr.length - 1];
				//设置线路
				let line = this.setMapline(this.allPointsArr, option);
				//设置起始图标
				let startMarker = this.setMapMarker(startPoint, "/static/img/carIcon/p_start.png", 5, 22, 29)
				let endMarker = this.setMapMarker(endPoint, "/static/img/carIcon/p_end.png", 5, 22, 29)

				this.allLineArr.push(line, startMarker, endMarker)
				//设置视图
				this.setViewport(this.allPointsArr);

				this.showCarMileagePoint(0);
				//暂停播放
				clearInterval(this.playControl);
				this.playNumber = 0;

			},
			//设置总时长 总里程
			setAllTimeAndMileage(allTime, allMileage){
				this.allRunTime = allTime;
				this.allMileage = allMileage;
			},
			//绘制路程标记点
			showCarMileagePoint(interval){
				Pace.restart();
				//删除上次的点
				this.removeOverlay(this.intervalArr)
				let carPoint = this.carPointArr;
				let mapPointsArr = this.allPointsArr;
				let marker;
				for (let i = 0; i < carPoint.length; i++) {
					//避免两端画点
					if (i != 0 && i != carPoint.length - 1) {
						if (interval == 0) {
							//自动模式 路线分成十份
							if (carPoint[i].mileage != carPoint[i + 1].mileage && i % parseInt(carPoint.length / 10) == 0) {
								let url = this.iconUrlFun(this.carPointArr[i].direction, 1)
								marker = this.setMapMarker(mapPointsArr[i], url, 1, 24, 24)
								this.intervalArr.push(marker);
								this.allLineArr.push(marker);
							}
						} else {
							if (carPoint[i].mileage != carPoint[i + 1].mileage && (carPoint[i].mileage - carPoint[0].mileage) % interval == 0) {
								//根据公里数选择点
								let url = this.iconUrlFun(this.carPointArr[i].direction, 1)
								marker = this.setMapMarker(mapPointsArr[i], url, 1, 24, 24)
								this.intervalArr.push(marker);
								this.allLineArr.push(marker);
							}
						}
					}
				}
			},
			//高亮显示运行线路(旧 在轨迹上描红)
			highlightShowPath(startTimeIndex, endTimeIndex, index){
				if (this.runLineArr.length != 0)this.removeOverlay(this.runLineArr)
				let start = startTimeIndex[index];
				let end = endTimeIndex[index];
				//console.log(start,end);
				let highLightLine = this.allPointsArr.slice(start, end)
				//console.log(highLightLine);
				let option = {
					strokeColor: "#21b42c",
					strokeWeight: 5, //边线的宽度，以像素为单位。
					strokeOpacity: 1, //边线透明度，取值范围0 - 1。
					zIndex: 10
				};
				//设置线路
				let line = this.setMapline(highLightLine, option);
				//console.log(line);
				this.allLineArr.push(line);
				this.runLineArr.push(line);
				//设置视图
				this.setViewport(highLightLine);
			},
			//地图上显示运行段开始和结束标记
			mapShowRunPath(data){
				if (this.runLineArr.length != 0)this.removeOverlay(this.runLineArr)
				let startPoint = this.getMapPoint(data.startPoint);
				let endPoint = this.getMapPoint(data.endPoint);
				let startUrl="/static/img/carIcon/",
					endUrl="/static/img/carIcon/";
				if(this.systemID==2){
					startUrl+="lock.png";
					endUrl+="unlock.png"
				}else {
					startUrl+="run_start.png";
					endUrl+="run_end.png"
				}

				//设置起始图标
				let startMarker = this.setMapMarker(startPoint, startUrl, 100, 22, 22)
				let endMarker = this.setMapMarker(endPoint, endUrl, 100, 22, 22)
				this.showChoiceIcon(startPoint);
				this.showChoiceIcon(endPoint);
				this.runLineArr.push(startMarker,endMarker);
				//设置视图
				this.setViewport([startPoint,endPoint]);

			},
			//绘制停车标记点
			showCarStopPoint(StopData){
				this.carStopPointArr = StopData;

				this.setStopMarker();

			},
			//绘制停车点marker
			setStopMarker(){
				if (this.carStopPointArr.length == 0) return
				let _this = this;
				if (this.stopArr.length != 0) this.removeOverlay(this.stopArr)

				this.carStopPointArr.map(function (item, index) {
					//let pointIndex = _this.stopPointIndex[index]
					let MPoint = _this.getMapPoint(item.point);
					let url = "/static/img/carIcon/p_stop.png";
					let marker;
					if (_this.options.showStopTime == true) {
						let temp = item.stopTime;
						let color = "blue";
						let label = _this.setMapLabel(temp, color)
						marker = _this.setMapMarker(MPoint, url, 15, 24, 24, label)
					} else {
						marker = _this.setMapMarker(MPoint, url, 15, 24, 24)
					}

					_this.stopArr.push(marker)
				})

			},
			//绘制选中停车点
			showActiveStopPoint(point){
				let MPoint = this.getMapPoint(point);
				this.centerAndZoom(MPoint, 20);
				this.getArea(MPoint, 20);
				this.showChoiceIcon(MPoint);
			},
			//显示轨迹回放点
			showPlayPoint(index){
				if (this.carPointArr.length != 0 && index >= this.carPointArr.length) index = this.carPointArr.length - 1;

				this.playNumber = index;
				let temp = "";
				temp += "<span style='display:" + this.showOptions.showTime + ";padding:2px 4px;'>" + this.carPointArr[index].time + "</span>";
				temp += "<span style='display:" + this.showOptions.showSpeed + ";padding:2px 4px;'>" + this.carPointArr[index].speed + "km/h</span>";
				temp += "<span style='display:" + this.showOptions.showMileage + ";padding:2px 4px;'>" + this.carPointArr[index].mileage + "km</span>";

				let Mpoint = this.allPointsArr[index];

				this.setMapCenterAndZoom(Mpoint, this.map);

				let color = "#0099CC";

				let label = this.setMapLabel(temp, color)
				let url = this.iconUrlFun(this.carPointArr[index].direction, 0);
				this.removeOverlay(this.playPointArr)

				let marker = this.setMapMarker(Mpoint, url, 50, 24, 24, label)

				this.playPointArr.push(marker)

			},
			//清空轨迹点相关所有marker
			deleteAllStop(){
				if (this.allLineArr.length != 0) this.removeOverlay(this.allLineArr);
				if (this.stopArr.length != 0) this.removeOverlay(this.stopArr);
				if (this.runLineArr.length != 0)this.removeOverlay(this.runLineArr)
			},
			//坐标超出视野范围后 显示到视野中心
			setMapCenterAndZoom(point, map) {
				let Zoom, bounds;
				switch (this.mapType) {
					case 0:
						Zoom = this.map.getZoom();
						bounds = this.getViewBounds(map);
						if (bounds.ne.lng < point.lng || bounds.ne.lat < point.lat || bounds.sw.lng > point.lng || bounds.sw.lat > point.lat) {
							this.centerAndZoom(point, Zoom);
						}
						break;
					case 1:
						Zoom = this.map.getZoom();
						bounds = this.map.getBounds();
						let ne = bounds.getNorthEast();
						let sw = bounds.getSouthWest();
						let lng = point.lng();
						let lat = point.lat();
						if (ne.lng() < lng || ne.lat() < lat || sw.lng() > lng || sw.lat() > lat) {
							this.centerAndZoom(point, Zoom);
						}
						break;
				}
			},

			//高亮显示胎压报警
			highlightShowtyre(startTimeIndex, endTimeIndex, index){
				//this.mapRemoveOverlay(this.redPolyline);

				if (this.redPolyline.length != 0) this.removeOverlay(this.redPolyline)
				let start = startTimeIndex[index];
				let end = endTimeIndex[index];
				//console.log(start,end);
				let highLightLine = this.allPointsArr.slice(start, end)
				//console.log(highLightLine);
				let option = {
					strokeColor: "#c3140f",
					strokeWeight: 5, //边线的宽度，以像素为单位。
					strokeOpacity: 1, //边线透明度，取值范围0 - 1。
					zIndex: 20
				};
				//设置线路
				let line = this.setMapline(highLightLine, option);
				//console.log(line);
				this.allLineArr.push(line);
				this.redPolyline.push(line);
				//设置视图
				this.setViewport(highLightLine);

			},

			/*************播放功能部分*******************/
			//播放轨迹
			playPoint(){
				let _this = this;
				this.changeActive(this.btnActive, 0);
				clearInterval(this.playControl);
				this.showPlayPoint(this.playNumber);
				function showPoint(index){
					_this.showPlayPoint(index);
					//向父组件传递
					_this.$emit("playNumber", index);
				};

				showPoint(this.playNumber);

				this.playControl = setInterval(function () {

					if (_this.playNumber >= _this.carPointArr.length - 2) {
						clearInterval(_this.playControl);
						_this.playNumber = _this.carPointArr.length - 2;
						_this.changeActive(_this.btnActive, 1);
					}
					_this.playNumber++;
					showPoint(_this.playNumber);

				}, 1000 / this.playSpeed);

			},
			//停止轨迹回放
			overPlayPoint(){
				this.changeActive(this.btnActive, 2);
				clearInterval(this.playControl);
				this.playNumber = 0;

				this.mapRemoveOverlay(this.textLabel);
				this.mapRemoveOverlay(this.iconLabel);
			},
			//暂停播放
			stopPlayPoint(){
				this.changeActive(this.btnActive, 1);

				clearInterval(this.playControl);
			},
			//增加播放速度
			addPlaySpeed(){
				this.playSpeed++;
				if (this.playSpeed > 4) this.playSpeed = 4;
				clearInterval(this.playControl);
				this.playPoint();
			},
			//减小播放速度
			subPlaySpeed(){
				this.playSpeed--;
				if (this.playSpeed < 1) this.playSpeed = 1;
				clearInterval(this.playControl);
				this.playPoint();
			},
			//快进
			forwardPlaySpeed(){
				clearInterval(this.playControl);

				this.playNumber += parseInt(this.carPointArr.length / 10);

				if (this.playNumber >= this.carPointArr.length - 2) this.playNumber = this.carPointArr.length - 2;
				this.playPoint();
			},
			//快退
			backwardsPlaySpeed(){
				clearInterval(this.playControl);
				this.playNumber -= parseInt(this.carPointArr.length / 10);
				if (this.playNumber <= 0) this.playNumber = 0
				this.playPoint();
			},
			//滑动进度条
			moveProgressbar(){
				let left = parseInt($("#progress-yuan").css("left")) + 8,
					width = $("#my-progressbar").width();
				this.playNumber = Math.floor(left / width * this.carPointArr.length);
			},


			/***
			 * * ⑷围栏部分********************************************************************************
			 * */


			/***********公共绘图方法*************************/
			//rgba转换成 rgb 和 alpha
			transformRGBA(rgba){
				let reg = /[^\(\)]+(?=\))/g;
				let arr = reg.exec(rgba)[0].split(",");


				let rgb = "rgb(" + arr[0] + "," + arr[1] + "," + arr[2] + ")";
				if (arr[3] == undefined || arr[3] == "")arr[3] = 1;
				return {rgb: rgb, alpha: arr[3]}
			},
			//textarea长度验证
			textareaMaxLength (event){
				var area = $(event.target);
				var max = parseInt(area.attr("maxlength"), 10); //获取maxlength的值
				if (max > 0) {
					if (area.val().length > max) { //textarea的文本长度大于maxlength
						area.val(area.val().substr(0, max)); //截断textarea的文本重新赋值
					}
				}
			},
			//计算多边形近似中心点
			getCenter(path){
				let area = 0,
					Gx = 0,
					Gy = 0;// 重心的x、y
				for (let i = 1; i <= path.length; i++) {
					let iLat = path[i % path.length].lat;
					let iLng = path[i % path.length].lng;
					let nextLat = path[i - 1].lat;
					let nextLng = path[i - 1].lng;
					let temp = (iLat * nextLng - iLng * nextLat) / 2.0;
					area += temp;
					Gx += temp * (iLat + nextLat) / 3.0;
					Gy += temp * (iLng + nextLng) / 3.0;
				}
				Gx = (Gx / area).toFixed(6);
				Gy = (Gy / area).toFixed(6);
				return {lng: Gy, lat: Gx}
			},


			//绘制图形  type 1圆形 2矩形 3多边形  option（null 初始绘图/围栏类型ID 根据类型绘图）   fn绘图完成后回调函数
			makeRail(type, typeData, fn){

				let _this = this;
				this.removeOverlay(this.drawingArr);
				this.removeOverlay(this.searchResult);
				let id = parseInt(type);
				let drawingTool;
				//加载绘图工具
				let option;
				if (typeData == null || typeData == "") {
					option = {
						strokeColor: "rgb(0,95,198)",
						fillColor: "rgb(255,255,255)",
						strokeWeight: "4",
						strokeOpacity: "0.6",
						fillOpacity: "0.5"
					}
				} else {
					let typeObj = _this.fenceTypeObj[typeData],
						strokeColor = this.transformRGBA(typeObj.strokeColor),
						fillColor = this.transformRGBA(typeObj.fillColor);
					//console.log(typeObj);

					option = {
						strokeColor: strokeColor.rgb,
						strokeOpacity: strokeColor.alpha,
						fillColor: fillColor.rgb,
						fillOpacity: fillColor.alpha,
						strokeWeight: "4"
					};
				}
				function drawingComplete(overlay) {
					_this.drawingArr.push(overlay);
					let closeIcon = _this.setCloseBtn(overlay);
					_this.drawingArr.push(closeIcon);

					_this.listenerMarkerClick(closeIcon, function () {
						_this.removeOverlay(_this.drawingArr);
						_this.removeOverlay(_this.searchResult);

					})
					switch (_this.mapType) {
						case 0:
							drawingTool.close();
							break;
						case 1:
							drawingTool.setMap(null);
							break;
					}

				}

				switch (this.mapType) {
					case 0:
						drawingTool = new BMapLibDra.DrawingManager(this.map, {
							isOpen: true,
							enableDrawingTool: false,
							enableCalculate: false,
							circleOptions: option,
							rectangleOptions: option,
							polygonOptions: option,

						})
						switch (id) {
							case 1:
								drawingTool.setDrawingMode("circle");
								break;
							case 2:
								drawingTool.setDrawingMode("rectangle");
								break;
							case 3:
								drawingTool.setDrawingMode("polygon");
								break;
						}


						drawingTool.addEventListener("circlecomplete", function (e, overlay) {
							overlay.type = "circle";
							drawingComplete(overlay)
							if (fn != null) fn();
						});

						drawingTool.addEventListener("polygoncomplete", function (e, overlay) {
							overlay.type = "polygon";
							drawingComplete(overlay)
							if (fn != null) fn();
						});

						drawingTool.addEventListener("rectanglecomplete", function (e, overlay) {
							overlay.type = "rectangle";



							drawingComplete(overlay)
							if (fn != null) fn();
						});
						break;
					case 1:
						let type;
						switch (id) {
							case 1:
								type = "circle";
								break;
							case 2:
								type = "rectangle";
								break;
							case 3:
								type = "polygon";
								break;
						}
						drawingTool = new google.maps.drawing.DrawingManager({
							drawingMode: google.maps.drawing.OverlayType.MARKER,
							drawingControl: false,
							drawingControlOptions: {
								position: google.maps.ControlPosition.TOP_CENTER,
							},
							drawingMode: type,
							circleOptions: option,
							polygonOptions: option,
							rectangleOptions: option
						});
						drawingTool.setMap(this.map);
						let overlay;
						google.maps.event.addListener(drawingTool, 'overlaycomplete', function (event) {
							let overlay = event.overlay;
							overlay.type = event.type;
							drawingComplete(overlay);
							if (fn != null) fn();

						});
						break;


				}


			},
			//设置关闭按钮
			setCloseBtn(overlay){
				let _this = this;
				let iconUrl = "/static/img/xjaddpic/black_close.png"
				let closePoint, bounds, ne, sw;
				switch (this.mapType) {
					case 0:
						console.log("百度overlay", overlay.type);
						if (overlay.type == "circle") {
							closePoint = overlay.getPath()[0];
						} else {
							closePoint = overlay.getPath()[1];
						}
						break;
					case 1:
						console.log("overlay.type", overlay.type);
						switch (overlay.type) {
							case 'circle':
								bounds = overlay.getBounds();
								ne = bounds.getNorthEast();
								sw = bounds.getSouthWest();
								let lng = (ne.lng() + sw.lng()) / 2;
								let lat = ne.lat();
								closePoint = new google.maps.LatLng({lat: lat, lng: lng});
								break;
							case 'rectangle':
								bounds = overlay.getBounds();
								ne = bounds.getNorthEast();
								closePoint = ne;
								break;
							case 'polygon':
								closePoint = overlay.getPath().getArray()[0];
								break;
						}
						console.log("path", JSON.stringify(closePoint));
						break;
				}
				let marker = this.setMapMarker(closePoint, iconUrl, 10, 16, 16);
				return marker;
			},
			//marker 监听点击事件
			listenerMarkerClick(marker, callback){
				let _this = this;
				switch (this.mapType) {
					case 0:
						marker.addEventListener("click", function () {
							callback()
						});
						break;
					case 1:
						marker.addListener("click", function () {
							callback()
						});
						break;
				}
			},


			/****************围栏方法***************/
			//获得服务器围栏类型数据
			getFenceTypeData(){
				let _this = this;
				_this.fenceTypeData.length = 0;
				function setFenceTypeData(url) {
					$.ajax({
						url: url,
						cache: false,
						async: true,
						type: 'Post',
						dataType: 'json',
						contentType: 'application/json;charset=utf-8',
						global: false,
						data: '{"FTokenID":"' + _this.$store.state.FTokenID + '","FAction":"QueryLBSGISFenceType","FVersion":"1.0.0"}',
						success: function (res) {
							let obj = new Object();
							res.FObject.Table1.map(function (item, index) {
								let data = {
									ID: item.FGUID,
									icon: item.FIcon,
									name: item.FName,
									strokeColor: item.FStrokeColor,
									fillColor: item.FFillColor,
								};
								_this.fenceTypeData.push(data);

								obj[item.FGUID] = data;

							})

							_this.fenceTypeObj = obj;
							console.log("围栏类型数据", _this.fenceTypeObj);


						}
					})
				}
				setFenceTypeData("/web/Common/Common_LBS")

			},
			//获取服务器围栏数据
			getFenceData(){
				let _this = this;
				return new Promise((resove) => {
					_this.allFenceData = null;


					function getFenceData(url) {
						$.ajax({
							url: url,
							cache: false,
							async: true,
							type: 'Post',
							dataType: 'json',
							contentType: 'application/json;charset=utf-8',
							global: false,
							data: '{"FTokenID":"' + _this.$store.state.FTokenID + '","FAction":"QueryLBSGISFenceList","FPageSize":9999,"FVersion":"1.0.0"}',
							success: function (res) {
								//console.log("围栏数据",res);

								let allData = new Object();
								allData['all'] = new Array;
								_this.fenceTypeData.map(function (item, index) {
									allData[item.ID] = new Array;
								})

								//console.log("服务器围栏",res);
								res.FObject.Table1.map(function (item, index) {

									//清空测试数据用
									/*
									 $.post("/web/Trailer/Trailer_LBS", {
									 FTokenID:_this.$store.state.FTokenID,
									 FAction: "DeleteLBSGISFence",
									 FGUIDs: item.FGUID,
									 FVersion:"1.0.0"
									 },
									 function (res) {
									 if(res.Result==200) {
									 _this.showError("_围栏删除成功_");
									 _this.removeOverlay(_this.fenceArr.graph,index);
									 _this.removeOverlay(_this.fenceArr.icon,index);
									 _this.removeOverlay(_this.fenceArr.closeIcon,index);

									 }
									 })

									 */


									let obj = {
										ID: item.FGUID,
										name: item.FName,	 //围栏名称
										number: item.FNumber == "*" ? "" : item.FNumber,   //自定义编号
										remark: item.FRemark == "*" ? "" : item.FRemark,   //备注
										area: item.FArea,     //面积
										formType: item.FFormType,     //类型  1圆 2矩形 3多边形
										fenceType: item.FFenceTypeGUID,
										path: item.FPath == "*" ? null : JSON.parse(item.FPath),     //多边形&&矩形 各顶点坐标数组  {lng:"",lat:""}
										radius: item.FRadius,   //圆形半径
										center: {
											lng: item.FCenterLon.toFixed(6),
											lat: item.FCenterLat.toFixed(6)
										},            //围栏近似中心点坐标
										address: item.FAddress, //围栏近似中心点地址
										index: null
									};
									//console.log(obj);
									allData['all'].push(obj);
									allData[obj.fenceType].push(obj)

								})
								_this.allFenceData = allData;
								console.log("服务器围栏", _this.allFenceData);
								resove()
							}
						})
					}

					getFenceData("/web/Common/Common_LBS")
				})
			},
			//服务器返回数据绘制围栏
			showFence(fenceType){
				this.choiceFenceType = fenceType;
				let _this = this;
				let points = [];
				if(this.drawingArr.length!=0)this.removeOverlay(this.drawingArr)
				if(this.fenceArr.graph.length!=0)this.removeOverlay(this.fenceArr.graph)
				if(this.fenceArr.icon.length!=0)this.removeOverlay(this.fenceArr.icon)
				if(this.fenceArr.closeIcon.length!=0)this.removeOverlay(this.fenceArr.closeIcon)

				if (this.allFenceData[fenceType] == undefined || this.allFenceData[fenceType].length == 0) {
					this.showError("_暂无该类型围栏数据,请添加后查看_");
					return

				}
				this.allFenceData[fenceType].map(function (item, index) {
					item.index = index;
					console.log(index,item);
					_this.showOneFence(item, index, points)


				})
				this.setViewport(points)

				console.log("graph",this.fenceArr.graph[0].getPath());
				console.log("icon",this.fenceArr.icon);
				console.log("closeIcon",this.fenceArr.closeIcon);


			},
			//隐藏围栏
			hideFence(){
				if(this.fenceArr.graph.length!=0){
					this.removeOverlay(this.fenceArr.graph);
					this.removeOverlay(this.fenceArr.icon);
					this.removeOverlay(this.fenceArr.closeIcon);
				}
			},
			//显示一个完整围栏
			showOneFence(item, index, points){
				let _this = this;
				let overlay = null;

				let data = this.fenceTypeObj[item.fenceType]

				let strokeColor = this.transformRGBA(data.strokeColor);
				let fillColor = this.transformRGBA(data.fillColor);
				let option = {
					center: null,
					radius: null,
					bounds: null,
					paths: null,
					strokeColor: strokeColor.rgb,
					strokeOpacity: strokeColor.alpha,
					fillColor: fillColor.rgb,
					fillOpacity: fillColor.alpha,
					strokeWeight: "4"
				};


				switch (this.mapType) {
					case 0:
						switch (parseInt(item.formType)) {
							case 1:

								overlay = new BMap.Circle(
									item.center,
									item.radius,
									option
								);
								overlay.type = "circle";
								break;
							case 2:

								overlay = new BMap.Polygon(
									item.path,
									option
								);
								overlay.type = 'rectangle';
								break;
							case 3:
								overlay = new BMap.Polygon(
									item.path,
									option
								);
								overlay.type = 'polygon';
								break;
						}
						this.map.addOverlay(overlay);      //绘制图形
						break;
					case 1:
						switch (parseInt(item.formType)) {

							case 1:
								//console.log('center',item.center);
								option.center = this.getMapPoint(item.center);
								option.radius = parseFloat(item.radius);
								overlay = new google.maps.Circle(option);
								overlay.type = 'circle';
								break;
							case 2:
								option.bounds = {
									north: item.path[0].lat,
									south: item.path[2].lat,
									east: item.path[2].lng,
									west: item.path[0].lng
								};
								//console.log('option.bounds',option.bounds)
								overlay = new google.maps.Rectangle(option);
								overlay.type = 'rectangle';

								break;
							case 3:
								option.paths = item.path;
								//console.log('option.paths',option.paths)
								overlay = new google.maps.Polygon(option);
								overlay.type = 'polygon';
								break;

						}
						overlay.setMap(this.map);      //绘制图形
						break;
				}


				if (points != null) points.push(this.getMapPoint(item.center));


				this.fenceArr.graph.splice(index, 1, overlay); //将图形对象放入对应数组中


				let icon = this.showfenceIcon(item, index);          //绘制中心图标
				this.fenceArr.icon.splice(index, 1, icon);

				let closeIcon = this.setCloseBtn(overlay);   //绘制关闭图标

				this.fenceArr.closeIcon.splice(index, 1, closeIcon);



				console.log("点击的index",index);
				this.listenerMarkerClick(closeIcon, function () {
					_this.removeOverlay(_this.fenceArr.graph, index);
					_this.removeOverlay(_this.fenceArr.icon, index);
					_this.removeOverlay(_this.fenceArr.closeIcon,index);
				})


			},
			//绘制中心图标
			showfenceIcon(data, index){
				let _this = this,
					Mpoint = this.getMapPoint(data.center),
					fenceTypeData = this.fenceTypeObj[data.fenceType],
					url = "/static/img/fence/fencetype-icon" + fenceTypeData.icon + ".png",
					fenceTypeName = fenceTypeData.name;

				//let myIcon = new BMap.Icon(url, new BMap.Size(24,24));
				//let marker = new BMap.Marker(point,{icon:myIcon});  // 创建标注
				let marker = this.setMapMarker(Mpoint, url, 100, 24, 24);

				let temp = `<div class="BMap_bubble_header text-blue font-20">${data.name}</div>
						<div class="BMap_bubble_text">
							<table>
								<tbody>
									<tr><td class="font-bolder text-right">_编号_：</td><td class="link-black">${data.number}</td></tr>
									<tr><td class="font-bolder text-right">_面积_：</td><td class="link-black">${data.area}</td></tr>
									<tr><td class="font-bolder text-right">_类型_：</td><td class="link-black">${fenceTypeName}</td></tr>
									<tr><td class="font-bolder text-right">_经度_：</td><td class="link-black">${data.center.lng}</td></tr>
									<tr><td class="font-bolder text-right">_纬度_：</td><td class="link-black">${data.center.lat}</td></tr>
									<tr><td class="font-bolder text-right">_位置_：</td><td class="link-black">${data.address}</td></tr>
									<tr><td class="font-bolder text-right">_备注_：</td><td class="link-black">${data.remark}</td></tr>
								</tbody>
							</table>
						</div>`;

				if (index != null) {

					temp += `<div style="width:100%;height:25px;">
						<a carId="${data.ID}" carIndex="${data.index}" class="InfoWindow_btn redact cursor-pointer" title="编辑"><i></i></a>

							<a carId="${data.ID}" carIndex="${data.index}" class="InfoWindow_btn delete cursor-pointer" title="删除"><i></i></a>
						</div>`;


				}

				this.setInfoWindow(marker, temp, function () {
					if (index != null) {
						switch (_this.mapType) {
							case 0:
								$(".delete").bind("click", function () {
									_this.deleteFence($(this))
								});
								$(".redact").bind("click", function () {
									_this.redactFence($(this))
								});
								break;
							case 1:
								let deleteBtn = document.getElementsByClassName("delete")[0];
								let redact = document.getElementsByClassName("redact")[0];
								google.maps.event.addDomListener(deleteBtn, "click", function () {
									_this.deleteFence($(this))
								});
								google.maps.event.addDomListener(redact, "click", function () {
									_this.redactFence($(this))
								});
								break;
						}

					}

				})

				return marker;
			},

			/***************   创建围栏            **************/
			//创建围栏 type 1圆形 2矩形 3多边形
			setFence(type){
				let _this = this;
				//初始化围栏属性
				this.choicFenceType = '_请选择类型_',
					this.drawingData = {
						name: null,	 //围栏名称
						number: "",   //自定义编号
						remark: "",   //备注
						area: null,     //面积
						formType: 0,     //类型  1圆 2矩形 3多边形
						fenceType: 0,
						path: null,     //多边形&&矩形 各顶点坐标数组  {lng:"",lat:""}
						radius: null,   //圆形半径
						center: {lng: null, lat: null},            //围栏近似中心点坐标
						address: null,                        //围栏近似中心点地址
					};
				let data = this.drawingData;
				data.formType = type;
				this.makeRail(type, null, function () {
					let overlay = _this.drawingArr[0];

					if(type==2){

						let path,NE,SW,lng1,lng2,lat1,lat2;
						switch(_this.mapType){
							case 0:
								path = overlay.getPath();
								NE=path[0];
								SW=path[2];
								lng1=NE.lng;
								lng2=SW.lng;
								lat1=NE.lat;
								lat2=SW.lat;
								break;
							case 1:
								path = overlay.getBounds();
								NE=path.getNorthEast();
								SW=path.getSouthWest();
								lng1=NE.lng();
								lng2=SW.lng();
								lat1=NE.lat();
								lat2=SW.lat();
								break;
						}

						//避免操作失误  未画出矩形
						if(lng1==lng2 || lat1==lat2){
							_this.showError("_请鼠标左键点击拖动绘制矩形_!");
							_this.removeOverlay(_this.drawingArr);
							_this.setFence(type);
							return
						}
					};
					if(type==3){

						let path;
						switch(_this.mapType){
							case 0:
								path = overlay.getPath();
								break;
							case 1:
								path = overlay.getPath().getArray();
								break;
						}
						console.log(path);
						if(type==2 && path.length<=2 || path.length>10){
							//避免多边形顶点不是3-10之间
							_this.showError("_多边形的顶点数应保证在三到十之间_,_请重新绘制_!");
							_this.removeOverlay(_this.drawingArr);
							_this.setFence(type);
							return
						}

					}

					_this.parseOverlay(type, overlay, data);
					_this.isCreateFence = true;
				})

			},
			//创建-----重新设置围栏区域
			resetFence(type){
				this.closeCreateFencePanel();
				this.setFence(type)
			},
			//新建--------设定围栏类型后重绘
			redrawFence(data){

				let _this = this,
					drawingData = this.drawingData,
					index = drawingData.index;
				this.choicFenceType = data.name;

				console.log("设定围栏类型后重绘drawingData", drawingData);
				drawingData.fenceType = data.ID;
				let strokeColor = this.transformRGBA(data.strokeColor);
				let fillColor = this.transformRGBA(data.fillColor);

				let overlay = null,
					option = {
						center: null,
						radius: null,
						bounds: null,
						paths: null,
						strokeColor: strokeColor.rgb,
						strokeOpacity: strokeColor.alpha,
						fillColor: fillColor.rgb,
						fillOpacity: fillColor.alpha,
						strokeWeight: "4"
					},
					icon,
					closeIcon;


				switch (this.mapType) {
					case 0:
						switch (parseInt(drawingData.formType)) {
							case 1:
								overlay = new BMap.Circle(
									drawingData.center,
									drawingData.radius,
									option
								);
								overlay.type = "circle";
								break;
							case 2:
								overlay = new BMap.Polygon(
									drawingData.path,
									option
								);
								overlay.type = 'rectangle';
								break;
							case 3:
								overlay = new BMap.Polygon(
									drawingData.path,
									option
								);
								overlay.type = 'polygon';
								break;


						}
						this.map.addOverlay(overlay);
						break;
					case 1:
						switch (parseInt(drawingData.formType)) {
							case 1:
								//console.log('center',drawingData.center);
								option.center = this.getMapPoint(drawingData.center);
								option.radius = parseFloat(drawingData.radius);
								overlay = new google.maps.Circle(option);
								overlay.type = 'circle';
								break;
							case 2:
								option.bounds = {
									north: drawingData.path[0].lat,
									south: drawingData.path[2].lat,
									east: drawingData.path[2].lng,
									west: drawingData.path[0].lng
								};
								//console.log('option.bounds',option.bounds)
								overlay = new google.maps.Rectangle(option);
								overlay.type = 'rectangle';
								break;
							case 3:
								option.paths = drawingData.path;
								//console.log('option.paths',option.paths)
								overlay = new google.maps.Polygon(option);
								overlay.type = 'polygon';
								break;


						}
						overlay.setMap(_this.map);//绘制图形
						break;
				}

				this.removeOverlay(this.drawingArr);
				icon = this.showfenceIcon(drawingData);
				closeIcon = this.setCloseBtn(overlay);
				this.listenerMarkerClick(closeIcon, function () {
					_this.removeOverlay(_this.drawingArr);
				})
				this.drawingArr.push(overlay, icon, closeIcon)


			},


			//关闭创建围栏面板
			closeCreateFencePanel(){
				this.isCreateFence = false;
				this.removeOverlay(this.drawingArr);
			},

			/********         编辑围栏            **************/
			redactFence(obj) {
				let ID = $(obj).attr("carId");
				let index = parseInt($(obj).attr("carIndex"));
				this.redactFenceIndex = index;
				this.choiceFenceType
				// this.redactFenceType=$(obj).attr("carType");
				//console.log(this.redactFenceType)
				this.drawingData = this.deepCopy(this.allFenceData[this.choiceFenceType][index]);
				this.choicFenceType = this.fenceTypeObj[this.drawingData.fenceType].name;
				this.isRedactFence = true;
				this.isRedactRedrawing = true;
				console.log("编辑围栏，drawingData", this.drawingData);
			},
			//编辑-----重新设置围栏区域
			redactResetFence(type){
				let _this = this;
				this.isRedactFence = false;
				this.isRedactRedrawing = false;

				let data = this.drawingData,
					index = this.drawingData.index,
					fenceType = this.drawingData.fenceType;

				console.log("编辑重新设置围栏区域fenceType", fenceType);

				this.makeRail(type, fenceType, function () {


					let overlay = _this.drawingArr[0];
					_this.parseOverlay(type, overlay, data);
					data.formType = type;

					let icon = _this.showfenceIcon(data);
					_this.drawingArr.push(icon);
					_this.isRedactFence = true;
				})

			},

			//编辑--------设定围栏类型后重绘
			redactRedrawFence(data){

				let _this = this,
					drawingData = this.drawingData,
					index = drawingData.index;
				this.choicFenceType = data.name;

				console.log("设定围栏类型后重绘drawingData", drawingData);
				drawingData.fenceType = data.ID;
				let strokeColor = this.transformRGBA(data.strokeColor);
				let fillColor = this.transformRGBA(data.fillColor);

				let overlay = null,
					option = {
						center: null,
						radius: null,
						bounds: null,
						paths: null,
						strokeColor: strokeColor.rgb,
						strokeOpacity: strokeColor.alpha,
						fillColor: fillColor.rgb,
						fillOpacity: fillColor.alpha,
						strokeWeight: "4"
					},
					icon,
					closeIcon;


				switch (this.mapType) {
					case 0:
						switch (parseInt(drawingData.formType)) {
							case 1:

								overlay = new BMap.Circle(
									drawingData.center,
									drawingData.radius,

									option
								);
								overlay.type = "circle";
								break;
							case 2:

								overlay = new BMap.Polygon(
									drawingData.path,

									option
								);
								overlay.type = 'rectangle';
								break;
							case 3:
								overlay = new BMap.Polygon(
									drawingData.path,
									option
								);
								overlay.type = 'polygon';
								break;


						}


						this.map.addOverlay(overlay);

						break;
					case 1:
						switch (parseInt(drawingData.formType)) {
							case 1:
								//console.log('center',drawingData.center);
								option.center = this.getMapPoint(drawingData.center);
								option.radius = parseFloat(drawingData.radius);
								overlay = new google.maps.Circle(option);
								overlay.type = 'circle';
								break;
							case 2:
								option.bounds = {
									north: drawingData.path[0].lat,
									south: drawingData.path[2].lat,
									east: drawingData.path[2].lng,
									west: drawingData.path[0].lng
								};
								//console.log('option.bounds',option.bounds)
								overlay = new google.maps.Rectangle(option);
								overlay.type = 'rectangle';
								break;
							case 3:
								option.paths = drawingData.path;
								//console.log('option.paths',option.paths)
								overlay = new google.maps.Polygon(option);
								overlay.type = 'polygon';
								break;

						}


						overlay.setMap(_this.map);//绘制图形
						//}
						break;


				}
				if (this.isRedactRedrawing) {
					this.removeOverlay(this.fenceArr.graph, index);
					this.removeOverlay(this.fenceArr.icon, index);
					this.removeOverlay(this.fenceArr.closeIcon, index);

					icon = this.showfenceIcon(drawingData);
					closeIcon = this.setCloseBtn(overlay);

					this.fenceArr.graph.splice(index, 1, overlay);
					this.fenceArr.icon.splice(index, 1, icon);
					this.fenceArr.closeIcon.splice(index, 1, closeIcon);

					this.listenerMarkerClick(closeIcon, function () {
						this.removeOverlay(this.fenceArr.graph, index);
						this.removeOverlay(this.fenceArr.icon, index);
						this.removeOverlay(this.fenceArr.closeIcon, index);
					})


				} else {
					this.removeOverlay(this.drawingArr);
					icon = this.showfenceIcon(drawingData);
					closeIcon = this.setCloseBtn(overlay);
					this.listenerMarkerClick(closeIcon, function () {
						this.removeOverlay(this.drawingArr);
					})
					this.drawingArr.push(overlay, icon, closeIcon)

				}


			},

			//根据overlay的获取围栏数据
			parseOverlay(type, overlay, data){
				let _this = this;

				if (type == 1) {
					switch (_this.mapType) {
						case 0:
							data.radius = overlay.getRadius().toFixed(2);
							data.center = overlay.getCenter();
							data.area = Math.PI * (data.radius * data.radius).toFixed(2)
							break;
						case 1:
							data.radius = overlay.getRadius().toFixed(2);
							data.center.lng = overlay.getCenter().lng().toFixed(6);
							data.center.lat = overlay.getCenter().lat().toFixed(6);
							data.area = Math.PI * (data.radius * data.radius).toFixed(2)
							break;
					}


				} else {
					let bounds;
					switch (_this.mapType) {
						case 0:
							data.path = overlay.getPath();
							data.area = BMapLibGeo.GeoUtils.getPolygonArea(overlay);
							data.center = _this.getCenter(data.path);
							break;
						case 1:
							if (type == 2) { //矩形
								bounds = overlay.getBounds();
								let ne = bounds.getNorthEast();
								let sw = bounds.getSouthWest();
								let lng = ((ne.lng() + sw.lng()) / 2).toFixed(6);
								let lat = ((ne.lat() + sw.lat()) / 2).toFixed(6);
								data.center = {lat: lat, lng: lng};
								data.path = [
									{lng: sw.lng(), lat: ne.lat()},
									{lng: ne.lng(), lat: ne.lat()},
									{lng: ne.lng(), lat: sw.lat()},
									{lng: sw.lng(), lat: sw.lat()}
								];

							}
							if (type == 3) { //多边形
								bounds = overlay.getPath().getArray();
								console.log("谷歌Paths", bounds);
								data.path = []
								bounds.map(function (item, index) {
									data.path.push({lng: item.lng(), lat: item.lat()})
								})
								data.center = _this.getCenter(data.path);
							}
							let BaiduOverlay = new BMap.Polygon(
								data.path
							)
							data.area = BMapLibGeo.GeoUtils.getPolygonArea(BaiduOverlay);
							break;

					}

				}

				data.area = (data.area / 1000000).toFixed(2) + "km²";
				_this.geocoder(_this.$store.state.mapType, data.center, data, "address")

			},
			//关闭编辑围栏面板
			closeRedactFencePanel(){

				let index = this.drawingData.index,
					type = this.choiceFenceType,
					data = this.allFenceData[type][index];

				this.removeOverlay(this.drawingArr);
				this.removeOverlay(this.fenceArr.graph, index);
				this.removeOverlay(this.fenceArr.icon, index);
				this.removeOverlay(this.fenceArr.closeIcon, index);


				this.showOneFence(data, index);
				this.isRedactFence = false;
			},

			//确定保存围栏
			confirmSetFence(redact){
				let _this = this;
				let drawingData = this.drawingData;
				if (drawingData.name == "") {
					this.showError("_请输入围栏名称_!")
					return
				}
				if (drawingData.fenceType == 0) {
					this.showError("_请输入围栏类型_!")
					return
				}
				//console.log(drawingData.path);
				let FT_LBSGISFence = {
					FName: drawingData.name,
					FNumber: drawingData.number == "" ? "*" : drawingData.number,
					FRemark: drawingData.remark == "" ? "*" : drawingData.remark,
					FArea: parseFloat(drawingData.area),
					FFormType: drawingData.formType,
					FFenceTypeGUID: drawingData.fenceType,
					FPath: drawingData.path == null ? "*" : JSON.stringify(drawingData.path),
					FRadius: drawingData.radius == null ? 0 : parseFloat(drawingData.radius),
					FCenterLon: parseFloat(drawingData.center.lng),
					FCenterLat: parseFloat(drawingData.center.lat),
					FAddress: drawingData.address,
				};

				function postData(url) {

					if (redact) { //编辑模式
						$.post(url, {
								FTokenID: _this.$store.state.FTokenID,
								FAction: "UpdateLBSGISFence",
								FGUID: drawingData.ID,
								FT_LBSGISFence: FT_LBSGISFence,
								FVersion: "1.0.0"
							},
							function (res) {
								console.log("修改围栏", res);

								if (res.Result == 200) {
									_this.showError("_修改围栏成功_!")
									_this.removeOverlay(_this.drawingArr);
									let index = _this.redactFenceIndex,
										type = _this.choiceFenceType;

									_this.removeOverlay(_this.fenceArr.graph, index);
									_this.removeOverlay(_this.fenceArr.icon, index);
									_this.removeOverlay(_this.fenceArr.closeIcon, index);


									//  ！！！！！！下面顺序不能改变
									_this.allFenceData[type].splice(index, 1, _this.drawingData);
									//清空临时绘制围栏
									_this.removeOverlay(_this.drawingArr);

									_this.isRedactRedrawing = true;

									_this.showOneFence(_this.drawingData, index);

									_this.isRedactFence = false;

								} else {
									_this.showError("_修改围栏失败_!")

								}
							})

					} else {  //创建模式
						$.post(url, {
								FTokenID: _this.$store.state.FTokenID,
								FAction: "AddLBSGISFence",
								FT_LBSGISFence: FT_LBSGISFence,
								FVersion: "1.0.0"
							},
							function (res) {
								console.log("创建围栏", res);

								if (res.Result == 200) {
									_this.showError("_创建围栏成功_!")

									let icon = _this.showfenceIcon(_this.drawingData);
									_this.drawingArr.push(icon);
									_this.isCreateFence = false;

								} else {
									_this.showError("_创建围栏失败_!")

								}
							})

					}


				};
				postData("/web/Common/Common_LBS")

			},

			//delete围栏
			deleteFence(obj){


				let ID = $(obj).attr("carId");
				let index = $(obj).attr("carIndex");
				//console.log(index);
				this.$confirm('_此操作将永久删除该围栏_, _是否继续_?', '_提示_', {
					confirmButtonText: '_确定_',
					confirmButtonClass: "search",
					cancelButtonText: '_取消_',
					cancelButtonClass: "cancel el-button--primary",
					type: 'warning'
				}).then(() => {
					deleteFence("/web/Common/Common_LBS");
				}).catch(() => {});

				let _this = this;
				function deleteFence(url) {

					$.post(url, {
							FTokenID: _this.$store.state.FTokenID,
							FAction: "DeleteLBSGISFence",
							FGUIDs: ID,
							FVersion: "1.0.0"
						},
						function (res) {
							if (res.Result == 200) {
								_this.showError("_围栏删除成功_");
								_this.removeOverlay(_this.fenceArr.graph, index);
								_this.removeOverlay(_this.fenceArr.icon, index);
								_this.removeOverlay(_this.fenceArr.closeIcon, index);

							}
						})

				}
			},


			/***
			 * * ***************************************   ⑸搜索部分部分    *****************************************
			 * */

			//搜索区域车辆分页 page页数
			searchCarPage(page){
				this.carListpage = this.areaChoiceArr.slice((page - 1) * 5, (page - 1) * 5 + 5)
			},
			//获得百度矩形Bounds  返回百度的区域对象  依赖百度的GIS方法获取对应的进出情况
			getBaiduBounds(overlay){
				let pStart, pEnd;
				switch (this.mapType) {
					case 0:
						let path = overlay.getPath();
						pStart = new BMap.Point(path[3].lng, path[3].lat);
						pEnd = new BMap.Point(path[1].lng, path[1].lat);
						console.log(pStart, pEnd)
						return new BMap.Bounds(pStart, pEnd);   //自己规定范围
						break;
					case 1:
						let bounds = overlay.getBounds();
						let ne = bounds.getNorthEast();
						let sw = bounds.getSouthWest();
						pStart = new BMap.Point(sw.lng(), sw.lat());
						pEnd = new BMap.Point(ne.lng(), ne.lat());
						console.log(pStart, pEnd)
						return new BMap.Bounds(pStart, pEnd);   //自己规定范围
						break;
				}
			},
			//搜索区域车辆
			rectangleSearchCar(){
				let _this = this;
				_this.isMapCarlistShow = false;
				this.makeRail(2, null, function () {
					Pace.restart();
					_this.areaChoiceArr.length = 0;
					let bs = _this.getBaiduBounds(_this.drawingArr[0]);
					for (var i = 0; i < _this.latelyData.length; i++) {
						let data = _this.latelyData[i],
							point = new BMap.Point(data.point.lng, data.point.lat);
						console.log("车辆坐标点对象", point);
						if (BMapLibGeo.GeoUtils.isPointInRect(point, bs)) {
							_this.areaChoiceArr.push(data)
						}
					}
					if (_this.areaChoiceArr.length != 0) {
						_this.isMapCarlistShow = true;
						_this.carListpage = _this.areaChoiceArr.slice(0, 5)
					} else {
						_this.showError("区域内暂无车辆，请重新加载车辆或选择区域")
						_this.removeOverlay(_this.drawingArr);

					}


				})
			},
			//添加搜索标注
			setPlace(myValue, bs) {

				let _this = this;
				this.removeOverlay(_this.searchResult)
				switch (this.mapType) {
					case 0:
					function myFun() {
						let num = 1;
						if (bs != null && bs != "" || local.getResults().getPoi(0) == undefined) {
							//搜索结果数量
							num = local.getResults().vr.length;
							if (num == 0) {
								_this.showError("未查到结果,请更换关键字或者放大地图后重新查找");
								_this.removeOverlay(_this.drawingArr);
							}
						} else {
							_this.centerAndZoom(local.getResults().getPoi(0).point, 18);

						}


						_this.searchResult = [];
						for (var i = 0; i < num; i++) {
							let result = local.getResults().getPoi(i);
							let pp = result.point;    //获取第一个智能搜索的结果
							let marker = new BMap.Marker(pp);
							_this.map.addOverlay(marker);    //添加标注
							_this.searchResult.push(marker);


							var temp = `
							<div class="BMap_bubble_title" style="overflow: hidden; height: auto; line-height: 24px; white-space: nowrap; width: auto;">
								<p style="font:bold 14px/16px arial,sans-serif;margin:0;color:#cc5522;white-space:nowrap;overflow:hidden" title="${result.title}">${result.title}
									<a target="_blank" href="${result.url}&amp;output=html&amp;source=jsapi" style="margin-left:5px;font-size:12px;color:#3d6dcc;font-weight:normal;text-decoration:none;">详情»</a>
								</p>
							</div>
							<div class="BMap_bubble_content" style="width: auto; height: auto;"><div style="font:12px arial,sans-serif;margin-top:10px">

								<table cellspacing="0" style="overflow:hidden;table-layout:fixed;font:12px arial,sans-serif">
									<tbody>
										<tr>
											<td style="vertical-align:top;width:38px;white-space:nowrap;word-break:keep-all">地址：&nbsp;</td>
											<td style="line-height:16px">${result.address}&nbsp;</td>
										</tr>
										<tr>
											<td style="vertical-align:top;">电话：</td><td>${result.phoneNumber != undefined ? result.phoneNumber : "未知"}</td>
										</tr>
									</tbody>
								</table>
							</div>`;


							let infoWindow = new BMap.InfoWindow(temp);

							marker.addEventListener("click", function () {
								this.openInfoWindow(infoWindow);
							});

						}
					}

						var local = new BMap.LocalSearch(_this.map, { //智能搜索
							pageCapacity: 50,
							//renderOptions:{map: this.map},
							onSearchComplete: myFun
						});

						if (bs != null && bs != "") {
							local.searchInBounds(myValue, bs);
						} else {
							local.search(myValue);
						}
						break;
					case 1:
						let infoWindow = new google.maps.InfoWindow();
						let service = new google.maps.places.PlacesService(_this.map);

						// The idle event is a debounced event, so we can query & listen without
						// throwing too many requests at the server.

						console.log(myValue, bs);

					function performSearch() {
						var request = {
							bounds: bs,
							keyword: myValue
						};
						service.radarSearch(request, callback);
					}

					function callback(results, status) {
						if (status !== google.maps.places.PlacesServiceStatus.OK) {
							_this.showError("未查到结果,请更换关键字或者放大地图后重新查找");
							_this.removeOverlay(_this.drawingArr);
							return;
						}
						for (var i = 0, result; result = results[i]; i++) {
							addMarker(result);
						}

					}

					function addMarker(place) {
						var marker = new google.maps.Marker({
							map: _this.map,
							position: place.geometry.location,
							//icon: {
							//	url: 'https://developers.google.com/maps/documentation/javascript/images/circle.png',
							//	anchor: new google.maps.Point(10, 10),
							//	scaledSize: new google.maps.Size(10, 17)
							//}
						});

						google.maps.event.addListener(marker, 'click', function () {
							service.getDetails(place, function (result, status) {
								if (status !== google.maps.places.PlacesServiceStatus.OK) {
									console.log(status);
									return;
								}

								let content = `<div class="BMap_bubble_title" style="overflow: hidden; height: auto; line-height: 24px; white-space: nowrap; width: auto;">
														<p style="font:bold 14px/16px arial,sans-serif;margin:0;color:#cc5522;white-space:nowrap;overflow:hidden" title="${result.name}">${result.name}
															<a target="_blank" href="${result.url}&amp;output=html&amp;source=jsapi" style="margin-left:5px;font-size:12px;color:#3d6dcc;font-weight:normal;text-decoration:none;">详情»</a>
														</p>
													</div>
													<div class="BMap_bubble_content" style="width: auto; height: auto;"><div style="font:12px arial,sans-serif;margin-top:10px">
														<table cellspacing="0" style="overflow:hidden;table-layout:fixed;font:12px arial,sans-serif">
															<tbody>
																<tr>
																	<td style="vertical-align:top;width:38px;white-space:nowrap;word-break:keep-all">地址：&nbsp;</td>
																	<td style="line-height:16px">${result.formatted_address}&nbsp;</td>
																</tr>
																<tr>
																	<td style="vertical-align:top;">电话：</td><td>${result.international_phone_number != undefined ? result.international_phone_number : "未知"}</td>
																</tr>
															</tbody>
														</table>
													</div>`;
								infoWindow.setContent(content);
								infoWindow.open(_this.map, marker);
							});
						});
						_this.searchResult.push(marker);
					}

						performSearch();
						break;
				}


			},
			//搜索地图
			searchMap(searchMapText){
				if (searchMapText != null && searchMapText != "") {
					this.setPlace(searchMapText)
				} else {
					this.removeOverlay(this.searchResult);
					this.showError("请输入搜索的地址！");
				}

			},
			//自定义搜索地图内容
			rectangleSearch(){
				this.removeOverlay(this.searchResult);
				let _this = this;

				this.$prompt('_请输入搜索关键字_', {
					title: '_区域检索_',
					inputPattern: /\S/,
					inputErrorMessage: '_不能为空_',
					confirmButtonClass: "search",
					confirmButtonText: '_选择区域_',
					cancelButtonText: '_取消_',
					cancelButtonClass: "cancel el-button--primary"
				}).then(({value}) => {
					this.makeRail(2, null, function () {

					let bs;
					switch (_this.mapType) {
						case 0:
							bs = _this.getBaiduBounds(_this.drawingArr[0]);   //自己规定范围
							break;
						case 1:
							bs = _this.drawingArr[0].getBounds();
							break;
					}
					Pace.restart();

					_this.setPlace(value, bs);

				})
			}).
				catch(() => {}
			)
				;

			},
			closeCarsList(){
				this.isMapCarlistShow = false;
				this.removeOverlay(this.drawingArr);
			},


			//根据Area智能检索
			BaiduSmartSearch(){
				let _this = this;
				//智能搜索
				function G(ID) {
					return document.getElementById(ID);
				}

				var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
					{
						"input": "baidu-search"
						, "location": this.Area
					});
				ac.addEventListener("onhighlight", function (e) {  //鼠标放在下拉列表上的事件
					var str = "";
					var _value = e.fromitem.value;
					var value = "";
					if (e.fromitem.index > -1) {
						value = _value.province + _value.city + _value.district + _value.street + _value.business;
					}
					str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

					value = "";
					if (e.toitem.index > -1) {
						_value = e.toitem.value;
						value = _value.province + _value.city + _value.district + _value.street + _value.business;
					}
					str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
					G("searchResultPanel").innerHTML = str;
				});
				var myValue;
				ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件
					var _value = e.item.value;
					myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
					_this.searchMapText = myValue;
					G("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;

					_this.setPlace(myValue);
					_this.searchMapText = '';
				});


			},
			GoogleSmartSearch(){
				let _this = this;
				var placeSearch, autocomplete;

				function initAutocomplete() {
					// Create the autocomplete object, restricting the search to geographical
					// location types.
					autocomplete = new google.maps.places.Autocomplete(
						/** @type {!HTMLInputElement} */(document.getElementById('G-search')),
						{
							types: ['geocode'],
							bounds: _this.map.getBounds()
						});

					// When the user selects an address from the dropdown, populate the address
					// fields in the form.
					autocomplete.addListener('place_changed', fillInAddress);
				}

				function fillInAddress() {
					_this.removeOverlay(_this.searchResult);
					let place = autocomplete.getPlace();
					console.log(place);
					let marker = new google.maps.Marker({
						map: _this.map,
						position: place.geometry.location,
					});
					_this.searchResult.push(marker);
					google.maps.event.addListener(marker, 'click', function () {

						let content = `<div class="BMap_bubble_title" style="overflow: hidden; height: auto; line-height: 24px; white-space: nowrap; width: auto;">
													<p style="font:bold 14px/16px arial,sans-serif;margin:0;color:#cc5522;white-space:nowrap;overflow:hidden" title="${place.name}">${place.name}
														<a target="_blank" href="${place.url}&amp;output=html&amp;source=jsapi" style="margin-left:5px;font-size:12px;color:#3d6dcc;font-weight:normal;text-decoration:none;">详情»</a>
													</p>
												</div>
												<div class="BMap_bubble_content" style="width: auto; height: auto;"><div style="font:12px arial,sans-serif;margin-top:10px">
													<table cellspacing="0" style="overflow:hidden;table-layout:fixed;font:12px arial,sans-serif">
														<tbody>
															<tr>
																<td style="vertical-align:top;width:38px;white-space:nowrap;word-break:keep-all">地址：&nbsp;</td>
																<td style="line-height:16px">${place.formatted_address}&nbsp;</td>
															</tr>
															<tr>
																<td style="vertical-align:top;">电话：</td><td>${place.international_phone_number != undefined ? place.international_phone_number : "未知"}</td>
															</tr>
														</tbody>
													</table>
												</div>`;
						let infoWindow = new google.maps.InfoWindow();
						infoWindow.setContent(content);
						infoWindow.open(_this.map, marker);


					})
					let bounds = new google.maps.LatLngBounds();
					if (place.geometry.viewport) {
						// Only geocodes have viewport.
						bounds.union(place.geometry.viewport);
					} else {
						bounds.extend(place.geometry.location);
					}
					;
					_this.map.fitBounds(bounds);
				}

				initAutocomplete();

			},
			deleteGoogleSearch(){
				this.removeOverlay(this.searchResult);
				this.searchMapText = "";
			},

		},
		wacth:{
			screenHeight(){
				this.elementsFlex("map-wrapper", "map-template", "map-tool", "contentList");
				this.elementsFlex("select-car", "map-template", "map-tool", "contentList");
			}
		},
		computed: {
			//轨迹点获取startIndex个数据
			getStartIndexData(){
				return this.carPointArr.slice(0, this.startIndex);
			},
			//计算滚动条百分百
			getPercent(){
				return Math.floor(this.playNumber / this.carPointArr.length * 100)
			},
			showOptions(){
				let obj = {
					showTime: "",
					showMileage: "",
					showSpeed: "",
					showStopTime: "",
				}

				for (let key in this.options) {
					if (this.options[key] === true) {
						obj[key] = "inline-block";
					} else {
						obj[key] = "none";
					}
				}
				return obj;
			},
		},
		activated(){
			this.getFenceTypeData();
		},
		deactivated(){ //组件停用时 调用函数
			this.stopPlayPoint();
		},
		directives: {
			drag:{
				inserted:function (el, binding) {
					var oDiv = el;
					if (binding.value.length != 0) {
						let targetDiv = document.getElementById(binding.value[0]);
						let fatherDiv = document.getElementById(binding.value[1]);

						function getPoint(obj) { //获取某元素以浏览器左上角为原点的坐标
							var t = obj.offsetTop; //获取该元素对应父容器的上边距
							var l = obj.offsetLeft; //对应父容器的上边距
							//判断是否有父容器，如果存在则累加其边距
							while (obj = obj.offsetParent) {//等效 obj = obj.offsetParent;while (obj != undefined)
								t += obj.offsetTop; //叠加父容器的上边距
								l += obj.offsetLeft; //叠加父容器的左边距
							}
							return {top: t, left: l}
						}

						oDiv.onmousedown = function (ev) {
							ev = ev || window.event; //兼容性
							ev.preventDefault();
							var oscrolltop = fatherDiv.scrollTop;  //定义滚动条高度    并顾忌兼容性
							var disx = ev.clientX - getPoint(targetDiv).left;    //鼠标点击点击时 在DIV上X轴到DIV左侧距离 = 鼠标x坐标 - DIV左侧至屏幕左侧距离
							var disy = ev.clientY - getPoint(targetDiv).top;
							var w = fatherDiv.offsetWidth;
							var h = fatherDiv.offsetHeight + oscrolltop;
							document.onmousemove = function (ev) {
								ev = ev || window.event;
								var x = ev.clientX - disx - getPoint(fatherDiv).left;   //DIVx坐标=鼠标x坐标-鼠标点击点击时 在DIV上X轴到DIV左侧距离
								var y = ev.clientY - disy - getPoint(fatherDiv).top;
								//限制DIV在浏览器屏幕中移动
								if (x < 0) {
									x = 0;
								}
								if (x > w - targetDiv.offsetWidth) {
									x = w - targetDiv.offsetWidth;
								}
								if (y < oscrolltop) {          //此处Y最小应等于滚动条高度，适配网页中所有位置
									y = oscrolltop;
								}
								if (y > h - targetDiv.offsetHeight) {
									y = h - targetDiv.offsetHeight;
								}
								targetDiv.style.left = x + 'px';   //确定DIV的  left值 和top值
								targetDiv.style.top = y + 'px';
							}

							document.onmouseup = function () {
								document.onmousemove = null;
								document.onmouseup = null;
							};

						};

					}
				}
			},
			dragX:{
				inserted:function (el, binding) {
					var oDiv = el;
					//width 【Array】  width[0]:父级宽度  width[0]:自身宽度
					if (binding.value.length != 0) {
						var faWidth = $("#my-progressbar").width();
						var chWidth = $("#progress-yuan").width();
						var fn = binding.value;
						oDiv.onmousedown = function (ev) {
							ev.preventDefault();
							var disX = ev.clientX - oDiv.offsetLeft;
							document.onmousemove = function (ev) {
								var l = ev.clientX - disX;
								if (l < -chWidth / 2) l = -chWidth / 2;
								if (l > faWidth - chWidth / 2) l = faWidth - chWidth / 2;

								oDiv.style.left = l + 'px';
								fn();
							};
							document.onmouseup = function () {
								document.onmousemove = null;
								document.onmouseup = null;
							};

						};


					}
				}
			}
		}
	}
</script>
<style>

	.map-template {
		width:100%;
		height:100%;
		overflow:hidden;
	}

	#map-wrapper {
		position:relative;
		width:100%;
		height:800px;
		border:1px solid #8a9eac;
	}

	#map-container {
		width:100%;
		height:100%;
	}

	/******地图内车辆列表*********/
	.map-carlist {
		position:absolute;
		top:100px;
		left:15%;
		z-index:1031;
		min-width:280px;
	}

	.carlist-content {
		height:250px;
	}

	.map-carlist .panel-title, .map-fence .panel-title {
		cursor:move;
	}

	/*****围栏编辑面板样式*******/
	.map-fence {
		position:absolute;
		top:100px;
		left:25%;
		z-index:1040;
	}

	.map-fence .panel-body {
		min-width:510px;
		padding-right:35px;
	}

	.map-fence ul li {
		height:35px;
		line-height:35px;
	}

	.map-fence label {
		min-width:70px;
		text-align:right;
	}

	.map-fence .textarea-wrap {
		height:65px;
		line-height:65px;
	}

	.map-fence .textarea-wrap label {
		float:left;
	}

	.map-fence .textarea-wrap textarea {
		height:100%;
		width:388px;
		resize:none;
	}

	.map-fence .address-input {
		width:388px;
	}

	.map-select-wrap {
		position:relative;
		display:inline-block;
		margin-left:-4px;
	}

	.map-fence input {
		width:157px;
		height:24px;
		line-height:25px;
		border:1px solid #a9a9a9;
	}

	.map-select {
		width:157px;
		height:24px;
		line-height:25px;
		border:1px solid #a9a9a9;
		text-align:left;
		background-color:#fff;
		font:14px/1.5 \5FAE\8F6F\96C5\9ED1, arial, \5b8b\4f53;
	}

	.map-fence .dropdown-menu a, .show-fence .dropdown-menu a {
		padding:0 34px;
	}

	.dropdown-menu .fence-li {
		position:relative;
	}

	.map-select .sp-dd {
		float:right;
	}

	.map-select-wrap .dropdown-menu {
		top:17px;
	}

	.fencetype-icon {
		position:absolute;
		top:0;
		left:4px;
		width:24px;
		height:24px;
		border:none;
		margin:6px 5px 0 0;
	}

	.color-box {
		position:absolute;
		top:0;
		right:4px;
		width:22px;
		height:22px;
		border:2px solid transparent;
		margin-top:6px;
	}

	.fencetype-icon0 {
		background-position:0 -138px;
	}

	.fencetype-icon1 {
		background-position:-24px -138px;
	}

	.fencetype-icon2 {
		background-position:-48px -138px;
	}

	.fencetype-icon3 {
		background-position:-72px -138px;
	}

	.fencetype-icon4 {
		background-position:-96px -138px;
	}

	.fencetype-icon5 {
		background-position:-120px -138px;
	}

	.fencetype-icon6 {
		background-position:-144px -138px;
	}

	.fencetype-icon7 {
		background-position:-168px -138px;
	}

	.fencetype-icon8 {
		background-position:0 -162px;
	}

	.fencetype-icon9 {
		background-position:-24px -162px;
	}

	.fencetype-icon10 {
		background-position:-48px -162px;
	}

	.fencetype-icon11 {
		background-position:-72px -162px;
	}

	.fencetype-icon12 {
		background-position:-96px -162px;
	}

	.fencetype-icon13 {
		background-position:-120px -162px;
	}

	.fencetype-icon14 {
		background-position:-144px -162px;
	}

	.fencetype-icon15 {
		background-position:-168px -162px;
	}

	.fencetype-icon16 {
		background-position:0 -186px;
	}

	.fencetype-icon17 {
		background-position:-24px -186px;
	}

	.fencetype-icon18 {
		background-position:-48px -186px;
	}

	.fencetype-icon19 {
		background-position:-72px -186px;
	}

	.fencetype-icon20 {
		background-position:-96px -186px;
	}

	.fencetype-icon21 {
		background-position:-120px -186px;
	}

	.fencetype-icon22 {
		background-position:-144px -186px;
	}

	.fencetype-icon23 {
		background-position:-168px -186px;
	}

	.fencetype-icon24 {
		background-position:0 -210px;
	}

	/******错误提示*********/
	.errorShow {
		position:absolute;
		z-index:1300;
		top:50px;
		left:50%;
		height:35px;
		line-height:35px;
		padding:0 10px;
		border-radius:5px;
		text-align:center;
		min-width:280px;
		margin-left:-140px;
		background-color:rgba(0, 0, 0, .5);
		color:#fff;
	}

	/******回放控制面板*********/
	.fatherProgress {
		position:absolute;
		left:10px;
		bottom:60px;
		font-size:12px;
		padding:8px;
		border:1px solid #fff;
		border:1px solid #cdcdcd;
		border-radius:3px;
		box-shadow:0 1px 5px #666;
		background:#f8f8f8;
	}

	.checkbox-control {
		height:25px;
		line-height:25px;
	}

	.checkbox-control label {
		padding:0 7px;
	}

	.checkbox-control label input {
		display:block;
		float:left;
		margin-top:6px;
	}

	.checkbox-control span {
		display:block;
		float:left;
	}

	.amountKilo {
		line-height:25px;
		border-bottom:1px solid #cccccc;
	}

	.fatherProgress .progress {
		position:relative;
		margin-top:15px;
		margin-bottom:10px;
		overflow:inherit;
	}

	.no-transition {
		-webkit-transition-duration:0s;
		-moz-transition-duration:0s;
		-ms-transition-duration:0s;
		-o-transition-duration:0s;
		transition-duration:0s;
	}

	.progress-yuan {
		position:absolute;
		z-index:1001;
		top:-2px;
		margin-top:-4px;
		border-radius:100%;
		width:17px;
		height:17px;
		cursor:move;
		background-color:#F8F8F8;
		border:1px solid #00c0ef;
		-webkit-box-shadow:0 1px 1px 1px rgba(0, 0, 0, .3);
		box-shadow:0 1px 1px 1px rgba(0, 0, 0, .3);
	}

	.f-m-a {
		margin:0 auto;
		float:initial;
	}

	.progress-grenn {
		background-color:#00e765 !important;
	}

	.play-speed {
		padding-bottom:3px;
	}

	.control-panel {
		display:inline-block;
		width:30px;
		height:30px;
		line-height:30px;
		line-height:30px;
		color:#ccc;
		border:1px solid #FFF;
		border-radius:50%;
		-webkit-transition:all ease .15s;
		-o-transition:all ease .15s;
		transition:all ease .15s;
		cursor:pointer;
		background-color:#ccc;
		background-image:url(/static/img/all_icon.png);
		background-repeat:no-repeat;

	}

	.control-panel:hover {
		background-color:#00e765;
	}

	.btn-active {
		background-color:#70efa5;
	}

	.xj-p-play {
		background-position:-59px -468px;
	}

	.xj-p-pause {
		background-position:-91px -468px;
	}

	.xj-p-stop {
		background-position:-121px -468px;
	}

	.xj-p-fast {
		background-position:-150px -468px;
	}

	.xj-p-slow {
		background-position:-30px -468px;
	}

	.xj-p-backward {
		background-position:0 -468px;
	}

	.xj-p-forward {
		background-position:-180px -468px;
	}

	/*地图工具样式*/
	#map-tool {
		height:40px;
		width:100%;
		padding:10px 5px;
		background-color:#fff;
		margin-bottom:0;
	}

	.map-tool-item {
		padding:0 7px;
		float:left;
		height:16px;
	}

	.halving-r-line {
		position:relative;
	}

	.search-area {
		position:relative;
	}

	.search-area input {
		height:23px;
	}

	.search-area-btn {
		position:absolute;
		width:14px;
		height:21px;
		right:1px;
		top:1px;
		cursor:pointer;
		background-color:#fff;
	}

	.halving-r-line:after {
		content:"";
		width:1px;
		background-color:#dbdbdb;
		height:16px;
		position:absolute;
		right:0;
		top:2px;
	}

	.open {
		color:#005fc6;
	}

	.activePress {
		color:#005fc6;
	}

	.map-icon {
		display:block;
		float:left;
		width:14px;
		height:14px;
		margin:3px 5px 0 0;
	}

	.map-icon1 {
		background-position:0 -100px;
	}

	.map-icon2 {
		background-position:-14px -100px;
	}

	.map-icon3 {
		background-position:-28px -100px;
	}

	.map-icon4 {
		background-position:-42px -100px;
	}

	.map-icon5 {
		background-position:-56px -100px;
	}

	.map-icon6 {
		background-position:-70px -100px;
	}

	.open .map-icon1 {
		background-position:0 -114px;
	}

	.open .map-icon2 {
		background-position:-14px -114px;
	}

	.open .map-icon3 {
		background-position:-28px -114px;
	}

	.open .map-icon4 {
		background-position:-42px -114px;
	}

	.open .map-icon5 {
		background-position:-56px -114px;
	}

	.open .map-icon6 {
		background-position:-70px -114px;
	}

	.sub-map-icon {
		display:block;
		float:left;
		width:14px;
		height:14px;
		margin:12px 5px 0 0;
	}

	.sub-map-icon1 {
		background-position:0 -62px;
	}

	.sub-map-icon2 {
		background-position:-14px -62px;
	}

	.sub-map-icon3 {
		background-position:-28px -62px;
	}

	.sub-map-icon4 {
		background-position:-42px -62px;
	}

	.sub-map-icon5 {
		background-position:-56px -62px;
	}

	.sub-map-icon6 {
		background-position:-70px -62px;
	}

	.sub-map-icon7 {
		background-position:0 -62px;
	}

	.sub-map-icon8 {
		background-position:0 -62px;
	}

	.sub-map-icon9 {
		background-position:0 -62px;
	}

	li:hover > a .sub-map-icon1 {
		background-position:0 -76px;
	}

	li:hover > a .sub-map-icon2 {
		background-position:-14px -76px;
	}

	li:hover > a .sub-map-icon3 {
		background-position:-28px -76px;
	}

	li:hover > a .sub-map-icon4 {
		background-position:-42px -76px;
	}

	li:hover > a .sub-map-icon5 {
		background-position:-56px -76px;
	}

	li:hover > a .sub-map-icon6 {
		background-position:-70px -76px;
	}

	li:hover > a .sub-map-icon7 {
		background-position:0 -76px;
	}

	li:hover > a .sub-map-icon8 {
		background-position:0 -76px;
	}

	li:hover > a .sub-map-icon9 {
		background-position:0 -76px;
	}

	/*智能搜索*/
	.tangram-suggestion-main {
		z-index:10001;
	}

	.tangram-suggestion-main > div {
		width:400px
	}

	/*测距*/
	.BMapLabel {
		max-width:300px;
	}

	/*百度地图信息框样式*/
	.BMap_bubble_header {
		width:100%;
		height:25px;
		line-height:20px;
		font-size:14px;
		font-weight:bolder;
	}

	.BMap_bubble_header img {
		display:inline-block;
		height:100%;
	}

	.BMap_bubble_text {
		height:150px;
		min-width:300px;
		border:3px solid #ccc;
		padding:5px;
		overflow:auto;
		font-size:12px;
	}

	.BMap_bubble_text .title-left {
		display:block;
		float:left;
		width:25%;
		font-weight:bolder;
	}

	.BMap_bubble_text .main-text {
		display:block;
		float:left;
		width:75%;
	}



	.InfoWindow_btn {
		float:left;
		display:block;
		margin-right:5px;
		padding:2px;
	}

	.InfoWindow_btn i {
		width:20px;
		height:20px;
		float:left;;
	}

	.road i {
		background:url(/static/img/carIcon/roadcondition.png) no-repeat center;
	}

	.navigation i {
		background:url(/static/img/carIcon/navigation.png) no-repeat center;
	}


	.carinformation i {
		background:url(/static/img/carIcon/carInfo.png) no-repeat center;
	}

	.monitor i {
		background:url(/static/img/carIcon/monitor.png) no-repeat center;
	}

	.location i {
		background:url(/static/img/carIcon/locate.png) no-repeat center;
	}

	.delete i {
		background:url(/static/img/carIcon/delete.png) no-repeat center;
	}

	.redact i {
		background:url(/static/img/carIcon/redact.png) no-repeat center;
	}

	/*google map InfoWindow信息框样式*/
	.gm-style-iw {
		left:26px !important;
	}

	#pac-input {
		height:0;
		width:500px;
		left:143px;
	}
	.car-address{
		width:170px;
	}

</style>

