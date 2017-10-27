<!-- overtime_record.vue -->
<template xmlns:v-popover="http://www.w3.org/1999/xhtml">
	<!-- Main content -->
	<section class="user-page">

		<!-- 新增用户/编辑用户
		<el-dialog :title="isCreateUse?'_新增用户_':'_编辑用户_'" :visible.sync="adduser" >
			<el-form :model="oneUserData" :rules="rules" ref="oneUserData" class="demo-oneUserData" label-position="left">
				<el-row :gutter="15">
					<el-col :span="12">
						
					
						
					</el-col>
					<el-col :span="12">
						<el-form-item label="_所属公司_" prop="compony" label-width="100px">
							<el-select v-model="oneUserData.compony" filterable placeholder="_请选择公司_">
								<el-option
									v-for="item in companyList"
									:label="item.name"
									:value="item.ID">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="_默认车队_" label-width="100px"  prop="motorcade">
		
							<el-input v-model="oneUserData.motorcade"  placeholder="_请输入车队名称_"></el-input>
		
		
		<el-select v-model="oneUserData.motorcade" filterable placeholder="_请选择车队_">
								<el-option
									v-for="item in motorcadeList"
									:label="item.name"
									:value="item.ID">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="_角色名称_" label-width="100px"  prop="role">
							<el-select v-model="oneUserData.role" filterable placeholder="_请选择角色_">
								<el-option
									v-for="item in roleList"
									:label="item.name"
									:value="item.ID">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="_时差_" label-width="100px">
							<el-row :gutter="2">
								<el-col :span="7">
									<el-select v-model="oneUserData.timeZoneSign">
										<el-option
											v-for="item in timeZone.sign"
											:label="item"
											:value="item">
										</el-option>
									</el-select>
								</el-col>
								<el-col :span="7">
									<el-select v-model="oneUserData.hour" filterable>
										<el-option
											v-for="item in timeZone.hour"
											:label="item"
											:value="item">
										</el-option>
									</el-select>
		
								</el-col>
								<el-col :span="1">：</el-col>
								<el-col :span="8">
									<el-select v-model="oneUserData.minute">
										<el-option
											v-for="item in timeZone.minute"
											:label="item"
											:value="item">
										</el-option>
									</el-select>
		
								</el-col>
							</el-row>
						</el-form-item>
		<el-form-item label="_是否可选国家_" label-width="120px">
							<template>
								<el-radio class="radio" v-model="oneUserData.isChoiceCountry" label="true">_是_</el-radio>
								<el-radio class="radio" v-model="oneUserData.isChoiceCountry" label="false">_否_</el-radio>
							</template>
		
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button v-if="isCreateUse"  @click="resetoneUserData" type="button" class='el-button el-button--default cancel el-button--primary'>_重置_</el-button>
				<el-button v-if="isCreateUse" type="primary" @click="createUser">_创建_</el-button>
				<el-button v-if="!isCreateUse" type="primary" @click="redactSave">_保存_</el-button>
			</div>
		</el-dialog> -->
		<div class='midUser'>
	        <el-dialog :title="isCreateUse?'_新增用户_':'_编辑用户_'" :visible.sync="adduser" >
	        <!-- class="demo-ruleForm" -->
				<el-form :model="oneUserData" :rules="rules" ref="oneUserData" label-width="110px">
					<el-row>
						<el-col :span="10">
							<el-form-item label="_用户名_" prop="name" >
								<el-input v-model="oneUserData.name" :disabled="!isCreateUse" placeholder="_请输入用户名_"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="_所属公司_" prop="compony" label-width="160px">
								<el-select v-model="oneUserData.compony" filterable placeholder="_请选择公司_" style='width:100%'>
									<el-option
										v-for="item in companyList"
										:label="item.name"
										:value="item.ID">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="2"></el-col>
					</el-row>
					<el-row v-if="isCreateUse">
						<el-col :span="10">
							<el-form-item  label="_密码_" prop="pass" >
								<el-input v-model="oneUserData.pass" type='password'  placeholder="_请输入密码_"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="_确认密码_" prop="checkPass" label-width="160px">
								<el-input v-model="oneUserData.checkPass" type="password"  placeholder="_请确认密码_"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="2"></el-col>
					</el-row>
					<el-row>
						<el-col :span="10">
							<el-form-item label="_默认车队_"   prop="motorcade">
								<el-input v-model="oneUserData.motorcade"  placeholder="_请输入车队名称_"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="_角色名称_"  prop="role"  label-width="160px">
								<el-select v-model="oneUserData.role" filterable placeholder="_请选择角色_" style='width:100%'>
									<el-option
										v-for="item in roleList"
										:label="item.name"
										:value="item.ID"
										>
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="2"></el-col>
					</el-row>
					<el-row>
					    <el-col :span='24'>
							<el-form-item label="_系统权限_"  prop="FHaveSystemIds"  >
								<el-checkbox-group v-model="oneUserData.FHaveSystemIds">
								   	<el-checkbox label='1' name="FHaveSystemIds" v-if="(sysHave.indexOf('1')!==-1)||(sysHave.indexOf('0')!==-1)">_接甩挂_</el-checkbox>
								   	<el-checkbox label='2' name="FHaveSystemIds" v-if="(sysHave.indexOf('2')!==-1)||(sysHave.indexOf('0')!==-1)">_智能电子锁_</el-checkbox>
								   	<!-- <el-checkbox label='3' name="FHaveSystemIds">_冷链系统_</el-checkbox> -->
								   	<el-checkbox label='4' name="FHaveSystemIds" v-if="(sysHave.indexOf('4')!==-1)||(sysHave.indexOf('0')!==-1)">_车队管理_</el-checkbox>
								</el-checkbox-group>
							</el-form-item>
					    </el-col>
					
					</el-row>
					<el-row>
						<el-col :span="10">
							<el-form-item label="_默认系统_"   prop="FDefaultSystemId">
								<el-select v-model="oneUserData.FDefaultSystemId" placeholder="_请选择默认系统_" style='width:100%'>
									<el-option v-for="aa in FDefaultSystemIds" :key="aa.val" :label="aa.name" :value="aa.val" ></el-option> 
								</el-select>
							</el-form-item>
							<!-- <el-form-item label="_默认系统_"   prop="FDefaultSystemId">
								<el-select v-model.number="oneUserData.FDefaultSystemId" placeholder="_请选择默认系统_" style='width:100%'>
											                  	<el-option v-for="aa in oneUserData.FHaveSystemIds" :key="aa.val" :label="aa.name" :value="aa.val" ></el-option> 
											                </el-select>
							</el-form-item> -->
						</el-col>
						<!-- <el-col :span='12'>
							<div class='logoUP'>
								<el-form-item label='_系统_logo' prop="FSystemLogoURL" label-width="160px">
								    <span style='display:inline-block;width:135px;height:30px;'>
										<el-upload
											class="avatar-uploader"
											action="/Web/Common/FileUpload"
											:show-file-list="false"
											:on-error='uploadFailed'
											:before-upload="beforeAvatarUpload"
											:on-success="handleAvatarSuccess"
											:on-progress='onprogress'
											:data="{FAction:'FileUpload',FVersion:'1.0.0',FTokenID:'f4b204b4-2f7e-4700-bf3a-bd3b3ff258ca'}">
											<img v-if="imageUrl" :src="imageUrl" class="avatar" >
											<i v-else class="el-icon-plus avatar-uploader-icon" ></i>
										</el-upload>
									</span>
								</el-form-item>
							</div>
						</el-col> -->
						<el-col :span="12">
							<el-form-item label="_时差_" label-width="160px">
								<el-row >
									<el-col :span="8">
										<el-select v-model="oneUserData.timeZoneSign">
											<el-option
												v-for="item in timeZone.sign"
												:label="item"
												:value="item">
											</el-option>
										</el-select>
									</el-col>
									<el-col :span="7">
										<el-select v-model="oneUserData.hour" filterable>
											<el-option
												v-for="item in timeZone.hour"
												:label="item"
												:value="item">
											</el-option>
										</el-select>

									</el-col>
									<el-col :span="1">：</el-col>
									<el-col :span="8">
										<el-select v-model="oneUserData.minute">
											<el-option
												v-for="item in timeZone.minute"
												:label="item"
												:value="item">
											</el-option>
										</el-select>

									</el-col>
								</el-row>
							</el-form-item> 
						</el-col>
						<el-col :span="2"></el-col>
					</el-row>
					<el-row>
						<el-col :span="10">
							<el-form-item label="_描述_" prop="FDescription" >
									<el-input type="textarea" v-model="oneUserData.desc" :maxlength="120" :rows="2"
											  placeholder='_最多输入_120_字_'></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="_国家地区_"  prop="country" label-width="160px">
								<input type="text" id="quickFilterInput" v-model="oneUserData.country" class="el-input__inner" placeholder="_请输入国家英文名称_" />
							</el-form-item>
						</el-col>
						<el-col :span="2"></el-col>
					</el-row>
					<!-- <el-row>
						<el-col :span="10">
							<el-form-item label="_描述_" prop="FDescription" >
									<el-input type="textarea" v-model="oneUserData.desc" :maxlength="120" :rows="2"
											  placeholder='_最多输入_120_字_'></el-input>
							</el-form-item>
						</el-col>
					</el-row> -->
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button v-if="isCreateUse" type="primary" @click="createUser">_创建_</el-button>
					<el-button v-if="isCreateUse"  @click="resetoneUserData" type="button" class='el-button el-button--default cancel el-button--primary'>_重置_</el-button>
					<el-button v-if="!isCreateUse" type="primary" @click="redactSave">_保存_</el-button>
					<el-button v-if="!isCreateUse" @click='adduser=false' type="button" class='el-button el-button--default cancel el-button--primary'>_取消_</el-button>
				</div>
			</el-dialog>
		</div>
		<!-- 编辑密码弹框 -->
		<el-dialog title="_修改用户密码_" :visible.sync="editpass" size="init">
			<!-- <el-form :model="form"> -->
			<el-form :model="passwordData" :rules="passwordRules" ref="passwordData">
				<el-row>
					<el-form-item label="_用户名_" :label-width="formLabelWidth">
						<el-input v-model="passwordData.name" disabled></el-input>
					</el-form-item>
				</el-row>
				<el-row>
					<el-form-item label="_密码_" prop="pass" :label-width="formLabelWidth">
						<el-input v-model="passwordData.pass" type='password'  placeholder="_请输入新密码_"></el-input>
					</el-form-item>
				</el-row>
				 <el-row>
					<el-form-item label="_确认密码_" prop="checkPass" :label-width="formLabelWidth">
						<el-input v-model="passwordData.checkPass" type='password'  placeholder="_请输入密码_"></el-input>
					</el-form-item>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="savePassword">_确定_</el-button>
				<el-button  @click="editpass=false" type="button" class='el-button el-button--default cancel el-button--primary'>_取消_</el-button>
			</div>
		</el-dialog>

		<!-- 右侧搜索下拉框 -->
<!--
		<el-popover
			ref="popover4"
			placement="bottom-start"
			width="400"
			trigger="click">
			<el-form :model="formsec" ref="oneUserData2" label-width="100px">
				<el-form-item label="用户名">
					<el-input class="col-md-12" v-model="formsec.name"></el-input>
				</el-form-item>
				<el-form-item label="状态">
					<el-select class="col-md-12" v-model="formsec.zhuangtai" placeholder="请选择">
						<el-option label="已启用" value="use"></el-option>
						<el-option label="已禁用" value="forbidden"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="所属组织">
					&lt;!&ndash; <el-input class="col-md-12" v-model="formsec.zhuzi"></el-input> &ndash;&gt;
					<el-input v-model="formsec.zhuzi">
						<template slot="append"><span @click="OpenDialog()" style='cursor:pointer'>...</span></template>
					</el-input>
				</el-form-item>
				<el-form-item>

					<el-button @click="resetForm('oneUserData2')" type="cancel">_重置_</el-button>
					<el-button type="primary" @click="submitForm('oneUserData2')" >_提交_</el-button>
				</el-form-item>
			</el-form>
		</el-popover>
		<el-dialog title="关联角色" :visible.sync="relatierol">
			<el-transfer v-model="value1" :data="data"></el-transfer>
		</el-dialog>
-->
		<!--操作栏-->
		<div id="operate_wrapper">
			<div class='box-header'>
				<div class="leftbtn">
					<el-button type="primary" icon="edit" size="small" @click='openCreateUserBox'><span style="color: white">_新建_</span>
					</el-button>
					<el-button type="primary" icon="caret-right" size="small" @click='onstart'>_启用_</el-button>
					<el-button type="primary" icon="circle-close" size="small" @click='onforbid'>_禁用_</el-button>
				</div>
				<div class="rightinput" style="position: relative;margin-right:30px">
					<input type="text" placeholder="_请输入关键字_" v-model="keyword" @keyup.enter="cearchKeyword">
					<button @click="cearchKeyword" class="glyphicon glyphicon-search searchBtn" style="height: 28px;position:absolute;top:14px;right:20px"></button>
<!--
					<button class="glyphicon glyphicon-chevron-down" v-popover:popover4></button>
-->
				</div>
			</div>
		</div>

		<!--嵌套表格-->
		<div id="el_table_wrap" class="el_table_wrap">
			<el-table :data="userList"  @selection-change="handleSelectionChange" ref="multipleTable"
					  :height="table_height" stripe style="width: 100%;" v-loading="loading" element-loading-text="_拼命加载中_...">
				<el-table-column type="selection"  width="55"></el-table-column>
				<el-table-column prop="RowNo" align="center" label="序号" width="60"
								 text-align='center'></el-table-column>
				<el-table-column label="_操作_" align="center" width="100">
					<template scope="scope">
						<el-button size="small" type="text" icon="setting" @click="setPassword(scope.$index)"></el-button>
						<el-button size="small" type="text" icon="edit" @click='openRedactBox(scope.$index,scope.row)'></el-button>
						<el-button size="small" type="text" icon="delete" @click="deleteUser(scope.$index)"></el-button>
					</template>
				</el-table-column>
				<el-table-column label="_是否启用_" width="100">
					<template scope="scope">
						<el-switch on-text="" off-text="" v-model="scope.row.FStatus"  @change="changeSwith(scope.$index)"></el-switch>
					</template>
				</el-table-column>
				<el-table-column prop="FUserName" label="_用户名_" width="180" show-overflow-tooltip></el-table-column>
				<el-table-column  prop="FRoleName" label="_角色名_" width="150" show-overflow-tooltip></el-table-column>
				<el-table-column  prop="FShortName" label="_所属公司_" width="200" show-overflow-tooltip></el-table-column>
				<el-table-column  prop="FVehicleGroupFullName" label="_所属车队_" width="150" show-overflow-tooltip></el-table-column>
				<el-table-column  prop="FCountry" label="_国家_" width="180" show-overflow-tooltip></el-table-column>
				<el-table-column  prop="timeZone" label="_时差_" width="100" show-overflow-tooltip></el-table-column>
				<el-table-column  prop="FDescribe" label="_备注_" width="180" show-overflow-tooltip></el-table-column>
				<el-table-column  prop="" label="" min-width="1" show-overflow-tooltip></el-table-column>
			</el-table>
		</div>
		<!--分页-->
		<div id="pagination" class="pagination">
			<div class="block">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="pageIndex"
					:page-sizes="[10, 20, 30]"
					:page-size="pageSize"
					layout="prev, pager, next, jumper,total,sizes"
					:total='useTotalCount'>
				</el-pagination>
			</div>
		</div>
	</section>
</template>
<script >
	//import contentHeader from './content_header';
	//var plugin = require('../js/plugin.js');
	//plugin.getiCheck();
	//plugin.getdatepicker();
	import zuzhiSelectDialog from './zuzhiSelectDialog.vue'
	require("!style!css!plugins/Autocomplete/Autocomplete.css")
	require("plugins/Autocomplete/Autocomplete.js")
	/*弹窗样式 这里引入以后其它页面就不需要引入了*/
	let _this
	export default {
		data() {
			_this=this;
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('_请输入密码_'));
				} else {

					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('_请再次输入密码_'));
				} else if (value !== this.oneUserData.pass) {
					callback(new Error('_两次输入密码不一致_!'));
				} else {
					callback();
				}
			};
			var validatePass3= (rule, value, callback) => {
				if (value === '') {
					callback(new Error('_请输入密码_'));
				} else if (value !== this.passwordData.pass) {
					callback(new Error('_两次输入密码不一致_!'));
				} else {
					callback();
				}
			};
			//用户名验证
			/*var validateUserName = (rule, value, callback) => {
				var uPattern = /^[a-zA-Z0-9_]{4,16}$/;
				if (uPattern.test(value)) {
					callback();
				} else {
					callback(new Error('_请输入字母_，_数字_，_下划线_'));
				}
			};*/
 			const validateUserName = (rule,value,callback) => {  
 				var uPattern = /^[a-zA-Z0-9_]{3,16}$/;
	            if(!value) {
	                return callback(new Error('_请输入用户名_'));
	              }
	            else if(value&& uPattern.test(value)){
	             	callback();
	            } else{
	            	callback(new Error('_请输入_3~16_位字母_、_数字_、_'));
	            }
	        };
			return {
				/*FDefaultSystemIds: [{
				        name: '_接甩挂系统_',
				        val: 1
			        },{
				        name: '_智能电子锁系统_',
				        val: 2
			        },
			        // {
				       //  name: '_冷链管理系统_',
				       //  val: 3
			        // },
			        {
			            name: '_车队管理系统_',
			            val: 4
			    }],*/
			    imageUrl: '',
			    sysHave:'',
			    FDefaultSystemIds: [],
				companyAble:'', 
				companyNew:[],
				RoleAble:'',
				RoleNew:[],
				//是不是新建用户
				isCreateUse:true,
				//时差数据
				timeZone:{
					sign:['+','-'],
					hour:[
						0,1,2,3,4,5,6,7,8,9,10,11,12
					],
					minute:[0,15,30,45]
				},
				//保存选中用户ID
				FGUIDs:null,
				isOpenDialog: false,
				//保存勾选的数据
				table_height: null,
				onindex: 0,
				anycheck: [],
				edituser: false,
				relatierol: false,
				editpass: false,
				adduser: false,

				//查询用户列表
				formsec: {
					name: '',
					zhuangtai: '',
					zhuzi: '',

				},
				//新增用户列表
				oneUserData: {
					ID:'',
					name: '',
					pass: '',
					checkPass: '',
					country: '',
					compony:"",
					motorcade:"",
					role:'',
					timeZoneSign:'+',
					hour:0,
					minute:0,
					desc:"",
					isChoiceCountry: 'true',
					FDefaultSystemId:'',
					FHaveSystemIds:[],
					FSystemLogoURL:''
				},
				rules: {
					/*name: [
						{required: true, message: '_请输入用户名_', trigger: 'blur'},
						{ min: 3, max:12, message: '_长度在_ 3 ~ 12 _个字符_', trigger: 'blur' },
						{ validator:validateUserName, trigger: 'blur', required: true }
					],*/
					name: [{required: true, validator: validateUserName}],
					pass: [
						{validator: validatePass, trigger: 'blur', required: true},
						{ min: 6, max:12, message: '_长度在_ 6 ~ 12 _个字符_', trigger: 'blur' }
					],
					checkPass: [{validator: validatePass2, trigger: 'blur'},
						{required: true, message: '_请确认密码_', trigger: 'blur'},
					],
					/*country: [
						{required: true, message: '_请输入国家_', trigger: 'blur'},
					],*/
					compony: [
						{required: true, message: '_请选择公司_', trigger: 'change'},
					],
					role: [
						{required: true, message: '_请选择角色_', trigger: 'change'},
					],
					FDefaultSystemId: [
						{required: true, message: '_请选择默认系统_'},
					],
					FHaveSystemIds: [
						{required: true, message: '_请选择系统权限_'},
					],
					motorcade: [
						{required: true, message: '_请输入车队_', trigger: 'change'},
						{ max:16, message: '_长度在_ 16 _个字符以内_', trigger: 'blur' }
					]

				},
				passwordData:{
					name:null,
					ID:null,
					pass:"",
					checkPass:""
				},
				passwordRules:{
					pass: [
						{validator: validatePass, trigger: 'blur', required: true},
						{ min: 6, max:12, message: '_长度在_ 6 ~ 12 _个字符_', trigger: 'blur' }
					],
					checkPass: [{validator: validatePass3, trigger: 'blur'},
						{required: true, message: '_请确认密码_', trigger: 'blur'},
					]
				},


				formLabelWidth: '100px',
				allcheck: {
					ischeck: false,
				},

				userList:[],        //用户列表
				companyList:[],     //公司列表
				//motorcadeList:[] ,  //车队列表
				roleList:[] ,       //角色列表
				pageSize:20,
				pageIndex:1,
				useTotalCount:0,
				keyword:''
			}
		},
		components: {
			//contentHeader
			zuzhiSelectDialog
		},
		mounted(){
			this.getFHaveSystemIds();
			this.getUserList(20,1);
			setTimeout(() => {
				_this.adjustPage();
			},100);
			////右边搜索区域取消默认
			//$('form').on("click", function (e) {
			//	e.stopPropagation();
			//});

		},
		methods: {
			//实例化国家地区选择
			initCountry(){


				var quickList=[{"cc":"AF","name":"Afghanistan"},{"cc":"AL","name":"Albania"},{"cc":"DZ","name":"Algeria"},{"cc":"AS","name":"American Samoa"},{"cc":"AD","name":"Andorra"},{"cc":"AO","name":"Angola"},{"cc":"AI","name":"Anguilla"},{"cc":"AQ","name":"Antarctica"},{"cc":"AG","name":"Antigua and Barbuda"},{"cc":"AR","name":"Argentina"},{"cc":"AM","name":"Armenia"},{"cc":"AW","name":"Aruba"},{"cc":"AC","name":"Ascension Islands"},{"cc":"AU","name":"Australia"},{"cc":"AT","name":"Austria"},{"cc":"AZ","name":"Azerbaijan"},{"cc":"BS","name":"Bahamas"},{"cc":"BH","name":"Bahrain"},{"cc":"BD","name":"Bangladesh"},{"cc":"BB","name":"Barbados"},{"cc":"BY","name":"Belarus"},{"cc":"BE","name":"Belgium"},{"cc":"BZ","name":"Belize"},{"cc":"BJ","name":"Benin"},{"cc":"BM","name":"Bermuda"},{"cc":"BT","name":"Bhutan"},{"cc":"BO","name":"Bolivia"},{"cc":"BA","name":"Bosnia and Herzegovina"},{"cc":"BW","name":"Botswana"},{"cc":"BR","name":"Brazil"},{"cc":"IO","name":"British Indian Ocean Territory"},{"cc":"BN","name":"Brunei"},{"cc":"BG","name":"Bulgaria"},{"cc":"BF","name":"Burkina Faso"},{"cc":"BI","name":"Burundi"},{"cc":"KH","name":"Cambodia"},{"cc":"CM","name":"Cameroon"},{"cc":"CA","name":"Canada"},{"cc":"CV","name":"Cape Verde"},{"cc":"KY","name":"Cayman Islands"},{"cc":"CF","name":"Central African Republic"},{"cc":"TD","name":"Chad"},{"cc":"CL","name":"Chile"},{"cc":"CN","name":"China"},{"cc":"CO","name":"Colombia"},{"cc":"KM","name":"Comoros"},{"cc":"CG","name":"Congo"},{"cc":"CD","name":"Congo, The Democratic Republic of the"},{"cc":"CK","name":"Cook Islands"},{"cc":"CR","name":"Costa Rica"},{"cc":"CI","name":"Cote D’Ivoire"},{"cc":"HR","name":"Croatia"},{"cc":"CU","name":"Cuba"},{"cc":"CY","name":"Cyprus"},{"cc":"CZ","name":"Czech Republic"},{"cc":"DK","name":"Denmark"},{"cc":"DJ","name":"Djibouti"},{"cc":"DM","name":"Dominica"},{"cc":"DO","name":"Dominican Republic"},{"cc":"EC","name":"Ecuador"},{"cc":"EG","name":"Egypt"},{"cc":"SV","name":"El Salvador"},{"cc":"GQ","name":"Equatorial Guinea"},{"cc":"ER","name":"Eritrea"},{"cc":"EE","name":"Estonia"},{"cc":"ET","name":"Ethiopia"},{"cc":"FK","name":"Falkland Islands (Malvinas)"},{"cc":"FO","name":"Faroe Islands"},{"cc":"FJ","name":"Fiji"},{"cc":"FI","name":"Finland"},{"cc":"FR","name":"France"},{"cc":"GF","name":"French Guiana"},{"cc":"PF","name":"French Polynesia"},{"cc":"GA","name":"Gabon"},{"cc":"GM","name":"Gambia"},{"cc":"GE","name":"Georgia"},{"cc":"DE","name":"Germany"},{"cc":"GH","name":"Ghana"},{"cc":"GI","name":"Gibraltar"},{"cc":"GR","name":"Greece"},{"cc":"GL","name":"Greenland"},{"cc":"GD","name":"Grenada"},{"cc":"GP","name":"Guadeloupe"},{"cc":"GU","name":"Guam"},{"cc":"GT","name":"Guatemala"},{"cc":"GN","name":"Guinea"},{"cc":"GW","name":"Guinea-Bissau"},{"cc":"GY","name":"Guyana"},{"cc":"HT","name":"Haiti"},{"cc":"HN","name":"Honduras"},{"cc":"HK","name":"Hong Kong S.A.R., China"},{"cc":"HU","name":"Hungary"},{"cc":"IS","name":"Iceland"},{"cc":"IN","name":"India"},{"cc":"ID","name":"Indonesia"},{"cc":"SS","name":"Inmarsat"},{"cc":"IR","name":"Iran"},{"cc":"IQ","name":"Iraq"},{"cc":"IE","name":"Ireland"},{"cc":"IL","name":"Israel"},{"cc":"IT","name":"Italy"},{"cc":"JM","name":"Jamaica"},{"cc":"JP","name":"Japan"},{"cc":"JO","name":"Jordan"},{"cc":"KZ","name":"Kazakhstan"},{"cc":"KE","name":"Kenya"},{"cc":"KI","name":"Kiribati"},{"cc":"KP","name":"Korea, North"},{"cc":"KR","name":"Korea, South"},{"cc":"KW","name":"Kuwait"},{"cc":"KG","name":"Kyrgyzstan"},{"cc":"LA","name":"Laos"},{"cc":"LV","name":"Latvia"},{"cc":"LB","name":"Lebanon"},{"cc":"LS","name":"Lesotho"},{"cc":"LR","name":"Liberia"},{"cc":"LY","name":"Libya"},{"cc":"LI","name":"Liechtenstein"},{"cc":"LT","name":"Lithuania"},{"cc":"LU","name":"Luxembourg"},{"cc":"MO","name":"Macao"},{"cc":"MK","name":"Macedonia"},{"cc":"MG","name":"Madagascar"},{"cc":"MW","name":"Malawi"},{"cc":"MY","name":"Malaysia"},{"cc":"MV","name":"Maldives"},{"cc":"ML","name":"Mali"},{"cc":"MT","name":"Malta"},{"cc":"MH","name":"Marshall Islands"},{"cc":"MQ","name":"Martinique"},{"cc":"MR","name":"Mauritania"},{"cc":"MU","name":"Mauritius"},{"cc":"YT","name":"Mayotte"},{"cc":"MX","name":"Mexico"},{"cc":"FM","name":"Micronesia, Federated States Of"},{"cc":"MD","name":"Moldova"},{"cc":"MC","name":"Monaco"},{"cc":"MN","name":"Mongolia"},{"cc":"ME","name":"Montenegro"},{"cc":"MS","name":"Montserrat"},{"cc":"MA","name":"Morocco"},{"cc":"MZ","name":"Mozambique"},{"cc":"MM","name":"Myanmar"},{"cc":"NA","name":"Namibia"},{"cc":"NR","name":"Nauru"},{"cc":"NP","name":"Nepal"},{"cc":"NL","name":"Netherlands"},{"cc":"AN","name":"Netherlands Antilles"},{"cc":"NC","name":"New Caledonia"},{"cc":"NZ","name":"New Zealand"},{"cc":"NI","name":"Nicaragua"},{"cc":"NE","name":"Niger"},{"cc":"NG","name":"Nigeria"},{"cc":"NU","name":"Niue"},{"cc":"MP","name":"Northern Mariana Islands"},{"cc":"NO","name":"Norway"},{"cc":"OM","name":"Oman"},{"cc":"PK","name":"Pakistan"},{"cc":"PW","name":"Palau"},{"cc":"PS","name":"Palestinian Territory"},{"cc":"PA","name":"Panama"},{"cc":"PG","name":"Papua New Guinea"},{"cc":"PY","name":"Paraguay"},{"cc":"PE","name":"Peru"},{"cc":"PH","name":"Philippines"},{"cc":"PL","name":"Poland"},{"cc":"PT","name":"Portugal"},{"cc":"PR","name":"Puerto Rico"},{"cc":"QA","name":"Qatar"},{"cc":"RE","name":"Reunion"},{"cc":"RO","name":"Romania"},{"cc":"RU","name":"Russia"},{"cc":"RW","name":"Rwanda"},{"cc":"SH","name":"Saint Helena"},{"cc":"KN","name":"Saint Kitts and Nevis"},{"cc":"LC","name":"Saint Lucia"},{"cc":"PM","name":"Saint Pierre and Miquelon"},{"cc":"VC","name":"Saint Vincent and the Grenadines"},{"cc":"WS","name":"Samoa"},{"cc":"SM","name":"San Marino"},{"cc":"ST","name":"Sao Tome and Principe"},{"cc":"SA","name":"Saudi Arabia"},{"cc":"SN","name":"Senegal"},{"cc":"RS","name":"Serbia"},{"cc":"SC","name":"Seychelles"},{"cc":"SL","name":"Sierra Leone"},{"cc":"SG","name":"Singapore"},{"cc":"SK","name":"Slovakia"},{"cc":"SI","name":"Slovenia"},{"cc":"SB","name":"Solomon Islands"},{"cc":"SO","name":"Somalia"},{"cc":"ZA","name":"South Africa"},{"cc":"ES","name":"Spain"},{"cc":"LK","name":"Sri Lanka"},{"cc":"SD","name":"Sudan"},{"cc":"SR","name":"Suriname"},{"cc":"SZ","name":"Swaziland"},{"cc":"SE","name":"Sweden"},{"cc":"CH","name":"Switzerland"},{"cc":"SY","name":"Syria"},{"cc":"TW","name":"Taiwan"},{"cc":"TJ","name":"Tajikistan"},{"cc":"TZ","name":"Tanzania"},{"cc":"TH","name":"Thailand"},{"cc":"TL","name":"Timor-Leste"},{"cc":"TG","name":"Togo"},{"cc":"TK","name":"Tokelau"},{"cc":"TO","name":"Tonga"},{"cc":"TT","name":"Trinidad and Tobago"},{"cc":"TN","name":"Tunisia"},{"cc":"TR","name":"Turkey"},{"cc":"TM","name":"Turkmenistan"},{"cc":"TC","name":"Turks and Caicos Islands"},{"cc":"TV","name":"Tuvalu"},{"cc":"UG","name":"Uganda"},{"cc":"UA","name":"Ukraine"},{"cc":"AE","name":"United Arab Emirates"},{"cc":"GB","name":"United Kingdom"},{"cc":"US","name":"United States"},{"cc":"UY","name":"Uruguay"},{"cc":"UZ","name":"Uzbekistan"},{"cc":"VU","name":"Vanuatu"},{"cc":"VA","name":"Vatican City State (Holy See)"},{"cc":"VE","name":"Venezuela"},{"cc":"VN","name":"Vietnam"},{"cc":"VG","name":"Virgin Islands, British"},{"cc":"VI","name":"Virgin Islands, US"},{"cc":"WF","name":"Wallis and Futuna"},{"cc":"YE","name":"Yemen"},{"cc":"ZM","name":"Zambia"},{"cc":"ZW","name":"Zimbabwe"},{"cc":"VO","name":"iNum"}]


				//focus function for the country filter
				$("#quickFilterInput").focus(function(){
					if($(this).val() == '_请输入国家英文名称_'){
						$(this).val('');
						$(this).removeClass('color-grey');
					}
				});

				//blur function for the country filter
				$("#quickFilterInput").blur(function(){
					if($(this).val() == ''){
						$(this).val('_请输入国家英文名称_');
						$(this).addClass('color-grey');
					}
				});

				//init country filter based on jquery autocomplete
				$("#quickFilterInput").autocomplete(quickList, {
					minChars: 1,
					width: 310,
					matchContains: true,
					max: 10,
					scroll: false,
					formatItem: function(row, i, max) {
						return "<span class=\" flag " + row.cc + "\"></span>"  + row.name;
					},
					formatMatch: function(row, i, max) {
						return "<span class=\" flag " + row.cc + "\"></span>" +  row.name;
					},
					formatResult: function(row) {
						return row.name;
					}
				}).result(function(event, item) {
					_this.oneUserData.country=item.name;
				});

			},
			//打开新建窗口
			openCreateUserBox(){
				this.isCreateUse=true;
				this.getCompanyList();
				//this.getMotorcadeList();
				this.getRoleLIst();
				
				setTimeout(() => {
					_this.initCountry();
					this.resetoneUserData();
				},300);
				this.adduser=true;
			},
			//请求公司列表
			getCompanyList(){
				let TokenID = this.$store.state.FTokenID;
				$.ajax({
					"url": "web/Common/Common_SuperAdmin",
					"cache": false,
					"async": true,
					"type": "post",
					"dataType": "json",
					"contentType": "application/json; charset=utf-8",
					"data": JSON.stringify({FTokenID:TokenID,FAction: "QuerySuperAdminAgentEnableList",FVersion: "1.0.0","FKey":"",FPageSize:99999}),
					success: function (data) {
						console.log("公司数据",data);
						if(data.Result==104) {
							_this.$message("_登录超时_，5_秒后返回登录页面_");
							setTimeout(function(){
								_this.$store.commit("goLogin");
							},5000)
							return
						}

						var Fobj = data;
						_this.companyNew=[];
						_this.companyList=[];
						$.each(Fobj.FObject.Table1, function (index, obj){
 							_this.companyNew.push(obj.FGUID);
						});
						let parm=_this.companyNew.indexOf(_this.companyAble);
						if(!_this.isCreateUse&&(parm==-1)){     //编辑而且公司被禁掉
							_this.$message("_原公司已禁用_,_请重新选择_");
	                        _this.oneUserData.compony='';
	                     }
						$.each(Fobj.FObject.Table1, function (index, obj) {
	                            var item={
									name:obj.FShortName,
									ID:obj.FGUID
								}
							_this.companyList.push(item);
						});
						console.log("_this.companyList",_this.companyList);
					},
					error: function () {
						console.log('_请求失败_')
					}
				});

			},
			//请求车队列表
/*
			getMotorcadeList(){
				let TokenID = this.$store.state.FTokenID;
				$.ajax({
					"url":"web/Common/Common_Admin",
					"cache": false,
					"async": true,
					"type": "post",
					"dataType": "json",
					"contentType": "application/json; charset=utf-8",
					"data": '{"FTokenID": "' + TokenID + '","FAction": "QueryAdminVehicleGroupListByFUserGUID","FVersion": "1.0.0","FKey":"","FPageSize":"' + 999999 + '"}',
					success: function (data) {
						console.log("车队数据",data);

						var Fobj = data;
						_this.motorcadeList = [];
						$.each(Fobj.FObject.Table1, function (index, obj) {
							let item={
								name:obj.FVehicleGroupFullName,
								ID:obj.FGUID
							}
							_this.motorcadeList.push(item)
						});

						console.log("_this.motorcadeList",_this.motorcadeList);
					},
					error: function () {
						console.log('_请求失败_')
					}
				});

			},
*/
			//获得角色列表
			getRoleLIst(){
				let TokenID = this.$store.state.FTokenID;
				$.ajax({
					"url": "web/Common/Common_Admin",
					"cache": false,
					"async": true,
					"type": "post",
					"dataType": "json",
					"contentType": "application/json; charset=utf-8",
					"data": '{"FTokenID": "' + TokenID + '","FAction": "QueryAdminRoleList","FVersion": "1.0.0","FKey":"","FPageSize":"' + 9999 + '"}',
					success: function (data) {

						console.log("角色数据",data);

						var Fobj = data;
						_this.roleList = [];
						_this.RoleNew=[];
						$.each(Fobj.FObject.Table1, function (index, obj){
 							if(obj.FStatus){                   
 								_this.RoleNew.push(obj.FName);
 							}else{
 								return
 							}
						});
						let parm1=_this.RoleNew.indexOf(_this.RoleAble);
						if(!_this.isCreateUse&&(parm1==-1)){  //编辑而且公司被禁掉
									_this.$message("_原角色已禁用_,_请重新选择_");
		                            _this.oneUserData.role='';
		                   }
						$.each(Fobj.FObject.Table1, function (index, obj) {
							if(obj.FStatus){  //筛选未禁用的角色
							     var item1={
									name:obj.FName,
									ID:obj.FGUID
							}
							    _this.roleList.push(item1)
							}else{
							     return
							}
						});
						console.log("_this.roleList",_this.roleList);
					},
					error: function () {
						console.log('_请求失败_')
					}
				});

			},
			//获取计算机时间时区
			getLocalTimeZone(){
				var d=new Date();
				let TimezoneOffset=d.getTimezoneOffset();
				if(TimezoneOffset<0){
					this.oneUserData.timeZoneSign='+'
				}else {
					this.oneUserData.timeZoneSign='-'
				};
				let t=Math.abs(TimezoneOffset);
				this.oneUserData.hour=Math.floor(t/60);
				this.oneUserData.minute=Math.round(t%60);
			},
			//重置新用户表单
			resetoneUserData() {
				this.oneUserData= {
					name: '',
					pass: '',
					checkPass: '',
					country: '',
					compony:"",
					motorcade:"",
					role:'',
					timeZoneSign:'+',
					hour:0,
					minute:0,
					desc: '',
					isChoiceCountry: 'true',
					FDefaultSystemId:'',
					FHaveSystemIds:[],
					FSystemLogoURL:'',
				};
				this.$refs['oneUserData'].resetFields();
				this.getLocalTimeZone();
				this.imageUrl='';
			},
			//创建用户
			createUser() {
				this.$refs['oneUserData'].validate((valid) => {
					if (valid) {

						let url="web/Common/Common_Admin";
						getData(url);
						function getData(url){
							let oneUserData=_this.oneUserData;
							let timeDifferent=_this.getTimeZone(oneUserData.timeZoneSign,oneUserData.hour,oneUserData.minute);
							let adminUser={
								FUserName:oneUserData.name,
								FPassword:oneUserData.checkPass,
								FRoleGUID:oneUserData.role,
								FVehicleGroupName:oneUserData.motorcade,
								FCountrySelectEnable:oneUserData.isChoiceCountry=="true"?true:false,
								FCountry:oneUserData.country,
								FAgentGUID:oneUserData.compony,
								FTimeDifferent:timeDifferent,
								FDescribe:oneUserData.desc,
								FStatus:1,  //直接启用，未启用会导致车队不可用
							}
							let FDefault=oneUserData.FDefaultSystemId;
							let SystemIds=oneUserData.FHaveSystemIds.join(',');
							let img=oneUserData.FSystemLogoURL?oneUserData.FSystemLogoURL:'';
							//console.log(JSON.stringify(adminUser));
							let postData={
								FTokenID: _this.$store.state.FTokenID,
								FAction: "AddAdminUser",
								FT_AdminUser:adminUser,
                                FDefaultSystemId:FDefault,
                                FHaveSystemIds:SystemIds,
                                FSystemLogoURL:img,
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
										_this.onsucc();
										_this.$refs['oneUserData'].resetFields();
										_this.getUserList(_this.pageSize,_this.pageIndex);
										_this.adduser = false;

									}else {
										_this.$message("_创建失败_，_请修改用户名后重试_!")
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
			//时差分解成 符号 小时 分钟
			parseTimeZone(timeZone){
				let timeZoneSign,hour,minute;
				if (timeZone<0){
					timeZoneSign='-'
				}else {
					timeZoneSign='+'
				};
				let t=Math.abs(timeZone);
				hour=Math.floor(t/3600);
				//minute=t%3600;
				minute=(t/60)%60;
				let obj={
					timeZoneSign:timeZoneSign,
					hour:hour,
					minute:minute,
				}
				return obj
			},
			getTimeZone(timeZoneSign,hour,minute){
				let t=null;
				if(timeZoneSign=="+"){
					t=(hour*60+minute)*60;
				}else {
					t=-(hour*60+minute)*60;
				};
				return t;
			},
			//编辑页面
			openRedactBox(index,row){
				let _this=this;
				if(row.FIsActiveUser){
					console.log('row',row)
					_this.companyAble=row.FAgentGUID;
					_this.RoleAble=row.FRoleName;
					_this.isCreateUse=false;
					_this.getCompanyList();
					//this.getMotorcadeList();
					_this.getRoleLIst();

					setTimeout(() => {
						_this.initCountry();

					},300);
					_this.adduser=true;
	                
					let item=_this.userList[index];
					_this.imageUrl=item.FSystemLogoURL;   //图片地址
					console.log('item',item);
					let oneDescribe=(item.FDescribe=='--')?'':item.FDescribe;  //编辑框'--'显示空
					let oneFCountry=(item.FCountry=='--')?'':item.FCountry;
					console.log('修改的用户信息',item);
					let t=_this.parseTimeZone(item.FTimeDifferent);
					let sHave=item.FHaveSystemIds.split(',');
					console.log('sHave',sHave);
					
					_this.oneUserData={
						ID:item.FGUID,
						name: item.FUserName,
						//country: item.FCountry, 
						country:oneFCountry,
						compony:item.FAgentGUID,
						motorcade:item.FVehicleGroupFullName,
						role:item.FRoleGUID,
						timeZoneSign:t.timeZoneSign,
						hour:t.hour,
						minute:t.minute,
						//desc:item.FDescribe,
						desc:oneDescribe,
						isChoiceCountry: item.FCountrySelectEnable,
						state:item.FStatus,
						FDefaultSystemId:item.FDefaultSystemId.toString(),
                        FHaveSystemIds:sHave,
                        FSystemLogoURL:item.FSystemLogoURL
					}
				}else{
			    	return  _this.message('_非创建者账号_,_仅能查看_', 'info');
			    }
			},
			//编辑后保存
			redactSave(){
				this.$refs['oneUserData'].validate((valid) => {
					if (valid) {
						let url="web/Common/Common_Admin";

						save(url);
						function save(url){
							let oneUserData=_this.oneUserData;
							let timeDifferent=_this.getTimeZone(oneUserData.timeZoneSign,oneUserData.hour,oneUserData.minute);
							let adminUser={
								FRoleGUID:oneUserData.role,
								FVehicleGroupName:oneUserData.motorcade,
								FCountrySelectEnable:true,
								FCountry:oneUserData.country,
								FAgentGUID:oneUserData.compony,
								FTimeDifferent:parseInt(timeDifferent),
								FDescribe:oneUserData.desc,
								FStatus:oneUserData.state?1:0
							}
							let FDefault=oneUserData.FDefaultSystemId;
							let SystemIds=oneUserData.FHaveSystemIds.join(',');
							let img=oneUserData.FSystemLogoURL?oneUserData.FSystemLogoURL:'';
							//console.log(JSON.stringify(adminUser));
							let postData={
								FTokenID: _this.$store.state.FTokenID,
								FAction: "UpdateAdminUser",
								FGUID:oneUserData.ID,
								FT_AdminUser:adminUser,
                                FDefaultSystemId:FDefault,
                                FHaveSystemIds:SystemIds,
  								FSystemLogoURL:img,
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
										_this.onsucc();
										_this.$refs['oneUserData'].resetFields();
										_this.getUserList(_this.pageSize,_this.pageIndex);
										_this.adduser = false;

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
			//修改密码
			setPassword(index){
				this.editpass=true;
				let item=this.userList[index];
				console.log('修改密码的用户信息',item);
				this.passwordData={
					name:item.FUserName,
					ID:item.FGUID,
					pass:null,
				    checkPass:null
				}
			},
			//保存修改密码
			savePassword(){
				this.$refs['passwordData'].validate((valid) => {
					if (valid) {
						let url="web/Common/Common_Admin";
						password(url);
						function password(url){
							let passwordData=_this.passwordData;
							let postData={
								FTokenID: _this.$store.state.FTokenID,
								FAction: "UpdateAdminUserPassword",
								FGUID:passwordData.ID,
								FPassword:passwordData.checkPass,
								FPassword:passwordData.pass,
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
										_this.$message("_修改成功_!")
										_this.$refs['passwordData'].resetFields();

										_this.editpass = false;

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

			//搜索关键字
			cearchKeyword(){
				let key=this.keyword;

				this.getUserList(this.pageSize,this.pageIndex,key)



			},
			//提示信息
			message(msg, type){
				this.$message({
					showClose: true,
					message: msg,
					type: type
				});
			},
			//获取用户列表
			getUserList(pageSize,pageindex,keyword){
				let key;
				if(keyword){
					key=keyword
				}else {
					key=''
				}
				let url="web/Common/Common_Admin";
				getData(url);
				function getData(url){

					//console.log(JSON.stringify(adminUser));
					let postData={
						FTokenID: _this.$store.state.FTokenID,
						FAction: "QueryAdminUserList",
						FKey:key,
						FState:-1,
						FPageSize:pageSize,
						FPageIndex:pageindex,
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
							console.log("用户列表",res);
							if(res.Result==200){

								_this.useTotalCount=res.FObject.Table[0].FTotalCount;
								let userList=[];
								let initData=res.FObject.Table1;
								initData.map(function(item,index){
									if(item.FStatus==0){
										item.FStatus
									}
									item.FStatus==0?item.FStatus=false:item.FStatus=true;

									let timeDifferent=Math.abs(item.FTimeDifferent);
									let hour=Math.floor(timeDifferent/3600);
									//let minute=timeDifferent%3600;
									let minute=(timeDifferent/60)%60;
									if(hour<10){
										hour='0'+hour;
									}
									if(minute==0){
										minute='00';
									}

									let n=hour+':'+minute;
									if(item.FTimeDifferent>0){
										item.timeZone='+'+n;
									}else {
										item.timeZone='-'+n;
									}
									//表格空白处补'--'
									item.FDescribe=item.FDescribe?item.FDescribe:'--';
									item.FCountry=item.FCountry?item.FCountry:'--';
								})

/*
								initData.map(function(item,index){
									let obj={
										FAgentGUID: "35504681-aee0-4849-a8f1-7b8b4e45eb04",
										FCountry: "Afghanistan",
										FCountrySelectEnable: false,
										FCreateTime: "2017-09-16T05:12:03.12",
										FDescribe: "",
										FGUID: "f25ca137-0c03-453d-8166-ad4f2a7ade82",
										FLastUpdateTime: "2017-09-16T05:12:03.12",
										FRoleGUID: "3b668c10-3096-4fdc-830d-c04b6ed93f03",
										FRoleName: "测试角色2",
										FShortName: "rt",
										FStatus: 0,
										FTimeDifferent: 480000,
										FUserName: "11111111",
										FVehicleGroupFullName: "0a634394-6b93-4a1c-a02b-fcda78fccec3",
										FVehicleGroupGUID: "61af4797-04e7-40fe-b9be-ab69356915ce",
										RowNo: 1
									}

								})
*/



								_this.userList=initData;
								console.log("_this.userList",_this.userList);

							}else if(res.Result==104) {
								_this.$message("_登录超时_，5_秒后返回登录页面_");
								setTimeout(function(){
									_this.$store.commit("goLogin");
								},5000)
								return

							}


						},
						error: function () {
							console.log('_请求失败_')
						}
					});

				}
			},
			//删除
			deleteUser(index){
				let item=this.userList[index];
				let url="web/Common/Common_Admin";
				this.$confirm('_此操作将永久删除该用户_, _是否继续_?', '_提示_', {
					confirmButtonText: '_确定_',
					confirmButtonClass: "search",
					cancelButtonText: '_取消_',
					cancelButtonClass: "cancel el-button--primary",
					type: 'warning'
				}).then(() => {
					deleteUser(url);
				}).catch(() => {});


				function deleteUser(url){
					let data= {
						FTokenID: _this.$store.state.FTokenID,
						FAction: "DeleteAdminUserByFGUID",
						FGUID: item.FGUID,
						FVersion: "1.0.0"
					};
					$.post(url,data,function(res){
						console.log("删除user",res);
						if(res.Result==200){
							_this.getUserList(_this.pageSize,_this.pageIndex);
							_this.$message("_删除成功_!");
						}else {
							_this.$message.error("_未删除_,_请检查该用户下是否存在车辆_、_终端_、_子账户_、_子车队_!");
						}
					})
				}
			},
			//修改用户启用状态
			changeUserState(FGUIDs,FState,callback){
				console.log("用户ID字符串s",FGUIDs);
				let url="web/Common/Common_Admin";
				change(url);
				function change(url){
					let data= {
						FTokenID: _this.$store.state.FTokenID,
						FAction: "UpdateAdminUserStatus",
						FGUIDs: FGUIDs,
						FState: FState,
						FVersion: "1.0.0"
					};
					$.post(url,data,function(res){
						console.log("修改车辆状态",res);
						if(res.Result==200){

							if(callback) callback();
						}
					})
				}
			},
			//点击滑块修改状态
			changeSwith(index){
				let data=this.userList[index];
				let newStatus;

				data.FStatus?newStatus=1:newStatus=0;

				console.log(newStatus);
				this.changeUserState(data.FGUID,newStatus)
			},
			/*分页方法*/
			pagination(pageIndex,pageSize,array){
				var offset = (pageIndex - 1) * pageSize;
				return (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize);
			},
			//分页
			handleSizeChange(val) {
				this.pageSize=val;
				//this.pageIndex=1;
				this.getUserList(this.pageSize,this.pageIndex,this.keyword)
			},
			//分页 跳转页面
			handleCurrentChange(val) {
				this.pageIndex=val;
				this.getUserList(this.pageSize,this.pageIndex,this.keyword)
			},
			//调整页面高度
			adjustPage(){
				this.table_height = this.elementsFlex("el_table_wrap", "main-content", "operate_wrapper", "pagination", true) + 5;
			},


			//勾选提示
			onalert() {
				this.$message({
					showClose: true,
					message: '_请先勾选_！'
				});
			},
			onsucc() {
				this.$message({
					showClose: true,
					message: '_提交成功_！',
					type: 'success',
				});
			},
			//判断是否有数据被选中
			handleSelectionChange(val) {
				console.log(val);
				this.anycheck = val;

				let arrFGUID = [];
				this.anycheck.forEach(obj=> {
					arrFGUID.push(obj.FGUID);
				})
				if(arrFGUID.length!=0){
					this.FGUIDs=arrFGUID.join(',');
				}
			},
			//批量禁用
			onforbid: function () {
				if (this.anycheck.length == 0) {
					this.onalert();
				}
				else {
					this.changeUserState(this.FGUIDs,0,function(){
						_this.$message('_禁用成功_');
						_this.getUserList(_this.pageSize,_this.pageIndex);
					})

				}
				this.$refs.multipleTable.clearSelection();
			},
			//批量启用
			onstart: function () {
				if (this.anycheck.length == 0) {
					this.onalert();
				}
				else {
					this.changeUserState(this.FGUIDs,1,function(){
						_this.$message('_启用成功_');
						_this.getUserList(_this.pageSize,_this.pageIndex);
					})

				}
				this.$refs.multipleTable.clearSelection();
			},
/*
			OpenDialog(){
				this.isOpenDialog = !this.isOpenDialog;
			},
			onResultChange(val){
				this.isOpenDialog = val;//④外层调用组件方注册变更方法，将组件内的数据变更，同步到组件外的数据状态中
			}
*/          
            //获取登录用户的权限
            getFHaveSystemIds(){
            	console.log('w',window.sessionStorage.haveSystemIDs)
            	this.sysHave=window.sessionStorage.haveSystemIDs;
            	/*if(session.indexOf(',')==-1){
            		this.sysArr.push(window.sessionStorage.haveSystemIDs);
            	}else{
            		let arr=window.sessionStorage.haveSystemIDs.split(',');
            		for(var i=0;i<arr.length;i++){
            			this.sysArr.push(arr[i]);
            		}
            	}*/
            },
            handleAvatarSuccess(res, file) {
            	console.log('res',res);
            	console.log('file',file);
			    this.imageUrl = URL.createObjectURL(file.raw);
			    this.oneUserData.FSystemLogoURL=res.FObject;
		    },
		    uploadFailed(err, file, fileList){
		        setTimeout(() => {
		          this.message('_上传失败_','warning');
		        },1000);
		    },
		    beforeAvatarUpload(file) {
		        console.log(file)
		        const isLt2M = file.size / 1024 / 1024 < 1;
		        if (!isLt2M) {
		          this.$message.error('_上传图片大小不能超过_1MB!');
		        }
		        return isLt2M;
		    }, 
		},
		watch: {
			"oneUserData.FHaveSystemIds" (newval,oldval) {
				//this.FDefaultSystemIds = newval;
				let temp = {};
				let temp2 = {};
				let temp4 = {};
				console.log('newval',newval)
				//alert(newval)
				if (newval) {
					this.FDefaultSystemIds = [];
					for (let i=0; i<newval.length;i++) {
						if (newval[i] == 1) {
							temp.val = newval[i];
							temp.name = "_接甩挂_";
							this.FDefaultSystemIds.push(temp);
						}
						if (newval[i] == 2) {
							temp2.val = newval[i];
							temp2.name = "_智能电子锁_";
							this.FDefaultSystemIds.push(temp2);
						}
						if (newval[i] == 4) {
							temp4.val = newval[i];
							temp4.name = "_车队管理_";
							this.FDefaultSystemIds.push(temp4);
						}
						
					}
				}else{
					this.FDefaultSystemIds = [];
					this.oneUserData.FDefaultSystemId='';
				}
			},
            FDefaultSystemIds(){   //防止反复勾删
            	let aRR=[];
            	let aRId=this.oneUserData.FDefaultSystemId;
            	if(this.FDefaultSystemIds){
            		$.each(this.FDefaultSystemIds,function(index,obj){
            			aRR.push(obj.val);
            		})
            	}
            	if(aRR.indexOf(aRId)==-1){
            		this.oneUserData.FDefaultSystemId='';
            	}
            }, 
			screenHeight () {
				this.adjustPage();
			},
		},
		//computed: {
		//	//存储当前编辑的对象
		//}
	}
</script>
<style>
	.user-page .box-header {
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

	.user-page .leftbtn {
		float:left;
	}

	.user-page .rightinput {
		float:right;
		margin-right:10px;
	}

	.user-page .rightinput input {
		border:1px solid #1970cf;
		height:28px;
		border-radius:15px;
		box-shadow:none !important;
		width:180px;
		padding-left:10px;

	}

	.user-page .rightinput input:active {
		box-shadow:none !important;
		outline:none;
	}

	.user-page .rightinput input:focus {
		box-shadow:none !important;
		outline:none;
	}

	.user-page .searchBtn {
		border:none;
		background-color:white;
		margin-left:-40px;
		box-shadow:none;
		height:20px !important;
		outline:none;
	}

	.user-page .glyphicon-chevron-down {
		margin-left:30px;
		width:28px;
		height:28px;
		border-radius:50%;
		outline:none;
		background-color:white;
		border:1px solid #1970cf;
	}
	#el_table_wrap .el-button{
		padding:0;
	}
	.midUser .el-dialog .el-dialog__body{
		max-height: 600px;
		overflow: auto
	}
	.midUser .el-row:last-child{
		padding-bottom: 20px
	}
	.midUser .el-col{
	   height:50px;
	}
	.logoUP .avatar-uploader .el-upload {
	    border: 1px dashed #C0CCDA;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	    top:-1px;
	   /* left:-150px;*/
	}
	.logoUP  .avatar-uploader .el-upload:hover {
	    border-color: #20a0ff;
	}
	.logoUP  .avatar-uploader-icon {
	     font-size: 14px;
	     color: #8c939d;
	     width: 135px;
	     line-height: 30px;
	     display: block;
	}
	.logoUP  .avatar {
	    width: 135px;
	    height: 30px;
	    display: block;
	}
	@media (min-width:1600px) {   
		.midUser .el-dialog--small {
		    width: 40%;
		} 
    }
    @media (min-width:1300px) and (max-width:1599px){
    	.midUser .el-dialog--small {
		    width: 58%;
		} 
    }
    @media (min-width:1200px) and (max-width:1299px){
    	.midUser .el-dialog--small {
		    width: 58%;
		} 
    }
    @media (max-width:1199px) {
		.midUser .el-dialog--small {
		    width: 50%;
		} 
    } 
</style>
