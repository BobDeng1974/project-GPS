<template xmlns:v-popover="http://www.w3.org/1999/xhtml">
  <section style="height: 100%">
    <!-- 详情展示 -->

      <el-dialog :visible.sync="detailDialog"  custom-class="vehical-info">
        <span slot="title" style="display: inline-block;margin: -15px 0 15px 0;color:white">_车辆详情_</span>
	        <table class="table table-bordered" style='table-layout:fixed'>
            <tbody>
             <tr>
               <td colspan="2" rowspan="3" width="30%">
                 <!-- <img style='border:1px solid #ccc;display:inline-block;width:209px;height:117px;'></img> -->
                  <img v-if="imageUrl3" :src="imageUrl3"  style='border:1px solid #ccc;display:inline-block;width:209px;height:117px;'> 
                  <img v-else  src='/static/img/details.png' style='border:1px solid #ccc;display:inline-block;width:209px;height:117px;'></img>
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
               <td colspan="5" style='word-wrap:break-word'>{{detail.FDescription}}</td>
             </tr>
           </tbody>
       </table> 
<!--        <template>
          <el-row :gutter="10">
            <div style='display:inline-block;width:209px;height:117px;position:absolute;left:20px'>
             &lt;!&ndash;  <img src='./209.PNG'></img> &ndash;&gt;

            </div>
            <el-col :span="8" :offset='8'>
				<div class="grid-content">
					<span class="labelCheck">_司机_:</span>
					<span class='check'>{{detail.FDriverName}}</span>
				</div>
			</el-col>
            <el-col :span="8"><div class="grid-content"><span class="labelCheck">_所属车队_:</span><span class='check'>{{detail.FVehicleGroupFullName}}</span></div></el-col>
          </el-row>
        </template>
        <template>
          <el-row :gutter="20">
            <el-col :span="8" :offset='8'><div class="grid-content"><span class="labelCheck">_发动机号_:</span><span class='check'>{{detail.FEngineNumber}}</span></div></el-col>
            <el-col :span="8"><div class="grid-content"><span class="labelCheck">_车辆类型_:</span><span class='check'>{{detail.FVehicleTypeID}}</span></div></el-col>
          </el-row>
        </template>
        <template>
          <el-row :gutter="20">
            <el-col :span="8" :offset='8'><div class="grid-content"><span class="labelCheck">_座位数量_(_个_):</span><span class='check'>{{detail.FSeatCount}}</span></div></el-col>
            <el-col :span="8"><div class="grid-content"><span class="labelCheck">_吨位_:</span><span class='check'>{{detail.FTonnage}}</span></div></el-col>
          </el-row>
        </template>
        <template>
          <el-row :gutter="20">
             <el-col :span="8"><div class="grid-content"><span class="labelCheck" style='width:100px'>_车牌号_:</span><span class='check'>{{detail.FVehicleName}}</span></div></el-col>
            <el-col :span="8"><div class="grid-content"><span class="labelCheck">_车辆颜色_:</span><span class='check'>{{detail.FColorRGB}}</span></div></el-col>
            <el-col :span="8"><div class="grid-content"><span class="labelCheck">_车身长度_(m):</span><span class='check'>{{detail.FLength}}</span></div></el-col>
          </el-row>
        </template>
        <template>
          <el-row :gutter="20">
            <el-col :span="8"><div class="grid-content"><span class="labelCheck" style='width:100px'>_车架号_:</span><span class='check'>{{detail.FVIN}}</span></div></el-col>
            <el-col :span="8"><div class="grid-content"><span class="labelCheck">_百公里油耗_(L):</span><span class='check'>{{detail.FFuelConsume}}</span></div></el-col>
            <el-col :span="8"><div class="grid-content"><span class="labelCheck">_保险公司_:</span><span class='check'>{{detail.FInsuCompany}}</span></div></el-col>
          </el-row>
        </template>
        <template>
          <el-row :gutter="20">
            <el-col :span="8"><div class="grid-content"><span class="labelCheck" style='width:100px'>_自编号_:</span><span class='check'>{{detail.FVehicleSerialCode}}</span></div></el-col> 
            <el-col :span="8"><div class="grid-content"><span class="labelCheck">_车辆购买日期_:</span><span class='check'>{{detail.FPurchaseDate}}</span></div></el-col>
            <el-col :span="8"><div class="grid-content"><span class="labelCheck">_注册日期_:</span><span class='check'>{{detail.FRegisDate}}</span></div></el-col>
          </el-row>
        </template>
        <template>
          <el-row :gutter="20">
            <el-col :span="8"><div class="grid-content"><span class="labelCheck" style='width:100px'>_营运证号_:</span><span class='check'>{{detail.FOperPermNumber}}</span></div></el-col>
            <el-col :span="8"><div class="grid-content"><span class="labelCheck">_道路运输证号_:</span><span class='check'>{{detail.FRoadTranNumber}}</span></div></el-col>
            <el-col :span="8"><div class="grid-content"><span class='labelCheck'>_道路运输证有效期_:</span><span class='check'>{{detail.FRoadTranDate}}</span></div></el-col>
          </el-row>
        </template>
        <template>
          <el-row :gutter="20">
            <el-col :span="8"><div class="grid-content"><span class="labelCheck" style='width:100px'>_设备号_:</span><span class='check'>{{detail.FAssetID}}</span></div></el-col> 
            <el-col :span="8"><div class="grid-content"><span class="labelCheck">_所属公司_:</span><span class='check'>{{detail.FShortName}}</span></div></el-col> 
            <el-col :span="8"><div class="grid-content"><span class="labelCheck">_技术登记有效期_:</span><span class='check'>{{detail.FTechRegDate}}</span></div></el-col>
          </el-row>
        </template>
        <template>
          <el-row :gutter="20">
            <el-col :span="8"><div class="grid-content"><span class="labelCheck" style='width:100px'>_运营类型_:</span><span class='check'>{{detail.FOperateType}}</span></div></el-col>
            <el-col :span="8"><div class="grid-content"><span class="labelCheck" >_油箱体积_(m³):</span><span class='check'>{{detail.FTankVolume}}</span></div></el-col>
            <el-col :span="8"><div class="grid-content"><span class="labelCheck">_状态_:</span><span class='check'>{{detail.FStatus}}</span></div></el-col>
          </el-row>
        </template>
        <template>
          <el-row :gutter="20">
           <el-col :span="8"><div class="grid-content"><span class="labelCheck" style='width:100px'>_燃油类型_:</span><span class='check'>{{detail.FFuelType}}</span></div>
           </el-col> 
            <el-col :span="8">
              <div class="grid-content">
                <span class="labelCheck" >_最大砼容量_(m³):</span>
                <span class='check'>{{detail.FMaxVariaLoad}}</span>
              </div>
            </el-col>
            <el-col :span="8"><div class="grid-content"><span class="labelCheck">_保险日期_:</span><span class='check'>{{detail.FInsuDate}}</span></div></el-col>
          </el-row>
        </template>
        <template>
          <el-row :gutter="20">
            <el-col :span="8"><div class="grid-content"><span class="labelCheck" style='width:100px'>_描述_:</span><span class='check'>{{detail.FDescription}}</span></div></el-col>
          </el-row>
        </template>-->

      </el-dialog>

    <!-- 选择所属车队-->
    <!-- <div class='sma'>
      <el-dialog title="_车队_" :visible.sync="motodialog" >
      <div class='searchtable'>
        <input type="text" placeholder="_请输入车队名称_" v-model='motoKey' class='searchinput'>
        <button class="glyphicon glyphicon-search searchBtn" style="height: 28px;" @click="motoQuery"></button>
      </div>
      <div>
        <el-table :data="motoData" height="450" empty-text='_暂无数据_'>
          <el-table-column prop='RowNo'  label="_序号_" width="70" ></el-table-column>
          <el-table-column label="操作" width="60">
            <template scope="scope">
              <el-button size="small" type="text" @click="choose(scope.$index, scope.row,'moto')">_选择_</el-button>
            </template>
          </el-table-column>
          <el-table-column property="FVehicleGroupFullName" label="_车队名称_" width="150"></el-table-column>
          <el-table-column property="FShortName" label="_公司简称_" width="150"></el-table-column>
        </el-table>
      </div>
      <div id="pagination" class="pagination" >
              <div class="block">
                <el-pagination
                  @size-change="handleSizeChange4"
                  @current-change="handleCurrentChange4"
                  :current-page="PageIndex4"
                  :page-sizes="[10, 20, 30]"
                  :page-size="PageSize4"
                  layout="prev, pager, next, jumper,total,sizes"
                  :total="total4">
                </el-pagination>
              </div>
            </div>
      </el-dialog>
    </div> -->
    <!-- 选择所属车队-->
    <div class='midd'>
      <el-dialog title="_车队_" :visible.sync="motodialog" top="25%">
      <!-- <div class='searchtable'>
        <input type="text" placeholder="_请输入车队名称_" v-model='motoKey' class='searchinput'>
        <button class="glyphicon glyphicon-search searchBtn" style="height: 28px;" @click="motoQuery"></button>
      </div> -->
      <div class='searchtable' style='height:30px;margin:-25px 0 5px 0;'>
        <input type="text" placeholder="_请输入车队名称_" v-model='motoKey' class='searchinput'>
      </div>
      <div>
        <el-tree :data="arry" :props="defaultProps3" default-expand-all @node-click="handleNodeClick3" :filter-node-method='filterNode3' ref='tree3' class='filter-tree' style='height:360px;overflow:auto'>
        </el-tree>
      </div>
      </el-dialog>
    </div>
    <!-- 选择设备1-->
    <div class='sma'> 
      <el-dialog title="_设备列表_" :visible.sync="equipdialog" >
        <div>
          <div class='searchtable'>
              <el-input style="width: 200px;" class="filter-item" placeholder="_请输入终端号_" v-model="searchEquip.FKey">
              </el-input>
              <el-select v-model="searchEquip.FType" placeholder="_请选择终端类型_">
                  <el-option label="_全部_" value="-1"></el-option>
                  <el-option label="701" value="701"></el-option>
                  <el-option label="702" value="702"></el-option>
                  <el-option label="703" value="703"></el-option>
                  <el-option label="704" value="704"></el-option>
                  <el-option label="705" value="705"></el-option>
                  <el-option label="706" value="706"></el-option>
                  <el-option label="707" value="707"></el-option>
              </el-select>
              <!-- <el-button class="filter-item" type="primary"  icon="search" @click="equipQuery">_搜索_</el-button> -->
              <el-button class="filter-item" type="primary"  icon="search" @click="equipQuery">_搜索_</el-button>
          </div>
          <div class='warptable'>
              <el-table :data="equipData" height="510" empty-text='_暂无数据_'>
                <el-table-column prop='RowNo' label="_序号_" width="85" ></el-table-column>
                 <el-table-column label="_操作_" width="80" show-overflow-tooltip>
                  <template scope="scope">
                    <!-- <el-button size="small" type="text" @click="choose(scope.$index, scope.row,'asset')">_选择_</el-button> -->
                    <a href="javascript:"  @click="choose(scope.$index, scope.row,'asset')">_选择_</a>
                  </template>
                </el-table-column>
                <el-table-column property="FAssetID" label="_终端号_" width="150" show-overflow-tooltip></el-table-column>
                <el-table-column property="FAssetTypeID" label="_终端类型_" width="150" show-overflow-tooltip></el-table-column>
                <el-table-column property="FSIMNumber" label="SIM_卡号_" width="180" show-overflow-tooltip></el-table-column>
                <el-table-column property="FDescription" label="_描述_" min-width="80" show-overflow-tooltip></el-table-column>
            </el-table>
          </div>
          <div id="pagination" class="pagination" >
            <div class="block">
              <el-pagination
                @size-change="handleSizeChange1"
                @current-change="handleCurrentChange1"
                :current-page="PageIndex1"
                :page-sizes="[15, 20, 30]"
                :page-size="PageSize1"
                layout="prev, pager, next, jumper,total,sizes"
                :total="total1">
              </el-pagination>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
    <!-- 选择司机3-->
    <div class='sma' style='background:red'>
      <el-dialog title="_司机列表_" :visible.sync="driverdialog" >
        <div class='searchtable'>
            <el-input style="width: 200px;" class="filter-item" placeholder="_请输入司机名称_" v-model="driverFey">
            </el-input>
            <el-button class="filter-item" type="primary"  icon="search" @click="driverQuery('true')">_搜索_</el-button>
        </div>
        <div class='warptable'>
          <el-table :data="driverData" height="510" empty-text='_暂无数据_'>
            <el-table-column prop='RowNo' label="_序号_" width="85"></el-table-column>
               <el-table-column label="_操作_" width="80">
                <template scope="scope">
                  <el-button size="small" type="text" @click="choose(scope.$index, scope.row,'driver')">_选择_</el-button>
                </template>
              </el-table-column>
              <el-table-column property="FDriverName" label="_司机名称_" width="150" show-overflow-tooltip></el-table-column>
               <el-table-column property="FDrivingExp" label="_驾龄_" width="100" show-overflow-tooltip></el-table-column>
               <el-table-column property="FSex" label="_性别_" width="80" show-overflow-tooltip></el-table-column>
               <el-table-column property="FDrivingType" label="_驾驶类型_" width="150" show-overflow-tooltip></el-table-column>
               <el-table-column property="FDescription" label="_描述_" min-width="100" show-overflow-tooltip></el-table-column>
          </el-table>
        </div>
        <!--分页-->
        <div class="pagination" id='pagination'>
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange3"
              @current-change="handleCurrentChange3"
              :current-page="PageIndex3"
              :page-sizes="[15, 20, 30]"
              :page-size="PageSize3"
              layout="prev, pager, next, jumper,total,sizes"
              :total="total3">
            </el-pagination>
          </div>
        </div>
      </el-dialog>
    </div>
    <!-- 修改车辆 -->
    <div class='large'>
      <el-dialog  title='_车辆管理_-_修改_' :visible.sync="editEquipment">
        <el-form :model="objDetail" :rules="rules" ref="objDetail" label-width="150px" class="demo-ruleForm">
          <el-row>
            <el-col :span='7' >
              <div class='exhibition'>
                <el-form-item label=""  prop="FImage" style='width:209px;height:112px;position:relative;left:75px;line-height:112px'>
                   <el-upload
                    class="avatar-uploader"
                    action="/Web/Common/FileUpload"
                    :show-file-list="false"
                    :on-error='uploadFailed'
                    :before-upload="beforeAvatarUpload"
                    :on-success="handleAvatarSuccess"
                    :data="{FAction:'FileUpload',FVersion:'1.0.0',FTokenID:'f4b204b4-2f7e-4700-bf3a-bd3b3ff258ca'}">
                    <img v-if="imageUrlDetail" :src="imageUrlDetail"  class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon" ></i>
                    <!-- <img v-else src='/static/img/plus.PNG'/> -->
                  </el-upload>
                </el-form-item>
              </div>
              <!-- <el-form-item label="_车辆图片_" prop="FImage">
                <el-input v-model="objDetail.FImage"></el-input>
              </el-form-item> -->
              <el-form-item label="_车牌号_" prop="FVehicleName" label-width="130px">
                <el-input v-model="objDetail.FVehicleName"></el-input>
              </el-form-item>
              <el-form-item label="_设备号_" prop="FAssetID" label-width="130px">
                <!-- <el-input v-model="objDetail.FAssetID" @focus="equipQuery('true')" readonly='readonly'></el-input> -->
                <el-input v-model="objDetail.FAssetID" @focus="equipView" class='hoverCursor'></el-input>
              </el-form-item>
              <div style='height:30px;margin-top:10px;cursor:pointer' @click='moreDetail'>
                 <div style='display:inline-block;position:relative;left:100px'>
                  <i class='el-icon-menu' style='font-size:20px;'></i>
                  <span style='margin:0 0 0 5px'>_其他信息_</span>
                </div>
              </div>
              <div v-if='view'>
              <el-form-item label="_保险公司_" prop="FInsuCompany" label-width="130px">
               <el-input v-model="objDetail.FInsuCompany"></el-input>
              </el-form-item>
              <el-form-item label="_保险日期_" prop="FInsuDate" label-width="130px">
                <el-date-picker type="date" placeholder="_选择日期_" v-model="objDetail.FInsuDate" style="width: 100%;"></el-date-picker>
              </el-form-item>
              <el-form-item label="_营运证号_" prop="FOperPermNumber" label-width="130px">
               <el-input v-model="objDetail.FOperPermNumber"></el-input>
              </el-form-item>
              <el-form-item label="_注册日期_" prop="FRegisDate" label-width="130px">
                <el-date-picker type="date" placeholder="_选择日期_" v-model="objDetail.FRegisDate" style="width: 100%;"></el-date-picker>
              </el-form-item>
              <el-form-item label="_发动机号_" prop="FEngineNumber" label-width="130px">
                <el-input v-model="objDetail.FEngineNumber"></el-input>
              </el-form-item>
              </div>
            </el-col>
            <el-col :span='8'>
              <el-form-item label="_所属车队_" prop="FVehicleGroupFullName" >
                <!-- <el-input v-model="objDetail.FVehicleGroupFullName" @focus="motoQuery" class='hoverCursor'></el-input> -->
                <el-input v-model="objDetail.FVehicleGroupFullName" @focus="motodialog=true" class='hoverCursor'></el-input>
              </el-form-item>
              
              <el-form-item label="_司机_" prop="FDriverName"  >
                <!-- <el-input v-model="objDetail.FDriverName" @focus="driverQuery('true')" class='hoverCursor'></el-input> -->
                <el-input v-model="objDetail.FDriverName" @focus="driverView" class='hoverCursor'></el-input>
              </el-form-item>
              
              <el-form-item label="_车辆颜色_" prop="FColorRGB" >
                <el-select v-model="objDetail.FColorRGB" placeholder="_请选择_">
                  <el-option v-for="item in FColorRGBs" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              
              <el-form-item label="_百公里油耗_(L)" prop="FFuelConsume">
                <el-input v-model="objDetail.FFuelConsume"></el-input>
              </el-form-item>
              <el-form-item label="_油箱体积_(m³)" prop="FTankVolume">
                <el-input v-model.number="objDetail.FTankVolume"></el-input>
              </el-form-item>
              <div style='height:30px;margin-top:10px;cursor:pointer' @click='moreDetail'>
                 <!-- <div style='display:inline-block;position:relative;left:100px'>
                  <i class='el-icon-menu' style='font-size:20px;'></i>
                  <span style='margin:0 0 0 5px'>_其他信息_</span>
                                 </div> -->
              </div>
              <div v-if='view'>
              <el-form-item label="_车身长度_(m)" prop="FLength">
               <el-input v-model.number="objDetail.FLength"></el-input>
              </el-form-item>
              <el-form-item label="_吨位_(t)" prop="FTonnage">
                <el-input v-model.number="objDetail.FTonnage"></el-input>
              </el-form-item>
              <el-form-item label="_车架号_" prop="FVIN">
                <el-input v-model="objDetail.FVIN"></el-input>
              </el-form-item>
              <el-form-item label="_座位数量_(_个_)" prop="FSeatCount">
                <el-input v-model.number="objDetail.FSeatCount"></el-input>
              </el-form-item>
              <el-form-item label="_描述_" prop="FDescription" >
                <el-input type="textarea" v-model="objDetail.FDescription" :maxlength="200" :rows="2"
                      placeholder='最多输入200字'></el-input>
              </el-form-item>
              </div>
            </el-col>
            <el-col :span='8'>
              <el-form-item label="_车辆类型_" prop="FVehicleTypeID">
                <el-select v-model="objDetail.FVehicleTypeID" placeholder="_请选择_">
                  <el-option v-for="item in FVehicleTypeIDs" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="_自编号_" prop="FVehicleSerialCode" >
                <el-input v-model="objDetail.FVehicleSerialCode"></el-input>
              </el-form-item>
              <el-form-item label="_运营类型_" prop="FOperateType" >
                <el-select v-model="objDetail.FOperateType" placeholder="_请选择_">
                  <el-option v-for="item in FOperateTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="_燃油类型_" prop="FFuelType" >
                <el-select v-model="objDetail.FFuelType" placeholder="_请选择_">
                  <el-option v-for="item in FFuelTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="_车辆购买日期_" prop="FPurchaseDate">
                <el-date-picker type="date" placeholder="_选择日期_" v-model="objDetail.FPurchaseDate" style="width: 100%;"></el-date-picker>
              </el-form-item>
              <div style='height:30px;margin-top:10px;cursor:pointer' @click='moreDetail'>
              </div>
              <div v-if='view'>
              <el-form-item label="_道路运输证号_" prop="FRoadTranNumber">
                <el-input v-model="objDetail.FRoadTranNumber"></el-input>
              </el-form-item>
              <el-form-item label="_最大砼容量_(m³)" prop="FMaxVariaLoad">
               <el-input v-model.number="objDetail.FMaxVariaLoad"></el-input>
              </el-form-item>
              <el-form-item label="_技术登记有效期_" prop="FTechRegDate">
                <el-date-picker type="date" placeholder="_选择日期_"   v-model="objDetail.FTechRegDate" style="width: 100%;"></el-date-picker>
              </el-form-item>
              <el-form-item label="_道路运输证有效期_" prop="FRoadTranDate">
               <el-date-picker type="date" placeholder="_选择日期_"  v-model="objDetail.FRoadTranDate" style="width: 100%;"></el-date-picker>
             </el-form-item>
             </div>
            </el-col>
            <el-col :span='1'></el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer" >
          <el-button type="primary" @click="submitForm11('objDetail')">_保存_</el-button>
          <el-button @click="editEquipment=false" type="button" class='el-button el-button--default cancel el-button--primary'>_取消_</el-button>
          <!-- <el-button @click="res">_取消_</el-button>  -->
        </div>
      </el-dialog>
    </div>
    <!-- 新增车辆 -->
    <div class='large'>
      <el-dialog  title='_车辆管理_-_新增_' :visible.sync="addEquipment" >
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
          <el-row>
            <el-col :span='7' >
            <div class='exhibition'>
              <el-form-item label="" prop="FImage" style='width:209px;height:112px;position:relative;left:75px;'>
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
                  <!-- <img v-else src='/static/img/plus.PNG' /> -->
                </el-upload>
              </el-form-item>
            </div>
             <!--  <el-form-item label="_车辆图片_" prop="FImage" label-width="130px">
               <el-input v-model="ruleForm.FImage"></el-input>
             </el-form-item> -->
              <el-form-item label="_车牌号_" prop="FVehicleName" label-width="130px">
                <el-input v-model="ruleForm.FVehicleName"></el-input>
              </el-form-item>
              <el-form-item label="_设备号_" prop="FAssetID" label-width="130px">
                <!-- <el-input v-model="ruleForm.FAssetID" @focus="equipQuery" readonly='readonly'></el-input> -->
                <el-input v-model="ruleForm.FAssetID" @focus="equipView" class='hoverCursor'></el-input>
              </el-form-item>
              <div style='height:30px;margin-top:10px;cursor:pointer' @click='moreDetail'>
                 <div style='display:inline-block;position:relative;left:100px'>
                  <i class='el-icon-menu' style='font-size:20px;'></i>
                  <span style='margin:0 0 0 5px'>_其他信息_</span>
                </div>
              </div>
              <div v-if='view'>
                <el-form-item label="_保险公司_" prop="FInsuCompany" label-width="130px">
                 <el-input v-model="ruleForm.FInsuCompany"></el-input>
                </el-form-item>  
                <el-form-item label="_保险日期_" prop="FInsuDate" label-width="130px">
                <el-date-picker type="date" placeholder="_选择日期_" v-model="ruleForm.FInsuDate" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="_营运证号_" prop="FOperPermNumber" label-width="130px">
               <el-input v-model="ruleForm.FOperPermNumber"></el-input>
              </el-form-item>

                <el-form-item label="_注册日期_" prop="FRegisDate" label-width="130px">
                <el-date-picker type="date" placeholder="_选择日期_" v-model="ruleForm.FRegisDate" style="width: 100%;"></el-date-picker>
              </el-form-item>
                <!-- <el-form-item label="_燃油类型_" prop="FFuelType" label-width="130px">
                  <el-select v-model="ruleForm.FFuelType" placeholder="_请选择_">
                    <el-option v-for="item in FFuelTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item> -->
                <el-form-item label="_发动机号_" prop="FEngineNumber" label-width="130px">
                  <el-input v-model="ruleForm.FEngineNumber"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span='8'>
              <el-form-item label="_所属车队_" prop="FVehicleGroupFullName" >
                 <!--  <el-input v-model="ruleForm.FVehicleGroupFullName" @focus="motoQuery" class='hoverCursor'></el-input> -->
                  <el-input v-model="ruleForm.FVehicleGroupFullName" @focus="motodialog=true" class='hoverCursor'></el-input>
              </el-form-item>
              
              <el-form-item label="_司机_" prop="FDriverName"  >
                  <el-input v-model="ruleForm.FDriverName" @focus="driverView" class='hoverCursor'></el-input>
              </el-form-item>
              
              <el-form-item label="_车辆颜色_" prop="FColorRGB" >
                  <el-select v-model="ruleForm.FColorRGB" placeholder="_请选择_">
                    <el-option v-for="item in FColorRGBs" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              <el-form-item label="_百公里油耗_(L)" prop="FFuelConsume">
                  <el-input v-model="ruleForm.FFuelConsume"></el-input>
                </el-form-item>
              <el-form-item label="_油箱体积_(m³)" prop="FTankVolume">
                  <el-input v-model.number="ruleForm.FTankVolume"></el-input>
                </el-form-item>
              <div style='height:30px;margin-top:10px;cursor:pointer' @click='moreDetail'>
                 <!-- <div style='display:inline-block;position:relative;left:100px'>
                  <i class='el-icon-menu' style='font-size:20px;'></i>
                  <span style='margin:0 0 0 5px'></span>
                                 </div> -->
              </div>
              <div v-if='view'>
                
                <el-form-item label="_车身长度_(m)" prop="FLength">
               <el-input v-model.number="ruleForm.FLength"></el-input>
              </el-form-item>
                <el-form-item label="_吨位_(t)" prop="FTonnage">
                  <el-input v-model.number="ruleForm.FTonnage"></el-input>
                </el-form-item>
                <el-form-item label="_车架号_" prop="FVIN">
                  <el-input v-model="ruleForm.FVIN"></el-input>
                </el-form-item>
                <el-form-item label="_座位数量_(_个_)" prop="FSeatCount">
                  <el-input v-model.number="ruleForm.FSeatCount"></el-input>
                </el-form-item>
                <el-form-item label="_描述_" prop="FDescription" >
                 <el-input type="textarea" v-model="ruleForm.FDescription" :maxlength="200" :rows="2"
                       placeholder='最多输入200字'></el-input>
               </el-form-item>
              </div>
            </el-col>
            <el-col :span='8'>
              <el-form-item label="_车辆类型_" prop="FVehicleTypeID">
                <el-select v-model="ruleForm.FVehicleTypeID" placeholder="_请选择_">
                  <el-option v-for="item in FVehicleTypeIDs" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
                <el-form-item label="_自编号_" prop="FVehicleSerialCode" >
                  <el-input v-model="ruleForm.FVehicleSerialCode"></el-input>
                </el-form-item>
                <el-form-item label="_运营类型_" prop="FOperateType" >
                  <el-select v-model="ruleForm.FOperateType" placeholder="_请选择_">
                    <el-option v-for="item in FOperateTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="_燃油类型_" prop="FFuelType" >
                  <el-select v-model="ruleForm.FFuelType" placeholder="_请选择_">
                    <el-option v-for="item in FFuelTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
               
              <el-form-item label="_车辆购买日期_" prop="FPurchaseDate">
                <el-date-picker type="date" placeholder="_选择日期_" v-model="ruleForm.FPurchaseDate" style="width: 100%;"></el-date-picker>
              </el-form-item>
              <div style='height:30px;margin-top:10px;cursor:pointer' @click='moreDetail'>
                 <!-- <div style='display:inline-block;position:relative;left:100px'>
                  <i class='el-icon-menu' style='font-size:20px;'></i>
                  <span style='margin:0 0 0 5px'></span>
                </div> -->
              </div>
              <div v-if='view'>
                <el-form-item label="_道路运输证号_" prop="FRoadTranNumber">
                  <el-input v-model="ruleForm.FRoadTranNumber"></el-input>
                </el-form-item>
                <el-form-item label="_最大砼容量_(m³)" prop="FMaxVariaLoad">
               <el-input v-model.number="ruleForm.FMaxVariaLoad"></el-input>
              </el-form-item>
                <el-form-item label="_技术登记有效期_" prop="FTechRegDate">
                  <el-date-picker type="date" placeholder="_选择日期_"   v-model="ruleForm.FTechRegDate" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="_道路运输证有效期_" prop="FRoadTranDate">
                 <el-date-picker type="date" placeholder="_选择日期_"  v-model="ruleForm.FRoadTranDate" style="width: 100%;"></el-date-picker>
               </el-form-item>
              </div>
            </el-col>
            <el-col :span='1'></el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer" >
          <el-button type="primary" @click="submitForm('ruleForm')">_保存_</el-button>
          <el-button @click="resetForm('ruleForm')" type="button" class='el-button el-button--default cancel el-button--primary'>_重置_</el-button>
        </div>
      </el-dialog>
    </div>
    <el-row :gutter="6" style="height: 100%">
      <el-col :span="6" style="height: 100%">
        <div class="carTeamList">
          <el-input
            class="filterInput"
            placeholder="_输入关键字_"
            v-model="filterText">
          </el-input>
          <el-tree
            class="filter-tree"
            :data="data3"
            :props="defaultProps"
            default-expand-all
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            :render-content="renderContent"
            @node-click="handleNodeClick"
            ref="tree2">
          </el-tree>
        </div>
      </el-col>
      <el-col :span="18">
        <div id="operate_wrapper">
          <div class="box-header">
            <el-row type="flex" justify="space-between">
              <el-col :span="16">
                <el-button type="primary" icon="edit" size="small" @click='adVehicle'><span
                    style="color: white">_新建_</span>
                </el-button>
                <el-button type="primary" icon="caret-right" size="small" @click='changeStatus(true)'>_启用_</el-button>
                <el-button type="primary" icon="circle-close" size="small" @click='changeStatus(false)'>_禁用_
                </el-button>
                <el-button type="primary" icon="delete" size="small" @click="ondelete">_删除_</el-button>
                <el-button type="primary" class="glyphicon glyphicon-refresh" size="small" @click="reload">_刷新_
                </el-button>
              </el-col>
              <el-col :span="8">
                <div class="rightinput" style="position: relative;margin-right:30px">
                  <input type="text" placeholder="_请输入车牌号_" v-model="searchKey" @keyup.enter="queryCarList(searchKey)">
                  <button class="glyphicon glyphicon-search searchBtn" style="height: 28px;position:absolute;top:14px;right:20px"
                       @click="queryCarList(searchKey)"></button>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="el_table_wrap" id="el_table_wrap">
          <el-table
            ref="multipleTable"
            :data="tableData3"
            :height="table_height"
            stripe
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange" empty-text='_暂无数据_'>
            <el-table-column
              type="selection"
              width="50">
            </el-table-column>
            <el-table-column
              prop="RowNo"
              label="_序号_"
              width="80">
            </el-table-column>
            <el-table-column
              
              label="_操作_"
              width="90">
              <template scope="scope">
                <el-button  type="text" size="small" @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i></el-button>
                <el-button  type="text" size="small"  @click="ondelete(scope.$index,scope.row)"><i class="el-icon-delete"></i></el-button>
                <el-button  type="text" size="small"  @click="checkDetail(scope.$index,scope.row)"><i class="el-icon-information"></i></el-button>
              </template>
            </el-table-column>
             <el-table-column
              label="_状态_" width="100">
              <template scope="scope">
                <el-switch on-text="" off-text="" v-model="scope.row.FStatus" @change='onlyChange(scope.$index, scope.row)'></el-switch>
              </template>
            </el-table-column >
            <el-table-column
              prop="FVehicleGroupFullName"
              label="_车队名称_"
              width="120" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="FVehicleName"
              label="_车牌号_"
              width="120" show-overflow-tooltip>
            </el-table-column>
             <el-table-column
              prop="FShortName"
              label="_公司名称_"
              width="120" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="FDriverName"
              label="_司机姓名_"
              width="120" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="FVehicleTypeID"
              label="_车辆类型_"
              width="100" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="FAssetID"
              label="_终端号_"
              width="130" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="FSIMNumber"
              label="SIM_卡号_"
              width="150" show-overflow-tooltip>
            </el-table-column>
            <!-- <el-table-column
              prop="FVehicleSerialCode"
              label="_自编号_"
              width="120" show-overflow-tooltip>
            </el-table-column> -->
            <el-table-column
              prop="FDescription"
              label="_描述_"
              min-width="100" show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </div>
        <!--分页还是统一用饿了么的组件，事件、配置都还挺好-->
        <div id="pagination" class="pagination"><!--part3 header start-->
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="PageIndex"
              :page-sizes="[10, 20, 30]"
              :page-size="PageSize"
              layout="prev, pager, next, jumper,total,sizes"
              :total="total">
            </el-pagination>
          </div>
        </div><!--part3 header end-->
      </el-col>
    </el-row>
  </section>
</template>
<script>
  let _this=this;
  export default {
    data() {
      const checkNum = (rule, value, callback) => {
              /*if (!value) {
                return callback(new Error('年龄不能为空'));
                console.log(value)
              }*/
                if (value && !Number.isInteger(value)) {
                  callback(new Error('_请输入正整数_'));
                } else {
                  if (value && value < 0) {
                    callback(new Error('_请输入正整数_'));
                  } else {
                    callback();
                  }
                }
            };
      const checkdata = (rule,value,callback) => {
            if (isNaN(value)) {
               callback(new Error('_请输入数字_'));
            } else if(value<0){
              callback(new Error('_负数无效_'));
            }else {
               callback();
            }
        };
      _this=this;
      return {
        view:false,
        handObj:'',
        driverArr:[],
        //equipArr:[],
        motoArr:[],
        defaultProps3: {
          children: 'children',
          label: 'FVehicleGroupFullName'
        },
        imageUrl: '',
        imageUrlDetail: '',
        imageUrl3: '',
        searchKey:'',
        searchEquip: {
          FKey: '',
          FType: '',
        },
        //车型
        FVehicleTypeIDs: [{
          label: '_厢车_',
          value: 0
        },{
          label: '_罐车_',
          value: 1
        },{
          label: '_其他_',
          value: 2
        }],
        //颜色
        FColorRGBs: [{
          label: '_红_',
          value: 0
        },{
          label: '_黄_',
          value: 1
        },{
          label: '_蓝_',
          value: 2
        },{
          label: '_橙_',
          value: 3
        },{
          label: '_紫_',
          value: 4
        },{
          label: '_绿_',
          value: 5
        },{
          label: '_其他_',
          value: 6
        }],
        //燃油类型
        FFuelTypes:[
          {
            label: '_汽油_',
            value: 0
          },
          {
            label: '_柴油_',
            value: 1
          },
          {
            label: '_乙醇_',
            value: 2
          },
          {
            label: '_液化天然气_',
            value: 3
          },
          {
            label: '_压缩天然气_',
            value: 4
          },
          {
            label: '_其他_',
            value: 5
          },
        ],
        //运营类型
        FOperateTypes:[
          {
            label: '_经营租赁_',
            value: '0'
          },
          {
            label: '_以租代售_',
            value: '1'
          },
          {
            label: '_直销_',
            value: '2'
          },
          {
            label: '_自营_',
            value: '3'
          },
          {
            label: '_试车_',
            value: '4'
          },
          {
            label: '_融资租赁_',
            value: '5'
          },
          {
            label: '_其他_',
            value: '6'
          }
        ],
        //新增车辆
        ruleForm:{
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
         // FShortName:'',
          FOperateType:'',
          FDriverName:'',
          FDescription:'',
          FStatus:1,
          FAssetGUID:'',  //终端唯一标识ID
          FVehicleGroupGUID:'',  //车队ID
        //  FAgentGUID:'',    //代理商ID
          FAdminDriverGUID:''  //司机id
        },
        objDetail:{},
        rules: {
          FVehicleName: [{required: true, message: '_请输入车牌号_'}],
          // FAssetID: [{required: true, message: '_请选择终端_'}],
          FVehicleGroupFullName: [{required: true, message: '_请选择车队_'}],
          FShortName: [{required: true, message: '_请选择代理商_'}],
          // FDriverName: [{required: true, message: '_请选择司机_'}],
          FSeatCount: [{ validator: checkNum }],
          FLength: [{ validator: checkdata }],
          FMaxVariaLoad: [{ validator: checkdata }],
          FTankVolume: [{ validator: checkNum }],
          FTonnage: [{ validator: checkdata }],
        },
        dialogVisible: false,
        addEquipment: false,
        editEquipment: false,
        detailDialog:false,
        detail:'',  //详情展示
        index: '',
        value1: true,
        filterText: '',
        table_height:null,
        multipleSelection: [],
        FGUIDs:'',
        guid:'',
        arry:[],
        form: {
          carNum: '',
          status: '',
          starTime: '',
          endTime: '',
        },
        data3:null,
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        tableData3:null,
        PageIndex:1,
        PageSize:20,
        total:0,
        SystemID:null,//系统id 
        //搜索未使用设备
        equipdialog:false,
        PageIndex1:1,
        PageSize1:15,
        total1:0,
        equipSearch:{  
          FKey:'',
          FType:''
        },
        equipData:[],
        //搜索公司
        companydialog:false,
        PageIndex2:1,
        PageSize2:10,
        total2:0,
        companyFey:'',
        companyData:[],
        //搜索司机
        driverdialog:false,
        PageIndex3:1,
        PageSize3:15,
        total3:0,
        driverFey:'',
        driverData:[],
        //搜索车队
        motodialog:false,
        PageIndex4:1,
        PageSize4:10,
        total4:0,
        motoKey:'',
        motoData:[],
      };
    },
    mounted(){
      setTimeout(() => {
        this.adjustPage();
      },100);
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
      //获取所有车辆列表
      if (this.$store.state.allCarsList != null) {
        setData()
      } else {
        this.$store.commit('getAllCarsData', setData)
      }
      function setData() {
        _this.data3 = _this.$store.state.allCarsData;
        console.log(_this.data3)
      }
      this.queryCarList("")
    },
    computed: {

    },
    components: {
     
    },
    methods: {
      moreDetail(){
        this.view=!this.view;
      },
      handleAvatarSuccess(res, file) {
        console.log('res',res);
        console.log('file',file);
        if(this.addEquipment){
          this.imageUrl = URL.createObjectURL(file.raw);
          this.ruleForm.FImage=res.FObject;
        }else if(this.editEquipment){
          this.imageUrlDetail  = URL.createObjectURL(file.raw);
          this.objDetail.FImage=res.FObject;
        }
      },
      uploadFailed(err, file, fileList){
        setTimeout(() => {
          this.message('_上传失败_','warning');
        },1000);
      },
      beforeAvatarUpload(file) {
        console.log(file)
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('_上传图片大小不能超过_2MB!');
        }
        return isLt2M;
      },
      onprogress(event, file, fileList){

      },
      renderContent(h, { node, data, store }){
          return(
                  <span>
                    <i class="fa fa-home icon fa-lg" v-show={data.id.indexOf("@A")!=-1}></i>
                    <i class="fa fa-building icon" v-show={data.id.indexOf("@B")!=-1}></i>
                    <i class="fa fa-flag-checkered icon" v-show={data.id.indexOf("@C")!=-1}></i>
                    <i class="fa fa-truck icon" v-show={data.id.indexOf("@B")==-1&data.id.indexOf("@A")==-1&data.id.indexOf("@C")==-1}></i>
                    {node.label}
                    <span v-show={data.id.indexOf("@B")!=-1||data.id.indexOf("@A")!=-1||data.id.indexOf("@C")!=-1} style="font-weight:bold">[{data.count}]</span>
                    <span style="margin-left:10px" v-show={data.id.indexOf("@B")==-1&data.id.indexOf("@A")==-1&data.id.indexOf("@C")==-1}>({data.deviceId})</span>
                  </span>
                )
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      handleNodeClick(data){
        this.queryCarList(data.label)
      },
      filterNode3(value, data) {
        if (!value) return true;
        return data.FVehicleGroupFullName.indexOf(value) !== -1;
      },
      //选择车队节点
      handleNodeClick3(data){
        console.log(data);
        let _this=this;
        if(data.FStatus){
          if(this.addEquipment){
            this.ruleForm.FVehicleGroupFullName=data.FVehicleGroupFullName;
            this.ruleForm.FVehicleGroupGUID=data.FGUID;
            this.motodialog=false;
          }else if(this.editEquipment){
            this.objDetail.FVehicleGroupFullName=data.FVehicleGroupFullName;
            this.objDetail.FVehicleGroupGUID=data.FGUID;
            this.motodialog=false;
          }
        }else{
              return _this.message('_该车队已禁用_,_请重新选择_','info');
            }
      },
      adjustPage(){
        this.table_height = this.elementsFlex("el_table_wrap", "main-content", "operate_wrapper", "pagination", true);
      },
      //提示信息
      message(msg, type){
        this.$message({
          showClose: true,
          message: msg,
          type: type
        });
      },
      /*Pagination*/
      handleSizeChange(val) {
        _this.PageSize=val
        _this.queryCarList("")
      },
      handleCurrentChange(val) {
        this.PageIndex=val
        this.queryCarList("")
      },
      handleSizeChange1(val) {
        this.PageSize1=val;
        this.equipQuery();
      },
      handleCurrentChange1(val) {
        this.PageIndex1=val
        this.equipQuery();
      },
      handleSizeChange3(val) {
        this.PageSize3=val;
        this.driverQuery('true');
      },
      handleCurrentChange3(val) {
        this.PageIndex3=val
        this.driverQuery('true');
      },
      handleSizeChange4(val) {
        this.PageSize4=val;
        this.motoQuery();
      },
      handleCurrentChange4(val) {
        this.PageIndex4=val
        this.motoQuery();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection);
        let arrFGUID = [];
        this.multipleSelection.forEach(obj=> {
          arrFGUID.push(obj.FGUID);
        })
        this.FGUIDs = arrFGUID.join(',');
      },
      //查询车辆列表
      queryCarList(key){
        let FSystemType=this.SystemID;
        $.ajax({
          "url": "/web/Common/Common_Admin",
          "cache": false,
          "async": true,
          "type": "post",
          "dataType": "json",
          "contentType": "application/json; charset=utf-8",
          "data": '{"FTokenID":"' + _this.$store.state.FTokenID + '","FAction":"QueryAdminVehicleList","FKey":"'+key+'","FPageSize":"'+_this.PageSize+'","FPageIndex":"'+_this.PageIndex+'","FVersion":"1.0.0","FSystemType":"' + FSystemType + '"}',
          success: function (json) {
            console.log(json);
            _this.total=json.FObject.Table[0].FTotalCount
            _this.tableData3=json.FObject.Table1
            $.each( _this.tableData3,function (index,obj) {
              obj.FStatus=obj.FStatus?true:false
              obj.FCreateTime=_this.parseGMT(obj.FCreateTime.replace(/T/ig,' '));
              obj.FVehicleTypeID=obj.FVehicleTypeID=='0'?'_厢车_':obj.FVehicleTypeID=='1'?'_罐车_':obj.FVehicleTypeID=='2'?'_其他_':'_其他_';
              obj.FColorRGB=obj.FColorRGB=='0'?'_红_':obj.FColorRGB=='1'?'_黄_':obj.FColorRGB=='2'?'_蓝_':obj.FColorRGB=='3'?'_橙_':obj.FColorRGB=='4'?'_紫_':obj.FColorRGB=='5'?'_绿_':obj.FColorRGB=='6'?'_其他_':'其他';
              obj.FSIMNumber=obj.FSIMNumber?obj.FSIMNumber:'--';
              obj.FDescription=obj.FDescription?obj.FDescription:'--';
              obj.FDriverName=obj.FDriverName?obj.FDriverName:'--';
              obj.FAssetID=obj.FAssetID?obj.FAssetID:'--';
            })
          },
          error:function () {

          }
        })
      },
      //多选修改设备状态
      changeStatus: function (parm) {
        var _this = this;
        if (this.multipleSelection.length == 0) {
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
            "data": '{"FTokenID":"' + TokenID + '","FAction":"UpdateAdminVehicleStatus","FGUIDs":"' + FGUIDs + '","FVersion":"1.0.0","FState":"' + FState + '"}',
            success: function (data) {
              console.log(data);
              _this.tableData3=[];
              _this.queryCarList("");
              _this.message('_修改成功_','success');
              _this.multipleSelection=[];
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
            "data": '{"FTokenID":"' + TokenID + '","FAction":"UpdateAdminVehicleStatus","FGUIDs":"' + FGUIDs + '","FVersion":"1.0.0","FState":"' + FState + '"}',
            success: function (data) {
              console.log(data);
              /*_this.tableData3=[];
              _this.queryCarList("");*/
              if(data.Result!="200"){
                _this.tableData3[index].FStatus=_this.tableData3[index].FStatus;
              }else {
               _this.message('_修改成功_', 'success');
               _this.multipleSelection=[];
                _this.$refs.multipleTable.clearSelection();
              }
              _this.multipleSelection=[];
            },
            error: function () {
              console.log('_请求失败_')
            }
          });
      },
      //删除单选或者多选
      ondelete(index,rows) {
          let TokenID=this.$store.state.FTokenID;
            let _this=this;
            let Fgid='';
            if(rows==undefined){  //点击多选删除
              if(this.multipleSelection.length == 0){
                  _this.message('_请先勾选_', 'warning');
              }else{        
                 Fgid=_this.FGUIDs;
              }
            }else{              //点击单选删
                Fgid=rows.FGUID;
            }
      if(Fgid){  //勾选或者选中某行则执行删除操作
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
                "data":'{"FTokenID": "'+TokenID+'","FAction": "DeleteAdminVehicle","FVersion": "1.0.0","FGUIDs":"'+Fgid+'"}',
                success: function (data) {
                  console.log(data);
                  _this.tableData3=[];
                  _this.queryCarList("");
                  function setData(){
                    _this.data3 = _this.$store.state.allCarsData;
                  }
                  _this.$store.commit('getAllCarsData',setData);
                  _this.message('_删除成功_', 'success');
                },
                error:function () {
                      console.log('_请求失败_')
                    }
              });
              })
            .catch(() => {
              this.$message.info('_已取消操作_!');
              _this.multipleSelection=[];
              _this.$refs.multipleTable.clearSelection();
            });
      }else{
            return false
          }
      },
      reload:function () {
        this.queryCarList("")
      },
      toggleSelection(rows) {
        this.$refs.multipleTable.clearSelection();
      },
      timeChange(time){
            var time1=Date.parse(new Date(time));
            var uom1=new Date(time1);
            var month1=(uom1.getMonth()+1).toString().length==1?"0"+(uom1.getMonth()+1).toString():(uom1.getMonth()+1);
            var day1=uom1.getDate().toString().length==1?"0"+uom1.getDate():uom1.getDate();
            return uom1.getFullYear()+'-'+month1+'-'+day1;
      },
      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.imageUrl='';
      },
      //点击新建
      adVehicle(){
        this.addEquipment=true;
        this.motoQuery();
      },
      //查询启用公司列表
      companyQuery(){
        let _this = this;
        let TokenID = this.$store.state.FTokenID;
        let FKey=this.companyFey;
        let PageSize=this.PageSize2;
        let PageIndex=this.PageIndex2;
        $.ajax({
          "url": "web/Common/Common_SuperAdmin",
          "cache": false,
          "async": true,
          "type": "post",
          "dataType": "json",
          "contentType": "application/json; charset=utf-8",
          "data": '{"FTokenID": "' + TokenID + '","FAction": "QuerySuperAdminAgentEnableList","FVersion": "1.0.0","FKey":"' + FKey + '","FPageSize":"' + PageSize + '","FPageIndex":"' + PageIndex + '"}',
          success: function (data) {
            console.log(data);
            _this.companydialog=true;
            _this.companyData = [];
            _this.PageSize2=10;
            _this.PageIndex2=1;
            var Fobj = data;
            $.each(Fobj.FObject.Table1, function (index, obj) {
              _this.companyData.push(obj);
            });
            _this.total2 = Fobj.FObject.Table[0].FTotalCount;
          },
          error: function () {
            console.log('_请求失败_')
          }
        });
      },
      //查询司机列表
      driverQuery(parm1){
        let _this = this;
        let TokenID = this.$store.state.FTokenID;
        let FKey=this.driverFey;
        console.log('parm1',parm1)
        if(parm1==='true'){     //翻页等
          var PageSize=this.PageSize3;
        }else if(parm1==='false'){     //检测是否重复请求所有数据
         var PageSize=9999999;
        }
        let PageIndex=this.PageIndex3;
        $.ajax({
          "url": "web/Common/Common_Admin",
          "cache": false,
          "async": true,
          "type": "post",
          "dataType": "json",
          "contentType": "application/json; charset=utf-8",
          "data": '{"FTokenID": "' + TokenID + '","FAction": "QueryAdminDriverEnableList","FVersion": "1.0.0","FKey":"' + FKey + '","FPageSize":"' + PageSize + '","FPageIndex":"' + PageIndex + '"}',
          success: function (data) {
            console.log(data);
            _this.driverData = [];
            var Fobj = data;
            _this.driverArr=[];
            $.each(Fobj.FObject.Table1, function (index, obj) {
              _this.driverArr.push(obj.FGUID);  //保存可用司机id
              obj.FSex=obj.FSex?'_男_':'_女_';
              obj.FDrivingType=obj.FDrivingType=='0'?'_大型货车_':obj.FDrivingType=='1'?'_牵引车_':obj.FDrivingType=='2'?'_小型自动挡_':obj.FDrivingType=='3'?'_大型客车_':obj.FDrivingType=='4'?'_城市公交车_':obj.FDrivingType=='5'?'_中型汽车_':obj.FDrivingType=='6'?'_小型汽车_':'_小型汽车_';
              obj.FDescription=obj.FDescription?obj.FDescription:'--';
              _this.driverData.push(obj);
            });
            _this.total3 = Fobj.FObject.Table[0].FTotalCount;
          },
          error: function () {
            console.log('_请求失败_')
          }
        });
      },
      //查询终端列表
      equipQuery(){
        let _this = this;
        let TokenID = this.$store.state.FTokenID;
        let FKey=this.searchEquip.FKey;
        let FType=this.searchEquip.FType?this.searchEquip.FType:-1;
        let PageSize=this.PageSize1;
        /*if(parm2==='true'){     //翻页等
          var PageSize=this.PageSize1;
        }else if(parm2==='false'){     //检测是否重复请求所有数据
         var PageSize=9999999;
        }*/
        let PageIndex=this.PageIndex1;
        let FSystemType=this.SystemID;
        $.ajax({
          "url": "web/Common/Common_Admin",
          "cache": false,
          "async": true,
          "type": "post",
          "dataType": "json",
          "contentType": "application/json; charset=utf-8",
          "data": '{"FTokenID": "' + TokenID + '","FAction": "QueryAdminAssetNoUseList","FVersion": "1.0.0","FKey":"' + FKey + '","FType":"' + FType + '","FPageSize":"' + PageSize + '","FPageIndex":"' + PageIndex + '","FSystemType":"' + FSystemType + '"}',
          success: function (data) {
            console.log(data);
           // _this.equipdialog=true;
            _this.equipData = [];
            var Fobj = data;
            //_this.equipArr=[];
            /*$.each(Fobj.FObject.Table1, function (index, obj) {
                if(obj.FStatus){
                  _this.equipArr.push(obj.FAssetID);  //判断设备启用状态
                }else{
                  return
                }
            });*/
            $.each(Fobj.FObject.Table1, function (index, obj) {
                  obj.FDescription=obj.FDescription?obj.FDescription:'--';  //设备列表
                  obj.FSIMNumber=obj.FSIMNumber?obj.FSIMNumber:'--';
                  _this.equipData.push(obj);
             });
            _this.total1 = Fobj.FObject.Table[0].FTotalCount;
          },
          error: function () {
            console.log('_请求失败_')
          }
        });
      },
      //查询当前用户所属车队
      motoQuery(){
        let _this = this;
        let TokenID = this.$store.state.FTokenID;
        let FKey=this.motoKey;
        let PageSize=999999;
        let PageIndex=this.PageIndex4;
        $.ajax({
          "url": "web/Common/Common_Admin",
          "cache": false,
          "async": true,
          "type": "post",
          "dataType": "json",
          "contentType": "application/json; charset=utf-8",
          "data": '{"FTokenID": "' + TokenID + '","FAction": "QueryAdminVehicleGroupListByFUserGUID","FVersion": "1.0.0","FKey":"' + FKey + '","FPageSize":"' + PageSize + '","FPageIndex":"' + PageIndex + '"}',
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
                    // console.log(_obj);
                    _arr.push(_obj);
                  }
                }
                return _arr;
              }
             // _this.motodialog=true;
              transTreeData(Fobj.FObject.Table1);
              _this.arry=transTreeData(Fobj.FObject.Table1);
                console.log('Fobj.FObject.Table1',_this.arry);
          },
          error: function () {
            console.log('_请求失败_')
          }
        });
      },
      //选择guid
      choose(index,row,parm){
        if(this.addEquipment){
           if(parm=='asset'){ //设备
            this.ruleForm.FAssetID=row.FAssetID;
            this.ruleForm.FAssetGUID=row.FGUID;
            this.equipdialog=false;
          }else if(parm=='driver'){   //司机
            this.ruleForm.FDriverName=row.FDriverName;
            this.ruleForm.FAdminDriverGUID=row.FGUID;
            this.driverdialog=false;
          }else if(parm=='company'){   //公司
            this.ruleForm.FShortName=row.FShortName;
            this.ruleForm.FAgentGUID=row.FGUID;
            this.companydialog=false;
          }
        }else if(this.editEquipment){
          if(parm=='asset'){ //设备
            this.objDetail.FAssetID=row.FAssetID;
            this.objDetail.FAssetGUID=row.FGUID;
            this.equipdialog=false;
          }else if(parm=='driver'){   //司机
            this.objDetail.FDriverName=row.FDriverName;
            this.objDetail.FAdminDriverGUID=row.FGUID;
            this.driverdialog=false;
          }else if(parm=='company'){   //公司
            this.objDetail.FShortName=row.FShortName;
            this.objDetail.FAgentGUID=row.FGUID;
            this.companydialog=false;
          }
        }    
      },
      //新增车辆
      submitForm(formName) {
        var _this=this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let TokenID = this.$store.state.FTokenID;
            let JsonObj=this[formName];
           // delete JsonObj.FAgentGUID;  //这个不要了
            delete JsonObj.FAssetID;
            delete JsonObj.FDriverName;
            delete JsonObj.FShortName;
            delete JsonObj.FVehicleGroupFullName;
            JsonObj.FInsuDate=this.timeChange(JsonObj.FInsuDate);
            JsonObj.FPurchaseDate=this.timeChange(JsonObj.FPurchaseDate);
            JsonObj.FRegisDate=this.timeChange(JsonObj.FRegisDate);
            JsonObj.FRoadTranDate=this.timeChange(JsonObj.FRoadTranDate);
            JsonObj.FTechRegDate=this.timeChange(JsonObj.FTechRegDate);
            JsonObj.FSystemType=this.SystemID;
            var JsonStr;
            JsonStr=JSON.stringify({FTokenID:TokenID,FAction:"AddAdminVehicle",FT_AdminVehicle:JsonObj,FVersion:"1.0.0"});
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
                _this.queryCarList('');
                function setData(){
                  _this.data3 = _this.$store.state.allCarsData;
                }
                _this.$store.commit('getAllCarsData',setData);
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
      driverView(){
        this.driverdialog=true;
        this.driverFey='';
        this.PageIndex3=1;
        this.PageSize3=15;
        this.driverQuery('true')
      },
      equipView(){
        this.equipdialog=true;
        this.searchEquip.FKey='';
        this.searchEquip.FType='';
        this.PageIndex1=1;
        this.PageSize1=15;
        this.equipQuery();
      },
      //修改车辆
      submitForm11(formName) {
        var _this=this;
        let FGUID=this.guid;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let TokenID = this.$store.state.FTokenID;
            let JsonObj=this[formName];
           // delete JsonObj.FAgentGUID;  //这个不要了
            delete JsonObj.FAssetID;
            delete JsonObj.FDriverName;
            delete JsonObj.FShortName;
            delete JsonObj.FVehicleGroupFullName;
            JsonObj.FInsuDate=this.timeChange(JsonObj.FInsuDate);
            JsonObj.FPurchaseDate=this.timeChange(JsonObj.FPurchaseDate);
            JsonObj.FRegisDate=this.timeChange(JsonObj.FRegisDate);
            JsonObj.FRoadTranDate=this.timeChange(JsonObj.FRoadTranDate);
            JsonObj.FTechRegDate=this.timeChange(JsonObj.FTechRegDate);
            var JsonStr;
            JsonStr=JSON.stringify({FTokenID:TokenID,FAction:"UpdateAdminVehicle","FGUID":FGUID,FT_AdminVehicle:JsonObj,FVersion:"1.0.0"});
            console.log(JsonStr)
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
                _this.queryCarList('');
                //更新列表
                function setData(){
                  _this.data3 = _this.$store.state.allCarsData;
                }
                _this.$store.commit('getAllCarsData',setData);
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
      //点击编辑获取数据
      handleEdit(index,row) {
        let _this = this;
        if(row.FIsActiveUser){
          _this.view=false;
          _this.handObj=row;
          _this.driverQuery('false');
          //_this.equipQuery('false');
          _this.motoQuery();
          _this.guid=row.FGUID;  //编辑提交的车辆id
          let FGUID=_this.guid;
          let TokenID = _this.$store.state.FTokenID;
          //获取车辆详情
          $.ajax({
            "url": "web/Common/Common_Admin",
            "cache": false,
            "async": true,
            "type": "post",
            "dataType": "json",
            "contentType": "application/json; charset=utf-8",
            "data": '{"FTokenID": "' + TokenID + '","FAction": "QueryAdminVehicleByFGUID","FVersion": "1.0.0","FGUID":"' + FGUID + '"}',
            success: function (data) {
              console.log(data);
              _this.editEquipment=true;
              var Fobj = data;
              _this.objDetail=Fobj.FObject[0];
              _this.imageUrlDetail=Fobj.FObject[0].FImage;
              if(Fobj.FObject[0].FAdminDriverGUID=='00000000-0000-0000-0000-000000000000'){
                _this.objDetail.FAdminDriverGUID='';
              }
              if(Fobj.FObject[0].FAssetGUID=='00000000-0000-0000-0000-000000000000'){
                _this.objDetail.FAssetGUID='';
              }
              //alert(_this.driverArr.indexOf(Fobj.FObject[0].FAdminDriverGUID)!==-1)
              //原司机存在且被禁掉
              setTimeout(function(){  
                if(Fobj.FObject[0].FAdminDriverGUID){   //绑过
                  if(_this.driverArr.indexOf(Fobj.FObject[0].FAdminDriverGUID)!==-1){  //绑过且正常,避免反复启禁
                    _this.objDetail.FDriverName=Fobj.FObject[0].FDriverName;
                    _this.objDetail.FAdminDriverGUID=Fobj.FObject[0].FAdminDriverGUID;
                  }else{
                    _this.message('_原司机已禁用_,_请重新选择_','info');
                    _this.objDetail.FDriverName='';
                    _this.objDetail.FAdminDriverGUID=''
                  }
                }
                else{                                                                    //没绑过或删除绑定
                  
                }
                 /* if((_this.equipArr.length>=1)&&_this.equipArr.indexOf(Fobj.FObject[0].FAssetID)==-1&&(_this.handObj.FAssetID!=='--')){
                      _this.message('_原设备已禁用或删除_,_请重新选择_','info');
                      _this.objDetail.FAssetID='';
                      _this.objDetail.FAssetGUID='';
                  }*/
                  if(_this.motoArr.indexOf(Fobj.FObject[0].FVehicleGroupGUID)==-1){ //必填且车队不会被删除，必定绑定过
                      _this.message('_原车队已禁用_,_请重新选择_','info');
                      _this.objDetail.FVehicleGroupGUID='';
                      _this.objDetail.FVehicleGroupFullName='';
                  }else{
                      _this.objDetail.FVehicleGroupGUID=Fobj.FObject[0].FVehicleGroupGUID;  //避免反复操作
                      _this.objDetail.FVehicleGroupFullName=Fobj.FObject[0].FVehicleGroupFullName;
                  }
              },100);
              //根据状态判断设备
              if(Fobj.FObject[0].FAssetStatus==1){         //判断设备绑过且正常
                  _this.objDetail.FAssetID=Fobj.FObject[0].FAssetID; //避免禁掉又启动，重新赋值一遍
                  _this.objDetail.FAssetGUID=Fobj.FObject[0].FAssetGUID;
              }else if(Fobj.FObject[0].FAssetStatus==0){   //绑过且禁用
                  _this.message('_原终端已禁用_,_请重新选择_','info');
                  _this.objDetail.FAssetID='';
                  _this.objDetail.FAssetGUID='';
              }else{                                     //未绑定或者绑定的卡已被删除
                 
              }
              console.log('_this.driverArr',_this.driverArr);
            },
            error: function () {
              console.log('_请求失败_')
            }
          });
        }else{
            return  _this.message('_非创建者账号_,_仅能查看_', 'info');
        }
      },
      //查看详情
      checkDetail (index,row) {
        let guid=row.FGUID;
        this.detail={};
        let _this = this;
        let TokenID = this.$store.state.FTokenID;
        //获取车辆详情
        $.ajax({
          "url": "web/Common/Common_Admin",
          "cache": false,
          "async": true,
          "type": "post",
          "dataType": "json",
          "contentType": "application/json; charset=utf-8",
          "data": '{"FTokenID": "' + TokenID + '","FAction": "QueryAdminVehicleByFGUID","FVersion": "1.0.0","FGUID":"' + guid + '"}',
          success: function (data) {
            console.log(data);
            var Fobj = data;
            _this.detailDialog=true;
            _this.detail=Fobj.FObject[0];
            _this.imageUrl3=Fobj.FObject[0].FImage;
            _this.detail.FInsuDate=Fobj.FObject[0].FInsuDate.substring(0,10);
            _this.detail.FPurchaseDate=Fobj.FObject[0].FPurchaseDate.substring(0,10);
            _this.detail.FRegisDate=Fobj.FObject[0].FRegisDate.substring(0,10);
            _this.detail.FRoadTranDate=Fobj.FObject[0].FRoadTranDate.substring(0,10);
            _this.detail.FTechRegDate=Fobj.FObject[0].FTechRegDate.substring(0,10);
            _this.detail.FStatus=Fobj.FObject[0].FStatus?'_启用_':'_禁用_';
            _this.detail.FVehicleTypeID=Fobj.FObject[0].FVehicleTypeID=='0'?'_厢车_':Fobj.FObject[0].FVehicleTypeID=='1'?'_罐车_':Fobj.FObject[0].FVehicleTypeID=='2'?'_其他_':'_其他_';
            _this.detail.FFuelType=Fobj.FObject[0].FFuelType=='0'?'_汽油_':Fobj.FObject[0].FFuelType=='1'?'_柴油_':Fobj.FObject[0].FFuelType=='2'?'_乙醇_':Fobj.FObject[0].FFuelType=='3'?'_液化天然气_':Fobj.FObject[0].FFuelType=='4'?'_压缩天然气_':Fobj.FObject[0].FFuelType=='5'?'_其他_':'_其他_';
           _this.detail.FColorRGB=Fobj.FObject[0].FColorRGB=='0'?'_红_':Fobj.FObject[0].FColorRGB=='1'?'_黄_':Fobj.FObject[0].FColorRGB=='2'?'_蓝_':Fobj.FObject[0].FColorRGB=='3'?'_橙_':Fobj.FObject[0].FColorRGB=='4'?'_紫_':Fobj.FObject[0].FColorRGB=='5'?'_绿_':Fobj.FObject[0].FColorRGB=='6'?'_其他_':'_其他_';
           _this.detail.FOperateType=Fobj.FObject[0].FOperateType=='0'?'_经营租赁_':Fobj.FObject[0].FOperateType=='1'?'_以租代售_':Fobj.FObject[0].FOperateType=='2'?'_直销_':Fobj.FObject[0].FOperateType=='3'?'_自营_':Fobj.FObject[0].FOperateType=='4'?'_试车_':Fobj.FObject[0].FOperateType=='5'?'_融资租赁_':Fobj.FObject[0].FOperateType=='6'?'_其他_':'_其他_';
          },
          error: function () {
            console.log('_请求失败_')
          }
        });
        
      },
      //重置
      res(){
        let _this=this;
        if(this.objDetail.FStatus){  //不重置FStatus
            _this.objDetail={
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
          }
        }else{                          //不重置FStatus
          _this.objDetail={
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
            FStatus:0,
            FAssetGUID:'',  //终端唯一标识ID
            FVehicleGroupGUID:'',  //车队ID
         //   FAgentGUID:'',    //代理商ID
            FAdminDriverGUID:''  //司机id
          }
        }
      },
    },
    props: {
      screenHeight: Number
    },
    watch: {
      screenHeight () {
        this.adjustPage();
      },
      filterText(val) {
        this.$refs.tree2.filter(val);
      },
      motoKey(val){
        this.$refs.tree3.filter(val);
      },
      //打开查找框
      dialogVisible:function () {
        if(this.dialogVisible){
          $(".mymodal").css('visibility','visible');
        }else {
          $(".mymodal").css('visibility','hidden');
        }
      },
      addEquipment: {
        handler () {
          this.ruleForm={
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
            //  FAgentGUID:'',    //代理商ID
              FAdminDriverGUID:''  //司机id
            },
          this.imageUrl='';
          this.view=false;
        },
        //deep: true
      },
    },
  };
</script>
<style scoped >
  .leftbtn {
    float:left;
  }
  .rightinput {
    float:right;
    margin-right:10px;
  }
  .searchtable{
    height:40px;
    margin:-18px 0 0 0;
  } 

  .searchtable .searchinput{
    display: inline-block;
    width:280px;
    height:30px;
    /*border-radius: 2px;*/
    border:1px solid #d1dbe5;
    text-indent: 10px;
    box-shadow:none !important;
  }
  .rightinput input {
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

  /*.el-tree-node {*/
    /*background:url("/static/img/join.png") no-repeat left bottom;*/
  /*}*/

  /*.el-tree-node__content {*/
    /*height:30px;*/
    /*line-height:30px;*/
  /*}*/


  #el_table_wrap .el-button,.warptable .el-button {
     padding:0;
  }
  .check{
    display:inline-block;
    margin-left:10px;
    color:#999999
  }

  .warptable{
       border-bottom:1px solid #ccc;
  }
  .exhibition{
    display: inline-block;
    margin:0 0 13px 0;
  }
</style>

<style>


.exhibition .avatar-uploader .el-upload {
    border: 1px dashed #C0CCDA;
   /* border-radius: 6px;*/
    cursor: pointer;
    position: relative;
    overflow: hidden;
    left:-150px;
  }
.exhibition  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
.exhibition  .avatar-uploader-icon {
     font-size: 28px;
     color: #8c939d;
     width: 209px;
     /*height: 112px;*/
     line-height: 112px;
     display: block;
  }
.exhibition  .avatar {
    width: 209px;
    height: 112px;
    display: block;
}

  input[type=file] {
    display: none;
}
.large .el-dialog {
  width:987px;
}
.large  .el-dialog .el-dialog__body {
    max-height:800px;
    overflow:auto;
}
.mid .el-dialog {
  width:850px;
}
.mid  .el-dialog .el-dialog__body {
    max-height:600px;
    overflow:auto;
}
.sma .el-dialog {
  width:986px;
}
.sma  .el-dialog .el-dialog__body {
    max-height:800px;
    overflow:auto;
    padding: 30px 20px 10px 20px;
}
.midd .el-dialog{
    width:320px;
   /* height:460px;*/
  }
.midd .el-dialog .el-dialog__body{
  max-height: 450px;
  overflow:auto;
  background:rgba(151, 168, 190, 0.13);
}
.large  .el-col-7{
  position:relative;
  top:12px
}
.exhibition .el-form-item .el-form-item__content{
   line-height: 112px
}
.el-select-dropdown{
  /*z-index:0;*/
}
.hoverCursor .el-input__inner{
  display: inline-block;
}
.hoverCursor .el-input__inner:hover{
   cursor:pointer;
}
.large .el-form-item{
  margin-bottom: 8px
}
.large .el-dialog__body{
  padding:30px 0  5px 0;
} 
</style>
