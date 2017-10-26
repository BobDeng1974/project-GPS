<template>
  <div>
    <!--弹出框-->
    <div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
         aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h5 class="modal-title" id="myModalLabel">_请选择需要添加的车辆曲线图_</h5>
          </div>
          <div class="modal-body" style="height: 100%">
            <ul>
              <li v-for="value in filterLineChartArr">
                <label>{{value|translate}}</label>
                <input type="checkbox" class="pull-right"  :value="value" v-model="checkName">
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="addLineChart">_确定_
            </button>
            <button type="reset" class="btn btn-default" data-dismiss="modal">_取消_</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal -->
    </div>
    <!--弹出框结束-->
    <div class="modal fade" id="modal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
         aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h5 class="modal-title" id="myModalLabe2">_请选择需要添加的车辆环形比例图_</h5>
          </div>
          <div class="modal-body" style="height: 100%">
            <ul>
              <span v-if="!filterAnnularChartArr.length">_没有可添加的项_</span>
              <li v-for="value in filterAnnularChartArr"><label>{{value|translate2}}</label><input
                type="radio" class="pull-right" v-bind:value="value" v-model="checkName1"></li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="addAnnularChart">
              _确定_
            </button>
            <button type="reset" class="btn btn-default" data-dismiss="modal">_取消_</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal -->
    </div>
    <div class="panel panel-default">
      <div class="header panel-heading "
           style="position: relative;padding-bottom: 0px;background:#f5f5f5!important;">
        <ul class="row" id="sortable">
          <li class="col-md-2 carstatus-container" v-if="carjson.status!='FNoAlarmCount'"
              v-for="(carjson, index ) of filtercarJsons"
              v-dragging="{ item: carjson, list: carJsons, group: 'carjson' }" v-bind:key=carjson.status
              v-on:mouseover="currentIndex=index" v-bind:id="carjson.status" @click="showMap(carjson.status)">
            <div class="park" v-bind:class="carjson.status">
              <!--<a style="float: right;color: white" class="deleteStatus " v-bind:class="{ 'show':currentIndex==index }" v-on:click="deleteElement(carjson.status)">&times;</a>-->
              <div class="img-icon left-icon" ></div>
              <div class="text">
                <p class="number" v-if="carjson.status=='FOffLineCount'">{{ carjson.number+carjson.noposition}}<span>/{{carjson.noposition}}</span></p>
                <p class="number" v-if="carjson.status!='FOffLineCount'">{{ carjson.number}}</p>
                <p class="carstatus">{{ carjson.status|translate}}<span v-if="carjson.status=='FOffLineCount'">/_无定位_</span></p>
              </div>
            </div>

          </li>
          <!--<li class="col-md-2 "  v-on:click="" data-toggle="modal" data-target="#modal"><div class="addstatus park"><p class="addcar">点击增加车辆状态</p></div></li>-->
        </ul>
        <a @click="showAll=!showAll"
           style=" width:100%;height: 24px;margin-left:-10px;display:block; text-align: center;position: absolute;bottom: -24px;z-index: 809; cursor: pointer;background: url('/static/img/home/more.png') no-repeat center">{{
          work }} <span class="glyphicon " v-bind:class="pointer"></span></a>
      </div>
      <div class="chart panel-body">
        <div class="mapContainer col-md-6" id="mapContainer">
        </div>
        <div class="hightchart col-md-6" id="myChart"></div>
      </div>
    </div>
    <div class="circle panel panel-default">
      <div
        style="position: absolute;width: 33%;height: 200px;left:30%;top:25px;border-left: 1px dashed #e6e6e6;border-right: 1px dashed #e6e6e6;"></div>
      <ul>
        <li class="col-md-4" v-for="(value,key,index) in FAnnularPair" v-bind:id="key"></li>
        <i class="glyphicon glyphicon-plus" data-toggle="modal" data-target="#modal2"
           style="font-size: 20px;line-height: 20px;color:#999999;position: absolute;left:98%;top: 20px;cursor: pointer"></i>
      </ul>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading " style="line-height: 20px;background: #ffffff">
        <span class="chart-title" @click="sendLink(linkTo0)">{{value1|translate}}</span>
        <div class="selectBox">
          <label for="">_时间_</label>
          <el-select v-model="value" placeholder="请选择" class="selectoption" @change="getTimeValue">
            <el-option
              v-for="item in  timeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="selectBox ">
          <label for="">_报表类型_</label>
          <el-select v-model="value1" placeholder="请选择" class="selectoption" @change="getReportType">
            <el-option
              v-for="item in  reportType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="panel-body">
        <div class="carRunStopReport" id="carRunStopReport">
        </div>
      </div>
    </div>
    <div class="panel panel-default " v-show="AlarmOverSpeedCount">
      <div class="panel-heading " style="background: #ffffff">
        <span class="chart-title"  @click="sendLink(linkTo1)">{{reportvalue1|translate}}</span>
        <div class="selectBox">
          <label for="">_时间_</label>
          <el-select v-model="timevalue1" placeholder="_请选择_" class="selectoption" @change="getTimeValue1">
            <el-option
              v-for="item in  timeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button class="el-icon-circle-cross" size="mini" style="float: right;margin-right: -34px"
                     @click="deleteLineChart('AlarmOverSpeedCount','FLineChart2')"></el-button>
        </div>
        <div class="selectBox ">
          <label for="">_报表类型_</label>
          <el-select v-model="reportvalue1" placeholder="_请选择_" class="selectoption" @change="getReportType1">
            <el-option
              v-for="item in  reportType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="panel-body">
        <div class="carRunStopReport" id="AlarmOverSpeed">
        </div>
      </div>
    </div>
    <div class="panel panel-default" v-show="CouplingCount">
      <div class="panel-heading " style="background: #ffffff">
        <span class="chart-title"  @click="sendLink(linkTo2)">{{reportvalue2|translate}}</span>
        <div class="selectBox">
          <label for="">_时间_</label>
          <el-select v-model="timevalue2" placeholder="_请选择_" class="selectoption" @change="getTimeValue2">
            <el-option
              v-for="item in  timeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button class="el-icon-circle-cross" size="mini" style="float: right;margin-right: -34px"
                     @click="deleteLineChart('CouplingCount','FLineChart3')"></el-button>
        </div>
        <div class="selectBox ">
          <label for="">_报表类型_</label>
          <el-select v-model="reportvalue2" placeholder="_请选择_" class="selectoption" @change="getReportType2">
            <el-option
              v-for="item in  reportType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="panel-body">
        <div class="carRunStopReport" id="CouplingCount">
        </div>
      </div>
    </div>
    <div class="panel panel-default" v-show="RunStopCount">
      <div class="panel-heading " style="background: #ffffff">
        <span class="chart-title"  @click="sendLink(linkTo3)">{{reportvalue3|translate}}</span>
        <div class="selectBox">
          <label for="">_时间_</label>
          <el-select v-model="timevalue3" placeholder="_请选择_" class="selectoption" @change="getTimeValue3">
            <el-option
              v-for="item in  timeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button class="el-icon-circle-cross" size="mini" style="float: right;margin-right: -34px"
                     @click="deleteLineChart('RunStopCount','FLineChart4')"></el-button>
        </div>
        <div class="selectBox ">
          <label for="">_报表类型_</label>
          <el-select v-model="reportvalue3" placeholder="_请选择_" class="selectoption" @change="getReportType3">
            <el-option
              v-for="item in  reportType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="panel-body">
        <div class="carRunStopReport" id="RunStopCount">
        </div>
      </div>
    </div>
    <div v-show="FLineChart.FLineChart1==''||FLineChart.FLineChart2==''||FLineChart.FLineChart3==''||FLineChart.FLineChart4==''"
         class="panel panel-default addChart" style="height: 60px" data-toggle="modal" data-target="#modal">
      <i  class="glyphicon glyphicon-plus" style="font-size: 20px;line-height: 60px;color:#999999;font-weight: lighter;margin-right: 10px "></i>
      <span style="position: relative;bottom:2px;font-size: 18px;color: #999999">_点击增加折线图_</span>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import HighCharts from 'highcharts/highstock'
  import Highcharts from 'highcharts/highmaps'
  require('highcharts/modules/drilldown')(Highcharts)
  import baidu  from '../../js/GIS/Baidu/BaiduAPI'
  let _this
  export default {
    name: 'hello',
    data() {
      _this=this
      return {
	  	//绘图完成开关
	  	finishMap:false,
        checkName: [],
        checkName1: null,
        showAll: false,
        statusStyle: '',
        currentIndex: '',
        carJsons: '',
        provinceArray: null,
        carArray: '',
        cityArray: '',
        carCityArray: '',
        lineChartArr: [
          "MileageCount",
          "AlarmOverSpeedCount",
          "CouplingCount",
          "RunStopCount"
        ],
        annularChartArr: [
          "FCouplingCount",
          "FOnLineCount",
          "FContainerCount",
          "FRunningCount",
          "FRunningOnDayCount",
        ],
        FStatusBlock: {},
        FAnnularPair: {
          FAnnularPair1: '',
          FAnnularPair2: '',
          FAnnularPair3: '',
        },
        FLineChart: {
          FLineChart1: '',
          FLineChart2: '',
          FLineChart3: '',
          FLineChart4: '',
          FLineChart5: '',
          FLineChart6: ''
        },
        AlarmOverSpeedCount: false,
        CouplingCount: false,
        RunStopCount: false,
        value: '_最近一周_',
        value1: '_里程统计报表_',
        timevalue1: '_最近一周_',
        timevalue2: '_最近一周_',
        timevalue3: '_最近一周_',
        reportvalue1: '_超速报警报表_',
        reportvalue2: '_接甩挂报表_',
        reportvalue3: '_运行效率统计_',
        reportTypeValue: '',
        reportTypeValue1: '',
        reportTypeValue2: '',
        reportTypeValue3: '',
        linkTo0:{
          tabsText:"_行驶统计_",
          router:"xingshi"
        },
        linkTo1:{
          tabsText:"_超速报警_",
          router:"speedAlarm"
        },
        linkTo2:{
          tabsText:"_接甩挂报表_",
          router:"TrailerReport"
        },
        linkTo3:{
          tabsText:"_运行效率分析_",
          router:"xiaolv"
        },
        time: '',
        time1: '',
        time2: '',
        time3: '',
        option: {
          chart: {
            type: 'column',
//            panning: true,
//            panKey: 'shift'
            zoomType: 'x',
            resetZoomButton:{
              position: {
                align: "right",
                verticalAlign: "top",
                x: 0,
                y: -40,
              }
            }
          },
          legend: {
            enabled: false
          },
          scrollbar: {
            enabled:true,
            barBackgroundColor:"#2885eb",
            liveRedraw:true,
            showFull:false
          },
          credits: {
            enabled: false
          },
          title: {
            text: '_全国车辆分布_',
            style: {"fontFamily": '微软雅黑'}
          },
          xAxis: {
//						categories: '',
            type: 'category',
            crosshair: true,
          },
          yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
              text: '_单位_（_台_）',
              rotation: 0,
              align: 'high',
              y: -20,
              x: 50,
              margin:-50,
            }
          },
          tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table style="width: 100px; overflow: hidden">',
            pointFormat: '<tr><td style="color:{series.color};padding:0"> </td>' +
            '<td style="padding:0"><b>{point.y:.0f} _台_</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
          },
          plotOptions: {
            column: {
              pointPadding: 0.2,
              borderWidth: 0,
            }
          },
          series: ''
        },

        //饼状图公共参数
        pieData:{
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            marginLeft: 0,
            spacing: [25, 0, 5, 100]
          },
          legend: {
            align: 'left',
            verticalAlign: 'middle',
            layout: 'vertical',
            symbolHeight: 20,
            symbolWidth: 20,
            itemMarginBottom: 20,
            itemStyle: {
              color: '#999999',
            },
            y: 85,
            x:-100
          },
          credits: {
            enabled: false
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              innerSize: 140,
              dataLabels: {
                enabled: false
              },
              showInLegend: true,
              size: 200,
              dataLabels: {
                enabled: true,
                allowOverlap:false,
                distance:-50,
                overflow:"none",
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                  color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                }
              },
              point: {
                events: {
                  mouseOver: function (e) {  // 鼠标滑过时动态更新标题
                    // 标题更新函数，API 地址：https:/.hcharts.cn/highcharts#Chart.setTitle

                  }
                  //,
                  // click: function(e) { // 同样的可以在点击事件里处理
                  //     chart.setTitle({
                  //         text: e.point.name+ '\t'+ e.point.y + ' %'
                  //     });
                  // }
                }
              },
            }
          },
          series: '',
          title: {
            floating: true,
            verticalAlign: 'top',
            y: 0,
            x: -100,
            text: '',
            align: 'left',
            style: {"fontWeight": "bold", "fontFamily": '微软雅黑',"fontSize":"16px"}
          },
        },
        FCouplingCount1:{},
        FOnLineCount1:{},
        FRunningCount1:{},
        FContainerCount1: {},
        FRunningOnDayCount1:{},
        run: {
          chart: {
            marginLeft: 40,
            marginTop: 40,
            type: 'area'
          },
          title: {
            text: '',
            x: -20
          },
          credits: {
            enabled: false,
          },
          xAxis: {
            categories: ''
          },
          yAxis: {
            allowDecimals: false,
            title: {
              text: '',
              rotation: 0,
              align: 'high',
              y: -20,
              x: 70
            },
            labels:{
              x:0,
              style:{
                whiteSpace: 'nowrap',
              }
            },
            tickPixelInterval: 50,
            plotLines: [{
              value: 0,
              width: 1,
              color: '#808080'
            }]
          },
          plotOptions: {
            series: {
              lineWidth: 3,
              fillOpacity: 0.1,
            },
//            area:{
//              color:"#e8f1fa",
//              lineColor:"rgb(124, 181, 236)"
//            }
          },
          tooltip: {
            valueSuffix: '',
            formatter:null
          },
          legend: {
            enabled: false
          },
          series: ''
        },
        timeOption: [{
          value: '1',
          label: '_最近一周_'
        }, {
          value: '2',
          label: '_最近15天_'
        }, {
          value: '3',
          label: '_最近30天_'
        }],
        reportType: [{
          value: 'MileageCount',
          label: '_里程统计报表_'
        }, {
          value: 'RunStopCount',
          label: '_运行效率统计_'
        },
          {
            value: 'AlarmOverSpeedCount',
            label: '_超速报警报表_'
          }, {
            value: 'CouplingCount',
            label: '_接甩挂报表_'
          }],
      }
    },
    filters: {
      translate: function (value) {
        if (value == "FHaveDataCount") {
          return "_全部车辆_"
        } else if (value == "FOnLineCount") {
          return "_在线车辆_"
        } else if (value == "FOffLineCount") {
          return "_离线_"
        }
        else if (value == "FUnCouplingCount") {
          return "_甩挂车辆_"
        } else if (value == "FCouplingCount") {
          return "_接挂车辆_"
        }
        else if (value == "FContainerCount") {
          return "_有厢车辆_"
        }
        else if (value == "FUnContainCount") {
          return "_无厢车辆_"
        } else if (value == "FRunningOnDayCount") {
          return "_今日运行_"
        } else if (value == "FStopOnDayCount") {
          return "_今日未运行_"
        }
        else if (value == "FRunningCount") {
          return "_行驶车辆_"
        } else if (value == "FStopCount") {
          return "_停止车辆_"
        }
        else if (value == "FAlarmCount") {
          return "_报警车辆_"
        }
        else if (value == "FNoAlarmCount") {
          return "_无报警车辆_"
        } else if (value == "MileageCount") {
          return "_里程统计报表_"
        } else if (value == "AlarmOverSpeedCount") {
          return "_超速报警报表_"
        } else if (value == "CouplingCount") {
          return "_接甩挂报表_"
        } else if (value == "RunStopCount") {
          return "_运行效率统计_"
        } else {
          return value
        }
      },
      translate2: function (value) {
        if (value == "FCouplingCount") {
          return "_接甩挂比例_"
        } else if (value == "FOnLineCount") {
          return "_在线离线比例_"
        } else if (value == "FContainerCount") {
          return "_有厢无厢比例_"
        } else if (value == "FRunningCount") {
          return "_运行静止比例_"
        }else if(value == "FRunningOnDayCount"){
          return "_今日是否运行比例_"
        }
      }
    },
    created:function () {
      console.log("被创建了")
    },
      mounted () {
      HighCharts.setOptions({
        lang: {
          resetZoom: '_重置_'
        }
      });
      Highcharts.setOptions({
        lang: {
          drillUpText: '< _返回_ “{series.name}”',
        }
      });
      this.getHomeLastStyle();
//     获取车辆统计数据
      //this.getAllData();
      this.doQuery("carRunStopReport", "time", "reportTypeValue", "MileageCount");
      _this.showMap("FHaveDataCount")
      _this.dragging()
    },
    beforeDestroy: function () {
      console.log("被销毁");
    },
    watch: {
//      $route:function () {
//        if(this.$route.name=="home"){
//          this.getHomeLastStyle();
//          var _this = this;
////     获取车辆统计数据
//          //this.getAllData();
//          this.doQuery("carRunStopReport", "time", "reportTypeValue", "MileageCount");
//          _this.showMap("FHaveDataCount")
//          _this.dragging()
//        }
//      },
      value1: function () {
        console.log("改变了")
      },
      AlarmOverSpeedCount: function () {
        this.doQuery("AlarmOverSpeed", "time1", "reportTypeValue1", "AlarmOverSpeedCount")
      },
      CouplingCount: function () {
        this.doQuery("CouplingCount", "time2", "reportTypeValue2", "CouplingCount")
      },
      RunStopCount: function () {
        this.doQuery("RunStopCount", "time3", "reportTypeValue3", "RunStopCount")
      },
    },
    computed: {
      filtercarJsons: function () {
        if (this.showAll == false) {
          return this.carJsons.slice(0, 6)
        } else {
          return this.carJsons
        }
      },
      filterLineChartArr: function () {
        for (let i = _this.lineChartArr.length; i >=0 ; i--) {
          $.each(_this.FLineChart, function (key, value) {
            if (_this.lineChartArr[i] == value) {
              _this.lineChartArr.splice(i, 1);
            }
          });
        }
        return this.lineChartArr
      },
      filterAnnularChartArr: function () {
        for (let i = _this.annularChartArr.length; i >=0; i--) {
          $.each(_this.FAnnularPair, function (key, value) {
            if (_this.annularChartArr[i] == value) {
              _this.annularChartArr.splice(i, 1)
            }
          });
        }
        return this.annularChartArr
      },
      work: function () {
        if (this.showAll == false) {
          return "_点击显示更多车辆状态_"
        } else {
          return "_点击收起_"
        }
      },
      pointer: function () {
        if (this.showAll == false) {
          return 'glyphicon-chevron-down'
        } else {
          return 'glyphicon-chevron-up'
        }
      },
    },
    methods: {
      translateStatus: function (value) {
        if (value == "FHaveDataCount") {
          return "_全部车辆_"
        } else if (value == "FOnLineCount") {
          return "_在线车辆_"
        } else if (value == "FOffLineCount") {
          return "_离线_"
        }
        else if (value == "FUnCouplingCount") {
          return "_甩挂车辆_"
        } else if (value == "FCouplingCount") {
          return "_接挂车辆_"
        }
        else if (value == "FContainerCount") {
          return "_有厢车辆_"
        }
        else if (value == "FUnContainCount") {
          return "_无厢车辆_"
        } else if (value == "FRunningOnDayCount") {
          return "_今日运行_"
        } else if (value == "FStopOnDayCount") {
          return "_今日未运行_"
        }
        else if (value == "FRunningCount") {
          return "_行驶车辆_"
        } else if (value == "FStopCount") {
          return "_停止车辆_"
        }
        else if (value == "FAlarmCount") {
          return "_报警车辆_"
        }
        else if (value == "FNoAlarmCount") {
          return "_无报警车辆_"
        } else if (value == "MileageCount") {
          return "_里程统计报表_"
        } else if (value == "AlarmOverSpeedCount") {
          return "_超速报警报表_"
        } else if (value == "CouplingCount") {
          return "_接甩挂报表_"
        } else if (value == "RunStopCount") {
          return "_运行效率统计_"
        } else {
          return value
        }
      },
      getReportType: function (value) {
        this.reportTypeValue = value;
        if(value=='AlarmOverSpeedCount'){
          this.linkTo0.tabsText='超速报警';
          this.linkTo0.router='speedAlarm';
        }else if(value=='MileageCount'){
          this.linkTo0.tabsText='行驶统计';
          this.linkTo0.router='xingshi';
        }else if(value=='RunStopCount'){
          this.linkTo0.tabsText='运行效率分析';
          this.linkTo0.router='xiaolv';
        }else if(value=="CouplingCount"){
          this.linkTo0.tabsText='接甩挂分析';
          this.linkTo0.router='TrailerReport';
        }
        this.doQuery("carRunStopReport", "time", "reportTypeValue", "MileageCount")
      },
      getReportType1: function (value) {
        this.reportTypeValue1 = value;
        if(value=='AlarmOverSpeedCount'){
          this.linkTo0.tabsText='超速报警';
          this.linkTo0.router='speedAlarm';
        }else if(value=='MileageCount'){
          this.linkTo0.tabsText='行驶统计';
          this.linkTo0.router='xingshi';
        }else if(value=='RunStopCount'){
          this.linkTo0.tabsText='运行效率分析';
          this.linkTo0.router='xiaolv';
        }else if(value=="CouplingCount"){
          this.linkTo0.tabsText='接甩挂分析';
          this.linkTo0.router='TrailerReport';
        }
        this.doQuery("AlarmOverSpeed", "time1", "reportTypeValue1", "AlarmOverSpeedCount")
      },
      getReportType2: function (value) {
        this.reportTypeValue2 = value;
        if(value=='AlarmOverSpeedCount'){
          this.linkTo0.tabsText='超速报警';
          this.linkTo0.router='speedAlarm';
        }else if(value=='MileageCount'){
          this.linkTo0.tabsText='行驶统计';
          this.linkTo0.router='xingshi';
        }else if(value=='RunStopCount'){
          this.linkTo0.tabsText='运行效率分析';
          this.linkTo0.router='xiaolv';
        }else if(value=="CouplingCount"){
          this.linkTo0.tabsText='接甩挂分析';
          this.linkTo0.router='TrailerReport';
        }
        this.doQuery("CouplingCount", "time2", "reportTypeValue2", "CouplingCount")
      },
      getReportType3: function (value) {
        this.reportTypeValue3 = value;
        if(value=='AlarmOverSpeedCount'){
          this.linkTo0.tabsText='超速报警';
          this.linkTo0.router='speedAlarm';
        }else if(value=='MileageCount'){
          this.linkTo0.tabsText='行驶统计';
          this.linkTo0.router='xingshi';
        }else if(value=='RunStopCount'){
          this.linkTo0.tabsText='运行效率分析';
          this.linkTo0.router='xiaolv';
        }else if(value=="CouplingCount"){
          this.linkTo0.tabsText='接甩挂分析';
          this.linkTo0.router='TrailerReport';
        }
        this.doQuery("RunStopCount", "time3", "reportTypeValue3", "RunStopCount")
      },
      getTimeValue: function (value) {
        this.time = value;
        this.doQuery("carRunStopReport", "time", "reportTypeValue", "MileageCount")
      },
      getTimeValue1: function (value) {
        this.time1 = value;
        this.doQuery("AlarmOverSpeed", "time1", "reportTypeValue1", "AlarmOverSpeedCount")
      },
      getTimeValue2: function (value) {
        this.time2 = value;
        this.doQuery("CouplingCount", "time2", "reportTypeValue2", "CouplingCount")
      },
      getTimeValue3: function (value) {
        this.time3 = value;
        this.doQuery("RunStopCount", "time3", "reportTypeValue3", "RunStopCount")
      },
      //修改首页样式
      updateHomeStyle: function () {
        var datajson = JSON.stringify({
          FTokenID: _this.$store.state.FTokenID,
          FAction: 'UpdateHomePageLastStyle',
          FT_SmartTrailerHomePageLastStyle: this.FStatusBlock,
          FVersion: "1.0.0"
        });
        $.ajax({
          "url": "/web/Trailer/Trailer_HomePage",
          "cache": false,
          "async": true,
          "type": "post",
          "dataType": "json",
          "contentType": "application/json; charset=utf-8",
          "data": datajson,
          success: function (json) {
            console.log(json);
          },
          error: function () {

          }
        });
      },
      //获取首页最后样式
      getHomeLastStyle: function () {
        $.ajax({
          "url": "/web/Trailer/Trailer_HomePage",
          "cache": false,
          "async": true,
          "type": "post",
          "dataType": "json",
          "contentType": "application/json; charset=utf-8",
          "data": '{"FTokenID":"' + _this.$store.state.FTokenID + '","FAction":"QueryHomePageLastStyle","FVersion":"1.0.0"}',
          success: function (json) {
            var obj = json;
            _this.FStatusBlock = obj.FObject[0];
            console.log(_this.FStatusBlock);
            for (let i = 1; i < 4; i++) {
              let k = "FAnnularPair" + i;
              _this.FAnnularPair[k] = obj.FObject[0][k];
            }
            for (let i = 1; i < 7; i++) {
              let k = "FLineChart" + i;
              _this.FLineChart[k] = obj.FObject[0][k];
            }
            $.each(_this.FAnnularPair, function (key, value) {
              _this[value] = true;
            });
            $.each(_this.FLineChart, function (key, value) {
              _this[value] = true;
            });

            _this.getAllData()
          },
          error: function () {
            console.log("请求失败")
          }

        });

      },
      //获取首页统计数据
      getAllData: function () {
        $.ajax({
          "url": "/web/Trailer/Trailer_HomePage",
          "cache": false,
          "async": true,
          "type": "post",
          "dataType": "json",
          "contentType": "application/json; charset=utf-8",
          "data": '{"FTokenID":"' + _this.$store.state.FTokenID + '","FAction":"QueryHomePageCount","FVersion":"1.0.0"}',
          success: function (json) {
            _this.carJsons = [];
            var obj = json;
//            obj.FObject[0].FOffLineCount=obj.FObject[0].FOffLineCount+obj.FObject[0].FHaveDataCount-obj.FObject[0].FOnLineCount;
            let b=obj.FObject[0].FHaveDataCount-obj.FObject[0].FOnLineCount-obj.FObject[0].FOffLineCount;
//            obj.FObject[0].FOffLineCount=obj.FObject[0].FHaveDataCount-obj.FObject[0].FOnLineCount;
            for (let i = 1; i < 13; i++) {
              let k = "FStatusBlock" + i;
              _this.carJsons[i - 1] = {};
              _this.carJsons[i - 1].status = _this.FStatusBlock[k];
              _this.carJsons[i - 1].number = obj.FObject[0][_this.FStatusBlock[k]];
              _this.carJsons[i - 1].noposition=b;
            }
            //接甩挂比例
            var sum = obj.FObject[0].FCouplingCount + obj.FObject[0].FUnCouplingCount;
            _this.FCouplingCount1=_this.deepCopy(_this.pieData);
            _this.FCouplingCount1.title.text="_接甩挂比例_";
            _this.FCouplingCount1.series = [{
              type: 'pie',
              name: '_比例_',
              data: [
                {name: '_接挂_',y: obj.FObject[0].FCouplingCount / sum * 100, color: '#347fd1'},
                {name: '_甩挂_',y: obj.FObject[0].FUnCouplingCount / sum * 100, color: '#d15b05'}
              ]
            }];

            //在线离线比例
            var sum1 = obj.FObject[0].FOnLineCount + obj.FObject[0].FOffLineCount;
            _this.FOnLineCount1=_this.deepCopy(_this.pieData);
            _this.FOnLineCount1.title.text="_在线离线比例_";
            _this.FOnLineCount1.series = [{
              type: 'pie',
              name: '_比例_',
              data: [
                {name: '_在线_', y: obj.FObject[0].FOnLineCount / sum1 * 100, color: '#5b9fd4'},
                {name: '_离线_', y: obj.FObject[0].FOffLineCount / sum1 * 100, color: '#b4b3b3'}
              ]
            }];
            //运行静止比例
            var sum2 = obj.FObject[0].FRunningCount + obj.FObject[0].FStopCount;
            _this.FRunningCount1=_this.deepCopy(_this.pieData);
            _this.FRunningCount1.title.text="_运行静止比例_";
            _this.FRunningCount1.series = [{
              type: 'pie',
              name: '_比例_',
              data: [
                {name: '_运行_', y: obj.FObject[0].FRunningCount / sum2 * 100, color: '#42a742'},
                {name: '_静止_', y: obj.FObject[0].FStopCount / sum2 * 100, color: '#e69a29'}
              ]
            }];

            //装箱卸箱比例
            var sum3 = obj.FObject[0].FContainerCount + obj.FObject[0].FUnContainCount;
            _this.FContainerCount1=_this.deepCopy(_this.pieData);
            _this.FContainerCount1.title.text="_有厢无厢比例_";
            _this.FContainerCount1.series = [{
              type: 'pie',
              name: '_比例_',
              data: [
                {name: '_有厢_', y: obj.FObject[0].FContainerCount / sum3 * 100,color:"#1ec29a"},
                {name: '_无厢_', y: obj.FObject[0].FUnContainCount / sum3 * 100,color:"#6371c7"}
              ]
            }];
            //今日是否运行比例
            var sum4 = obj.FObject[0].FRunningOnDayCount + obj.FObject[0].FStopOnDayCount;
            _this.FRunningOnDayCount1=_this.deepCopy(_this.pieData);
            _this.FRunningOnDayCount1.title.text="_今日是否运行比例_";
            _this.FRunningOnDayCount1.series = [{
              type: 'pie',
              name: '_比例_',
              data: [
                {name: '_今日运行_', y: obj.FObject[0].FRunningOnDayCount / sum4 * 100,color:"#47b45b"},
                {name: '_今日未运行_', y: obj.FObject[0].FStopOnDayCount / sum4 * 100,color:"#999999"}
              ]
            }];
            _this.showAnnularChart();
          },
          error: function () {
            console.log("请求失败")
          },
        });
      },
      //绘制环形图
      showAnnularChart: function () {
        $.each(_this.FAnnularPair, function (key, value) {
          HighCharts.chart(key, _this[value + 1]);
        })
      },
      //拖动
      dragging: function () {
        //方块拖动
        this.$dragging.$on('dragged', (data) => {
//            console.log(data.value.list)
          var arr = data.value.list;
          for (let i = 0; i < arr.length; i++) {
            let k = "FStatusBlock" + (i + 1);
            this.FStatusBlock[k] = arr[i].status
          }
          this.updateHomeStyle();
//              console.log(_this.FStatusBlock);
        })
      },
      //添加环形图
      addAnnularChart: function () {
        if (this.checkName1 != null) {
          _this.annularChartArr.push(_this.FAnnularPair.FAnnularPair1);
          _this.FStatusBlock.FAnnularPair1 = _this.FStatusBlock.FAnnularPair2;
          _this.FStatusBlock.FAnnularPair2 = _this.FStatusBlock.FAnnularPair3;
          _this.FStatusBlock.FAnnularPair3 = this.checkName1;
          _this.FAnnularPair.FAnnularPair1 = _this.FAnnularPair.FAnnularPair2;
          _this.FAnnularPair.FAnnularPair2 = _this.FAnnularPair.FAnnularPair3;
          _this.FAnnularPair.FAnnularPair3 = this.checkName1;
          this.showAnnularChart();
          _this.updateHomeStyle();
          this.checkName1 = null;
        } else {
          this.$message({
            showClose: true,
            message: '_你没有选中_',
            type: 'warning'
          });
        }
      },
      //添加折线图
      addLineChart: function () {
        if (this.checkName.length != 0) {
          for (let i = 0; i < this.checkName.length; i++) {
            switch (this.checkName[i]) {
              case "AlarmOverSpeedCount":
                this.FStatusBlock.FLineChart2 = "AlarmOverSpeedCount";
                this.FLineChart.FLineChart2 = "AlarmOverSpeedCount"
                this.AlarmOverSpeedCount = true;
                break;
              case "CouplingCount":
                this.FStatusBlock.FLineChart3 = "CouplingCount";
                this.FLineChart.FLineChart3 = "CouplingCount"
                this.CouplingCount = true;
                break;
              case "RunStopCount":
                this.FStatusBlock.FLineChart4 = "RunStopCount";
                this.FLineChart.FLineChart4 = "RunStopCount"
                this.RunStopCount = true;
                break
            }
          }
          this.updateHomeStyle();
        } else {
          this.$message({
            showClose: true,
            message: '_你没有选中_',
            type: 'warning'
          });
        }
        console.log(this.FLineChart)
      },
      deleteLineChart: function (type, index) {
        this[type] = false;
        this.FStatusBlock[index] = "";
        this.lineChartArr.push(this.FLineChart[index]);
        this.FLineChart[index] = "";
        this.updateHomeStyle();
        console.log(this.FLineChart)

      },
      showMap: function (status) {
        $.ajax({
          "url": "/web/Trailer/Trailer_HomePage",
          "cache": false,
          "async": true,
          "type": "post",
          "dataType": "json",
          "contentType": "application/json; charset=utf-8",
          "data": '{"FTokenID":"' + _this.$store.state.FTokenID + '","FAction":"QueryVehiclePositionList","FDataType":"' + status + '","FVersion":"1.0.0"}',
          success: function (json) {
            var Fobj = json;
            var Baidu = new baidu.baiduAPI();
            _this.option.title.text="_全国车辆分布_"+"("+_this.translateStatus(status)+")";
            _this.provinceArray = [];
            _this.carArray = [];
            _this.cityArray = [];
            _this.carCityArray = [];
            var province=[];
            var count = 0;
            var a=0;
            if (Fobj.FObject.length == 0) {
              //setTimeout(function () {
                _this.option.xAxis.categories = _this.provinceArray;
                _this.option.series = [{}];
                _this.option.series[0].data = _this.carArray;
//                  _this.option.xAxis.max=9;
//                  _this.option.scrollbar=true;
//                  if(_this.provinceArray.length<10){
//                    _this.option.xAxis.max=_this.provinceArray.length-1;
//                    _this.option.scrollbar=false;
//                  }else {
//                  }

                HighCharts.chart('myChart', _this.option);

				_this.drawMap();

				return
            }
            //转换经纬度
            $.each(Fobj.FObject, function (index, obj) {
              var point = Baidu.GetPosition(obj.FLongitude, obj.FLatitude);
              var geoc = Baidu.GetClientGeocoder();
              Baidu.Geoco_GetLocation(geoc, point, function (json) {
                //统计各省车辆
                var addre_city = json.addressComponents.city.replace(/地区/g, '市');
                var addre_province = json.addressComponents.province;
//                  if(addre_province==''){
//                    addre_province='盲区'
//                  }
                if (_this.provinceArray.indexOf(addre_province) == -1) {
                  if (addre_province==''){
                    a++;
                  }else {
                    _this.provinceArray.push(addre_province);
                    _this.carArray.push(1);
                  }
                } else {
                  var index = _this.provinceArray.indexOf(addre_province);
                  _this.carArray[index]++;
                }
                if (_this.cityArray.indexOf(addre_city) == -1) {
                  _this.cityArray.push(addre_city);
                  _this.carCityArray.push(1);
                } else {
                  var index = _this.cityArray.indexOf(addre_city);
                  _this.carCityArray[index]++
                }
                count++;
                getObj()
              });
              function getObj() {
                if (count == Fobj.FObject.length) {
                  for (var i=0;i<_this.provinceArray.length;i++){
                    province.push({y:_this.carArray[i],name:_this.provinceArray[i]})
                  }
                  province.sort(function (a,b) {
                    return b.y-a.y
                  });
                  if(a!=0){
                    province.push({y:a,name:"盲区"})
                  }
                 // setTimeout(function () {
//                      _this.option.xAxis.categories = _this.provinceArray;
                    _this.option.series = [{}];
                    _this.option.series[0].data =province;

					if($("#myChart")){
						console.log("开始绘图")
                    HighCharts.chart('myChart', _this.option);

						_this.drawMap();

					}

                }
              }

            });

          },
          error: function () {
            console.log("请求失败")
          }

        });
      },
      getDate:function (datestr) {
        var temp = datestr.split("-");
        var date = new Date(temp[0],temp[1],temp[2]);
        return date;
      },
	  //绘制地图
	  drawMap(){
                    var map = null,
                      geochina = 'https://data.jianshukeji.com/jsonp?filename=geochina/',
                      //不能加载的省份或地区，包括台湾、香港、澳门、南海，各直辖市
                      unDrilldown = ['taiwan', 'xianggang', 'aomen', 'nanhai', 'beijing', 'tianjin', 'shanghai', 'chongqing'];

                    $.getJSON('/static/china.json', function (mapdata) {
			  var data = [];
			  // 随机数据
                      Highcharts.each(mapdata.features, function (md, index) {
                        data.push({
                          fullname: md.properties.fullname,
                          name: md.properties.name,
                          drilldown: md.properties.filename, // 赋值 drilldown
                          value: 0 // 生成 1 ~ 100 随机值
                        });
                      });
			  for (let i = 0; i < data.length; i++) {
				  for (let j = 0; j < _this.provinceArray.length; j++) {
                          if (data[i].fullname == _this.provinceArray[j]) {
                            data[i].value = _this.carArray[j]
                          }
                        }
                      }
                      map = new Highcharts.Map('mapContainer', {
                        chart: {
                          events: {
                            drilldown: function (e) {
                              // 异步加载
                              if (e.point.drilldown && unDrilldown.indexOf(e.point.drilldown) === -1) {
                                var pointName = e.point.properties.fullname;
                                map.showLoading('_加载中_，_请稍后_...');
                                // 获取二级行政地区数据并更新图表
                                $.getJSON(geochina + e.point.drilldown + '.json&callback=?', function (data) {
                                  data = Highcharts.geojson(data);
                                  Highcharts.each(data, function (d) {
                                    d.value = 0
                                  });
									  for (let i = 0; i < data.length; i++) {
										  for (let j = 0; j < _this.cityArray.length; j++) {
                                      if (data[i].properties.fullname == _this.cityArray[j]) {
                                        data[i].value = _this.carCityArray[j]
                                      }
                                    }
                                  }
                                  map.hideLoading();
                                  map.addSeriesAsDrilldown(e.point, {
                                    name: e.point.name,
                                    data: data,
                                    dataLabels: {
                                      enabled: true,
                                      format: '{point.name}'
                                    },
                                  });
                                  map.setTitle({
                                    text: pointName
                                  });
                                });
                              }
                            },
                            drillup: function () {
                              map.setTitle({
                                text: '_中国地图_'
                              });
                            }
                          }
                        },
                        title: {
                          text: '_中国地图_',
                          style: {"fontFamily": '微软雅黑'}
                        },
                        credits: {
                          enabled: false
                        },
                        mapNavigation: {
                          enabled: true,
                          buttonOptions: {
                            verticalAlign: 'bottom'
                          }
                        },
                        tooltip: {
                          useHTML: true,
                          headerFormat: '<table><tr><td>{point.name}</td></tr>',
                          pointFormat: '<tr><td>_父级_：</td><td>{point.properties.parent}</td></tr>'+
                          '<tr><td width="35">_区域_:</td><td>{point.properties.fullname}</td></tr>' +
                          '<tr><td>_车辆_：</td><td>{point.value}台</td></tr>',
                          footerFormat: '</table>'
                        },
                        colorAxis: {
                          min: 0,
                          minColor: '#ffffff',
                          maxColor: '#1c78d2',
                          labels: {
                            style: {
                              "color": "red", "fontWeight": "bold"
                            },
                            formatter: function () {
                              return this.value.toFixed(0)
                            }
                          }
                        },
                        series: [{
                          data: data,
                          mapData: mapdata,
                          joinBy: 'name',
                          name: '_中国地图_',
                          states: {
                            hover: {
                              color: '#a4edba'
                            }
                          },
                          dataLabels: {
                            enabled: true,
                            format: '{point.name}'
                          }
                        }],
                      });
                    });
		  _this.finishMap=true;
          },
      //车辆运行状况图表
      doQuery: function (c, t, r, init) {
        //获取时间和报表类型
        var _this = this;
        var reportType;
        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth() + 1;
        var day = today.getDate();
        if (month < 10) {
          month = "0" + month;
        }
        if (day < 10) {
          day = "0" + day;
        }
        var endTime = year + "-" + month + "-" + day + ' 23:59:59';
        switch (this[t]) {
          case "1":
          case "" :
            var startday = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);
            var startyear = startday.getFullYear();
            var startmonth = startday.getMonth() + 1;
            var startday = startday.getDate();
            if (startmonth < 10) {
              startmonth = "0" + startmonth;
            }
            if (startday < 10) {
              startday = "0" + startday;
            }
            var startTime = startyear + "-" + startmonth + "-" + startday + ' 00:00:00';
            break;
          case "2":
            var startday = new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000);
            var startyear = startday.getFullYear();
            var startmonth = startday.getMonth() + 1;
            var startday = startday.getDate();
            if (startmonth < 10) {
              startmonth = "0" + startmonth;
            }
            if (startday < 10) {
              startday = "0" + startday;
            }
            var startTime = startyear + "-" + startmonth + "-" + startday + ' 00:00:00';
            break;
          case "3":
            var startday = new Date(today.getTime() - 29 * 24 * 60 * 60 * 1000);
            var startyear = startday.getFullYear();
            var startmonth = startday.getMonth() + 1;
            var startday = startday.getDate();
            if (startmonth < 10) {
              startmonth = "0" + startmonth;
            }
            if (startday < 10) {
              startday = "0" + startday;
            }
            var startTime = startyear + "-" + startmonth + "-" + startday + ' 00:00:00';
            break;
        }
        if (this[r] == '') {
          reportType = init
        } else {
          reportType = this[r];
        }
//				let UTCStartTime=this.parseUTC(startTime),
//				    UTCEndTime=this.parseUTC(endTime);
        $.ajax({
          'url': ' /web/Trailer/Trailer_HomePage',
          'cache': false,
          'async': true,
          'type': 'Post',
          'dataType': 'json',
          'contentType': 'application/json;charset=utf-8',
          'data': '{"FTokenID":"' + _this.$store.state.FTokenID + '","FAction":"QueryHomePageLineChartData","FDataType":"' + reportType + '","FStartTime":"' + startTime + '","FEndTime":"' + endTime + '","FVersion":"1.0.0"}',
          success: function (data) {
            var Fobj = data;
            _this.run.xAxis.categories = [];
            //获取开始时间跟结束之间的每一天
            var startTime1 = _this.getDate(startTime.slice(0,11));
            var endTime1 = _this.getDate(endTime.slice(0,11));
            while((endTime1.getTime()-startTime1.getTime())>=0){
              var year = startTime1.getFullYear();
              var month = startTime1.getMonth().toString().length==1?"0"+startTime1.getMonth().toString():startTime1.getMonth();
              var day = startTime1.getDate().toString().length==1?"0"+startTime1.getDate():startTime1.getDate();
              var dateStr=year+"-"+month+"-"+day;
              _this.run.xAxis.categories.push(dateStr);
              startTime1.setDate(startTime1.getDate()+1);
            }
            _this.run.series = [{}];
            _this.run.series[0].data = [];
            if (reportType == 'MileageCount') {
              _this.run.series[0].name = '_运行里程_';
              _this.run.yAxis.title.text = '_公里_(km)';
              _this.run.tooltip.formatter=function () {
                return '<b>' +this.x+ '</b><br/>' + this.series.name + ': ' + Highcharts.numberFormat(this.y, 0, '.', "") +'_公里_' +'<br/>';
              };
              $.each(Fobj.FObject, function (index, obj) {
                obj.FDate = obj.FDate.split("T")[0];
                var i=_this.run.xAxis.categories.indexOf(obj.FDate);
                if(i!=-1){
                  _this.run.series[0].data[i]=obj.FTotalMileage
                }
              });
              for (let i=0;i<_this.run.xAxis.categories.length;i++){
                if(_this.run.series[0].data[i]==undefined){
                  _this.run.series[0].data[i]=0;
                }
              }
            } else if (reportType == 'AlarmOverSpeedCount') {
              _this.run.series[0].name = '_超速报警次数_';
              _this.run.yAxis.title.text = '_次数_(_次_)';
              _this.run.tooltip.formatter=function () {
                return '<b>' +this.x+ '</b><br/>' + this.series.name + ': ' + Highcharts.numberFormat(this.y, 0, '.', "") +'_次_' +'<br/>';
              };
              $.each(Fobj.FObject, function (index, obj) {
                var i=_this.run.xAxis.categories.indexOf(obj.FDate);
                if(i!=-1){
                  _this.run.series[0].data[i]=obj.OverSpeedCount
                }
              });
              for (let i=0;i<_this.run.xAxis.categories.length;i++){
                if(_this.run.series[0].data[i]==undefined){
                  _this.run.series[0].data[i]=0;
                }
              }
            } else if (reportType == 'CouplingCount') {
              _this.run.series[0].name = '_接甩挂次数_';
              _this.run.yAxis.title.text = '_次数_(_次_)';
              _this.run.tooltip.formatter=function () {
                return '<b>' +this.x+ '</b><br/>' + this.series.name + ': ' + Highcharts.numberFormat(this.y, 0, '.', "") +'_次_' +'<br/>';
              };
              $.each(Fobj.FObject, function (index, obj) {
                var i=_this.run.xAxis.categories.indexOf(obj.FDate);
                if(i!=-1){
                  _this.run.series[0].data[i]=obj.FUnCouplingCount
                }
              });
              for (let i=0;i<_this.run.xAxis.categories.length;i++){
                if(_this.run.series[0].data[i]==undefined){
                  _this.run.series[0].data[i]=0;
                }
              }
            } else if (reportType == 'RunStopCount') {
              _this.run.series[0].name = '_运行效率_';
              _this.run.yAxis.title.text = '_车辆_(_台_)';
              _this.run.tooltip.formatter=function () {
                return '<b>' +this.x+ '</b><br/>' + this.series.name + ': ' + Highcharts.numberFormat(this.y, 0, '.', "") +'_台_' +'<br/>';
              };
              $.each(Fobj.FObject, function (index, obj) {
                obj.FDate = obj.FDate.split("T")[0];
                var i=_this.run.xAxis.categories.indexOf(obj.FDate);
                if(i!=-1){
                  _this.run.series[0].data[i]=obj.FRunningOnDayCount
                }
              });
              for (let i=0;i<_this.run.xAxis.categories.length;i++){
                if(_this.run.series[0].data[i]==undefined){
                  _this.run.series[0].data[i]=0;
                }
              }
            }
            HighCharts.chart(c, _this.run);
          },

          error: function () {
            console.log("请求失败")
          }

        })
      },
      sendLink:function (value) {
        this.$emit('changeRoute', value);
        this.$router.push({ path:value.router})
      }
    },
    activated(){
		if(!_this.finishMap){
			_this.showMap("FHaveDataCount");
    }
    },

  }

</script>

