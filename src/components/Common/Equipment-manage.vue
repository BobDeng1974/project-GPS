<template xmlns:v-popover="http://www.w3.org/1999/xhtml">
	<section>
		<zuzhi-select-dialog :isOpenDialog='isOpenDialog' @on-result-change="onResultChange"></zuzhi-select-dialog>
		<!-- 设备详情 -->
		<!-- <div class='mid'>
			<el-dialog :visible.sync="detailDialog" size="small">
			      <span slot="title" style="display: inline-block;margin: -15px 0 15px 0;color:white">_设备详情_</span>
			      <template>
			        <el-row :gutter="20">
			          <el-col :span="8"><div class="grid-content"><span class='labelCheck'>_终端号_:</span><span class='check'>{{detail.FAssetID}}</span></div></el-col>
			          <el-col :span="8"><div class="grid-content"><span class='labelCheck'>_序号_:</span><span class='check'>{{detail.FAssetSerialID}}</span></div></el-col>
			          <el-col :span="8"><div class="grid-content"><span class='labelCheck'>_终端类型_:</span><span class='check'>{{detail.FAssetTypeID}}</span></div></el-col>
			        </el-row>
			      </template>
			      <template>
			        <el-row :gutter="20">
			          <el-col :span="8"><div class="grid-content"><span class='labelCheck'>_状态_:</span><span class='check'>{{detail.FStatus}}</span></div></el-col>
			          <el-col :span="8"><div class="grid-content"><span class='labelCheck'>_出厂日期_:</span><span class='check'>{{detail.FManufactureDate}}</span></div></el-col>
			          <el-col :span="8"><div class="grid-content"><span class='labelCheck'>_创建时间_:</span><span class='check'>{{detail.FCreateTime}}</span></div></el-col>
			        </el-row>
			      </template>
			      <template>
			        <el-row :gutter="20">
			          
			          <el-col :span="8"><div class="grid-content"><span class='labelCheck'>_外设温湿度_:</span><span class='check'>{{detail.FTHS}}</span></div></el-col>
			          <el-col :span="8"><div class="grid-content"><span class='labelCheck'>_外设视频_:</span><span class='check'>{{detail.FVideo}}</span></div></el-col>
			          <el-col :span="8"><div class="grid-content"><span class='labelCheck'>_外设_RFID_刷卡_:</span><span class='check'>{{detail.FRFID}}</span></div></el-col>
			        </el-row>
			      </template>
			      <template>
			        <el-row :gutter="20">
			          <el-col :span="8"><div class="grid-content"><span class='labelCheck'>_外设胎温胎压_:</span><span class='check'>{{detail.FTPMS}}</span></div></el-col>
			          <el-col :span="8"><div class="grid-content"><span class='labelCheck'>_外设调度屏_:</span><span class='check'>{{detail.FScreen}}</span></div></el-col>
			          <el-col :span="8"><div class="grid-content"><span class='labelCheck'>_外设摄像头_:</span><span class='check'>{{detail.FCamera}}</span></div></el-col>
			        </el-row>
			      </template>
			      <template>
			        <el-row :gutter="20">
			          <el-col :span="8"><div class="grid-content"><span class='labelCheck'>_描述_:</span><span style="display:inline-block;margin-left:15px">{{detail.FDescription}}</span></div></el-col>
			        </el-row>
			      </template>
			   	 	</el-dialog>
			   	</div> -->
	   	 <el-dialog :visible.sync="detailDialog"  custom-class="vehical-info">
	        <span slot="title" style="display: inline-block;margin: -15px 0 15px 0;color:white">_设备详情_</span>
		        <table class="table table-bordered" style='table-layout:fixed'>
	          <tbody>
	           <tr>
	             <td>_终端号_</td>
	             <td>{{detail.FAssetID}}</td>
	             <td>_序号_</td>
	             <td>{{detail.FAssetSerialID}}</td>
	             <td>_终端类型_</td>
	             <td>{{detail.FAssetTypeID}}</td>
	           </tr>
	           <tr>
	             <td>_状态_</td>
	             <td>{{detail.FStatus}}</td>
	             <td>_出厂日期_</td>
	             <td>{{detail.FManufactureDate}}</td>
	             <td>_创建时间_</td>
	             <td>{{detail.FCreateTime}}</td>
	           </tr>
	           <tr>
	             <td>_外设温湿度_</td>
	             <td>{{detail.FTHS}}</td>
	             <td>_外设视频_</td>
	             <td>{{detail.FVideo}}</td>
	             <td>_外设_RFID_刷卡_</td>
	             <td>{{detail.FRFID}}</td>
	           </tr>
	           <tr>
	             <td>_外设胎温胎压_</td>
	             <td>{{detail.FTPMS}}</td>
	             <td>_外设调度屏_</td>
	             <td>{{detail.FScreen}}</td>
	             <td>_外设摄像头_</td>
	             <td>{{detail.FCamera}}</td>
	           </tr>
	           <tr>
	             <td>_描述_:</td>
	             <td colspan="5" style='word-wrap:break-word'>{{detail.FDescription}}</td>
	           </tr>
	         </tbody>
	       </table>
	    </el-dialog>   
		<!-- 修改设备-->
		<div class='eqDialog'>
			<el-dialog title="_设备管理_-_修改设备_" :visible.sync="editEquipment" >
			<el-form :model="objDetail" :rules="rules" ref="objDetail" label-width="110px" >
				<el-row>
					<el-col :span="10">
						<el-form-item label="_终端号_" prop="FAssetID">
							<el-input v-model="objDetail.FAssetID"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="_终端类型_" prop="FAssetTypeID" label-width="160px">
							<el-select v-model="objDetail.FAssetTypeID" placeholder="_请选择_" style="width:100%;">
							    <el-option label="701" value="701"></el-option>
							    <el-option label="702" value="702"></el-option>
							    <el-option label="703" value="703"></el-option>
							    <el-option label="704" value="704"></el-option>
							    <el-option label="705" value="705"></el-option>
							    <el-option label="706" value="706"></el-option>
							    <el-option label="707" value="707"></el-option>
						    </el-select>
						</el-form-item>
					</el-col>
					<el-col :span="2"></el-col>
				</el-row>
				<el-row>
				    <el-col :span="10">
						<el-form-item label="_选择_SIM_卡_" prop="FSIMNumber">
							<!-- <el-input v-model="objDetail.FSIMNumber" @focus="simQuery('true')" class='hoverCursor'></el-input> -->
							<el-input v-model="objDetail.FSIMNumber" @focus="simView" class='hoverCursor'></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="_出厂日期_" prop="FManufactureDate" label-width="160px">
							<el-date-picker type="date" placeholder="_选择日期_" v-model="objDetail.FManufactureDate" @change='getTime'></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="2"></el-col>
				</el-row>
				<el-row>
					<el-col :span="10">
						<el-form-item label="_序号_" prop="FAssetSerialID">
							<el-input v-model="objDetail.FAssetSerialID"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="_描述_" prop="FDescription" label-width="160px">
							<el-input type="textarea" v-model="objDetail.FDescription" :maxlength="200" :rows="2"
									  placeholder='_最多输入_200_字_'></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="2"></el-col>
				</el-row>
				<div class='alter'>
				   <el-row>
					<el-col :span="7">
						<el-form-item label="_外设温湿度_" prop="FTHS" >
							<el-select v-model="objDetail.FTHS" placeholder="_请选择_">
						      <el-option v-for="item in FTHSs" :key="item.value" :label="item.label" :value="item.value"></el-option>
						    </el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="_外设视频_" prop="FVideo" >
							<el-select v-model="objDetail.FVideo" placeholder="_请选择_">
						      <el-option v-for="item in FTHSs" :key="item.value" :label="item.label" :value="item.value"></el-option>
						    </el-select>
						</el-form-item>
					</el-col>
					<el-col :span="7">
						<el-form-item label="_外设_RFID_刷卡_" prop="FRFID" >
							<el-select v-model="objDetail.FRFID" placeholder="_请选择_">
						      <el-option v-for="item in FTHSs" :key="item.value" :label="item.label" :value="item.value"></el-option>
						    </el-select>
						</el-form-item>
					</el-col>
					<el-col :span="2"></el-col>
				   </el-row>
				</div>
				<div class='sel'>
				<el-row >
					<el-col :span="7">
						<el-form-item label="_外设胎温胎压_" prop="FTPMS" >
							<el-select v-model="objDetail.FTPMS" placeholder="_请选择_">
						      <el-option v-for="item in FTHSs" :key="item.value" :label="item.label" :value="item.value"></el-option>
						    </el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="_外设调度屏_" prop="FScreen" >
							<el-select v-model="objDetail.FScreen" placeholder="_请选择_">
						      <el-option v-for="item in FTHSs" :key="item.value" :label="item.label" :value="item.value"></el-option>
						    </el-select>
						</el-form-item>
					</el-col>
					<el-col :span="7">
						<el-form-item label="_外设摄像头_" prop="FCamera" >
							<el-select v-model="objDetail.FCamera" placeholder="_请选择_">
						      <el-option v-for="item in FTHSs" :key="item.value" :label="item.label" :value="item.value"></el-option>
						    </el-select>
						</el-form-item>
					</el-col>
					<el-col :span="2"></el-col>
				</el-row>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer" >
				<el-button type="primary" @click="submitForm11('objDetail')">_保存_</el-button>
				<el-button @click="res" type="button" class='el-button el-button--default cancel el-button--primary'>_重置_</el-button>
			</div>
			</el-dialog >
		</div>
		<!-- 选择sim卡-->
		<div class='chooseD'>
			<el-dialog title="SIM_卡_" :visible.sync="simdialog" >
			<div class='searchtable'>
	            <el-input style="width: 200px;" class="filter-item" placeholder="_请输入SIM卡号_" v-model="simKey">
	            </el-input>
	            <el-button class="filter-item" type="primary"  icon="search" @click="simQuery">_搜索_</el-button>
	        </div>
			<div class='warptable'>
				<el-table :data="simData" height="340" empty-text='_暂无数据_'>
					<el-table-column prop='RowNo'  label="_序号_" width="80" ></el-table-column>
					<el-table-column label="_操作_" width="70" align='center'>
						<template scope="scope">
							<!-- <el-button size="small" type="text" @click="chooseSim(scope.$index, scope.row)">_选择_</el-button> -->
                    		<a href="javascript:"  @click="chooseSim(scope.$index,scope.row)">_选择_</a>
						</template>
					</el-table-column>
					<el-table-column property="FSIMNumber" label="SIM_卡号_" width="180" align='center' show-overflow-tooltip></el-table-column>
					<el-table-column property="FSIMCardCCID" label="SIM卡_标识_" width="200" align='center' show-overflow-tooltip></el-table-column>
					<!-- <el-table-column property="FGUID" label="SIM卡唯一标识ID" width="250" align='center'></el-table-column> -->
					<el-table-column property="FDescription" label="_描述_" min-width="140" align='center' show-overflow-tooltip></el-table-column>
				</el-table>
			</div>
			<!--分页-->
			<div class="pagination" id='pagination'>
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
			</div>
			</el-dialog>
		</div>
		<!-- 新增设备-->
		<div class='eqDialog'>
			<el-dialog title="_设备管理_-_新增设备_" :visible.sync="addEquipment">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" >
				<el-row>
					<el-col :span="10">
						<el-form-item label="_终端号_" prop="FAssetID">
							<el-input v-model="ruleForm.FAssetID"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="_终端类型_" prop="FAssetTypeID" label-width="160px">
							<el-select v-model="ruleForm.FAssetTypeID" placeholder="_请选择_" style="width: 100%;">
						      <el-option label="701" value="701"></el-option>
						      <el-option label="702" value="702"></el-option>
						      <el-option label="703" value="703"></el-option>
						      <el-option label="704" value="704"></el-option>
						      <el-option label="705" value="705"></el-option>
						      <el-option label="706" value="706"></el-option>
						      <el-option label="707" value="707"></el-option>
						    </el-select>
						</el-form-item>
					</el-col>
					<el-col :span="2"></el-col>
				</el-row>
				<el-row>
				    <el-col :span="10">
						<el-form-item label="_选择_SIM_卡_" prop="FSIMNumber">
							<!-- <el-input v-model="ruleForm.FSIMNumber" @focus="simQuery"  class='hoverCursor'></el-input> -->
							<el-input v-model="ruleForm.FSIMNumber" @focus="simView" class='hoverCursor'></el-input>
						</el-form-item> 
					</el-col>
					<el-col :span="12">
						<el-form-item label="_出厂日期_" prop="FManufactureDate" label-width="160px">
							<el-date-picker type="date" placeholder="_选择日期_" v-model="ruleForm.FManufactureDate" @change='getTime'></el-date-picker>
						</el-form-item>
					</el-col>
					<el-col :span="2"></el-col>
				</el-row>
				<el-row>
					<el-col :span="10">
						<el-form-item label="_序号_" prop="FAssetSerialID">
							<el-input v-model="ruleForm.FAssetSerialID"></el-input>
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
				<div class='adalter'>
					<el-row >
						<el-col>
							<el-checkbox-group v-model="ruleForm.checkList">
								<el-row type="flex" justify="space-around">
									<el-col :span="4">
										<el-checkbox label="FTHS">_外设温湿度_</el-checkbox>
									</el-col>
									<el-col :span="4">
										<el-checkbox label="FVideo">_外设视频_</el-checkbox>
									</el-col>
									<el-col :span="4">
										<el-checkbox label="FRFID">_外设_RFID_刷卡_</el-checkbox>
									</el-col>
									<el-col :span="4">
										<el-checkbox label="FTPMS">_外设胎温胎压_</el-checkbox>
									</el-col>
								</el-row>
								<el-row type="flex" justify="space-around">
									<el-col :span="4">
										<el-checkbox label="FScreen">_外设调度屏_</el-checkbox>
									</el-col>
									<el-col :span="4">
										<el-checkbox label="FCamera">_外设摄像头_</el-checkbox>
									</el-col>
									<el-col :span="4"></el-col>
									<el-col :span="4"></el-col>
								</el-row>
							</el-checkbox-group>
						</el-col>
					</el-row>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer" >
				<el-button type="primary" @click="submitForm('ruleForm')">_保存_</el-button>
				<el-button @click="resetForm('ruleForm')" type="button" class='el-button el-button--default cancel el-button--primary'>_重置_</el-button>
			</div>
			</el-dialog >
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
					<input type="text" placeholder="_请输入终端号_" v-model='searchCondition.FKey' @keyup.enter="doQuery">
					<button class="glyphicon glyphicon-search searchBtn" style="height: 28px;"
							@click="doQuery"></button>
					<button class="glyphicon glyphicon-chevron-down" @click="dialogVisible=!dialogVisible"></button>
					<div class="mymodal"
						 style="position:absolute;left:-160px;z-index:999;visibility: hidden;border: 1px solid #ccc;background:white;padding-top: 10px">
						<div class="modal-body" style="padding: 0px;">
							<el-form :model='searchCondition' ref="ruleForm1" label-width="100px">
								<!-- <el-form-item label="_关键字_" prop="FKey">
									<el-input class="col-md-12" v-model="searchCondition.FKey"></el-input>
								</el-form-item> -->
								<el-form-item label="_状态_" prop="FState">
									<el-select class="col-md-12" v-model="searchCondition.FState" placeholder="_请选择_">
										<el-option label="_全部_" value="-1" selected="selected"></el-option>
										<el-option label="_已启用_" value="1"></el-option>
										<el-option label="_已禁用_" value="0"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="_终端类型_" prop="FType">
									<el-select class="col-md-12" v-model="searchCondition.FType" placeholder="_请选择_">
										<el-option label="_全部_" value="-1"></el-option>
										<el-option label="701" value="701"></el-option>
										<el-option label="703" value="703"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item>
									<div class="btnList">
										<el-button type="primary" @click="doQuery">_提交_</el-button>
										<!-- <el-button type="text" class="reset" @click="resetForm('ruleForm1')">_重置_
										</el-button> -->
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
				<el-table-column prop="RowNo" label="序号" width="60"></el-table-column>
				<el-table-column label="操作" width="90">  
					<template scope="scope">
						<el-button size="small" type="text"   @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i></el-button>
						<el-button  type="text" size="small"  @click="ondelete(scope.$index,scope.row)"><i class="el-icon-delete"></i></el-button>
						<el-button  type="text" size="small"  @click="checkDetail(scope.$index,scope.row)"><i class="el-icon-information"></i></el-button>
					</template>
				</el-table-column>
				<el-table-column label="_状态_" width="120">
					<template scope="scope">
						<el-switch on-text="" off-text="" v-model="scope.row.FStatus" @change='onlyChange(scope.$index, scope.row)'></el-switch>
					</template>
				</el-table-column>
				<el-table-column prop="FShortName"  label="_公司简称_" width="120" show-overflow-tooltip ></el-table-column>
				<el-table-column prop="FVehicleName" label="_关联车牌号_" width="120" show-overflow-tooltip></el-table-column>
				<el-table-column prop="FAssetTypeID" label="_终端类别_" width="120" show-overflow-tooltip></el-table-column>
				<el-table-column prop="FAssetID" label="_终端号_" width="150" show-overflow-tooltip></el-table-column>
				<el-table-column prop="FManufactureDate" show-overflow-tooltip label="_出厂日期_" width="150"></el-table-column>
				<el-table-column prop="FCreateTime" show-overflow-tooltip label="_创建时间_" width="150"></el-table-column>
				<el-table-column prop="FDescription" show-overflow-tooltip label="_说明_" width="180" ></el-table-column>
				<el-table-column prop="" show-overflow-tooltip label=""  min-width="1" ></el-table-column>
				<!-- <el-table-column prop="FIsActiveUser"  width="100" label="_账号_"></el-table-column> -->
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
				simData:[],
				simKey:'',
				detailDialog:false,
				detail:'',  //详情展示
				simdialog:false,
				SystemID:null,//系统id  
				fguid:'',
				objDetail:{},
				FTHSs: [{
					label: '_无该外设_',
					value: 0
				},{
					label: '_正常_',
					value: 1
				},{
					label: '_异常_',
					value: 2
				}],
				pageSize: 20,
				pageIndex: 1,
				FTotalCount: 0,
				//SIM卡的表格
				pageSize1: 10,
				pageIndex1: 1,
				FTotalCount1: 0,
				dialogVisible: false,
				FGUIDs: '',
				isOpenDialog: false,
				table_height: null,
				anycheck: [],
				relatierol: false,
				addEquipment: false,
				editEquipment: false,
				peripheral_checkList: [],
				//搜索关键字
				searchCondition: {
					"FKey": "",
					"FState": "",
					"FType": ""
				},
				//新增设备
				ruleForm: {
					FAssetID: '',
					FAssetTypeID: '',
					FManufactureDate: new Date(),
					FSIMGUID: '',  //sim的id
					FSIMNumber:'',   //sim卡号
					FDescription: '',
					FAssetSerialID: '',
					FStatus: 1,
					checkList:[],
				},
				rules: {
					FAssetID: [{required: true, message: '_请输入终端号_'}],
					FAssetTypeID: [{required: true, message: '_请输入终端类型_'}],
					// FAssetSerialID: [{required: true, message: '_请输入序号_'}],
					//FManufactureDate: [{type: 'date', required: true, message: '_请输入出厂日期_', trigger: 'blur'}],
					//FManufactureDate: [{required: true,message: '_请输入出厂日期_'}],
					// FDescription: [{required: true, message: '_请输入描述_'}],
				},
				formLabelWidth: '120px',
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
			zuzhiSelectDialog
		},
		computed:{

	    },
		mounted(){
			var _this=this;
		    if(_this.$store.state.choiceSystemID==1){
		      this.SystemID=1;
		      this.url="/web/Trailer/Trailer_Report"
		    }else if(_this.$store.state.choiceSystemID==2){
		      this.SystemID=2;
		      this.url="/web/Lock/Lock_Report"
		    }else if(_this.$store.state.choiceSystemID==3){
		      this.SystemID=3;
		      this.url="/web/ColdChain/ColdChain_Report"
		    }else if(_this.$store.state.choiceSystemID==4){
		      this.SystemID=4;
		      this.url="/web/ColdChain/ColdChain_Report"
		    };
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
			res(){ //重置之后界面没有的字段,不能写空（FAssetSerialID）这个字段界面就没法置空
				let _this=this;
				if(this.objDetail.FStatus){  //不重置FStatus
                  	_this.objDetail={
						FAssetID: '',
						FAssetTypeID: '',
						FManufactureDate: new Date(),
						FSIMGUID: '',
						FSIMNumber:'',
						FDescription: ' ',
						FAssetSerialID: ' ',
						FStatus: 1,
						FTHS: '',
						FVideo: '',
						FRFID: '',
						FTPMS: '',
						FScreen: '',
						FCamera: ''
					}
				}else{                          //不重置FStatus
					_this.objDetail={
						FAssetID: '',
						FAssetTypeID: '',
						FManufactureDate: new Date(),
						FSIMGUID: '',
						FSIMNumber:'',
						FDescription: ' ',
						FAssetSerialID: ' ',
						FStatus: 0,
						FTHS: '',
						FVideo: '',
						FRFID: '',
						FTPMS: '',
						FScreen: '',
						FCamera: ''
					}
				}
			},
			timeChange(time){
			    var time1=Date.parse(new Date(time));
			    var uom1=new Date(time1);
			    var month1=(uom1.getMonth()+1).toString().length==1?"0"+(uom1.getMonth()+1).toString():(uom1.getMonth()+1);
			    var day1=uom1.getDate().toString().length==1?"0"+uom1.getDate():uom1.getDate();
			    return uom1.getFullYear()+'-'+month1+'-'+day1;
			},	
			//查看详情
      		checkDetail (index,row) {
		        let guid=row.FGUID;
		        this.detail={};
		        let _this = this;
		        let TokenID = this.$store.state.FTokenID;
		        //获取设备详情
		        $.ajax({
		          "url": "web/Common/Common_Admin",
		          "cache": false,
		          "async": true,
		          "type": "post",
		          "dataType": "json",
		          "contentType": "application/json; charset=utf-8",
		          "data": '{"FTokenID": "' + TokenID + '","FAction": "QueryAdminAssetByFGUID","FVersion": "1.0.0","FGUID":"' + guid + '"}',
		          success: function (data) {
		            console.log(data);
		            var Fobj = data;
		            _this.detailDialog=true;
		            _this.detail.FAssetID=Fobj.FObject[0].FAssetID;
		            _this.detail.FAssetSerialID=Fobj.FObject[0].FAssetSerialID;
		            _this.detail.FAssetTypeID=Fobj.FObject[0].FAssetTypeID;
		            _this.detail.FDescription=Fobj.FObject[0].FDescription;
		            _this.detail.FManufactureDate=Fobj.FObject[0].FManufactureDate.substring(0,10);
		            //_this.detail.FCreateTime=Fobj.FObject[0].FCreateTime.substring(0,10);
		            _this.detail.FCreateTime=_this.parseGMT(Fobj.FObject[0].FCreateTime.replace(/T/ig,' ').substring(0,19));
		            _this.detail.FTHS=Fobj.FObject[0].FTHS=='0'?'_无该外设_':Fobj.FObject[0].FTHS=='1'?'_正常_':Fobj.FObject[0].FTHS=='2'?'_异常_':'0';
		            _this.detail.FVideo=Fobj.FObject[0].FVideo=='0'?'_无该外设_':Fobj.FObject[0].FVideo=='1'?'_正常_':Fobj.FObject[0].FVideo=='2'?'_异常_':'0';
		            _this.detail.FRFID=Fobj.FObject[0].FRFID=='0'?'_无该外设_':Fobj.FObject[0].FRFID=='1'?'_正常_':Fobj.FObject[0].FRFID=='2'?'_异常_':'0';
		            _this.detail.FTPMS=Fobj.FObject[0].FTPMS=='0'?'_无该外设_':Fobj.FObject[0].FTPMS=='1'?'_正常_':Fobj.FObject[0].FTPMS=='2'?'_异常_':'0';
		            _this.detail.FScreen=Fobj.FObject[0].FScreen=='0'?'_无该外设_':Fobj.FObject[0].FScreen=='1'?'_正常_':Fobj.FObject[0].FScreen=='2'?'_异常_':'0';
		            _this.detail.FCamera=Fobj.FObject[0].FCamera=='0'?'_无该外设_':Fobj.FObject[0].FCamera=='1'?'_正常_':Fobj.FObject[0].FCamera=='2'?'_异常_':'0';
		            _this.detail.FStatus=Fobj.FObject[0].FStatus?'_启用_':'_禁用_';
		          },
		          error: function () {
		            console.log('_请求失败_')
		          }
		        });  
		    },
            simView(){
		        this.simdialog=true;
		        this.simKey='';
		        this.pageIndex1=1;
		        this.pageSize1=10;
		        this.simQuery();
		    },
			//查询启用且未使用SIM卡列表
			simQuery(){
                let _this = this;
				let TokenID = this.$store.state.FTokenID;
				let FKey=this.simKey;
				let PageSize1=this.pageSize1;
				let PageIndex1=this.pageIndex1;
				$.ajax({
					"url": "web/Common/Common_Admin",
					"cache": false,
					"async": true,
					"type": "post",
					"dataType": "json",
					"contentType": "application/json; charset=utf-8",
					"data": '{"FTokenID": "' + TokenID + '","FAction": "QueryAdminSIMNoUseList","FVersion": "1.0.0","FKey":"' + FKey + '","FPageSize":"' + PageSize1 + '","FPageIndex":"' + PageIndex1 + '"}',
					success: function (data) {
						console.log(data);
						//_this.simdialog=true;
						_this.simData = [];
						var Fobj = data;
						$.each(Fobj.FObject.Table1, function (index, obj) {
							obj.FSIMCardCCID=obj.FSIMCardCCID?obj.FSIMCardCCID:'--';
							obj.FDescription=obj.FDescription?obj.FDescription:'--';
							_this.simData.push(obj);
						});
						_this.FTotalCount1 = Fobj.FObject.Table[0].FTotalCount;
					},
					error: function () {
						console.log('_请求失败_')
					}
				});
			},
			//选择sim卡
			chooseSim(index,row){
				if(this.addEquipment){
					this.ruleForm.FSIMGUID=row.FGUID;
				    this.ruleForm.FSIMNumber=row.FSIMNumber;
				    this.simdialog=false;
				}
				else if(this.editEquipment){
					this.objDetail.FSIMGUID=row.FGUID;
				    this.objDetail.FSIMNumber=row.FSIMNumber;
				    this.simdialog=false;
				}
			},
			getTime: function (value) {
				console.log(value);
				if(this.bool){
					this.ruleForm.FManufactureDate=value;
				}else{
					this.objDetail.FManufactureDate=value;
				}
			},
			handleSizeChange(val) {
				this.pageSize = val;
				this.doQuery();
			},
			handleSizeChange1(val) {
				this.pageSize1 = val;
				this.simQuery();
			},
			handleCurrentChange(val) {
				this.pageIndex = val;
				this.doQuery();
			},
			handleCurrentChange1(val) {
				this.pageIndex1 = val;
				this.simQuery();
			},
			adjustPage(){
				this.table_height = this.elementsFlex("el_table_wrap", "main-content", "operate_wrapper", "pagination", true) + 8;
			},
			//重置表单
			resetForm(formName) {
				this.$refs[formName].resetFields();
				this.ruleForm.checkList=[];
			},
			//搜索框查询
			doQuery(){
				let _this = this;
				let TokenID = this.$store.state.FTokenID;
				let FKey = this.searchCondition.FKey;
				let FState = this.searchCondition.FState?this.searchCondition.FState:-1;
				let FType = this.searchCondition.FType?this.searchCondition.FType:-1;
				let PageSize = this.pageSize;
				let pageIndex = this.pageIndex;
				let FSystemType= this.SystemID;
				$.ajax({
					"url": "web/Common/Common_Admin",
					"cache": false,
					"async": true,
					"type": "post",
					"dataType": "json",
					"contentType": "application/json; charset=utf-8",
					"data": '{"FTokenID": "' + TokenID + '","FAction": "QueryAdminAssetList","FSystemType":"' + FSystemType + '","FVersion": "1.0.0","FKey":"' + FKey + '","FState":"' + FState + '","FType":"' + FType + '","FPageSize":"' + PageSize + '","FPageIndex":"' + pageIndex + '"}',
					success: function (data) {
						console.log(data);
						_this.equipmentList = [];
						var Fobj = data;
						$.each(Fobj.FObject.Table1, function (index, obj) {
							obj.FManufactureDate=obj.FManufactureDate.replace(/T/ig,' ').substring(0,10)
							//obj.FCreateTime=obj.FCreateTime.replace(/T/ig,' ').substring(0,10);
							obj.FCreateTime=_this.parseGMT(obj.FCreateTime.replace(/T/ig,' ').substring(0,19));
							obj.FVehicleName=obj.FVehicleName?obj.FVehicleName:'--';
							obj.FShortName=obj.FShortName?obj.FShortName:'--';
							obj.FDescription=obj.FDescription?obj.FDescription:'--';
							obj.FSIMNumber=obj.FSIMNumber?obj.FSIMNumber:'--';
							if(obj.FStatus==1){
								obj.FStatus=true
							}else{
								obj.FStatus=false
							}
							_this.equipmentList.push(obj);
						});
						_this.FTotalCount = Fobj.FObject.Table[0].FTotalCount;
						// _this.resetForm('ruleForm1');
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
				//保存勾选的guid
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
								"data":'{"FTokenID": "'+TokenID+'","FAction": "DeleteAdminAsset","FVersion": "1.0.0","FGUIDs":"'+Fgid+'"}',
								success: function (data) {
									console.log(data);
									_this.doQuery();
									_this.message('_删除成功_', 'success');
									//更新锁数据
									_this.$store.commit('getAllLocksData');
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
						"data": '{"FTokenID":"' + TokenID + '","FAction":"UpdateAdminAssetStatus","FGUIDs":"' + FGUIDs + '","FVersion":"1.0.0","FState":"' + FState + '"}',
						success: function (data) {
							console.log(data);
							_this.equipmentList=[];
							_this.doQuery();
							_this.message('_修改成功_','success');
							_this.anycheck=[];
							_this.$refs.multipleTable.clearSelection();
							//更新锁数据
							_this.$store.commit('getAllLocksData');
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
						"data": '{"FTokenID":"' + TokenID + '","FAction":"UpdateAdminAssetStatus","FGUIDs":"' + FGUIDs + '","FVersion":"1.0.0","FState":"' + FState + '"}',
						success: function (data) {
							console.log(data);
							if(data.Result!="200"){
				                _this.equipmentList[index].FStatus=_this.equipmentList[index].FStatus;
				            }else {
				              _this.message('_修改成功_', 'success');
				              _this.anycheck=[];
				              _this.$refs.multipleTable.clearSelection();
				              //更新锁数据
							  _this.$store.commit('getAllLocksData');
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
				let _this = this;
			    if(row.FIsActiveUser){
			   		_this.fguid=row.FGUID;
	               	let FGUID=_this.fguid;
			        let TokenID = _this.$store.state.FTokenID;
			        //获取设备详情
			        $.ajax({
			          "url": "web/Common/Common_Admin",
			          "cache": false,
			          "async": true,
			          "type": "post",
			          "dataType": "json",
			          "contentType": "application/json; charset=utf-8",
			          "data": '{"FTokenID": "' + TokenID + '","FAction": "QueryAdminAssetByFGUID","FVersion": "1.0.0","FGUID":"' + FGUID + '"}',
			          success: function (data) {
			            console.log(data);
			            _this.editEquipment=true;
			            var Fobj = data;
			            _this.objDetail=Fobj.FObject[0];
			            if(Fobj.FObject[0].FSIMGUID=='00000000-0000-0000-0000-000000000000'){
			                _this.objDetail.FSIMGUID='';
			            }
			            _this.objDetail.FSIMNumber=_this.objDetail.FSIMNumber?_this.objDetail.FSIMNumber:'';  //处理null
			            //alert(Fobj.FObject[0].FSIMStatus)
			            if(Fobj.FObject[0].FSIMStatus==1){         //绑过且正常
			            	_this.objDetail.FSIMGUID=Fobj.FObject[0].FSIMGUID; //避免禁掉又启动，重新赋值一遍
			            	_this.objDetail.FSIMNumber=Fobj.FObject[0].FSIMNumber;
			            }else if(Fobj.FObject[0].FSIMStatus==0){   //绑过且禁用
			            	_this.message('_原_SIM_已禁用_,_请重新选择_','info');
			            	_this.objDetail.FSIMGUID='';
                      		_this.objDetail.FSIMNumber='';
			            }else{                                     //未绑定或者绑定的卡已被删除
			            	return  
			            }
			          },
			          error: function () {
			            console.log('_请求失败_')
			          }
			        });
			    }else{
			    	return  _this.message('_非创建者账号_,_仅能查看_', 'info');
			    }
			},
			//提价新表单
			submitForm(formName) {
				var _this=this;
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let today=(Date.parse(new Date()));
						let TokenID = this.$store.state.FTokenID;
						let FAssetID = this.ruleForm.FAssetID;
						let FAssetTypeID = this.ruleForm.FAssetTypeID;
						let FManufactureDate=this.ruleForm.FManufactureDate?this.timeChange(this.ruleForm.FManufactureDate):this.timeChange(today);
						let FAssetSerialID = this.ruleForm.FAssetSerialID;
						let FSIMGUID = this.ruleForm.FSIMGUID;
						let FDescription = this.ruleForm.FDescription;
						let FTHS=this.ruleForm.checkList.indexOf('FTHS')>-1?1:0;
						let FVideo=this.ruleForm.checkList.indexOf('FVideo')>-1?1:0;
						let FRFID=this.ruleForm.checkList.indexOf('FRFID')>-1?1:0;
						let FTPMS=this.ruleForm.checkList.indexOf('FTPMS')>-1?1:0;
						let FScreen=this.ruleForm.checkList.indexOf('FScreen')>-1?1:0;
						let FCamera=this.ruleForm.checkList.indexOf('FCamera')>-1?1:0;
						let FSystemType=this.SystemID;
						let FStatus = this.ruleForm.FStatus;
						let JsonObj={
							FAssetID:FAssetID,
							FAssetTypeID:FAssetTypeID,
							FManufactureDate:FManufactureDate,
							FAssetSerialID:FAssetSerialID,
							FDescription:FDescription,
							FSIMGUID:FSIMGUID,
							FStatus:FStatus,
							FTHS:FTHS,
							FVideo:FVideo,
							FRFID:FRFID,
							FTPMS:FTPMS,
							FScreen:FScreen,
							FCamera:FCamera,
							FSystemType:FSystemType
						};
						var JsonStr;
 						JsonStr=JSON.stringify({"FTokenID":TokenID,"FAction":"AddAdminAsset","FT_AdminAsset":JsonObj,"FVersion":"1.0.0"});
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
								if(data.Result==105){
				                   _this.message('_该终端号已占用_', 'warning');
				                };
								_this.doQuery();
								_this.resetForm(formName);
								_this.ruleForm.checkList=[];
							    _this.addEquipment=false;
							    //更新锁数据
								_this.$store.commit('getAllLocksData');
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
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let today=(Date.parse(new Date()));
						let TokenID = this.$store.state.FTokenID;
						let FAssetID = this.objDetail.FAssetID;
						let FAssetTypeID = this.objDetail.FAssetTypeID;
						let FManufactureDate=this.objDetail.FManufactureDate?this.timeChange(this.objDetail.FManufactureDate):this.timeChange(today);
						let FAssetSerialID = this.objDetail.FAssetSerialID;
						let FSIMGUID = this.objDetail.FSIMGUID;
						let FDescription = this.objDetail.FDescription;
						let FTHS=this.objDetail.FTHS;
						let FVideo=this.objDetail.FVideo;
						let FRFID=this.objDetail.FRFID;
						let FTPMS=this.objDetail.FTPMS;
						let FScreen=this.objDetail.FScreen;
						let FCamera=this.objDetail.FCamera;
						let FStatus = this.ruleForm.FStatus;
                        var FGUID=this.fguid;
						console.log(FGUID)
						let JsonObj={
							FAssetID:FAssetID,
							FAssetTypeID:FAssetTypeID,
							FManufactureDate:FManufactureDate,
							FAssetSerialID:FAssetSerialID,
							FDescription:FDescription,
							FSIMGUID:FSIMGUID,
							FStatus:FStatus,
							FTHS:FTHS,
							FVideo:FVideo,
							FRFID:FRFID,
							FTPMS:FTPMS,
							FScreen:FScreen,
							FCamera:FCamera,
						};
						console.log(JsonObj)
						var JsonStr;
                        JsonStr=JSON.stringify({"FTokenID":TokenID,"FAction":"UpdateAdminAsset","FGUID":FGUID,"FT_AdminAsset":JsonObj,"FVersion":"1.0.0"});
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
								if(data.Result==105){
				                   _this.message('_该车牌号已占用_', 'warning');
				                };
								_this.doQuery();
								_this.resetForm(formName);
							    _this.editEquipment=false;
							    //更新锁数据
								_this.$store.commit('getAllLocksData');
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
			OpenDialog(){
				this.isOpenDialog = !this.isOpenDialog;
			},
			onResultChange(val){
				this.isOpenDialog = val;//④外层调用组件方注册变更方法，将组件内的数据变更，同步到组件外的数据状态中
			}

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
							FAssetID: '',
							FAssetTypeID: '',
							FManufactureDate: new Date(),
							FSIMGUID: '',
							FDescription: '',
							FAssetSerialID: '',
							FStatus: 1,
							checkList:[],
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
	.searchtable{
		height:40px;
		margin:-18px 0 0 0;
	}
    .leftbtn {
		float:left;
	}
	.rightinput {
		float:right;
		margin-right:10px;
	}
	.rightinput input,.searchtable .searchinput {
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
	.el-table .el-button{
	   padding:0;
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
	.warptable{
       border-bottom:1px solid #ccc;
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
    .adalter{
    	margin:22px 0  10px 0;
    }
    .adalter .el-checkbox-group .el-row--flex.is-justify-space-around .el-col{
       height:40px;
    }
	.alter .el-row{
       margin:22px 0 0 0 ;
    }
	.alter .el-select .el-input__inner,.sel .el-select .el-input__inner{
	  	width:140px;
	}
	/* .eqDialog .el-dialog, .chooseD .el-dialog{
	  width:850px;
	} */

	.eqDialog .el-dialog .el-dialog__body {
	    max-height:600px;
	    overflow:auto;
	    padding: 30px 20px 20px 20px;
	}
	.eqDialog .el-col{
		height:50px;
	}
	.hoverCursor .el-input__inner{
		display: inline-block;
	}
	.hoverCursor .el-input__inner:hover{
		cursor:pointer;
	}
	.chooseD .el-dialog .el-dialog__body {
	    max-height:600px;
	    overflow:auto;
	    padding: 30px 20px 10px 20px;
	}
		@media (min-width:1600px) {   
			.eqDialog .el-dialog--small,.chooseD .el-dialog--small{
			    width: 42%;
			} 
		}
	    @media (min-width:1300px) and (max-width:1599px){
	    	.eqDialog .el-dialog--small {
		    width: 56%;
		} 
	    }
	    @media (min-width:1200px) and (max-width:1299px){
	    	.eqDialog .el-dialog--small {
		    width: 52%;
		} 
	    }
	    @media (max-width:1199px) {
			.eqDialog .el-dialog--small {
			    width: 50%;
			} 
		}  
</style>