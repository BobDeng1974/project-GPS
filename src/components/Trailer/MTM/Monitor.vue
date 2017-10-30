<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
	<div id="map-template" class="map-template"
		 :class="{'full-screen':IsActive.isFullScreen,'':!IsActive.isFullScreen}">


		<!--弹框-->
		<div v-if="systemID==2" class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
			 aria-hidden="true">
			<div class="modal-dialog map-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel" style="color: white">
							ID:&nbsp;&nbsp;{{FAssetID}}&nbsp;&nbsp;【&nbsp;{{FVehicleName}}&nbsp;】</h4>
					</div>
					<div class="modal-body">
						<el-input
							placeholder="_输入关键字_"
							v-model="filterText1">
						</el-input>
						<el-tree
							class="filter-tree"
							:data="noLockVehicle"
							:props="defaultProps"
							:highlight-current="true"
							default-expand-all
							:expand-on-click-node="false"
							:filter-node-method="filterNode1"
							:render-content="renderContent"
							@node-click="handleNodeClick"
							ref="tree1">
						</el-tree>
						<div class="bingCar">
							<p>
								<i class="el-icon-warning"></i>
							</p>
							<p>_没有您输入的车辆_，_请前往车辆管理新增车辆_</p>
							<button @click="sendLink({	tabsText: '_车辆管理_',router: 'vehicalmanage'},'')"
									data-dismiss="modal"><i class="el-icon-plus">_新增车辆_</i></button>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-primary" @click="bingVehicle">_确认_</button>
						<button type="button" class="btn btn-primary" data-dismiss="modal">_取消_</button>
					</div>
				</div>
			</div>
		</div>
		<!--弹框结束-->
		<!--加载地图模板-->
		<baidu-map ref="map" @fullScreen="changefullScreen" @changeRoute="changeRoute"
				   :fa-data="[mapToolShow,isShowAreaSearch]"></baidu-map>
		<!--锁图标-->
		<div class="lockBtns" v-if="systemID==2">
			<button class="unlockBtn" @click="handleLockStatus(1)" title="_只选择开锁设备_"><i class="fa fa-unlock"></i>
			</button>
			<button class="lockBtn" @click="handleLockStatus(0)" title="_只选择上锁设备_"><i class="fa fa-lock"></i></button>
		</div>
		<!--右侧选择车辆-->
		<div id="select-car"
			 v-bind:class="{'show-select-car-list':!isShowSelectCarList,'hide-select-car-list':isShowSelectCarList}">
			<div class="operate-module" @click="showCarList"></div>
			<!--点击选择车辆-->
			<!--接甩挂、冷链车辆列表-->
			<car-tree v-if="systemID!=2" ref='tree' :treeData="treeData" :options="options" @refresh="loadTreeData"
					  @choiceCarId="handlecheckedChange" @node-click="handlecheckedChange"></car-tree>
			<!--电子锁车辆列表-->
			<car-tree v-if="systemID==2" ref='tree' :treeData="lockData" :options="options" @refresh="loadTreeData"
					  @choiceCarId="handlecheckedChange" @node-click="handlecheckedChange"></car-tree>

			<!--<div class="carTeamList" v-if="systemID==2">
				<el-input
					class="filterInput"
					placeholder="_输入关键字_"
					v-model="filterText">
				</el-input>
				<el-tree
					class="filter-tree"
					:props="defaultProps"
					:data="lockData"
					node-key="FAssetID"
					default-expand-all
					show-checkbox
					:filter-node-method="filterNode"
					:render-content="renderContent"
					@node-click="handleNodeClick"
					@check-change="handleCheckChange"
					ref="tree2">
				</el-tree>
			</div>-->

		</div>
		<!--列表区域-->
		<div id="contentList" class="row no-margin-right">
			<div v-dragY="['contentList','map-template',adjustPage]" class="position-line"></div>
			<div class="col-sm-12 no-padding-right">
				<div class="contentList-header">
					<div class="border"></div>
					<ul class="nav nav-tabs " id="myTab">
						<li class="active">
							<a @click="showCarDataList(0)" data-toggle="tab" ripple="ripple" ripple-color="#FFF">
								<span class="square bg-white"></span>
								<span class="number"><i>{{allCarData.length}}</i></span>
								<span class="infoContent">_全部_</span>
							</a>
						</li>
						<li>
							<a @click="showCarDataList(1)" data-toggle="tab" ripple="ripple" ripple-color="#FFF">
								<span class="square bg-green"></span>
								<span class="number"><i>{{runCarData.length}}</i></span>
								<span class="infoContent">_行驶_</span>
							</a>
						</li>
						<li>
							<a @click="showCarDataList(2)" data-toggle="tab" ripple="ripple" ripple-color="#FFF">
								<span class="square bg-orange"></span>
								<span class="number"><i>{{stopCarData.length}}</i></span>
								<span class="infoContent">_停车_</span>
							</a>
						</li>
						<li>
							<a @click="showCarDataList(4)" data-toggle="tab" ripple="ripple" ripple-color="#FFF">
								<span class="square bg-red"></span>
								<span class="number"><i>{{alarmCarData.length}}</i></span>
								<span class="infoContent">_报警_</span>
							</a>
							<div v-show="isShowAlarmType&&alarmCarData.length!=0" class="alarmType">

								<!-----------------  通用报警类型  （6超速 10低电量） -------------------->
								<p v-show="alarmOverSpeed.length!=0" @click="showCarDataList(6)">
									<span class="img-icon monitor-icon icon-alarmOverSpeed"></span>
									_超速报警_（{{alarmOverSpeed.length}}）
								</p>
								<p v-show="FAlarmLowPower.length!=0" @click="showCarDataList(10)">
									<span class="img-icon monitor-icon icon-alarmLowBattery"></span>
									_低电量报警_（{{FAlarmLowPower.length}}）
								</p>

								<!-----------------  接甩挂和车队系统共有报警类型   （5疲劳驾驶）-------------------->
								<p v-show="alarmFatigue.length!=0 && systemID!=2" @click="showCarDataList(5)">
									<span class="img-icon monitor-icon icon-alarmFatigue"></span>
									_疲劳驾驶_（{{alarmFatigue.length}}）
								</p>

								<!-----------------  电子锁报警类型   （9绳索异常，11后盖异常，12长时间未锁，13连续五次错误密码，14刷非法卡，15禁区开锁）-------------------->

								<p v-if="systemID==2" @click="showCarDataList(9)" v-show="alarmFLockRope.length!=0">
									<span class="img-icon monitor-icon icon-alarmFLockRope"></span>
									_绳索异常_（{{alarmFLockRope.length}}）
								</p>

								<p v-if="systemID==2" @click="showCarDataList(11)" v-show="unCoverBack.length!=0">
									<span class="img-icon monitor-icon icon-alarmCover"></span>
									_后盖报警_（{{unCoverBack.length}}）
								</p>
								<p v-if="systemID==2" @click="showCarDataList(12)" v-show="longTimeOpened.length!=0">
									<span class="img-icon monitor-icon icon-longTimeOpened"></span>
									_长时间未锁_（{{longTimeOpened.length}}）
								</p>
								<p v-if="systemID==2" @click="showCarDataList(13)" v-show="fivePasswordError.length!=0">
									<span class="img-icon monitor-icon icon-fivePasswordError"></span>
									_连续五次错误密码_（{{fivePasswordError.length}}）
								</p>
								<p v-if="systemID==2" @click="showCarDataList(14)" v-show="illegalCard.length!=0">
									<span class="img-icon monitor-icon icon-illegalCard"></span>
									_刷非法卡_（{{illegalCard.length}}）
								</p>
								<p v-if="systemID==2" @click="showCarDataList(15)" v-show="forbiddenAreaOpen.length!=0">
									<span class="img-icon monitor-icon icon-forbiddenAreaOpen"></span>
									_禁区开锁_（{{forbiddenAreaOpen.length}}）
								</p>


								<!-----------------  冷链报警类型   -------------------->
								<p @click="showCarDataList(8)" v-show="alarmTemperature.length!=0">
									<span class="img-icon monitor-icon icon-alarmTemperature"></span>
									_温度报警_（{{alarmTemperature.length}}）
								</p>


								<!--道路偏移
								<p @click="showCarDataList(7)"><span class="img-icon monitor-icon icon-alarmOffsetRoad"></span>_道路偏移_（{{alarmOffsetRoad.length}}）</p>
								-->
								<!--
								<p v-if="systemID==2" @click="showCarDataList(9)">
									<span class="img-icon monitor-icon icon-alarmOverTime"></span>
									_超时报警_（{{alarmFLockRope.length}}）
								</p>
								-->
							</div>
						</li>

						<li>
							<a @click="showCarDataList(3)" data-toggle="tab" ripple="ripple" ripple-color="#FFF">
								<span class="square bg-grey"></span>
								<span class="number"><i>{{outlineCarData.length}}</i></span>
								<span class="infoContent">_离线_</span>
							</a>
						</li>
						<li>
							<i @click="showCarNameSearch" class="fa fa-search search-car-name-icon"></i>
							<input v-show="isShowSearchCarName" type="text" id="searchCarName"
								   class="search-car-name-input input-custom border-radius-2 width-150"
								   v-model="searchCarName" placeholder="_请输入关键字_">


						</li>
					</ul>
					<div class="close-Menu" :class="{'active-Menu':subMenu[0].active}">
						<a title="_最小化_" @click="closeSubMenu">
							<i class="fa fa-minus"></i>
						</a>
					</div>
					<div class="close-Menu full-menu" :class="{'active-Menu':subMenu[1].active}">
						<a title="_全屏_" @click="fullSubMenu">
							<i class="img-icon  restore-btn"></i>
						</a>
					</div>
					<div class="close-Menu full-menu open-menu" :class="{'active-Menu':subMenu[2].active}">
						<a title="_向下还原_" @click="openSubMenu">
							<i class="img-icon"></i>
						</a>
					</div>
				</div>
				<div class="tab-content no-padding no-border tab-tableinfo">
					<!--所有车辆-->
					<div id="allCar" class="customFixedTable">
						<div id="table-header">
							<!-------------------接甩挂系统------------------------->
							<!--非报警部分-->
							<ul v-if="systemID==1" v-show="carDataType<4">
								<li class="Width-5"><span>_序号_</span></li>
								<li class="Width-10"><span>_车牌号_</span></li>
								<li class="Width-15"><span>_定位时间_</span></li>
								<li class="Width-5"><span>_定位状态_</span></li>
								<li class="Width-10"><span>_接甩挂_</span></li>
								<li class="Width-10"><span>_胎温胎压_</span></li>
								<li class="Width-5 "><span>_速度_(km/h)</span></li>
								<li class="Width-10"><span>_里程_(km)</span></li>
								<li class="Width-5"><span>_电量_(%)</span></li>
								<li class="Width-15"><span>_当前位置_</span></li>
								<li class="Width-10"><span>_详情_</span></li>
							</ul>
							<!--报警部分-->
							<ul v-if="systemID==1" v-show="carDataType>=4">
								<li class="Width-5"><span>_序号_</span></li>
								<li class="Width-10"><span>_车牌号_</span></li>
								<li class="Width-10"><span>_报警类型_</span></li>
								<li class="Width-15"><span>_定位时间_</span></li>
								<li class="Width-5"><span>_定位状态_</span></li>
								<li class="Width-10"><span>_接甩挂_</span></li>
								<li class="Width-5"><span>_胎温胎压_</span></li>
								<li class="Width-5"><span>_速度_(km/h)</span></li>
								<li class="Width-5"><span>_里程_(km)</span></li>
								<li class="Width-5"><span>_电量_(%)</span></li>
								<li class="Width-15"><span>_当前位置_</span></li>
								<li class="Width-10"><span>_详情_</span></li>
							</ul>

							<!-------------------电子锁系统-------------------------->
							<!--非报警部分-->
							<ul v-if="systemID==2" v-show="carDataType<4">
								<li class="Width-5"><span>_序号_</span></li>
								<li class="Width-10"><span>_电子锁_ID</span></li>
								<li class="Width-10"><span>_车牌号_</span></li>
								<li class="Width-5"><span>_锁状态_</span></li>
								<li class="Width-10"><span>_定位时间_</span></li>
								<li class="Width-5"><span>_定位状态_</span></li>
								<li class="Width-10"><span>_速度_(km/h)</span></li>
								<li class="Width-10"><span>_当前里程_(km)</span></li>
								<li class="Width-15"><span>_当前位置_</span></li>
								<li class="Width-10"><span>_电量_(%)</span></li>
								<li class="Width-10"><span>_操作_</span></li>
							</ul>
							<!--报警部分-->
							<ul v-if="systemID==2" v-show="carDataType>=4">
								<li class="Width-5"><span>_序号_</span></li>
								<li class="Width-10"><span>_电子锁_ID</span></li>
								<li class="Width-10"><span>_车牌号_</span></li>
								<li class="Width-5"><span>_锁状态_</span></li>
								<li class="Width-10"><span>_报警类型_</span></li>
								<li class="Width-10"><span>_定位时间_</span></li>
								<li class="Width-5"><span>_定位状态_</span></li>
								<li class="Width-5"><span>_速度_(km/h)</span></li>
								<li class="Width-10"><span>_当前里程_(km)</span></li>
								<li class="Width-15"><span>_当前位置_</span></li>
								<li class="Width-5"><span>_电量_(%)</span></li>
								<li class="Width-10"><span>_操作_</span></li>
							</ul>

							<!--------------------冷链系统--------------------------->
							<!--非报警部分-->
							<ul v-if="systemID==3" v-show="carDataType<4">
								<li class="Width-5"><span>_序号_</span></li>
								<li class="Width-10"><span>_车牌号_</span></li>
								<li class="Width-15"><span>_定位时间_</span></li>
								<li class="Width-5"><span>_定位状态_</span></li>
								<li class="Width-25"><span>_温度设备_</span></li>
								<li class="Width-5"><span>_速度_(km/h)</span></li>
								<li class="Width-10"><span>_里程_(km)</span></li>
								<li class="Width-5"><span>_电量_(%)</span></li>
								<li class="Width-15"><span>_当前位置_</span></li>
								<li class="Width-5"><span>_详情_</span></li>
							</ul>
							<!--报警部分-->
							<ul v-if="systemID==3" v-show="carDataType>=4">
								<li class="Width-5"><span>_序号_</span></li>
								<li class="Width-10"><span>_车牌号_</span></li>
								<li class="Width-10"><span>_报警类型_</span></li>
								<li class="Width-10"><span>_定位时间_</span></li>
								<li class="Width-5"><span>_定位状态_</span></li>
								<li class="Width-25"><span>_温度设备_</span></li>
								<li class="Width-5"><span>_速度_(km/h)</span></li>
								<li class="Width-5"><span>_里程_(km)</span></li>
								<li class="Width-5"><span>_电量_(%)</span></li>
								<li class="Width-15"><span>_当前位置_</span></li>
								<li class="Width-5"><span>_详情_</span></li>
							</ul>

							<!--------------------车队系统--------------------------->
							<!--非报警部分-->
							<ul v-if="systemID==4" v-show="carDataType<4">
								<li class="Width-5"><span>_序号_</span></li>
								<li class="Width-10"><span>_车牌号_</span></li>
								<li class="Width-15"><span>_定位时间_</span></li>
								<li class="Width-5"><span>_定位状态_</span></li>
								<li class="Width-10"><span>_油位_(_升_)</span></li>
								<li class="Width-15"><span>_温湿度_</span></li>
								<li class="Width-5"><span>_速度_(km/h)</span></li>
								<li class="Width-5"><span>_里程_(km)</span></li>
								<li class="Width-5"><span>_电量_(%)</span></li>
								<li class="Width-20"><span>_当前位置_</span></li>
								<li class="Width-5"><span>_详情_</span></li>
							</ul>
							<!--报警部分-->
							<ul v-if="systemID==4" v-show="carDataType>=4">
								<li class="Width-5"><span>_序号_</span></li>
								<li class="Width-10"><span>_车牌号_</span></li>
								<li class="Width-10"><span>_报警类型_</span></li>
								<li class="Width-15"><span>_定位时间_</span></li>
								<li class="Width-5"><span>_定位状态_</span></li>
								<li class="Width-5"><span>_速度_(km/h)</span></li>
								<li class="Width-5"><span>_里程_(km)</span></li>
								<li class="Width-15"><span>_当前位置_</span></li>
								<li class="Width-20"><span>_油位_(_升_)</span></li>
								<li class="Width-5"><span>_电量_(%)</span></li>
								<li class="Width-5"><span>_详情_</span></li>
							</ul>
						</div>
						<div id="table-wrap" class="table-wrap">
							<table class="table table-striped table-bordered table-hover">
								<!--非报警部分-->
								<tbody v-show="carDataType<4">
								<!--接甩挂系统-->
								<tr v-if="systemID==1" v-for="(item,index) in filterCarName">
									<td width="5%" class="text-black">{{index+1}}</td>
									<td width="10%" @click="showCarPlace(filterCarName,index)"
										class="hover-underline cursor-pointer"
										:class="{'list-active':item.active,
												'text-red':item.type==3,
												'text-grey':item.alarmOffLine==1&&item.type!=3,
												'text-green':item.alarmOffLine!=1&&item.speed>0&&item.type!=3,
												'text-yellow':item.alarmOffLine!=1&&item.speed==0&&item.type!=3}">
										{{item.name}}
									</td>
									<td width="15%">{{item.time}}</td>
									<td width="5%">
										<i class="img-icon"
										   :class="{'green-light':item.locationType,'red-light':!item.locationType}"
										   :title="item.locationType?'_定位_':'_不定位_'"></i>
									</td>
									<td width="10%">
										<span v-show="item.couplingStatus!=1 && item.couplingStatus!=0">--</span>
										<i v-show="item.couplingStatus==1 || item.couplingStatus==0" class="img-icon"
										   :class="{'online-coupling':item.couplingStatus==1&&item.alarmOffLine!=1,
											   'online-unCoupling':item.couplingStatus==0&&item.alarmOffLine!=1,
											   'offline-Coupling':item.couplingStatus==1&&item.alarmOffLine==1,
											   'offline-unCoupling':item.couplingStatus==0&&item.alarmOffLine==1}"
										   :title="item.couplingStatusTitle"></i>

									</td>
									<td width="10%">

										<span v-show="item.isHaveTyreContent==0">--</span>

										<el-popover v-show="item.isHaveTyreContent==1"
													placement="top"
													width="460"
													offset="350"
													popper-class="popover-box"
													trigger="click">

												<span @click="getCarTireData(item)" slot="reference">
													<i class="img-icon carChoiceList-icon ChoiceListIcon-3a cursor-pointer"></i>
												</span>

											<div style="min-height:400px">
												<table class="popover-table" width="100%">
													<thead>
													<tr>
														<th colspan="2">_设备_ID:{{item.tireData.ID}}</th>
														<th colspan="2">_上传时间_:{{item.tireData.time}}</th>
													</tr>
													<tr>
														<th width="10%">_序号_</th>
														<th width="20%">_胎压_(Bar)</th>
														<th width="20%">_胎温_(℃)</th>
														<th width="50%">_状态_</th>
													</tr>
													</thead>
													<tbody>
													<tr v-for="value in item.tireData.data">
														<td align="center">{{value.N}}</td>
														<td align="center">{{value.P}}</td>
														<td align="center">{{value.T}}</td>
														<td align="left">
															&nbsp;&nbsp;{{value.state}}
														</td>
													</tr>
													</tbody>
												</table>
												<div class="popover-img img-tire"></div>
											</div>
										</el-popover>

									</td>
									<td width="5%">{{item.speed}}</td>
									<td width="10%">{{item.mileage}}</td>
									<td width="5%" :class="{'text-red':item.batteryPercent<=LowPowerThreshold}">
										{{item.batteryPercent}}
									</td>
									<td width="15%" :class="{'text-left':item.address!='_获取位置_'}">
											<span v-show="item.address!='_获取位置_'" class="text-nowrap-165"
												  :title="item.address">{{item.address}}</span>
											<span v-show="item.address=='_获取位置_'" @click="getAddress(item)"
												  class="text-blue hover-underline cursor-pointer">{{item.address}}</span>
									</td>
									<td width="10%">
										<a @click="showCarInfo(item.ID)" class="img-icon monitor-icon icon-info"
										   title="查看详情"></a>
									</td>

								</tr>
								<!--电子锁系统-->
								<tr v-if="systemID==2" v-for="(item,index) in filterCarName">
									<td width="5%" class="text-black">{{index+1}}</td>
									<td width="10%" @click="showCarPlace(filterCarName,index)"
										class="hover-underline cursor-pointer"
										:class="{'list-active':item.active,
												'text-red':item.type==3,
												'text-grey':item.alarmOffLine==1&&item.type!=3,
												'text-green':item.alarmOffLine!=1&&item.speed>0&&item.type!=3,
												'text-yellow':item.alarmOffLine!=1&&item.speed==0&&item.type!=3}">
										{{item.ID}}
									</td>
									<td width="10%" align="left">&nbsp;&nbsp;
										<a data-toggle="modal" data-target="#modal"
										   @click="beforebingVehicle(item)">
											<i class="fa fa-unlink" style="font-size: 14px;margin-right: 10px"
											   title="绑定车辆"></i>
										</a>
										<span>{{item.name}}</span>
									</td>
									<td width="5%">
										<!--<i :class="{'fa':true,'fa-lock':!item.FLockStatus,'fa-unlock':item.FLockStatus}" style="font-size: 18px"></i>-->
										<span v-if="item.attitude==null">--</span>
										<el-popover v-if="item.attitude!=null"
													placement="top-start"
													width="460"
													offset="350"
													popper-class="popover-box"
													trigger="hover"
													:disabled="item.attitude==0">
											<i slot="reference" class="img-icon lock-state" :class="{'normal-lock':!item.FLockStatus&&item.attitude<=1,
													'abnormal-lock':!item.FLockStatus&&item.attitude>1,
													'normal-unlock':item.FLockStatus&&item.attitude<=1,
													'abnormal-unlock':item.FLockStatus&&item.attitude>1}"
											   :title="item.FLockStatus?'_开锁_':'_上锁_'"></i>

											<div class="text-center">
												<img v-if="item.attitude!=0"
													 :src="'/static/img/pose/pose'+item.attitude+'.png'">
											</div>
										</el-popover>
									</td>
									<td width="10%">{{item.time}}</td>
									<td width="5%">
										<i class="img-icon"
										   :class="{'green-light':item.locationType,'red-light':!item.locationType}"
										   :title="item.locationType?'_定位_':'_不定位_'"></i>
									</td>
									<td width="10%">{{item.speed}}</td>
									<td width="10%">{{item.mileage}}</td>
									<td width="15%" :class="{'text-left':item.address!='_获取位置_'}">
											<span v-show="item.address!='_获取位置_'" class="text-nowrap-165"
												  :title="item.address">{{item.address}}</span>
											<span v-show="item.address=='_获取位置_'" @click="getAddress(item)"
												  class="text-blue hover-underline cursor-pointer">{{item.address}}</span>
									</td>
									<!--电子锁系统-->
									<!--<td v-if="systemID==2" width="15%" :class="{'text-red':item.couplingStatus!=1}"></td>-->
									<!--电子锁系统-->

									<td width="10%" :class="{'text-red':item.batteryPercent<=LowPowerThreshold}">
										{{item.batteryPercent}}
									</td>
									<td width="10%">
										<a @click="showCarInfo(item.FVehicleGUID)"
										   class="img-icon monitor-icon icon-info" title="查看详情"></a>&nbsp;&nbsp;
										<a v-if="remoteUnlockLimits==1" class="img-icon monitor-icon icon-key"
										   title="开锁"
										   @click="sendLink({	tabsText: '_远程开锁_',router: 'remoteUnlock'},item.ID)"></a>
									</td>

								</tr>
								<!--冷链系统-->
								<tr v-if="systemID==3" v-for="(item,index) in filterCarName">
									<td width="5%" class="text-black">{{index+1}}</td>
									<td width="10%" @click="showCarPlace(filterCarName,index)"
										class="hover-underline cursor-pointer"
										:class="{'list-active':item.active,
												'text-red':item.type==3,
												'text-grey':item.alarmOffLine==1&&item.type!=3,
												'text-green':item.alarmOffLine!=1&&item.speed>0&&item.type!=3,
												'text-yellow':item.alarmOffLine!=1&&item.speed==0&&item.type!=3}">
										{{item.name}}
									</td>
									<td width="15%">{{item.time}}</td>
									<td width="5%">
										<i class="img-icon"
										   :class="{'green-light':item.locationType,'red-light':!item.locationType}"
										   :title="item.locationType?'_定位_':'_不定位_'"></i>
									</td>
									<td width="25%" class="text-left">
										<p v-show="item.coldChainEquipment!=null && item.coldChainEquipment.length==0"
										   class="text-center">--</p>
										<el-popover
											v-show="item.coldChainEquipment!=null && item.coldChainEquipment.length!=0"
											placement="top-start"
											width="460"
											offset="350"
											popper-class="popover-box"
											trigger="hover">
											<p slot="reference" class="cursor-pointer">&nbsp;&nbsp;
												<!--
																									<span v-show="!item.alarmTemperature"
																										  class="alarmTemperature text-green">_正常_</span>
																									<span v-show="item.alarmTemperature" class="alarmTemperature text-red">_异常_</span>
												-->
													<span v-for="(item1,index) in item.coldChainEquipment"
														  v-show="item1.ID!=null"
														  :class="{'text-red':item1.temAlarm==1}">
														<i class="tire">{{index+1}}</i>{{item1.tem}}&nbsp;℃
													</span>
											</p>
											<div>
												<table class="popover-table" width="100%">
													<thead>
													<tr>
														<th width="10%">_序号_</th>
														<th width="20%">_温度_(℃)</th>
														<th width="20%">_湿度_(%)</th>
														<th width="20%">_时间_</th>
														<th width="30%">ID</th>
													</tr>
													</thead>
													<tbody>
													<tr v-for="(value,index) in  item.coldChainEquipment"
														v-show="value.ID!=null">
														<td align="center">{{index+1}}</td>
														<td align="center">{{value.tem}}</td>
														<td align="center">{{value.hum}}</td>
														<td align="center" width="30%">
															{{value.time==''?'--':value.time}}
														</td>
														<td align="center">{{value.ID}}</td>
													</tr>
													</tbody>

												</table>
												<div class="popover-img img-tem"></div>
											</div>


										</el-popover>
									</td>

									<td width="5%">{{item.speed}}</td>
									<td width="10%">{{item.mileage}}</td>
									<td width="5%" :class="{'text-red':item.batteryPercent<=LowPowerThreshold}">
										{{item.batteryPercent}}
									</td>

									<td width="15%" :class="{'text-left':item.address!='_获取位置_'}">
											<span v-show="item.address!='_获取位置_'" class="text-nowrap-165"
												  :title="item.address">{{item.address}}</span>
											<span v-show="item.address=='_获取位置_'" @click="getAddress(item)"
												  class="text-blue hover-underline cursor-pointer">{{item.address}}</span>
									</td>
									<td width="5%">
										<a @click="showCarInfo(item.ID)" class="img-icon monitor-icon icon-info"
										   title="查看详情"></a>
									</td>

								</tr>
								<!--车队系统-->
								<tr v-if="systemID==4" v-for="(item,index) in filterCarName">
									<td width="5%" class="text-black">{{index+1}}</td>
									<td width="10%" @click="showCarPlace(filterCarName,index)"
										class="hover-underline cursor-pointer"
										:class="{'list-active':item.active,
												'text-red':item.type==3,
												'text-grey':item.alarmOffLine==1&&item.type!=3,
												'text-green':item.alarmOffLine!=1&&item.speed>0&&item.type!=3,
												'text-yellow':item.alarmOffLine!=1&&item.speed==0&&item.type!=3}">
										{{item.name}}
									</td>
									<td width="15%">{{item.time}}</td>
									<td width="5%">
										<i class="img-icon"
										   :class="{'green-light':item.locationType,'red-light':!item.locationType}"
										   :title="item.locationType?'_定位_':'_不定位_'"></i>
									</td>
									<td width="10%">
										<span v-show="item.fuelValue.length==0">--</span>
											<span v-for="obj in item.fuelValue">
												<i class="tire" v-show="item.fuelValue.length!=1 && obj.number!=1">{{obj.number}}</i>{{obj.value}}&nbsp;
											</span>
									</td>
									<td width="15%" class="text-left">
										<p v-show="item.coldChainEquipment!=null && item.coldChainEquipment.length==0"
										   class="text-center">--</p>
										<el-popover
											v-show="item.coldChainEquipment!=null && item.coldChainEquipment.length!=0"
											placement="top-start"
											width="460"
											offset="350"
											popper-class="popover-box"
											trigger="hover">
											<p slot="reference" class="cursor-pointer">&nbsp;&nbsp;
												<!--
													<span v-show="!item.alarmTemperature"
														  class="alarmTemperature text-green">_正常_</span>
													<span v-show="item.alarmTemperature" class="alarmTemperature text-red">_异常_</span>
												-->
													<span v-for="(item1,index) in item.coldChainEquipment"
														  v-show="item1.ID!=null"
														  :class="{'text-red':item1.temAlarm==1}">
														<i class="tire">{{index+1}}</i>{{item1.tem}}&nbsp;℃
													</span>
											</p>
											<div>
												<table class="popover-table" width="100%">
													<thead>
													<tr>
														<th width="10%">_序号_</th>
														<th width="20%">_温度_(℃)</th>
														<th width="20%">_湿度_(%)</th>
														<th width="20%">_时间_</th>
														<th width="30%">ID</th>
													</tr>
													</thead>
													<tbody>
													<tr v-for="(value,index) in  item.coldChainEquipment"
														v-show="value.ID!=null">
														<td align="center">{{index+1}}</td>
														<td align="center">{{value.tem}}</td>
														<td align="center">{{value.hum}}</td>
														<td align="center" width="30%">
															{{value.time==''?'--':value.time}}
														</td>
														<td align="center">{{value.ID}}</td>
													</tr>
													</tbody>

												</table>
												<div class="popover-img img-tem"></div>
											</div>


										</el-popover>
									</td>

									<td width="5%">{{item.speed}}</td>
									<td width="5%">{{item.mileage}}</td>
									<td width="5%" :class="{'text-red':item.batteryPercent<=LowPowerThreshold}">
										{{item.batteryPercent}}
									</td>
									<td width="20%" :class="{'text-left':item.address!='_获取位置_'}">
											<span v-show="item.address!='_获取位置_'" class="text-nowrap-165"
												  :title="item.address">{{item.address}}</span>
											<span v-show="item.address=='_获取位置_'" @click="getAddress(item)"
												  class="text-blue hover-underline cursor-pointer">{{item.address}}</span>
									</td>
									<td width="5%">
										<a @click="showCarInfo(item.ID)" class="img-icon monitor-icon icon-info"
										   title="查看详情"></a>
									</td>

								</tr>
								</tbody>
								<!--报警部分-->
								<tbody v-show="carDataType>=4">
								<!--接甩挂系统-->
								<tr v-if="systemID==1" v-for="(item,index) in filterCarName">
									<td width="5%" class="text-black">{{index+1}}</td>
									<td width="10%" @click="showCarPlace(filterCarName,index)"
										class="hover-underline cursor-pointer text-red"
										:class="{'list-active':item.active,'':item.active}">{{item.name}}
									</td>
									<td width="10%">
											<span v-if="item.alarmFatigue==1"
												  class="monitor-icon img-icon icon-alarmFatigue"
												  data-toggle="tooltip" data-placement="left" title="_疲劳驾驶_"></span>
											<span v-if="item.alarmOverSpeed==1"
												  class="img-icon monitor-icon icon-alarmOverSpeed"
												  data-toggle="tooltip" data-placement="left" title="_超速报警_"></span>
											<span v-if="item.FAlarmLowPower==1"
												  class="img-icon monitor-icon icon-alarmLowBattery"
												  data-toggle="tooltip" data-placement="left" title="_低电量报警_"></span>
										<!--
										<span v-if="item.alarmOffsetRoad==1" class="img-icon monitor-icon icon-alarmOffsetRoad"
											  data-toggle="tooltip" data-placement="left" title="_道路偏移_"></span>
										-->
									</td>
									<td width="15%">{{item.time}}</td>
									<td width="5%">
										<i class="img-icon"
										   :class="{'green-light':item.locationType,'red-light':!item.locationType}"
										   :title="item.locationType?'_定位_':'_不定位_'"></i>
									</td>

									<td v-if="systemID==1" width="10%">
										<span v-show="item.couplingStatus!=1 && item.couplingStatus!=0">--</span>
										<i v-show="item.couplingStatus==1 || item.couplingStatus==0" class="img-icon"
										   :class="{'online-coupling':item.couplingStatus==1,'online-unCoupling':item.couplingStatus==0}"
										   :title="item.couplingStatusTitle"></i>

									</td>
									<td width="5%">
										<span v-show="item.isHaveTyreContent==0">--</span>
										<el-popover v-show="item.isHaveTyreContent==1"
													placement="top"
													width="460"
													offset="350"
													popper-class="popover-box"
													trigger="click">

												<span @click="getCarTireData(item)" slot="reference">
													<i class="img-icon carChoiceList-icon ChoiceListIcon-3a cursor-pointer"></i>
												</span>

											<div style="min-height:400px">
												<table class="popover-table" width="100%">
													<thead>
													<tr>
														<th colspan="2">_设备_ID:{{item.tireData.ID}}</th>
														<th colspan="2">_上传时间_:{{item.tireData.time}}</th>
													</tr>
													<tr>
														<th width="10%">_序号_</th>
														<th width="20%">_胎压_(Bar)</th>
														<th width="20%">_胎温_(℃)</th>
														<th width="50%">_状态_</th>
													</tr>
													</thead>
													<tbody>
													<tr v-for="value in item.tireData.data">
														<td align="center">{{value.N}}</td>
														<td align="center">{{value.P}}</td>
														<td align="center">{{value.T}}</td>
														<td align="left">
															&nbsp;&nbsp;{{value.state}}
														</td>
													</tr>
													</tbody>
												</table>
												<div class="popover-img img-tire"></div>
											</div>


										</el-popover>

									</td>
									<td width="5%">{{item.speed}}</td>
									<td width="5%">{{item.mileage}}</td>
									<td width="5%" :class="{'text-red':item.batteryPercent<=LowPowerThreshold}">
										{{item.batteryPercent}}
									</td>
									<td width="15%" :class="{'text-left':item.address!='_获取位置_'}">
											<span v-show="item.address!='_获取位置_'" class="text-nowrap-165"
												  :title="item.address">{{item.address}}</span>
											<span v-show="item.address=='_获取位置_'" @click="getAddress(item)"
												  class="text-blue hover-underline cursor-pointer">{{item.address}}</span>
									</td>

									<td width="10%">
										<a @click="showCarInfo(item.ID)" class="img-icon monitor-icon icon-info"
										   title="查看详情"></a>
									</td>

								</tr>
								<!--电子锁系统-->
								<tr v-if="systemID==2" v-for="(item,index) in filterCarName">
									<td width="5%" class="text-black">{{index+1}}</td>
									<td width="10%" @click="showCarPlace(filterCarName,index)"
										class="hover-underline cursor-pointer text-red"
										:class="{'list-active':item.active,'':item.active}">{{item.ID}}
									</td>
									<td width="10%" align="left">&nbsp;&nbsp;
										<a href="javascript:" data-toggle="modal" data-target="#modal"
										   @click="beforebingVehicle(item)">
											<i class="fa fa-unlink" style="font-size: 14px;margin-right: 10px"
											   title="绑定车辆"></i>
										</a>
										<span>{{item.name}}</span>
									</td>
									<td width="5%">
										<span v-if="item.attitude==null">--</span>
										<el-popover v-if="item.attitude!=null"
													placement="top-start"
													width="460"
													offset="350"
													popper-class="popover-box"
													trigger="hover"
													:disabled="item.attitude==0">


											<i slot="reference" class="img-icon lock-state" :class="{'normal-lock':!item.FLockStatus&&item.attitude<=1,
													'abnormal-lock':!item.FLockStatus&&item.attitude>1,
													'normal-unlock':item.FLockStatus&&item.attitude<=1,
													'abnormal-unlock':item.FLockStatus&&item.attitude>1}"></i>

											<div class="text-center">
												<img v-if="item.attitude!=0"
													 :src="'/static/img/pose/pose'+item.attitude+'.png'">
											</div>
										</el-popover>
									</td>
									<td width="10%">
											<span v-if="item.alarmOverSpeed==1"
												  class="img-icon monitor-icon icon-alarmOverSpeed"
												  data-toggle="tooltip" data-placement="left" title="_超速报警_"></span>
											<span v-if="item.alarmFLockRope==1"
												  class="img-icon monitor-icon icon-alarmFLockRope"
												  data-toggle="tooltip" data-placement="left" title="_绳索异常_"></span>
											<span v-if="item.FAlarmLowPower==1"
												  class="img-icon monitor-icon icon-alarmLowBattery"
												  data-toggle="tooltip" data-placement="left" title="_低电量报警_"></span>
											<span v-if="item.unCoverBack==1"
												  class="img-icon monitor-icon icon-unCoverBack"
												  data-toggle="tooltip" data-placement="left" title="_后盖报警_"></span>
											<span v-if="item.longTimeOpened==1"
												  class="img-icon monitor-icon icon-longTimeOpened"
												  data-toggle="tooltip" data-placement="left" title="_长时间未锁_"></span>
											<span v-if="item.fivePasswordError==1"
												  class="img-icon monitor-icon icon-fivePasswordError"
												  data-toggle="tooltip" data-placement="left" title="_五次连续错误_"></span>
											<span v-if="item.illegalCard==1"
												  class="img-icon monitor-icon icon-illegalCard"
												  data-toggle="tooltip" data-placement="left" title="_刷非法卡_"></span>
											<span v-if="item.forbiddenAreaOpen==1"
												  class="img-icon monitor-icon icon-forbiddenAreaOpen"
												  data-toggle="tooltip" data-placement="left" title="_禁区开锁_"></span>

									</td>
									<td width="10%">{{item.time}}</td>
									<td width="5%">
										<i class="img-icon"
										   :class="{'green-light':item.locationType,'red-light':!item.locationType}"
										   :title="item.locationType?'_定位_':'_不定位_'"></i>
									</td>
									<td width="5%">{{item.speed}}</td>
									<td width="10%">{{item.mileage}}</td>
									<td width="15%" :class="{'text-left':item.address!='_获取位置_'}">
											<span v-show="item.address!='_获取位置_'" class="text-nowrap-165"
												  :title="item.address">{{item.address}}</span>
											<span v-show="item.address=='_获取位置_'" @click="getAddress(item)"
												  class="text-blue hover-underline cursor-pointer">{{item.address}}</span>
									</td>
									<!--电子锁系统-->
									<!--<td v-if="systemID==2" width="15%" :class="{'text-red':item.couplingStatus!=1}"></td>-->
									<!--电子锁系统-->

									<td width="5%" :class="{'text-red':item.batteryPercent<=LowPowerThreshold}">
										{{item.batteryPercent}}
									</td>
									<td width="10%">
										<a @click="showCarInfo(item.FVehicleGUID)"
										   class="img-icon monitor-icon icon-info" title="查看详情"></a>&nbsp;&nbsp;
										<a v-if="remoteUnlockLimits==1" class="img-icon monitor-icon icon-key"
										   title="开锁"
										   @click="sendLink({tabsText:'_远程开锁_',router:'remoteUnlock'},item.ID)"></a>
									</td>

								</tr>
								<!--冷链系统-->
								<tr v-if="systemID==3" v-for="(item,index) in filterCarName">
									<td width="5%" class="text-black">{{index+1}}</td>
									<td width="10%" @click="showCarPlace(filterCarName,index)"
										class="hover-underline cursor-pointer text-red"
										:class="{'list-active':item.active,'':item.active}">{{item.name}}
									</td>
									<td width="10%">
											<span v-if="item.alarmFatigue==1"
												  class="monitor-icon img-icon icon-alarmFatigue"
												  data-toggle="tooltip" data-placement="left" title="_疲劳驾驶_"></span>
											<span v-if="item.alarmOverSpeed==1"
												  class="img-icon monitor-icon icon-alarmOverSpeed"
												  data-toggle="tooltip" data-placement="left" title="_超速报警_"></span>
											<span v-if="item.alarmTemperature==1"
												  class="img-icon monitor-icon icon-alarmTemperature"
												  data-toggle="tooltip" data-placement="left" title="_温度报警_"></span>
											<span v-if="item.FAlarmLowPower==1"
												  class="img-icon monitor-icon icon-alarmLowBattery"
												  data-toggle="tooltip" data-placement="left" title="_低电量报警_"></span>
									</td>
									<td width="10%">{{item.time}}</td>
									<td width="5%">
										<i class="img-icon"
										   :class="{'green-light':item.locationType,'red-light':!item.locationType}"
										   :title="item.locationType?'_定位_':'_不定位_'"></i>
									</td>
									<td width="25%" class="text-left">
										<p v-show="item.coldChainEquipment!=null && item.coldChainEquipment.length==0"
										   class="text-center">--</p>
										<el-popover
											v-show="item.coldChainEquipment!=null && item.coldChainEquipment.length!=0"
											placement="top"
											width="460"
											offset="60"
											popper-class="popover-box"
											trigger="hover">
											<p slot="reference" class="cursor-pointer">&nbsp;&nbsp;
												<!--
																									<span v-show="!item.alarmTemperature"
																										  class="alarmTemperature text-green">_正常_</span>
																									<span v-show="item.alarmTemperature" class="alarmTemperature text-red">_异常_</span>
												-->
													<span v-for="(item1,index) in item.coldChainEquipment"
														  v-show="item1.ID!=null"
														  :class="{'text-red':item1.temAlarm==1}">
														<i class="tire">{{index+1}}</i>{{item1.tem}}&nbsp;℃
													</span>
											</p>
											<div>
												<table class="popover-table" width="100%">
													<thead>
													<tr>
														<th width="10%">_序号_</th>
														<th width="20%">_温度_(℃)</th>
														<th width="20%">_湿度_(%)</th>
														<th width="20%">_时间_</th>
														<th width="30%">ID</th>
													</tr>
													</thead>
													<tbody>
													<tr v-for="(value,index) in  item.coldChainEquipment"
														v-show="value.ID!=null">
														<td align="center">{{index+1}}</td>
														<td align="center">{{value.tem}}</td>
														<td align="center">{{value.hum}}</td>
														<td align="center" width="30%">
															{{value.time==''?'--':value.time}}
														</td>
														<td align="center">{{value.ID}}</td>
													</tr>
													</tbody>

												</table>
												<div class="popover-img img-tem"></div>
											</div>


										</el-popover>

									</td>

									<td width="5%">{{item.speed}}</td>
									<td width="5%">{{item.mileage}}</td>
									<td width="5%" :class="{'text-red':item.batteryPercent<=LowPowerThreshold}">
										{{item.batteryPercent}}
									</td>
									<td width="15%" :class="{'text-left':item.address!='_获取位置_'}">
											<span v-show="item.address!='_获取位置_'" class="text-nowrap-165"
												  :title="item.address">{{item.address}}</span>
											<span v-show="item.address=='_获取位置_'" @click="getAddress(item)"
												  class="text-blue hover-underline cursor-pointer">{{item.address}}</span>
									</td>
									<td width="5%">
										<a @click="showCarInfo(item.ID)" class="img-icon monitor-icon icon-info"
										   title="查看详情"></a>
									</td>

								</tr>
								<!--车队系统-->
								<tr v-if="systemID==4" v-for="(item,index) in filterCarName">
									<td width="5%" class="text-black">{{index+1}}</td>
									<td width="10%" @click="showCarPlace(filterCarName,index)"
										class="hover-underline cursor-pointer text-red"
										:class="{'list-active':item.active,'':item.active}">{{item.name}}
									</td>
									<td width="10%">
												<span v-if="item.alarmFatigue==1"
													  class="monitor-icon img-icon icon-alarmFatigue"
													  data-toggle="tooltip" data-placement="left" title="_疲劳驾驶_"></span>
												<span v-if="item.alarmOverSpeed==1"
													  class="img-icon monitor-icon icon-alarmOverSpeed"
													  data-toggle="tooltip" data-placement="left" title="_超速报警_"></span>
												<span v-if="item.alarmTemperature==1"
													  class="img-icon monitor-icon icon-alarmTemperature"
													  data-toggle="tooltip" data-placement="left" title="_温度报警_"></span>
												<span v-if="item.FAlarmLowPower==1"
													  class="img-icon monitor-icon icon-alarmLowBattery"
													  data-toggle="tooltip" data-placement="left"
													  title="_低电量报警_"></span>
										<!--
										<span v-if="item.alarmOffsetRoad==1" class="img-icon monitor-icon icon-alarmOffsetRoad"
											  data-toggle="tooltip" data-placement="left" title="_道路偏移_"></span>
										-->
									</td>
									<td width="15%">{{item.time}}</td>
									<td width="5%">
										<i class="img-icon"
										   :class="{'green-light':item.locationType,'red-light':!item.locationType}"
										   :title="item.locationType?'_定位_':'_不定位_'"></i>
									</td>
									<td width="5%">{{item.speed}}</td>
									<td width="5%">{{item.mileage}}</td>
									<td width="15%" :class="{'text-left':item.address!='_获取位置_'}">
											<span v-show="item.address!='_获取位置_'" class="text-nowrap-165"
												  :title="item.address">{{item.address}}</span>
											<span v-show="item.address=='_获取位置_'" @click="getAddress(item)"
												  class="text-blue hover-underline cursor-pointer">{{item.address}}</span>
									</td>
									<td width="20%">
										<span v-show="item.fuelValue.length==0">--</span>
											<span v-for="obj in item.fuelValue">
												<i class="tire" v-show="item.fuelValue.length!=1 && obj.number!=1">{{obj.number}}</i>{{obj.value}}&nbsp;
											</span>
									</td>
									<td width="5%" :class="{'text-red':item.batteryPercent<=LowPowerThreshold}">
										{{item.batteryPercent}}
									</td>
									<td width="5%">
										<a @click="showCarInfo(item.ID)" class="img-icon monitor-icon icon-info"
										   title="查看详情"></a>
									</td>

								</tr>
								</tbody>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>

</template>
<script>
	import baiduMap from "components/Common/baidu_map.vue"
	import carTree from "components/Common/tree.vue"
	let _this = null
	export default{

		data(){
			_this = this
			return {
				systemID: null,
				refreshInterva: 45 * 1000, //页面刷新间隔
				subMenu: [
					{active: true},
					{active: false},
					{active: false}
				],
				IsActive: {
					isFullScreen: false,//地图全屏开关
				},
				isShowAlarmType: false,//报警类型开关
				isShowSelectCarList: false,//侧边栏开关
				isShowSearchCarName: false,//下部车辆搜索开关
				//初始化显示工具栏
				mapToolShow: true,
				LowPowerThreshold: this.$store.state.LowPowerThreshold, //低电量阈值  单位%
				//是否显示区域检索
				isShowAreaSearch: true,
				//初始城市
				Area: "深圳",
				//树形图数据
				treeData: [],
				//电子锁
				lockData: [],
				data: null,
				conut: 0,
				filterText: '',
				filterText1: '',
				choiceAssetData:null,
				FAssetID: null,//终端号
				FAssetGUID: null, //终端GUID
				FVehicleName: null, //车牌号
				FVehicleGUID: null,
				/************电子锁结束***************/

				//树形图选项
				options: {
					showCheckbox: true, //是否支持多选
					halfCheckedStatus: true,//控制父框是否需要半钩状态
					search: {
						useInitial: true, //是否支持首字母搜索
						useEnglish: true, //是否是英文搜索
						customFilter: null // 自定义节点过滤函数
					}
				},

				allCarsArr: [],     //树形图列表所有车辆容器
				noLockVehicle: [],  //电子锁系统 未绑定电子锁车辆数据容器
				showDataList: [],    //显示信息使用容器
				allCarData: [],      //所选车辆信息
				runCarData: [],      //运行车辆信息
				stopCarData: [],     //停车车辆信息
				alarmCarData: [],     //报警车辆信息
				outlineCarData: [],   //离线车辆信息
				alarmFatigue: [],     //疲劳驾驶报警
				alarmOverSpeed: [],   //超速报警
				alarmOffsetRoad: [],  //道路偏移报警
				alarmTemperature: [], //温度报警
				alarmFLockRope: [],   //绳锁是否异常
				FAlarmLowPower: [],   //低电量报警
				unCoverBack: [],        //后盖打开
				longTimeOpened: [],     //长时间未锁
				fivePasswordError: [],   //五次输入错误
				illegalCard: [],         //刷非法卡
				forbiddenAreaOpen: [],   //禁区开锁
				searchCarName: "",      //搜索车辆关键字
				intervalGetData: null,  //定时器对象
				carIdArr: [],            //车辆id数组
				carDataType: 0,          //记录下部菜单列表选择项类型
				remoteUnlockLimits: this.$store.state.remoteUnlockLimits   //开锁权限


			}
		},
		components: {
			baiduMap: baiduMap,
			carTree: carTree
		},
		props: {
			screenHeight: Number
		},
		mounted(){
			this.systemID = this.$store.state.choiceSystemID;

			setTimeout(function () {
				_this.adjustPage();
				_this.$refs.map.initMap();
			}, 30)


			//tabs切换效果
			var activePos = $('.contentList-header .active').position();
			//初始化下方边框
			function changePos() {
				activePos = $('.contentList-header .active').position();
				$('.border').stop().css({
					left: activePos.left,
					width: $('.contentList-header .active').width()
				});
			}

			var tabHeight = $('.tab.active').height();

			function animateTabHeight() {
				tabHeight = $('.tab.active').height();
				$('.tabs-content').stop().css({height: tabHeight + 'px'});
			}

			animateTabHeight();
			$('.contentList-header li').on('click', function (e) {
				e.preventDefault();
				setTimeout(changePos, 50)
			});
			//非Ie9及其以下版本执行
			if (navigator.appName != "Microsoft Internet Explorer" || parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE", "")) > 9) {
				$('[ripple]').on('click', function (e) {
					var rippleDiv = $('<div class="ripple" />'), rippleOffset = $(this).offset(), rippleY = e.pageY - rippleOffset.top, rippleX = e.pageX - rippleOffset.left, ripple = $('.ripple');
					rippleDiv.css({
						top: rippleY - ripple.height() / 2,
						left: rippleX - ripple.width() / 2,
						background: $(this).attr('ripple-color')
					}).appendTo($(this));
					window.setTimeout(function () {
						rippleDiv.remove();
					}, 1500);
				});
			}
			//加载树形图
			this.loadTreeData();
			let oldValue = _this.$store.state.mapLocksData;
			setInterval(function () {
				if (_this.$store.state.mapLocksData != oldValue) {
					console.log(_this.$store.state.mapLocksData)
					_this.lockData = _this.$store.state.mapLocksData;
					oldValue = _this.$store.state.mapLocksData;
				}
			}, 1000)

		},
		updated(){
			if ($('.el-tree-node').eq(0).css('display') == 'none') {
				$('.bingCar').css("display", 'block')
			} else {
				$('.bingCar').css("display", 'none')
			}
		},
		watch: {
			screenHeight () {
				this.adjustPage()
			},
			filterText1(val) {
				this.$refs.tree1.filter(val);
			}
		},
		methods: {

			//跳转路由
			changeRoute(menuData){
				this.$emit('changeRoute', menuData);
			},
			//全屏
			changefullScreen(meg){
				this.IsActive.isFullScreen = meg;
				$("#contentList").height("35px");
				$("#contentList").css("overflow", "hidden");
				this.setScroll("table-wrap", 155)
				setTimeout(function () {
					_this.adjustPage()
				}, 100)
			},
			//动态调整页面布局
			adjustPage(){
				this.elementsFlex("map-wrapper", "map-template", "map-tool", "contentList");
				this.elementsFlex("select-car", "map-template", "map-tool", "contentList");
				setTimeout(function () {
					let h = _this.elementsFlex("tree-body", "select-car", "tree-header", "tree-footer", true);
					_this.setScroll("tree-body", h)
				}, 300)
			},
			//最小化下部菜单
			closeSubMenu(){
				this.changeActive(this.subMenu, 0);
				$("#map-tool").show();
				$("#contentList").height("35px");
				$("#contentList").css("overflow", "hidden");
				this.adjustPage();
				$('.lockBtns').css("bottom", "80px")
			},
			//展开下部菜单
			openSubMenu(){
				this.changeActive(this.subMenu, 2);
				$("#contentList").css("overflow", "visible")
				$("#map-tool").show();
				$("#contentList").height("220px");
				this.setScroll("table-wrap", 155)
				this.adjustPage();
				$('.lockBtns').css("bottom", "260px")
			},

			//下部菜单全屏
			fullSubMenu(){
				this.changeActive(this.subMenu, 1);
				$("#contentList").css("overflow", "visible");
				$("#map-tool").hide();
				this.elementsFlex("contentList", "map-template");
				let height = this.elementsFlex("table-wrap", "contentList", "contentList-header", "table-header", true);
				this.setScroll("table-wrap", height - 20);
				if (this.carPointArr != 0) this.startIndex += 50;
				this.adjustPage();
			},
			//调取车辆信息
			loadTreeData(refresh) {

				if (this.$store.state.allCarsList != null && refresh != true) {
					setData()
				} else {
					_this.$store.commit('getAllCarsData', setData);
				}
				function setData() {
					//console.log(2222)
					if (_this.$store.state.allCarsList.length == 0) {
						_this.$refs.map.showError("_暂无车辆数据_");
					}
					if (_this.systemID == 2) {
						_this.allCarsArr = _this.$store.state.allLockList;   //原始锁列表
						_this.lockData = _this.deepCopy(_this.$store.state.mapLocksData);  //地图树形 锁列表
						_this.noLockVehicle = _this.$store.state.noLockVehicle;  //未绑定车辆的 锁列表
					} else {
						_this.allCarsArr = _this.$store.state.allCarsList;   //原始车辆列表
						_this.treeData = _this.deepCopy(_this.$store.state.allCarsData); //地图树形 车辆列表
					}

				}

				//清空数据或地图
				this.handlecheckedChange([]);
			},


			//开启关闭右侧车辆选择
			showCarList(){
				this.isShowSelectCarList = !this.isShowSelectCarList;
			},
			//开启关闭车辆选择搜索input
			showCarNameSearch(){
				this.isShowSearchCarName = !this.isShowSearchCarName;
				if (!this.isShowSearchCarName) this.searchCarName = "";
				setTimeout(function () {
					$("#searchCarName").focus();
				}, 200)
			},
			//选中车辆请求车辆数据
			handlecheckedChange(cars){
				Pace.restart();
				_this.carIdArr = [];
				for (let i = 0; i < cars.length; i++) {
					let id = cars[i];
					if (id.indexOf("@") === -1) _this.carIdArr.push(id);
				}
				//删除已绘制的点
				_this.$refs.map.deleteLately();
				if (_this.intervalGetData != null) {
					clearInterval(_this.intervalGetData);
				}
				if (_this.carIdArr.length === 0) {
					_this.closeSubMenu();
					_this.allCarData = [];
					_this.stopCarData = [];
					_this.runCarData = [];
					_this.alarmCarData = [];
					_this.outlineCarData = [];
					_this.alarmFatigue = [];
					_this.alarmOverSpeed = [];
					_this.alarmOffsetRoad = [];
					_this.alarmTemperature = [];
					_this.unCoverBack = [];
					_this.longTimeOpened = [];
					_this.fivePasswordError = [];
					_this.illegalCard = [];
					_this.forbiddenAreaOpen = [];
					_this.showDataList = [];
					return
				}
				;

				_this.getCarIdData(function () {
					_this.openSubMenu();
					setTimeout(function () {
						_this.$refs.map.showAllMap()
					}, 300)

				});

				_this.intervalGetData = setInterval(function () {
					_this.getCarIdData();
				}, _this.refreshInterva)

			},
			//请求选中车辆数据（电子锁）
			/*
			 getCheckChange(){
			 _this.carIdArr = [];
			 let nodeArr = this.$refs.tree2.getCheckedNodes();
			 for (let i = 0; i < nodeArr.length; i++) {
			 if (nodeArr[i].FAssetID.indexOf("@") === -1) {
			 _this.carIdArr.push(nodeArr[i].FAssetGUID);
			 }
			 }
			 //删除已绘制的点
			 _this.$refs.map.deleteLately();
			 if (_this.intervalGetData != null) {
			 _this.closeSubMenu();
			 clearInterval(_this.intervalGetData);
			 }
			 if (_this.carIdArr.length === 0) {
			 _this.allCarData = [];
			 _this.stopCarData = [];
			 _this.runCarData = [];
			 _this.alarmCarData = [];
			 _this.outlineCarData = [];
			 _this.alarmFatigue = [];
			 _this.alarmOverSpeed = [];
			 _this.alarmOffsetRoad = [];
			 _this.alarmTemperature = [];
			 _this.showDataList = [];
			 return
			 }

			 _this.getCarIdData(function () {
			 _this.openSubMenu();
			 setTimeout(function () {
			 _this.$refs.map.showAllMap()
			 }, 200)

			 });

			 _this.intervalGetData = setInterval(function () {
			 _this.getCarIdData();
			 }, _this.refreshInterva)

			 },
			 */

			//在当前选择车辆的范围内 根据开锁和上锁状态 过滤设备
			handleLockStatus(status){

			},


			handleCheckChange(){
				let fn = _this.getCheckChange;
				clearTimeout(fn.timeoutId);
				fn.timeoutId = setTimeout(function () {
					fn.call(null);
				}, 500);
				//this.throttle(_this.save,null,500,this.value)
			},
			//请求车辆数据
			getCarIdData(callback){
				let carIdString = _this.carIdArr.join(",");
				let url;
				let action;
				let GUIDs;
				let num = 0;
				switch (this.systemID) {
					case 1:
						url = '/web/Trailer/Trailer_LBS';
						action = 'QueryLBSMonitorListByFVehicleGUIDs';
						GUIDs = 'FVehicleGUIDs'
						break;
					case 2:
						url = '/web/Lock/Lock_LBS';
						action = 'QueryLBSMonitorListByFAssetGUIDs';
						GUIDs = 'FAssetGUIDs'
						break;
					case 3:
						url = '/web/ColdChain/ColdChain_LBS';
						action = 'QueryLBSMonitorListByFVehicleGUIDs';
						GUIDs = 'FVehicleGUIDs'
						break;
					case 4:
						url = '/web/FleetManager/FleetManager_LBS';
						action = 'QueryLBSMonitorListByFVehicleGUIDs';
						GUIDs = 'FVehicleGUIDs'
						break;
				}

				$.ajax({
					url: url,
					cache: false,
					async: true,
					type: 'Post',
					dataType: 'json',
					contentType: 'application/json;charset=utf-8',
					global: false,
					data: '{"FTokenID":"' + _this.$store.state.FTokenID + '","FAction":"' + action + '","' + GUIDs + '":"' + carIdString + '","FVersion":"1.0.0"}',
					success: function (res) {
						console.log(url, res);
						_this.allCarData = [];
						_this.stopCarData = [];
						_this.runCarData = [];
						_this.alarmCarData = [];
						_this.outlineCarData = [];
						_this.alarmFatigue = [];
						_this.alarmOverSpeed = [];
						_this.alarmOffsetRoad = [];
						_this.alarmTemperature = [];
						_this.alarmFLockRope = [];
						_this.FAlarmLowPower = [];
						_this.unCoverBack = [];
						_this.longTimeOpened = [];
						_this.fivePasswordError = [];
						_this.illegalCard = [];
						_this.forbiddenAreaOpen = [];
						_this.showDataList = [];
						if (res.Result == 104) {
							_this.$refs.map.showError("_登录超时_，_5秒后返回登录页面_");
							setTimeout(function () {
								_this.$store.commit("goLogin");
							}, 5000)
							return
						}
						if (res.Result == 200) {
							if (res.FObject == 0) {
								_this.$refs.map.showError("_暂无数据_");
								return
							}
							console.log("实时监控车辆数据", res);
							let resData = res.FObject,
								points = [];
							let idArr = JSON.parse(JSON.stringify(_this.carIdArr));
							let interva = 0;
							//电子锁
							if (_this.systemID == 2) {
								for (let i = 0; i < resData.length; i++) {
									let oResData = resData[i];
									//获取离线车辆ID
									idArr.map(function (item, index) {
										if (item == oResData.FAssetGUID) {
											idArr.splice(index, 1)
										}
									})

									let point = {
										lng: parseFloat(oResData.FLongitude),
										lat: parseFloat(oResData.FLatitude)
									}

									let oCarPonitData = {
										ID: oResData.FAssetID,
										FVehicleGUID: oResData.FVehicleGUID,
										assetID: oResData.FAssetID,
										FAssetGUID: oResData.FAssetGUID,
										name: oResData.FVehicleName == null ? "--" : oResData.FVehicleName,
										company: oResData.FShortName,
										operateType: oResData.FOperateType,
										time: _this.parseGMT(oResData.FGPSDateTime),
										point: _this.parsePoint(point),
										speed: oResData.FSpeed,
										direction: oResData.FDirection,
										mileage: oResData.FMileage,
										address: "_定位中_",
										batteryPercent: oResData.FBatteryPercent > 100 ? "_充电中_" : oResData.FBatteryPercent,
										alarmOffLine: oResData.FAlarmOffLine, //离线状态
										FLockStatus: oResData.FLockStatus,    //锁状态

										alarmOverSpeed: oResData.FAlarmOverSpeed, //超速报警
										alarmOffsetRoad: oResData.FAlarmOffsetRoad, //道路偏移
										alarmFLockRope: oResData.FLockRope,         //绳索异常
										FAlarmLowPower: oResData.FAlarmLowPower,      //低电量

										unCoverBack: oResData.FUnCoverBack,          //后盖打开
										longTimeOpened: oResData.FLongTimeOpened,       //长时间未锁
										fivePasswordError: oResData.FFivePasswordError,    //五次输入错误
										illegalCard: oResData.FIllegalCard,          //刷非法卡
										forbiddenAreaOpen: oResData.FForbiddenAreaOpen,    //禁区开锁

										attitude: 0,        //锁姿态  无姿态数据为null 数据格式 字符串 x轴，y轴，z轴
										coldChainEquipment: [],
										active: false,
										type: 0,
										locationType: oResData.FLocationType == 0 ? false : true  //定位状态
									}
									if (oResData.FAttitude != null && oResData.FAttitude != '') {
										oCarPonitData.attitude = _this.parseLockPose(oResData.FAttitude);
									}

									//实时车辆状态 筛选优先顺序  离线>报警>停车>运行
									if (oResData.FAlarmOffLine == 1) {
										//离线
										oCarPonitData.type = 4;
										_this.outlineCarData.push(oCarPonitData)
									}
									else if (oCarPonitData.alarmOverSpeed == 1
										|| oCarPonitData.alarmFLockRope == 1
										|| oCarPonitData.FAlarmLowPower == 1
										|| oCarPonitData.alarmFLockRope == 1
										|| oCarPonitData.unCoverBack == 1
										|| oCarPonitData.longTimeOpened == 1
										|| oCarPonitData.fivePasswordError == 1
										|| oCarPonitData.illegalCard == 1
										|| oCarPonitData.forbiddenAreaOpen == 1) {
										//报警
										oCarPonitData.type = 3;
										_this.alarmCarData.push(oCarPonitData);
										if (oCarPonitData.alarmFLockRope == 1) _this.alarmFLockRope.push(oCarPonitData);
										if (oCarPonitData.alarmOverSpeed == 1) _this.alarmOverSpeed.push(oCarPonitData);
										if (oCarPonitData.FAlarmLowPower == 1) _this.FAlarmLowPower.push(oCarPonitData);

										if (oCarPonitData.unCoverBack == 1) _this.unCoverBack.push(oCarPonitData);
										if (oCarPonitData.longTimeOpened == 1) _this.longTimeOpened.push(oCarPonitData);
										if (oCarPonitData.fivePasswordError == 1) _this.fivePasswordError.push(oCarPonitData);
										if (oCarPonitData.illegalCard == 1) _this.illegalCard.push(oCarPonitData);
										if (oCarPonitData.forbiddenAreaOpen == 1) _this.forbiddenAreaOpen.push(oCarPonitData);

									}
									else if (oResData.FSpeed == 0) {
										//停车
										oCarPonitData.type = 2;
										_this.stopCarData.push(oCarPonitData)
									}
									else {
										//运行
										_this.runCarData.push(oCarPonitData)
									}

									_this.allCarData.push(oCarPonitData);

									//车辆坐标集合
									if (oCarPonitData.point.lng != 0 && oCarPonitData.point.lat != 0) {
										points.push(oCarPonitData.point);

									} else {
										_this.allCarData[i].address = "_无定位_"
									}


								}
								_this.$refs.map.getLatelyData(_this.allCarData, points)
								if (callback != null && callback != "") callback();

								for (let i = 0; i < resData.length; i++) {

									if (_this.allCarData[i].point.lng != 0 && _this.allCarData[i].point.lat != 0) {

										setTimeout(function () {
											_this.geocoder(_this.$store.state.mapType, _this.allCarData[i].point, _this.allCarData[i], "address")
										}, i * 30)

									} else {
										_this.allCarData[i].address = "_无定位_"
									}

								}

								idArr.map(function (item, index) {
									for (var i = 0; i < _this.allCarsArr.length; i++) {
										var obj = _this.allCarsArr[i];

										if (obj.FAssetGUID == item) {
											let outlineCar = {
												ID: obj.FAssetID,
												assetID: obj.FAssetID,
												FVehicleGUID: obj.FVehicleGUID,
												name: obj.FVehicleName == null ? "--" : obj.FVehicleName,
												company: obj.FShortName,
												operateType: "--",
												time: "--",
												point: {lng: 0, lat: 0},
												speed: "--",
												direction: "--",
												mileage: "--",
												address: "--",
												couplingStatus: 3,
												containerStatus: "",
												alarmTPMS: 3,
												batteryPercent: "--",
												isAlarm: "",
												alarmFatigue: "",
												alarmOverSpeed: "",
												alarmOffsetRoad: "",
												alarmOffLine: 1,
												alarmOffsetRoad: "",
												active: false,
												type: 4,
												attitude: null,
												coldChainEquipment: []
											}
											_this.allCarData.push(outlineCar);
											_this.outlineCarData.push(outlineCar);
											break;
										}

									}
								})
							} else {
								//接甩挂  冷链  车队管理
								for (let i = 0; i < resData.length; i++) {
									let oResData = resData[i];
									//获取离线车辆ID
									idArr.map(function (item, index) {
										if (item == oResData.FVehicleGUID) {
											idArr.splice(index, 1)
										}
									})

									let point = {
										lng: parseFloat(oResData.FLongitude),
										lat: parseFloat(oResData.FLatitude)
									}

									let oCarPonitData = {
										ID: oResData.FVehicleGUID,
										assetID: oResData.FAssetID,
										name: oResData.FVehicleName,
										company: oResData.FShortName,
										operateType: oResData.FOperateType,
										time: _this.parseGMT(oResData.FGPSDateTime),
										point: _this.parsePoint(point),
										speed: oResData.FSpeed,
										direction: oResData.FDirection,
										mileage: oResData.FMileage,
										address: "_获取位置_",
										couplingStatus: oResData.FCouplingStatus,
										containerStatus: oResData.FContainerStatus == 1 ? "_有厢_" : "_无厢_",
										isHaveTyreContent: parseInt(oResData.FIsHaveTyreContent),  //0 无   1有
										batteryPercent: oResData.FBatteryPercent > 100 ? "_充电中_" : oResData.FBatteryPercent,
										isAlarm: oResData.FIsAlarm,
										alarmFatigue: oResData.FAlarmFatigue,
										alarmOverSpeed: oResData.FAlarmOverSpeed,
										alarmOffsetRoad: oResData.FAlarmOffsetRoad,
										alarmOffLine: oResData.FAlarmOffLine,
										alarmOffsetRoad: oResData.FAlarmOffsetRoad,
										alarmTemperature: false,
										active: false,
										type: 0,
										locationType: oResData.FLocationType == 0 ? false : true,
										coldChainEquipment: [], //温度数据
										fuelValue: [], //油位数据
										tireData: { //轮胎数据
											ID: null,
											time: null,
											data: []
										},
										couplingStatusTitle: ""  //接甩挂状态的title
									}

									//分析接甩挂title
									if (oCarPonitData.alarmOffLine) {
										oCarPonitData.couplingStatusTitle += "_离线_&"
									} else {
										oCarPonitData.couplingStatusTitle += "_在线_&"
									}
									if (oCarPonitData.couplingStatus) {
										oCarPonitData.couplingStatusTitle += "_接挂_"
									} else {
										oCarPonitData.couplingStatusTitle += "_甩挂_"
									}

									//冷链系统
									if (_this.systemID == 3 || _this.systemID == 4) {

										let cce = oCarPonitData.coldChainEquipment;

										for (let j = 1; j < 5; j++) {
											if (oResData['FSensorID' + j] != null) {
												let cceItem = {
													number: j,
													ID: oResData['FSensorID' + j],
													tem: oResData['FTemperature' + j],
													temAlarm: oResData['FTemperature' + j + 'Alarm'],
													hum: oResData['FHumidity' + j],
													time: _this.parseGMT(oResData['FSensor' + j + 'GPSDateTime']),
												}
												if (cceItem.temAlarm == 1) oCarPonitData.alarmTemperature = true;
												cce.push(cceItem)
											}
										}

									}

									//车队系统
									if (_this.systemID == 4) {
										let fuelValue = oCarPonitData.fuelValue;
										for (let j = 1; j < 4; j++) {
											if (oResData['FFuelValue' + j] != -1) {
												let item = {
													number: j,
													value: oResData['FFuelValue' + j]
												}
												fuelValue.push(item)
											}
										}
									}


									//实时车辆状态 筛选优先顺序  离线>报警>停车>运行
									if (oResData.FAlarmOffLine == 1) {
										//离线
										oCarPonitData.type = 4;
										_this.outlineCarData.push(oCarPonitData)
									}
									else if (oCarPonitData.alarmOverSpeed == 1 || oCarPonitData.alarmTemperature == 1 || oCarPonitData.alarmFatigue == 1) {

										oCarPonitData.type = 3;
										_this.alarmCarData.push(oCarPonitData);
										if (oCarPonitData.alarmOverSpeed == 1) _this.alarmOverSpeed.push(oCarPonitData);
										if (oCarPonitData.alarmTemperature == 1) _this.alarmTemperature.push(oCarPonitData);
										if (oCarPonitData.alarmFatigue == 1) _this.alarmFatigue.push(oCarPonitData);

									}
									else if (oResData.FSpeed == 0) {
										//停车
										oCarPonitData.type = 2;
										_this.stopCarData.push(oCarPonitData)
									}
									else {
										//运行
										_this.runCarData.push(oCarPonitData)
									}

									_this.allCarData.push(oCarPonitData);

									//车辆坐标集合
									if (oCarPonitData.point.lng != 0 && oCarPonitData.point.lat != 0) {
										points.push(oCarPonitData.point);

									} else {
										_this.allCarData[i].address = "_无定位_"
									}


								}

								_this.$refs.map.getLatelyData(_this.allCarData, points)

								if (callback != null && callback != "") callback();

								for (let i = 0; i < resData.length; i++) {

									if (_this.allCarData[i].point.lng != 0 && _this.allCarData[i].point.lat != 0) {

										setTimeout(function () {
											_this.geocoder(_this.$store.state.mapType, _this.allCarData[i].point, _this.allCarData[i], "address")
										}, i * 30)

									} else {
										_this.allCarData[i].address = "_无定位_"
									}

								}

								//计算离线车辆数据
								idArr.map(function (item, index) {

									for (var i = 0; i < _this.allCarsArr.length; i++) {
										var obj = _this.allCarsArr[i];
										if (obj.FGUID == item) {
											let outlineCar = {
												ID: obj.FGUID,
												assetID: "/",
												name: obj.FVehicleName,
												company: obj.FShortName,
												operateType: "--",
												time: "--",
												point: {lng: 0, lat: 0},
												speed: "--",
												direction: "--",
												mileage: "--",
												address: "--",
												couplingStatus: 3,
												containerStatus: "",
												alarmTPMS: 3,
												batteryPercent: "--",
												isHaveTyreContent: 0,  //0 无   1有
												alarmFatigue: "",
												alarmOverSpeed: "",
												alarmOffsetRoad: "",
												alarmOffLine: 1,
												alarmOffsetRoad: "",
												active: false,
												type: 4,
												coldChainEquipment: [],
												locationType: false,
												fuelValue: [],
												tireData: { //轮胎数据
													ID: null,
													time: null,
													data: []
												}
											}
											_this.allCarData.push(outlineCar);
											_this.outlineCarData.push(outlineCar);
											break;
										}

									}
								})
							}
							//console.log(_this.allCarData);
							_this.showDataList = [];
							switch (_this.carDataType) {
								case 0: //全部数据
									_this.showDataList = _this.allCarData
									break;
								case 1: //运行数据
									_this.showDataList = _this.runCarData
									break;
								case 2://停车数据
									_this.showDataList = _this.stopCarData
									break;
								case 3://离线数据
									_this.showDataList = _this.outlineCarData
									break;
								case 4://报警数据
									_this.showDataList = _this.alarmCarData
									break;
								case 5://疲劳驾驶报警
									_this.showDataList = _this.alarmFatigue
									break;
								case 6://超速报警
									_this.showDataList = _this.alarmOverSpeed
									break;
								case 7://道路偏移报警
									_this.showDataList = _this.alarmOffsetRoad
									break;
								case 8://温度报警
									_this.showDataList = _this.alarmTemperature
									break;
								case 9://绳索异常报警
									_this.showDataList = _this.alarmFLockRope
									break;
								case 10://低电量报警
									_this.showDataList = _this.FAlarmLowPower
									break;
								case 11://后盖异常
									_this.showDataList = _this.unCoverBack
									break;
								case 12://长时间未锁
									_this.showDataList = _this.longTimeOpened
									break;
								case 13://五次连续错误密码
									_this.showDataList = _this.fivePasswordError
									break;
								case 14://刷非法卡
									_this.showDataList = _this.illegalCard
									break;
								case 15://禁区开锁
									_this.showDataList = _this.forbiddenAreaOpen
									break;
							}
						}


					}
				});

			},
			//请求车辆地址
			getAddress(data){
				console.log('位置', data);
				_this.geocoder(this.$store.state.mapType, data.point, data, 'address')
			},
			//显示所选车辆位置
			showCarPlace(data, index){

				let lng = data[index].point.lng,
					lat = data[index].point.lat;
				if (lng >= -180 && lng <= 180 && lat >= -90 && lat <= 90 && lng != 0 && lat != 0) {
					_this.$refs.map.showCarPlace(data[index].point);
					_this.changeActive(data, index);
				} else {
					_this.$refs.map.showError("_暂无车辆定位_!");
				}
			},
			//显示车辆列表
			showCarDataList(type){
				_this.carDataType = type;
				switch (type) {
					case 0: //全部数据
						_this.isShowAlarmType = false;
						_this.showDataList = _this.allCarData
						break;
					case 1: //运行数据
						_this.isShowAlarmType = false;
						_this.showDataList = _this.runCarData
						break;
					case 2://停车数据
						_this.isShowAlarmType = false;
						_this.showDataList = _this.stopCarData
						break;
					case 3://离线数据
						_this.isShowAlarmType = false;
						_this.showDataList = _this.outlineCarData
						break;
					case 4://报警数据
						_this.isShowAlarmType = !_this.isShowAlarmType;
						_this.showDataList = _this.alarmCarData
						break;
					case 5://疲劳驾驶报警
						_this.showDataList = _this.alarmFatigue
						break;
					case 6://超速报警
						_this.showDataList = _this.alarmOverSpeed
						break;
					case 7://道路偏移报警
						_this.showDataList = _this.alarmOffsetRoad
						break;
					case 8://温度报警
						_this.showDataList = _this.alarmTemperature
						break;
					case 9://绳索报警
						_this.showDataList = _this.alarmFLockRope
						break;
					case 10://低电量报警
						_this.showDataList = _this.FAlarmLowPower
						break;

				}
			},
			//根据地图类型转译坐标系
			parsePoint(point){
				if (point.lng == 0 && point.lat == 0) return point;
				switch (this.$store.state.mapType) {
					case 0:
						return this.parsePointBD(point);
					case 1:
						return this.parsePointGCJ(point);
				}
			},
			//点击绑定图标
			beforebingVehicle(data){
				console.log(data)
				_this.choiceAssetData=data;
				_this.FVehicleGUID=null;
				_this.FAssetGUID = data.FAssetGUID;
				_this.FAssetID = data.assetID;
				_this.FVehicleName = data.name;
			},
			bingVehicle(){

				if(_this.FVehicleGUID==null){
					_this.$message({
						message: '_请选择车辆_',
						type: 'warning'
					})
					return
				}

				let postData = {
					FTokenID: _this.$store.state.FTokenID,
					FAction: "UpdateBoundingVehicle",
					FAssetGUID: _this.FAssetGUID,
					FVehicleGUID: _this.FVehicleGUID,
					FVersion: "1.0.0"
				}
				$.ajax({
					"url": "/web/Lock/Lock_SmartLock",
					"cache": false,
					"async": true,
					"type": "post",
					"dataType": "json",
					"contentType": "application/json; charset=utf-8",
					"data": JSON.stringify(postData),
					success: function (json) {
						console.log(json)
						if(json.Result==200){
							$("#modal").modal("hide");
							_this.$message({
								message: '_修改成功_',
								type: 'success'
							});
							//更新下部列表数据
							_this.choiceAssetData.name=_this.FVehicleName;
							_this.choiceAssetData.FVehicleGUID=_this.FVehicleGUID;
							//更新树形图数据

							_this.lockData[0].children.map(function(item,index){
								if(item.id==_this.FAssetGUID){
									item.subLabel=_this.FVehicleName;
									item.FVehicleGUID=_this.FVehicleGUID;
									return;
								}
							})





						}else{
							_this.$message({
								message: '_修改失败_',
								type: 'error'
							})
						}
					},
					error: function () {

					}
				})
			},
			sendLink: function (value, id) {
				this.$emit('changeRoute', value);
				this.$router.push({name: value.router, params: {ID: id}})
			},
			showCarInfo(ID){
				_this.$refs.map.showCarInfo(ID);
			},
			//获取胎压数据
			getCarTireData(carData){
				console.log(carData);
				$.post("/web/Trailer/Trailer_LBS", {
						FTokenID: _this.$store.state.FTokenID,
						FAction: "QueryLBSMonitorTPMSByFVehicleGUID",
						FVehicleGUID: carData.ID,
						FVersion: "1.0.0"
					},
					function (res) {
						console.log("所选车辆胎压数据", res.Result, res.Message, res.FObject);
						if (res.Result == 104) {
							_this.$refs.map.showError("登录超时，5秒后返回登录页面");
							setTimeout(function () {
								_this.$store.commit("goLogin");
							}, 5000)
							return
						}
						if (res.Result == 200) {
							if (res.FObject.length == 0) return;
							let json = JSON.parse(res.FObject[0].FTyreContent);
							console.log(json);
							carData.tireData.ID = res.FObject[0].FAssetID;
							carData.tireData.time = _this.parseGMT(res.FObject[0].FGPSDateTime);
							for (var i = 0; i < json.length; i++) {
								let obj = json[i];
								let arr = obj.S.split(',');
								let state = "";
								if (arr.indexOf('LB') != -1) state += "_低电量_; ";
								//if(arr.indexOf('BN')!=-1) state+="_电量正常_";
								if (arr.indexOf('PN') != -1) state += "_胎压正常_; ";
								if (arr.indexOf('HP') != -1) state += "_高胎压_; ";
								if (arr.indexOf('LP') != -1) state += "_低胎压_; ";

								if (arr.indexOf('LE') != -1) state += "_急泄漏_; ";
								if (arr.indexOf('L') != -1) state += "_泄露_; ";

								if (arr.indexOf('TN') != -1) state += "_胎温正常_; ";
								if (arr.indexOf('HT') != -1) state += "_高胎温_; ";
								obj.state = state
							}

							carData.tireData.data = json;
						}
					})

			},
			handleNodeClick(data){
				if (data.id.indexOf("@B") != -1 || data.id.indexOf("@A") != -1 || data.id.indexOf("@C") != -1) return;

				this.FVehicleName = data.label;
				this.FVehicleGUID = data.id;

			},

			renderContent(h, { node, data, store }){
				return (
					<span>
						<i class="fa fa-home icon fa-lg" v-show={data.id.indexOf("@A")!=-1}></i>
						<i class="fa fa-building icon" v-show={data.id.indexOf("@B")!=-1}></i>
						<i class="fa fa-flag-checkered icon" v-show={data.id.indexOf("@C")!=-1}></i>
						<i class="fa fa-truck icon"
						   v-show={data.id.indexOf("@B")==-1&data.id.indexOf("@A")==-1&data.id.indexOf("@C")==-1}></i>
						{node.label}
						<span style="margin-left:10px"
							  v-show={data.id.indexOf("@B")!=-1||data.id.indexOf("@A")!=-1||data.id.indexOf("@C")!=-1}>
							({data.count})
						</span>
					</span>
				)
			},

			/*
			 //旧 车辆列表
			 renderContent(h, { node, data, store }){
			 return (
			 <span
			 //class={{"green":!data.FAlarmOffLine&&data.FAssetID.indexOf("@A")==-1&&data.FAssetID.indexOf("@B")==-1&&data.FAssetID.indexOf("@C")==-1}}
			 >
			 <i class="fa fa-home icon fa-lg" v-show={data.FAssetID.indexOf("@A")!=-1}></i>
			 <i class="fa fa-lock icon" v-show={data.FAssetID.indexOf("@A")==-1&&!data.FLockStatus}></i>
			 <i class="fa fa-unlock icon" v-show={data.FAssetID.indexOf("@A")==-1&&data.FLockStatus}></i>
			 <span v-show={data.FAssetID.indexOf("@A")!=-1}>{data.FVehicleName}</span>
			 <span v-show={data.FAssetID.indexOf("@A")==-1}>{data.FAssetID}</span>
			 <span v-show={data.FAssetID.indexOf("@A")!=-1} style="font-weight:bold">[{data.count}]</span>
			 <span style="margin-left:10px" v-show={data.FAssetID.indexOf("@A")==-1}>({data.FVehicleName})
			 </span>
			 </span>
			 )
			 },
			 handleNodeClick(data){
			 var nodeArr = this.$refs.tree2.getCheckedNodes();
			 if (nodeArr.indexOf(data) == -1) {
			 this.$refs.tree2.setChecked(data, true, true)
			 } else {
			 this.$refs.tree2.setChecked(data, false, true)
			 }
			 },
			 //请求开锁或未开锁的数据
			 handleLockStatus(status){
			 var nodeArr = this.$refs.tree2.getCheckedNodes();
			 if (!status) {
			 $.each(_this.lockData[0].children, function (index, item) {
			 if (!item.FLockStatus) {
			 if (nodeArr.indexOf(item) == -1) {
			 _this.$refs.tree2.setChecked(item, true, true)
			 }
			 } else {
			 if (nodeArr.indexOf(item) !== -1) {
			 _this.$refs.tree2.setChecked(item, false, true)
			 }
			 }
			 })
			 } else {
			 $.each(_this.lockData[0].children, function (index, item) {
			 if (item.FLockStatus) {
			 if (nodeArr.indexOf(item) == -1) {
			 _this.$refs.tree2.setChecked(item, true, true)
			 }
			 } else {
			 if (nodeArr.indexOf(item) !== -1) {
			 _this.$refs.tree2.setChecked(item, false, true)
			 }
			 }
			 })
			 }
			 },
			 //树形过滤
			 filterNode(value, data) {
			 if (!value) return true;
			 if (data.FAssetID) {
			 return data.FAssetID.indexOf(value) !== -1;
			 }
			 },

			 */
			//车辆绑定列表 过滤规则
			filterNode1(value, data) {
				if (!value) {
					return true;
				}
				return data.label.indexOf(value) !== -1;
			},


		},
		computed: {
			filterCarName: function () {
				var name = this.searchCarName;
				var shoppingList = this.showDataList;
				return shoppingList.filter(function (item) {
					let a = false, b = false;
					if (item.name != '' && item.name != null && item.name.toUpperCase().indexOf(name.toUpperCase()) != -1) a = true;
					if (item.assetID && item.assetID.toUpperCase().indexOf(name.toUpperCase()) != -1) b = true;
					if (a || b) return true;
				});
			}
		},
		activated(){
			//组件激活时，所选车辆不为空时，开启定时刷新
			if (_this.carIdArr.length != 0) {
				_this.intervalGetData = setInterval(function () {
					_this.getCarIdData();
				}, _this.refreshInterva)
			}
		},
		deactivated(){
			//组件停用时 停止定时器
			if (_this.intervalGetData != null) clearInterval(_this.intervalGetData);
		},
		directives: {
			dragY: {
				inserted: function (el, binding) {
					var oDiv = el;

					if (binding.value.length != 0) {
						let targetDiv = document.getElementById(binding.value[0]);
						let fatherDiv = document.getElementById(binding.value[1]);
						let fn = binding.value[2];

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
							//var disx = ev.clientX - getPoint(targetDiv).left;    //鼠标点击点击时 在DIV上X轴到DIV左侧距离 = 鼠标x坐标 - DIV左侧至屏幕左侧距离
							var disy = ev.clientY - getPoint(targetDiv).top;
							//console.log("disy",disy)
							//var w = fatherDiv.offsetWidth;
							var h = fatherDiv.offsetHeight + oscrolltop;
							//console.log("h",h)
							document.onmousemove = function (ev) {
								ev = ev || window.event;
								//var x = ev.clientX - disx - getPoint(fatherDiv).left;   //DIVx坐标=鼠标x坐标-鼠标点击点击时 在DIV上X轴到DIV左侧距离
								var y = ev.clientY - disy - getPoint(fatherDiv).top;

								if (y < oscrolltop) {          //此处Y最小应等于滚动条高度，适配网页中所有位置
									y = oscrolltop;
								}
								if (y > h - $("#myTab").height()) {
									y = h - $("#myTab").height();
								}
								//targetDiv.style.left = x + 'px';   //确定DIV的  left值 和top值
								//targetDiv.style.top = y + 'px';

								let newHeight = fatherDiv.offsetHeight - y;
								//console.log(fatherDiv.offsetHeight,y)
								if (y <= $("#map-tool").height()) {
									$("#map-tool").hide()
								} else {
									$("#map-tool").show()
								}
								$("#contentList").height(newHeight + 'px');
								let h1 = $('#myTab').height();
								let h2 = $('#table-header').height();
								//console.log(newHeight - h1 - h2);
								$("#table-wrap").slimScroll({
									//width: 'auto', //可滚动区域宽度
									height: newHeight - h1 - h2 + 'px', //可滚动区域高度
									size: '10px', //组件宽度
									color: '#00aff0', //滚动条颜色
									position: 'right', //组件位置：left/right
									distance: '0px', //组件与侧边之间的距离
									start: 'top', //默认滚动位置：top/bottom
									opacity: .6, //滚动条透明度
									alwaysVisible: false, //是否 始终显示组件
									disableFadeOut: true, //是否 鼠标经过可滚动区域时显示组件，离开时隐藏组件
									railVisible: true, //是否 显示轨道
									railColor: '#333', //轨道颜色
									railOpacity: .2, //轨道透明度
									railDraggable: true, //是否 滚动条可拖动
									railClass: 'slimScrollRail', //轨道div类名
									barClass: 'slimScrollBar', //滚动条div类名
									wrapperClass: 'slimScrollDiv', //外包div类名
									allowPageScroll: true, //是否 使用滚轮到达顶端/底端时，滚动窗口
									wheelStep: 20, //滚轮滚动量
									touchScrollStep: 200, //滚动量当用户使用手势
									borderRadius: '7px', //滚动条圆角
									railBorderRadius: '7px' //轨道圆角
								});

								fn();
							}

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
<style scoped>
	.map-dialog {
		margin-top:150px;
		width:500px;
	}

	.map-dialog .modal-header {
		background-color:#005fc6;
	}

	.bingCar {
		position:absolute;
		top:150px;
		width:470px;
		text-align:center;
	}

	.bingCar p {
		line-height:40px;
	}

	.bingCar .el-icon-warning {
		font-size:35px;
		color:#c87f0a;
	}

	.bingCar button {
		background:white;
		border:1px solid #1a70ce;
		color:#1a70ce;
		width:120px;
		height:26px;
	}

	.text-nowrap-165 {
		display:block;
		max-width:320px;
		padding-left:5px;
		word-break:keep-all;
		white-space:nowrap;
		overflow:hidden;
		text-overflow:ellipsis;
	}

	@media (max-width:1800px) {
		.text-nowrap-165 {
			max-width:165px;
		}
	}

	@media (min-width:1800px) and (max-width:1920px) {
		.text-nowrap-165 {
			max-width:265px;
		}
	}

	.search-car-name-icon {
		float:left;
		margin:8px 5px 0 8px;
		font-size:20px;
		color:#fff;
		cursor:pointer;
	}

	.search-car-name-input {
		float:left;
		margin-top:6px;
	}

	.monitor-icon {
		display:inline-block;
		width:16px;
		height:16px;
		margin-right:5px;
	}

	.icon-alarmFatigue {
		background-position:-111px -18px;
	}

	.icon-alarmOverSpeed {
		background-position:-95px -18px;
	}

	.icon-alarmOffsetRoad {
		background-position:-79px -18px;
	}

	.icon-alarmTemperature {
		background-position:-127px -18px;
	}

	.icon-alarmFLockRope {
		background-position:-16px -18px;
	}

	.icon-alarmLowBattery {
		background-position:-46px -18px;
	}

	.icon-unCoverBack {
		background-position:-62px 0px;
	}

	.icon-longTimeOpened {
		background-position:-232px 0;
	}

	.icon-fivePasswordError {
		background-position:-32px -18px;
	}

	.icon-illegalCard {
		background-position:-63px -18px;
	}

	.icon-forbiddenAreaOpen {
		background-position:-246px 0;
	}

	.icon-alarmOverTime {
		background-position:0px -18px;
	}

	.icon-key {
		font-size:14px;
		background-position:-230px -22px;
	}

	.icon-info {
		font-size:14px;
		background-position:-246px -22px;
	}

	#contentList .nav > li a {
		padding:0 12px 0 17px;
		margin:0;
		border:none;
	}

	.alarmType {
		position:absolute;
		bottom:128%;
		left:-33px;
		z-index:1000;
		min-width:150px;
		border:1px solid #ccc;
		font-size:14px;
		-webkit-box-shadow:0 6px 12px rgba(0, 0, 0, .175);
		box-shadow:0 6px 12px rgba(0, 0, 0, .175);
	}

	.alarmType:after {
		content:"";
		position:absolute;
		left:60px;
		bottom:-20px;
		width:0;
		height:0;
		border:10px solid transparent;
		border-top-color:#fff;
	}

	.alarmType p {
		position:relative;
		box-sizing:content-box;
		height:35px;
		line-height:35px;
		border-bottom:1px solid #ccc;
		padding-left:28px;
		text-align:left;
		background-color:#fff;
		color:#666;
		cursor:pointer;
		white-space:nowrap;
	}

	.alarmType .monitor-icon {
		position:absolute;
		top:10px;
		left:5px;
	}

	.alarmType p:last-child {
		border:0;
	}

	.alarmType p:hover {
		background-color:#6699d1;
		color:#fff;
	}

	.square {
		position:absolute;
		left:10px;
		top:13px;
		display:inline-block;
		width:15px;
		height:15px;
		border-radius:3px;
	}

	.bg-white {
		background:#f9f9f9;
		filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffff', endColorstr='#f9f9f9', gradientType=0);
		background:-moz-linear-gradient(top, #fff 0%, #f9f9f9 100%);
		background:-webkit-gradient(linear, left top, left bottom, color-stop(0%, #fff), color-stop(100%, #f9f9f9));
		background:-webkit-linear-gradient(top, #fff 0%, #f9f9f9 100%);
		background:-o-linear-gradient(top, #fff 0%, #f9f9f9 100%);
		background:-ms-linear-gradient(top, #fff 0%, #f9f9f9 100%);
		background:linear-gradient(to bottom, #fff 0%, #f9f9f9 100%);
	}

	.bg-green {
		background:#0f970f;
		filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#a8e49e', endColorstr='#0f970f', gradientType=0);
		background:-moz-linear-gradient(top, #a8e49e 0%, #0f970f 100%);
		background:-webkit-gradient(linear, left top, left bottom, color-stop(0%, #fff), color-stop(100%, #0f970f));
		background:-webkit-linear-gradient(top, #a8e49e 0%, #0f970f 100%);
		background:-o-linear-gradient(top, #a8e49e 0%, #0f970f 100%);
		background:-ms-linear-gradient(top, #a8e49e 0%, #0f970f 100%);
		background:linear-gradient(to bottom, #a8e49e 0%, #0f970f 100%);

	}

	.bg-orange {
		background:#ce851d;
		filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#faaa39', endColorstr='#ce851d', gradientType=0);
		background:-moz-linear-gradient(top, #faaa39 0%, #ce851d 100%);
		background:-webkit-gradient(linear, left top, left bottom, color-stop(0%, #faaa39), color-stop(100%, #ce851d));
		background:-webkit-linear-gradient(top, #faaa39 0%, #ce851d 100%);
		background:-o-linear-gradient(top, #faaa39 0%, #ce851d 100%);
		background:-ms-linear-gradient(top, #faaa39 0%, #ce851d 100%);
		background:linear-gradient(to bottom, #faaa39 0%, #ce851d 100%);
	}

	.bg-red {
		background:#d92323;
		filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#fd8c8c', endColorstr='#d92323', gradientType=0);
		background:-moz-linear-gradient(top, #fd8c8c 0%, #d92323 100%);
		background:-webkit-gradient(linear, left top, left bottom, color-stop(0%, #fd8c8c), color-stop(100%, #d92323));
		background:-webkit-linear-gradient(top, #fd8c8c 0%, #d92323 100%);
		background:-o-linear-gradient(top, #fd8c8c 0%, #d92323 100%);
		background:-ms-linear-gradient(top, #fd8c8c 0%, #d92323 100%);
		background:linear-gradient(to bottom, #fd8c8c 0%, #d92323 100%);

	}

	.bg-grey {
		background:#ccc;
		filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#c1beb6', endColorstr='#838383', gradientType=0);
		background:-moz-linear-gradient(top, #c1beb6 0%, #838383 100%);
		background:-webkit-gradient(linear, left top, left bottom, color-stop(0%, #c1beb6), color-stop(100%, #838383));
		background:-webkit-linear-gradient(top, #c1beb6 0%, #838383 100%);
		background:-o-linear-gradient(top, #c1beb6 0%, #838383 100%);
		background:-ms-linear-gradient(top, #c1beb6 0%, #838383 100%);
		background:linear-gradient(to bottom, #c1beb6 0%, #838383 100%);

	}

	.number {
		float:left;
		position:relative;
		z-index:1001;
		display:block;
		line-height:15px;
		margin-top:5px;
	}

	.number i {
		height:15px;
		padding:0 3px;
		background-color:#f76a28;
		color:#fff;
		border-radius:5px;
		font-size:12px;
		font-style:normal;
	}

	.infoContent {
		float:right;
		display:block;
		font-size:16px;
		height:35px;
		line-height:35px;
	}

	.alarmTemperature {
		padding:0 8px;
	}

	.lockBtns {
		position:absolute;
		bottom:80px;
		font-size:30px;
		left:10px;
	}

	.lockBtns button {
		width:50px;
		height:50px;
		border-radius:25px;
	}

	.lockBtns .unlockBtn {
		border:3px solid transparent;
		background:white;
		color:#005fc6;
		outline:none;
	}

	.lockBtns .lockBtn {
		background:#005fc6;
		border:3px solid transparent;
		color:white;
		outline:none;
	}

	.unlockBtn:focus, .lockBtn:focus {
		border-color:#60ef23;
	}

	.online-coupling {
		display:block;
		width:64px;
		height:25px;
		margin:2px auto;
		background-position:-200px -38px;
	}

	.offline-coupling {
		display:block;
		width:64px;
		height:25px;
		margin:2px auto;
		background-position:-200px -63px;
	}

	.online-unCoupling {
		display:block;
		width:64px;
		height:25px;
		margin:2px auto;
		background-position:-266px -38px;
	}

	.offline-unCoupling {
		display:block;
		width:64px;
		height:25px;
		margin:2px auto;
		background-position:-266px -63px;
	}


</style>
<style>
	.map-dialog .el-tree {
		height:450px;
		overflow-y:scroll;
	}
</style>

