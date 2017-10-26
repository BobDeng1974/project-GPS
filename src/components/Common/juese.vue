<template xmlns:v-popover="http://www.w3.org/1999/xhtml">
	<section>

		<!-- 新增角色-->
		<div class='jue'>
			<el-dialog title='_角色管理_-_新增_' :visible.sync="isShowAddRole" top="25%" custom-class="addroledialog">
				<el-form :model="addRoleForm" :rules="rules" ref="addRoleForm" label-width="110px" >
					<el-row>
						<el-col :span="10">
							<el-form-item label="_角色名称_" prop="FName" :rules="{required: true, message: '_角色名称不能为空_'}">
								<el-input v-model="addRoleForm.FName"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12" >
							<el-form-item label="_简称_" prop="FSimpleName" :rules="{required: true, message: '_角色简称不能为空_'}" label-width="160px">
								<el-input v-model="addRoleForm.FSimpleName"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="2"></el-col>
					</el-row>
					<el-row>
						<el-col :span="10">
							<el-form-item label="_描述_" prop="FDescription">
								<el-input type="textarea" v-model="addRoleForm.FDescription" :maxlength="200" :rows="2"
										  placeholder='_最多输入_200_字_'></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="submitForm('addRoleForm')">_保存_</el-button>
					<el-button @click="resetForm('addRoleForm')" type="button" class='el-button el-button--default cancel el-button--primary'>_重置_</el-button>
				</div>
			</el-dialog>
		</div>
		<!--修改角色-->
		<div class='jue'>
			<el-dialog title='_角色管理_-_修改_' :visible.sync="isShowEditRole" top="25%" custom-class="editroledialog">
				<el-form :model="editRoleForm" :rules="rules" ref="editRoleForm" label-width="110px" >
					<el-row>
						<el-col :span="10">
							<el-form-item label="_角色名称_" prop="FName" :rules="{required: true, message: '_角色名称不能为空_'}">
								<el-input v-model="editRoleForm.FName"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12" >
							<el-form-item label="_简称_" prop="FSimpleName" :rules="{required: true, message: '_角色简称不能为空_'}" label-width="160px">
								<el-input v-model.number="editRoleForm.FSimpleName"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="2"></el-col>
					</el-row>
					<el-row>
						<el-col :span="10">
							<el-form-item label="_描述_" prop="FDescription">
								<el-input type="textarea" v-model="editRoleForm.FDescription" :maxlength="200" :rows="2"
										  placeholder='_最多输入_200_字_'></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="submitForm('editRoleForm')">_保存_</el-button>
					<el-button @click='isShowEditRole=false' type="button" class='el-button el-button--default cancel el-button--primary'>_取消_</el-button>
					<!-- <el-button @click="resetForm('editRoleForm')">_重置_</el-button> -->
				</div>
			</el-dialog>
		</div>
		<!--角色配置菜单-->
		<div class='menudialog'>
		 	<el-dialog title="_角色菜单设置_" :visible.sync="isShowRoleMenuConfig" custom-class="rolemenuconfigdialog" size="tiny">
			<el-tree
				:data="allMenuList"
				show-checkbox
				node-key="id"
				ref="tree"
				:default-expand-all="true"
				:default-checked-keys="checkedKeysArr"
				:render-content="renderContent"
				:props="defaultProps">
			</el-tree>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="submitRoleMenu">_保存_</el-button>
				<el-button @click="closeRoleMenuConfig" type="button" class='el-button el-button--default cancel el-button--primary'>_取消_</el-button>
			</div>
		    </el-dialog>
		</div>

		<div id="operate_wrapper">
			<div class='box-header'>
				<div class="leftbtn">
					<el-button type="primary" icon="edit" size="small" @click='isShowAddRole=true'><span
						style="color: white">_新建_</span>
					</el-button>
					<el-button type="primary" icon="caret-right" size="small" @click='changeStatus(true)'>_启用_
					</el-button>
					<el-button type="primary" icon="circle-close" size="small" @click='changeStatus(false)'>_禁用_
					</el-button>
					<!-- <el-button type="primary" icon="circle-close" size="small" @click='getAccountMenuList'>_获取_
					</el-button> -->
					<!--<el-button type="primary" icon="delete" size="small" @click='ondelete'>_删除_</el-button>-->
				</div>
				<div class="rightinput" style="position: relative;margin-right:30px">
					<input type="text" placeholder="_请输入角色名称_" v-model="searchFKey" @keyup.enter="doQuery">
					<button class="glyphicon glyphicon-search searchBtn" style="height: 28px;position:absolute;top:14px;right:20px"
							@click="doQuery"></button>
				</div>
			</div>
		</div>
		<!--角色列表-->
		<div id="el_table_wrap" class="el_table_wrap">
			<el-table class="roleList" :data="RoleList" ref="multipleTable" @selection-change="handleSelectionChange"
					  :height="table_height" stripe style="width: 100%;">
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column prop="RowNo" label="_序号_" width="80"></el-table-column>
				<el-table-column label="_操作_" width="90">
					<template scope="scope">
						<el-button type="text" size="small" @click="menuConfig(scope.$index, scope.row)"><i
							class="el-icon-setting"></i></el-button>
						<el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)"><i
							class="el-icon-edit"></i></el-button>
						<el-button type="text" size="small" @click="ondelete(scope.$index,scope.row)"><i
							class="el-icon-delete"></i></el-button>
					</template>
				</el-table-column>
				<el-table-column class-name="rolestate" label="_状态_" width="100">
					<template scope="scope">
						<el-switch on-text="" off-text="" v-model="scope.row.FStatus"
								   @change='onlyChange(scope.$index, scope.row)'></el-switch>
					</template>
				</el-table-column>
				<el-table-column prop="FName" label="_角色名称_" width="120" show-overflow-tooltip></el-table-column>
				<!--<el-table-column prop="FType" label="_角色类型_" width="180" show-overflow-tooltip></el-table-column>-->
				<el-table-column prop="FSimpleName" label="_简称_" width="150"show-overflow-tooltip></el-table-column>
				<el-table-column prop="FUserName" label="_创建用户名称_" width="120" show-overflow-tooltip></el-table-column>
				<el-table-column prop="FLastUpdateTime" label="_最后修改时间_" width="180" show-overflow-tooltip></el-table-column>
				<el-table-column prop="FShortName" label="_公司简称_" width="150" show-overflow-tooltip></el-table-column>
				<el-table-column prop="FDescription" show-overflow-tooltip label="_描述_" width="180">
				</el-table-column>
				<el-table-column prop="" label="" min-width="1"></el-table-column>
			</el-table>
		</div>
		<!--分页-->
		<div class="pagination" id='pagination'>
			<div class="block">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="pageIndex"
					:page-sizes="[10, 20, 30]"
					:page-size="pageSize"
					layout="prev, pager, next, jumper,total,sizes"
					:total="FTotalCount">
				</el-pagination>
			</div>
		</div>
	</section>
</template>
<script >
	import zuzhiSelectDialog from './zuzhiSelectDialog.vue'
	export default {
		data() {
			return {
				fguid: '',
				bool: false,
				pageSize: 20,
				pageIndex: 1,
				FTotalCount: 0,
				dialogVisible: false,
				FGUIDs: '',
				table_height: null,
				//anycheck: [],
				relatierol: false,
				isShowAddRole: false,
				isShowEditRole: false,
				isShowRoleMenuConfig: false,
				//树形控件数据
				allMenuList: [],
				checkedKeysArr:[],
				defaultProps: {
					children: 'children',
					label: 'label'
				},
				RoleGUID:"",
				tempparentmenu:[],



				searchFKey: '',
				//新增角色
				addRoleForm: {
					FName: '',
					FSimpleName: '',
					FDescription: '',
					FStatus: 1,
					FGUID:"",
				},
				editRoleForm:{
					FName: '',
					FSimpleName: '',
					FDescription: '',
					FStatus: '',
				},
				rules: {

				},
				allcheck: {
					ischeck: false,
				},
				RoleList: [],
			}
		},
		props: {
			screenHeight: Number
		},
		components: {
			zuzhiSelectDialog
		},
		computed: {},
		mounted(){
			setTimeout(() => {
				this.adjustPage();
			}, 100);
			//右边搜索区域取消默认
			$('form').on("click", function (e) {
				e.stopPropagation();
			});
			var _this = this;
			this.doQuery();
			this.getAccountMenuList();
		},
		methods: {
			renderContent(h, { node, data, store }) {
				return (
					<span>
						<span>
							<span>{node.label}</span>
						</span>
						<span v-show={node.data.id==="d953ddfb-a9ed-47d0-ac87-feb80e832ac3"} style="color:orange;">
							(选中后具备开锁权限)
						</span>
					</span>);
			},
			timeChange(time){
				var time1 = Date.parse(new Date(time));
				var uom1 = new Date(time1);
				var month1 = (uom1.getMonth() + 1).toString().length == 1 ? "0" + (uom1.getMonth() + 1).toString() : (uom1.getMonth() + 1);
				var day1 = uom1.getDate().toString().length == 1 ? "0" + uom1.getDate() : uom1.getDate();
				return uom1.getFullYear() + '-' + month1 + '-' + day1;
			},
			handleSizeChange(val) {
				this.pageSize = val;
				this.doQuery();
			},
			handleCurrentChange(val) {
				this.pageIndex = val;
				this.doQuery();
			},
			adjustPage(){
				this.table_height = this.elementsFlex("el_table_wrap", "main-content", "operate_wrapper", "pagination", true) + 8;
			},
			//重置表单
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			//搜索框查询
			doQuery(){
				let _this = this;
				let TokenID = this.$store.state.FTokenID;
				let FKey = this.searchFKey;
				let PageSize = this.pageSize;
				let pageIndex = this.pageIndex;
				$.ajax({
					"url": "web/Common/Common_Admin",
					"cache": false,
					"async": true,
					"type": "post",
					"dataType": "json",
					"contentType": "application/json; charset=utf-8",
					"data": '{"FTokenID": "' + TokenID + '","FAction": "QueryAdminRoleList","FVersion": "1.0.0","FKey":"' + FKey + '","FPageSize":"' + PageSize + '","FPageIndex":"' + pageIndex + '"}',
					success: function (data) {
						//console.log(data);
						if(data.Result=="200"){
							var Fobj = data;
							_this.RoleList = [];
							$.each(Fobj.FObject.Table1, function (index, obj) {
								//obj.FDrivingStartDate=obj.FDrivingStartDate.replace(/T/ig,' ').substring(0,10);
								//parseGMT
								obj.FLastUpdateTime=_this.parseGMT(obj.FLastUpdateTime.replace(/T/ig,' ').substring(0,19));
								if (obj.FStatus == 1) {
									obj.FStatus = true
								} else {
									obj.FStatus = false
								}
								//空白位补'--'
                                obj.FDescription=obj.FDescription?obj.FDescription:'--';
								_this.RoleList.push(obj);
							});
							_this.FTotalCount = Fobj.FObject.Table[0].FTotalCount;
							//搜索表单重置
							//_this.resetForm('addRoleForm');
							_this.dialogVisible = false;
						}else {
							_this.message('_角色列表获取失败_', 'error');
						}

					},
					error: function () {
						console.log('_请求失败_')
					}
				});
			},
			//提示信息
			message(msg, type){
				this.$message({
					showClose: true,
					message: msg,
					type: type
				});
			},
			//判断是否有数据被选中
			handleSelectionChange(val) {
				this.anycheck = val;
				//console.log(this.anycheck);
				let arrFGUID = [];
				this.anycheck.forEach(obj=> {
					arrFGUID.push(obj.FGUID);
				})
				this.FGUIDs = arrFGUID.join(',');
			},
			//删除单选或者多选
			ondelete(index, rows) {
				let TokenID = this.$store.state.FTokenID;
				let _this = this;
				let Fgid = '';
				if (rows == undefined) {  //点击多选删除
					if (this.anycheck.length == 0) {
						_this.message('_请先勾选_', 'warning');
					} else {
						Fgid = _this.FGUIDs;
					}
				} else {              //点击单选删
					Fgid = rows.FGUID;
				}
				//console.log(rows);
				//console.log(Fgid);
				if (Fgid) {  //勾选或者选中某行则执行删除操作
					this.$confirm('_此操作将永久删除_,_是否继续_?', '_提示_', {
							confirmButtonText: '_确定_',
							confirmButtonClass: "search",
							cancelButtonText: '_取消_',
							cancelButtonClass: "cancel el-button--primary",
							type: 'warning'
				        })
						.then(() => {
							$.ajax({
								"url": "web/Common/Common_Admin",
								"cache": false,
								"async": true,
								"type": "post",
								"dataType": "json",
								"contentType": "application/json; charset=utf-8",
								"data": '{"FTokenID": "' + TokenID + '","FAction": "DeleteAdminRoleByFGUID","FVersion": "1.0.0","FGUID":"' + Fgid + '"}',
								success: function (data) {
									//console.log(data);
									if(data.Result=="200"){
										_this.doQuery();
										_this.message('_删除成功_', 'success');
									}else {
										_this.message('_删除失败_', 'error');
									}

								},
								error: function () {
									_this.message('_删除失败_', 'error');
								}
							});
						})
						.catch(() => {
							this.$message.info('_已取消操作_!');
							_this.anycheck = [];
							//_this.doQuery();
							this.$refs.multipleTable.clearSelection();
						});
				} else {
					return false
				}
			},
			//多选修改设备状态
			changeStatus: function (parm) {
				var _this = this;
				if (this.anycheck.length == 0) {
					this.message('_请先勾选_', 'warning');
				} else {
					let TokenID = this.$store.state.FTokenID;
					let FGUIDs = this.FGUIDs;
					//console.log(this.anycheck);
					let FState = parm ? 1 : 0;
					$.ajax({
						"url": "web/Common/Common_Admin",
						"cache": false,
						"async": true,
						"type": "post",
						"dataType": "json",
						"contentType": "application/json; charset=utf-8",
						"data": '{"FTokenID":"' + TokenID + '","FAction":"UpdateAdminRoleStatus","FGUIDs":"' + FGUIDs + '","FVersion":"1.0.0","FState":"' + FState + '"}',
						success: function (data) {
							//console.log(data);
							//_this.RoleList = [];
							_this.doQuery();
							_this.message('_修改成功_', 'success');
							_this.anycheck = [];
						},
						error: function () {
							console.log('_请求失败_')
						}
					});
				}
			},
			//单选修改设备状态
			onlyChange(index, row){
				let _this = this;
				let TokenID = this.$store.state.FTokenID;
				let FState = row.FStatus ? 1 : 0;
				let FGUIDs = row.FGUID;
				$.ajax({
					"url": "web/Common/Common_Admin",
					"cache": false,
					"async": true,
					"type": "post",
					"dataType": "json",
					"contentType": "application/json; charset=utf-8",
					"data": '{"FTokenID":"' + TokenID + '","FAction":"UpdateAdminRoleStatus","FGUIDs":"' + FGUIDs + '","FVersion":"1.0.0","FState":"' + FState + '"}',
					success: function (data) {
						//console.log(data);
						if(data.Result!="200"){
							_this.RoleList[index].FStatus=_this.RoleList[index].FStatus;
						}else {
							_this.message('_修改成功_', 'success');
							_this.anycheck=[];
				            _this.$refs.multipleTable.clearSelection();
						}
						//_this.doQuery();

					},
					error: function () {
						console.log('_请求失败_')
					}
				});
			},
			//编辑数据
			handleEdit(index, row) {
				this.isShowEditRole=true;
				//console.log(row);
				this.editRoleForm.FSimpleName=row.FSimpleName;
				this.editRoleForm.FName=row.FName;
				//this.editRoleForm.FDescription=row.FDescription;
				this.editRoleForm.FDescription=(row.FDescription=='--')?'':row.FDescription;
				this.editRoleForm.FGUID=row.FGUID;
	            this.editRoleForm.FStatus=row.FStatus?1:0;
			},
			//查询角色对应菜单列表
			menuConfig(index,row){
				let _this=this;
				_this.RoleGUID=row.FGUID;
				_this.allMenuList=[];

				let TokenID = this.$store.state.FTokenID;
				//console.log(_this.RoleGUID);
				$.post("web/Common/Common_Admin",{
					FTokenID:TokenID,
					FAction:"QueryAdminMenuListByRoleGUID",
					FRoleGUID:_this.RoleGUID,
					FVersion:"1.0.0"
				},function(data){
					if(data.Result=="200"){
						//console.log(data);
						_this.checkedKeysArr=[];

						_this.allMenuList=_this.tempparentmenu;
						_this.isShowRoleMenuConfig=true;
						for (let i = 0; i < data.FObject.length; i++) {
							var obj = data.FObject[i];
							/*||obj.FGUID=="c94bdd30-da5e-4c54-9352-aa65bdb81f0b"*/
							if(obj.FMenuLevle=="2"){
								_this.checkedKeysArr.push(obj.FGUID);
							}
						}
						//console.log(_this.checkedKeysArr);
						//_this.checkedKeysArr=["2612fea0-4deb-4656-8104-392500dcc956","ac3aa8f2-a2a8-49b2-a6c9-cb00743dce71","48e2c64c-f903-4e29-a0fe-d4cf3a3ab998","c76c0762-0231-48ee-9ba9-18a514f3e2cb"];

					}
					//console.log(_this.checkedKeysArr);
				});
			},
			//获取该登录账号拥有的菜单
			getAccountMenuList(){
				let SystemType = this.$store.state.choiceSystemID;
				let TokenID = this.$store.state.FTokenID;
				let _this=this;
				$.post("web/Common/Common",{
					FTokenID:TokenID,
					FAction:"QueryMenuList",
					FVersion:"1.0.0"
				},function(data){
					//console.log(data);
					if(data.Result=="200"){
						for (let i = 0; i < data.FObject.length; i++) {
							let obj=data.FObject[i];
							/*&&obj.FSystemType==SystemType*/
							//不显示首页菜单，每个模块都有
							if(obj.FMenuLevle=="1"&&(obj.FSystemType==SystemType||obj.FSystemType=="0")||(SystemType==4&&obj.FGUID=="f52beec6-17b1-4860-81bd-b891920da9a4")){
								_this.tempparentmenu.push({
									id:obj.FGUID,
									label:_this.translateMenu(obj.FMenuName),
									children:[],
								})
							}
						}
						for (let i = 0; i < data.FObject.length; i++) {
							var obj = data.FObject[i];
							for (let j = 0; j < _this.tempparentmenu.length; j++) {
								var obj_p = _this.tempparentmenu[j];
								if(obj.FMenuLevle=="2"&&obj_p.id==obj.FParentGUID){
									obj_p.children.push({
										id:obj.FGUID,
										p_id:obj_p.id,
										label:_this.translateMenu(obj.FMenuName),
										children:[],
									});
								}
							}
						}
						//console.log(_this.tempparentmenu);

						//_this.checkedKeysArr=["d19950b7-b534-4787-8029-392494267ea2","ac3aa8f2-a2a8-49b2-a6c9-cb00743dce71","2612fea0-4deb-4656-8104-392500dcc956"];
						//_this.checkedKeysArr=["2612fea0-4deb-4656-8104-392500dcc956","ac3aa8f2-a2a8-49b2-a6c9-cb00743dce71","48e2c64c-f903-4e29-a0fe-d4cf3a3ab998","c76c0762-0231-48ee-9ba9-18a514f3e2cb"];
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
			//提交角色菜单设置
			submitRoleMenu(){
				let TokenID = this.$store.state.FTokenID;
				let _this=this;
				let CheckedNodes=this.$refs.tree.getCheckedNodes();
				let CheckedKeys=this.$refs.tree.getCheckedKeys();
				//console.log(CheckedNodes);
				//console.log(this.allMenuList);
				for (let j = 0; j < CheckedNodes.length; j++) {
					var obj_n = CheckedNodes[j];
					if(obj_n.children.length==0){
						//console.log(obj_n.p_id);
						CheckedKeys.push(obj_n.p_id);
					}
				}
				let newArr=[];
				for(var i =0;i<CheckedKeys.length-1;i++){
					if(newArr.indexOf(CheckedKeys[i]) == -1){
						newArr.push(CheckedKeys[i]);
					}
				}
				//每次保存都把首页加进去
				//newArr.push("c94bdd30-da5e-4c54-9352-aa65bdb81f0b");
				let newStr=newArr.join(",");
				//console.log(newArr);
				//console.log(_this.RoleGUID);
				//console.log(newStr);
				$.post("web/Common/Common_Admin",{
					FTokenID:TokenID,
					FAction:"AddAdminRoleAllMenu",
					FRoleGUID:_this.RoleGUID,
					FMenuGUIDs:newStr,
					FVersion:"1.0.0"
				},function(data){
					//console.log(data);
					if(data.Result="200"){
						_this.message('_设置成功_', 'success');
					}else {
						_this.message('_设置失败_', 'error');
					}
					_this.isShowRoleMenuConfig=false;
				});
			},
			//关闭角色菜单设置dialog
			closeRoleMenuConfig(){
				this.isShowRoleMenuConfig=false;
			},
			//新建角色
			submitForm(formName) {
				var _this = this;
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let TokenID = this.$store.state.FTokenID;
						//let JsonObj=this[formName];
						let FName;
						let FSimpleName;
						let FDescription;
						let FStatus;
						let FGUID;
						let Action="";
						if(formName=="addRoleForm"){
							FName = this.addRoleForm.FName;
							FSimpleName = this.addRoleForm.FSimpleName;
							FDescription = this.addRoleForm.FDescription;
							FStatus = this.addRoleForm.FStatus;
							FGUID = this.addRoleForm.FGUID;
							Action="AddAdminRole";
						}else {
							FName = this.editRoleForm.FName;
							FSimpleName = this.editRoleForm.FSimpleName;
							FDescription = this.editRoleForm.FDescription;
							FStatus = this.editRoleForm.FStatus;
							FGUID = this.editRoleForm.FGUID;
							Action="UpdateAdminRole";
						}
						let JsonObj = {
							FName: FName,
							FSimpleName: FSimpleName,
							FDescription: FDescription,
							FStatus: FStatus
						}
						var JsonStr;
						JsonStr = JSON.stringify({
							"FGUID":FGUID,
							"FTokenID": TokenID,
							"FAction": Action,
							"FT_AdminRole": JsonObj,
							"FVersion": "1.0.0"
						});
						$.ajax({
							"url": "web/Common/Common_Admin",
							"cache": false,
							"async": true,
							"type": "post",
							"dataType": "json",
							"contentType": "application/json; charset=utf-8",
							"data": JsonStr,
							success: function (data) {
								//console.log(data);
								if(data.Result=="200"){
									_this.doQuery();
									_this.isShowAddRole=false;
									_this.isShowEditRole=false;
									if(formName=="addRoleForm"){
										_this.message('_角色新增成功_', 'success');
									}else if(formName=="editRoleForm"){
										_this.message('_角色修改成功_', 'success');
									}
								}else {
									if(formName=="addRoleForm"){
										_this.message('_角色新增失败_', 'error');
									}else if(formName=="editRoleForm"){
										_this.message('_角色修改失败_', 'error');
									}
								}
							},
							error: function () {
								console.log('_请求失败_')
							}
						});
					}
					else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			//编辑新表单
			submitForm11(formName) {
				var _this = this;
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let TokenID = this.$store.state.FTokenID;
						let FDriverName = this.objDetail.FDriverName;
						let FDrivingExp = this.objDetail.FDrivingExp;
						let FIdentityID = this.objDetail.FIdentityID;
						let FSex = this.objDetail.FSex;
						let FDrivingNumber = this.objDetail.FDrivingNumber;
						let FDrivingType = this.objDetail.FDrivingType;
						let FStatus = this.objDetail.FStatus;
						let FDrivingStartDate = this.timeChange(this.objDetail.FDrivingStartDate);
						let FDrivingEndDate = this.timeChange(this.objDetail.FDrivingEndDate);
						let FPhoneNumber = this.objDetail.FPhoneNumber;
						let FDescription = this.objDetail.FDescription;
						var FGUID = this.fguid;
						let JsonObj = {
							FDriverName: FDriverName,
							FDrivingExp: FDrivingExp,
							FIdentityID: FIdentityID,
							FSex: FSex,
							FDrivingNumber: FDrivingNumber,
							FStatus: FStatus,
							FDrivingType: FDrivingType,
							FDrivingStartDate: FDrivingStartDate,
							FDrivingEndDate: FDrivingEndDate,
							FPhoneNumber: FPhoneNumber,
							FDescription: FDescription,
						};
						var JsonStr;
						JsonStr = JSON.stringify({
							"FTokenID": TokenID,
							"FAction": "UpdateAdminDriver",
							"FGUID": FGUID,
							"FT_AdminDriver": JsonObj,
							"FVersion": "1.0.0"
						});
						$.ajax({
							"url": "web/Common/Common_Admin",
							"cache": false,
							"async": true,
							"type": "post",
							"dataType": "json",
							"contentType": "application/json; charset=utf-8",
							"data": JsonStr,
							success: function (data) {
								console.log(data);
								_this.RoleList = [];
								_this.doQuery();
								_this.editEquipment = false;
							},
							error: function () {
								console.log('_请求失败_')
							}
						});
					}
					else {
						console.log('error submit!!');
						return false;
					}
				});
			},
		},
		watch: {
			screenHeight () {
				this.adjustPage();
			},
			dialogVisible: function () {
				if (this.dialogVisible) {
					$(".mymodal").css('visibility', 'visible');
				} else {
					$(".mymodal").css('visibility', 'hidden');
				}
			},
			isShowAddRole: {
				handler () {
					this.addRoleForm = {
							FName: '',
							FSimpleName: '',
							FDescription: '',
							FStatus: 1,
					}
				},
				//deep: true
			},
		},
		created: function () {

		}
	}
</script>
<style scoped>
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

	.role_menu_config {
		display:inline-block;
		width:14px;
		height:14px;
		background-image:url(/static/img/role_menu_config.png);
		background-repeat:no-repeat;
	}

	.leftbtn {
		float:left;
	}

	.rightinput {
		float:right;
		margin-right:10px;
	}

	.rightinput input {
		border:1px solid #1970cf;
		height:28px;
		border-radius:15px;
		box-shadow:none !important;
		width:180px;
		padding-left:10px;

	}

	.rightinput input:active {
		box-shadow:none !important;
		outline:none;
	}

	.rightinput input:focus {
		box-shadow:none !important;
		outline:none;
	}

	.searchBtn {
		border:none;
		background-color:white;
		margin:0 0 0 -40px;
		box-shadow:none;
		height:20px !important;
		outline:none;
	}

	.glyphicon-chevron-down {
		margin:0 0 0 30px;
		width:28px;
		height:28px;
		border-radius:50%;
		outline:none;
		background-color:white;
		border:1px solid #1970cf;
	}

	#el_table_wrap .el-button {
		padding:0;
	}

	.el-popover .el-form-item {
		margin-bottom:0px;
	}

	.el-form-item .el-input__inner {
		height:28px;
	}

	/* .el-dialog__body {
		margin:30px 0 0 0;
	} */
	.rolestate label {
		margin-bottom:1px;
	}
</style>
<style>
	/* .addroledialog .el-dialog__body,.editroledialog .el-dialog__body ,.rolemenuconfigdialog .el-dialog__body {
		padding-top:20px;
	} */
	.rolemenuconfigdialog .el-dialog__body {
		padding-top:20px;
	}
	.rolemenuconfigdialog .el-dialog__body {
		padding-bottom:10px;
	}
	.rolemenuconfigdialog .el-tree {
		max-height:360px;
		overflow:auto;
	}
	.menudialog .el-dialog{
		width:320px;
	}
	.jue .el-col{
	   height:55px;
	}
	@media (min-width:1600px) {   
		.jue .el-dialog--small {
		    width: 36%;
		} 
    }
    @media (min-width:1300px) and (max-width:1599px){
    	.jue .el-dialog--small {
		    width: 45%;
		} 
    }
    @media (min-width:1200px) and (max-width:1299px){
    	.jue .el-dialog--small {
		    width: 52%;
		} 
    }
    @media (max-width:1199px) {
		.jue .el-dialog--small {
		    width: 50%;
		} 
    } 
</style>