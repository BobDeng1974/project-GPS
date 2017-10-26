<template xmlns:v-popover="http://www.w3.org/1999/xhtml">
	<section>
		<!-- 详情展示 -->	
	    <!-- <el-dialog :visible.sync="detailDialog" size="small">
	        <span slot="title" style="display: inline-block;margin: -15px 0 15px 0;color:white">_车队详情_</span>
	        <template>
	          <el-row :gutter="20">
	            <el-col :span="8"><div class="grid-content"><span class='labelCheck'>_所属车队_:</span><span class='check'>{{detail.father}}</span></div></el-col>
	            <el-col :span="8"><div class="grid-content"><span class='labelCheck'>_状态_:</span><span sclass='check'>{{detail.FStatus}}</span></div></el-col>
	            <el-col :span="8"><div class="grid-content"><span class='labelCheck'>_车队长姓名_:</span><span class='check'>{{detail.FMasterName}}</span></div></el-col>
	          </el-row>
	        </template>
	       <template>
	         <el-row :gutter="20">
	           <el-col :span="8"><div class="grid-content"><span class='labelCheck'>_车队名称_:</span><span class='check'>{{detail.FVehicleGroupFullName}}</span></div></el-col>
	           <el-col :span="8"><div class="grid-content"><span class='labelCheck'>_车队长联系方式_:</span><span class='check'>{{detail.FMasterTelephone}}</span></div></el-col>
	           <el-col :span="8"><div class="grid-content"><span class='labelCheck'>_车队长说明_:</span><span class='check'>{{detail.FMasterDescribe}}</span></div></el-col>
	         </el-row>
	       </template>
	         <template>
	          <el-row :gutter="20">
	            <el-col :span="8"><div class="grid-content"><span class='labelCheck'>_车队说明_:</span><span class='check'>{{detail.FDescribe}}</span></div></el-col>
	          </el-row>
	        </template>
	    </el-dialog> -->
	    <div class='motodetail'>
		<el-dialog :visible.sync="detailDialog"  custom-class="vehical-info">
	        <span slot="title" style="display: inline-block;margin: -15px 0 15px 0;color:white">_车队详情_</span>
		    <table class="table table-bordered" style='table-layout:fixed'>
			    <tbody>
				    <tr>
				        <td>_所属车队_</td>
				        <td>{{detail.FFatherGroupFullName}}</td>
				        <td>_状态_</td>
				        <td>{{detail.FStatus}}</td>
				    </tr>
			        <tr>
			            <td>_车队名称_</td>
				        <td>{{detail.FVehicleGroupFullName}}</td>
				        <td>_车队长联系方式_</td>
				        <td>{{detail.FMasterTelephone}}</td>
				        </tr>
			        <tr>
				        <td>_车队长姓名_</td>
				        <td>{{detail.FMasterName}}</td>
				        <td>_车队长说明_</td>
				        <td style='word-wrap:break-word'>{{detail.FMasterDescribe}}</td>
			        </tr>
			        <tr>
				        <td>_车队说明_</td>
				        <td colspan="3" style='word-wrap:break-word'>{{detail.FDescribe}}</td>
			        </tr>
			    </tbody>
	       </table>
	    </el-dialog>
	    </div>
		<!-- 选择所属车队-->
		<div class='midd'>
			<el-dialog title="_车队_" :visible.sync="simdialog" top="25%">
			<!-- <div class='searchtable'>
				<input type="text" placeholder="_请输入车队名称_" v-model='simKey' class='searchinput'>
				<button class="glyphicon glyphicon-search searchBtn" style="height: 28px;" @click="carQuery"></button>
			</div> -->
			<div class='searchtable'>
				<input type="text" placeholder="_请输入车队名称_" v-model='simKey' class='searchinput'>
			</div>
			<div>
				<el-tree :data="arry" :props="defaultProps" default-expand-all @node-click="handleNodeClick" :filter-node-method='filterNode' ref='tree2' class='filter-tree' style='height:360px;overflow:auto'>
				</el-tree>
			</div>
			<!-- <div>
				<el-table :data="simData" height="450" empty-text='_暂无数据_'>
					<el-table-column prop='RowNo'  label="_序号_" width="70" ></el-table-column>
					<el-table-column label="操作" width="60">
						<template scope="scope">
							<el-button size="small" type="text" @click="chooseSim(scope.$index, scope.row)">_选择_</el-button>
						</template>
					</el-table-column>
					<el-table-column property="FVehicleGroupFullName" label="_车队名称_" width="150"></el-table-column>
					<el-table-column property="FShortName" label="_公司简称_" width="150"></el-table-column>
				</el-table>
			</div> -->
			<!-- <div id="pagination" class="pagination" >
				            <div class="block">
				              <el-pagination
				                @size-change="handleSizeChange1"
				                @current-change="handleCurrentChange1"
				                :current-page="pageIndex1"
				                :page-sizes="[10, 20, 30]"
				                :page-size="pageSize1"
				                layout="prev, pager, next, jumper,total,sizes"
				                :total="FTotalCount1">
				              </el-pagination>
				            </div>
			          	</div> -->
			</el-dialog>
		</div>
		<!-- 修改车队-->
		<div class='midMoto'>
			<el-dialog  title='_车队管理_-_修改_' :visible.sync="editEquipment">
				<el-form :model="objDetail" :rules="rules" ref="objDetail" label-width="110px" >
					<el-row>
						<el-col :span="10">
							<el-form-item label="_所属车队_" prop="FFatherGroupFullName">
								<!-- <el-input v-model="objDetail.father" @focus="carQuery"></el-input> -->
								<el-input v-model="objDetail.FFatherGroupFullName" @focus="simdialog=true" class='hoverCursor'></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="_车队长姓名_" prop="FMasterName" label-width="160px">
								<el-input v-model.number="objDetail.FMasterName"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="2"></el-col>
					</el-row>
					<el-row>
						 <el-col :span="10">
							<el-form-item label="_车队名称_" prop="FVehicleGroupFullName">
								<el-input v-model="objDetail.FVehicleGroupFullName"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="_车队长联系方式_" prop="FMasterTelephone" label-width="160px">
								<el-input v-model="objDetail.FMasterTelephone"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="2"></el-col>
					</el-row>
					<el-row>
						<el-col :span="10">
							<el-form-item label="_车队说明_" prop="FDescribe">
								<el-input type="textarea" v-model="objDetail.FDescribe" :maxlength="200" :rows="2"
										  placeholder='_最多输入_200_字_'></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="_车队长说明_" prop="FMasterDescribe" label-width="160px">
								<el-input type="textarea" v-model="objDetail.FMasterDescribe" :maxlength="200" :rows="2"
										  placeholder='_最多输入_200_字_'></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="2"></el-col>
					</el-row>
				</el-form>
				<div slot="footer" class="dialog-footer" >
					<el-button type="primary" @click="submitForm11('objDetail')">保存</el-button>
					<el-button @click="res" type="button" class='el-button el-button--default cancel el-button--primary'>重置</el-button>
				</div>
			</el-dialog>
		</div>
		<!-- 新增车队-->
		<div class='midMoto'>
			<el-dialog  title='_车队管理_-_新增_' :visible.sync="addEquipment">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" >
				<el-row>
					<el-col :span="10">
						<el-form-item label="_所属车队_" prop="FFatherGroupFullName">
							<!-- <el-input v-model="ruleForm.father" @focus="carQuery"></el-input> -->
							<el-input v-model="ruleForm.FFatherGroupFullName" @focus="simdialog=true" class='hoverCursor'></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="_车队长姓名_" prop="FMasterName" label-width="160px">
							<el-input v-model.number="ruleForm.FMasterName"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="2"></el-col>
				</el-row>
				<el-row>
					 <el-col :span="10">
						<el-form-item label="_车队名称_" prop="FVehicleGroupFullName">
							<el-input v-model="ruleForm.FVehicleGroupFullName"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="_车队长联系方式_" prop="FMasterTelephone" label-width="160px">
							<el-input v-model="ruleForm.FMasterTelephone"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="2"></el-col>
				</el-row>
				<el-row>
					<el-col :span="10">
						<el-form-item label="_车队说明_" prop="FDescribe">
							<el-input type="textarea" v-model="ruleForm.FDescribe" :maxlength="200" :rows="2"
									  placeholder='_最多输入_200_字_'></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="_车队长说明_" prop="FMasterDescribe" label-width="160px">
							<el-input type="textarea" v-model="ruleForm.FMasterDescribe" :maxlength="200" :rows="2"
									  placeholder='_最多输入_200_字_'></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="2"></el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer" >
				<el-button type="primary" @click="submitForm('ruleForm')">_保存_</el-button>
				<el-button @click="resetForm('ruleForm')" type="button" class='el-button el-button--default cancel el-button--primary'>_重置_</el-button>
			</div>
			</el-dialog>
		</div>

		<div id="operate_wrapper">
			<div class='box-header'>
				<div class="leftbtn">
					<el-button type="primary" icon="edit" size="small" @click='adMoto'><span
						style="color: white">_新建_</span>
					</el-button>
					<el-button type="primary" icon="caret-right" size="small" @click='changeStatus(true)'>_启用_</el-button>
					<el-button type="primary" icon="circle-close" size="small" @click='changeStatus(false)'>_禁用_</el-button>
					<el-button type="primary" class="glyphicon glyphicon-refresh" size="small" @click="reload">_刷新_
                </el-button>
				</div>
				<div class="rightinput" style="position: relative;margin-right:30px">
					<input type="text" placeholder="_请输入车队名称_" v-model="searchKey" @keyup.enter="doQuery">
					<button class="glyphicon glyphicon-search searchBtn" style="height: 28px;position:absolute;top:14px;right:20px"
							@click="doQuery"></button>
				</div>
			</div>
		</div>
		<!--车队列表-->
		<div id="el_table_wrap" class="el_table_wrap">
			<el-table :data="equipmentList" ref="multipleTable" @selection-change="handleSelectionChange"
					  :height="table_height" stripe style="width: 100%;" empty-text='_暂无数据_'>
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column prop="RowNo" label="_序号_" width="80"></el-table-column>
				<el-table-column label="_操作_" width="90">
					<template scope="scope">
						<el-button  type="text" size="small" @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i></el-button>
						<el-button  type="text" size="small"  @click="ondelete(scope.$index,scope.row)"><i class="el-icon-delete"></i></el-button>
						<el-button  type="text" size="small"  @click="checkDetail(scope.$index,scope.row)"><i class="el-icon-information"></i></el-button>
					</template>
				</el-table-column>
				<el-table-column label="_状态_" width="100">
					<template scope="scope">
						<el-switch on-text="" off-text="" v-model="scope.row.FStatus" @change='onlyChange(scope.$index, scope.row)'></el-switch>
						<!-- <el-switch on-text="" off-text="" v-model="scope.row.FStatus" @change='onlyChange(val,scope.$index, scope.row)'></el-switch> -->
					</template>
				</el-table-column>
				<el-table-column prop="FShortName"  label="_公司简称_" width="120" show-overflow-tooltip></el-table-column>
				<el-table-column prop="FVehicleGroupFullName"   label="_车队名称_" width="180" show-overflow-tooltip></el-table-column>
				<el-table-column prop="FVehicleCount"   label="_车辆数_" width="100" show-overflow-tooltip></el-table-column>
				<el-table-column prop="FMasterName"  label="_车队长姓名_" width="160" show-overflow-tooltip></el-table-column>
				<el-table-column prop="FMasterTelephone" label="_车队长联系方式_" width="150" show-overflow-tooltip></el-table-column>
				<el-table-column prop="FCreateDateTime"  label="_创建时间_" width="150" show-overflow-tooltip></el-table-column>
				<el-table-column prop="FDescribe" show-overflow-tooltip label="_车队说明_" width="180"></el-table-column>
				<el-table-column prop=""   min-width="1" ></el-table-column>
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
	export default {
		data() {
			return {
				motoArr:[],
				handObj:'',
				defaultProps: {
		          children: 'children',
		          label: 'FVehicleGroupFullName'
		        },
				arry:[],
				fguid:'',
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
				detailDialog:false,
				//查询车队
				simdialog:false,
				simData:[],
				simKey:'',
				searchKey:'',
				pageSize1: 20,
				pageIndex1: 1,
				FTotalCount1: 0,   //车队列表
				//搜索关键字
				searchCondition: {
					"FState": "",
					"FKey": ""
				},
				//新增车队
				ruleForm: {
					FVehicleGroupFullName:'',
					FFatherGroupFullName:'',   //所属车队
					FMasterName:'',
					FMasterTelephone:'',
					FMasterDescribe:'',
					FDescribe:'',
					FStatus:1,
					FFatherGroupGUID:''  //父车队的guid
				},
				objDetail:{},  //编辑
				detail:{},  //详情
				rules: {
					FFatherGroupFullName: [{required: true, message: '_请选择所属车队_'}],
					FVehicleGroupFullName: [{required: true, message: '_请输入车队名称_'}],
				},
				equipmentList: [],
			}
		},
		props: {
			screenHeight: Number
		},
		components: {
			
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
			filterNode(value, data) {
		        if (!value) return true;
		        return data.FVehicleGroupFullName.indexOf(value) !== -1;
		    },
			handleNodeClick(data) {
		        console.log(data);
		        let _this=this;
		        if(data.FStatus){
		        	if(this.addEquipment){
		        		this.ruleForm.FFatherGroupFullName=data.FVehicleGroupFullName;
						this.ruleForm.FFatherGroupGUID=data.FGUID;
						this.simdialog=false;
		        	
			        }else if(this.editEquipment){
			        	this.objDetail.FFatherGroupFullName=data.FVehicleGroupFullName;
						this.objDetail.FVehicleGroupGUID=data.FVehicleGroupGUID;
						this.simdialog=false;
			        }
		        }else{
		        	return _this.message('_该车队已禁用_,_请重新选择_','info');
		        }
		        
		    },
		    //点击新建
		    adMoto(){
		        this.addEquipment=true;
		        this.carQuery();
		    },
			//查询当前用户所属车队
			carQuery(){
                let _this = this;
				let TokenID = this.$store.state.FTokenID;
				let FKey=this.simKey;
				//let PageSize1=this.pageSize1;
				let PageIndex1=this.pageIndex1;
				let PageSize1=99999;
				$.ajax({
					"url": "web/Common/Common_Admin",
					"cache": false,
					"async": true,
					"type": "post",
					"dataType": "json",
					"contentType": "application/json; charset=utf-8",
					"data": '{"FTokenID": "' + TokenID + '","FAction": "QueryAdminVehicleGroupListByFUserGUID","FVersion": "1.0.0","FKey":"' + FKey + '","FPageSize":"' + PageSize1 + '","FPageIndex":"' + PageIndex1 + '"}',
					success: function (data) {
						console.log(data);
                        var Fobj = data;
                        _this.motoArr=[];
			            $.each(Fobj.FObject.Table1, function (index, obj) {   //筛选可用车队名
			              	if(obj.FStatus){
			                	_this.motoArr.push(obj.FGUID);
			              	}else{
			                	
			              	}
			            });
						function transTreeData(items) {
							if (items.length > 0) {
								var curPid =null //pid=0，为最上层节点 ，即无父节点
								var parent = findChild(curPid);//数组
								return parent;
							} else {
								return [];
							}
						}

				    //找子节点
						function findChild(curPid) {
							console.log(curPid)
							var _arr = [];
							var items = Fobj.FObject.Table1;
							var length = items.length;
							for (var i = 0; i < length; i++) {
								if (items[i].FFatherGroupGUID == curPid) {
									var _obj = items[i];
									_obj.children = findChild(_obj.FGUID);
									console.log(_obj);
									_arr.push(_obj);
								}
							}
							return _arr;
						}
						//_this.simdialog=true;
						transTreeData(Fobj.FObject.Table1);
					
					    _this.arry=transTreeData(Fobj.FObject.Table1);
						//console.log(data)
						/*_this.simdialog=true;
						_this.simData = [];
						var Fobj = data;
						$.each(Fobj.FObject.Table1, function (index, obj) {
							_this.simData.push(obj);
						});
						_this.FTotalCount1 = Fobj.FObject.Table[0].FTotalCount;*/
					},
					error: function () {
						console.log('_请求失败_')
					}
				});
			},
			//选择车队
			/*chooseSim(index,row){
				if(this.addEquipment){
					this.ruleForm.father=row.FVehicleGroupFullName;
					this.ruleForm.FFatherGroupGUID=row.FGUID;
					this.simdialog=false;
				}else if(this.editEquipment){
					this.objDetail.father=row.FVehicleGroupFullName;
					this.objDetail.FFatherGroupGUID=row.FGUID;
					this.simdialog=false;
				}
			},*/
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
						FVehicleGroupFullName:'',
						FFatherGroupFullName:'',   //所属车队
						FMasterName:'',
						FMasterTelephone:'',
						FMasterDescribe:'',
						FDescribe:'',
						FStatus:1,
						FFatherGroupGUID:''  //父车队的guid
					}
				}else{                          //不重置FStatus
					_this.objDetail={
						FVehicleGroupFullName:'',
						FFatherGroupFullName:'',   //所属车队
						FMasterName:'',
						FMasterTelephone:'',
						FMasterDescribe:'',
						FDescribe:'',
						FStatus:0,
						FFatherGroupGUID:''  //父车队的guid
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
			handleSizeChange1(val) {
				this.pageSize1 = val;
				this.carQuery();
			},
			handleCurrentChange1(val) {
				this.pageIndex1 = val;
				this.carQuery();
			},
			adjustPage(){
				this.table_height = this.elementsFlex("el_table_wrap", "main-content", "operate_wrapper", "pagination", true) + 8;
			},
			reload:function () {
		       this.doQuery();
		    },
			//重置表单
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			//搜索框查询
			doQuery(){
				let _this = this;
				let TokenID = this.$store.state.FTokenID;
				let FKey = this.searchKey;
				let PageSize = this.pageSize;
				let pageIndex = this.pageIndex;
				$.ajax({
					"url": "web/Common/Common_Admin",
					"cache": false,
					"async": true,
					"type": "post",
					"dataType": "json",
					"contentType": "application/json; charset=utf-8",
					"data": '{"FTokenID": "' + TokenID + '","FAction": "QueryAdminVehicleGroupList","FVersion": "1.0.0","FKey":"' + FKey + '","FPageSize":"' + PageSize + '","FPageIndex":"' + pageIndex + '"}',
					success: function (data) {
						console.log(data);
						var Fobj = data;
						_this.equipmentList = [];
						$.each(Fobj.FObject.Table1, function (index, obj) {
							obj.FCreateDateTime=_this.parseGMT(obj.FCreateDateTime.replace(/T/ig,' ')).substring(0,10);
							obj.FStatus=obj.FStatus?true:false;
							obj.FMasterName=obj.FMasterName?obj.FMasterName:'--';
							obj.FMasterTelephone=obj.FMasterTelephone?obj.FMasterTelephone:'--';
							obj.FDescribe=obj.FDescribe?obj.FDescribe:'--';
							_this.equipmentList.push(obj);
						});
						_this.FTotalCount = Fobj.FObject.Table[0].FTotalCount;
						_this.searchKey='';
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
		    //删除数据
			ondelete: function (index,row) {
				this.$confirm('_此操作将永久删除_,_是否继续_?', '_提示_', {
					    confirmButtonText: '_确定_',
						confirmButtonClass: "search",
						cancelButtonText: '_取消_',
						cancelButtonClass: "cancel el-button--primary",
						type: 'warning'
				    })
					.then(() => {
						let _this = this;
						var deleteFGUID = row.FGUID;
                        let TokenID = this.$store.state.FTokenID;
						$.ajax({
							"url": "web/Common/Common_Admin",
							"cache": false,
							"async": true,
							"type": "post",
							"dataType": "json",
							"contentType": "application/json; charset=utf-8",
							"data":'{"FTokenID": "'+TokenID+'","FAction": "DeleteAdminVehicleGroupByFGUID","FVersion": "1.0.0","FGUID":"'+deleteFGUID+'"}',
							success: function (data) {
								if(data.Result!==200){
									_this.message('_该车队下有车辆或下级车队，无法删除_', 'warning');
								};
								_this.doQuery();
							},
							error: function () {
								console.log('_请求失败_')
							}
						});
					})
					.catch(
						() => {
						this.$message.info('_已取消操作_!');
						this.anycheck=[];
						this.$refs.multipleTable.clearSelection();
					});
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
						"data": '{"FTokenID":"' + TokenID + '","FAction":"UpdateAdminVehicleGroupStatus","FGUIDs":"' + FGUIDs + '","FVersion":"1.0.0","FState":"' + FState + '"}',
						success: function (data) {
							console.log(data);
							_this.equipmentList=[];
							_this.doQuery();
							_this.message('_修改成功_','success');
							_this.anycheck=[];
						},
						error: function () {
							console.log('_请求失败_')
						}
					});
				}
			},
			//单选修改设备状态
			onlyChange(index,row){
				console.log(row)
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
						"data": '{"FTokenID":"' + TokenID + '","FAction":"UpdateAdminVehicleGroupStatus","FGUIDs":"' + FGUIDs + '","FVersion":"1.0.0","FState":"' + FState + '"}',
						success: function (data) {
							console.log(data);
							/*_this.equipmentList=[];
							_this.doQuery();
							_this.message('_修改成功_','success');
							_this.anycheck=[];*/
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
		    //编辑获取数据,不请求接口快些
		    handleEdit(index,row) {
		    	let _this = this;
			    if(row.FIsActiveUser){
			    	_this.handObj=row;
			    	_this.carQuery();
			    	_this.fguid=row.FGUID;  //车队的id
			    	_this.editEquipment=true;
			        let FGUID=_this.fguid;
				    let TokenID = _this.$store.state.FTokenID;
				    //获取车队详情
			        $.ajax({
			          "url": "web/Common/Common_Admin",
			          "cache": false,
			          "async": true,
			          "type": "post",
			          "dataType": "json",
			          "contentType": "application/json; charset=utf-8",
			          "data": '{"FTokenID": "' + TokenID + '","FAction": "QueryAdminVehicleGroupByFGUID","FVersion": "1.0.0","FGUID":"' + FGUID + '"}',
			          success: function (data) {
			            console.log(data);
			            _this.editEquipment=true;
			            var Fobj = data;
			            _this.objDetail=Fobj.FObject[0];
			            //判断父车队
              			setTimeout(function(){
              				if(_this.motoArr.indexOf(Fobj.FObject[0].FFatherGroupGUID)==-1){ //必填且车队不会被删除，必定绑定过
		                      	_this.message('_原车队已禁用_,_请重新选择_','info');
		                      	_this.objDetail.FFatherGroupGUID='';
		                     	_this.objDetail.FFatherGroupFullName='';
		                  	}else{
		                      	_this.objDetail.FFatherGroupGUID=Fobj.FObject[0].FFatherGroupGUID;  //避免反复操作
		                     	_this.objDetail.FFatherGroupFullName=Fobj.FObject[0].FFatherGroupFullName;
		                  	}
              			})
			          },
			          error: function () {
			            console.log('_请求失败_')
			          }
			        });
		    	}else{
			    	return  _this.message('_非创建者账号_,_仅能查看_', 'info');
			    }	
		    },
		    //车队详情页面
		    checkDetail (index,row) {
		        this.detailDialog=true;
		        this.detail.FFatherGroupFullName=row.FFatherGroupFullName; //存父节点
		        this.detail.FVehicleGroupFullName=row.FVehicleGroupFullName;
		        this.detail.FDescribe=(row.FDescribe=='--')?'':row.FDescribe;
		        this.detail.FMasterName=row.FMasterName;
		        this.detail.FMasterTelephone=(row.FMasterTelephone=='--')?'':row.FMasterTelephone;;
		        this.detail.FMasterDescribe=row.FMasterDescribe;
		        this.detail.FStatus=row.FStatus?'_启用_':'_禁用_';
		    },
			//新增车队
		    submitForm(formName) {
			    var _this=this;
			    this.$refs[formName].validate((valid) => {
		        if (valid) {
		          let TokenID = this.$store.state.FTokenID;
		          let JsonObj=this[formName];
		          delete JsonObj.FFatherGroupFullName;
		          var JsonStr;
		          JsonStr=JSON.stringify({FTokenID:TokenID,FAction:"AddAdminVehicleGroup",FT_AdminVehicleGroup:JsonObj,FVersion:"1.0.0"});
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
		        else{
		            console.log('error submit!!');
		            return false;
		          }
		        });
		    },
			//编辑新表单
			submitForm11(formName) {
				var _this=this;
				let FGUID=this.fguid;
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let TokenID = this.$store.state.FTokenID;
						let JsonObj=this[formName];
						delete JsonObj.FFatherGroupFullName;
						var JsonStr;
 							JsonStr=JSON.stringify({"FTokenID":TokenID,"FAction":"UpdateAdminVehicleGroup","FGUID":FGUID,"FT_AdminVehicleGroup":JsonObj,"FVersion":"1.0.0"});
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
							FVehicleGroupFullName:'',
							FFatherGroupFullName:'',   //所属车队
							FMasterName:'',
							FMasterTelephone:'',
							FMasterDescribe:'',
							FDescribe:'',
							FStatus:1,
							FFatherGroupGUID:''  //父车队的guid
						}
				},
				//deep: true
			},
			simdialog:{
 				handler () {
 					this.simKey=''
 				}
 			},
 			simKey(val){
 				this.$refs.tree2.filter(val);
 			}
		},
		created: function () {

		}
	}
</script>
<style scoped>
	.leftbtn {
		float:left;
	}

	.rightinput {
		float:right;
	}
	.searchtable{
		height:30px;
		margin:-25px 0 5px 0;
	}
    .searchtable .searchinput{
       display: inline-block;
       width:280px;
       height:30px;
       /*border-radius: 2px;*/
       text-indent: 10px;
       box-shadow:none !important;
       border:1px solid #d1dbe5;
    }
	.rightinput input{
		border:1px solid #1970cf;
		height:28px;
		border-radius:15px;
		box-shadow:none !important;
		width:180px;
		padding-left:10px;

	}

	.rightinput input:active,.searchtable .searchinput{
		box-shadow:none !important;
		outline:none;
	}

	.rightinput input:focus ,.searchtable .searchinput{
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
	.grid-content {
	    border-radius: 4px;
	    min-height: 36px;
	    margin:5px 0;
	}
	.check{
	    display:inline-block;
	    margin-left:10px;
	    color:#999999
	}
	.labelCheck{
	   display:inline-block;
	   width:130px;
	}
</style>
<!--<style>
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
</style>-->
<style>
	/* .midMoto .el-dialog {
	  width:850px;
	} */
	.midMoto  .el-dialog .el-dialog__body {
	    max-height:600px;
	    overflow:auto;
	}
	.midd .el-dialog{
		width:320px;
		height:460px;
	}
    .midd .el-dialog .el-dialog__body{
    	max-height: 450px;
    	auto-flow:auto;
    }
    .motodetail .el-dialog {
	  width:550px;
	}
	@media (min-width:1600px) {   
		.midMoto .el-dialog--small {
		    width: 38%;
		} 

    }
    @media (min-width:1300px) and (max-width:1599px){
    	.midMoto .el-dialog--small {
		    width: 45%;
		} 
    }
    @media (min-width:1200px) and (max-width:1299px){
    	.midMoto .el-dialog--small {
		    width: 52%;
		} 
    }
    @media (max-width:1199px) {
		.midMoto .el-dialog--small {
		    width: 50%;
		} 
    }
</style>
