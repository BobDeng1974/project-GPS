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
        <baidu-map ref="map" :fa-data="[mapToolShow]" ></baidu-map>
      </div>
      <div class="unlocking">
        <header style="height: 40px;width: 100%;background: #f0f0f0;border-bottom:1px solid #f0f0f0;line-height: 40px;padding: 0px 20px">
          <span>{{FVehicleName}}</span>
          <span class="pull-right">
            <el-button style="background: #999999;color: white">全部禁止</el-button>
            <el-button style="background: #09bb07;color: white">全部允许</el-button>
          </span>
        </header>
        <div>
          <el-table
            :data="tableData"
            :height="tableHeight"
            border
            style="width: 100%">
            <el-table-column
              prop="FName"
              :label="fenceNum"
              width="180">
            </el-table-column>
            <el-table-column
              prop="FCreateTime"
              label="创建时间"
              width="260">
            </el-table-column>
            <el-table-column
              prop=""
              label="操作">
              <template scope="scope" >
                <a href="javascript:" v-if="scope.row.isConfig==1" @click="bindFence(scope.$index,scope.row,'UpdateLBSGISUnLockFence')">允许开锁</a>
                <a href="javascript:" v-if="scope.row.isConfig==0" @click="bindFence(scope.$index,scope.row,'SetLBSGISUnLockFence')">禁止开锁</a>
              </template>
            </el-table-column>
          </el-table>
        </div>
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
        mapToolShow:true,
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
        tableHeight:null,
        tableData:null,
        fenceNum:null,
        table:null,
        guid:null
      }
    },
    props: {
      screenHeight: Number,
    },
    activated: function(){
    },
    watch:{
      filterText(val) {
        this.$refs.tree2.filter(val);
      },
      screenHeight(){
        $("#map-wrapper").height($('.carInfoBox').height());
        this.tableHeight=$('.unlocking').height()-40
      }
    },
    mounted(){
      _this.loadVehicalList();
      this.$refs.map.initMap();
      $("#map-wrapper").height($('.carInfoBox').height());
      this.tableHeight=$('.unlocking').height()-40;
      setInterval(function () {
        _this.loadVehicalList()
      },1000*60);
      this.showAllfence();
      this.loadFence()
      let oldValue=_this.$store.state.allLocksData;
      setInterval(function () {
        if(_this.$store.state.allLocksData!=oldValue){
          console.log(_this.$store.state.allLocksData)
          _this.data3=_this.$store.state.allLocksData;
          oldValue=_this.$store.state.allLocksData;
        }
      },1000)
    },
    methods:{
      loadVehicalList(){
        this.data3=_this.$store.state.allLocksData
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
      loadFence(){
        $.ajax({
          "url": "/web/Common/Common_LBS",
          "cache": false,
          "async": true,
          "type": "post",
          "dataType": "json",
          "contentType": "application/json; charset=utf-8",
          "data": '{"FTokenID":"' + _this.$store.state.FTokenID + '","FAction":"QueryLBSGISFenceList","FPageSize":999999,"FPageIndex":1,"FVersion":"1.0.0"}',
          success: function (json) {
            console.log(json)
            _this.tableData=json.FObject.Table1
            _this.fenceNum= "围栏"+'('+_this.tableData.length+')'
            $.each( _this.tableData,function (index,obj) {
              console.log(index);
              obj.FCreateTime=_this.parseGMT(obj.FCreateTime.replace(/T/ig,' '));
              _this.$set(_this.tableData[index],'isConfig',null);
            })
          },
          error:function () {

          }
        })
      },
      handleNodeClick(data){
        if(data.FAssetID.indexOf("@A")===-1&&!data.FAlarmOffLine){
          _this.FVehicleName= data.FAssetID;
          _this.lockID=data.FAssetGUID;
          var Baidu= new baidu.baiduAPI();
       /*   if(data.FLongitude>0&&data.FLatitude>0){
            var point = new BMap.Point(data.FLongitude,data.FLatitude);
            this.$refs.map.setMark(point);
          }else {
            _this.$refs.map.initMap();
            _this.$message({
              showClose: true,
              message: '_暂无位置信息_',
              type: 'warning'
            });
          }*/
          $.ajax({
            "url": "/web/Lock/Lock_LBS",
            "cache": false,
            "async": true,
            "type": "post",
            "dataType": "json",
            "contentType": "application/json; charset=utf-8",
            "data": '{"FTokenID":"' + _this.$store.state.FTokenID + '","FAction":"QueryLBSGISUnLockFenceByFAssetGUID","FAssetGUID":"'+_this.lockID+'","FVersion":"1.0.0"}',
            success: function (json) {
              console.log(json)
              _this.table=json.FObject
              if(json.FObject.length==0){
                $.each(_this.tableData,function (index,obj) {
                  obj.isConfig=0
                })
              }else {
                  $.each(json.FObject,function (i,item) {
                    $.each(_this.tableData,function (index,obj) {
                      if(item.FFenceGUID==obj.FGUID){
                        obj.isConfig=1
                      }else {
                        obj.isConfig=0
                      }
                  })
                })
              }
            },
            error:function () {

            }
          })

        }else if(data.FAlarmOffLine){
          _this.$message({
            showClose: true,
            message: '_离线状态不能配置_',
            type: 'warning'
          });
        }
      },
      async showAllfence() {
           await new Promise((resove)=> {
             setTimeout(async function () {
               await _this.$refs.map.getFenceData();
               resove()
             }, 100)
           });
          _this.$refs.map.showFence('all');
      },
      bindFence(index,row,status){
        _this.guid=row.FGUID;
        let a=_this.table.length+1
        $.ajax({
          "url": "/web/Lock/Lock_LBS",
          "cache": false,
          "async": true,
          "type": "post",
          "dataType": "json",
          "contentType": "application/json; charset=utf-8",
          "data": '{"FTokenID":"' + _this.$store.state.FTokenID + '","FAction":"'+status+'","FAssetGUID":"'+_this.lockID+'","FFenceGUID":"'+_this.guid+'","FIndex":"'+a+'","FVersion":"1.0.0"}',
          success: function (json) {
            if(json.Result==200){

              _this.queryBindFenceStatus()
            }
          },
          error:function () {

          }
        })
      },
      queryBindFenceStatus(){
        $.ajax({
          "url": "/web/Lock/Lock_LBS",
          "cache": false,
          "async": true,
          "type": "post",
          "dataType": "json",
          "contentType": "application/json; charset=utf-8",
          "data": '{"FTokenID":"' + _this.$store.state.FTokenID + '","FAction":"QueryLBSGISBoundFenceStatus","FAssetGUID":"'+_this.lockID+'","FFenceGUID":"'+_this.guid+'","FIndex":"'+_this.table.length+1+'","FVersion":"1.0.0"}',
          success: function (json) {
            console.log(json)
          },
          error:function () {

          }
        })
     }
    },
    activated: function(){
    },
    components:{
      baiduMap,
    }
  }
</script>
<style>
.unlocking .el-table__body-wrapper{
  overflow-x: hidden;
  overflow-y: auto;
}
.carInfoBox #map-tool> li:last-child,.carInfoBox #map-tool> li:nth-last-child(2){
  display: none;
}
</style>
