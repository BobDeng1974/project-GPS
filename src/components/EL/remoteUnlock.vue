<template>
  <section style="height: 100%" class="row">
    <div class="col-md-3" style="height: 100%;padding-left:16px;padding-right: 10px">
      <div class="carTeamList">
        <el-input
          class="filterInput"
          placeholder="_输入关键字_"
          v-model="filterText">
        </el-input>
        <el-tree
          class="filter-tree"
          :props="defaultProps"
          :highlight-current="true"
          :data="data3"
          :load="loadTree"
          default-expand-all
          :filter-node-method="filterNode"
          :render-content="renderContent"
          @node-click="handleNodeClick"
          ref="tree2">
        </el-tree>
      </div>
    </div>
    <div class="col-md-9 unlockPanel" style="height: 100%">
      <div class="carInfoBox">
        <!--  <ul>
            <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;车牌：{{FVehicleName}}</li>
            <li>电子锁ID：{{lockID}}</li>
            <li>当前状态：{{currentStatus}}</li>
            <li>当前位置：{{currentPosition}}</li>
          </ul>
        <p><i class="fa fa-lock" style="margin-right: 10px"></i>开锁</p>-->
        <baidu-map ref="map" :fa-data="[false]" ></baidu-map>
      </div>
      <div class="unlocking">
        <div class="unlocking-btn">
          <ul>
            <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_车牌_：{{FVehicleName}}</li>
            <li>_电子锁_ID：{{lockID}}</li>
            <li>_当前状态_：{{currentStatus}}</li>
            <li>_当前位置_：{{currentPosition}}</li>
        </ul>
          <el-button type="primary" size="large" @click="unlocking" style="margin-left: 40px;width: 200px"><i class="fa fa-lock" style="margin-right: 10px"></i>_开锁_</el-button>
        </div>
      </div>
      <div class="lockingDialog">
        <el-dialog  :visible.sync="dialogVisible"  >
          <ul class="unlocking-progress">
            <li v-loading="loading"  element-loading-text="_正在开锁_" v-if="lock" ></li>
            <li v-if="success" ><el-progress type="circle" :percentage="100" status="success" ></el-progress><p class="unlocking-status">_开锁成功_</p></li>
            <li v-if="error" ><el-progress type="circle" :percentage="100" status="exception" ></el-progress><p class="unlocking-status">_开锁失败_</p></li>
          </ul>
        </el-dialog>
      </div>
    </div>
  </section>
</template>
<script>
  import baiduMap from '../Common/baidu_map.vue'
  import baidu  from '../../js/GIS/Baidu/BaiduAPI'
  let _this
  export default{
    data(){
      _this=this;
      return{
        loading:true,
        Area:"深圳",
        mapToolShow:false,
        dialogVisible:false,
        filterText: '',
        data3: null,
        defaultProps: {
          children: 'children',
          label: 'FVehicleName',
          id:'FAssetID',
        },
        FVehicleName:null,
        lockID:null,
        currentStatus:null,
        currentPosition:null,
        FAssetID:null,
        lock:false,
        success:false,
        error:false,
        timer:null
      }
    },
    props: {
      screenHeight: Number,
    },
    watch:{
      filterText(val) {
        this.$refs.tree2.filter(val);
      },
      screenHeight(){
        $("#map-wrapper").height($('.carInfoBox').height());

      },
    },
    mounted(){
      _this.loadVehicalList();
      $("#map-wrapper").height($('.carInfoBox').height());
      this.$refs.map.initMap();
      let oldValue=_this.$store.state.allLocksData;
      setInterval(function () {
       if(_this.$store.state.allLocksData!=oldValue){
         _this.data3=_this.$store.state.allLocksData;
         oldValue=_this.$store.state.allLocksData;
       }
     },1000)
    },
    updated(){
      $("#map-wrapper").height($('.carInfoBox').height());
    },
    methods:{
     loadVehicalList(){
       function setData(){
         _this.data3=_this.$store.state.allLocksData;
         console.log(_this.data3)
       }
        if(this.$store.state.allLockList!=null){
          setData()
        }else {
          this.$store.commit('getAllLocksData',setData)
        }
      },
      renderContent(h, { node, data, store }){
        return(
          <span class={{green:!data.FAlarmOffLine&&data.FAssetID.indexOf("@A")==-1,noclick:data.FAlarmOffLine&&data.FAssetID.indexOf("@A")==-1}}>
          <i class="fa fa-home icon fa-lg" v-show={data.FAssetID.indexOf("@A")!=-1}></i>
          <i class="fa fa-lock icon" v-show={data.FAssetID.indexOf("@A")==-1&&!data.FLockStatus}></i>
          <i class="fa fa-unlock icon" v-show={data.FAssetID.indexOf("@A")==-1&&data.FLockStatus}></i>
          <span  v-show={data.FAssetID.indexOf("@A")!=-1}>{data.FVehicleName}</span>
          <span  v-show={data.FAssetID.indexOf("@A")==-1}>{data.FAssetID}</span>
          <span v-show={data.FAssetID.indexOf("@A")!=-1} style="font-weight:bold">[{data.count}]</span>
          <span style="margin-left:10px" v-show={data.FAssetID.indexOf("@A")==-1}>({data.FVehicleName})</span>
          </span>
      )
      },
      filterNode(value, data) {
        if (!value) return true;
        if(data.FAssetID){
          return data.FAssetID.indexOf(value) !== -1;
        }
      },
      handleNodeClick(data){
        if(data.FAssetID.indexOf("@A")===-1&&!data.FAlarmOffLine){
          _this.FVehicleName= data.FVehicleName;
          _this.lockID=data.FAssetID;
          if(data.FLockAlarmDescribeJSON!=null){
            _this.currentStatus=data.FLockAlarmDescribeJSON
          }else {
            _this.currentStatus="正常"
          }
          var Baidu= new baidu.baiduAPI();
          var obj=_this.parsePointBD(new BMap.Point(data.FLongitude,data.FLatitude));
          var point = Baidu.GetPosition(obj.lng,obj.lat);
          var geoc = Baidu.GetClientGeocoder();
          Baidu.Geoco_GetLocation(geoc, point, function (json) {
            _this.currentPosition=json.address
          });
          if(data.FLongitude>0&&data.FLatitude>0){
            this.$refs.map.setMark(obj);
          }else {
            _this.$refs.map.initMap();
            _this.$message({
              showClose: true,
              message: '_暂无位置信息_',
              type: 'warning'
            });
          }
        }else if(data.FAlarmOffLine){
          _this.$message({
            showClose: true,
            message: '_离线状态不能开锁_',
            type: 'warning'
          });
        }
      },
      //远程开锁
       unlocking(){
        if(_this.lockID!=null&&_this.lockID!=''){
          _this.dialogVisible=true;
          _this.success=false;
          _this.error=false;
          _this.lock=true;
          $.ajax({
            "url": "/web//Lock/Lock_SmartLock",
            "cache": false,
            "async": true,
            "type": "post",
            "dataType": "json",
            "contentType": "application/json; charset=utf-8",
            "data": '{"FTokenID":"' + _this.$store.state.FTokenID + '","FAction":"OpenLockControl","FAssetID":"'+_this.lockID+'","FVersion":"1.0.0"}',
            success: function (json) {
              let i=0;
              if(json.Result==104){
                _this.lock=false;
                _this.dialogVisible=false;
                _this.$message({
                  showClose: true,
                  message: '_登录超时,5S后跳转到登录页面_',
                  type: 'warning'
                });
                setTimeout(function(){
                  _this.$store.commit("goLogin");
                },5000)
                return
              }else if (json.Result==200) {
               _this.timer=setInterval(function () {
                 i++;
                 if(i>5){
                   clearInterval(_this.timer);
                   _this.lock=false;
                   _this.error=true;
                   setTimeout(function () {
                     _this.dialogVisible=false
                   },1000);
                 }else {
                   _this.getLockStatus();
                 }
                },2000);

          }else {
                _this.lock=false;
                _this.error=true;
                setTimeout(function () {
                  _this.dialogVisible=false
                },1000);
              }
              console.log(json);
            },
            error: function () {
              _this.lock=false;
              _this.error=true;
              setTimeout(function () {
                _this.dialogVisible=false
              },1000);
            }
          });
        }else{
          _this.$message({
            showClose: true,
            message: '_请选择车辆_',
            type: 'warning'
          });
        }
      },
      //查看远程开锁进度
      getLockStatus(){
        $.ajax({
          "url": "/web//Lock/Lock_SmartLock",
          "cache": false,
          "async": true,
          "type": "post",
          "dataType": "json",
          "contentType": "application/json; charset=utf-8",
          "data": '{"FTokenID":"' + _this.$store.state.FTokenID + '","FAction":"QueryLockStatus","FAssetID":"'+_this.lockID+'","FVersion":"1.0.0"}',
          success: function (json) {
            console.log(json);
            if(json.Result==109){
              _this.lock=true;
            }else if(json.Result==200){
              clearInterval(_this.timer);
              _this.lock=false;
              _this.success=true;
              function setData(){
                _this.data3=_this.$store.state.allLocksData;
                console.log(123)
              }
              _this.$store.commit('getAllLocksData',setData);
              setTimeout(function () {
                _this.dialogVisible=false
              },1000);
            }else {
              _this.lock=false;
              _this.error=true;
              clearInterval(_this.timer);
              setTimeout(function () {
                _this.dialogVisible=false
              },1000);
            }
          },
          error: function () {
            clearInterval(_this.timer);
            _this.lock=false;
            _this.error=true;
            setTimeout(function () {
              _this.dialogVisible=false
            },1000);
          }
        });
      }

    },
    activated: function(){
      if(this.$route.params.ID!=undefined ){
        _this.lockID=this.$route.params.ID;
        $.each(_this.data3[0].children,function (index,obj){
         if(obj.FAssetID== _this.lockID) {
           _this.FVehicleName = obj.FVehicleName;
           if(obj.FLockAlarmDescribeJSON!=null){
             _this.currentStatus=obj.FLockAlarmDescribeJSON
           }else {
             _this.currentStatus="正常"
           }
           if(obj.FLongitude!=0&&obj.FLatitude!=0){
             var Baidu= new baidu.baiduAPI();
             var ponit0=_this.parsePointBD(new BMap.Point(obj.FLongitude,obj.FLatitude));
             var point = Baidu.GetPosition(ponit0.lng,ponit0.lat);
             var geoc = Baidu.GetClientGeocoder();
             Baidu.Geoco_GetLocation(geoc, point, function (json) {
               _this.currentPosition=json.address
             });
             _this.$refs.map.setMark(ponit0);
           }else {
             _this.$refs.map.initMap();
             _this.$message({
               showClose: true,
               message: '_暂无位置信息_',
               type: 'warning'
             });
           }
         }

        })
      }

    },
    components:{
      baiduMap,
    }
  }
</script>
<style>
  .carTeamList{
    border: 1px solid #cccccc;
    background:white;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
  .unlockPanel{
    border: 1px solid #cccccc;
    background:white;
    padding-left: 0px;
  }
  .filterInput{
    height: 4%;
  }
  .carTeamList .el-tree {
    height: 96%;
    overflow-y:auto;
  }
  .carTeamList .el-tree-node__content{
    border-bottom: 1px solid #ccc;
  }
  .icon{
    margin-right: 5px;
  }
  .carInfoBox{
    width: 100%;
    height: 50%;
    border-bottom: 1px solid #cccccc;
    position: relative;
  }
  .unlocking ul{
    margin-left: 40px;
  }
  .unlocking ul li{
    height: 40px;
    font-size: 16px;
    font-weight: bold;
  }
  .carInfoBox p{
    position: absolute;
    left:30px;
    top: -50px;
    font-size: 20px;
    font-weight: bold;
    color:#005fc6;
  }
  .carInfoBox #map-component #map-tool{
    display: none!important;
  }
  .unlocking{
    width: 100%;
    height: 50%;
    position: relative;
  }
  .unlocking-btn{
    margin-left: 20px;
    margin-top: 20px;
  }
  .lockingDialog .el-dialog{
    width: 150px;
    height: 150px;
    top:50%!important;
    margin-top: -75px;
  }
  .lockingDialog .el-dialog .el-dialog__body{
    padding: 0px;
  }
  .lockingDialog .el-dialog ul li {
    width: 150px;
    height: 150px;
    text-align: center;
  }
  .lockingDialog .el-dialog ul li .el-loading-spinner{
    margin-top: -60px;
  }
  .lockingDialog .el-dialog ul li  .circular{
    width: 100px;
    height: 100px;
  }
  .lockingDialog .el-dialog ul li .el-progress-circle{
    width: 100px!important;
    height: 100px!important;
    margin-top: 10px;
  }
  .lockingDialog .el-dialog ul li .el-icon-check{
    font-size: 40px;
  }
  .lockingDialog .el-dialog__header{
    display: none;
  }
  .noclick{
    cursor: not-allowed;
  }
 /* .unlocking-progress{
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -255px;
    margin-top: -115px;
  }*/
/*  .unlocking-progress li{
    width: 150px;
    height: 150px;
    float: left;
    margin: 10px;
    text-align: center;
  }
  .unlocking-progress li .el-loading-spinner{
    margin-top: -50px;;
  }
  .unlocking-progress li .circular{
    width: 100px;
    height: 100px;
  }
  .unlocking-progress li .el-loading-spinner .el-loading-text{
    margin-top: -4px;
  }
  .unlocking-progress li .el-progress--circle{
    margin-top: 10px;
  }
  .unlocking-status{
    margin-top: 10px;
    color: white;
  }*/
  .green{
    color:#00b700;
  }
</style>
