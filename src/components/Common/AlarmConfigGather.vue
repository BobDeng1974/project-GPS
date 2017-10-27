<template>
	<section class="AlarmConfigGather" style="height: 100%;">
    <!--弹框-->
		<vehical-list v-on:child="get"></vehical-list>
    <div class='vehical-width'>
		 <el-dialog  :visible.sync="editEquipment" >
		 	<span slot='title'>{{FName}}-_修改车辆_</span>
       <!--修改车辆（接甩挂）-->
			<el-form :model="objDetail" :rules="rules" ref="objDetail" label-width="200px" class="demo-ruleForm" v-if="SystemID==1">
				<el-row>
					<el-col :span="11">
						<el-form-item label="_普通公路超速_(km/h)" prop="FOverSpeedOrdinaryRoad">
							<el-input v-model.number="objDetail.FOverSpeedOrdinaryRoad"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="_高速公路超速_(km/h)" prop="FOverSpeedHighRoad">
							<el-input v-model.number="objDetail.FOverSpeedHighRoad"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
        <el-col :span="1"></el-col>
				<el-row>
					<el-col :span="11">
						<el-form-item label="_超速时长_(min)" prop="FOverSpeedTimeLength">
							<el-input v-model.number="objDetail.FOverSpeedTimeLength"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="_疲劳驾驶超时_(min)" prop="FFatigueRunningTimeLength">
							<el-input v-model.number="objDetail.FFatigueRunningTimeLength"></el-input>
						</el-form-item>
					</el-col>
          <el-col :span="1"></el-col>
				</el-row>
				<el-row>
					<el-col :span="11">
						<el-form-item label="_疲劳驾驶休息时长_(min)" prop="FFatigueRestTimeLength">
							<el-input v-model.number="objDetail.FFatigueRestTimeLength"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="_熄火停车时长_(min)" prop="FStopCloseACCTimeLength">
							<el-input v-model.number="objDetail.FStopCloseACCTimeLength"></el-input>
						</el-form-item>
					</el-col>
          <el-col :span="1"></el-col>
				</el-row>
				<el-row>
					<el-col :span="11">
						<el-form-item label="_未熄火停车时长_(min)" prop="FStopOpenACCTimeLength">
							<el-input v-model.number="objDetail.FStopOpenACCTimeLength"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="_高胎压_(bar)" prop="FTPMSMaxTyre">
							<el-input v-model.number="objDetail.FTPMSMaxTyre"></el-input>
						</el-form-item>
					</el-col>
          <el-col :span="1"></el-col>
				</el-row>
				<el-row>
					<el-col :span="11">
						<el-form-item label="_低胎压_(bar)" prop="FTPMSMinTyre">
							<el-input v-model.number="objDetail.FTPMSMinTyre"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="_高胎温_(℃)" prop="FTPMSMaxTem">
							<el-input v-model.number="objDetail.FTPMSMaxTem"></el-input>
						</el-form-item>
					</el-col>
          <el-col :span="1"></el-col>
				</el-row>
				<el-row>
					<el-col :span="11">
						<el-form-item label="_低胎温_(℃)" prop="FTPMSMinTem">
							<el-input v-model.number="objDetail.FTPMSMinTem"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="_胎温胎压持续时长_(min)" prop="FTPMSTimeLength">
							<el-input v-model.number="objDetail.FTPMSTimeLength"></el-input>
						</el-form-item>
					</el-col>
          <el-col :span="1"></el-col>
				</el-row>

			</el-form>
       <!--修改车辆（电子锁）-->
       <el-form :model="objDetai2" :rules="rules" ref="objDetai2" label-width="200px" class="demo-ruleForm" v-if="SystemID==2">
         <el-row>
           <el-col :span="11">
             <el-form-item label="_普通公路超速_(km/h)" prop="FOverSpeedOrdinaryRoad">
               <el-input v-model.number="objDetai2.FOverSpeedOrdinaryRoad"></el-input>
             </el-form-item>
           </el-col>
           <el-col :span="12">
             <el-form-item label="_高速公路超速_(km/h)" prop="FOverSpeedHighRoad">
               <el-input v-model.number="objDetai2.FOverSpeedHighRoad"></el-input>
             </el-form-item>
           </el-col>
           <el-col :span="1"></el-col>
         </el-row>
         <el-row>
            <el-col :span="11">
              <el-form-item label="_超速时长_(min)" prop="FOverSpeedTimeLength">
                <el-input v-model.number="objDetai2.FOverSpeedTimeLength"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="_疲劳驾驶超时_(min)" prop="FFatigueRunningTimeLength">
                <el-input v-model.number="objDetai2.FFatigueRunningTimeLength"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1"></el-col>
         </el-row>
         <el-row>
            <el-col :span="11">
               <el-form-item label="_疲劳驾驶休息时长_(min)" prop="FFatigueRestTimeLength">
                  <el-input v-model.number="objDetai2.FFatigueRestTimeLength"></el-input>
               </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="_熄火停车时长_(min)" prop="FStopCloseACCTimeLength">
               <el-input v-model.number="objDetai2.FStopCloseACCTimeLength"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1"></el-col>
         </el-row>
         <el-row>
           <el-col :span="11">
             <el-form-item label="_未熄火停车时长_(min)" prop="FStopOpenACCTimeLength">
               <el-input v-model.number="objDetai2.FStopOpenACCTimeLength"></el-input>
             </el-form-item>
           </el-col>
         </el-row>
       </el-form>
       <!--修改车辆（车队）-->
       <el-form :model="objDetai4" :rules="rules" ref="objDetai4" label-width="200px" class="demo-ruleForm" v-if="SystemID==4">
         <el-row>
           <el-col :span="11">
             <el-form-item label="_普通公路超速_(km/h)" prop="FOverSpeedOrdinaryRoad">
               <el-input v-model.number="objDetai4.FOverSpeedOrdinaryRoad"></el-input>
             </el-form-item>
           </el-col>
           <el-col :span="12">
             <el-form-item label="_高速公路超速_(km/h)" prop="FOverSpeedHighRoad">
               <el-input v-model.number="objDetai4.FOverSpeedHighRoad"></el-input>
             </el-form-item>
           </el-col>
           <el-col :span="1"></el-col>
         </el-row>
         <el-row>
            <el-col :span="11">
              <el-form-item label="_超速时长_(min)" prop="FOverSpeedTimeLength">
                <el-input v-model.number="objDetai4.FOverSpeedTimeLength"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="_疲劳驾驶超时_(min)" prop="FFatigueRunningTimeLength">
                <el-input v-model.number="objDetai4.FFatigueRunningTimeLength"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1"></el-col>
         </el-row>
         <el-row>
            <el-col :span="11">
               <el-form-item label="_疲劳驾驶休息时长_(min)" prop="FFatigueRestTimeLength">
                  <el-input v-model.number="objDetai4.FFatigueRestTimeLength"></el-input>
               </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="_熄火停车时长_(min)" prop="FStopCloseACCTimeLength">
               <el-input v-model.number="objDetai4.FStopCloseACCTimeLength"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1"></el-col>
         </el-row>
         <el-row>
           <el-col :span="11">
             <el-form-item label="_未熄火停车时长_(min)" prop="FStopOpenACCTimeLength">
               <el-input v-model.number="objDetai4.FStopOpenACCTimeLength"></el-input>
             </el-form-item>
           </el-col>
           <el-col :span="12">
             <el-form-item label="_最低温_(℃)" prop="FCoolerLowTemperature">
               <el-input v-model.number="objDetai4.FCoolerLowTemperature"></el-input>
             </el-form-item>
           </el-col>
           <el-col :span="1"></el-col> 
         </el-row>
         <el-row>
           <el-col :span="11">
              <el-form-item label="_最高温_(℃)" prop="FCoolerHightTemperature">
                 <el-input v-model.number="objDetai4.FCoolerHightTemperature"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="_冷机超温报警时长_(min)" prop="FCoolerTimeLength">
                <el-input v-model.number="objDetai4.FCoolerTimeLength"></el-input>
              </el-form-item>
            </el-col>
           <el-col :span="1"></el-col> 
         </el-row>
       </el-form>
       <!--修改车辆（冷链）-->
       <el-form :model="objDetai3" :rules="rules" ref="objDetai3" label-width="200px" class="demo-ruleForm" v-if="SystemID==3" >
         <el-row>
           <el-col :span="11">
             <el-form-item label="_普通公路超速_(km/h)" prop="FOverSpeedOrdinaryRoad">
               <el-input v-model.number="objDetai3.FOverSpeedOrdinaryRoad"></el-input>
             </el-form-item>
           </el-col>
           <el-col :span="12">
             <el-form-item label="_高速公路超速_(km/h)" prop="FOverSpeedHighRoad">
               <el-input v-model.number="objDetai3.FOverSpeedHighRoad"></el-input>
             </el-form-item>
           </el-col>
           <el-col :span="1"></el-col>
         </el-row>
         <el-row>
            <el-col :span="11">
              <el-form-item label="_超速时长_(min)" prop="FOverSpeedTimeLength">
                <el-input v-model.number="objDetai3.FOverSpeedTimeLength"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
             <el-form-item label="_疲劳驾驶超时_(min)" prop="FFatigueRunningTimeLength">
               <el-input v-model.number="objDetai3.FFatigueRunningTimeLength"></el-input>
             </el-form-item>
            </el-col>
            <el-col :span="1"></el-col>
           <!-- <el-col :span="12">
             <el-form-item label="_疲劳驾驶休息时长_(min)" prop="FFatigueRestTimeLength">
               <el-input v-model.number="objDetai3.FFatigueRestTimeLength"></el-input>
             </el-form-item>
           </el-col> -->
         </el-row>
         <el-row>
            <el-col :span="11">
              <el-form-item label="_疲劳驾驶休息时长_(min)" prop="FFatigueRestTimeLength">
                <el-input v-model.number="objDetai3.FFatigueRestTimeLength"></el-input>
              </el-form-item>
            </el-col> 
           <el-col :span="12">
             <el-form-item label="_熄火停车时长_(min)" prop="FStopCloseACCTimeLength">
               <el-input v-model.number="objDetai3.FStopCloseACCTimeLength"></el-input>
             </el-form-item>
           </el-col>
           <el-col :span="1"></el-col>
         </el-row>
         <el-row>
            <el-col :span="11">
             <el-form-item label="_未熄火停车时长_(min)" prop="FStopOpenACCTimeLength">
               <el-input v-model="objDetai3.FStopOpenACCTimeLength"></el-input>
             </el-form-item>
           </el-col>
           <el-col :span="12">
             <el-form-item label="_最低温_(℃)" prop="FCoolerLowTemperature">
               <el-input v-model.number="objDetai3.FCoolerLowTemperature"></el-input>
             </el-form-item>
           </el-col>
           <el-col :span="1"></el-col>
         </el-row>
          <el-row>
           <el-col :span="11">
              <el-form-item label="_最高温_(℃)" prop="FCoolerHightTemperature">
                 <el-input v-model.number="objDetai3.FCoolerHightTemperature"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
       </el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="submitForm11('objDetail')" v-if="SystemID==1">_保存_</el-button>
        <el-button type="primary" @click="submitForm11('objDetai2')" v-if="SystemID==2">_保存_</el-button>
        <el-button type="primary" @click="submitForm11('objDetai4')" v-if="SystemID==4">_保存_</el-button>
        <el-button type="primary" @click="submitForm11('objDetai3')" v-if="SystemID==3">_保存_</el-button>
        <el-button @click="cancel" type="button" class='el-button el-button--default cancel el-button--primary'>_取消_</el-button>
				<!-- <el-button @click="res">重置</el-button> -->
			</div>
		</el-dialog>
    </div>
		<!-- 新增设备(接甩挂)-->
    <div class='vehical-width'>
		<el-dialog title="_报警设置_-_新增车辆_" :visible.sync="addEquipment" class="addCar-dialog" v-if="SystemID==1" >
			<el-form :model="ruleForm11" :rules="rules" ref="ruleForm11" label-width="200px" >
        <el-row>
          <el-col :span="11">
            <el-form-item label="_选择车辆_" >
              <div data-toggle="modal" data-target="#modal">
                <a href="javascript:;" class="get-carList-dialog" style="margin-right: -50px;margin-top: 4px;">
                  <i class="img-icon icon-carList-dialog" style="z-index: 100"></i>
                </a>
                <el-input class="carInput cursor-pointer" readonly='readonly'></el-input>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
				<el-row>
					<el-col :span="11">
						<el-form-item label="_普通公路超速_(km/h)" prop="FOverSpeedOrdinaryRoad">
							<el-input v-model.number="ruleForm11.FOverSpeedOrdinaryRoad"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="_高速公路超速_(km/h)" prop="FOverSpeedHighRoad">
							<el-input v-model.number="ruleForm11.FOverSpeedHighRoad"></el-input>
						</el-form-item>
					</el-col>
          <el-col :span="1"></el-col>
				</el-row>
				<el-row>
					<el-col :span="11">
						<el-form-item label="_超速时长_(min)" prop="FOverSpeedTimeLength">
							<el-input v-model.number="ruleForm11.FOverSpeedTimeLength"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="_疲劳驾驶超时_(min)" prop="FFatigueRunningTimeLength">
							<el-input v-model="ruleForm11.FFatigueRunningTimeLength"></el-input>
						</el-form-item>
					</el-col>
          <el-col :span="1"></el-col>
				</el-row>
				<el-row>
					<el-col :span="11">
						<el-form-item label="_疲劳驾驶休息时长_(min)" prop="FFatigueRestTimeLength">
							<el-input v-model.number="ruleForm11.FFatigueRestTimeLength"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="_熄火停车时长_(min)" prop="FStopCloseACCTimeLength">
							<el-input v-model.number="ruleForm11.FStopCloseACCTimeLength"></el-input>
						</el-form-item>
					</el-col>
          <el-col :span="1"></el-col>
				</el-row>
				<el-row>
					<el-col :span="11">
						<el-form-item label="_未熄火停车时长_(min)" prop="FStopOpenACCTimeLength">
							<el-input v-model.number="ruleForm11.FStopOpenACCTimeLength"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="_高胎压_(bar)" prop="FTPMSMaxTyre">
							<el-input v-model.number="ruleForm11.FTPMSMaxTyre"></el-input>
						</el-form-item>
					</el-col>
          <el-col :span="1"></el-col>
				</el-row>
				<el-row >
					<el-col :span="11">
						<el-form-item label="_低胎压_(bar)" prop="FTPMSMinTyre">
							<el-input v-model.number="ruleForm11.FTPMSMinTyre"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="_高胎温_(℃)" prop="FTPMSMaxTem">
							<el-input v-model.number="ruleForm11.FTPMSMaxTem"></el-input>
						</el-form-item>
					</el-col>
          <el-col :span="1"></el-col>
				</el-row>
				<el-row >
					<el-col :span="11">
						<el-form-item label="_低胎温_(℃)" prop="FTPMSMinTem">
							<el-input v-model.number="ruleForm11.FTPMSMinTem"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="_胎温胎压持续时长_(min)" prop="FTPMSTimeLength">
							<el-input v-model.number="ruleForm11.FTPMSTimeLength"></el-input>
						</el-form-item>
					</el-col>
          <el-col :span="1"></el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer" >
        <el-button type="primary" @click="submitForm11('ruleForm11')">_保存_</el-button>
        <el-button @click="resetForm('ruleForm11')" type="button" class='el-button el-button--default cancel el-button--primary'>_重置_</el-button>
			</div>
		</el-dialog >
    </div>
    <!-- 新增设备(电子锁)-->
    <div class='vehical-width'>
    <el-dialog title="_报警设置_-_新增车辆_" :visible.sync="addEquipment" class="addCar-dialog" v-if="SystemID==2" >
      <el-form :model="ruleForm22" :rules="rules" ref="ruleForm22" label-width="200px" class="demo-ruleForm">
        <el-row>
          <el-col :span="11">
            <el-form-item label="_选择车辆_" >
              <div data-toggle="modal" data-target="#modal">
                <a href="javascript:;" class="get-carList-dialog" style="margin-right: -50px;margin-top: 4px;">
                  <i class="img-icon icon-carList-dialog" style="z-index: 100"></i>
                </a>
                <el-input class="carInput cursor-pointer" readonly='readonly'></el-input>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="_普通公路超速_(km/h)" prop="FOverSpeedOrdinaryRoad">
              <el-input v-model.number="ruleForm22.FOverSpeedOrdinaryRoad"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="_高速公路超速_(km/h)" prop="FOverSpeedHighRoad">
              <el-input v-model.number="ruleForm22.FOverSpeedHighRoad"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1"></el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="_超速时长_(min)" prop="FOverSpeedTimeLength">
              <el-input v-model.number="ruleForm22.FOverSpeedTimeLength"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="_疲劳驾驶超时_(min)" prop="FFatigueRunningTimeLength">
              <el-input v-model.number="ruleForm22.FFatigueRunningTimeLength"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1"></el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="_疲劳驾驶休息时长_(min)" prop="FFatigueRestTimeLength">
              <el-input v-model.number="ruleForm22.FFatigueRestTimeLength"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label="_熄火停车时长_(min)" prop="FStopCloseACCTimeLength">
              <el-input v-model.number="ruleForm22.FStopCloseACCTimeLength"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1"></el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="_未熄火停车时长_(min)" prop="FStopOpenACCTimeLength">
              <el-input v-model.number="ruleForm22.FStopOpenACCTimeLength"></el-input>
            </el-form-item>
          </el-col> 
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" >
        <el-button type="primary" @click="submitForm11('ruleForm22')">_保存_</el-button>
        <el-button @click="resetForm('ruleForm22')" type="button" class='el-button el-button--default cancel el-button--primary'>_重置_</el-button>
      </div>
    </el-dialog >
    </div>
    <!-- 新增设备(车队)-->
    <div class='vehical-width'>
    <el-dialog title="_报警设置_-_新增车辆_" :visible.sync="addEquipment" class="addCar-dialog" v-if="SystemID==4" >
      <el-form :model="ruleForm44" :rules="rules" ref="ruleForm44" label-width="200px" class="demo-ruleForm">
        <el-row>
          <el-col :span="11">
            <el-form-item label="_选择车辆_" >
              <div data-toggle="modal" data-target="#modal">
                <a href="javascript:;" class="get-carList-dialog" style="margin-right: -50px;margin-top: 4px;">
                  <i class="img-icon icon-carList-dialog" style="z-index: 100"></i>
                </a>
                <el-input class="carInput cursor-pointer" readonly='readonly'></el-input>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="_普通公路超速_(km/h)" prop="FOverSpeedOrdinaryRoad">
              <el-input v-model.number="ruleForm44.FOverSpeedOrdinaryRoad"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="_高速公路超速_(km/h)" prop="FOverSpeedHighRoad">
              <el-input v-model.number="ruleForm44.FOverSpeedHighRoad"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1"></el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="_超速时长_(min)" prop="FOverSpeedTimeLength">
              <el-input v-model.number="ruleForm44.FOverSpeedTimeLength"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="_疲劳驾驶超时_(min)" prop="FFatigueRunningTimeLength">
              <el-input v-model.number="ruleForm44.FFatigueRunningTimeLength"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1"></el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="_疲劳驾驶休息时长_(min)" prop="FFatigueRestTimeLength">
              <el-input v-model.number="ruleForm44.FFatigueRestTimeLength"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label="_熄火停车时长_(min)" prop="FStopCloseACCTimeLength">
              <el-input v-model.number="ruleForm44.FStopCloseACCTimeLength"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1"></el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="_未熄火停车时长_(min)" prop="FStopOpenACCTimeLength">
              <el-input v-model.number="ruleForm44.FStopOpenACCTimeLength"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="_最低温_(℃)" prop="FCoolerLowTemperature">
               <el-input v-model.number="ruleForm44.FCoolerLowTemperature"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1"></el-col>
        </el-row>
        <el-row>
           <el-col :span="11">
              <el-form-item label="_最高温_(℃)" prop="FCoolerHightTemperature">
                 <el-input v-model.number="ruleForm44.FCoolerHightTemperature"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="_冷机超温报警时长_(min)" prop="FCoolerTimeLength">
                <el-input v-model.number="ruleForm44.FCoolerTimeLength"></el-input>
              </el-form-item>
            </el-col>
           <el-col :span="1"></el-col> 
         </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" >
        <el-button type="primary" @click="submitForm11('ruleForm44')">_保存_</el-button>
        <el-button @click="resetForm('ruleForm44')" type="button" class='el-button el-button--default cancel el-button--primary'>_重置_</el-button>
      </div>
    </el-dialog >
    </div>
    <!-- 新增设备(冷链)-->
    <div class='vehical-width'>
    <el-dialog title="_报警设置_-_新增车辆_" :visible.sync="addEquipment" class="addCar-dialog" v-if="SystemID==3" >
      <el-form :model="ruleForm33" :rules="rules" ref="ruleForm33" label-width="200px" class="demo-ruleForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="_选择车辆_" >
              <div data-toggle="modal" data-target="#modal">
                <a href="javascript:;" class="get-carList-dialog" style="margin-right: -50px;margin-top: 4px;">
                  <i class="img-icon icon-carList-dialog" style="z-index: 100"></i>
                </a>
                <el-input class="carInput cursor-pointer" readonly='readonly'></el-input>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="_普通公路超速_(km/h)" prop="FOverSpeedOrdinaryRoad">
              <el-input v-model.number="ruleForm33.FOverSpeedOrdinaryRoad"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="_高速公路超速_(km/h)" prop="FOverSpeedHighRoad">
              <el-input v-model.number="ruleForm33.FOverSpeedHighRoad"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="_超速时长_(min)" prop="FOverSpeedTimeLength">
              <el-input v-model.number="ruleForm33.FOverSpeedTimeLength"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="_疲劳驾驶超时_(min)" prop="FFatigueRunningTimeLength">
              <el-input v-model.number="ruleForm33.FFatigueRunningTimeLength"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="_疲劳驾驶休息时长_(min)" prop="FFatigueRestTimeLength">
              <el-input v-model.number="ruleForm33.FFatigueRestTimeLength"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="_熄火停车时长_(min)" prop="FStopCloseACCTimeLength">
              <el-input v-model.number="ruleForm33.FStopCloseACCTimeLength"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="_未熄火停车时长_(min)" prop="FStopOpenACCTimeLength">
              <el-input v-model.number="ruleForm33.FStopOpenACCTimeLength"></el-input>
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row >
          <el-col :span="12">
            <el-form-item label="_未熄火停车时长_(min)" prop="FStopOpenACCTimeLength">
              <el-input v-model.number="ruleForm33.FStopOpenACCTimeLength"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="_最高温_(℃)" prop="FCoolerHightTemperature">
              <el-input v-model.number="ruleForm33.FCoolerHightTemperature"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="12">
            <el-form-item label="_最低温_(℃)" prop="FCoolerLowTemperature">
              <el-input v-model.number="ruleForm33.FCoolerLowTemperature"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" >
        <el-button type="primary" @click="submitForm11('ruleForm33')">保存</el-button>
        <el-button @click="resetForm('ruleForm33')" type="button" class='el-button el-button--default cancel el-button--primary'>_重置_</el-button>
      </div>
    </el-dialog >
    </div>
    <!--弹框部分结束-->
    <!--报警设置选项卡开始-->
		<div class='AlarmConfigGather' style="height: 100%;">
			<el-tabs type="border-card" @tab-click='switchTab'style="height: 100%;" >
				<el-tab-pane label="_全局报警设置_" >
					<div class='allAlarmConfigWrap'>
						<div class="overall-config" id='overall-config'>
              <!--接甩挂全局报警表单-->
							<el-form :model="ruleForm1" ref="ruleForm1" :rules='rules'  v-if="SystemID==1">
								<div >
									<span class="explain-text">_超速报警门阀值_</span>
									 <div class="config-row">
										<el-row>
											<el-col :span="8">
												<el-form-item label="_普通公路_(km/h)" label-width="200px" label-position="left" prop='FOverSpeedOrdinaryRoad'>
													<el-input size="small" v-model.number="ruleForm1.FOverSpeedOrdinaryRoad"></el-input>
												</el-form-item>
											</el-col>
											<el-col :span="8">
												<el-form-item label="_高速公路_(km/h)" label-width="200px" label-position="left" prop='FOverSpeedHighRoad'>
													<el-input size="small" v-model.number="ruleForm1.FOverSpeedHighRoad"></el-input>
												</el-form-item>
											</el-col>
                      <el-col :span="8">
                        <el-form-item label="_持续时长_(min)" label-width="200px" label-position="left" prop='FOverSpeedTimeLength'>
                          <el-input size="small" v-model.number="ruleForm1.FOverSpeedTimeLength"></el-input>
                        </el-form-item>
                      </el-col>
										</el-row>
									</div>
								</div>
								<div >
									<span class="explain-text">_疲劳报警门阀值_</span>
									<div class="config-row">
										<el-row>
											<el-col :span="8">
												<el-form-item label="_连续驾驶时长_(min)" label-width="200px" label-position="left" prop='FFatigueRunningTimeLength'>
													<el-input size="small" v-model.number="ruleForm1.FFatigueRunningTimeLength"></el-input>
												</el-form-item>
											</el-col>
										    <el-col :span="8">
												<el-form-item label="_休息时长_(min)" label-width="200px" label-position="left" prop='FFatigueRestTimeLength'>
													<el-input size="small" v-model.number="ruleForm1.FFatigueRestTimeLength"></el-input>
												</el-form-item>
											</el-col>
										</el-row>
									</div>
								</div>
                <div >
									<span class="explain-text">_停车报警门阀值_</span>
									<div class="config-row">
										<el-row>
											<el-col :span="8">
												<el-form-item label="_熄火停车_(min)" label-width="200px" label-position="left" prop='FStopCloseACCTimeLength'>
													<el-input size="small" v-model.number="ruleForm1.FStopCloseACCTimeLength"></el-input>
												</el-form-item>
											</el-col>
										    <el-col :span="8">
												<el-form-item label="_未熄火停车_(min)" label-width="200px" label-position="left" prop='FStopOpenACCTimeLength'>
													<el-input size="small" v-model.number="ruleForm1.FStopOpenACCTimeLength"></el-input>
												</el-form-item>
											</el-col>
										</el-row>
									</div>
								</div>
								<div>
									<span class="explain-text">_胎温胎压报警门阀值_</span>
									 <div class="config-row" >
										<el-row>
											<el-col :span="8">
												<el-form-item label="_高胎压_(bar)" label-width="200px" label-position="left" prop='FTPMSMaxTyre'>
													<el-input size="small" v-model.number="ruleForm1.FTPMSMaxTyre"></el-input>
												</el-form-item>
											</el-col>
										    <el-col :span="8">
												<el-form-item label="_低胎压_(bar)" label-width="200px" label-position="left" prop='FTPMSMinTyre'>
													<el-input size="small" v-model.number="ruleForm1.FTPMSMinTyre"></el-input>
												</el-form-item>
											</el-col>
                      <el-col :span="8">
                        <el-form-item label="_胎温胎压持续时长_(min)" label-width="200px" label-position="left" prop='FTPMSTimeLength'>
                          <el-input size="small" v-model.number="ruleForm1.FTPMSTimeLength"></el-input>
                        </el-form-item>
                      </el-col>
										</el-row>
										<el-row>
											<el-col :span="8">
												<el-form-item label="_高胎温_(℃)" label-width="200px" label-position="left" prop='FTPMSMaxTem'>
													<el-input size="small" v-model.number="ruleForm1.FTPMSMaxTem"></el-input>
												</el-form-item>
											</el-col>
										     <el-col :span="8">
												<el-form-item label="_低胎温_(℃)" label-width="200px" label-position="left" prop='FTPMSMinTem'>
													<el-input size="small" v-model.number="ruleForm1.FTPMSMinTem"></el-input>
												</el-form-item>
											</el-col>
										</el-row>
									 </div>
								</div>
							</el-form>
              <!--电子锁全局报警表单-->
              <el-form :model="ruleForm2" ref="ruleForm2" :rules='rules'  v-if="SystemID==2">
                <div>
                  <span class="explain-text">_超速报警门阀值_</span>
                  <div class="config-row">
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="_普通公路_(km/h)" label-width="200px" label-position="left" prop='FOverSpeedOrdinaryRoad'>
                          <el-input size="small" v-model.number="ruleForm2.FOverSpeedOrdinaryRoad"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="_高速公路_(km/h)" label-width="200px" label-position="left" prop='FOverSpeedHighRoad'>
                          <el-input size="small" v-model.number="ruleForm2.FOverSpeedHighRoad"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="_持续时长_(min)" label-width="200px" label-position="left" prop='FOverSpeedTimeLength'>
                          <el-input size="small" v-model.number="ruleForm2.FOverSpeedTimeLength"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <!-- <el-row>
                      <el-col :span="6">
                        <el-form-item label="_持续时长_(_分钟_)" label-width="200px" label-position="left" prop='FOverSpeedTimeLength'>
                          <el-input size="small" v-model.number="ruleForm2.FOverSpeedTimeLength"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row> -->
                  </div>
                </div>
                <div >
                  <span class="explain-text">_疲劳报警门阀值_</span>
                  <div class="config-row">
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="_超时_(min)" label-width="200px" label-position="left" prop='FFatigueRunningTimeLength'>
                          <el-input size="small" v-model.number="ruleForm2.FFatigueRunningTimeLength"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="_休息时长_(min)" label-width="200px" label-position="left" prop='FFatigueRestTimeLength'>
                          <el-input size="small" v-model.number="ruleForm2.FFatigueRestTimeLength"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <div >
                  <span class="explain-text">_停车报警门阀值_</span>
                  <div class="config-row">
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="_熄火停车_(min)" label-width="200px" label-position="left" prop='FStopCloseACCTimeLength'>
                          <el-input size="small" v-model.number="ruleForm2.FStopCloseACCTimeLength"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="_未熄火停车_(min)" label-width="200px" label-position="left" prop='FStopOpenACCTimeLength'>
                          <el-input size="small" v-model.number="ruleForm2.FStopOpenACCTimeLength"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-form>
              <!--车队全局报警表单-->
              <el-form :model="ruleForm4" ref="ruleForm4" :rules='rules'  v-if="SystemID==4">
                <div>
                  <span class="explain-text">_超速报警门阀值_</span>
                  <div class="config-row">
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="_普通公路_(km/h)" label-width="200px" label-position="left" prop='FOverSpeedOrdinaryRoad'>
                          <el-input size="small" v-model.number="ruleForm4.FOverSpeedOrdinaryRoad"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="_高速公路_(km/h)" label-width="200px" label-position="left" prop='FOverSpeedHighRoad'>
                          <el-input size="small" v-model.number="ruleForm4.FOverSpeedHighRoad"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="_持续时长_(min)" label-width="200px" label-position="left" prop='FOverSpeedTimeLength'>
                          <el-input size="small" v-model.number="ruleForm4.FOverSpeedTimeLength"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <!-- <el-row>
                      <el-col :span="6">
                        <el-form-item label="_持续时长_(_分钟_)" label-width="200px" label-position="left" prop='FOverSpeedTimeLength'>
                          <el-input size="small" v-model.number="ruleForm2.FOverSpeedTimeLength"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row> -->
                  </div>
                </div>
                <div >
                  <span class="explain-text">_疲劳报警门阀值_</span>
                  <div class="config-row">
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="_超时_(min)" label-width="200px" label-position="left" prop='FFatigueRunningTimeLength'>
                          <el-input size="small" v-model.number="ruleForm4.FFatigueRunningTimeLength"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="_休息时长_(min)" label-width="200px" label-position="left" prop='FFatigueRestTimeLength'>
                          <el-input size="small" v-model.number="ruleForm4.FFatigueRestTimeLength"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <div >
                  <span class="explain-text">_停车报警门阀值_</span>
                  <div class="config-row">
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="_熄火停车_(min)" label-width="200px" label-position="left" prop='FStopCloseACCTimeLength'>
                          <el-input size="small" v-model.number="ruleForm4.FStopCloseACCTimeLength"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="_未熄火停车_(min)" label-width="200px" label-position="left" prop='FStopOpenACCTimeLength'>
                          <el-input size="small" v-model.number="ruleForm4.FStopOpenACCTimeLength"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <div >
                  <span class="explain-text">_温度报警门阀值_</span>
                  <div class="config-row">
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="_最高温_(°C)" label-width="200px" label-position="left" prop='FCoolerHightTemperature'>
                          <el-input size="small" v-model.number="ruleForm4.FCoolerHightTemperature"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="_最低温_(°C)" label-width="200px" label-position="left" prop='FCoolerLowTemperature'>
                          <el-input size="small" v-model.number="ruleForm4.FCoolerLowTemperature"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="_冷机超温报警时长_(min)" label-width="200px" label-position="left" prop='FCoolerTimeLength'>
                          <el-input size="small" v-model.number="ruleForm4.FCoolerTimeLength"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-form>
              <!--冷链全局报警表单-->
              <el-form :model="ruleForm3" ref="ruleForm3" :rules='rules'  v-if="SystemID==3">
                <div>
                  <span class="explain-text">_超速报警门阀值_</span>
                  <div class="config-row">
                    <el-row>
                      <el-col :span="6">
                        <el-form-item label="_普通公路_(km/h)" label-width="200px" label-position="left" prop='FOverSpeedOrdinaryRoad'>
                          <el-input size="small" v-model.number="ruleForm3.FOverSpeedOrdinaryRoad"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="_高速公路_(km/h)" label-width="200px" label-position="left" prop='FOverSpeedHighRoad'>
                          <el-input size="small" v-model.number="ruleForm3.FOverSpeedHighRoad"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="_持续时长_(min)" label-width="200px" label-position="left" prop='FOverSpeedTimeLength'>
                          <el-input size="small" v-model.number="ruleForm3.FOverSpeedTimeLength"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <!-- <el-row>
                      <el-col :span="6">
                        <el-form-item label="_持续时长_(_分钟_)" label-width="200px" label-position="left" prop='FOverSpeedTimeLength'>
                          <el-input size="small" v-model.number="ruleForm3.FOverSpeedTimeLength"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row> -->
                  </div>
                </div>
                <div >
                  <span class="explain-text">_疲劳报警门阀值_</span>
                  <div class="config-row">
                    <el-row>
                      <el-col :span="6">
                        <el-form-item label="_超时_(min)" label-width="200px" label-position="left" prop='FFatigueRunningTimeLength'>
                          <el-input size="small" v-model.number="ruleForm3.FFatigueRunningTimeLength"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="_休息时长_(min)" label-width="200px" label-position="left" prop='FFatigueRestTimeLength'>
                          <el-input size="small" v-model.number="ruleForm3.FFatigueRestTimeLength"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <div >
                  <span class="explain-text">_停车报警门阀值_</span>
                  <div class="config-row">
                    <el-row>
                      <el-col :span="6">
                        <el-form-item label="_熄火停车_(min)" label-width="200px" label-position="left" prop='FStopCloseACCTimeLength'>
                          <el-input size="small" v-model.number="ruleForm3.FStopCloseACCTimeLength"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="_未熄火停车_(min)" label-width="200px" label-position="left" prop='FStopOpenACCTimeLength'>
                          <el-input size="small" v-model.number="ruleForm3.FStopOpenACCTimeLength"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <div >
                  <span class="explain-text">_温度报警门阀值_</span>
                  <div class="config-row">
                    <el-row>
                      <el-col :span="6">
                        <el-form-item label="_最高温_(°C)" label-width="200px" label-position="left" prop='FCoolerHightTemperature'>
                          <el-input size="small" v-model.number="ruleForm3.FCoolerHightTemperature"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="_最低温_(°C)" label-width="200px" label-position="left" prop='FCoolerLowTemperature'>
                          <el-input size="small" v-model.number="ruleForm3.FCoolerLowTemperature"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-form>
						</div>
					</div>
					<div class="save-config-data" id='save-config-data' >
						<div v-if="SystemID==1">
                <el-button class="reset-data" @click="resetForm('ruleForm1')">_重置_</el-button>
                <el-button class="save-data" @click="submitForm('ruleForm1')">_保存_</el-button>
            </div>
            <div v-if="SystemID==4">
                <el-button class="reset-data" @click="resetForm('ruleForm4')">_重置_</el-button>
                <el-button class="save-data" @click="submitForm('ruleForm4')">_保存_</el-button>
            </div>
            <div v-if="SystemID==2">
               <el-button class="reset-data" @click="resetForm('ruleForm2')">_重置_</el-button>
              <el-button class="save-data" @click="submitForm('ruleForm2')">_保存_</el-button>
              
            </div>
            <div v-if="SystemID==3">
              <el-button class="reset-data" @click="resetForm('ruleForm3')">_重置_</el-button>
              <el-button class="save-data" @click="submitForm('ruleForm3')">_保存_</el-button>
            </div>
					</div>
				</el-tab-pane>
				<el-tab-pane label="_车辆设置_">
					<div class='allAlarmConfigWrap'>
						<div class="part-config">
							<div class="config-explain" id='config-explain'>
								<span class="explain-text">_已设置车辆_</span>
								<div class="part-config-btnList">
								    <div class="rightinput">
  										<input type="text" placeholder="_请输入车牌号_" v-model='searchKey' @keyup.enter="doQuery">
  										<button class="glyphicon glyphicon-search searchBtn" style="height: 28px;" @click="doQuery"></button>
									  </div>
									<!-- <el-button icon="plus" class="add-car" data-toggle="modal" data-target="#modal">_新增车辆_
									</el-button> -->
									<el-button icon="plus" class="add-car" @click='addEquipment=true'>_新增车辆_
									</el-button>
									<el-button icon="delete" class="delete-car" @click.native.prevent="deleteRow">_删除_</el-button>
								</div>
							</div>
							<div class="config-item" id="el_table_wrap" >
								<el-table style="width:100%;" stripe :data="dataList" :height="table_height"
										  id="SpeedAlarmConfig" @selection-change="handleSelectionChange" ref="multipleTable">
									<el-table-column type="selection"  width="30"></el-table-column>
									<el-table-column prop='RowNo'  label="_序号_" width="70" ></el-table-column>
									<el-table-column label="_操作_" prop="operate" width="130">
										<template scope="scope">
											<el-button  type="text" size="small" @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i></el-button>
											<el-button  type="text" size="small"  @click="deleteRow(scope.$index,scope.row)"><i class="el-icon-delete"></i></el-button>
										</template>
									</el-table-column>
									<el-table-column width="95"  prop="FVehicleName"  label="_车牌号_"></el-table-column>
									<el-table-column width="165"  prop="FOverSpeedOrdinaryRoad"  label="_普通公路超速_(km/h)"></el-table-column>
									<el-table-column width="165"  prop="FOverSpeedHighRoad"  label="_高速公路超速_(km/h)"></el-table-column>
									<el-table-column width="150"  prop="FOverSpeedTimeLength"  label="_超速时长_(min)"></el-table-column>
									<el-table-column width="180"  prop="FFatigueRunningTimeLength"  label="_疲劳驾驶超时_(min)"></el-table-column>
									<el-table-column width="210"  prop="FFatigueRestTimeLength"  label="_疲劳驾驶休息时长_(min)"></el-table-column>
									<el-table-column width="190"  prop="FStopCloseACCTimeLength"  label="_熄火停车时长_(min)"></el-table-column>
									<el-table-column width="190"  prop="FStopOpenACCTimeLength"  label="_未熄火停车时长_(min)"></el-table-column>
									<el-table-column width="120"  prop="FTPMSMaxTyre"  label="_高胎压_(bar)" v-if="SystemID==1"></el-table-column>
									<el-table-column width="120"  prop="FTPMSMinTyre"  label="_低胎压_(bar)" v-if="SystemID==1"></el-table-column>
									<el-table-column width="120"  prop="FTPMSMaxTem"  label="_高胎温_(℃)" v-if="SystemID==1"></el-table-column>
									<el-table-column width="120"  prop="FTPMSMinTem"  label="_低胎温_(℃)" v-if="SystemID==1"></el-table-column>
									<el-table-column width="210"  prop="FTPMSTimeLength"  label="_胎温胎压持续时长_(min)" v-if="SystemID==1"></el-table-column>
                  <el-table-column width="120"  prop="FCoolerHightTemperature"  label="_最高温_(℃)" v-if="SystemID==4||SystemID==3"></el-table-column>
                  <el-table-column width="120"  prop="FCoolerLowTemperature"  label="_最低温_(℃)" v-if="SystemID==4||SystemID==3"></el-table-column>
                  <el-table-column width="150"  prop="FCoolerTimeLength"  label="_超温时长_(min)" v-if="SystemID==4||SystemID==3"></el-table-column>
								</el-table>
							</div>
							<div  class="pagination" id='pagination'>
						         <div class="block">
						          	<el-pagination
						          	  	@size-change="handleSizeChange"
						          	  	@current-change="handleCurrentChange"
						          	  	:current-page="pageIndex"
						          	  	:page-sizes="[10, 20, 30,]"
						          	  	:page-size='pageSize'
						          	  	layout="prev, pager, next, jumper,total,sizes"
						          	  	:total="FTotalCount">
						          	</el-pagination>
						         </div>
					        </div>
						</div>
					</div>
				</el-tab-pane>
			</el-tabs>
		</div>
	</section>
</template>
<script >
	import vehicalList from 'components/Common/vehicalList.vue'
	export default {
		data() {
			/*var checkdata = (rule,value,callback) => {
		        if (isNaN(value)) {
		           callback(new Error('_请输入数字_'));
		        } else if(!value){
              callback(new Error('_不能为空_'));
            }else {
		           callback();
		        }
		    };*/
      const checkRoad = (rule,value,callback) => {  //普路
            if(!value) {
                return callback(new Error('_请输入_20~150_之间的整数_'));
              }
            else if (value && !Number.isInteger(value)) {
               callback(new Error('_请输入_20~150_之间的整数_'));
            } else if(value>150||value<20){
              callback(new Error('_请输入_20~150_之间的整数_'));
            }else {
               callback();
            }
        };
      const checkHigh = (rule,value,callback) => {  //高速
            if(!value) {
                return callback(new Error('_请输入_50~150_之间的整数_'));
              }
            else if (value && !Number.isInteger(value)) {
               callback(new Error('_请输入_50~150_之间的整数_'));
            } else if(value>150||value<50){
              callback(new Error('_请输入_50~150_的整数_'));
            }else {
               callback();
            }
        };
        const checkTime = (rule,value,callback) => {   //超时时长
            if(!value) {
                return callback(new Error('_请输入_0~20_之间的数字_'));
              }
            else if (isNaN(value)) {
               callback(new Error('_请输入_0~20_之间的数字_'));
            } else if(value>20||value<0){
              callback(new Error('_请输入_0~20_之间的数字_'));
            }else {
               callback();
            }
        };
        const checkFatTime = (rule,value,callback) => {   //疲劳休息时长
            if(!value) {
                return callback(new Error('_请输入_0~40_之间的数字_'));
              }
            else if (isNaN(value)) {
               callback(new Error('_请输入_0~40_之间的数字_'));
            } else if(value>40||value<0){
              callback(new Error('_请输入_0~40_之间的数字_'));
            }else {
               callback();
            }
        };
        const checkFat = (rule,value,callback) => {   //疲劳时长
            if(!value) {
                return callback(new Error('_请输入_0~240_之间数字_'));
            }
            if (isNaN(value)) {
               callback(new Error('_请输入_0~240__之间数字_'));
            } else if(value>240||value<0){
              callback(new Error('_请输入_0~240_之间数字_'));
            }else {
               callback();
            }
        };
        const checkMaxTyre = (rule,value,callback) => {  //胎压
            if(!value) {
                return callback(new Error('_请输入_7~13_之间数字_'));
            }
            if (isNaN(value)) {
               callback(new Error('_请输入_7~13_之间数字_'));
            } else if(value>13||value<7){
              callback(new Error('_请输入_7~13_之间数字_'));
            }else {
               callback(); 
            }
        };
        const checkMaxTem = (rule,value,callback) => {  //胎温
            if(!value) {
                return callback(new Error('_请输入不大于_100_的数字_'));
            }
            if (isNaN(value)) {
               callback(new Error('_请输入不大于_100_的数字_'));
            } else if(value>100){
              callback(new Error('_请输入不大于_100_的数字_'));
            }else {
               callback();
            }
        }; 
			return {
				Fguid:'',
				FName:'',
				searchKey:'',
				num:80,
				FGUIDs:'',
				tabindex:'0',
			  FTotalCount:0,
        pageIndex:1,
        pageSize:10,
        SystemID:null,
        multipleSelection:[],
				table_height: null,
				dataList: [],
				addEquipment: false,
				editEquipment: false,
//        接甩挂表单
        ruleForm1:{
                	FOverSpeedTimeLength:'',
                	FOverSpeedHighRoad:'',
                	FOverSpeedOrdinaryRoad:'',
                	FFatigueRunningTimeLength:'',
                	FFatigueRestTimeLength:'',
                	FStopCloseACCTimeLength:'',
                	FStopOpenACCTimeLength:'',
                	FTPMSMaxTyre:'',
                	FTPMSMinTyre:'',
                	FTPMSMaxTem:'',
                	FTPMSMinTem:'',
                	FTPMSTimeLength:'',
                  FCoolerHightTemperature:'',
                  FCoolerLowTemperature:'',
                  FCoolerTimeLength:'',
                },
//        电子锁表单
        ruleForm2:{
          FOverSpeedTimeLength:'',
          FOverSpeedHighRoad:'',
          FOverSpeedOrdinaryRoad:'',
          FFatigueRunningTimeLength:'',
          FFatigueRestTimeLength:'',
          FStopCloseACCTimeLength:'',
          FStopOpenACCTimeLength:'',
          FTPMSMaxTyre:'',
          FTPMSMinTyre:'',
          FTPMSMaxTem:'',
          FTPMSMinTem:'',
          FTPMSTimeLength:'',
          FCoolerHightTemperature:'',
          FCoolerLowTemperature:'',
         FCoolerTimeLength:'',
        },
//        冷链
        ruleForm3:{
          FOverSpeedTimeLength:'',
          FOverSpeedHighRoad:'',
          FOverSpeedOrdinaryRoad:'',
          FFatigueRunningTimeLength:'',
          FFatigueRestTimeLength:'',
          FStopCloseACCTimeLength:'',
          FStopOpenACCTimeLength:'',
          FTPMSMaxTyre:'',
          FTPMSMinTyre:'',
          FTPMSMaxTem:'',
          FTPMSMinTem:'',
          FTPMSTimeLength:'',
          FCoolerHightTemperature:'',
          FCoolerLowTemperature:'',
          FCoolerTimeLength:'',
        },
        //车队
        ruleForm4:{
          FOverSpeedTimeLength:'',
          FOverSpeedHighRoad:'',
          FOverSpeedOrdinaryRoad:'',
          FFatigueRunningTimeLength:'',
          FFatigueRestTimeLength:'',
          FStopCloseACCTimeLength:'',
          FStopOpenACCTimeLength:'',
          FTPMSMaxTyre:'',
          FTPMSMinTyre:'',
          FTPMSMaxTem:'',
          FTPMSMinTem:'',
          FTPMSTimeLength:'',
          FCoolerHightTemperature:'',
          FCoolerLowTemperature:'',
          FCoolerTimeLength:'',
        },
//        接甩挂新增车辆表单
        ruleForm11:{
          FOverSpeedTimeLength:'',
          FOverSpeedHighRoad:'',
          FOverSpeedOrdinaryRoad:'',
          FFatigueRunningTimeLength:'',
          FFatigueRestTimeLength:'',
          FStopCloseACCTimeLength:'',
          FStopOpenACCTimeLength:'',
          FTPMSMaxTyre:'',
          FTPMSMinTyre:'',
          FTPMSMaxTem:'',
          FTPMSMinTem:'',
          FTPMSTimeLength:'',
          FCoolerHightTemperature:'',
          FCoolerLowTemperature:'',
          FCoolerTimeLength:'',
                },
//        电子锁新增车辆量表单
        ruleForm22:{
          FOverSpeedTimeLength:'',
          FOverSpeedHighRoad:'',
          FOverSpeedOrdinaryRoad:'',
          FFatigueRunningTimeLength:'',
          FFatigueRestTimeLength:'',
          FStopCloseACCTimeLength:'',
          FStopOpenACCTimeLength:'',
          FTPMSMaxTyre:'',
          FTPMSMinTyre:'',
          FTPMSMaxTem:'',
          FTPMSMinTem:'',
          FTPMSTimeLength:'',
          FCoolerHightTemperature:'',
          FCoolerLowTemperature:'',
          FCoolerTimeLength:'',
        },
//        冷链新增车辆表单
        ruleForm33:{
          FOverSpeedTimeLength:'',
          FOverSpeedHighRoad:'',
          FOverSpeedOrdinaryRoad:'',
          FFatigueRunningTimeLength:'',
          FFatigueRestTimeLength:'',
          FStopCloseACCTimeLength:'',
          FStopOpenACCTimeLength:'',
          FTPMSMaxTyre:'',
          FTPMSMinTyre:'',
          FTPMSMaxTem:'',
          FTPMSMinTem:'',
          FTPMSTimeLength:'',
          FCoolerHightTemperature:'',
          FCoolerLowTemperature:'',
          FCoolerTimeLength:'',
        },
        // 车队新增车辆表单
        ruleForm44:{
          FOverSpeedTimeLength:'',
          FOverSpeedHighRoad:'',
          FOverSpeedOrdinaryRoad:'',
          FFatigueRunningTimeLength:'',
          FFatigueRestTimeLength:'',
          FStopCloseACCTimeLength:'',
          FStopOpenACCTimeLength:'',
          FTPMSMaxTyre:'',
          FTPMSMinTyre:'',
          FTPMSMaxTem:'',
          FTPMSMinTem:'',
          FTPMSTimeLength:'',
          FCoolerHightTemperature:'',
          FCoolerLowTemperature:'',
          FCoolerTimeLength:'',
        },
//        接甩挂车辆报警数据修改
        objDetail:{ 
          FOverSpeedTimeLength:'',
          FOverSpeedHighRoad:'',
          FOverSpeedOrdinaryRoad:'',
          FFatigueRunningTimeLength:'',
          FFatigueRestTimeLength:'',
          FStopCloseACCTimeLength:'',
          FStopOpenACCTimeLength:'',
          FTPMSMaxTyre:'',
          FTPMSMinTyre:'',
          FTPMSMaxTem:'',
          FTPMSMinTem:'',
          FTPMSTimeLength:'',
          FCoolerHightTemperature:'',
          FCoolerLowTemperature:'',
          FCoolerTimeLength:'',
        },
//        电子锁车辆报警数据修改
        objDetai2:{
          FOverSpeedTimeLength:'',
          FOverSpeedHighRoad:'',
          FOverSpeedOrdinaryRoad:'',
          FFatigueRunningTimeLength:'',
          FFatigueRestTimeLength:'',
          FStopCloseACCTimeLength:'',
          FStopOpenACCTimeLength:'',
          FTPMSMaxTyre:'',
          FTPMSMinTyre:'',
          FTPMSMaxTem:'',
          FTPMSMinTem:'',
          FTPMSTimeLength:'',
          FCoolerHightTemperature:'',
          FCoolerLowTemperature:'',
          FCoolerTimeLength:'',
        },
//        冷链车辆报警数据修改
        objDetai3:{
          FOverSpeedTimeLength:'',
          FOverSpeedHighRoad:'',
          FOverSpeedOrdinaryRoad:'',
          FFatigueRunningTimeLength:'',
          FFatigueRestTimeLength:'',
          FStopCloseACCTimeLength:'',
          FStopOpenACCTimeLength:'',
          FTPMSMaxTyre:'',
          FTPMSMinTyre:'',
          FTPMSMaxTem:'',
          FTPMSMinTem:'',
          FTPMSTimeLength:'',
          FCoolerHightTemperature:'',
          FCoolerLowTemperature:'',
          FCoolerTimeLength:'',
        },
        //车队
        objDetai4:{
          FOverSpeedTimeLength:'',
          FOverSpeedHighRoad:'',
          FOverSpeedOrdinaryRoad:'',
          FFatigueRunningTimeLength:'',
          FFatigueRestTimeLength:'',
          FStopCloseACCTimeLength:'',
          FStopOpenACCTimeLength:'',
          FTPMSMaxTyre:'',
          FTPMSMinTyre:'',
          FTPMSMaxTem:'',
          FTPMSMinTem:'',
          FTPMSTimeLength:'',
          FCoolerHightTemperature:'',
          FCoolerLowTemperature:'',
          FCoolerTimeLength:'',
        },
//        表单验证规则
        rules:{
                	FOverSpeedTimeLength: [{required: true, validator: checkTime}],
                	FOverSpeedHighRoad: [{required: true, validator: checkHigh}],
                	FOverSpeedOrdinaryRoad: [{required: true, validator: checkRoad}],
                	FFatigueRunningTimeLength: [{required: true, validator: checkFat}],
                	FFatigueRestTimeLength: [{required: true, validator: checkFatTime}],
                	FStopCloseACCTimeLength: [{required: true, validator: checkTime}],
                	FStopOpenACCTimeLength: [{ required: true,validator: checkTime}],
                  FTPMSMaxTyre: [{required: true, validator: checkMaxTyre}],
                	FTPMSMinTyre: [{required: true, validator: checkMaxTyre }],
                	FTPMSMaxTem: [{required: true, validator: checkMaxTem}],
                	FTPMSMinTem: [{required: true, validator: checkMaxTem }],
                	FTPMSTimeLength: [{ required: true,validator: checkTime }],
                  FCoolerHightTemperature: [{ required: true,validator: checkMaxTem }],
                  FCoolerLowTemperature: [{ required: true,validator: checkMaxTem }],
                  FCoolerTimeLength: [{ required: true,validator: checkTime }],
                },
        url:null
			}
		},
		props: {
			screenHeight: Number
		},
		components: {
			vehicalList
		},
		mounted(){
			setTimeout(() => {
				this.adjustPage();
			}, 100);
      this.SystemID=this.$store.state.choiceSystemID;
      if(this.SystemID==1){
        this.doQueryAll("ruleForm1");
      }else if(this.SystemID==2){
        this.doQueryAll("ruleForm2");
      }else if(this.SystemID==4){
        this.doQueryAll("ruleForm4");
      }else if(this.SystemID==3){
        this.doQueryAll("ruleForm3");
      }
      this.doQuery();
		},
		methods: {
		    // 点击节点
		    get:function (data) {
		        $('.carInput input').val(data[0]);
		        $('.carInput input').attr('title',data[0])
		        $('.carInput input').attr('fguid',data[1])
		    },
			handleSelectionChange(val){
				this.multipleSelection = val;
				console.log(this.multipleSelection);
			},
			handleSizeChange(val) {
				this.pageSize=val;
                this.doQuery();
            },
      	    handleCurrentChange(val) {
               this.pageIndex=val;
               this.doQuery();
            },
			//切换tab
			switchTab(tab){
				this.tabindex=tab.index;
			},
			adjustPage(){
				this.table_height = this.elementsFlex("el_table_wrap", "main-content","","", true) - 118;
				/*this.num=this.elementsFlex("save-config-data", "main-content", "overall-config","", true) - 30;*/
			},
			//编辑数据
			handleEdit(index,row) {
               this.editEquipment=true;
               // this.objDetail=row;
               if(this.SystemID==1){
                 this.objDetail=row;
               }else if(this.SystemID==2){
                 this.objDetai2=row;
               }
               else if(this.SystemID==4){
                 this.objDetai4=row;
               }
               else if(this.SystemID==3){
                 this.objDetai3=row;
               }
               this.FName=row.FVehicleName;
               this.Fguid=row.FVehicleGUID;
			},
			//重置编辑
			/*res(){
				this.objDetail={
					FOverSpeedTimeLength:'',
                	FOverSpeedHighRoad:'',
                	FOverSpeedOrdinaryRoad:'',
                	FFatigueRunningTimeLength:'',
                	FFatigueRestTimeLength:'',
                	FStopCloseACCTimeLength:'',
                	FStopOpenACCTimeLength:'',
                	FTPMSMaxTyre:'',
                	FTPMSMinTyre:'',
                	FTPMSMaxTem:'',
                	FTPMSMinTem:'',
                	FTPMSTimeLength:''
				}
			},*/
      cancel(){
        this.editEquipment=false;
      },
			//删除行
			deleteRow(index,rows) {
				console.log(rows);
				let _this=this;
				let arrFGUID=[];
				this.multipleSelection.forEach(obj=>{
		          arrFGUID.push(obj.FVehicleGUID);
		        })
		       if(rows==undefined){
		        	if(arrFGUID.length==0){
		        		_this.$message({
					      showClose: true,
					      message: '_清先勾选_',
					      type: 'warning'
					    });
		        	}else{
		        		this.FGUIDs=arrFGUID.join(',')
		        	}
		        }else{
		        	this.FGUIDs=rows.FVehicleGUID;
		        }
				let TokenID=this.$store.state.FTokenID;
				let FVehicleGUIDs=this.FGUIDs;
				if(FVehicleGUIDs){
          this.$confirm('_此操作将永久删除_,_是否继续_?', '_提示_', {
              confirmButtonText: '_确定_',
              confirmButtonClass: "search",
              cancelButtonText: '_取消_',
              cancelButtonClass: "cancel el-button--primary",
              type: 'warning'
            })
          .then(() => {
              $.ajax({
                "url":  '/web/Common/Common_System',
                "cache": false,
                "async": true,
                "type": "post",
                "dataType": "json",
                "contentType": "application/json; charset=utf-8",
                "data":'{"FTokenID": "'+TokenID+'","FAction": "DeleteSystemConfigAlarmVehicle","FVersion": "1.0.0","FVehicleGUIDs":"'+FVehicleGUIDs+'"}',
                success: function (data) {
                  console.log(data);
                  if(data.Result==104) {
                    _this.$message({
                      showClose: true,
                      message: '_登录超时_,5S_后跳转到登录页面_',
                      type: 'warning'
                    });
                    setTimeout(function(){
                      _this.$store.commit("goLogin");
                    },5000)
                    return
                  }else if(data.Result==200){
                    _this.doQuery();
                    _this.FGUIDs='';
                    _this.$message({
                      showClose: true,
                      message: '_删除成功_',
                      type: 'success'
                    });
                  }
                },
              error:function () {
                console.log('_请求失败_')
              }
            });
          })
          .catch(() => {
            _this.$message.info('_已取消操作_!');
            _this.multipleSelection=[];
            _this.$refs.multipleTable.clearSelection();
          });
				}else{
					return false
				}

			},
			//新增，修改单辆车
			submitForm11(formName){
        if(this.addEquipment){
          if($('.carInput input').val()==''){  //新增加入选车条件
            this.$message({
              showClose: true,
              message: '_请选择车辆_',
              type: 'warning'
            });
            return
          };
        }
				this.$refs[formName].validate((valid) => {
          if (valid) {
						let _this=this;
            let dataJson;
            if(formName!="objDetail"&&formName!="objDetai2"&&formName!="objDetai4"&&formName!="objDetai3"){ 
              this.Fguid = $(".carInput input").attr("fguid");
            }
            let obj=this[formName];
            obj.FOverSpeedTimeLength=obj.FOverSpeedTimeLength*60;
            obj.FFatigueRunningTimeLength=obj.FFatigueRunningTimeLength*60;
            obj.FFatigueRestTimeLength=obj.FFatigueRestTimeLength*60;
            obj.FStopCloseACCTimeLength=obj.FStopCloseACCTimeLength*60;
            obj.FStopOpenACCTimeLength=obj.FStopOpenACCTimeLength*60;
            obj.FTPMSTimeLength=obj.FTPMSTimeLength*60;
            obj.FCoolerTimeLength=obj.FCoolerTimeLength*60;
            dataJson=JSON.stringify({FTokenID:_this.$store.state.FTokenID,FAction:"UpdateSystemConfigAlarm",FVehicleGUID:this.Fguid,FT_SystemConfigAlarm:obj,FSystemType:_this.$store.state.choiceSystemID,FVersion:"1.0.0"})
							$.ajax({
								"url":  '/web/Common/Common_System',
								"cache": false,
								"async": true,
								"type": "post",
								"dataType": "json",
								"contentType": "application/json; charset=utf-8",
                 "data":dataJson,
									success:function(data){
				                        console.log(data);
                    if(data.Result==104) {
                      _this.$message({
                        showClose: true,
                        message: '_登录超时_,5S_后跳转到登录页面_',
                        type: 'warning'
                      });
                      setTimeout(function(){
                        _this.$store.commit("goLogin");
                      },5000)
                      return
                    }else if(data.Result==200){
                      _this.dataList=[];
                    }
                    _this.doQuery();
                    _this.editEquipment=false;
                    _this.addEquipment=false;
									},
									error:function () {
						              	console.log('_请求失败_')
				}
						    });
						}else{
					        console.log('error submit!!');
					        return false;
				        }
				    });
			},
			//编辑单辆车
		/*	submitForm22(formName){
				this.$refs[formName].validate((valid) => {
			        if (valid) {
			          let _this=this;
                let dataJson;
                var FVehicleID = this.Fguid;
                this[formName].FOverSpeedTimeLength=this[formName].FOverSpeedTimeLength*60;
                this[formName].FFatigueRunningTimeLength=this[formName].FFatigueRunningTimeLength*60;
                this[formName].FFatigueRestTimeLength=this[formName].FFatigueRestTimeLength*60;
                this[formName].FStopCloseACCTimeLength=this[formName].FStopCloseACCTimeLength*60;
                this[formName].FStopOpenACCTimeLength=this[formName].FStopOpenACCTimeLength*60;
                if(this.SystemID==1){
                  this[formName].FTPMSTimeLength=this[formName].FTPMSTimeLength*60;
                  dataJson=JSON.stringify({FTokenID:_this.$store.state.FTokenID,FAction:"UpdateSystemConfigAlarm",FVehicleGUID:FVehicleID,FT_SystemConfigAlarm:this[formName],FVersion:"1.0.0"})
                }else if(this.SystemID==2){
                  dataJson=JSON.stringify({FTokenID:_this.$store.state.FTokenID,FAction:"UpdateSystemConfigAlarm",FVehicleGUID:FVehicleID,FT_SystemConfigAlarm:this[formName],FVersion:"1.0.0"})
                }
                else if(this.SystemID==3){
                  dataJson=JSON.stringify({FTokenID:_this.$store.state.FTokenID,FAction:"UpdateSystemConfigAlarm",FVehicleGUID:FVehicleID,FT_ColdChain_SystemConfigAlarm:this[formName],FVersion:"1.0.0"})
                }
				$.ajax({
						"url":  '/web/Common/Common_System',
						"cache": false,
						"async": true,
						"type": "post",
						"dataType": "json",
						"contentType": "application/json; charset=utf-8",
            "data": dataJson,
						success:function(data){
				                        console.log(data);
							_this.dataList=[];
										_this.editEquipment=false;
							_this.doQuery();
						},
						error:function () {
			              	console.log('_请求失败_')
			            }
				    });
						}else{
					        console.log('error submit!!');
					        return false;
				        }
				    });
			},*/
			//修改全局
			submitForm(formName) {       
             // 给胎温胎压设置默认值，避免系统切换造成的0值.低胎温和最低温不确定，给0也可以
            this[formName].FTPMSMaxTyre=(this[formName].FTPMSMaxTyre==0||this[formName].FTPMSMaxTyre=='')?13:this[formName].FTPMSMaxTyre;
            this[formName].FTPMSMinTyre=(this[formName].FTPMSMinTyre==0||this[formName].FTPMSMinTyre=='')?7:this[formName].FTPMSMinTyre;
            this[formName].FTPMSMaxTem=(this[formName].FTPMSMaxTem==0||this[formName].FTPMSMaxTem=='')?100:this[formName].FTPMSMaxTem;
            // this[formName].FTPMSMinTem=(this[formName].FTPMSMinTem==0||this[formName].FTPMSMinTem=='')?25:this[formName].FTPMSMinTem;
            this[formName].FTPMSTimeLength=(this[formName].FTPMSTimeLength==0||this[formName].FTPMSTimeLength=='')?20:this[formName].FTPMSTimeLength;
            this[formName].FCoolerTimeLength=(this[formName].FCoolerTimeLength==0||this[formName].FCoolerTimeLength=='')?20:this[formName].FCoolerTimeLength;
            this[formName].FCoolerHightTemperature=(this[formName].FCoolerHightTemperature==0||this[formName].FCoolerHightTemperature=='')?100:this[formName].FCoolerHightTemperature;
            /*this[formName].FCoolerLowTemperature=(this[formName].FCoolerLowTemperature==0||this[formName].FCoolerLowTemperature=='')?35:this[formName].FCoolerLowTemperature;*/
		        this.$refs[formName].validate((valid) => {
			        if (valid) {
			        	let _this=this;
                let dataJson;
                this[formName].FFatigueRunningTimeLength=this[formName].FFatigueRunningTimeLength*60;
                this[formName].FFatigueRestTimeLength=this[formName].FFatigueRestTimeLength*60;
                this[formName].FStopCloseACCTimeLength=this[formName].FStopCloseACCTimeLength*60;
                this[formName].FStopOpenACCTimeLength=this[formName].FStopOpenACCTimeLength*60;
                this[formName].FOverSpeedTimeLength=this[formName].FOverSpeedTimeLength*60;
                this[formName].FTPMSTimeLength=this[formName].FTPMSTimeLength*60;
                this[formName].FCoolerTimeLength=this[formName].FCoolerTimeLength*60;
                dataJson=JSON.stringify({FTokenID:_this.$store.state.FTokenID,FAction:"UpdateSystemConfigAlarm",FT_SystemConfigAlarm:this[formName],FSystemType:_this.$store.state.choiceSystemID,FVersion:"1.0.0"})
						$.ajax({
							"url": '/web/Common/Common_System',
							"cache": false,
							"async": true,
							"type": "post",
							"dataType": "json",
							"contentType": "application/json; charset=utf-8",
              "data":dataJson,
							success: function (data) {
								console.log(data);
                if(data.Result==104) {
                  _this.$message({
                    showClose: true,
                    message: '_登录超时_,5S_后跳转到登录页面_',
                    type: 'warning'
                  });
                  setTimeout(function(){
                    _this.$store.commit("goLogin");
                  },5000)
                  return
                }else if(data.Result==200){
                  _this.$message({
                    showClose: true,
                    message: '_保存成功_',
                    type: 'success'
                  });
                }
                _this.doQueryAll(formName);

							},
							error:function () {
				              	console.log('_请求失败_')
				            }
						});
			        } else {
			          console.log('error submit!!');
			          return false;
			        }
			    });
		    },
		    //重置全局
		    resetForm(formName) {
		      this.$refs[formName].resetFields();
		      	//$('.search-input').val('');
        		//$('.search-input').removeAttr('fguid');
          $('.carInput input').val(''); //更换了class
          $('.carInput input').removeAttr('fguid');
          $('.carInput input').attr('title','');
		    },
		    //查询全局
		    doQueryAll(formName){
		    	let _this=this;
          let action;
				let TokenID=this.$store.state.FTokenID;
				$.ajax({
					"url": '/web/Common/Common_System',
					"cache": false,
					"async": true,
					"type": "post",
					"dataType": "json",
					"contentType": "application/json; charset=utf-8",
					"data":'{"FTokenID": "'+TokenID+'","FAction": "QuerySystemConfigAlarmAll","FSystemType":"'+_this.$store.state.choiceSystemID+'","FVersion": "1.0.0"}',
					success: function (data) {
						console.log(data);
						var Fobj=data;
          if(Fobj.FObject.length!=0){
            _this[formName]=Fobj.FObject[0];
            _this[formName].FFatigueRunningTimeLength=_this[formName].FFatigueRunningTimeLength/60;
            _this[formName].FFatigueRestTimeLength=_this[formName].FFatigueRestTimeLength/60;
            _this[formName].FStopCloseACCTimeLength=_this[formName].FStopCloseACCTimeLength/60;
            _this[formName].FStopOpenACCTimeLength=_this[formName].FStopOpenACCTimeLength/60;
            _this[formName].FTPMSTimeLength=_this[formName].FTPMSTimeLength/60;
            _this[formName].FOverSpeedTimeLength=_this[formName].FOverSpeedTimeLength/60;
            _this[formName].FCoolerTimeLength=_this[formName].FCoolerTimeLength/60;
          }
					},
					error:function () {
		              	console.log('_请求失败_')
		            }
				});
		    },
		    //查询列表
		    doQuery(){
		    	let _this=this;
				let TokenID=this.$store.state.FTokenID;
				let FKey=this.searchKey;
				let PageSize = this.pageSize;
				let pageIndex = this.pageIndex;
				$.ajax({
					"url":  '/web/Common/Common_System',
					"cache": false,
					"async": true,
					"type": "post",
					"dataType": "json",
					"contentType": "application/json; charset=utf-8",
					"data":'{"FTokenID": "'+TokenID+'","FAction": "QuerySystemConfigAlarmVehicle","FSystemType":"'+_this.$store.state.choiceSystemID+'","FVersion": "1.0.0","FKey":"' + FKey + '","FPageSize":"' + PageSize + '","FPageIndex":"' + pageIndex + '"}',
					success: function (data) {
						console.log(data);
						var Fobj=data;
						_this.dataList=[];
						_this.FTotalCount=Fobj.FObject.Table[0].FTotalCount;
						$.each(Fobj.FObject.Table1, function (index, obj) {
						  obj.butn=true;
						  obj.FOverSpeedTimeLength=obj.FOverSpeedTimeLength/60;
						  obj.FFatigueRunningTimeLength=obj.FFatigueRunningTimeLength/60;
						  obj.FFatigueRestTimeLength=obj.FFatigueRestTimeLength/60;
						  obj.FStopCloseACCTimeLength=obj.FStopCloseACCTimeLength/60;
						  obj.FStopOpenACCTimeLength=obj.FStopOpenACCTimeLength/60;
						  obj.FTPMSTimeLength=obj.FTPMSTimeLength/60;
              obj.FCoolerTimeLength=obj.FCoolerTimeLength/60;
		                  _this.dataList.push(obj);
		                });
					},
					error:function () {
		              	console.log('_请求失败_')
		            }
				});
		    },
		},
		watch: {
			screenHeight () {
				this.adjustPage();
			},
      addEquipment: {
        handler () {
          this.ruleForm11={
              FOverSpeedTimeLength:'',
              FOverSpeedHighRoad:'',
              FOverSpeedOrdinaryRoad:'',
              FFatigueRunningTimeLength:'',
              FFatigueRestTimeLength:'',
              FStopCloseACCTimeLength:'',
              FStopOpenACCTimeLength:'',
              FTPMSMaxTyre:'',
              FTPMSMinTyre:'',
              FTPMSMaxTem:'',
              FTPMSMinTem:'',
              FTPMSTimeLength:'',
              FCoolerHightTemperature:'',
              FCoolerLowTemperature:'',
              FCoolerTimeLength:''
            };
          this.ruleForm22={
            FOverSpeedTimeLength:'',
            FOverSpeedHighRoad:'',
            FOverSpeedOrdinaryRoad:'',
            FFatigueRunningTimeLength:'',
            FFatigueRestTimeLength:'',
            FStopCloseACCTimeLength:'',
            FStopOpenACCTimeLength:'',
            FTPMSMaxTyre:'',
            FTPMSMinTyre:'',
            FTPMSMaxTem:'',
            FTPMSMinTem:'',
            FTPMSTimeLength:'',
            FCoolerHightTemperature:'',
            FCoolerLowTemperature:'',
             FCoolerTimeLength:''
          };
          this.ruleForm33={
            FOverSpeedTimeLength:'',
            FOverSpeedHighRoad:'',
            FOverSpeedOrdinaryRoad:'',
            FFatigueRunningTimeLength:'',
            FFatigueRestTimeLength:'',
            FStopCloseACCTimeLength:'',
            FStopOpenACCTimeLength:'',
            FTPMSMaxTyre:'',
            FTPMSMinTyre:'',
            FTPMSMaxTem:'',
            FTPMSMinTem:'',
            FTPMSTimeLength:'',
            FCoolerHightTemperature:'',
            FCoolerLowTemperature:'',
             FCoolerTimeLength:''
          },
          this.ruleForm44={
            FOverSpeedTimeLength:'',
            FOverSpeedHighRoad:'',
            FOverSpeedOrdinaryRoad:'',
            FFatigueRunningTimeLength:'',
            FFatigueRestTimeLength:'',
            FStopCloseACCTimeLength:'',
            FStopOpenACCTimeLength:'',
            FTPMSMaxTyre:'',
            FTPMSMinTyre:'',
            FTPMSMaxTem:'',
            FTPMSMinTem:'',
            FTPMSTimeLength:'',
            FCoolerHightTemperature:'',
            FCoolerLowTemperature:'',
             FCoolerTimeLength:''
          },
          $('.carInput input').val('');
          $('.carInput input').attr('title','');
          $('.carInput input').attr('fguid','');
        },
        //deep: true
      },
		},
	}
</script>
<style scoped>
	.config-explain {
		border-bottom:1px solid #ccc;
		position: relative;
	}
	/* .save-speed-config{
	 	display:inline-block;
	 	width:40px;
	 } */
	.config-row{
		border-top:1px solid #ccc;
	}
  .config-row .el-row{
    margin: 10px;
  }
	.explain-text {
		display:inline-block;
		height:30px;
		line-height:26px;
		border-bottom:4px solid #ffa81c;
		padding:0 15px;
	}
	.part-config-btnList {
		display:inline-block;
		position:absolute;
		right:0;
		top:-5px;
	}
	 .config-item {
		margin-top:16px;
	}
	.add-car {
		padding:7px 11px;
		border-radius:0;
		border:none;
		color:#fff;
		background-color:#1b8384;
	}
	.delete-car {
		padding:7px 11px;
		border-radius:0;
		border:none;
		color:#fff;
		background-color:#ea6355;
	}
	.save-data {
		color:#fff;
		border-radius:0;
		border:none;
		padding:13px 36px;
		background-color:#005fc6;
		position: absolute;
		position:absolute;
		bottom:15px;
		left:120px;
	}
	.reset-data {
		color:#fff;
		border-radius:0;
		border:none;
		padding:13px 36px;
		background-color:#506e90;
		position:absolute;
		bottom:15px;
		left:10px;
	}
    .allAlarmConfigWrap {
   		background-color:#fff;
   		/*padding:10px;*/
   		margin:10px 0 0 10px;
   	}
   	.overall-config{
	   	height:600px;
	}
	 .save-config-data{
    position:absolute;
      bottom:120px;
   /*   border:1px solid red;*/
  } 
	.el-table .el-button{
     padding:0;
   }
   .rightinput {
		float:left;
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
		position:relative;
		left:-40px;
		box-shadow:none;
		height:20px !important;
		outline:none;
	}
</style>
<style>
    .AlarmConfigGather .el-tabs__nav-wrap {
       		background-color:#005fc6;
    }
    .AlarmConfigGather .el-tabs__item.is-active {
		color:#005fc6;
	}
	.AlarmConfigGather .el-tabs__nav {
		height:42px;
		margin-left:10px;
	}
	.AlarmConfigGather .el-tabs__item {
		height:34px;
		line-height:28px;
		margin-top:8px;
		font-size:16px;
		color:#fff;
		border-top-left-radius:3px;
		border-top-right-radius:3px;
	}
	.AlarmConfigGather .el-form-item {
		margin-bottom:0;
		max-width:380px;
		/*margin-top:10px;*/
	}
	.AlarmConfigGather .el-form-item label {
		font-weight:500;
		color:#333;
	}
	.AlarmConfigGather .el-form-item .el-input__inner {
		border-radius:0;
		height:28px;
	}
    .AlarmConfigGather .el-tabs--border-card > .el-tabs__content {
		padding:0;
	}
	.AlarmConfigGather .el-row:first-child{
		margin-top: 10px
	}
	.AlarmConfigGather .el-row:last-child{
		margin-bottom: 15px
	}
	/* .AlarmConfigGather .el-form-item__error{
    margin-top: -6px;
  } */
  .addCar-dialog{
    z-index: 1041!important;
  }
     .v-modal{
      z-index: 1040!important;
    }
    .addCar-dialog .el-dialog__body{
      overflow: hidden!important;
    }
   .allAlarmConfigWrap .el-form-item__label{
      padding-right: 8px;
  }
  .addCar-dialog .el-row,.demo-ruleForm .el-row{
    margin: 10px 0px;
  }
  .carInput input{
    padding-left: 30px;
  }
	/* .vehical-width{
      width:850px;
    } */
  @media (min-width:1600px) {   
    .vehical-width .el-dialog--small {
        width: 41%;
    } 

    }
    @media (min-width:1300px) and (max-width:1599px){
      .vehical-width .el-dialog--small {
        width: 52%;
    } 
    }
    @media (min-width:1200px) and (max-width:1299px){
      .vehical-width .el-dialog--small {
        width: 52%;
    } 
    }
    @media (max-width:1199px) {
      .vehical-width .el-dialog--small {
          width: 50%;
      } 
    } 
</style>
