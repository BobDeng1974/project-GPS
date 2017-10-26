<template>
  <section>
    <vehical-select-dialog v-on:child="get"></vehical-select-dialog>
     <!-- 地图弹窗 -->
   <div class="mymodal" style="height: 470px;width: 640px;margin-left:-320px;margin-top: -230px;position: fixed;left: 50%;top: 50%;z-index:999;visibility: hidden">
      <div class="modal-header" style="position: absolute;left: 640px;height: 20px;width: 20px;border: none;padding: 0px">
        <button type="button" @click="closeMymodal" style="height: 20px;width: 20px;border-radius: 10px;background:#999999"><span class="glyphicon glyphicon-remove" style="color: white;font-size:14px;font-weight: normal"></span></button>
      </div>
      <div class="modal-body"  style="padding: 0px">
        <baidu-map ref="map" :fa-data="[Area,mapToolShow]" ></baidu-map>
      </div>
    </div>
    <div id="operate_wrapper">
      <div class='box-header'>
        <div class="block">
          <span class="operatExp">_选择车辆_</span>
          <div class="search-input-wrap">
            <a href="javascript:;" class="get-carList-dialog">
              <i class="img-icon icon-carList-dialog" data-toggle="modal" data-target="#modal"></i>
            </a>
            <input type="text" class="search-input " disabled>
          </div>
        </div>
        <div class="block">
          <span class="operatExp">_选择时间_</span>
          <el-date-picker
            size="small"
            v-model="value3"
            type="daterange"
            @change="getTime"
            :clearable="false"
            :picker-options="pickerOptions2"
            placeholder="选择时间范围">
          </el-date-picker>
        </div>
        <div class="btnList">
          <el-button type="primary" class="search" @click='doQuery'>查询</el-button>
          <el-button type="primary" class="reset" @click='reset'>重置</el-button>
          <el-button type="primary"  @click='getPosition(116.67,39.92)'>位置</el-button>
          <el-dropdown>
            <el-button type="primary" class='export'>
              导出文件 <i class="fa fa-share-square-o"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><a href="#">导出CVS</a></el-dropdown-item>
              <el-dropdown-item>导出PDF</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="el_table_wrap" id="el_table_wrap">
      <el-table :data="tableData3" stripe style="width: 100%" :height="table_height">
        <el-table-column type='index' label="_序号_" width="80" ></el-table-column> 
        <el-table-column prop='FShortName' label="_公司名称_" width="140" sortable></el-table-column>
        <el-table-column prop="FVehicleName" label="_车牌号_" width="140" sortable></el-table-column>
        <el-table-column prop="FStartTime" label="_开始时间_" width="140" sortable></el-table-column>
        <el-table-column prop="FEndTime" label="_结束时间_" width="140"></el-table-column>
        <el-table-column prop="sposition" label="_开始位置_" width="140" ></el-table-column>
        <el-table-column prop="eposition" label="_结束位置_" width="140"></el-table-column>
        <el-table-column prop="FTotalMileage" label="_运行公里(km)_" width="150" sortable></el-table-column>
        <el-table-column prop="FTotalDuration" label="_行驶时长_" width="150" sortable></el-table-column>
        <el-table-column prop="FAverageSpeed" label="_平均速度_" width="150" sortable></el-table-column>
        <el-table-column label="操作" >
          <template scope="scope">
            <el-button  type="text" size="small"><i class='img_track' @click="position(scope.$index,scope.row)"></i></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div id="pagination" class="pagination">
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30]"
          :page-size="psize"
          layout="prev, pager, next, jumper,total,sizes"
          :total="FTotalCount">
        </el-pagination>
      </div>
    </div>
  </section>
</template>
<script>

  require("!style!css!../../css/Common/el_table.css")
  require("!style!css!../../css/Common/el_pager.css")
  require("!style!css!../../css/Common/report_header.css")
  import  baidu from '../../js/GIS/Baidu/BaiduAPI.js'  
  import baiduMap from './baidu_map.vue'
  import VehicalSelectDialog from 'components/Common/vehicalSelectDialog.vue'

export default {
  data() {
    return {
        psize:'10',
        Area:"深圳",
        mapToolShow:false,
        value3: [new Date(), new Date()],
        value4: '',
        FTotalCount:160,
        currentPage: 1,
        pageSize1: 10,
        pageIndex1:1,
        table_height: null,
        tableData3:[
                    {"FShortName": "简1","FVehicleName":"粤B1","FStartTime": "2002-02-01","FEndTime": "2002-02-03","sposition":"开始位置？","eposition":"结束位置？","FTotalMileage": 200,"FTotalDuration": "20","FAverageSpeed": "500","FStartLongitude":116.413677,"FStartLatitude":39.910873,"FEndLongitude":114.06444,"FEndLatitude":22.548488},
                    {"FShortName": "简1","FVehicleName":"粤B1","FStartTime": "2002-02-01","FEndTime": "2002-02-03","sposition":"开始位置？","eposition":"结束位置？","FTotalMileage": 200,"FTotalDuration": "20","FAverageSpeed": "500","FStartLongitude":116.413677,"FStartLatitude":39.910873,"FEndLongitude":114.06444,"FEndLatitude":22.548488}
                  ],
        pickerOptions2: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
              const end = start;
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      }
    },
    props: {
      screenHeight: Number
    },
    components: {
      baiduMap,
      VehicalSelectDialog
    },
    mounted(){
      var _this=this;
      setTimeout(() => {
        this.adjustPage();
      },100);
      this.$refs.map.initMap();
      $("#map-wrapper").height(470);
    },
    methods: {
      //绘制轨迹（定位到地图）
      position: function (index, row) {
        $(".mymodal").css('visibility', 'visible');
        var _this=this;
        $.getJSON('/static/carData.json',function (data) {
          let points=[];
          var carData=data;
         $.each(carData.mObject,function (index,obj) {
           let point=_this.getCarPoint(new BMap.Point(obj.FLongitude,obj.FLatitude));
           points.push(new BMap.Point(point.lon,point.lat))
         });
          console.log(points);
          _this.$refs.map.showCarRoute([],points);
        })
      },
      //关闭轨迹地图
      closeMymodal: function () {
        $(".mymodal").css('visibility', 'hidden')
      },
      getCarPoint(point){
        let gpsPoint = {lon: point.lng, lat: point.lat};
        if (point.lng >= 1 && point.lat>= 1) {
          gpsPoint = this.fixGPSPoint(parseFloat(point.lat),parseFloat(point.lng));
        }
        return gpsPoint;
      },
      //将经纬度转换成地址
      getPosition(Longitude,Latitude){
        var Baidu= new baidu.baiduAPI();
        var point = Baidu.GetPosition(Longitude,Latitude);
        var geoc = Baidu.GetClientGeocoder();
        Baidu.Geoco_GetLocation(geoc, point, function (data) {
          var position = data.addressComponents;
          return (position.province+position.city+position.district+position.street+position.streetNumber)
        })
      },
      getTime:function (value) {
        return this.value4=value;
      },
    //重置表单
      reset:function () {
        $('.search-input').val('')
        this.value3=null
      },
      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
        this.pageSize1=val
        this.psize=val
        this.doQuery()
      },
      handleCurrentChange(val) {
        //console.log(`当前页: ${val}`);
       this.pageIndex1=val
       this.doQuery()
      },
      adjustPage(){
        this.table_height = this.elementsFlex("el_table_wrap", "main-content", "operate_wrapper", "pagination", true) - 35;
      },
      //请求报表
    doQuery(){
      var _this=this;
      var curpageIndex;
      var curpageSize;
      var FVehicleID = $(".search-input").attr("fguid");
      var startTime;
      var endTime;
      var year=new Date().getFullYear();
      var month=new Date().getMonth()+1;
      var date=new Date().getDate();
      var today=year+'-'+month+'-'+date;
      if(this.value4==''){
          startTime=today+' 00:00:00';
          endTime=today+' 23:59:59';
        }else {
          var time=this.value4.split(' - ');
          startTime=time[0]+' 00:00:00';
          endTime=time[1]+' 23:59:59';
        }
        curpageIndex=this.pageIndex1;    //表示this['pageIndex']，取到实际的this.pageIndex1
        curpageSize=this.pageSize1;
        //获取车牌
        if(FVehicleID!=undefined){
            $.ajax({
            "url":"/web/Trailer/Trailer_Report",
            "cache": false,
            "async": true,
            "type": "post",
            "dataType": "json",
            "contentType": "application/json; charset=utf-8",
            'data': '{"FTokenID":"'+_this.$store.state.FTokenID+'","FAction":"QueryReportRunStopListByFVehicleGUID","FVehicleGUID":"' + FVehicleID + '",' +
              '"FStartTime":"' + startTime + '","FEndTime":"' + endTime + '","FPageSize":"' +curpageSize+ '","FPageIndex":"' +curpageIndex+ ' ","FVersion":"1.0.0"}',
            success:function(json){
              var Fobj={"Result":200,"Message":"success","FObject":{"Table":[{"FTotalCount":160}],"Table1":[
                        {"FShortName": "简1","FVehicleName":"粤B1","FStartTime": "2002-02-01","FEndTime": "2002-02-03","sposition":"开始位置r","eposition":"结束位置？","FTotalMileage": 200,"FTotalDuration": "20","FAverageSpeed": "r00"},
                        {"FShortName": "简1","FVehicleName":"粤B1","FStartTime": "2002-02-01","FEndTime": "2002-02-03","sposition":"开始位置r","eposition":"结束位置？","FTotalMileage": 200,"FTotalDuration": "20","FAverageSpeed": "r00"}]}}
                   // var Fobj = json;
                    _this.tableData3=[];      
                    _this.FTotalCount=Fobj.FObject.Table[0].FTotalCount;
                   //_this.FTotalCount=fobj.FObject.Table[0].FTotalCount;
                    $.each(Fobj.FObject.Table1,function (index,obj) {
                    //_this.tableData3.push(obj);
                      _this.tableData3[index]=obj;
                      //经纬度转换位置
                      _this.tableData3[index].sposition=_this.getPosition(obj.FStartLongitude,obj.FStartLatitude);
                      _this.tableData3[index].eposition=_this.getPosition(obj.FEndLongitude,obj.FEndLatitude);
                      //保存经纬度地图使用
                      _this.tableData3[index].FStartLongitude=obj.FStartLongitude;
                      _this.tableData3[index].FStartLatitude=obj.FStartLatitude;
                      _this.tableData3[index].FEndLongitude=obj.FEndLongitude;
                      _this.tableData3[index].FEndLatitude=obj.FEndLatitude;
                  });
            },
              error:function () {
               console.log("请求失败")
             }
           })
        }else{
          _this.$message({
            showClose: true,
            message: '请选择车辆',
            type: 'warning'
          });
        }
      },
      //勾选提示
      onalert() {
          this.$message({
            showClose: true,
            message: '请先选择车辆！'
          });
        },
    // 点击节点
      get:function (data) {
        $('.search-input').val(data[0]);
        $('.search-input').attr('title',data[0])
        $('.search-input').attr('fguid',data[1])
        },
      },
    watch: {
      screenHeight () {
        this.adjustPage();
        //console.log(this.elementsFlex("el_table_wrap", "main-content", "table_wrapper", "pagination",true));
        //this.table_height=this.elementsFlex("el_table_wrap", "main-content", "table_wrapper", "pagination",true);
      }
    },

  }
</script>
<style scoped>
  .img_track{
    display: inline-block;
    width:16px;
    height:16px;
    background-image:url(/static/img/img_track.png);
    background-repeat: no-repeat;
  }
</style>

