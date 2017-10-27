<template xmlns:v-popover="http://www.w3.org/1999/xhtml">
	<section>
		<!-- 修改司机-->
		<div class='midDriver'>
			<el-dialog  title='_司机管理_-_修改_' :visible.sync="editEquipment">
			<el-form :model="objDetail" :rules="rules" ref="objDetail" label-width="110px" >
				<el-row >
					<el-col :span="10">
						<el-form-item label="_司机姓名_" prop="FDriverName">
							<el-input v-model="objDetail.FDriverName" :maxlength='16' placeholder='请输入少于16个字符'></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="_性别_" prop="FSex" label-width="160px" >
							<el-radio-group v-model.number="objDetail.FSex">
							    <el-radio :label="1">_男_</el-radio>
							    <el-radio :label="0">_女_</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :span="2"></el-col>
				</el-row>
				<el-row >
					<el-col :span="10">
						<el-form-item label="_司机电话_" prop="FPhoneNumber">
							<el-input v-model="objDetail.FPhoneNumber"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="_驾龄_" prop="FDrivingExp" label-width="160px" >
							<!-- <el-input v-model.number="objDetail.FDrivingExp"></el-input> -->
							<el-input-number v-model="objDetail.FDrivingExp" :min="1" :max="50" style='width:100%'></el-input-number>
						</el-form-item>
					</el-col>
					<el-col :span="2"></el-col>
				</el-row>
				<el-row >
					<el-col :span="10">
						<el-form-item label="_身份证号_" prop="FIdentityID">
							<el-input v-model="objDetail.FIdentityID"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="_驾驶证开始有效期_" prop="FDrivingStartDate" label-width="160px" >
							<el-date-picker type="date" placeholder="_选择日期_" v-model="objDetail.FDrivingStartDate" :clearable="false" style="width: 100%;">
							</el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="2"></el-col>
				</el-row>
				<el-row>
					<el-col :span="10">
						<el-form-item label="_驾驶证号_" prop="FDrivingNumber">
							<el-input v-model="objDetail.FDrivingNumber"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="_驾驶证结束有效期_" prop="FDrivingEndDate" label-width="160px" > 
							<el-date-picker type="date" placeholder="_选择日期_" v-model="objDetail.FDrivingEndDate" style="width: 100%;" :clearable="false"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="2"></el-col>
				</el-row>
				<el-row>
					<el-col :span="10">
						<el-form-item label="_驾驶类别_" prop="FDrivingType">
							<el-select v-model="objDetail.FDrivingType" placeholder="_请选择_" style='width:100%'>
			                  	<el-option v-for="item in FDrivingTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
			                </el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12"  >
						<el-form-item label="_描述_" prop="FDescription" label-width="160px">
							<el-input type="textarea" v-model="objDetail.FDescription" :maxlength="200" :rows="2"
									  placeholder='_最多输入_200_字_'></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="2"></el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer" >
				<el-button type="primary" @click="submitForm11('objDetail')">_保存_</el-button>
				<el-button @click="res" type="button" class='el-button el-button--default cancel el-button--primary'>_重置_</el-button>
			</div>
			</el-dialog>
		</div>
		<!-- 新增司机-->
		<div class='midDriver'>
			<el-dialog  title='_司机管理_-_新增_' :visible.sync="addEquipment">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px">
				<el-row>
					<el-col :span="10">
						<el-form-item label="_司机姓名_" prop="FDriverName">
							<el-input v-model="ruleForm.FDriverName" :maxlength='16' placeholder='请输入少于16个字符'></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="_性别_" prop="FSex" label-width="160px">
							<el-radio-group v-model.number="ruleForm.FSex">
							    <el-radio :label="1">_男_</el-radio>
							    <el-radio :label="0">_女_</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
					<el-col :span="2"></el-col>
				</el-row>
				<el-row>
					<el-col :span="10">
						<el-form-item label="_司机电话_" prop="FPhoneNumber">
							<el-input v-model="ruleForm.FPhoneNumber"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="_驾龄_" prop="FDrivingExp" label-width="160px">
							<!-- <el-input v-model.number="ruleForm.FDrivingExp"></el-input> -->
							<el-input-number v-model="ruleForm.FDrivingExp" :min="1" :max="50" style='width:100%'></el-input-number>
						</el-form-item>
					</el-col>
					<el-col :span="2"></el-col>
				</el-row>
				<el-row>
					<el-col :span="10">
						<el-form-item label="_身份证号码_" prop="FIdentityID">
							<el-input v-model="ruleForm.FIdentityID"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="_驾驶证开始有效期_" prop="FDrivingStartDate" label-width="160px">
							<el-date-picker type="date" placeholder="_选择日期_" v-model="ruleForm.FDrivingStartDate" style="width: 100%;" :clearable="false"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="2"></el-col>
				</el-row>
				<el-row>
					<el-col :span="10">
						<el-form-item label="_驾驶证号_" prop="FDrivingNumber">
							<el-input v-model="ruleForm.FDrivingNumber"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="_驾驶证结束有效期_" prop="FDrivingEndDate" label-width="160px">
							<el-date-picker type="date" placeholder="_选择日期_" v-model="ruleForm.FDrivingEndDate" style="width: 100%;" :clearable="false"></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="2"></el-col>
				</el-row>
				<el-row>
					<el-col :span="10">
						<el-form-item label="_驾驶类别_" prop="FDrivingType">
							<!-- <el-input v-model="ruleForm.FDrivingType"></el-input> -->
							<el-select v-model="ruleForm.FDrivingType" placeholder="_请选择_" style='width:100%'>
			                  	<el-option v-for="item in FDrivingTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
			                </el-select>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="_描述_" prop="FDescription" label-width="160px">
							<el-input type="textarea" v-model="ruleForm.FDescription" :maxlength="200" :rows="2"
									  placeholder='_最多输入_200_字_'></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="2"></el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer" >
				<el-button type="primary" @click="submitForm('ruleForm')">_保存_</el-button>
				<el-button @click="resetForm('ruleForm')" class='el-button el-button--default cancel el-button--primary'>_重置_</el-button>
			</div>
			</el-dialog>
		</div>

		<div id="operate_wrapper">
			<div class='box-header'>
				<div class="leftbtn">
					<el-button type="primary" icon="edit" size="small" @click='addEquipment=true'><span
						style="color: white">_新建_</span>
					</el-button>
					<el-button type="primary" icon="caret-right" size="small" @click='changeStatus(true)'>_启用_</el-button>
					<el-button type="primary" icon="circle-close" size="small" @click='changeStatus(false)'>_禁用_</el-button>
					<el-button type="primary" icon="delete" size="small" @click='ondelete'>_删除_</el-button> 
				</div>
				<div class="rightinput" style="position: relative">
					<input type="text" placeholder="_请输入司机姓名_" v-model="searchCondition.FKey" @keyup.enter="doQuery">
					<button class="glyphicon glyphicon-search searchBtn" style="height: 28px;"
							@click="doQuery"></button>
					<button class="glyphicon glyphicon-chevron-down" @click="dialogVisible=!dialogVisible"></button>
					<div class="mymodal"
						 style="position:absolute;left:-160px;z-index:999;visibility: hidden;border: 1px solid #ccc;background: white;padding-top: 10px">
						<div class="modal-body" style="padding: 0px">
							<el-form :model='searchCondition' ref="ruleForm1" label-width="100px">
								<el-form-item label="_关键字_" prop="FKey">
									<el-input class="col-md-12" v-model="searchCondition.FKey" placeholder="_请输入司机姓名_"></el-input>
								</el-form-item>
								<el-form-item label="_状态_" prop="FState">
									<el-select class="col-md-12" v-model="searchCondition.FState" placeholder="_请选择_">
										<el-option label="_全部_" value="-1" selected="selected"></el-option>
										<el-option label="_已启用_" value="1"></el-option>
										<el-option label="_已禁用_" value="0"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item>
									<div class="btnList">
										<el-button type="primary" @click="doQuery">_提交_</el-button>
										<el-button @click="resetForm('ruleForm1')" class='reset el-button el-button--default cancel el-button--primary'>_重置_</el-button>
									</div>
								</el-form-item>
							</el-form>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--设备列表-->
		<div id="el_table_wrap" class="el_table_wrap">
			<el-table :data="equipmentList" ref="multipleTable" @selection-change="handleSelectionChange"
					  :height="table_height" stripe style="width: 100%;" empty-text='_暂无数据_'>
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column prop="RowNo" label="_序号_" width="80"></el-table-column>
				<el-table-column label="_操作_" width="90">
					<template scope="scope">
						<el-button  type="text" size="small" @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i></el-button>
						<el-button  type="text" size="small"  @click="ondelete(scope.$index,scope.row)"><i class="el-icon-delete"></i></el-button>
					</template>
				</el-table-column>
				<el-table-column label="_状态_" width="100">
					<template scope="scope">
						<el-switch on-text="" off-text="" v-model="scope.row.FStatus" @change='onlyChange(scope.$index, scope.row)'></el-switch>
					</template>
				</el-table-column>
				<el-table-column prop="FDriverName"  label="_司机姓名_" width="100" show-overflow-tooltip></el-table-column>
				<el-table-column prop="FDrivingExp"   label="_驾龄_" width="80" show-overflow-tooltip></el-table-column>
				<el-table-column prop="FDrivingType" label="_驾驶类别_" width="150" show-overflow-tooltip></el-table-column>
				<el-table-column prop="FPhoneNumber" label="_司机电话_" width="150" show-overflow-tooltip></el-table-column>
				<el-table-column prop="FIdentityID"  label="_身份证号码_" width="160" show-overflow-tooltip></el-table-column>
				<el-table-column prop="FSex"   label="_性别_" width="80"></el-table-column>
				<el-table-column prop="FDrivingNumber"  label="_驾驶证号_" width="180" show-overflow-tooltip></el-table-column>
				<el-table-column prop="FDrivingStartDate" label="_开始有效期_" width="150" show-overflow-tooltip></el-table-column>
				<el-table-column prop="FDrivingEndDate" label="_结束有效期_" width="150" show-overflow-tooltip></el-table-column>
				<el-table-column prop="FDescription" show-overflow-tooltip label="_说明_" min-width="100"></el-table-column>
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
	 //import zuzhiSelectDialog from './zuzhiSelectDialog.vue'
	export default {
		data() {
			/*const checkAge = (rule, value, callback) => {
			        if (!value) {
			          console.log(value)
			        }
			        setTimeout(() => {
			          if (value && !Number.isInteger(value)) {
			            callback(new Error('_请输入正确数字值_'));
			          } else {
			            if (value && value < 0) {
			              callback(new Error('_负数无效_'));
			            } else {
			              callback();
			            }
			          }
			        }, 1000);
			    };*/
            const checkFDriverName = (rule, value, callback) => {
			        if (!value) {
			          console.log(value)
			        }
			        setTimeout(() => {
			          if (value && !Number.isInteger(value)) {
			            callback(new Error('_请输入正确数字值_'));
			          } else {
			            if (value && value < 0) {
			              callback(new Error('_负数无效_'));
			            } else {
			              callback();
			            }
			          }
			        }, 1000);
			    };	
			return {
				fguid:'',
				bool:false,
				pageSize: 20,
				pageIndex: 1,
				FTotalCount: 0,
				dialogVisible: false,
				FGUIDs: '',
				table_height: null,
				anycheck: [],
				relatierol: false,
				addEquipment: false,
				editEquipment: false,
				//搜索关键字
				searchCondition: {
					"FState": "",
					"FKey": ""
				},
				//驾驶类别
				FDrivingTypes: [{
		          	label: '_大型货车_',
		          	value: 0
		        },{
		         	label: '_牵引车_',
		          	value: 1
		        },{
		         	label: '_小型自动挡汽车_',
		          	value: 2
		        },{
		         	label: '_大型客车_',
		          	value: 3
		        }
		        ,{
		         	label: '_城市公交车_',
		          	value: 4
		        }
		        ,{
		         	label: '_中型客车_',
		          	value: 5
		        },{
		         	label: '_小型汽车_',
		          	value: 6
		        }],
				//新增司机
				ruleForm: {
					FDriverName:'',
					FDrivingExp:'',
					FIdentityID:'',
					FSex:1,
					FDrivingNumber:'',
					FDrivingType:'',
					FDrivingStartDate:new Date(),
					FDrivingEndDate:new Date(),
					FPhoneNumber:'',
					FDescription:'',
					FStatus:1,
				},
				objDetail:{},
				rules: {
					FDriverName: [{required: true, message: '_请输入司机姓名_'}],
					FPhoneNumber: [{required: true, message: '_请输入司机电话_'}],
					// FDrivingExp: [{ validator: checkAge }],
				},
				allcheck: {
					ischeck: false,
				},
				equipmentList: [],
			}
		},
		props: {
			screenHeight: Number
		},
		components: {
			//zuzhiSelectDialog
		},
		computed:{

	    },
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
		},
		methods: {
			timeChange(time){
		        var time1=Date.parse(new Date(time));
		        var uom1=new Date(time1);
		        var month1=(uom1.getMonth()+1).toString().length==1?"0"+(uom1.getMonth()+1).toString():(uom1.getMonth()+1);
		        var day1=uom1.getDate().toString().length==1?"0"+uom1.getDate():uom1.getDate();
		        return uom1.getFullYear()+'-'+month1+'-'+day1;
		    },
			res(){
				let _this=this;
				if(this.objDetail.FStatus){  //不重置FStatus
                  	_this.objDetail={
						FDriverName:'',
						FDrivingExp:'',
						FIdentityID:'',
						FSex:1,
						FDrivingNumber:'',
						FDrivingType:'',
						FDrivingStartDate:new Date(),
						FDrivingEndDate:new Date(),
						FPhoneNumber:'',
						FDescription:'',
						FStatus:1,
					}
				}else{                          //不重置FStatus
					_this.objDetail={
						FDriverName:'',
						FDrivingExp:'',
						FIdentityID:'',
						FSex:1,
						FDrivingNumber:'',
						FDrivingType:'',
						FDrivingStartDate:new Date(),
						FDrivingEndDate:new Date(),
						FPhoneNumber:'',
						FDescription:'',
						FStatus:0,
					}
				}
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
				let FKey = this.searchCondition.FKey;
				let FState = this.searchCondition.FState;
				FState==""?FState=-1:FState=FState;
				let PageSize = this.pageSize;
				let pageIndex = this.pageIndex;
				$.ajax({
					"url": "web/Common/Common_Admin",
					"cache": false,
					"async": true,
					"type": "post",
					"dataType": "json",
					"contentType": "application/json; charset=utf-8",
					"data": '{"FTokenID": "' + TokenID + '","FAction": "QueryAdminDriverList","FVersion": "1.0.0","FKey":"' + FKey + '","FState":"' + FState + '","FPageSize":"' + PageSize + '","FPageIndex":"' + pageIndex + '"}',
					success: function (data) {
						console.log(data);
						var Fobj = data;
						_this.equipmentList = [];
						$.each(Fobj.FObject.Table1, function (index, obj) {
							obj.FDrivingStartDate=obj.FDrivingStartDate.replace(/T/ig,' ').substring(0,10);
							obj.FDrivingEndDate=obj.FDrivingEndDate.replace(/T/ig,' ').substring(0,10);
							obj.FStatus=obj.FStatus?true:false;
							obj.FSex=obj.FSex?'男':'女';
							obj.FDrivingType=obj.FDrivingType=='0'?'_大型货车_':obj.FDrivingType=='1'?'_牵引车_':obj.FDrivingType=='2'?'_小型自动挡_':obj.FDrivingType=='3'?'_大型客车_':obj.FDrivingType=='4'?'_城市公交车_':obj.FDrivingType=='5'?'_中型汽车_':obj.FDrivingType=='6'?'_小型汽车_':'_小型汽车_';
							obj.FDescription=obj.FDescription?obj.FDescription:'--';
							obj.FIdentityID=obj.FIdentityID?obj.FIdentityID:'--';
							obj.FDrivingNumber=obj.FDrivingNumber?obj.FDrivingNumber:'--'
							_this.equipmentList.push(obj);
						});
						_this.FTotalCount = Fobj.FObject.Table[0].FTotalCount;
						//搜索表单重置
						_this.resetForm('ruleForm1');
						_this.dialogVisible=false;
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
				console.log(this.anycheck);
				let arrFGUID = [];
				this.anycheck.forEach(obj=> {
					arrFGUID.push(obj.FGUID);
				})
				this.FGUIDs = arrFGUID.join(',');
			},
			//删除单选或者多选
		    ondelete(index,rows) {
		    	let TokenID=this.$store.state.FTokenID;
		        let _this=this;
		        let Fgid='';
		        if(rows==undefined){  //点击多选删除
			        if(this.anycheck.length == 0){
			            _this.message('_请先勾选_', 'warning');
			        }else{        
			           Fgid=_this.FGUIDs;
			        }
		        }else{              //点击单选删
		            Fgid=rows.FGUID;
		        }
				if(Fgid){  //勾选或者选中某行则执行删除操作
					this.$confirm('_此操作将删除与车辆的关联_,_是否继续_?', '_提示_', {
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
								"data":'{"FTokenID": "'+TokenID+'","FAction": "DeleteAdminDriver","FVersion": "1.0.0","FGUIDs":"'+Fgid+'"}',
								success: function (data) {
									console.log(data);
									_this.doQuery();
									_this.message('_删除成功_', 'success');
								},
								error:function () {
								            console.log('_请求失败_')
								    }
							});
					    })
						.catch(() => {
							this.$message.info('_已取消操作_!');
							_this.anycheck=[];
							_this.$refs.multipleTable.clearSelection();
						});
				}else{
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
					let FState=parm?1:0;
					$.ajax({
						"url": "web/Common/Common_Admin",
						"cache": false,
						"async": true,
						"type": "post",
						"dataType": "json",
						"contentType": "application/json; charset=utf-8",
						"data": '{"FTokenID":"' + TokenID + '","FAction":"UpdateAdminDriverStatus","FGUIDs":"' + FGUIDs + '","FVersion":"1.0.0","FState":"' + FState + '"}',
						success: function (data) {
							console.log(data);
							_this.equipmentList=[];
							_this.doQuery();
							_this.message('_修改成功_','success');
							_this.anycheck=[];
							_this.$refs.multipleTable.clearSelection();
						},
						error: function () {
							console.log('_请求失败_')
						}
					});
				}
			},
			//单选修改设备状态
			onlyChange(index,row){
				let _this=this;
				let TokenID = this.$store.state.FTokenID;
			    let FState=row.FStatus?1:0;
 				let FGUIDs = row.FGUID;
 				$.ajax({
						"url": "web/Common/Common_Admin",
						"cache": false,
						"async": true,
						"type": "post",
						"dataType": "json",
						"contentType": "application/json; charset=utf-8",
						"data": '{"FTokenID":"' + TokenID + '","FAction":"UpdateAdminDriverStatus","FGUIDs":"' + FGUIDs + '","FVersion":"1.0.0","FState":"' + FState + '"}',
						success: function (data) {
							console.log(data);
							if(data.Result!="200"){
				                _this.equipmentList[index].FStatus=_this.equipmentList[index].FStatus;
				            }else {
				              _this.message('_修改成功_', 'success');
				              _this.anycheck=[];
				              _this.$refs.multipleTable.clearSelection();
				            }
			                _this.anycheck=[];
						},
						error: function () {
							console.log('_请求失败_')
						}
					});
			},
			//编辑数据
			handleEdit(index,row) {
	            this.editEquipment=true;
	            this.fguid=row.FGUID;  //编辑提交的车辆id
	            let FGUID=this.fguid;
		        let _this = this;
		        let TokenID = this.$store.state.FTokenID;
		        //获取司机详情
		        $.ajax({
		          "url": "web/Common/Common_Admin",
		          "cache": false,
		          "async": true,
		          "type": "post",
		          "dataType": "json",
		          "contentType": "application/json; charset=utf-8",
		          "data": '{"FTokenID": "' + TokenID + '","FAction": "QueryAdminDriverByFGUID","FVersion": "1.0.0","FGUID":"' + FGUID + '"}',
		          success: function (data) {
		            console.log(data);
		            _this.editEquipment=true;
		            var Fobj = data;
		            _this.objDetail=Fobj.FObject[0];
		          },
		          error: function () {
		            console.log('_请求失败_')
		          }
		        });
			},
			//提价新表单
			submitForm(formName) {
				var _this=this;
				if(this[formName].FDrivingStartDate.getTime()>this[formName].FDrivingEndDate.getTime()){
					_this.message('_开始日期不能大于结束日期_', 'warning');
					return
				};
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let TokenID = this.$store.state.FTokenID;
						let JsonObj=this[formName];
						let today=(Date.parse(new Date()));
 						JsonObj.FDrivingStartDate=JsonObj.FDrivingStartDate?this.timeChange(JsonObj.FDrivingStartDate):this.timeChange(today);
 						JsonObj.FDrivingEndDate=JsonObj.FDrivingEndDate?this.timeChange(JsonObj.FDrivingEndDate):this.timeChange(today);
 						//JsonObj.FSex=(JsonObj.FSex=='')?1:0;
						var JsonStr;
 							JsonStr=JSON.stringify({"FTokenID":TokenID,"FAction":"AddAdminDriver","FT_AdminDriver":JsonObj,"FVersion":"1.0.0"});
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
								_this.equipmentList=[];
								_this.doQuery();
								_this.resetForm(formName);
							    _this.addEquipment=false;
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
				var _this=this;
				if(new Date(this.timeChange(this[formName].FDrivingStartDate)).getTime()>new Date(this.timeChange(this[formName].FDrivingEndDate)).getTime()){
					_this.message('_开始日期不能大于结束日期_', 'warning');
					return
				};
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let TokenID = this.$store.state.FTokenID;
						let JsonObj=this[formName];
						let today=(Date.parse(new Date()));
 						JsonObj.FDrivingStartDate=JsonObj.FDrivingStartDate?this.timeChange(JsonObj.FDrivingStartDate):this.timeChange(today);
 						JsonObj.FDrivingEndDate=JsonObj.FDrivingEndDate?this.timeChange(JsonObj.FDrivingEndDate):this.timeChange(today);
						var FGUID=this.fguid;
						var JsonStr;
 							JsonStr=JSON.stringify({"FTokenID":TokenID,"FAction":"UpdateAdminDriver","FGUID":FGUID,"FT_AdminDriver":JsonObj,"FVersion":"1.0.0"});
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
								_this.equipmentList=[];
								_this.doQuery();
							    _this.editEquipment=false;
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
			addEquipment: {
				handler () {
					this.ruleForm={
							FDriverName:'',
							FDrivingExp:'',
							FIdentityID:'',
							FSex:1,
							FDrivingNumber:'',
							FDrivingType:'',
							FDrivingStartDate:new Date(),
							FDrivingEndDate:new Date(),
							FPhoneNumber:'',
							FDescription:'',
							FStatus:1,
						}
				},
				//deep: true
			},
/*			editEquipment:{  //会重复刷页面，耗网络
				handler () {
					this.doQuery();
				}
			}*/
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
		margin-left:-40px;
		box-shadow:none;
		height:20px !important;
		outline:none;
	}

	.glyphicon-chevron-down {
		margin-left:30px;
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
	.el-dialog__body {
		margin:30px 0 0 0;
	}
</style>
<style>
	.equiment .el-form-item .el-input__inner {
		height:28px;
		border-radius:0;
	}

	.equiment .btnList {
		text-align:right;
		width:100%;
		padding-right:25px;
	}

	.equiment .btnList .reset {
		padding:7px 25px;
		border:1px solid #ccc;
		background-color:#fff;
	}
	.midDriver  .el-dialog .el-dialog__body {
	    max-height:600px;
	    overflow:auto;
	}
	.midDriver .el-input-number__decrease,.midDriver .el-input-number__increase{
		line-height: 28px;
		height:28px;
	}
	@media (min-width:1600px) {   
		.midDriver .el-dialog--small {
		    width: 36%;
		} 

    }
    @media (min-width:1300px) and (max-width:1599px){
    	.midDriver .el-dialog--small {
		    width: 50%;
		} 
    }
    @media (min-width:1200px) and (max-width:1299px){
    	.midDriver .el-dialog--small {
		    width: 52%;
		} 
    }
    @media (max-width:1199px) {
		.midDriver .el-dialog--small {
		    width: 50%;
		} 
    } 
</style>