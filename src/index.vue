<!-- index.vue -->
<template>
	<div class="wrapper" id="wrapper">
		<el-dialog title="_修改密码_" :visible.sync="editpass" size="init">
			<!-- <el-form :model="form"> -->
			<el-form :model="passwordData" :rules="passwordRules" ref="passwordData">
				<el-row>
					<el-form-item label="_原密码_" prop="oldPass"  label-width="100px">
						<el-input v-model="passwordData.oldPass" type='password' placeholder="_请输入密码_"></el-input>
					</el-form-item>
				</el-row>
				<el-row>
					<el-form-item label="_新密码_" prop="newPass" label-width="100px">
						<el-input v-model="passwordData.newPass" type='password'  placeholder="_请输入密码_"></el-input>
					</el-form-item>
				</el-row>
				<el-row>
					<el-form-item label="_确认密码_" prop="checkPass" label-width="100px">
						<el-input v-model="passwordData.checkPass" type='password'  placeholder="_请输入密码_"></el-input>
					</el-form-item>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="warning" @click="editpass=false">_取消_</el-button>
				<el-button type="primary" @click="savePassword">_确定_</el-button>
			</div>
		</el-dialog>

		<header class="main-header">


			<div href="index2.html" class="logo">
				<img class="main-logo" src="/static/img/logo/logo.png"/>
				<!--<img class="main-logo" src="/static/img/logo/logo-LT.png"/>-->

			</div>

			<!-- Header Navbar -->
			<nav class="navbar">
				<div class="img-icon" :class="{'tagline-EN':language!='CN','tagline-CN':language=='CN'}"></div>

				<!-- Navbar Right Menu -->
				<div class="navbar-custom-menu">
					<ul class="nav navbar-nav">
						<!-- User Account: style can be found in dropdown.less -->
						<li class="dropdown user user-menu">
							<a  class="dropdown-toggle" data-toggle="dropdown">
								<i class="fa fa-user-circle big-icon"></i>{{userName}}<i class="fa fa-chevron-down"></i></a>
							<ul class="dropdown-menu">
								<li class="text-center">
									<a  @click="changePassword" class="bg-green"><i class="fa fa-set"></i>_修改密码_</a>

									<a  @click="logOut" class="bg-red"><i class="fa fa-power-off"></i>_退出_</a>
								</li>
							</ul>
						</li>
						<li class="dropdown system-type">
							<a  class="dropdown-toggle" data-toggle="dropdown">
								<i class="img-icon header-system-icon" :class="{'system-trailer':choiceSystem.ID==1,'system-el':choiceSystem.ID==2,
								'system-cll':choiceSystem.ID==3,'system-logistics':choiceSystem.ID==4,'system-beton':choiceSystem.ID==5}"></i>
								{{choiceSystem.name}}
								<i class="fa fa-chevron-down"></i>
							</a>
							<!--:style="{width:systemSwitchoverWidth}"-->
							<ul class="dropdown-menu system-switchover" :style="{width:systemSwitchoverWidth,right:systemSwitchoverRight}">
								<!-- Menu Body -->
								<li class="system-type-wrap">
									<div class="syetem-flex">
										<div class="system-item" v-for="(systemitem,index) in SystemData.dataContent" v-if="systemitem.systemID!=3">
											<div v-if="!systemitem.active" class="modal-system" @click.stop="noHoveSystem"></div>
											<div @click="changeSystem(systemitem)" class="system-detail border-gradual cursor-pointer" :class="{'border-gradual-blue':systemitem.systemID==2||systemitem.systemID==4,
											'border-gradual-orange':systemitem.systemID==1,'border-gradual-green':systemitem.systemID==5,'border-gradual-purple':systemitem.systemID==3}">
												<div class="system-icon">
													<img :src="'/static/img/system-icon/system_icon_'+systemitem.systemID+'.png'" alt="">
												</div>
												<div class="system-content">
													<h2 class="system-name">{{systemitem.systemName}}</h2>
													<p class="system-intro" :title="systemitem.systemIntro" data-toggle="tooltip" data-placement="bottom">{{systemitem.systemIntro}}</p>
												</div>
											</div>
											<div v-if="systemitem.active" class="system-default" @click.stop>
												<el-radio class="radio" size="small" name="syetem" v-model="defaultSystemID" :label="systemitem.systemID" >_设为默认_</el-radio>
											</div>
										</div>
									</div>
									<!-- /.row -->
								</li>
							</ul>
						</li>
						<!--Alarm info start-->
						<li class="dropdown alarm-menu has-border">
							<a  class="dropdown-toggle" data-toggle="dropdown">
								<i class="img-icon header-fn-icon header-alarm"></i>
								<span class="label label-danger">{{AllAlarmFTotalCount>999?'999+':AllAlarmFTotalCount}}</span>
							</a>
							<ul class="dropdown-menu">
								<li class="header">_报警_</li>
								<li>
									<ul class="menu" id="indexAlarm" @click.stop>
										<li class="alarm-item" v-for="(alarmItem,index) in alarmInfo" v-if="alarmItem.FIsShow">
											<div class="alarm-header">
												<span class="alarm-license">·{{alarmItem.FVehicleName}}</span>
												<span class="alarm-message">[{{alarmItem.FDataType}}]</span>
												<span class="alarm-trackTime">{{alarmItem.FStartDateTime}}</span>
											</div>
											<div class="alarm-location">_位置_:{{alarmItem.address}}</div>
											<!--<div class="alarm-warn">{{alarmItem.FRemind}}</div>-->

											<div class="btn-list">
												<button class="btn-item dealWith" @click.stop="dealWithAlarm(index)">_处理_</button>
												<button class="btn-item ignore" @click.stop="ignoreAlarm(index,alarmItem.FGUID)">
													_忽略_
												</button>
												<!--<button class="btn-item ignore" @click.stop="lookOverAlarm(alarmItem.FStartDateTime,alarmItem.FEndDateTime,alarmItem.FVehicleGUID,alarmItem.FVehicleName)">
													_查看_
												</button>-->
												<!--<button class="btn-item delate">删除</button>-->

											</div>
											<div class="alarm-deal-opinion" v-if="alarmItem.FIsShowDealOpinion">
												<textarea placeholder="_请输入内容_" v-model="alarmItem.FAlarmDealContent"></textarea>
												<div class="alarm-operation-btnList">
													<button type="button" class="alarm-operation-btn submitIdea" @click.stop="submitAlarmDealContent(alarmItem.FAlarmDealContent,alarmItem.FGUID,index)">_提交_</button>
													<button type="button" class="alarm-operation-btn dropOut" @click.stop="dropOut(index)">_退出_</button>
												</div>
											</div>
										</li>
										<!--<li>&lt;!&ndash; Task item &ndash;&gt;
											<a >
												<h3>
													Create a nice theme
													<small class="pull-right">40%</small>
												</h3>
												<div class="progress xs">
													<div class="progress-bar progress-bar-green" style="width: 40%" role="progressbar"
														 aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
														<span class="sr-only">40% Complete</span>
													</div>
												</div>
											</a>
										</li>
										<li>&lt;!&ndash; Task item &ndash;&gt;
											<a >
												<h3>
													Some task I need to do
													<small class="pull-right">60%</small>
												</h3>
												<div class="progress xs">
													<div class="progress-bar progress-bar-red" style="width: 60%" role="progressbar"
														 aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
														<span class="sr-only">60% Complete</span>
													</div>
												</div>
											</a>
										</li>
										<li>&lt;!&ndash; Task item &ndash;&gt;
											<a >
												<h3>
													Make beautiful transitions
													<small class="pull-right">80%</small>
												</h3>
												<div class="progress xs">
													<div class="progress-bar progress-bar-yellow" style="width: 80%" role="progressbar"
														 aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
														<span class="sr-only">80% Complete</span>
													</div>
												</div>
											</a>
										</li>-->
									</ul>
								</li>
								<li class="footer">
									<a  class="ignoreAll" @click.stop="ignoreAllAlarm"><i class="fa fa-ban"></i>_忽略全部_</a>
								</li>
							</ul>
						</li>
						<!--Alarm info end-->

						<!--Messages info start-->
						<li class="dropdown msg-menu has-border">
							<a  class="dropdown-toggle" data-toggle="dropdown">
								<i class="img-icon header-fn-icon header-message"></i>
								<span class="label label-warning">{{AllSystemFTotalCount}}</span>
							</a>
							<ul class="dropdown-menu" @click.stop>
								<li class="header">_系统消息_</li>
								<li>
									<!-- inner menu: contains the actual data -->
									<ul class="menu" id="indexMessages">
										<li class="messages-item" v-for="(systemItem,index) in systemInfo">
											<div class="messages-img">
												<img :src="systemItem.imgUrl">
											</div>
											<div class="messages-content">
												<div class="msg-c-header">
													<h5 class="content-title">{{systemItem.title}}</h5>
													<p class="content-time">{{systemItem.FCreateDateTime}}</p>
												</div>
												<div class="msg-c-content">
													<div class="c-content">{{systemItem.FContext}}</div>
													<div class="btn-list">
														<button type="button" class="btn-item reader" @click.stop="readMsg(systemItem.FGUID)">_已读_</button>
														<!--<button type="button" class="btn-item delete" id="deleteMsg">删除</button>-->
													</div>
												</div>
											</div>
										</li>
									</ul>
								</li>
								<li class="footer">
									<a class="allRead" id="allRead"  @click="setAllSystemRead()">
										<i class="fa fa-envelope-open-o" aria-hidden="true"></i>
										_全部设为已读_
									</a>
								</li>
							</ul>
						</li>
						<!--Messages info end-->

						<!--Event info start-->
						<li class="dropdown event-menu has-border">
							<a  class="dropdown-toggle" data-toggle="dropdown">
								<i class="img-icon header-fn-icon header-event"></i>
								<span class="label label-success">{{AllEventFTotalCount}}</span>
							</a>
							<ul class="dropdown-menu">
								<li class="header">_事件_</li>
								<li>
									<!-- inner menu: contains the actual data -->
									<ul class="menu" id="indexEvent">
										<li class="event-item" v-for="(eventItem,index) in eventInfo" v-if="eventItem.isShow"><!-- start message -->
											<div class="event-header">
												<span class="event-license">·{{eventItem.FVehicleName}}</span>
												<span class="event-message">[{{eventItem.FDataType}}]</span>
												<span class="event-trackTime">{{eventItem.FStartDateTime}}</span>
											</div>
											<div class="event-location">_位置_：{{eventItem.address}}</div>
											<div class="btn-list">
												<!--<button class="btn-item lookOver" @click="lookOverMsg(eventItem.FStartDateTime,eventItem.FEndDateTime,eventItem.FVehicleGUID,eventItem.FVehicleName)">_查看_</button>-->
												<button class="btn-item ignore" @click.stop="ignoreMsg(index,eventItem.FGUID)">
													_忽略_
												</button>
											</div>
										</li>
										<!-- end message -->
									</ul>
								</li>
								<li class="footer">
									<a @click.stop="ignoreAllMsg" class="event-ignoreAll ignoreAll" href="Javascript:;">
										<i class="fa fa-ban"></i>
										_忽略全部_
									</a>
									<!--<a @click.stop="openEventList()" class="event-openList ignoreAll" href="Javascript:;">
									<i class="fa fa-file-text"></i>
									_查看列表_
								</a>-->

								</li>
							</ul>
						</li>
						<!--Event info end-->

						<!-- Control Sidebar Toggle Button -->
						<li class="has-border">
							<a  data-toggle="control-sidebar"><i class="img-icon header-fn-icon header-set"></i></a>
						</li>
					</ul>

				</div>

			</nav>
		</header>
		<!-- Left side column. contains the logo and sidebar -->
		<aside class="main-sidebar">
			<a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button"></a>
			<!-- sidebar: style can be found in sidebar.less -->
			<section class="sidebar">
				<!--<ul v-if="menuData.typeId===0" class="sidebar-menu tree" data-widget="tree">
					<li class="treeview active">
						<a href="#">
							<i class="img-icon index-icon icon-0"></i>
							<span>_首页_</span>
						</a>
					</li>
					&lt;!&ndash;位置服务&ndash;&gt;
					<li v-if="menuData.menuList[0].mainMenu[0]===1" class="treeview">
						<a href="#">
							<i class="img-icon index-icon icon-1"></i>
							<span>_位置服务_</span>
                			<span class="pull-right-container">
                  				<i class="fa fa-angle-left pull-right"></i>
               				 </span>
						</a>
						<ul class="treeview-menu">
							<li @click="addSubTabs('_实时监控_','monitor')">
								<router-link to="monitor">_实时监控_</router-link>
							</li>
							<li @click="addSubTabs('_轨迹回放_','historical_route')">
								<router-link to="historical_route">_轨迹回放_</router-link>
							</li>
						</ul>
					</li>
					&lt;!&ndash;接甩挂系统    胎压监测&ndash;&gt;
					<li v-if="choiceSystem.ID===1" class="treeview">
						<a href="#">
							<i class="img-icon index-icon icon-2"></i>
							<span>_胎压监测_</span>
              				<span class="pull-right-container">
                				<i class="fa fa-angle-left pull-right"></i>
              				</span>
						</a>
						<ul class="treeview-menu">
							<li @click="addSubTabs('_胎压曲线_','TireTrack')"><router-link to="TireTrack"> _胎压曲线_</router-link></li>
							<li @click="addSubTabs('_胎压胎温报警_','TireTemAlarm')"><router-link to="TireTemAlarm"> _胎压胎温报警_</router-link></li>
							<li @click="addSubTabs('_胎压配置_','TireConfig')"><router-link to="TireConfig"> _胎压配置_</router-link></li>
						</ul>

					</li>
					&lt;!&ndash;冷链系统      温度监控&ndash;&gt;
					<li v-if="choiceSystem.ID===3||choiceSystem.ID===4" class="treeview">
						<a href="#">
							<i class="img-icon index-icon icon-2"></i>
							<span>_温度监控_</span>
              				<span class="pull-right-container">
                				<i class="fa fa-angle-left pull-right"></i>
              				</span>
						</a>
						<ul class="treeview-menu">
							<li @click="addSubTabs('_温度曲线_','temperatureCurve')"><router-link to="temperatureCurve"> _温度曲线_</router-link></li>
							<li @click="addSubTabs('_温度异常报表_','temperatureAlarm')"><router-link to="temperatureAlarm"> _温度异常报表_</router-link></li>
              <li @click="addSubTabs('_传感器配置_','sensorConfig')"><router-link to="sensorConfig"> _传感器配置_</router-link></li>
              &lt;!&ndash;<li @click="addSubTabs('_温度报警设置_','alarmConfig')"><router-link to="alarmConfig"> _温度报警设置_</router-link></li>&ndash;&gt;
            </ul>

					</li>
					<li v-if="choiceSystem.ID===4" class="treeview">
						<a href="#">
							<i class="img-icon index-icon icon-2"></i>
							<span>_油耗分析_</span>
              				<span class="pull-right-container">
                				<i class="fa fa-angle-left pull-right"></i>
              				</span>
						</a>
						<ul class="treeview-menu">
							<li @click="addSubTabs('_油耗分析_','OilWear')"><router-link to="OilWear"> _油耗分析_</router-link></li>
							<li @click="addSubTabs('_油箱配置_','OilBoxConfig')"><router-link to="OilBoxConfig"> _油箱配置_</router-link></li>
						</ul>

					</li>
					&lt;!&ndash;电子锁系统    智能电子锁&ndash;&gt;
					<li v-if="choiceSystem.ID===2" class="treeview">
						<a href="#">
							<i class="img-icon index-icon icon-2"></i>
							<span>_智能电子锁_</span>
              				<span class="pull-right-container">
                				<i class="fa fa-angle-left pull-right"></i>
              				</span>
						</a>
						<ul class="treeview-menu">
              <li @click="addSubTabs('_围栏内开锁配置_','UnlockConfig')"><router-link to="UnlockConfig">_围栏内开锁配置_</router-link></li>
							<li @click="addSubTabs('_远程开锁_','remoteUnlock')"><router-link to="remoteUnlock">_远程开锁_</router-link></li>
							<li  @click="addSubTabs('_开关锁报表_','switchLock')"><router-link to="switchLock">_开关锁报表_</router-link></li>
&lt;!&ndash;
							<li><router-link to="">_刷卡报表_</router-link></li>
&ndash;&gt;
							<li @click="addSubTabs('_异常报表_','abnormal')"><router-link to="abnormal">_异常报表_</router-link></li>
&lt;!&ndash;
							<li><router-link to="">_在途调度报表_</router-link></li>
							<li><router-link to="">_视频报表_</router-link></li>
&ndash;&gt;
						</ul>
					</li>
					&lt;!&ndash;报警报表&ndash;&gt;
					<li v-if="menuData.menuList[0].mainMenu[1]===1" class="treeview">
						<a href="#">
							<i class="img-icon index-icon icon-3"></i>
							<span>_报警报表_</span>
							<span class="pull-right-container">
							<i class="fa fa-angle-left pull-right"></i>
							</span>
						</a>
						<ul class="treeview-menu">
							<li @click="addSubTabs('_疲劳驾驶报警_','fatigueDrivingAlarm')"><router-link to="fatigueDrivingAlarm"> _疲劳驾驶报警_</router-link></li>
							<li @click="addSubTabs('_超速报警_','speedAlarm')"><router-link to="speedAlarm"> _超速报警_</router-link></li>
							<li @click="addSubTabs('_设备离线_','DeviceAlarm')"><router-link to="DeviceAlarm">_设备离线_</router-link></li>
							<li @click="addSubTabs('_超时停车报警_','stopAlarm')"><router-link to="stopAlarm">_超时停车报警_</router-link></li>
              <li @click="addSubTabs('_低电量报警_','lowBatteryAlarm')"><router-link to="lowBatteryAlarm">_低电量报警_</router-link></li>

						</ul>
					</li>
					&lt;!&ndash;接甩挂系统    接甩挂报表&ndash;&gt;
					<li v-if="choiceSystem.ID===1" class="treeview">
						<a href="JavaScript:;">
							<i class="img-icon index-icon icon-4"></i>
							<span>_接甩挂报表_</span>
							<span class="pull-right-container">
							<i class="fa fa-angle-left pull-right"></i>
							</span>
						</a>
						<ul class="treeview-menu">
						  <li @click="addSubTabs('_接甩挂分析_','TrailerReport')"><router-link to="TrailerReport"> _接甩挂分析_</router-link></li>
						</ul>
					</li>
					&lt;!&ndash;接甩挂系统    载重监测&ndash;&gt;
					&lt;!&ndash;<li v-if="choiceSystem.ID===1" class="treeview">
						<a href="JavaScript:;">
							<i class="img-icon index-icon icon-5"></i>
							<span>_载重监测_</span>
							<span class="pull-right-container">
							<i class="fa fa-angle-left pull-right"></i>
							  &lt;!&ndash; <small class="label pull-right bg-green">new</small> &ndash;&gt;
							</span>
						</a>
					</li>&ndash;&gt;
					&lt;!&ndash;报表分析&ndash;&gt;
					<li v-if="menuData.menuList[0].mainMenu[1]===1" class="treeview">
						<a href="JavaScript:;">
							<i class="img-icon index-icon icon-7"></i>
							<span>_报表分析_</span>
							<span class="pull-right-container">
							<i class="fa fa-angle-left pull-right"></i>
							</span>
						</a>
						<ul class="treeview-menu">
							<li @click="addSubTabs('_行驶统计_','xingshi')"><router-link to="xingshi">_行驶统计_</router-link></li>
							<li @click="addSubTabs('_运行效率分析_','xiaolv')"><router-link to="xiaolv">_运行效率分析_</router-link></li>
							<li @click="addSubTabs('_历史轨迹报表_','lishiguiji')"><router-link to="lishiguiji">_历史轨迹报表_</router-link></li>
							<li @click="addSubTabs('_停车报表_','park')"><router-link to="park">_停车报表_</router-link></li>
						</ul>
					</li>
					&lt;!&ndash;消息中心&ndash;&gt;
					<li v-if="menuData.menuList[0].mainMenu[1]===1" class="treeview">
						<a href="JavaScript:;">
							<i class="img-icon index-icon icon-6"></i>
							<span>_消息中心_</span>
							<span class="pull-right-container">
							<i class="fa fa-angle-left pull-right"></i>
							</span>
						</a>
						<ul class="treeview-menu">
							<li @click="addSubTabs('_系统消息_','systemInfo')"><router-link to="systemInfo">_系统消息_</router-link></li>
							<li @click="addSubTabs('_事件_','event')"><router-link to="event">_事件_</router-link></li>
						</ul>
					</li>
					&lt;!&ndash;管理员&ndash;&gt;
					<li v-if="menuData.menuList[0].mainMenu[1]===1" class="treeview">
						<a href="JavaScript:;">
							<i class="img-icon index-icon icon-8"></i>
							<span>_管理员_</span>
							<span class="pull-right-container">
							<i class="fa fa-angle-left pull-right"></i>
							</span>
						</a>
						<ul class="treeview-menu">
							<li @click="addSubTabs('_公司管理_','companyManage')"><router-link  to="companyManage">_公司管理_</router-link></li>
							<li @click="addSubTabs('_角色管理_','juese')"><router-link to="juese">_角色管理_</router-link></li>
							<li @click="addSubTabs('_用户管理_','user')"><router-link to="user">_用户管理_</router-link></li>
							<li @click="addSubTabs('_车辆管理_','vehicalmanage')"><router-link  to="vehicalmanage">_车辆管理_</router-link></li>
							<li @click="addSubTabs('_车队管理_','motorcade')"><router-link  to="motorcade">_车队管理_</router-link></li>
							<li @click="addSubTabs('_设备管理_','equipment')"><router-link  to="equipment">_设备管理_</router-link></li>
							<li @click="addSubTabs('SIM_卡管理_','sim')"><router-link  to="sim">SIM_卡管理_</router-link></li>
							<li @click="addSubTabs('_司机管理_','driver')"><router-link  to="driver">_司机管理_</router-link></li>
						</ul>
					</li>
					&lt;!&ndash;报警设置&ndash;&gt;
					<li v-if="menuData.menuList[0].mainMenu[1]===1" class="treeview">
						<a href="JavaScript:;">
							<i class="img-icon index-icon icon-9"></i>
							<span>_报警设置_</span>
							<span class="pull-right-container">
							<i class="fa fa-angle-left pull-right"></i>
							</span>
						</a>
						<ul class="treeview-menu">
							<li  @click="addSubTabs('_报警设置_','alarmconfiggather')"><router-link to="alarmconfiggather">_报警设置_</router-link></li>
						</ul>
					</li>

				</ul>-->
				<ul class="sidebar-menu tree" data-widget="tree">
					<li class="treeview active">
						<a href="#">
							<i class="img-icon index-icon icon-0"></i>
							<span>_首页_</span>
						</a>
					</li>
					<li v-for="p_menu in AccountMenuList" class="treeview">
						<a href="#">
							<i class="img-icon index-icon" :class="p_menu.iconIndex"></i>
							<span>{{p_menu.Menu}}</span>
                			<span class="pull-right-container">
                  				<i class="fa fa-angle-left pull-right"></i>
               				 </span>
						</a>
						<ul class="treeview-menu">
							<li @click="addSubTabs(menu.Menu,menu.URLAddress)" v-for="menu in p_menu.childMenu">
								<router-link :to=menu.URLAddress|removeSymbol>{{menu.Menu}}</router-link>
							</li>
						</ul>
					</li>
				</ul>
			</section>
			<!-- /.sidebar -->
		</aside>
		<div class="content-wrapper">
			<div class="content-header">
				<div id="Hui-tabNav" class="Hui-tabNav">
					<div class="Hui-tabNav-wp">
						<ul id="min_title_list" class="acrossTab">
							<li class="active">
								<router-link :to="{ path:'/' }"><span title="我的桌面">_首页_</span><em></em></router-link>
							</li>
							<li class="" v-for="item in tabsData">
								<router-link :to="{ path:item.router }"><span>{{item.tabsText}}</span><i></i><em></em></router-link>
							</li>
						</ul>
					</div>
					<div class="Hui-tabNav-more btn-group">
						<a id="js-tabNav-prev" class="btn radius btn-default size-S" >
							<i class="fa fa-chevron-left"></i>
						</a>
						<a id="js-tabNav-next" class="btn radius btn-default size-S" >
							<i class="fa fa-chevron-right"></i>
						</a>
					</div>
					<div class="contextMenu" id="Huiadminmenu">
						<ul>
							<li id="closethis">关闭当前</li>
							<li id="closeall">关闭全部</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="content" id="main-content">
				<keep-alive>
					<router-view :toChildrenSystemID="choiceSystem.ID" :screenHeight="screenHeight" @changeRoute="changeRoute"></router-view>
				</keep-alive>
			</div>

		</div>


		<!-- Control Sidebar -->
		<aside class="control-sidebar control-sidebar-dark">
			<!-- Create the tabs -->
			<ul class="nav nav-tabs nav-justified control-sidebar-tabs">
				<li><a href="#control-sidebar-home-tab" data-toggle="tab"><i class="fa fa-home"></i></a></li>
				<li><a href="#control-sidebar-settings-tab" data-toggle="tab"><i class="fa fa-gears"></i></a></li>
			</ul>
			<!-- Tab panes -->
			<div class="tab-content">
				<!-- Home tab content -->
				<div class="tab-pane" id="control-sidebar-home-tab">
					<h3 class="control-sidebar-heading">Recent Activity</h3>
					<ul class="control-sidebar-menu">
						<li>
							<a href="javascript:void(0)">
								<i class="menu-icon fa fa-birthday-cake bg-red"></i>

								<div class="menu-info">
									<h4 class="control-sidebar-subheading">Langdon's Birthday</h4>

									<p>Will be 23 on April 24th</p>
								</div>
							</a>
						</li>
						<li>
							<a href="javascript:void(0)">
								<i class="menu-icon fa fa-user bg-yellow"></i>

								<div class="menu-info">
									<h4 class="control-sidebar-subheading">Frodo Updated His Profile</h4>

									<p>New phone +1(800)555-1234</p>
								</div>
							</a>
						</li>
						<li>
							<a href="javascript:void(0)">
								<i class="menu-icon fa fa-envelope-o bg-light-blue"></i>

								<div class="menu-info">
									<h4 class="control-sidebar-subheading">Nora Joined Mailing List</h4>

									<p>nora@example.com</p>
								</div>
							</a>
						</li>
						<li>
							<a href="javascript:void(0)">
								<i class="menu-icon fa fa-file-code-o bg-green"></i>

								<div class="menu-info">
									<h4 class="control-sidebar-subheading">Cron Job 254 Executed</h4>

									<p>Execution time 5 seconds</p>
								</div>
							</a>
						</li>
					</ul>
					<!-- /.control-sidebar-menu -->

					<h3 class="control-sidebar-heading">Tasks Progress</h3>
					<ul class="control-sidebar-menu">
						<li>
							<a href="javascript:void(0)">
								<h4 class="control-sidebar-subheading">
									Custom Template Design
									<span class="label label-danger pull-right">70%</span>
								</h4>

								<div class="progress progress-xxs">
									<div class="progress-bar progress-bar-danger" style="width: 70%"></div>
								</div>
							</a>
						</li>
						<li>
							<a href="javascript:void(0)">
								<h4 class="control-sidebar-subheading">
									Update Resume
									<span class="label label-success pull-right">95%</span>
								</h4>

								<div class="progress progress-xxs">
									<div class="progress-bar progress-bar-success" style="width: 95%"></div>
								</div>
							</a>
						</li>
						<li>
							<a href="javascript:void(0)">
								<h4 class="control-sidebar-subheading">
									Laravel Integration
									<span class="label label-warning pull-right">50%</span>
								</h4>

								<div class="progress progress-xxs">
									<div class="progress-bar progress-bar-warning" style="width: 50%"></div>
								</div>
							</a>
						</li>
						<li>
							<a href="javascript:void(0)">
								<h4 class="control-sidebar-subheading">
									Back End Framework
									<span class="label label-primary pull-right">68%</span>
								</h4>

								<div class="progress progress-xxs">
									<div class="progress-bar progress-bar-primary" style="width: 68%"></div>
								</div>
							</a>
						</li>
					</ul>
					<!-- /.control-sidebar-menu -->

				</div>
				<!-- /.tab-pane -->

				<!-- Settings tab content -->
				<div class="tab-pane" id="control-sidebar-settings-tab">
					<form method="post">
						<h3 class="control-sidebar-heading">General Settings</h3>

						<div class="form-group">
							<label class="control-sidebar-subheading">
								Report panel usage
								<input type="checkbox" class="pull-right" checked>
							</label>

							<p>
								Some information about this general settings option
							</p>
						</div>
						<!-- /.form-group -->

						<div class="form-group">
							<label class="control-sidebar-subheading">
								Allow mail redirect
								<input type="checkbox" class="pull-right" checked>
							</label>

							<p>
								Other sets of options are available
							</p>
						</div>
						<!-- /.form-group -->

						<div class="form-group">
							<label class="control-sidebar-subheading">
								Expose author name in posts
								<input type="checkbox" class="pull-right" checked>
							</label>

							<p>
								Allow the user to show his name in blog posts
							</p>
						</div>
						<!-- /.form-group -->

						<h3 class="control-sidebar-heading">Chat Settings</h3>

						<div class="form-group">
							<label class="control-sidebar-subheading">
								Show me as online
								<input type="checkbox" class="pull-right" checked>
							</label>
						</div>
						<!-- /.form-group -->

						<div class="form-group">
							<label class="control-sidebar-subheading">
								Turn off notifications
								<input type="checkbox" class="pull-right">
							</label>
						</div>
						<!-- /.form-group -->

						<div class="form-group">
							<label class="control-sidebar-subheading">
								Delete chat history
								<a href="javascript:void(0)" class="text-red pull-right"><i class="fa fa-trash-o"></i></a>
							</label>
						</div>
						<!-- /.form-group -->
					</form>
				</div>
				<!-- /.tab-pane -->
			</div>
		</aside>
		<!-- /.control-sidebar -->
		<!-- Add the sidebar's background. This div must be placed
			 immediately after the control sidebar -->
		<div class="control-sidebar-bg"></div>
	</div>
</template>
<script>
	import contextmenu from "./plugins/jquery.contextmenu/jquery.contextmenu.r2.js"
	let _this=null
	export default {
		data() {
			_this=this;
			var validatePass= (rule, value, callback) => {
				if (value === '') {
					callback(new Error('_请再次输入密码_'));
				} else if (value !== this.passwordData.newPass) {
					callback(new Error('_两次输入密码不一致_!'));
				} else {
					callback();
				}
			};

			return {
				userName:"",
				language:"CN",
				systemSwitchoverWidth:null,
				systemSwitchoverRight:null,
				editpass:false,
				passwordData:{
					oldPass:'',
					newPass:'',
					checkPass:''
				},
				passwordRules:{
					oldPass: [
						{required: true, message: '_请输入原密码_', trigger: 'blur'},
						{ min: 6, max:12, message: '_长度在_ 6 ~ 12 _个字符_', trigger: 'blur' }
					],
					newPass: [
						{required: true, message: '_请输入新密码_', trigger: 'blur'},
						{ min: 6, max:12, message: '_长度在_ 6 ~ 12 _个字符_', trigger: 'blur' }
					],
					checkPass: [{validator: validatePass, trigger: 'blur'},
						{required: true, message: '_请确认密码_', trigger: 'blur'},
					]
				},

				menuData: {
					typeId: 0, menuList: [
						{mainMenu: [1, 1, 1], sunMenu: [[1, 1, 1], [1, 1, 1]]},
						{mainMenu: [1, 0, 1], sunMenu: [[1, 1, 1], [1, 1, 1]]},
					]
				},
				tabsData: [],
				screenHeight: window.innerHeight,
				num : 0,
				eventInfo: [],
				alarmInfo: [],
				systemInfo: [],
				//EventCount:26,
				hiddenAside:-190+"px",
				isHiddenAside:0+"px",
				sidebarImgUrl:"/static/img/show_carList_btn_right.png",
				radio:"1",
				SystemData:[],
				AllAlarmFTotalCount:0,
				AllSystemFTotalCount:0,
				AllEventFTotalCount:0,
				defaultSystemID:null, //默认系统ID
				haveSystemIDs:[1,2,3,4],//默认拥有系统ID数组
				firstLogin:true,          //由于本版本elmentUI radio 单选框 无对应change事件  只能监听默认系统ID值变化 本数值排除第一次登录时变化
				choiceSystem:{
					name:"",
					ID:null
				},
				AlarmInfoPageIndex:1,
				EventInfoPageIndex:1,
				carGUID:null,
				AccountMenuList:[],
			}
		},
		created() {
			let url=location.search;
			//alert(url);
			let loginData=null;
			if(url!=""){
				var json=decodeURIComponent(url.replace("?p=",""));
				loginData=JSON.parse(json);
			}else if(window.name!=""){
				loginData=JSON.parse(window.name).FObject[0];
			}else {
				//强制退出
				//this.$store.commit('goLogin')
			}
			console.log(loginData);

			if(loginData!=null){
				this.$store.commit('changeTokenID',loginData.FTokenID);
				this.$store.commit('changeUserName',loginData.FUserName);
				//this.$store.commit('changeInterfaceAddress',loginData.FUserInterfaceAddress);
				this.$store.commit('changeShortName',loginData.FShortName);
				this.$store.commit('changeLanguage',loginData.FLanguage);
				this.language=loginData.FLanguage;
				this.$store.commit('changeAgentGUID',loginData.FAgentGUID);
				this.$store.commit('changeGlobalMapType',loginData.FIsAbroad);
				this.userName=this.$store.state.FUserName;
			}

			_this.loadSystemData(function(){
				if(window.sessionStorage.systemInfo){

					let systemInfo=JSON.parse(window.sessionStorage.systemInfo);
					//console.log("window.sessionStorage设置完成",systemInfo)
					_this.$store.commit('changeSystemID',systemInfo.systemID);
					_this.choiceSystem.name=systemInfo.systemName;
					_this.choiceSystem.ID=systemInfo.systemID;
					_this.defaultSystemID=parseInt(window.sessionStorage.defaultSystemID);
					let ArrID=window.sessionStorage.haveSystemIDs.split(',');
					for (let i = 0; i < ArrID.length; i++) {
						ArrID[i]=parseInt(ArrID[i])
					}
					_this.haveSystemIDs=ArrID;

				}else {
					_this.getDefaultSystemID()
				}
				_this.haveSystemIDs.map(function(item,index){
					_this.SystemData.dataContent[item-1].active=true;

				})
				if(_this.choiceSystem.ID==2){
					//console.log('getAllLocksData')
					_this.$store.commit('getAllLocksData');
				}
				_this.$store.commit('getAllCarsData');
			});
			//刷新返回首页
			_this.$router.push('/');
		},
		filters:{
			removeSymbol:function(value){
				let linkTo=value.substring(2,value.length);
				return linkTo;
			},
		},
		mounted(){
			window.setTimeout(function(){
				_this.getAccountMenuList();
			},500)
			_this.systemSwitchoverWidth=($(window).width()-500)+"px";
			_this.systemSwitchoverRight=10-($(window).width()-($(".system-switchover").parent().offset().left+Number($(".system-switchover").parent().width())))+"px";
			var sUserAgent = navigator.userAgent.toLowerCase();
			var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
			var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
			var bIsMidp = sUserAgent.match(/midp/i) == "midp";
			var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
			var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
			var bIsAndroid = sUserAgent.match(/android/i) == "android";
			var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
			var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

			let oUl = $("#min_title_list");
			if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
				$("a[href!='#']").attr("data-toggle", "offcanvas");
			} else {
				changeHeight();
				//页面onresize
			};
			window.onresize = function () {
				changeHeight();
				_this.screenHeight = window.innerHeight;
				setTimeout(function () {
					_this.tabNavallwidth();
					_this.systemSwitchoverWidth=($(window).width()-500)+"px";
					_this.systemSwitchoverRight=10-($(window).width()-($(".system-switchover").parent().offset().left+Number($(".system-switchover").parent().width())))+"px";

				}, 50);
			}

			function changeHeight() {
				var wH = $(window).height(),
					headerH = $(".main-header").height(),
					contentHeaderH = $(".content-header").height();
				$("#main-content").height(wH - headerH - contentHeaderH - 20);

			}
			//点击侧边栏
/*
			$(".treeview-menu").on("click", "li", function (e) {
				e.stopPropagation();
				var re = new RegExp("^\#\/");
				var routerLink = $(this).find("a").attr("href").replace(re, "");
				var menuText = $(this).text();
				var menuData = {tabsText: menuText, router: routerLink};
				if (JSON.stringify(_this.tabsData).indexOf(JSON.stringify(menuData)) === -1) {
					_this.tabsData.push(menuData);
					setTimeout(_this.tabNavallwidth, 100);
				}
				console.log(_this.tabsData)
			});
*/

			if(!'placeholder'in document.createElement('input')){
				//ie 兼容placeholder属性
				jQuery('[placeholder]').focus(function() {
					var input = jQuery(this);
					if (input.val() == input.attr('placeholder')) {
						input.val('');
						console.log(input.attr('placeholder'))
						input.removeClass('placeholder');
					}
				}).blur(function() {
					var input = jQuery(this);
					if (input.val() == '' || input.val() == input.attr('placeholder')) {
						input.addClass('placeholder');

						input.val(input.attr('placeholder'));
					}
				})

				setTimeout(function(){
					$("input[placeholder]").blur();
				},500)

			}


			$('div.contextMenu').hide();
			/*选项卡导航*/
			//单击关闭
			$("#min_title_list").on("click", "li i", function (e) {
				//e.stopPropagation();

				var aCloseIndex = $(this).parents("li").index()-1;
				//console.log(aCloseIndex);
				if (aCloseIndex >= 0) {
					$("#min_title_list").find("a").eq(aCloseIndex).find("span").trigger("click");
				}

				_this.tabsData.splice(aCloseIndex, 1);
				_this.num == 0 ? _this.num = 0 : _this.num--;
				_this.tabNavallwidth();
			});
			//双击关闭
			$("#min_title_list").on("dblclick", "li", function () {
				var aCloseIndex = $(this).index() - 1;
				if (aCloseIndex >= 0) {
					$("#min_title_list").find("a").eq(aCloseIndex).find("span").trigger("click");
					_this.tabsData.splice(aCloseIndex, 1);
					_this.num == 0 ? _this.num = 0 : _this.num--;
					_this.tabNavallwidth();
				} else {
					return false;
				}
			});

			$('#js-tabNav-next').click(function () {
				_this.num == oUl.find('li').length - 1 ? _this.num = oUl.find('li').length - 1 : _this.num++;
				_this.toNavPos();
			});
			$('#js-tabNav-prev').click(function () {
				_this.num == 0 ? _this.num = 0 : _this.num--;
				_this.toNavPos();
			});


			//_this.getEventInfo();
			_this.getCarData();
			window.setInterval(function(){
				//console.log(_this.EventInfoPageIndex);
				_this.EventInfoPageIndex = 1;
				_this.AlarmInfoPageIndex = 1;
				_this.AlarmInfoPageIndex = 1;
				_this.eventInfo = [],
				_this.alarmInfo = [],
				_this.systemInfo = [],
				_this.getAlarmInfo();
				_this.getEventInfo();
				_this.getSystemInfo();
			}, 1000 * 60 * 5);
			//_this.getAlarmInfo();
			//_this.loadEventData();
			//_this.loadAlarmData();
			//_this.loadMessagesData();

			//_this.lazyLoadingAlarmInfo();

			_this.getSystemInfo();

			//获取菜单



		},
		methods: {
			//修改密码
			changePassword(){
				this.editpass=true;
				this.passwordData={
			        oldPass:'',
					newPass:'',
					checkPass:''
				}

			},
			savePassword(){

				this.$refs['passwordData'].validate((valid) => {
					if (valid) {
						let url="web/Common/Common_Admin";

						password(url);
						function password(url){
							let passwordData=_this.passwordData;
							let postData={
								FTokenID: _this.$store.state.FTokenID,
								FAction: "UpdateAdminMainUserPassword",
								FOldPassword:passwordData.oldPass,
								FNewPassword:passwordData.checkPass,
								FVersion: "1.0.0"
							}
							$.ajax({
								"url": url,
								"cache": false,
								"async": true,
								"type": "post",
								"dataType": "json",
								"contentType": "application/json; charset=utf-8",
								"data": JSON.stringify(postData),
								success: function (res) {

									if(res.Result==200){

										_this.$refs['passwordData'].resetFields();
										_this.$message("_修改成功_，_5秒后返回登录页面_");
										_this.editpass = false;
										setTimeout(function(){
											_this.$store.commit("goLogin");
										},5000)
									}else {
										_this.$message("_修改失败_!")
									}
								},
								error: function () {
									console.log('_请求失败_')
								}
							});
						}
					} else {
						console.log('error submit!!');
				return false;
			}
			});


			},
			//左侧导航栏点击添加tabs标签
			addSubTabs(menuText,routerLink){
				var menuData = {tabsText: menuText, router: routerLink.substring(2,routerLink.length)};
				if (JSON.stringify(_this.tabsData).indexOf(JSON.stringify(menuData)) === -1) {
					_this.tabsData.push(menuData);
					//console.log(_this.tabsData);
					setTimeout(_this.tabNavallwidth, 100);
				}
				//console.log(_this.tabsData)
			},
			//退出登录
			logOut(){
				this.$store.commit('goLogin')
			},
			//子页面跳转路由
			changeRoute(menuData){
				if (JSON.stringify(_this.tabsData).indexOf(JSON.stringify(menuData)) === -1) {
					_this.tabsData.push(menuData);
					setTimeout(_this.tabNavallwidth, 100);
				}
			},
			/*获取顶部选项卡总长度*/
			tabNavallwidth() {
				var taballwidth = 0,
					hide_nav = $("#Hui-tabNav"),
					$tabNav = hide_nav.find(".acrossTab"),
					$tabNavWp = hide_nav.find(".Hui-tabNav-wp"),
					$tabNavitem = hide_nav.find(".acrossTab li"),
					$tabNavmore = hide_nav.find(".Hui-tabNav-more");
				if (!$tabNav[0]) {
					return
				}
				$tabNavitem.each(function (index, element) {
					taballwidth += Number(parseFloat($(this).width() + 60))
				});
				$tabNav.width(taballwidth + 25);
				var w = $tabNavWp.width();
				if (taballwidth + 25 > w) {
					$tabNavmore.show();
				}
				else {
					$tabNavmore.hide();
					$tabNav.css({left: 0});
				}
				this.contextMenu();
			},
			//tab导航邮件菜单调用
			contextMenu() {
				$("#min_title_list li").contextMenu('Huiadminmenu', {
					bindings: {
						'closethis': function (t) {
							if ($(t).find("i")) {
								var aCloseIndex = $(t).index() - 1;
								if (aCloseIndex >= 0) {
									$("#min_title_list").find("a").eq(aCloseIndex).find("span").trigger("click");
									_this.tabsData.splice(aCloseIndex, 1);
									_this.num == 0 ? _this.num = 0 : _this.num--;
									_this.tabNavallwidth();
								}
								//$(t).find("i").trigger("click");
							}
						},
						'closeall': function () {
							_this.tabsData = [];
							_this.$router.push("/");
							_this.num = 0;
							_this.toNavPos();
							setTimeout(_this.tabNavallwidth, 100);
						},
					}
				});
			},
			toNavPos() {
				$("#min_title_list").stop().animate({'left': -_this.num * 100}, 100);
			},

			//获取该登录账号拥有的菜单
			getAccountMenuList(){
				let SystemType = this.$store.state.choiceSystemID;
				//console.log(SystemType);
				let TokenID = this.$store.state.FTokenID;
				let _this=this;
				let index=0;
				$.post("web/Common/Common",{
					FTokenID:TokenID,
					FAction:"QueryMenuList",
					FVersion:"1.0.0"
				},function(data){
					if(data.Result=="200"){
						console.log("当前账号菜单",data);
						for (let i = 0; i < data.FObject.length; i++) {
							let obj = data.FObject[i];
							//console.log(obj);
							if(obj.FGUID=="d953ddfb-a9ed-47d0-ac87-feb80e832ac3"){
								_this.$store.state.remoteUnlockLimits=1;
							}
							//console.log("当前账号菜单",obj);
							if(obj.FSystemType==0||obj.FSystemType==SystemType||(SystemType==4&&obj.FGUID=="f52beec6-17b1-4860-81bd-b891920da9a4")){
								if(obj.FMenuLevle==1&&obj.FGUID!="c94bdd30-da5e-4c54-9352-aa65bdb81f0b"){
									//console.log(obj);
									index++;
									_this.AccountMenuList.push({
										id:obj.FGUID,
										Menu:_this.translateMenu(obj.FMenuName),
										childMenu:[],
										iconIndex:"icon-"+index,
										index:obj.FMenuIndex
									});

								}
							}

						}
						_this.AccountMenuList.sort(function(a,b){
							return a.index- b.index;
						})
						for (let i = 0; i < data.FObject.length; i++) {
							let obj = data.FObject[i];
							for (let j = 0; j < _this.AccountMenuList.length; j++) {
								let obj_c = _this.AccountMenuList[j];
								if(obj.FMenuLevle==2&&obj.FParentGUID==obj_c.id){
									//console.log("当前账号菜单",obj);
									obj_c.childMenu.push({
										Menu:_this.translateMenu(obj.FMenuName),
										URLAddress:obj.FFunctionURLAddress,
										index:obj.FMenuIndex
									});
								}
							}
						}
						for (let i = 0; i < _this.AccountMenuList.length; i++) {
							let obj = _this.AccountMenuList[i].childMenu;
							if(obj.length>1){
								obj.sort(function(a,b){
									return a.FMenuIndex- b.FMenuIndex;
								})
							}
						}
						//console.log(_this.AccountMenuList);
					}
				});
			},
			//菜单翻译
			translateMenu(value){
				let menuName="";
				switch (value){
					case "位置服务":
						menuName="_位置服务_";
					 	break;
					case "实时监控":
						menuName="_实时监控_";
						break;
					case "轨迹回放":
						menuName="_轨迹回放_";
						break;
					case "胎压监测":
						menuName="_胎压监测_";
						break;
					case "胎压曲线":
						menuName="_胎压曲线_";
						break;
					case "胎压胎温报警":
						menuName="_胎压胎温报警_";
						break;
					case "报警报表":
						menuName="_报警报表_";
						break;
					case "疲劳驾驶报警":
						menuName="_疲劳驾驶报警_";
						break;
					case "超速报警":
						menuName="_超速报警_";
						break;
					case "设备离线":
						menuName="_设备离线_";
						break;
					case "超时停车报警":
						menuName="_超时停车报警_";
						break;
					case "低电量报警":
						menuName="_低电量报警_";
						break;
					case "接甩挂报表":
						menuName="_接甩挂报表_";
						break;
					case "接甩挂分析":
						menuName="_接甩挂分析_";
						break;
					case "报表分析":
						menuName="_报表分析_";
						break;
					case "行驶统计":
						menuName="_行驶统计_";
						break;
					case "运行效率分析":
						menuName="_运行效率分析_";
						break;
					case "历史轨迹报表":
						menuName="_历史轨迹报表_";
						break;
					case "停车报表":
						menuName="_停车报表_";
						break;
					case "消息中心":
						menuName="_消息中心_";
						break;
					case "系统消息":
						menuName="_系统消息_";
						break;
					case "事件":
						menuName="_事件_";
						break;
					case "管理员":
						menuName="_管理员_";
						break;
					case "公司管理":
						menuName="_公司管理_";
						break;
					case "角色管理":
						menuName="_角色管理_";
						break;
					case "用户管理":
						menuName="_用户管理_";
						break;
					case "车辆管理":
						menuName="_车辆管理_";
						break;
					case "车队管理":
						menuName="_车队管理_";
						break;
					case "设备管理":
						menuName="_设备管理_";
						break;
					case "SIM卡管理":
						menuName="SIM_卡管理_";
						break;
					case "司机管理":
						menuName="_司机管理_";
						break;
					case "报警设置":
						menuName="_报警设置_";
						break;
					case "智能电子锁":
						menuName="_智能电子锁_";
						break;
					case "围栏内开锁配置":
						menuName="_围栏内开锁配置_";
						break;
					case "远程开锁":
						menuName="_远程开锁_";
						break;
					case "开关锁报表":
						menuName="_开关锁报表_";
						break;
					case "异常报表":
						menuName="_异常报表_";
						break;
					case "油耗分析":
						menuName="_油耗分析_";
						break;
					case "油箱配置":
						menuName="_油箱配置_";
						break;
					case "温度监控":
						menuName="_温度监控_";
						break;
					case "温度曲线":
						menuName="_温度曲线_";
						break;
					case "温度异常报表":
						menuName="_温度异常报表_";
						break;
					case "传感器配置":
						menuName="_传感器配置_";
						break;

				}
				if(menuName!=""){
					return menuName;
				}else {
					return value
				}

			},
			//获得车辆数据
			getCarData(type){
				$.ajax({
					"url": "/web/Common/Common",
					"cache": false,
					"async": true,
					"type": "post",
					"dataType": "json",
					"contentType": "application/json; charset=utf-8",
					"data": '{"FTokenID":"'+_this.$store.state.FTokenID+'","FAction":"QueryVehicleList","FVersion":"1.0.0"}',
					success:function(data){
						console.log("车辆",data);
						let carGUID="";
						for (let i=0;i<data.FObject.length;i++){
							if(data.FObject[i].FGUID){
								if(data.FObject[i].FSystemType==_this.$store.state.choiceSystemID){
									carGUID+=data.FObject[i].FGUID+",";
								}
								//console.log(data.FObject[i].FGUID);
							}

						}
						carGUID=carGUID.substring(0,carGUID.length-1);
						_this.carGUID=carGUID;
						switch (type){
							case "event":
								//_this.getEventInfo(carGUID);
								_this.lazyLoadingEventInfo();
								break;
							case "alarm":
								//_this.getAlarmInfo();
								_this.lazyLoadingAlarmInfo();
								break;
							default:
								//_this.getEventInfo(carGUID);
								//_this.getAlarmInfo();
								_this.lazyLoadingAlarmInfo();
								_this.lazyLoadingEventInfo();
						}

					},
				});
			},
			//请求事件数据
			getEventInfo(){
				/*$("#indexEvent").slimScroll({
					size:"3px"
				})*/
				let arg=arguments[0];
				let pageSize=10;
				//console.log(arg);
				if(arg==10000){
					pageSize=arg;
					_this.EventInfoPageIndex=1;
				}
				$.ajax({
					"url": "/web/Common/Common_Message",
					"cache": false,
					"async": true,
					"type": "post",
					"dataType": "json",
					"contentType": "application/json; charset=utf-8",
					"data": '{"FTokenID":"'+_this.$store.state.FTokenID+'","FAction":"QueryMessageEventByFVehicleGUIDs","FVehicleGUIDs":"'+_this.carGUID+'","FState":"0","FDataType":"0","FPageSize":"'+pageSize+'","FPageIndex":"'+_this.EventInfoPageIndex+'","FStartTime":"'+this.getSomeDayBefore(2,"begin")+'","FEndTime":"'+this.getSomeDayBefore(0,"end")+'","FVersion":"1.0.0"}',
					success:function(data){
						//console.log("事件",data);//成功
						if(pageSize==10000){
							let arr=data.FObject.Table1;
							let EventFGUID="";
							for (let i = 0; i < arr.length; i++) {
								EventFGUID+=arr[i].FGUID+",";
							}
							EventFGUID=EventFGUID.substring(0,EventFGUID.length-1);
							_this.ignoreMsg("all",EventFGUID);
						}else {
							if(data.FObject.Table1.length!=0){
								_this.AllEventFTotalCount = data.FObject.Table[0].FTotalCount;
								let tempArr=_this.getUsableData(data.FObject.Table1,"event");
								window.setTimeout(function(){
									$.each(tempArr,function(index,item){
										_this.eventInfo.push(item);
									});
								},500)
							}
						}

					},
				});
			},
			//请求报警数据
			getAlarmInfo(){
				/*$("#indexAlarm").slimScroll({
					size:"3px"
				});*/
				let arg=arguments[0];
				let pageSize=10;
				//console.log(arg);
				if(arg==10000){
					pageSize=arg;
					_this.AlarmInfoPageIndex=1;
				}
				let SystemType=this.$store.state.choiceSystemID;

				$.ajax({
					"url": "/web/Common/Common_Message",
					"cache": false,
					"async": true,
					"type": "post",
					"dataType": "json",
					"contentType": "application/json; charset=utf-8",
					"data": '{"FTokenID":"'+_this.$store.state.FTokenID+'","FAction":"QueryMessageAlarmByFVehicleGUIDs","FVehicleGUIDs":"'+_this.carGUID+'","FState":"0","FDataType":"0","FPageSize":"'+pageSize+'","FPageIndex":"'+_this.AlarmInfoPageIndex+'","FStartTime":"'+this.getSomeDayBefore(2,"begin")+'","FEndTime":"'+this.getSomeDayBefore(0,"end")+'","FVersion":"1.0.0"}',
					success:function(data){
						//console.log("报警",data);
						//console.log(pageSize);
						if(pageSize==10000){
							let arr=data.FObject.Table1;
							let AlarmFGUID="";
							for (let i = 0; i < arr.length; i++) {
								AlarmFGUID+=arr[i].FGUID+",";
							}
							AlarmFGUID=AlarmFGUID.substring(0,AlarmFGUID.length-1);
							_this.ignoreAlarm("all",AlarmFGUID);
						}else {
							if(data.FObject.Table1.length!=0){
								_this.AllAlarmFTotalCount = data.FObject.Table[0].FTotalCount;
								let tempArr=_this.getUsableData(data.FObject.Table1,"alarm");
								window.setTimeout(function(){
									$.each(tempArr,function(index,item){
										_this.alarmInfo.push(item);
									});
								},500);
							}
						}

					},
				});
			},
			//懒加载报警信息
			lazyLoadingAlarmInfo(){
				if(_this.AlarmInfoPageIndex==1){
					$("#indexAlarm").slimScroll({
						size:"3px"
					});
					_this.getAlarmInfo();
					_this.AlarmInfoPageIndex++;
					_this.lazyLoadingAlarmInfo();
				}else {
					$("#indexAlarm").slimScroll().bind("slimscroll",function(e,pos){
						if(pos=="bottom"){
							_this.getAlarmInfo();
							_this.AlarmInfoPageIndex++;

						}
					});
				}
			},
			//懒加载事件信息
			lazyLoadingEventInfo(){
				if(_this.EventInfoPageIndex==1){
					$("#indexEvent").slimScroll({
						size:"3px"
					});
					_this.getEventInfo();
					_this.EventInfoPageIndex++;
					_this.lazyLoadingEventInfo();
				}else {
					$("#indexEvent").slimScroll().bind("slimscroll",function(e,pos){
						if(pos=="bottom"){
							_this.getEventInfo();
							_this.EventInfoPageIndex++;

						}
					});
				}
			},
			//处理报警信息
			submitAlarmDealContent(val,id,index){
				let JsonObj={
					FMessageGUID:id,
					FProcessStatus:1,
					FProcessType:0,
					FProcessContext:val
				};
				let JsonStr=JSON.stringify({FTokenID:_this.$store.state.FTokenID,FAction:"UpdateMessageAlarmByFMessageGUID",FT_Message:JsonObj,FVersion:"1.0.0"})
				$.ajax({
					"url": "/web/Common/Common_Message",
					"cache": false,
					"async": true,
					"type": "post",
					"dataType": "json",
					"contentType": "application/json; charset=utf-8",
					"data":JsonStr,
					success:function(data){
						console.log(data);
						if(data.Result=="200"){
							_this.AllAlarmFTotalCount--;
							_this.alarmInfo[index].FIsShow=false;
							_this.getCarData("alarm");
						}

					}
				});
			},
			//请求系统消息
			getSystemInfo(){
				$("#indexMessages").slimScroll({
					size:"3px"
				});
				$.ajax({
					"url": "/web/Common/Common_Message",
					"cache": false,
					"async": true,
					"type": "post",
					"dataType": "json",
					"contentType": "application/json; charset=utf-8",
					"data":'{"FTokenID":"'+_this.$store.state.FTokenID+'","FAction":"QueryMessageNotifyByFUserGUID","FState":"0","FDataType":"0","FPageSize":"10000","FPageIndex":"1","FVersion":"1.0.0"}',
					success:function(data){
						//console.log(data);
						_this.AllSystemFTotalCount = data.FObject.Table[0].FTotalCount;
						_this.systemInfo=_this.getUsableData(data.FObject.Table1,"system");
					}
				});
			},
			//设置系统消息已读
			readMsg(id){
				$.ajax({
					"url": "/web/Common/Common_Message",
					"cache": false,
					"async": true,
					"type": "post",
					"dataType": "json",
					"contentType": "application/json; charset=utf-8",
					"data":'{"FTokenID":"'+_this.$store.state.FTokenID+'","FAction":"UpdateMessageNotifyStatus","FGUIDs":"'+id+'","FState":"1","FVersion":"1.0.0"}',
					success:function(data){
						//console.log(data);
						_this.getSystemInfo();
					}
				});
			},
			//设置所有系统消息已读
			setAllSystemRead(){
				let GUIDArr=[];
				for (let i = 0; i < this.systemInfo.length; i++) {
					GUIDArr.push(this.systemInfo[i].FGUID);
				}
				let GUIDStr=GUIDArr.join(",");
				this.readMsg(GUIDStr);
			},
			//优化显示的数据(解析地址+修改字段)
			getUsableData(arr, type){
				let result = arr;
				//console.log(result);
				let myGeo = new BMap.Geocoder();
				for (let i = 0; i < result.length; i++) {
					//修改字段
					if (type == "alarm") {
						if (result[i].FDataType == "1") {
							result[i].FDataType = "_超速报警_";
							result[i].FRemind = "";
						} else if (result[i].FDataType == "2") {
							result[i].FDataType = "_胎温胎压报警_";
							result[i].FRemind = "";
						} else if (result[i].FDataType == "3") {
							result[i].FDataType = "_超时停车报警_";
							result[i].FRemind = "";
						} else if (result[i].FDataType == "4") {
							result[i].FDataType = "_疲劳驾驶报警_";
							result[i].FRemind = "";
						} else if (result[i].FDataType == "5") {
							result[i].FDataType = "_离线报警_";
							result[i].FRemind = "";
						} else if (result[i].FDataType == "6") {
							result[i].FDataType = "_电量报警_";
							result[i].FRemind = "";
						}else if (result[i].FDataType == "7") {
							result[i].FDataType = "_温度报警_";
							result[i].FRemind = "";
						} else if (result[i].FDataType == "8") {
							result[i].FDataType = "_异常开锁报警_";
							result[i].FRemind = "";
						}
						result[i].FIsShow = true;
						result[i].FIsShowDealOpinion = false;
						result[i].FAlarmDealContent = "";
						result[i].FStartDateTime = _this.parseGMT(result[i].FStartDateTime);
						result[i].FEndDateTime = result[i].FStartDateTime.replace(/T/g, " ");
					}else if(type == "event"){
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
						result[i].isShow = true;
						result[i].FStartDateTime = _this.parseGMT(result[i].FStartDateTime);
						result[i].FEndDateTime = result[i].FStartDateTime.replace(/T/g, " ");
					}else if (type == "system") {
						result[i].FCreateDateTime = result[i].FCreateDateTime.substring(0, 10);
						result[i].imgUrl = "static/img/emptyUrl.gif";
						result[i].title =result[i].FContext.substring(0,5)+"...";
						if(result[i].FContext.length>=55){
							result[i].FContext=result[i].FContext.substring(0,55)+"...";
						}
					}
					//解析地址
					if (result[i].FStartLongitude != "" || result[i].FStartLongitude != undefined) {
						let lat = result[i].FStartLongitude;
						let lon = result[i].FStartLatitude;
						myGeo.getLocation(new BMap.Point(lat, lon), function (rs) {
							if(rs.address==""){
								rs.address="_未定位_"
							}
							result[i].address = rs.address;
						});
					}
				}
				return result
			},
			//忽略事件
			ignoreMsg(index,id){
				$.ajax({
					"url": "/web/Common/Common_Message",
					"cache": false,
					"async": true,
					"type": "post",
					"dataType": "json",
					"contentType": "application/json; charset=utf-8",
					"data":"{'FTokenID':'"+_this.$store.state.FTokenID+"','FAction':'UpdateMessageEventStatus','FGUIDs':'"+id+"','FState':'1','FVersion':'1.0.0'}",
					success:function(json){
						if(index=="all"){
							for (var i=0;i<_this.eventInfo.length;i++){
								_this.eventInfo[i].isShow=false;
							}
							_this.AllEventFTotalCount=0;
						}else {
							if(json.Result=="200"){
								_this.AllEventFTotalCount--;
								_this.eventInfo[index].isShow=false;
							}
						}

					}
				});

			},
			//查看事件
			lookOverMsg(startTime,endTime,id,Vehicle){
				//console.log(id);
				//this.$router.push({name:"event",params: { ID: id ,startTime:startTime,endTime:endTime,vehicle:Vehicle}});
				//let menuData = {tabsText: "事件", router: "/event"};
				//_this.tabsData.push(menuData);
			},
			//查看报警
			lookOverAlarm(startTime,endTime,id,Vehicle){

			},
			//忽略所有事件
			ignoreAllMsg(){
				this.getEventInfo(10000);
			},
			//忽略所有报警
			ignoreAllAlarm(){
				this.getAlarmInfo(10000);
			},
			//打开事件页面
			openEventList(){
				let menuData = {tabsText: "事件", router: "/event"};
				this.changeRoute(menuData);
				this.$router.push({ name: "event"});
			},
			//忽略报警
			ignoreAlarm(index,id){
				$.ajax({
					"url": "/web/Common/Common_Message",
					"cache": false,
					"async": true,
					"type": "post",
					"dataType": "json",
					"contentType": "application/json; charset=utf-8",
					"data":"{'FTokenID':'"+_this.$store.state.FTokenID+"','FAction':'UpdateMessageAlarmStatus','FGUIDs':'"+id+"','FState':'1','FVersion':'1.0.0'}",
					success:function(json){
						if(json.Result=="200"){
							if(index=="all"){
								for (var i=0;i<_this.alarmInfo.length;i++){
									_this.alarmInfo[i].FIsShow=false;
								}
								_this.AllAlarmFTotalCount=0;
							}else {
								_this.AllAlarmFTotalCount--;
								_this.alarmInfo[index].FIsShow=false;
							}

						}
					}
				});
			},
			dealWithAlarm(index){
				this.alarmInfo[index].FIsShowDealOpinion=true;
			},
			dropOut(index){
				this.alarmInfo[index].FIsShowDealOpinion=false;
			},
			//获取本地系统的数据
			loadSystemData(callback){
				let url="/static/systems/systems_"+this.$store.state.language+".json"
				_this.$http.get(url).then(function (res) {
					_this.SystemData=JSON.parse(res.bodyText);

					callback()
				});
			},
			//从服务器获取默认系统ID
			getDefaultSystemID(){
				//如果未登录过系统 则向服务器请求默认系统数据
				let postData={
					FTokenID:_this.$store.state.FTokenID,
					FAction:"QuerySystemConfigUser",
					FVersion:"1.0.0"
				}

				$.ajax({
					"url": "/web/Common/Common_System",
					"cache": false,
					"async": false,
					"type": "post",
					"dataType": "json",
					"contentType": "application/json; charset=utf-8",
					"data": JSON.stringify(postData) ,
					success: function (res) {
						console.log("Default system",res);
						if(res.Result==200){

							_this.defaultSystemID= res.FObject[0].FDefaultSystemId;
							window.sessionStorage.defaultSystemID=_this.defaultSystemID;

							let FHaveSystemIds=res.FObject[0].FHaveSystemIds;

							if(FHaveSystemIds!=0){
								_this.haveSystemIDs=FHaveSystemIds.split(',');
							}
							window.sessionStorage.haveSystemIDs=_this.haveSystemIDs.join(",");


							_this.SystemData.dataContent.map(function(item,index){

								if(item.systemID==_this.defaultSystemID){
									_this.$store.commit('changeSystemID',item.systemID);
									_this.choiceSystem.name=item.systemName;
									_this.choiceSystem.ID=item.systemID;
								}
							})
						}
					},
					error: function () {
						console.log("Default system request error")
					}
				})

			},
			//选择切换系统
			changeSystem(data){
				console.log(_this.haveSystemIDs);
				console.log(data.systemID);
				console.log(_this.haveSystemIDs.indexOf(data.systemID));
				if(data.systemID==this.choiceSystem.ID || _this.haveSystemIDs.indexOf(data.systemID)==-1) return;
				window.sessionStorage.systemInfo=JSON.stringify(data);
				//this.$router.go(0);
				window.location.reload();
				//this.$router.push();
			},
			//未开通系统提示
			noHoveSystem(){
				_this.$message({
					showClose: true,
					message: '_您尚未开通此系统_',
					type: 'warning'
				});
			}

		},
		watch:{
			//选择默认系统
			defaultSystemID(val){
				if(this.firstLogin==true) {
					this.firstLogin=false;
					return
				}

				console.log("change system ID",val);
				let postData={
					FTokenID:_this.$store.state.FTokenID,
					FAction:"UpdateSystemConfigUser",
					FDefaultSystemId:val,
					FVersion:"1.0.0"
				}

				$.ajax({
					"url": "/web/Common/Common_System",
					"cache": false,
					"async": false,
					"type": "post",
					"dataType": "json",
					"contentType": "application/json; charset=utf-8",
					"data": JSON.stringify(postData) ,
					success: function (json) {
						console.log("Change default system",json);
						if(json.Result=="200"){
							window.sessionStorage.defaultSystemID=val;
							_this.$message({
								showClose: true,
								message: '_修改成功_',
								type: 'success'
							});
						}
					},
					error: function () {
						console.log("Change default system  error")
					}
				})

			},

		},
		updated(){
		}

	}


</script>
<style scoped>
	/********header图标***********/
	.header-system-icon{
		position:absolute;
		left:10px;
		top:13px;
		width:24px;
		height:24px;
	}
	.system-cll{background-position:-117px -104px;}
	.system-el{background-position:-141px -104px;}
	.system-trailer{background-position:-165px -104px;}
	.system-logistics{background-position:-190px -104px;}
	.system-beton{background-position:-117px -104px;}

	.header-fn-icon{
		display:inline-block;
		width:22px;
		height:21px;
	}
	.header-event{background-position:-142px 0}
	.header-alarm{background-position:-164px 0}
	.header-message{background-position:-186px 0}
	.header-set{background-position:-208px 0}


	/*
	  .main-header .logo{
		width:40%;
	  }
	  .main-header .navbar{
		float:left;
		width:60%;
		margin-left:0;
	  }
	*/
	.main-header ul li {
		font-size:20px;
	}
	.navbar-nav > .event-menu > .dropdown-menu, .navbar-nav > .msg-menu > .dropdown-menu,.navbar-nav > .alarm-menu > .dropdown-menu {
		width:402px;
		border:1px solid #eee;
		box-shadow:2px 2px 3px rgba(0,0,0,0.5);
		border-bottom:none;
	}

	.navbar-nav > .event-menu > .dropdown-menu > li .menu, .navbar-nav > .msg-menu > .dropdown-menu > li .menu {
		max-height:250px;
	}

	.navbar-nav > .event-menu > .dropdown-menu > li.header,
	.navbar-nav > .msg-menu > .dropdown-menu > li.header,
	.navbar-nav > .alarm-menu > .dropdown-menu > li.header {
		padding:7px 10px;
		border-bottom:1px solid #f4f4f4;
		color:#fff;
		font-size:16px
	}
	.event-menu .header{
		background-color:#00a65a;
	}
	.msg-menu .header{
		background-color:#f39c12;
	}
	.alarm-menu .header{
		background-color:#dd4b39;
	}


	.navbar-nav > .event-menu > .dropdown-menu, .navbar-nav > .msg-menu > .dropdown-menu, .navbar-nav > .alarm-menu > .dropdown-menu {
		padding:0;
	}
	.navbar-nav > .event-menu > .dropdown-menu > li.footer > a, .navbar-nav > .msg-menu > .dropdown-menu > li.footer > a, .navbar-nav > .alarm-menu > .dropdown-menu > li.footer > a {
		border-top-left-radius:0;
		border-top-right-radius:0;
		border-bottom-right-radius:4px;
		border-bottom-left-radius:4px;
		font-size:12px;
		background-color:#fff;
		padding:7px 10px;
		border-bottom:1px solid #eeeeee;
		color:#444 !important;
		text-align:center
	}
	.main-header .main-logo {
		float:left;
		display:block;
		padding-top:6px;
	}


	/*事件：忽略全部*/
	.navbar-nav > .event-menu > .dropdown-menu > li.footer > .ignoreAll,.navbar-nav > .alarm-menu > .dropdown-menu > li.footer > .ignoreAll {
		background-color:#81bbf9;
		height:40px;
		color:#fff !important;
		line-height:25px;
		font-size:14px;
		border-bottom:none;
	}
	.navbar-nav > .event-menu > .dropdown-menu > li.footer >.event-ignoreAll {
		width:100%;
		display:inline-block;
		border-bottom-right-radius:0;
		border-right:1px solid #ccc;
	}
	.navbar-nav > .event-menu > .dropdown-menu > li.footer >.event-openList {
		width:50%;
		display:inline-block;
		border-bottom-left-radius:0;
	}


	.main-header .tagline-CN{
		float:left;
		margin-top:5px;
		width:170px;
		height:40px;
		background-position:0 -234px;
	}

	.main-header .tagline-EN{
		float:left;
		margin-top:5px;
		width:264px;
		height:40px;
		background-position:0 -498px;
	}


	.navbar-nav > li > a {
		height:50px;
		line-height:50px;
		padding:0 25px 0;
	}

	.main-header .navbar .nav > li > a > .label {
		top:10px;
		right:19px;
	}
	.navbar-nav  .system-type a{
		padding:0 15px 0 40px;
	}
	.main-header .user a, .main-header .system-type a {
		font-size:14px;
	}

	.main-header .big-icon {
		display:block;
		float:left;
		line-height:50px;
		font-size:24px;
		padding-right:5px;
	}

	.main-header .fa-chevron-down {
		padding-left:10px;
		font-size:16px;
	}

	.main-header .has-border {
		border-left:1px solid #09417d;
		border-right:1px solid #3b8feb;
	}

	@media (max-width:1124px) and (min-width:0px) {
		/*
		.main-header .logo, .main-header .navbar {
		  float:none;
		  width:100%;
		}
		*/
		.navbar-nav > li > a {
			padding:0 15px 0;
		}
		.main-header .navbar .nav > li > a > .label {
			top:13px;
			right:8px;
		}
	}

	/*index  header style end*/

	/* main-sidebar  style*/
	.main-sidebar {
		-webkit-box-shadow:2px 2px 4px rgba(0,0,0,.20);
		-moz-box-shadow:2px 2px 4px rgba(0,0,0,.20);
		-ms-box-shadow:2px 2px 4px rgba(0,0,0,.20);
		box-shadow:2px 2px 4px rgba(0,0,0,.20);
	}
	/***图标****/
	.index-icon{
		display:inline-block;
		width:14px;
		height:14px;
		margin-top:2px;
	}
	.icon-0{background-position:0 -37px;}
	.icon-1{background-position:-14px -37px;}
	.icon-2{background-position:-28px -37px;}
	.icon-3{background-position:-42px -37px;}
	.icon-4{background-position:-56px -37px;}
	.icon-5{background-position:-70px -37px;}
	.icon-6{background-position:-84px -37px;}
	.icon-7{background-position:-98px -37px;}
	.icon-8{background-position:-112px -37px;}
	.icon-9{background-position:-126px -37px;}

	.sidebar-toggle {
		position:absolute;
		left:100%;
		top:45%;
		display:block;
		width: 15px;
		height: 76px;
		background:url("/static/img/show_carList_btn_left.png") no-repeat;
	}

	.main-sidebar .router-link-exact-active {
		color:#fff !important;
		background-color:#96b9e6;
	}

	/*acrossTab 导航栏样式*/
	.content-header {
		-webkit-box-shadow:2px 2px 4px rgba(0,0,0,.20);
		-moz-box-shadow:2px 2px 4px rgba(0,0,0,.20);
		-ms-box-shadow:2px 2px 4px rgba(0,0,0,.20);
		box-shadow:2px 2px 4px rgba(0,0,0,.20);
	}

	.Hui-tabNav-wp {
		position:relative;
		height:35px;
		overflow:hidden;
	}


	.Hui-tabNav .acrossTab li a {
		height:26px;
		line-height:26px;
		display:block;
		background-image:url("../static/img/acrossTab-2.png")
	}

	.Hui-tabNav {
		background-image:none;
	}

	.acrossTab {
		position:absolute;
		top:9px;
		left:0;
		height:26px;
		width:100%;
		line-height:26px;
		background:none;
		padding-top:0;
		background-repeat:repeat-x;
		background-position:0 0;
		padding-top:1px;
		padding-left:0;
		overflow:hidden;
	}

	.acrossTab li {
		position:relative;
		float:left;
		display:inline-block;
		height:29px;
		line-height:29px;
		font-size:14px;
		cursor:pointer;
		white-space:nowrap;
		background-position:0 0
	}

	.acrossTab li a em {
		position:absolute;
		top:0;
		right:-16px;
		height:26px;
		width:16px;
		background-image:url("../static/img/acrossTab-2.png");
		background-position:right -30px;
	}

	.acrossTab li a, .acrossTab li a em {
		background-repeat:no-repeat;
	}

	.acrossTab li a span {
		color:#282828;
	}

	.acrossTab li a:hover {
		text-decoration:none;
		background-position:0 -60px
	}
	.acrossTab li a:hover span {
		color:#282828;
	}
	.acrossTab li a:hover em {
		background-position:right -90px
	}

	.acrossTab li .router-link-exact-active {
		background-position:0 -120px;
	}
	.acrossTab li .router-link-exact-active span {
		color:#fff;
	}

	.acrossTab li .router-link-exact-active em {
		background-position:right -150px;
		z-index:99
	}

	.acrossTab li a i {
		position:absolute;
		display:block;
		width:13px;
		height:13px;
		top:50%;
		margin-top:-6px;
		right:5px;
		font-size:0;
		line-height:0;
		cursor:pointer;
		background-image:url("../static/img/acrossTab-close.png");
		background-repeat:no-repeat;
		background-position:0 0
	}

	.acrossTab li a i:hover {
		background-position:0 bottom
	}

	.Hui-tabNav .acrossTab li a {
		padding:0 30px;
	}

	.Hui-tabNav {
		height:35px;
		padding-right:75px;
		overflow:hidden;
		position:relative;
		background-color:#fff;
	}

	.Hui-tabNav-more {
		position:absolute;
		right:0px;
		width:78px;
		top:4px;
		display:none
	}

	.Hui-tabNav-more a {
		padding: 2px 12px;
		font-size:18px;
		color:#005fc6;
		border-bottom:none;
	}

	#main-content{
		background-color:#e8e8e8;
		padding-right:0;
	}

	/*event popular style*/
	.main-header ul .event-item {
		border-bottom:1px solid #e6e6e6;
		height:70px;
	}

	.main-header ul .event-item .event-header,.main-header ul .alarm-item .alarm-header {
		margin-left:20px;
		height:26px;
		line-height:26px;
	}

	.main-header ul .event-item .event-license,.main-header ul .alarm-item .alarm-license {
		color:#333;
		font-size:12px;
	}

	.main-header ul .event-item .event-message,.main-header ul .alarm-item .alarm-message {
		color:#ffc070;
		font-size:12px;
	}

	.main-header ul .event-item .event-trackTime,.main-header ul .alarm-item .alarm-trackTime {
		color:#b8b8b8;
		float:right;
		margin-right:8px;
		font-size:12px;
	}

	.main-header ul .event-item .event-location,.main-header ul .alarm-item .alarm-location {
		color:#254068;
		font-size:12px;
		height:18px;
		line-height:18px;
		margin-left:24px;
	}

	.main-header ul .alarm-item .alarm-warn {
		color:#999;
		font-size:12px;
		min-height:42px;
		line-height:20px;
		margin-left:24px;
		text-indent:2em;
	}

	.main-header ul .alarm-item {
		padding-bottom:5px;
		margin:0 5px;
		border-bottom:1px solid #e6e6e6;
	}

	.main-header ul .alarm-item .alarm-deal-opinion {
		margin:9px 0 0 10px;
		width:380px;
		height:74px;
		background-color:#f5f5f5;
	}

	.main-header ul .alarm-item .alarm-deal-opinion>textarea {
		width:290px;
		height:60px;
		resize:none;
		margin:7px 0 0 20px;
		border-color:transparent;
		border-radius:3px;
		font-size:12px;
		color:#ccc;
	}

	.main-header ul .alarm-item .alarm-deal-opinion>.alarm-operation-btnList {
		float:right;
		margin:15px 15px 0 0;
	}
	.alarm-operation-btnList .alarm-operation-btn {
		border:none;
		font-size:12px;
		width:40px;
		height:20px;
		display:block;
		margin-bottom:3px;
		border-radius:3px;
		color:#fff;
	}

	.alarm-operation-btnList .submitIdea {
		background-color:#427dbe;
	}

	.alarm-operation-btnList .dropOut {
		background-color:#b9b9b9;
	}

	.main-header ul .event-item .btn-list .btn-item,.main-header ul .messages-item .btn-list .btn-item,.main-header ul .alarm-item .btn-list .btn-item {
		width:60px;
		height:20px;
		line-height:20px;
		border:none;
		color:#fff;
	}

	.main-header ul .event-item .btn-list {
		float:right;
		margin-right:14px;
		font-size:12px;
	}
	.main-header ul .alarm-item .btn-list {
		font-size:12px;
		margin-left:255px;
	}
	.main-header ul .messages-item .btn-list {
		margin-right:14px;
		font-size:12px;
	}
	.main-header ul .event-item .btn-list .lookOver,.main-header ul .alarm-item .btn-list .dealWith {
		background-color:#2076d4;
	}

	.main-header ul .event-item .btn-list .ignore,.main-header ul .alarm-item .btn-list .ignore {
		background-color:#f3a511;
	}

	.main-header ul .alarm-item .btn-list .delete {
		background-color:#bababa;
	}

	/*messages popular style*/
	.main-header ul .messages-item {
		height:110px;
		border-bottom:1px solid #f1f1f1;
		margin:0 10px;
	}
	.main-header ul .messages-item .messages-img {
		float:left;
		width:115px;
		margin:5px 0 0 5px;
		height:95px;
		border:1px solid #cdcdcd;
		border-radius:3px;
		display:flex;
		justify-content:center;
		align-items:center;
	}
	.main-header ul .messages-item .messages-img img {
		display:block;
		width:107px;
		height:87px;
	}
	.main-header ul .messages-item .messages-content {
		float:right;
		width:250px;
		height:100%;
		margin-left:10px;
	}
	.msg-c-header {
		height:24px;
		line-height:24px;
	}
	.msg-c-header .content-title {
		color:#363636;
		margin:5px 0 0;
		float:left;
		width:180px;
		height:24px;
		line-height:24px;
		text-overflow:ellipsis;
		overflow:hidden;
		white-space:nowrap;
	}
	.msg-c-header .content-time {
		color:#c7c7c7;
		float:right;
		font-size:12px;
		margin-top:5px;
	}

	.msg-c-content {
		height:76px;
		position:relative;
	}
	.msg-c-content .c-content {
		text-indent:2em;
		font-size:12px;
		max-width:250px;
		display:inline-block;
		cursor:pointer;
	}
	.main-header ul .messages-item .btn-list {
		position:absolute;
		right:0;
		bottom:0;
	}
	.main-header ul .messages-item .btn-list .reader {
		background-color:#f8906d;
	}
	.main-header ul .messages-item .btn-list .delete {
		background-color:#bababa;
	}
	.navbar-nav > .msg-menu > .dropdown-menu > li.footer > .allRead {
		background-color:#81bbf9;
		color:#fff!important;
		border-bottom:none;
		height:40px;
		line-height:25px;
		font-size:14px;
	}

	/*系统切换样式*/
	.system-switchover {
		box-shadow:4px 4px 6px rgba(0,0,0,0.5);
	}
	.syetem-flex {

	}
	.system-item {
		position:relative;
		width:30%;
		height:140px;
		/*background-color:red;*/
		float:left;
		margin:30px 0 10px 2.4%;
	}
	.system-detail {
		width:100%;
		height:100px;
	}
	.modal-system{
		position:absolute;
		top:0;
		left:0;
		width:100%;
		height:100px;
		background-color:rgba(192,192,192,.5);
	}
	.system-detail:hover{
		-webkit-box-shadow:3px 10px 10px  rgba(0,0,0,.5);
		-moz-box-shadow:3px 10px 10px  rgba(0,0,0,.5);
		box-shadow:3px 10px 10px  rgba(0,0,0,.5);
	}
	.border-gradual:after {
		content:"";
		width:100%;
		height:4px;
		position:relative;
		display:block;
		bottom:-100px;
		left:0;
	}
	.border-gradual-orange:after {
		background:#d5660f;
		filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#d5660f', endColorstr='#fdc367',gradientType=0);
		background: -moz-linear-gradient(left, #d5660f 0%, #fdc367 100%);
		background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #d5660f), color-stop(100%, #fdc367));
		background: -webkit-linear-gradient(left, #d5660f 0%, #fdc367 100%);
		background: -o-linear-gradient(left, #d5660f 0%, #fdc367 100%);
		background: -ms-linear-gradient(left, #d5660f 0%, #fdc367 100%);
		background: linear-gradient(to right, #d5660f 0%, #fdc367 100%);
	}
	.border-gradual-blue:after {
		background:#3fa4ae;
		filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#3fa4ae', endColorstr='#7ebfef',gradientType=0);
		background: -moz-linear-gradient(left, #3fa4ae 0%, #7ebfef 100%);
		background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #3fa4ae), color-stop(100%, #7ebfef));
		background: -webkit-linear-gradient(left, #3fa4ae 0%, #7ebfef 100%);
		background: -o-linear-gradient(left, #3fa4ae 0%, #7ebfef 100%);
		background: -ms-linear-gradient(left, #3fa4ae 0%, #7ebfef 100%);
		background: linear-gradient(to right, #3fa4ae 0%, #7ebfef 100%);
	}
	.border-gradual-purple:after {
		background:#8482b3;
		filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#8482b3', endColorstr='#7098df',gradientType=0);
		background: -moz-linear-gradient(left, #8482b3 0%, #7098df 100%);
		background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #8482b3), color-stop(100%, #7098df));
		background: -webkit-linear-gradient(left, #8482b3 0%, #7098df 100%);
		background: -o-linear-gradient(left, #8482b3 0%, #7098df 100%);
		background: -ms-linear-gradient(left, #8482b3 0%, #7098df 100%);
		background: linear-gradient(to right, #8482b3 0%, #7098df 100%);
	}
	.border-gradual-green:after {
		background:#498e46;
		filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#498e46', endColorstr='#dbde5c',gradientType=0);
		background: -moz-linear-gradient(left, #498e46 0%, #dbde5c 100%);
		background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #498e46), color-stop(100%, #dbde5c));
		background: -webkit-linear-gradient(left, #498e46 0%, #dbde5c 100%);
		background: -o-linear-gradient(left, #498e46 0%, #dbde5c 100%);
		background: -ms-linear-gradient(left, #498e46 0%, #dbde5c 100%);
		background: linear-gradient(to right, #498e46 0%, #dbde5c 100%);
	}
	.system-icon {
		width:20%;
		float:left;
	}
	.system-icon img {
		cursor:pointer;
		width:100%;
	}
	.system-content {
		width:68%;
		float:left;
		margin-left:12px;

	}
	.system-name {
		font-size:14px;
		color:#000;
	}
	.system-intro {
		max-height:70px;
		margin-top:5px;
		overflow:hidden;
		font-size:12px;
		color:#5a5a5a;
	}
	.system-default {
		text-align:right;
	}
</style>
