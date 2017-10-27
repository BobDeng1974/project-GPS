<template>
	<div id="map-template" class="map-template"
		 :class="{'full-screen':IsActive.isFullScreen,'':!IsActive.isFullScreen}">
		<baidu-map ref="map" @fullScreen="changefullScreen" @playNumber="scrollShowData"
				   :fa-data="[mapToolShow]"></baidu-map>
		<!--智能搜索-->
		<div id="select-car" :class="{'show-select-car-list':isShowSelectCarList,'hide-select-car-list':!isShowSelectCarList}">
			<!--智能搜索-->
			<div class="search-module">
				<!--操作选择车辆列表显示隐藏-->
				<div class="operate-module" @click="showCarList"></div>
				<!--点击选择车辆(接甩挂、冷链、车辆管理)-->
				<car-tree v-if="systemID!=2" ref='tree' :treeData="treeData" :options="options" @refresh="loadTreeData"
						  @node-click="getChoiceCarData"></car-tree>
				<!--电子锁车辆列表-->
				<car-tree v-if="systemID==2" ref='tree' :treeData="treeData" :options="options" @refresh="loadTreeData"
						  @node-click="getChoiceCarData"></car-tree>
<!--
				<div id="lockList" class="carTeamList" v-if="systemID==2">
					<el-input
						class="filterInput"
						placeholder="_输入关键字_"
						v-model="filterText">
					</el-input>
					<el-tree
						class="filter-tree"
						:props="defaultProps"
						:data="lockData"
						:load="loadTree"
						:highlight-current="true"
						default-expand-all
						:filter-node-method="filterNode"
						:render-content="renderContent"
						@node-click="handleNodeClick"
						ref="tree2">
					</el-tree>
				</div>
-->

				<ul id="tree-footer" class="list-group">
					<li class="tree-footer-title">_更多选择_</li>
					<li class="list-group-item top-border">
						<label v-if="systemID!=2">_所选车辆_：</label>
						<label v-if="systemID==2">_所选设备_：</label>
						<span class="text-aqua">{{choiceCarData.name}}</span>
					</li>
					<li class="list-group-item no-border">
						<label for="car-start-time">_开始时间_：</label>
						<input id="car-start-time" type="text">
					</li>

					<li class="list-group-item no-border">
						<label for="car-end-time">_结束时间_：</label>
						<input id="car-end-time" type="text">
					</li>
					<li class="list-group-item  no-border">
						<button id="today" class="btn btn-xs btn-reset">_今天_</button>
						<button id="yesterday" class="btn btn-xs btn-reset">_昨天_</button>
						<button id="threeday" class="btn btn-xs btn-forgive">_近三天_</button>
						<button @click="getCarData" class="btn btn-search btn-xs"><i
							class="fa fa-search padding-r-8"></i>_查询_
						</button>
					</li>
					<li class="list-group-item no-border">
						<label for="travel-spacing">_分段间距_：</label>
						<select @change="changeInterval" v-model="interval" id="travel-spacing">
							<option value="0">_自动_</option>
							<option value="50">50km</option>
							<option value="30">30km</option>
							<option value="10">10km</option>
							<option value="5">5km</option>
							<option value="3">3km</option>
							<option value="1">1km</option>
						</select>
					</li>
					<li class="list-group-item no-border">
						<label for="stop-time">_停车时长_≥：</label>
						<select @change="showAllStopPoint" v-model="carStopPointArr.choiceTime">
							<option value="3">3_分钟_</option>
							<option value="5">5_分钟_</option>
							<option value="10">10_分钟_</option>
							<option value="30">30_分钟_</option>
							<option value="60">60_分钟_</option>
						</select>
					</li>

				</ul>
			</div>

		</div>
		<!--列表区域-->
		<div id="contentList" class="row no-margin-right">
			<!--拖动条-->
			<div v-dragY="['contentList','map-template',adjustPage]" class="position-line"></div>
			<!--车辆数据报表部分-->
			<div class="col-sm-12 no-padding-right">
				<!--报表类型头部-->
				<div class="contentList-header" >
					<div class="border"></div>
					<ul class="nav nav-tabs " id="myTab">
						<!--轨迹点 -->
						<li class="active">
							<a @click="showAllPoints" data-toggle="tab" ripple="ripple" ripple-color="#FFF">
								_轨迹点_(<span class="number remove-number">{{carPointArr.length}}</span>)
							</a>
						</li>
						<!--甩挂 冷链 车队 运行段-->
						<li v-if="systemID!=2">
							<a @click="IsActive.pointType=1" data-toggle="tab" ripple="ripple" ripple-color="#FFF">
								_运行段_(<span class="number remove-number">{{carRunArr.runData.length}}</span>)
							</a>
						</li>

						<!--电子锁 运行段-->
						<li v-if="systemID==2">
							<a @click="IsActive.pointType=1" data-toggle="tab" ripple="ripple" ripple-color="#FFF">
								_趟次报表_(<span class="number remove-number">{{carRunArr.runData.length}}</span>)
							</a>
						</li>
						<!--全局停车-->
						<li>
							<a @click="IsActive.pointType=2" data-toggle="tab" ripple="ripple" ripple-color="#FFF">
								_停车_(<span class="number remove-number">{{carStopPointArr.filterData.length}}</span>)
							</a>
						</li>
						<!--甩挂 胎压报警-->
						<li v-if="systemID==1">
							<a @click="IsActive.pointType=3" data-toggle="tab" ripple="ripple" ripple-color="#FFF">
								_胎压报警_
								(<span class="number remove-number">{{tyreArr.data.length}}</span>)
							</a>
						</li>
						<!--   <li v-if="systemID==2">
							 <a @click="IsActive.pointType=3" data-toggle="tab"  ripple="ripple" ripple-color="#FFF">
							   _开关锁_
							   (<span class="number remove-number">{{tyreArr.data.length}}</span>)
							 </a>
						   </li>-->
						<!--电子锁 异常报表-->
						<li v-if="systemID==2">
							<a @click="IsActive.pointType=4" data-toggle="tab" ripple="ripple" ripple-color="#FFF">
								_异常报表_
								(<span class="number remove-number">{{tyreArr.data.length}}</span>)
							</a>
						</li>
						<!--温度曲线-->
						<li v-if="systemID==3||systemID==4">
							<a @click="showTemperature" data-toggle="tab" ripple="ripple" ripple-color="#FFF">
								_温度曲线_
							</a>
						</li>
						<!--油位曲线-->
						<li v-if="systemID==4">
							<a @click="showOilLine" data-toggle="tab" ripple="ripple" ripple-color="#FFF">
								_油位曲线_
							</a>
						</li>
<!--
						<li v-if="systemID==3">
							<a @click="IsActive.pointType=4" data-toggle="tab" ripple="ripple" ripple-color="#FFF">
								_温度报警_
								(<span class="number remove-number"></span>)
							</a>
						</li>
-->


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
					<div class="customFixedTable">
						<!--报表 table theader-->
						<div id="table-header">
							<!--轨迹点  接甩挂-->
							<ul v-if="systemID==1" v-show="IsActive.pointType==0">
								<li class="Width-5"><span>_序号_</span></li>
								<li class="Width-15"><span>_定位时间_</span></li>
								<li class="Width-5"><span>_定位状态_</span></li>
								<li class="Width-5"><span>_速度_(km/h)</span></li>
								<li class="Width-10"><span>_里程_(km)</span></li>
								<li class="Width-40"><span>_状态_</span></li>
								<li class="Width-20"><span>_位置_</span></li>
							</ul>
							<!--轨迹点  电子锁-->
							<ul v-if="systemID==2" v-show="IsActive.pointType==0">
								<li class="Width-5"><span>_序号_</span></li>
								<li class="Width-15"><span>_定位时间_</span></li>
								<li class="Width-10"><span>_定位状态_</span></li>
								<li class="Width-10"><span>_锁状态_</span></li>
								<li class="Width-10"><span>_锁绳状态_</span></li>
								<li class="Width-10"><span>_速度_(km/h)</span></li>
								<li class="Width-10"><span>_里程_(km)</span></li>

								<li class="Width-30"><span>_位置_</span></li>
							</ul>
							<!--轨迹点  冷链-->
							<ul v-if="systemID==3" v-show="IsActive.pointType==0">
								<li class="Width-5"><span>_序号_</span></li>
								<li class="Width-15"><span>_定位时间_</span></li>
								<li class="Width-5"><span>_定位状态_</span></li>
								<li class="Width-5"><span>_速度_(km/h)</span></li>
								<li class="Width-10"><span>_里程_(km)</span></li>
								<li class="Width-10"><span>_电量_(%)</span></li>
								<li class="Width-30"><span>_温湿度_</span></li>
								<li class="Width-20"><span>_位置_</span></li>
							</ul>
							<!--轨迹点  车队-->
							<ul v-if="systemID==4" v-show="IsActive.pointType==0">
								<li class="Width-5"><span>_序号_</span></li>
								<li class="Width-15"><span>_定位时间_</span></li>
								<li class="Width-10"><span>_定位状态_</span></li>
								<li class="Width-10"><span>_速度_(km/h)</span></li>
								<li class="Width-10"><span>_里程_(km)</span></li>
								<li class="Width-10"><span>_电量_(%)</span></li>
								<li class="Width-20"><span>_油量_</span></li>
								<li class="Width-20"><span>_位置_</span></li>
							</ul>
							<!--运行段-->
							<ul v-if="systemID!=2" v-show="IsActive.pointType==1" >
								<li class="Width-5"><span>_序号_</span></li>
								<li class="Width-15"><span>_开始时间_</span></li>
								<li class="Width-15"><span>_结束时间_</span></li>
								<li class="Width-20"><span>_开始位置_</span></li>
								<li class="Width-20"><span>_结束位置_</span></li>
								<li class="Width-15"><span>_运行时长_</span></li>
								<li class="Width-10"><span>_运行距离_</span></li>
							</ul>
							<!--趟次报表-->
							<ul v-if="systemID==2" v-show="IsActive.pointType==1" >
								<li class="Width-5"><span>_序号_</span></li>
								<li class="Width-15"><span>_上锁时间_</span></li>
								<li class="Width-15"><span>_上锁位置_</span></li>
								<li class="Width-10"><span>_开锁方式_</span></li>
								<li class="Width-15"><span>_开锁时间_</span></li>
								<li class="Width-15"><span>_开锁位置_</span></li>
								<li class="Width-15"><span>_运行时长_</span></li>
								<li class="Width-10"><span>_运行距离_</span></li>
							</ul>
							<!--停车点-->
							<ul v-show="IsActive.pointType==2">
								<li class="Width-5"><span>_序号_</span></li>
								<li class="Width-15"><span>_停车开始时间_</span></li>
								<li class="Width-15"><span>_停车结束时间_</span></li>
								<li class="Width-15"><span>_停车时长_</span></li>
								<li class="Width-30"><span>_状态_</span></li>
								<li class="Width-20"><span>_位置_</span></li>
							</ul>
							<!--胎压报警-->
							<ul v-if="systemID==1" v-show="IsActive.pointType==3" >
								<li class="Width-5"><span>_序号_</span></li>
								<li class="Width-15"><span>_开始_/_结束时间_</span></li>
								<li class="Width-15"><span>_开始位置_</span></li>
								<li class="Width-15"><span>_结束位置_</span></li>
								<li class="Width-10"><span>_报警时长_/_里程_</span></li>
								<li class="Width-40"><span>_报警信息_</span></li>
							</ul>
							<!--开关锁-->
							<!--
								<ul v-show="IsActive.pointType==3" v-if="systemID==2">
								   <li class="Width-5"><span>_序号_</span></li>
								   <li class="Width-15"><span>_时间_</span></li>
								   <li class="Width-40"><span>_位置_</span></li>
								   <li class="Width-40"><span>_开锁类型_</span></li>
								 </ul>
							 -->
							<!--异常报表-->
							<ul v-if="systemID==2" v-show="IsActive.pointType==4" >
								<li class="Width-5"><span>_序号_</span></li>
								<li class="Width-15"><span>_时间_</span></li>
								<li class="Width-40"><span>_位置_</span></li>
								<li class="Width-40"><span>_异常类型_</span></li>
							</ul>
							<ul v-if="systemID==4" v-show="IsActive.pointType==5">
								<li style="width:100%">_温度曲线_</li>
							</ul>
							<ul v-if="systemID==4" v-show="IsActive.pointType==6">
								<li style="width:100%">_油位曲线_</li>
							</ul>
						</div>
						<!--报表 table tbody-->
						<div id="table-wrap" class="table-wrap">
							<!--  轨迹点部分  -->
							<table v-show="IsActive.pointType==0 && IsActive.pointType!=5" class="table table-striped table-bordered table-hover" id="table-inner">
								<!--接甩挂-->
								<tbody v-if="systemID==1">
									<tr @click="showPointText(item.index-1)" class="cursor-pointer"
										v-for="(item,index) in getStartIndexData"
										:class="{'list-active':item.active,'':item.active}">
										<td width="5%">{{item.index}}</td>
										<td width="15%">{{item.time}}</td>
										<td width="5%">
											<i class="img-icon" :class="{'green-light':item.locationType,'red-light':!item.locationType}" :title="item.locationType?'_定位_':'_不定位_'"></i>
										</td>
										<td width="5%">{{item.speed}}</td>
										<td width="10%">{{item.mileage}}</td>
										<td width="40%">
											<span class="tooltip-test text-nowrap-300" data-toggle="tooltip"
												  :data-placement="index!=0?'left':'bottom'"
												  :title="'_车头状态_:'+item.carState+'; _厢体状态_:'+item.containerState+';  _电量值_(%):'+item.powerState+';  _太阳能_:'+item.solarPower">
											  _车头状态_:{{item.carState}};&nbsp;_厢体状态_:{{item.containerState}};&nbsp;_电量值_(%):{{item.powerState}};&nbsp;_太阳能_:{{item.solarPower}};
											</span>
										</td>
										<td width="20%" align="left">
											<span class="text-nowrap-300" data-toggle="tooltip" :data-placement="index!=0?'left':'bottom'" :title="item.address">{{item.address}}</span>
										</td>
									</tr>
								</tbody>
								<!--电子锁-->
								<tbody v-if="systemID==2">
									<tr @click="showPointText(item.index-1)" class="cursor-pointer"
										v-for="(item,index) in getStartIndexData"
										:class="{'list-active':item.active,'':item.active}">
										<td width="5%">{{item.index}}</td>
										<td width="15%">{{item.time}}</td>
										<td width="10%">
											<i class="img-icon" :class="{'green-light':item.locationType,'red-light':!item.locationType}" :title="item.locationType?'_定位_':'_不定位_'"></i>
										</td>
										<td width="10%">
											<el-popover placement="top-start"
														width="460"
														offset="350"
														popper-class="popover-box"
														trigger="hover"
														:disabled="item.attitude==0">
												<i slot="reference" class="img-icon lock-state" :class="{'normal-lock':!item.lockStatus&&item.attitude<=1,
													'abnormal-lock':!item.lockStatus&&item.attitude>1,
													'normal-unlock':item.lockStatus&&item.attitude<=1,
													'abnormal-unlock':item.lockStatus&&item.attitude>1}"></i>

												<div class="text-center">
													<img v-if="item.attitude!=0" :src="'/static/img/pose/pose'+item.attitude+'.png'">
												</div>
											</el-popover>
										</td>
										<td width="10%">
											<span v-show="item.lockRopeState" class="text-green">_正常_</span>
											<span v-show="!item.lockRopeState" class="text-red">_异常_</span>
										</td>
										<td width="10%">{{item.speed}}</td>
										<td width="10%">{{item.mileage}}</td>
										<td width="30%" align="left">
											<span class="text-nowrap-300" data-toggle="tooltip" :data-placement="index!=0?'left':'bottom'" :title="item.address">{{item.address}}</span>
										</td>
									</tr>
								</tbody>
								<!--冷链-->
								<tbody v-if="systemID==3">
									<tr @click="showPointText(item.index-1)" class="cursor-pointer"
									v-for="(item,index) in getStartIndexData"
									:class="{'list-active':item.active,'':item.active}">
									<td width="5%">{{item.index}}</td>
									<td width="15%">{{item.time}}</td>
									<td width="5%">
										<i class="img-icon" :class="{'green-light':item.locationType,'red-light':!item.locationType}" :title="item.locationType?'_定位_':'_不定位_'"></i>
									</td>
									<td width="5%">{{item.speed}}</td>
									<td width="10%">{{item.mileage}}</td>
									<td width="10%" :class="{'text-red':item.powerState<=LowPowerThreshold}">{{item.powerState}}</td>
									<td width="30%" align="left">
										<el-popover placement="top-start"
													width="460"
													offset="60"
													popper-class="popover-box"
													trigger="hover">
											<p slot="reference" class="humiture-row">&nbsp;&nbsp;
												<span slot="reference">
													<i class="tire">{{item.number}}</i>
													<span class="humitureTxt">{{item.temperature}}&nbsp;℃</span>
												</span>
											</p>
											<div>
												<table class="popover-table" width="100%">
													<thead>
														<tr>
															<th width="10%">_序号_</th>
															<th width="20%">_温度_(℃)</th>
															<th width="20%">_湿度_(%)</th>
															<th width="20%">_电量_(%)</th>
															<th width="30%">ID</th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td align="center">{{item.number}}</td>
															<td align="center">{{item.temperature}}</td>
															<td align="center">{{item.humidity}}</td>
															<td align="center">{{item.sensorBattery}}</td>
															<td align="center">{{item.ID}}</td>
														</tr>
													</tbody>

												</table>
												<div class="popover-img img-tem"></div>
											</div>
										</el-popover>
									</td>
									<td width="20%" align="left">
										<span class="text-nowrap-300" data-toggle="tooltip" :data-placement="index!=0?'left':'bottom'" :title="item.address">{{item.address}}</span>
									</td>
								</tr>
								</tbody>
								<!--车队-->
								<tbody v-if="systemID==4">
									<tr @click="showPointText(item.index-1)" class="cursor-pointer"
										v-for="(item,index) in getStartIndexData"
										:class="{'list-active':item.active,'':item.active}">
										<td width="5%">{{item.index}}</td>
										<td width="15%">{{item.time}}</td>
										<td width="10%">
											<i class="img-icon" :class="{'green-light':item.locationType,'red-light':!item.locationType}" :title="item.locationType?'_定位_':'_不定位_'"></i>
										</td>
										<td width="10%">{{item.speed}}</td>
										<td width="10%">{{item.mileage}}</td>
										<td width="10%" :class="{'text-red':item.powerState<=LowPowerThreshold}">{{item.powerState}}</td>
										<td width="20%" :align="item.fuelValue.length==0?'center':'left'">
											<span v-show="item.fuelValue.length==0">--</span>
											<span v-for="obj in item.fuelValue">
												&nbsp;&nbsp;<i class="tire">{{obj.number}}&nbsp;&nbsp;</i>{{obj.value}}&nbsp;L
											</span>
										</td>
										<td width="20%" align="left">
											<span class="text-nowrap-300" data-toggle="tooltip" :data-placement="index!=0?'left':'bottom'" :title="item.address">{{item.address}}</span>
										</td>
									</tr>
								</tbody>
							</table>
							<!--  运行段  运行段  运行段 胎压报警  开关锁 异常报表-->
							<table  v-show="IsActive.pointType!=0 && IsActive.pointType!=5 && IsActive.pointType!=6" class="table table-striped table-bordered table-hover" >
 								<!--通用   运行段-->
								<tbody v-show="IsActive.pointType==1" v-if="systemID!=2">
								<tr @click="mapShowRunPath(index)" class="cursor-pointer"
									v-for="(item,index) in carRunArr.runData"
									:class="{'list-active':item.active,'':item.active}">
									<td width="5%">{{index+1}}</td>
									<td width="15%">{{item.startTime}}</td>
									<td width="15%">{{item.endTime}}</td>
									<td width="20%" align="left">
										<span class="text-nowrap-300">{{item.startAddress}}</span>
									</td>
									<td width="20%" align="left">
										<span class="text-nowrap-300">{{item.endAddress}}</span>
									</td>
									<td width="15%">{{item.timeValue}}</td>
									<td width="10%">{{item.mileage}}km</td>
								</tr>
								</tbody>
								<!--电子锁 趟次报表-->
								<tbody v-show="IsActive.pointType==1" v-if="systemID==2">
									<tr @click="mapShowRunPath(index)" class="cursor-pointer"
										v-for="(item,index) in carRunArr.runData"
										:class="{'list-active':item.active,'':item.active}">
										<td width="5%">{{index+1}}</td>
										<td width="15%">{{item.startTime}}</td>
										<td width="15%" align="left">
											<span class="text-nowrap-300">{{item.startAddress}}</span>
										</td>
										<td width="10%">{{item.unlockType}}</td>
										<td width="15%">{{item.endTime}}</td>
										<td width="15%" align="left">
											<span class="text-nowrap-300">{{item.endAddress}}</span>
										</td>
										<td width="15%">{{item.timeValue}}</td>
										<td width="20%">{{item.mileage}}km</td>
									</tr>
								</tbody>
								<!--通用   停车点-->
								<tbody v-show="IsActive.pointType==2">
							 		<tr @click="showStopPoint(index)" class="cursor-pointer"
									v-for="(item,index) in carStopPointArr.filterData"
									:class="{'list-active':item.active,'':item.active}">
									<td width="5%">{{index+1}}</td>
									<td width="15%">{{item.startTime}}</td>
									<td width="15%">{{item.endTime}}</td>
									<td width="15%">{{item.stopTime}}</td>
									<td width="30%">
											<span class="tooltip-test text-nowrap-300" data-toggle="tooltip"
												  :data-placement="index!=0?'left':'bottom'"
												  :title="'_车头状态_:'+item.carState+'; _厢体状态_:'+item.containerState+';  _电量值_(%):'+item.powerState+';  _太阳能_:'+item.solarPower">
											  _车头状态_:{{item.carState}};&nbsp;_厢体状态_:{{item.containerState}};&nbsp;_电量值_(%):{{item.powerState}};&nbsp;_太阳能_:{{item.solarPower}};
											</span>
									</td>
									<td width="20%" align="left">
										<span class="text-nowrap-300">{{item.address}}</span>
									</td>
								</tr>
								</tbody>
								<!--胎压报警-->
								<tbody v-show="IsActive.pointType==3" v-if="systemID==1">
									<tr @click="highlightShowTyre(index)" class="tire-alarm"
										v-for="(item,index) in tyreArr.data"
										:class="{'list-active':item.active,'':item.active}">
										<td width="5%">{{index+1}}</td>
										<td width="15%">
											{{item.startTime}}</br>
											{{item.endTime}}
										</td>
										<td width="15%" class="text-left">{{item.startAddress}}</td>
										<td width="15%" class="text-left">{{item.endAddress}}</td>
										<td width="10%">{{item.timeValue}}/{{item.mileage}}km</td>
										<td width="40%" class="text-left">
											<p class="tyre-state" v-for="t in item.tyre">&nbsp;&nbsp;
												<span class="square-number">{{t.tyreN}}</span>&nbsp;&nbsp;
												<span>{{t.tyreS}}</span>&nbsp;&nbsp;
												<span>{{t.tyreP}}&nbsp;bar</span>&nbsp;&nbsp;
												<span>{{t.tyreT}}&nbsp;°C</span>
											</p>
										</td>
									</tr>
								</tbody>
								<!--开关锁-->
								<tbody v-show="IsActive.pointType==3" v-if="systemID==2">
								<tr @click="showStopPoint(index)" class="cursor-pointer"
									v-for="(item,index) in carStopPointArr.filterData"
									:class="{'list-active':item.active,'':item.active}">
									<td width="5%">{{index+1}}</td>
									<td width="15%">{{item.startTime}}</td>
									<td width="20%">
										<span class="text-nowrap-300">{{item.address}}</span>
									</td>
									<td width="60%">{{item.startTime}}</td>
								</tr>
								</tbody>
								<!--异常报表-->
								<tbody v-show="IsActive.pointType==4" v-if="systemID==2">
									<tr @click="showStopPoint(index)" class="cursor-pointer"
										v-for="(item,index) in carStopPointArr.filterData"
										:class="{'list-active':item.active,'':item.active}">
										<td width="5%">{{index+1}}</td>
										<td width="15%">{{item.startTime}}</td>
										<td width="20%">
											<span class="text-nowrap-300">{{item.address}}</span>
										</td>
										<td width="60%">{{item.startTime}}</td>
									</tr>
								</tbody>
							</table>
							<!--温度曲线部分-->
							<div v-if="systemID==3 || systemID==4" v-show="IsActive.pointType==5" class="lineChart" id="lineChart"></div>
							<!--油耗曲线部分-->
							<div v-if="systemID==4" v-show="IsActive.pointType==6" class="lineChart" id="chartCollect"></div>
						</div>
					</div>

				</div>

			</div>
		</div>
	</div>
</template>
<script>
	import HighChart from 'highcharts/highstock'
	import baiduMap from "components/Common/baidu_map.vue"
	import carTree from "components/Common/tree.vue"
	require("plugins/flatpickr/flatpickr.js")
	require("!style!css!plugins/flatpickr/flatpickr.min.css")
	let _this = null
	export default{
		data(){
			_this = this
			return {
				systemID: null,
				subMenu: [
					{active: true},
					{active: false},
					{active: false}
				],
				IsActive: {
					isFullScreen: false,//地图全屏开关
					pointType: 0 //下部菜单显示车辆类型
				},
				isShowSelectCarList: true,//右侧车辆搜索栏开关
				//初始化显示工具栏
				mapToolShow: true,

				LowPowerThreshold:this.$store.state.LowPowerThreshold , //低电量阈值  单位%
				//轨迹点的数据
				carPointArr: [],

				//运行段数组
				carRunArr: {
					runData: [],
					//运行段起始点和终点索引值数组
					startTimeIndex: [],
					endTimeIndex: [],
					//总运行时间
					allRunTime: 0,
					//总运行里程
					allMileage: 0
				},
				//停车点数组
				carStopPointArr: {
					//停车点数据
					stopData: [],
					//停车结束点对应停车轨迹点索引
					stopIndex: [],
					//过滤数据
					filterData: [],
					//过滤数据
					filterIndex: [],
					//停车时长选择
					choiceTime: 3
				},
				//胎压数据
				tyreArr: {
					data: [],
					startTimeIndex: [],
					endTimeIndex: []
				},
				lockArr: {
					data: [],
					startTimeIndex: [],
					endTimeIndex: []
				},

				//点轨迹开始索引值
				startIndex: 0,
				endIndex: 35,
				//滚动加载点index数组
				scrollNum: [],//轨迹点地址逆编译完成index数组
				showNum:35, //轨迹点表格显示个数
				//间距
				interval: 0,
				//树形图数据
				treeData: [],
				//树形图选项
				options: {
					showCheckbox: false, //是否支持多选
					halfCheckedStatus: false,//控制父框是否需要半钩状态
					search: {
						useInitial: true, //是否支持首字母搜索
						useEnglish: true, //是否是英文搜索
						customFilter: null // 自定义节点过滤函数
					}
				},
				//选择的车辆数据
				choiceCarData: {
					name: "",
					id: null,
					time:[],
					startTime:null,
					endTime:null
				},
				//电子锁
				lockData: [],
				filterText: '',

				//折线图参数
				lineOption:{
					chart:{
						type: 'spline',
						zoomType: 'x',
						resetZoomButton:{
							position: {
								align: "right",
								verticalAlign: "top",
								x: 0,
								y: 10,
							}
						}
					},
					plotOptions: {
						spline: {
							marker: {
								enabled: false
							},
							connectNulls: true
						}
					},
					scrollbar: {
						enabled:true,
						barBackgroundColor:"#2885eb",
						liveRedraw:false,
						showFull:false
					},

					title: {
						text: '_温度曲线_',
						floating:true,
						align:"left",

					},
					xAxis: {
						type: 'String',
						lable:''
					},
					yAxis: {
						title: {
							text: '_温度_ (℃)',
							align:"low",
							y:0,
							x:-40,
							rotation:0
						},
						lineColor: "#d7d7d7",
						lineWidth: 1
					},
					tooltip: {
						valueSuffix: '℃'
					},
					credits: {
						enabled: false
					},
					legend: {
						align: 'left',
						verticalAlign: 'top',
						layout: 'vertical',
						symbolHeight: 0,
						symbolWidth: 20,
						borderWidth: 0,
						y:15
					},
					series:''
				},
				//
				oilOption:{
					chart: {
						zoomType: 'xy',
						panning: true,
						panKey: 'ctrl',
						marginTop: 50,
						marginBottom:50,
					},
					title: {
						text: ''
					},
					subtitle: {
						text: ''
					},
					xAxis: {
						//type: 'category',
						//X轴数据
						categories: [],
						//tickInterval:6,
						labels: {
							rotation: 0, //字体倾斜
							align: 'center',
							formatter: function () {
								//console.log(categoriesList);
								//console.log(this.value);

								//var needData = this.value.slice(-8);
								if((this.value).toString().length>8){
									return this.value.slice(-8);
								}else {
									return this.value;
								}

							}
						},

						//X轴显示文字
						title: {
							text: "_时间_"
						},
						tickInterval: 150,
						tickPixelInterval: 100

					},
					yAxis: [
						{ // Primary yAxis
						labels: {
							format: '{value} L',
							/*style: {
							 color: Highcharts.getOptions().colors[2]
							 }*/
						},
						title: {
							text: '_油位_',
							style: {
								color: "#f83939"
							}
						},
						tickAmount: 7,
						tickInterval:50,

						opposite: true
						},
						{ // Secondary yAxis
						gridLineWidth: 0,
						title: {
							text: '_速度_',
							style: {
								color: "#00ff24"
							}
						},
						labels: {
							format: '{value} km/h',
							/*style: {
							 color: Highcharts.getOptions().colors[0]
							 }*/
						},
						tickAmount: 5,
						tickInterval:50,
					}, { // Tertiary yAxis
						gridLineWidth: 0,
						title: {
							text: '_里程_',
							style: {
								color: "#009dff"
							}
						},
						labels: {
							format: '{value} km',
							/*style: {
							 color: Highcharts.getOptions().colors[1]
							 }*/
						},
						//tickInterval:20000,
						opposite: true
					}],
					tooltip: {
						borderColor: 'black',
						shared: true,
						crosshairs: [{            // 设置准星线样式
							width: 1,
							color: '#d8e63c'
						}],
					},
					plotOptions: {
						spline: {
							marker: {
								enabled: false
							},
							dataLabels: {
								enabled: false
							},

							enableMouseTracking: true //是否显示title
						},
						series: {
							marker: {
								enabled: false
							}
						},
					},
					//导航器
					navigator: {
						enabled: true,//打开导航
						height:100,
						margin: 60,
						xAxis: {
							categories: [],
							labels: {
								rotation: 0, //字体倾斜
								align: 'center',
								formatter: function () {
									if((this.value).toString().length>8){
										return this.value.slice(-8);
									}else {
										return this.value;
									}

								}
							},
							tickInterval: 150,
						},
						series: {
							data: [],
							lineWidth: 1,
							color: '#f83939',
						}


					},
					rangeSelector: {
						buttons: [{
							type: 'all',
							text: 'All'
						}],
						selected: 150
					},
					legend: {
						/*layout: 'vertical',
						 align: 'left',
						 x: 80,
						 verticalAlign: 'top',
						 y: 55,
						 floating: true,*/
						/*backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'*/
					},
					series: [
						{
							name: '_速度_',
							type: 'spline',
							yAxis: 1,
							lineWidth: 1,
							data: [],
							showInNavigator: true,
							color: "#00ff24",
							tooltip: {
								valueSuffix: ' km/h'
							}
						},
						{
							name: '_里程_',
							type: 'spline',
							yAxis: 2,
							lineWidth: 1,
							color: "#009dff",
							data: [],
							showInNavigator: true,
							marker: {
								enabled: false
							},
							//dashStyle: 'shortdot',
							tooltip: {
								valueSuffix: ' km'
							}
						}, {
							name: '_油位_',
							type: 'spline',
							data: [],
							lineWidth: 1,
							showInNavigator: true,
							color: "#f83939",
							tooltip: {
								valueSuffix: ' L'
							}
						}],
					credits: {
						enabled: false
					}
				},
			}
		},
		activated: function () {
			if (this.$route.params.ID != undefined && this.$route.params.name != undefined) {
				this.choiceCarData.name = this.$route.params.name;
				this.choiceCarData.id = this.$route.params.ID;
			}
		},
		props: {
			screenHeight: Number
		},
		components: {
			baiduMap: baiduMap,
			carTree: carTree
		},
		mounted(){
			this.systemID = this.$store.state.choiceSystemID;

			setTimeout(function(){
				_this.adjustPage();
				_this.$refs.map.initMap();
			}, 100);


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
			;
			//延迟加载解析地址函数  监听滚动事件
			document.getElementById("table-wrap").addEventListener('scroll', function () {

				//nScrollHight = this.scrollHeight,
				//nDivHight = this.offsetHeight,
				if(_this.IsActive.pointType==0){
					let	nScrollTop = this.scrollTop,              //滚动条高度
						maxIndex=_this.carPointArr.length-1,        //表格总个数
						trHight = $(this).find("tr").height(),    //内部单个tr的高度
						n = parseInt(nScrollTop / trHight);      //滚动高度计算出已经显示的tr个数

					let bottomHeight=maxIndex*trHight-nScrollTop-this.offsetHeight;
					if(bottomHeight<0) bottomHeight=0;
					$('#table-inner').css('margin-top',nScrollTop);
					$('#table-inner').css('margin-bottom',bottomHeight);

					_this.startIndex= n;
					//console.log("显示第一个点",n)

					if(n + _this.showNum>=maxIndex) {
						_this.endIndex=maxIndex;
						$('#table-inner').css('margin-bottom',"15px");
					}else {
						_this.endIndex= n + _this.showNum;
					}

					for (let m = _this.startIndex; m <= _this.endIndex; m++) {
						if (m == maxIndex+1) return;
						if (_this.scrollNum.indexOf(m) === -1) {
							_this.scrollNum.push(m);
							//console.log(m)
							_this.geocoder(_this.$store.state.mapType, _this.carPointArr[m].point, _this.carPointArr[m], 'address')

						}
					};

				}

			})

			//加载树形图
			this.loadTreeData();
			//时间控件
			//格局化日期：yyyy-MM-dd
			function formatDate(day) {
				var date = new Date();
				var millSeconds = Math.abs(date) + (-day * 24 * 60 * 60 * 1000);
				var rDate = new Date(millSeconds);
				var myyear = rDate.getFullYear();
				var mymonth = rDate.getMonth() + 1;
				var myweekday = rDate.getDate();
				if (mymonth < 10) {
					mymonth = "0" + mymonth;
				}
				if (myweekday < 10) {
					myweekday = "0" + myweekday;
				}
				return (myyear + "-" + mymonth + "-" + myweekday);
			};
			//日期插件初始化
			$("#car-start-time,#car-end-time").flatpickr({
				enableTime: true,
				enableSeconds: true,
				time_24hr: true,
				minuteIncrement: 1,
				allowInput: true,
				defaultDate: "today",
			});
			$("#car-end-time").flatpickr({
				enableTime: true,
				enableSeconds: true,
				time_24hr: true,
				minuteIncrement: 1,
				allowInput: true,
				defaultDate: formatDate(0) + " 23:59:59"
			});
			$("#today").click(function () {
				$("#car-start-time").val(formatDate(0) + " 00:00:00");
				$("#car-end-time").val(formatDate(0) + " 23:59:59");
				_this.getCarData()
			});

			$("#yesterday").click(function () {
				$("#car-start-time").val(formatDate(1) + " 00:00:00");
				$("#car-end-time").val(formatDate(1) + " 23:59:59");
				_this.getCarData()
			});

			$("#threeday").click(function () {
				$("#car-start-time").val(formatDate(2) + " 00:00:00");
				$("#car-end-time").val(formatDate(0) + " 23:59:59");
				_this.getCarData()
			});
      let oldValue=_this.$store.state.mapLocksData;
      setInterval(function () {
        if(_this.$store.state.mapLocksData!=oldValue){
          console.log(_this.$store.state.mapLocksData)
          _this.lockData=_this.$store.state.mapLocksData;
          oldValue=_this.$store.state.mapLocksData;
        }
      },1000)
		},
    	//updated(){
    	//},
		methods: {
			//计算时间差
			getSecondValue(startTime, endTime){
				let stratVal = this.GetDateSeconds(startTime),
					endVal = this.GetDateSeconds(endTime);
				return endVal - stratVal;
			},
			//动态调整页面布局
			adjustPage(){
				this.elementsFlex("map-wrapper", "map-template", "map-tool", "contentList");
				this.elementsFlex("select-car", "map-template", "map-tool", "contentList");
				setTimeout(function () {
					let h = _this.elementsFlex("tree-body", "select-car", "tree-header", "tree-footer", true);
					_this.setScroll("tree-body", h);
					let tableHeight=$('#table-wrap').height();
					let trHight = $('#table-wrap').find("tr").height();
					let n=Math.floor(tableHeight/trHight);
					console.log(n)
					//console.log("显示个数",n)
					if(trHight==NaN || n==Infinity){
						_this.showNum=25;
					}else {
						_this.showNum=n;
					}
					//绘制温度曲线
					if(_this.systemID==4 && _this.carPointArr.length!=0 && _this.IsActive.pointType==5) HighChart.chart('lineChart',_this.lineOption);
					if(_this.systemID==4 && _this.carPointArr.length!=0 && _this.IsActive.pointType==6) HighChart.chart("chartCollect",_this.oilOption);
					//console.log(n);
				}, 250)

			},
			//最小化下部菜单
			closeSubMenu(){
				this.changeActive(this.subMenu, 0);
				$("#map-tool").show();
				$("#contentList").height("35px");
				$("#contentList").css("overflow", "hidden");
				setTimeout(function(){
					_this.adjustPage()
				},200)
			},
			//展开下部菜单
			openSubMenu(){
				this.changeActive(this.subMenu, 2);
				$("#contentList").css("overflow", "visible")
				$("#map-tool").show();
				$("#contentList").height("220px");
				this.setScroll("table-wrap", 155)
				setTimeout(function(){
					_this.adjustPage()
				},200)
			},
			//下部菜单全屏
			fullSubMenu(){
				this.changeActive(this.subMenu, 1);
				$("#contentList").css("overflow", "visible");
				$("#map-tool").hide();
				this.elementsFlex("contentList", "map-template");
				let height = this.elementsFlex("table-wrap", "contentList", "contentList-header", "table-header", true);
				this.setScroll("table-wrap", height - 40);
				setTimeout(function(){
					_this.adjustPage()
				},200)
			},
			//调整下边栏列表高度
			setSubMenuHeight(){

				$("#contentList").height("220px");
				this.setScroll("table-wrap", 155)
				this.adjustPage()
			},

			//全屏
			changefullScreen(meg){
				this.IsActive.isFullScreen = meg;
				this.IsActive.menuFull = false;
				$("#contentList").height("35px");
				$("#contentList").css("overflow", "hidden");
				this.setScroll("table-wrap", 155)

				setTimeout(function () {
					_this.adjustPage()
				}, 100)
			},
			//切换显示轨迹点
			showAllPoints(){
				this.IsActive.pointType=0;
				$('#table-inner').css('margin-top',"0px");
			},
			//切换显示温度曲线
			showTemperature(){
				this.IsActive.pointType=5;
				this.fullSubMenu();
			},
			//切换显示油位曲线
			showOilLine(){
				this.IsActive.pointType=6;
				this.fullSubMenu();
			},

			/**
			 ******************************  右侧车辆列表功能   ************************************
			**
			**/
			//调取车辆信息
			loadTreeData(refresh) {

				if (this.$store.state.allCarsList != null && refresh != true) {
					setData()
				} else {
					_this.$store.commit('getAllCarsData', setData)

				}
				function setData() {
					if (_this.$store.state.allCarsList.length == 0) {
						_this.$refs.map.showError("_暂无车辆数据_");
					}
					_this.allCarsArr = _this.$store.state.allCarsList;
					_this.treeData = _this.deepCopy(_this.$store.state.allCarsData);

				}

			},
			//展开车辆选择列表
			showCarList(){
				this.isShowSelectCarList = !this.isShowSelectCarList;
			},
			//得到选择车辆的数据(非电子锁系统  树形菜单选择)
			getChoiceCarData(node){
				if (node.id.indexOf("@A") === -1 && node.id.indexOf("@B") === -1 && node.id.indexOf("@C") === -1) {
					this.choiceCarData.name = node.label;
					this.choiceCarData.id = node.id;
				}
			},
			//得到选择车辆的数据(电子锁系统  树形菜单选择)
			handleNodeClick(data){
				if (data.FAssetID.indexOf("@A") === -1) {
					this.choiceCarData.name = data.FVehicleName;
					this.choiceCarData.id = data.FAssetGUID;
				}
			},
			//修改间距数
			changeInterval(){
				this.$refs.map.overPlayPoint();
				this.$refs.map.showCarMileagePoint(this.interval);
			},


			/**
			* ******************    轨迹点      ***************************************
			*
			* **/

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


			//请求车辆数据
			getCarData(){
				Pace.restart();

				//车辆不能为空
				if (this.choiceCarData.id == null) {
					_this.$refs.map.showError("_请选择车辆_");
					return;
				}
				let startTime = $("#car-start-time").val(),
					endTime = $("#car-end-time").val();


				let startDayTime= _this.parseUTC(startTime);
				let endDayTime = _this.parseUTC(endTime);

				_this.choiceCarData.startTime= _this.parseUTC(startTime);
				_this.choiceCarData.endTime=_this.parseUTC(endTime);


				let FTableDate = moment(endDayTime).format("YYYYMMDD"),
					startSeconds = _this.GetDateSeconds(startTime.replace(/-/ig, "/")),
					endSeconds = _this.GetDateSeconds(endTime.replace(/-/ig, "/"));
				if (endSeconds > startSeconds) {
					if ((endSeconds - startSeconds) > 86400 * 3) {
						_this.$refs.map.showError("_单次只能查询三天内数据_，_请重选起始时间_!");
						return;
					}
				} else {
					_this.$refs.map.showError("_结束时间需要大于开始时间_，_请重选起始时间_!");
					return;
				}

				// 获取间隔天数
				function getDays(day1, day2) {
					// 获取入参字符串形式日期的Date型日期
					var st = day1.getDate();
					var et = day2.getDate();

					// 定义返回的数组
					var retArr = [];

					// 循环，启动日期不等于结束日期时，进行循环
					while (st.getTime() != et.getTime()) {

						// 将启动日期的字符串形式的日期存放进数组
						retArr.push(st.getYMD());

						// 取得开始日期的天
						var tempDate = st.getDate();

						// 将开始日期st指向构造出的新的日期
						// 新的日期较之前的日期多加一天
						st = new Date(st.getFullYear(), st.getMonth(), st.getDate() + 1);
					}

					// 将结束日期的天放进数组
					retArr.push(et.getYMD());

					return retArr // 或可换为return ret;
				}
				// 给Date对象添加getYMD方法，获取字符串形式的年月日
				Date.prototype.getYMD = function(){
					let retDate = this.getFullYear() + "-";  // 获取年份。
					if(this.getMonth() + 1<10){
						retDate +='0'+ (this.getMonth() + 1) + "-";    // 获取月份。
					}else {
						retDate +=this.getMonth() + 1 + "-";    // 获取月份。
					}

					if(this.getDate()<10){
						retDate +='0'+ this.getDate();    // 获取日。
					}else {
						retDate +=this.getDate();    // 获取日。
					}
					return retDate;                          // 返回日期。
				}
				// 给String对象添加getDate方法，使字符串形式的日期返回为Date型的日期
				String.prototype.getDate = function(){
					var strArr = this.split('-');
					var date = new Date(strArr[0], strArr[1] - 1, strArr[2]);
					return date;
				};

				let startDay=startDayTime.split(" ")[0];
				let startT=startDayTime.split(" ")[1];
				let endDay=endDayTime.split(" ")[0];
				let endT=endDayTime.split(" ")[1];

				let days=getDays(startDay,endDay);

				_this.choiceCarData.time=[];
				if(days.length==1){
					_this.choiceCarData.time.push({
						start:days[0]+" "+startT,
						end:days[0]+" "+endT
					});
				}else{
					for (var k = 0; k < days.length; k++) {
						let item = days[k];
						let obj;
						if(k==0){
							obj={
								start:item+" "+startT,
								end:item+" 23:59:59"
							}
						}else if(k==days.length-1){
							obj={
								start:item+" 00:00:00",
								end:item+" "+endT
							}
						}else {
							obj={
								start:item+" 00:00:00",
								end:item+" 23:59:59"
							}
						}
						_this.choiceCarData.time.push(obj);

					}

				}
				console.log("choiceCarData.time",_this.choiceCarData.time);
				//初始化数据
				_this.carPointArr = [];//车辆轨迹点
				_this.scrollNum = []
				_this.carRunArr.runData = [];//车辆运行数据
				_this.carRunArr.startTimeIndex = [];
				_this.carRunArr.endTimeIndex = [];
				_this.carRunArr.allRunTime = 0;
				_this.carRunArr.allMileage = 0;

				_this.carStopPointArr.stopData = [];//车辆停止数据
				_this.carStopPointArr.stopIndex = [];
				_this.carStopPointArr.filterData = [];
				_this.carStopPointArr.filterIndex = [];

				_this.tyreArr.data = [];//胎压报警段
				_this.tyreArr.startTimeIndex = [];//胎压报警段
				_this.tyreArr.endTimeIndex = [];//胎压报警段

				_this.startIndex = 0;
				_this.endIndex = 10;

				_this.$refs.map.deleteAllStop();

				let initData=[],
					info={},
					temperatureData=[],
					Tobj=info,
				    order=[], //记录设备id顺序
				    timeArr=[];

				//请求数据轨迹点数据
				function getAllPoints(start,end,callback){
					let url;
					let action;
					let GUID;

					switch (_this.systemID){
					    case 1:
							url = '/web/Common/Common_LBS';
							action='QueryLBSTrackListByFVehicleGUID';
							GUID='FVehicleGUID'
					        break;
					    case 2:
							url = '/web/Lock/Lock_LBS';
							action='QueryLBSTrackListByFAssetGUID';
							GUID='FAssetGUID'
					        break;
						case 3:
							url = '/web/ColdChain/ColdChain_LBS';
							action='QueryLBSTrackExTemperatureListByFVehicleGUID';
							GUID='FVehicleGUID'
							break;
						case 4:
							url = '/web/FleetManager/FleetManager_LBS';
							action='QueryFuelTrackDataByFVehicleGUID';
							GUID='FVehicleGUID'
							break;
					}


					let postData={
						FTokenID: _this.$store.state.FTokenID,
						FAction: action,
						[GUID]: _this.choiceCarData.id,
						FStartTime:start,
						FEndTime:end,
						FTableDate: end.replace(/-/g,'').split(" ")[0],
						FVersion: "1.0.0"
					};
					$.ajax({
						"url": url,
						"cache": false,
						"async": false, //同步方法
						"type": "post",
						"dataType": "json",
						"contentType": "application/json; charset=utf-8",
						"data":JSON.stringify(postData) ,
						success: function (res) {
							console.log("轨迹点", res);

							if (res.Result == 104) {
								_this.$refs.map.showError("登录超时，5秒后返回登录页面");
								setTimeout(function () {
									_this.$store.commit("goLogin");
								}, 5000)
							};
							if (res.Result == 200) {
								let Arr;
								switch (_this.systemID){
								    case 1:
										initData= initData.concat(res.FObject);
								        break;
								    case 2:
										initData= initData.concat(res.FObject);
								        break;
									case 3:
										info=res.FObject.Table[0],
										initData= initData.concat(res.FObject.Table1);
										break;
									case 4:
										initData= initData.concat(JSON.hunpack(eval(res.FObject),4));
										break;
								}
							};
							callback();


						}
					})

				};

				let choiceTime=_this.choiceCarData.time;
				let num=0;
				for (var m = 0; m < choiceTime.length; m++) {
					let t = choiceTime[m];
					setTimeout(function(){
						getAllPoints(t.start, t.end,function(){
							num++;
							if(num==choiceTime.length){
								console.log("总的原始数据",initData);
								if (initData == 0) {
									_this.$refs.map.showError("暂无轨迹点数据");
									return
								} else {
									let points = [],
										pointData;
									switch (_this.systemID){
									    case 1:

											for (var i = 0; i < initData.length; i++) {
												let pointArr = initData[i];
												let time = _this.parseGMT(pointArr.FGPSDateTime);
												//轨迹点数据

												pointData = {
													index:i+1,
													time: time,
													speed: pointArr.FSpeed,
													mileage: pointArr.FMileage,
													direction: pointArr.FDirection,
													carState: pointArr.FCouplingStatus = 1 ? "_接挂_" : "_甩挂_",
													containerState: pointArr.FContainerStatus ? "_有厢_" : "_无厢_",
													solarPower: pointArr.FSolarCharge ? "_充电_" : "_未充电_",
													powerState: pointArr.FBatteryPercent>100 ? "_充电中_" :pointArr.FBatteryPercent,
													point: _this.parsePoint({
														lng: parseFloat(pointArr.FLongitude),
														lat: parseFloat(pointArr.FLatitude)
													}),
													address: "_定位中_",
													locationType:pointArr.FLocationType==0?false:true,
													active: false
												};

												if (pointArr.FLongitude == 0 && pointArr.FLatitude == 0) {

													if (initData[i - 1] && initData[i - 1].FLongitude != 0 && initData[i - 1].FLatitude != 0) {
														pointData.point = _this.parsePoint({
															lng: parseFloat(initData[i - 1].FLongitude),
															lat: parseFloat(initData[i - 1].FLatitude)
														})
														_this.carPointArr.push(pointData);
														points.push(pointData.point);
													}
													else if (initData[i + 1] && initData[i + 1].FLongitude != 0 && initData[i + 1].FLatitude != 0) {

														pointData.point = _this.parsePoint({
															lng: parseFloat(initData[i + 1].FLongitude),
															lat: parseFloat(initData[i + 1].FLatitude)
														})
														_this.carPointArr.push(pointData);
														points.push(pointData.point);
													}
												} else {
													_this.carPointArr.push(pointData);
													points.push(pointData.point);
												}

												//预先转译地址
												if (_this.carPointArr.length > 0 && i < _this.endIndex) {
													let n = i;
													_this.geocoder(_this.$store.state.mapType, _this.carPointArr[n].point, _this.carPointArr[n], 'address')
												}


											};
											if (_this.carPointArr.length > 0) {
												_this.$refs.map.showCarRoute(_this.carPointArr, points);
												_this.openSubMenu();
												setTimeout(function () {
													_this.$refs.map.showAllMap()
												}, 300);
											};
											break;
									    case 2:

											for (var i = 0; i < initData.length; i++) {
												let pointArr = initData[i];
												let time = _this.parseGMT(pointArr.FGPSDateTime);
												//轨迹点数据

												pointData = {
													index:i+1,
													time: time,
													speed: pointArr.FSpeed,
													mileage: pointArr.FMileage,
													direction: pointArr.FDirection,

													lockRopeState: pointArr.FLockRope,
													lockState: pointArr.FLockStatus,
													attitude:0,        //锁姿态  无姿态数据为null 数据格式 字符串 x轴，y轴，z轴
 													powerState: pointArr.FBatteryPercent>100 ? "_充电中_" :pointArr.FBatteryPercent,
													point: _this.parsePoint({
														lng: parseFloat(pointArr.FLongitude),
														lat: parseFloat(pointArr.FLatitude)
													}),
													address: "_定位中_",
													locationType:pointArr.FLocationType==0?false:true,
													active: false
												};
												if(pointArr.FAttitude!=null && pointArr.FAttitude!=''){
													pointData.attitude=_this.parseLockPose(pointArr.FAttitude);
												}
												if (pointArr.FLongitude == 0 && pointArr.FLatitude == 0) {

													if (initData[i - 1] && initData[i - 1].FLongitude != 0 && initData[i - 1].FLatitude != 0) {
														pointData.point = _this.parsePoint({
															lng: parseFloat(initData[i - 1].FLongitude),
															lat: parseFloat(initData[i - 1].FLatitude)
														})
														_this.carPointArr.push(pointData);
														points.push(pointData.point);
													}
													else if (initData[i + 1] && initData[i + 1].FLongitude != 0 && initData[i + 1].FLatitude != 0) {

														pointData.point = _this.parsePoint({
															lng: parseFloat(initData[i + 1].FLongitude),
															lat: parseFloat(initData[i + 1].FLatitude)
														})
														_this.carPointArr.push(pointData);
														points.push(pointData.point);
													}
												} else {
													_this.carPointArr.push(pointData);
													points.push(pointData.point);
												}

												//预先转译地址
												if (_this.carPointArr.length > 0 && i < _this.endIndex) {
													let n = i;

													_this.geocoder(_this.$store.state.mapType, _this.carPointArr[n].point, _this.carPointArr[n], 'address')

												}


											};
											if (_this.carPointArr.length > 0) {
												_this.$refs.map.showCarRoute(_this.carPointArr, points);
												_this.openSubMenu();
												setTimeout(function () {
													_this.$refs.map.showAllMap()
												}, 300);
											};
									        break;
										case 3:
											Tobj=info;
											order=[]; //记录设备id顺序
											timeArr=[];
											for (let i = 1; i <= 6; i++) {
												if(Tobj['FSensorID'+i]!=null){
													order.push(Tobj['FSensorID'+i])
												}
											}
											console.log(order);
											let newIndex=0; //新建计数器 记录过滤后数据的index


											for (let i = 0; i < initData.length; i++)  {
												var obj = initData[i];
												//过滤多余数据

												if(order.indexOf(obj.FSensorID1)!=-1) {
													newIndex++;
													//获取每个点的分钟 数组
													let timeItem=moment(_this.parseGMT(obj.FGPSDateTime)).format("YYYY-MM-DD HH:mm");
													if(timeArr.indexOf(timeItem)==-1) timeArr.push(timeItem);
													console.log(obj.FLongitude,obj.FLatitude)
													let oneData={
														time:_this.parseGMT(obj.FGPSDateTime),
														speed: obj.FSpeed,
														mileage: obj.FMileage,
														direction: obj.FDirection,
														powerState:obj.FBatteryPercent>100 ? "_充电中_" :obj.FBatteryPercent,
														point: _this.parsePoint({
															lng: parseFloat(obj.FLongitude),
															lat: parseFloat(obj.FLatitude)
														}),
														index:newIndex,
														chartIndex:timeArr.indexOf(timeItem),
														number:null,
														temperature:obj.FTemperature1,
														humidity:obj.FHumidity1,
														sensorBattery:obj.FSensorBattery1,
														ID:obj.FSensorID1,
														locationType:obj.FLocationType==0?false:true,
														active:false,
													};


													let alphaCode=null;
													for (let j = 0; j < order.length; j++) {
														let orderItem = order[j];
														if(orderItem==obj.FSensorID1){
															switch (j){
																case 0:
																	alphaCode="1";
																	break;
																case 1:
																	alphaCode="2";
																	break;
																case 2:
																	alphaCode="3";
																	break;
																case 3:
																	alphaCode="4";
																	break;
																case 4:
																	alphaCode="5";
																	break;
																case 5:
																	alphaCode="6";
																	break;

															};
															break
														}
													};
													oneData.number=alphaCode;
													//防止过滤坐标为0的点

													if (obj.FLongitude == 0 && obj.FLatitude == 0) {


														if (initData[i - 1] && initData[i - 1].fobj != 0 && initData[i - 1].FLatitude != 0) {
															oneData.point = _this.parsePoint({
																lng: parseFloat(initData[i - 1].FLongitude),
																lat: parseFloat(initData[i - 1].FLatitude)
															})
														}
														else if (initData[i + 1] && initData[i + 1].FLongitude != 0 && initData[i + 1].FLatitude != 0) {

															oneData.point = _this.parsePoint({
																lng: parseFloat(initData[i + 1].FLongitude),
																lat: parseFloat(initData[i + 1].FLatitude)
															})

														}
													}

													_this.carPointArr.push(oneData);
													points.push(oneData.point);
													if (_this.carPointArr.length > 0) {
														//预先转译地址
														if (newIndex-1 < _this.endIndex) {
															let n = newIndex-1;
															_this.geocoder(_this.$store.state.mapType, _this.carPointArr[n].point, _this.carPointArr[n], 'address')
														}
													}
												}
											}

											console.log(_this.carPointArr);
											if (_this.carPointArr.length > 0) {
												_this.$refs.map.showCarRoute(_this.carPointArr, points);

												_this.openSubMenu();
												setTimeout(function () {
													_this.$refs.map.showAllMap()
												}, 300);

											};
											let chartData=[];
											timeArr.map(function(item,index){
												let tableItem={
													//index:index+1,
													time:item,
													group:{
														1:[null,null,null,null],  //0 温度 1 湿度 2 电量 3 ID
														2:[null,null,null,null],
														3:[null,null,null,null],
														4:[null,null,null,null]
													},
													//speed:null,
													//mileage: null,
													//direction: null,
													//powerState:null,
													//point:null,
													//address: "_定位中_",
													//active: false
												}
												chartData.push(tableItem)
											})
											console.log("绘图数据",chartData);
											_this.carPointArr.map(function(item,index){

												chartData[item.chartIndex].group[item.number][0]=item.temperature;
												chartData[item.chartIndex].group[item.number][1]=item.humidity;
												chartData[item.chartIndex].group[item.number][2]=item.sensorBattery;
												chartData[item.chartIndex].group[item.number][3]=item.ID;
												//if(chartData[item.chartIndex].speed==null) chartData[item.chartIndex].speed=item.speed;
												//if(chartData[item.chartIndex].mileage==null) chartData[item.chartIndex].mileage=item.mileage;
												//if(chartData[item.chartIndex].direction==null) chartData[item.chartIndex].direction=item.direction;
												//if(chartData[item.chartIndex].powerState==null) chartData[item.chartIndex].powerState=item.powerState;
												//if(chartData[item.chartIndex].point==null) chartData[item.chartIndex].point=item.point;

											})
											let assetCount=order.length; //设备数量
											_this.lineOption.series=[]
											for (let j = 0; j < assetCount; j++) {

												_this.lineOption.series.push({
													name:'_传感器_'+(j+1),
													data:[]
												})
											}
											_this.lineOption.xAxis.categories=[];
											chartData.map(function(item,index){
												_this.lineOption.xAxis.categories.push(item.time.split(" ")[1]);
												let n=0;
												for (let key in item.group){
													let arr=[];
													arr.push(item.time);
													arr.push(item.group[key][0])
													_this.lineOption.series[n].data.push(arr);
													n++
												}
											})
											HighChart.chart('lineChart',_this.lineOption);
											break;
										case 4:
											Tobj=info;
											order=[];  //记录设备id顺序
											timeArr=[];
											for (let i = 1; i <= 6; i++) {
												if(Tobj['FSensorID'+i]!=null){
													order.push(Tobj['FSensorID'+i])
												}
											}
											console.log(order);
											for (var i = 0; i < initData.length; i++) {
												let pointArr = initData[i];
												let time = _this.parseGMT(pointArr.FGPSDateTime);

												//获取每个点的分钟 数组
												let timeItem=moment(time).format("YYYY-MM-DD HH:mm");
												if(timeArr.indexOf(timeItem)==-1) timeArr.push(timeItem);
												//轨迹点数据
												pointData = {
													index:i+1,
													time: time,
													speed: pointArr.FSpeed,
													mileage: pointArr.FMileage,
													direction: pointArr.FDirection,
													powerState: pointArr.FBatteryPercent>100 ? "_充电中_" :pointArr.FBatteryPercent,
													point: _this.parsePoint({
														lng: parseFloat(pointArr.FLongitude),
														lat: parseFloat(pointArr.FLatitude)
													}),
													fuelValue:[],
													address: "_定位中_",
													locationType:pointArr.FLocationType==0?false:true,
													active: false,
													chartIndex:timeArr.indexOf(timeItem),
												};

												//计算油量
												if (_this.systemID == 4) {
													let fuelValue = pointData.fuelValue;
													for (let j = 1; j < 4; j++) {
														if(pointArr['FFuelValue' + j]!=-1){
															let item = {
																number: j,
																value:pointArr['FFuelValue' + j]
															}
															fuelValue.push(item)
														}
													}
												}
												_this.oilOption.xAxis.categories.push(pointData.time);
												_this.oilOption.navigator.xAxis.categories.push(pointData.time);
												_this.oilOption.series[0].data.push(pointData.speed);
												_this.oilOption.series[1].data.push(pointData.mileage);
												_this.oilOption.series[2].data.push(Number(pointData.fuelValue[0].value));
												_this.oilOption.navigator.series.data.push(Number(pointData.fuelValue[0].value));


												//避免坐标为零的点
												if (pointArr.FLongitude == 0 && pointArr.FLatitude == 0) {

													if (initData[i - 1] && initData[i - 1].FLongitude != 0 && initData[i - 1].FLatitude != 0) {
														pointData.point = _this.parsePoint({
															lng: parseFloat(initData[i - 1].FLongitude),
															lat: parseFloat(initData[i - 1].FLatitude)
														})
														_this.carPointArr.push(pointData);
														points.push(pointData.point);
													}
													else if (initData[i + 1] && initData[i + 1].FLongitude != 0 && initData[i + 1].FLatitude != 0) {

														pointData.point = _this.parsePoint({
															lng: parseFloat(initData[i + 1].FLongitude),
															lat: parseFloat(initData[i + 1].FLatitude)
														})
														_this.carPointArr.push(pointData);
														points.push(pointData.point);
													}
												} else {
													_this.carPointArr.push(pointData);
													points.push(pointData.point);
												}

												//预先转译地址
												if (_this.carPointArr.length > 0 && i < _this.endIndex) {
													let n = i;
													_this.geocoder(_this.$store.state.mapType, _this.carPointArr[n].point, _this.carPointArr[n], 'address')
												}

											};

											//绘制地图线路 并显示油量曲线
											if (_this.carPointArr.length > 0) {
												_this.$refs.map.showCarRoute(_this.carPointArr, points);

												_this.oilOption.navigator.xAxis.tickInterval=parseInt((initData.length)/14);
												_this.oilOption.xAxis.tickInterval=parseInt((initData.length)/18);
												HighChart.chart("chartCollect",_this.oilOption);

												_this.openSubMenu();
												setTimeout(function () {
													_this.$refs.map.showAllMap()
												}, 300);
											};



											/*//解析温度数据 并绘制曲线
											let chartData4=[];
											timeArr.map(function(item,index){
												let tableItem={
													//index:index+1,
													time:item,
													group:{
														1:[null,null,null,null],  //0 温度 1 湿度 2 电量 3 ID
														2:[null,null,null,null],
														3:[null,null,null,null],
														4:[null,null,null,null]
													}
												}
												chartData4.push(tableItem)
											})
											console.log("绘图数据",chartData4);
											_this.carPointArr.map(function(item,index){

												chartData4[item.chartIndex].group[item.number][0]=item.temperature;
												chartData4[item.chartIndex].group[item.number][1]=item.humidity;
												chartData4[item.chartIndex].group[item.number][2]=item.sensorBattery;
												chartData4[item.chartIndex].group[item.number][3]=item.ID;

											})
											let assetCount4=order.length; //设备数量
											_this.lineOption.series=[]
											for (let j = 0; j < assetCount4; j++) {

												_this.lineOption.series.push({
													name:'_传感器_'+(j+1),
													data:[]
												})
											}
											_this.lineOption.xAxis.categories=[];
											chartData4.map(function(item,index){
												_this.lineOption.xAxis.categories.push(item.time.split(" ")[1]);
												let n=0;
												for (let key in item.group){
													let arr=[];
													arr.push(item.time);
													arr.push(item.group[key][0])
													_this.lineOption.series[n].data.push(arr);
													n++
												}
											});
											HighChart.chart('lineChart',_this.lineOption);*/

											break;
									}
									_this.getRunData();
								}
							}
						})
					},100*m)
				}

			},
			//地图车辆信息显示框
			showPointText(index) {
				if (index < this.carPointArr.length) this.$refs.map.showPlayPoint(index);
				this.changeActive(this.carPointArr, index);
			},

			/***
			 * * ******************************   运行段    **********************
			 * */

			//获得  运行段数据 || 趟次数据
			getRunData(){
				let url,ation,key;

				if(this.systemID==2){
					url = "/web/Lock/Lock_Report";
					ation = "QueryTripReportByFAssetGUIDs";
					key='FAssetGUIDs';
				}else {
					url = '/web/Common/Common_Report';
					ation = "QueryReportDriveListByFVehicleGUID";
					key='FVehicleGUID';
				}

				$.post(url, {
						FTokenID: _this.$store.state.FTokenID,
						FAction: ation,
						[key]: _this.choiceCarData.id,
						FStartTime: _this.choiceCarData.startTime,
						FEndTime: _this.choiceCarData.endTime,
						FPageSize:99999,
						FVersion: "1.0.0"
					},
					function (res) {
						console.log("运行段或趟次", res.Result, res.FObject);
						if (res.Result == 104) {
							_this.$refs.map.showError("登录超时，5秒后返回登录页面");
							setTimeout(function () {
								_this.$store.commit("goLogin");
							}, 5000)
							return
						}
						if (res.Result == 200) {
							let data=[];
							if(this.systemID==2){
								data=res.FObject;
							}else {
								data=res.FObject.Table1;
							}



							if (data.length == 0) {
								_this.$refs.map.showError("暂无运行段数据");
							} else {
								let resRunData = data.reverse(),
									pointArr = _this.carPointArr,
									//start = _this.carRunArr.startTimeIndex,
									//end = _this.carRunArr.endTimeIndex,
									runData = _this.carRunArr.runData,
									allRunTime = _this.carRunArr.allRunTime,
									allMileage = _this.carRunArr.allMileage;

								//_this.parseRoute(resRunData, pointArr, start, end, runData, allRunTime, allMileage, unlockType);
								_this.parseRoute(resRunData, pointArr, runData, allRunTime, allMileage);

 							}
						}
						_this.getStopData();
					})


			},
			//分析运行段数据 (新 在轨迹上显示起始点)
			parseRoute(resRunData, pointArr, runData, allRunTime, allMileage,){
				let allT = null,
					allM = null;

				if (resRunData.length != 0 && pointArr.length != 0) {


					//生成运行端数据
					for (let i = 0; i < resRunData.length; i++) {
						let resRunItem = resRunData[i],
							startT,
							endT,
							aRunData;

						if(this.systemID==2){
							startT= _this.parseGMT(resRunItem.FStartTime);
							endT= _this.parseGMT(resRunItem.FEndTime);
						}else{
							startT= _this.parseGMT(resRunItem.FStartDateTime);
							endT= _this.parseGMT(resRunItem.FEndDateTime);
						}

						//console.log(resRunItem.FStartTime);
						//console.log(resRunItem.FEndTime);

						let unlockType=null;
						switch(resRunItem.FOpenType){
						    case 1:
								unlockType="_刷卡开锁_";
						        break;
							case 2:
								unlockType="_远程开锁_";
								break;
							case 3:
								unlockType="_蓝牙开锁_";
								break;
						}



						//判断运行段开始点是否在轨迹点内
						if(i==0 && this.GetDateSeconds(pointArr[0].time)>this.GetDateSeconds(startT)){

							if(this.systemID==2) continue; //电子锁系统如果开始时间不在范围内  则剔除

							//非电子锁系统 为运行段 不在轨迹点范围内的将 轨迹点的起始点定未开始点
							aRunData = {
								startTime:pointArr[0].time,
								endTime: endT,
								startPoint:pointArr[0].point,
								endPoint:_this.parsePoint({
									lng: parseFloat(resRunItem.FEndLongitude),
									lat: parseFloat(resRunItem.FEndLatitude)
								}),
								startAddress: "",
								endAddress: "",
								unlockType: unlockType,
								timeValue: this.formatSeconds(this.getSecondValue(startT,endT)),
								mileage: resRunItem.FEndMileage -pointArr[0].mileage,
								active: false,
								//轮胎数据
								tyre: []
							}

						}else if(i == resRunData.length-1 && this.GetDateSeconds(pointArr[pointArr.length-1].time)<this.GetDateSeconds(endT)){
							aRunData = {
								startTime:startT,
								endTime: pointArr[pointArr.length-1].time,
								startPoint:_this.parsePoint({
									lng: parseFloat(resRunItem.FStartLongitude),
									lat: parseFloat(resRunItem.FStartLatitude)
								}),
								endPoint:pointArr[pointArr.length-1].point,
								startAddress: "",
								endAddress: "",
								unlockType: unlockType,
								timeValue: this.formatSeconds(this.getSecondValue(startT,endT)),
								mileage: pointArr[pointArr.length-1].mileage - resRunItem.FStartMileage,
								active: false,
								//轮胎数据
								tyre: []
							}

						}else {
							aRunData = {
								startTime:startT,
								endTime: endT,
								startPoint:_this.parsePoint({
									lng: parseFloat(resRunItem.FStartLongitude),
									lat: parseFloat(resRunItem.FStartLatitude)
								}),
								endPoint:_this.parsePoint({
									lng: parseFloat(resRunItem.FEndLongitude),
									lat: parseFloat(resRunItem.FEndLatitude)
								}),
								startAddress: "",
								endAddress: "",
								unlockType: unlockType,
								timeValue: this.formatSeconds(this.getSecondValue(startT,endT)),
								mileage: resRunItem.FEndMileage - resRunItem.FStartMileage,
								active: false,
								//轮胎数据
								tyre: []
							}
						}

						if (resRunData[i].FDescribeJSON != undefined) {
							let tyreItem = JSON.parse(resRunData[i].FDescribeJSON);
							for (let j = 0; j < tyreItem.length; j++) {
								let ftc = tyreItem[j];
								let state = [];
								if (ftc.S.indexOf('HP')) state.push('_高胎压_');
								if (ftc.S.indexOf('LP:')) state.push('_低胎压_');
								if (ftc.S.indexOf('LE')) state.push('_急泄漏_');
								if (ftc.S.indexOf('HT')) state.push('_高温_');
								aRunData.tyre.push({
									tyreN: ftc.N,
									tyreS: state.toString(),
									tyreP: ftc.P,
									tyreT: ftc.T,
								})
							}
							console.log(aRunData.tyre);

						}
						runData.push(aRunData);
						console.log(runData)
						if (allRunTime != null && allMileage != null) {
							allT += this.getSecondValue(startT,endT);
							allM += aRunData.mileage;
							allRunTime = this.formatSeconds(allT);
							allMileage = allM;
							_this.$refs.map.setAllTimeAndMileage(allRunTime, allMileage);
						}
						setTimeout(function () {
							_this.geocoder(_this.$store.state.mapType, aRunData.startPoint, runData[i], 'startAddress')

						}, 100)
						setTimeout(function () {
							_this.geocoder(_this.$store.state.mapType, aRunData.endPoint, runData[i], 'endAddress')
						}, 800)

					}

				}


			},

			//分析运行段数据 (旧 在轨迹上描红)
/*
			parseRoute(resRunData, pointArr, start, end, runData, allRunTime, allMileage, unlockType){
				let allT = null,
					allM = null;

				if (resRunData.length != 0 && pointArr.length != 0) {
					//找到开始和结束点的索引值

					resRunData.map(function(item,index){
						let s = null,
							e = null;
						for (let i = 0; i < pointArr.length; i++) {
							let pointTime = pointArr[i].time;
							if (_this.parseGMT(item.FStartDateTime) == pointTime) {
								s = i
							}
							if (_this.parseGMT(item.FEndDateTime) == pointTime) {
								e = i
							}

						};
						if (s != null && e != null && s < e) {
							start.push(s);
							end.push(e);

						} else if (s != null && e == null) {
							//假如最后一个运行段跨越查询时间 设置轨迹点最后一个点为运行结束点
							start.push(s);
							end.push(pointArr.length - 1);
						}

					})

					console.log("开始点", start)
					console.log("结束点", end)
					console.log(start.length);
					if (start.length != 0) {

						//生成运行端数据
						for (let i = 0; i < start.length; i++) {
							let carStartPoint = pointArr[start[i]];
							let carEndPoint = pointArr[end[i]];
							let aRunData = {
								startTime: carStartPoint.time,
								endTime: carEndPoint.time,
								startAddress: "",
								endAddress: "",
								unlockType: unlockType,
								timeValue: this.formatSeconds(this.getSecondValue(carStartPoint.time, carEndPoint.time)),
								mileage: carEndPoint.mileage - carStartPoint.mileage,
								active: false,

								//轮胎数据
								tyre: []
							}
							if (resRunData[i].FDescribeJSON != undefined) {
								let tyreItem = JSON.parse(resRunData[i].FDescribeJSON);
								for (let j = 0; j < tyreItem.length; j++) {
									let ftc = tyreItem[j];
									let state = [];
									if (ftc.S.indexOf('HP')) state.push('_高胎压_');
									if (ftc.S.indexOf('LP:')) state.push('_低胎压_');
									if (ftc.S.indexOf('LE')) state.push('_急泄漏_');
									if (ftc.S.indexOf('HT')) state.push('_高温_');
									aRunData.tyre.push({
										tyreN: ftc.N,
										tyreS: state.toString(),
										tyreP: ftc.P,
										tyreT: ftc.T,
									})
								}
								console.log(aRunData.tyre);

							}
							runData.push(aRunData);
							if (allRunTime != null && allMileage != null) {
								allT += this.getSecondValue(carStartPoint.time, carEndPoint.time);
								allM += aRunData.mileage;
								allRunTime = this.formatSeconds(allT);
								allMileage = allM;
								_this.$refs.map.setAllTimeAndMileage(allRunTime, allMileage);
							}
							setTimeout(function () {
								_this.geocoder(_this.$store.state.mapType, _this.carPointArr[start[i]].point, runData[i], 'startAddress')

							}, 100)
							setTimeout(function () {
								_this.geocoder(_this.$store.state.mapType, _this.carPointArr[end[i]].point, runData[i], 'endAddress')
							}, 800)

						}
					}
				}


			},
*/
			//高亮显示运行段 (旧 在轨迹上描红)
			highlightShowPath(index){
				//设置激活状态
				this.changeActive(this.carRunArr.runData, index);
				this.$refs.map.highlightShowPath(this.carRunArr.startTimeIndex, this.carRunArr.endTimeIndex, index);
			},
			//地图上显示运行段开始和结束标记
			mapShowRunPath(index){
				//设置激活状态
				this.changeActive(this.carRunArr.runData, index);
				this.$refs.map.mapShowRunPath(this.carRunArr.runData[index]);
			},

			/********       停车点       *******/


			//请求停车点信息
			getStopData(){

				let url = '/web/Common/Common_Report';
				$.post(url, {
						FTokenID: _this.$store.state.FTokenID,
						FAction: "QueryReportParkingListByFVehicleGUIDs",
						FVehicleGUIDs: _this.choiceCarData.id,
						FStartTime: _this.choiceCarData.startTime,
						FEndTime: _this.choiceCarData.endTime,
						FPageSize:99999,
						FVersion: "1.0.0"
					},
					function (res) {
						console.log("停车点", res.Result, res.Message, res.FObject);
						if (res.Result == 104) {
							_this.$refs.map.showError("登录超时，5秒后返回登录页面");
							setTimeout(function () {
								_this.$store.commit("goLogin");
							}, 5000)
							return
						}
						if (res.Result == 200) {
							if (res.FObject == 0) {
								_this.$refs.map.showError("暂无数据");
							}
							else {

								let stopIndex = _this.carStopPointArr.stopIndex;
								let stopData = _this.carStopPointArr.stopData;
								let carPointArr = _this.carPointArr;
								let stopPointRes = res.FObject.Table1.reverse();


								for (let i = 0; i < stopPointRes.length; i++) {
									let oStop = stopPointRes[i];
									if(parseInt(oStop.FParkingDuration)>=_this.carStopPointArr.choiceTime*60){

										let stopObj = {
											startTime: _this.parseGMT(oStop.FParkingStartDateTime),
											endTime: _this.parseGMT(oStop.FParkingEndDateTime),
											stopTime: _this.formatSeconds(oStop.FParkingDuration),
											point:_this.parsePoint({
												lng: parseFloat(oStop.FParkingLongitude),
												lat: parseFloat(oStop.FParkingLatitude)
											}),
											originalStopTime: oStop.FParkingDuration,
											carState: '_分析中_',
											containerState: '_分析中_',
											solarPower: '_分析中_',
											powerState: '_分析中_',
											address: "定位中",
											active: false
										}
										stopData.push(stopObj)
										_this.geocoder(_this.$store.state.mapType,_this.carPointArr[i].point,stopObj,"address");


									}

								}
								console.log("解析后停车点",stopData);
								_this.showAllStopPoint();

								for (let j = 0; j < stopData.length; j++) {
									let stopItem=stopData[j];

									for (let i = 0; i < carPointArr.length; i++) {
										let PointArr = carPointArr[i];
										if (carPointArr[i].time ==stopItem.endTime) {
											stopItem.carState= PointArr.carState;
											stopItem.containerState= PointArr.containerState;
											stopItem.solarPower=PointArr.solarPower;
											stopItem.powerState=PointArr.powerState;
										}
									}

								};



							}
						}
						switch (_this.systemID){
							case 1:
								_this.getTyreData()
								break;
							case 2:
								_this.getAbnormal()
								break;

						}


					})

			},
			//显示所有停车点
			showAllStopPoint(){
				this.carStopPointArr.filterData = [];
				for (let i = 0; i < this.carStopPointArr.stopData.length; i++) {
					let parkingDuration = this.carStopPointArr.stopData[i].originalStopTime;
					//console.log(parkingDuration);
					if (parkingDuration >= this.carStopPointArr.choiceTime * 60) {
						this.carStopPointArr.filterData.push(this.carStopPointArr.stopData[i]);
					}
				}
				this.$refs.map.showCarStopPoint(this.carStopPointArr.filterData);

			},
			//显示选中的停车点
			showStopPoint(index){
				let point = this.carStopPointArr.filterData[index].point;
				this.$refs.map.showActiveStopPoint(point);
				this.changeActive(this.carStopPointArr.filterData, index);
			},

			//*******************************胎压报警***************************************
			//请求胎压数据
			getTyreData(){
				$.post("/web/Common/Common_Message", {
						FTokenID: _this.$store.state.FTokenID,
						FAction: "QueryMessageAlarmByFVehicleGUIDs",
						FVehicleGUIDs: _this.choiceCarData.id,
						FStartTime: _this.choiceCarData.startTime,
						FEndTime: _this.choiceCarData.endTime,
						FDataType: 2,
						FState: -1,
						FPageSize: 9999999,
						FSystemType: 1,
						FVersion: "1.0.0"
					},
					function (res) {
						console.log("胎压", res.Result, res.Message, res.FObject);
						if (res.Result == 104) {
							_this.$refs.map.showError("登录超时，5秒后返回登录页面");
							setTimeout(function () {
								_this.$store.commit("goLogin");
							}, 5000)
							return
						}
						if (res.Result == 200) {
							if (res.FObject == 0) {
								_this.$refs.map.showError("暂无胎压报警数据");
							} else {
								let tyreRes = res.FObject.Table1,
									pointArr = _this.carPointArr,
									start = _this.tyreArr.startTimeIndex,
									end = _this.tyreArr.endTimeIndex,
									runData = _this.tyreArr.data;

								_this.parseRoute(tyreRes, pointArr, start, end, runData);
							}
						}
					})


			},
			//高亮显示胎压
			highlightShowTyre(index){
				this.changeActive(this.tyreArr.data, index);
				this.$refs.map.highlightShowtyre(this.tyreArr.startTimeIndex, this.tyreArr.endTimeIndex, index);
			},
			//*******************************异常报表（电子锁）***************************************
			getAbnormal(){
				$.post("/web/Lock/Lock_Message", {
						FTokenID: _this.$store.state.FTokenID,
						FAction: "QueryMessageAlarmByFAssetGUIDs",
						FAssetGUIDs: _this.choiceCarData.id,
						FStartTime: _this.choiceCarData.startTime,
						FEndTime: _this.choiceCarData.endTime,
						FDataType: 8,
						FState: -1,
						FPageSize: 9999999,
						FSystemType: 1,
						FVersion: "1.0.0"
					},
					function (res) {
						console.log("异常", res.Result, res.Message, res.FObject);
						if (res.Result == 104) {
							_this.$refs.map.showError("登录超时，5秒后返回登录页面");
							setTimeout(function () {
								_this.$store.commit("goLogin");
							}, 5000)
							return
						}
						if (res.Result == 200) {
							if (res.FObject == 0) {
								_this.$refs.map.showError("暂无异常");
							} else {
								let lockRes = res.FObject.Table1,
									pointArr = _this.carPointArr,
									start = _this.tyreArr.startTimeIndex,
									end = _this.tyreArr.endTimeIndex,
									runData = _this.tyreArr.data;


								_this.parseRoute(lockRes, pointArr, start, end, runData);
							}
						}
					})
			},

			//接收子组件播放点数 滚动滚动条
			scrollShowData(index){
				this.changeActive(this.carPointArr, index);
				let maxIndex=this.carPointArr.length- 1,
					n=this.showNum;
				if(index>=maxIndex-n) {
					this.startIndex=maxIndex-n;
				}else {
					this.startIndex=index;
				}
				if(index+n>=maxIndex) {
					this.endIndex=maxIndex;
				}else {
					_this.endIndex=index+n;
				}
				let trHight = $("#table-wrap").find("tr").height();
				//console.log("index",index);
				//console.log("trHight",trHight);
				//console.log('margin-top',(index-1) * trHight);
				//console.log(_this.startIndex,_this.endIndex)

				///$('#table-inner').css('margin-top',(index-1)*trHight);
				document.getElementById("table-wrap").scrollTop =(index-1)*trHight;
			},


		},
		watch: {
			screenHeight () {
				this.adjustPage()
			}
		},
		computed: {
			//轨迹点获取startIndex个数据
			getStartIndexData(){
				//console.log("开始和结束INdex",this.startIndex,this.endIndex)
				return this.carPointArr.slice(this.startIndex, this.endIndex+1);
			}
		},
		directives: {
			dragY:{
				inserted:function (el, binding) {
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

								let newHeight=fatherDiv.offsetHeight-y;
								//console.log(fatherDiv.offsetHeight,y)
								if(y<=$("#map-tool").height()){
									$("#map-tool").hide()
								}else{
									$("#map-tool").show()
								}
								$("#contentList").height(newHeight + 'px');
								let h1=$('#myTab').height();
								let h2=$('#table-header').height();
								//console.log(newHeight - h1 - h2);
								$("#table-wrap").slimScroll({
									//width: 'auto', //可滚动区域宽度
									height: newHeight-h1-h2+'px', //可滚动区域高度
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
<style>
	@media (max-width:1280px) {
		.text-nowrap-300 {
			display:block;
			max-width:300px;
			word-break:keep-all;
			white-space:nowrap;
			overflow:hidden;
			text-overflow:ellipsis;
		}
	}
	.text-nowrap-300{
		padding-left:5px;
	}
	.map-template {
		position:relative;
	}

	#map-template input::-webkit-input-placeholder {
		padding-left:7px;
	}

	/*表格样式*/
	.list-active {
		background-color:#d2d2e6;
	}

	.list-active td {
		background-color:#d2d2e6;
	}

	#contentList {
		height:35px;
		position:relative;
		z-index:1000;
		overflow:hidden;
	}

	#contentList .nav > li {
		-webkit-transition:0.3s ease;
		transition:0.3s ease;
	}

	#contentList .nav > li a {
		height:35px;
		line-height:35px;
		padding:0 15px;
		margin:0;
		border:none;
		text-transform:uppercase;
		cursor:pointer;
		color:#fff;
	}

	#contentList .nav > li.active a, #contentList .nav > li a:hover, #contentList .nav > li > a:focus > a {
		background-color:#719ff5;
		color:#fff;
		border-radius:0;
	}

	[ripple] {
		z-index:1;
		position:relative;
		overflow:hidden;
	}

	[ripple] .ripple {
		position:absolute;
		background:#FFFFFF;
		width:12px;
		height:12px;
		border-radius:100%;
		-webkit-animation:ripple 1.6s;
		animation:ripple 1.6s;
	}

	@-webkit-keyframes ripple {
		0% {
			-webkit-transform:scale(1);
			transform:scale(1);
			opacity:0.2;
		}
		100% {
			-webkit-transform:scale(40);
			transform:scale(40);
			opacity:0;
		}
	}

	@keyframes ripple {
		0% {
			-webkit-transform:scale(1);
			transform:scale(1);
			opacity:0.2;
		}
		100% {
			-webkit-transform:scale(40);
			transform:scale(40);
			opacity:0;
		}
	}

	.contentList-header {
		position:relative;
		z-index:50;
		background:#4285F4;
	}

	.contentList-header .border {
		position:absolute;
		z-index:2;
		bottom:0;
		left:0;
		background:#F4B142;
		width:auto;
		height:2px;
		-webkit-transition:0.3s ease;
		transition:0.3s ease;
	}

	.close-Menu {
		position:absolute;
		top:0;
		right:0;
		font-size:20px;
	}

	.active-Menu, .close-Menu:hover {
		background-color:#719ff5;
	}

	.close-Menu a {
		display:block;
		width:35px;
		height:34px;
		line-height:34px;
		left:35px;
		text-align:center;
		color:#fff;
	}

	.full-menu {
		right:35px;
	}

	.open-menu {
		right:70px;
	}

	.full-menu a i {
		display:inline-block;
		width:16px;
		height:16px;
	}

	.restore-btn {
		background-position:-16px 0;
	}

	.customFixedTable ul {
		width:100%;
		height:30px;
		text-align:center;
		margin-bottom:0;
	}

	.customFixedTable ul li {
		float:left;
		height:30px;
		line-height:30px;
		font-size:12px;
		background-color:#bfdefb;
		overflow:hidden;
	}

	.customFixedTable ul li span {
		display:inline-block;
		line-height:15px;

	}

	.customFixedTable td {
		font-size:12px;
	}

	#contentList .table-wrap {
		height:155px;
		background-color:#fff;
		text-align:center;
	}

	#contentList td {
		height:30px;
		line-height:30px;
		padding:0;
		border:1px solid #ccc;
		overflow:hidden;
		white-space:nowrap;
		word-break:keep-all;
	}

	/*
		#contentList tbody td span{
			padding: 0 2px;
		}
	*/
	.tyre-state {
		display:inline-block;
		padding-right:5px;
	}

	.square-number {
		display:inline-block;
		padding:0 2px;
		height:15px;
		line-height:15px;
		border:0;
		border-radius:3px;
		background-color:#FF9900;
		color:#fff;
	}

	/*侧边栏样式*/

	.show-select-car-list {
		transform:translateX(0);
		transition:all 0.2s linear;
	}

	.hide-select-car-list {
		transform:translateX(100%);
		transition:all 0.2s linear;
	}

	#select-car {
		position:absolute;
		right:0;
		top:40px;
		z-index:999;
		width:300px;
		height:92.5%;
		background-color:#fff;
		border:1px solid #d2d2d2;
	}

	.search-module {
		width:100%;
		height:94.9%;
	}
  .search-module #lockList{
    margin-bottom: -230px;
    padding-bottom: 230px;
  }
  .search-module #lockList .el-tree{
    border: none;
  }
	.tree-li {
		padding-left:16px;
		height:30px;
		line-height:30px;
	}

	.tree-li a, .tree-li i {
		display:inline-block;
		width:14px;
		height:14px;
	}

	.tree-li input[type="checkbox"] {
		display:inline-block;
		vertical-align:middle;
		margin-bottom:7px;
	}

	.child-ul {
		padding-left:36px;
	}

	#car-list {
		height:25%;
		margin-top:5px;
	}

	.car-info {
		height:85%;
	}

	.operate-module {
		position:absolute;
		left:-15px;
		top:39%;
		z-index:1500;
		width:15px;
		height:76px;
		cursor:pointer;
		background:url("/static/img/show_carList_btn.png") no-repeat center;
	}

	#tree-footer {
		position:relative;
		padding-top:25px;
		margin:0;
		height:260px;
	}

	#tree-footer .top-border {
		padding-top:15px;
		border-top:1px solid #8c8c8c;
		border-bottom:none;
	}

	#tree-footer .tree-footer-title {
		position:absolute;
		top:14px;
		left:105px;
		z-index:10;
		height:25px;
		background-color:#fff;
	}

	#tree-footer li {
		height:36px;
	}

	#tree-footer label {
		width:80px;
		font-size:12px;
	}

	#tree-footer input, #tree-footer select {
		width:150px;
		color:#666;
	}

	.position-line{
		position:absolute;
		height:5px;
		width:100%;
		top:0;
		z-index:1500;
		background-color:transparent;
		cursor:row-resize;
	}

	.tire-alarm td{
		line-height:18px!important;
		cursor:pointer;
	}
	.lineChart{
		height:100%;
		width:100%;
	}
	.popover-li{
		width:25%;
		float:left;
		font-size:14px;
	}
	.popover-li .title{
		text-align:center;
		font-size:20px;
		color:#005fc6;
	}
	.popover-li p span{
		display:block;
		float:left;
		width:50%;
		text-align:center;
	}
	.popover-img{
		width:80%;
		height:150px;
		margin-left:10%;
		margin-top:20px;
	}
	.img-tem{
		background:url("/static/img/position-tem.png") no-repeat;
		background-size:contain;
	}
	.img-tire{
		background:url("/static/img/position-tire.png") no-repeat;
		background-size:contain;
	}
	.humiture-row{
		height:30px;
		line-height:30px;
		width:100%;
		cursor:pointer;
	}
	.popover-table th{
		text-align:center;
	}

	.green-light{
		display:inline-block;
		width:14px;
		height:14px;
		background-position:-198px -22px;
	}
	.red-light{
		display:inline-block;
		width:14px;
		height:14px;
		background-position:-212px -22px;
	}
	.lock-state{
		display:block;
		width:20px;
		height:20px;
		margin:3px auto;
	}
	.normal-lock{
		background-position:-266px -18px;
	}
	.abnormal-lock{
		background-position:-286px -18px;
	}
	.normal-unlock{
		background-position:-306px -18px;
	}
	.abnormal-unlock{
		background-position:-326px -18px;
	}
</style>

