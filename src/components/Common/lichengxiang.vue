<!-- overtime_record.vue -->
<template>
    <!-- Main content -->
  <section>
    <div class="el_table_wrap" id="el_table_wrap" v-bind:height="totle_height">
      <el-table :data="tableData3"  stripe style="width: 100%;" :height="table_height">
        <el-table-column type='index' label="序号" width="80">
        </el-table-column>
        <el-table-column prop="FShortName" label="_公司名称_" width="140">
        </el-table-column>
        <el-table-column prop="FVehicleName" label="_车牌号_" width="140">
        </el-table-column>
        <el-table-column prop="FDate" label="_日期_" width="140">
        </el-table-column>
        <el-table-column prop="FStartMileage" label="_开始里程(km)_" width="150">
        </el-table-column>
        <el-table-column prop="FEndMileage" label="_结束里程(km)_" width="150">
        </el-table-column>
        <el-table-column prop="FTotalMileage" label="_运行公里(km)_" width="950">
        </el-table-column>
      </el-table>
      <div class='box-charts' style='height:320px;'>
          <div class='pull-right'>
            <select id='test' v-on:change='change'>
               <option value="line">线性图</option>
               <option value="spline">曲性图</option>
               <option value="area">面积图</option>
               <option value="column">柱型图</option>
               <option value="areaspline">混合图</option>
               <option value="bar">条型图</option>
            </select>
          </div>
          <div id='report-one' style='height:300px;' class='clearfix' ></div> 
      </div>
    </div>
    <!--分页-->
    <div id="pagination" class="pagination">
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage1"
          :page-sizes="[10, 20, 30]"
          :page-size="100"
          layout="prev, pager, next, jumper,total,sizes"
          :total='FTotalCount'>
        </el-pagination>
      </div>
    </div>
  </section>
</template>
<script>

import HighCharts from 'highcharts'

require("!style!css!../../plugins/daterangepicker/daterangepicker.css")
require('../../plugins/daterangepicker/moment.js')
var plugin = require('../../plugins/daterangepicker/daterangepicker.js')
// plugin.getiCheck();
// plugin.getdatepicker();

export default {
  data() {
    return {
      FTotalCount:'FTotalCount',
      totle_height:null,
      table_height:null,
      option:{
          chart: {
          //   type:'line',
          },
        title: {
            text: '列车运行'
        },
        xAxis: {
            categories: [
                '车1',
                '车2',
                '车3',
                '车4',
                '车5',
                '车6',
                '车7',
                '车8',
                '车9',
                '车10',
                '车11',
                '车12',
            ],
            crosshair: true
        },
        legend:{
          enabled:false
        },
        yAxis: {
            // min: 0,
            title: {
                text: '公里 (km)'
            },
            labels: {
            formatter: function () {
            return this.value;
               }
            },
            lineWidth: 2
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} km</b></td></tr>'+'<tr><td style="color:{series.color};padding:0">运行时长: </td>' +'<td style="padding:0"><b>{point.y:.2f} h</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            //  type:'spline',
            name: '运行公里',
            data: [389, 118, 1, 315, 544, 87, 34, 200, 700.5, 200.5, 310.5, 420.5]
        }]
        },
      tableData3: [{
          FShortName:"简称1",
          FVehicleName: '车牌1',
          FDate: '2000',
          FStartMileage: '100',
          FEndMileage: '300',
          FTotalMileage: '200',
        },
        {
          FShortName:"简称2",
          FVehicleName: '车牌2',
          FDate: '2000',
          FStartMileage: '100',
          FEndMileage: '300',
          FTotalMileage: '200', 
        },
        {
          FShortName:"简称3",
          FVehicleName: '车牌3',
          FDate: '2000',
          FStartMileage: '100',
          FEndMileage: '300',
          FTotalMileage: '200',  
        }
        ,
        {
          FShortName:"简称3",
          FVehicleName: '车牌3',
          FDate: '2000',
          FStartMileage: '100',
          FEndMileage: '300',
          FTotalMileage: '200',  
        }
        ,
        {
          FShortName:"简称3",
          FVehicleName: '车牌3',
          FDate: '2000',
          FStartMileage: '100',
          FEndMileage: '300',
          FTotalMileage: '200',  
        }
        ,
        {
          FShortName:"简称3",
          FVehicleName: '车牌3',
          FDate: '2000',
          FStartMileage: '100',
          FEndMileage: '300',
          FTotalMileage: '200',  
        }
        ,
        {
          FShortName:"简称3",
          FVehicleName: '车牌3',
          FDate: '2000',
          FStartMileage: '100',
          FEndMileage: '300',
          FTotalMileage: '200',  
        }
        ,
        {
          FShortName:"简称3",
          FVehicleName: '车牌3',
          FDate: '2000',
          FStartMileage: '100',
          FEndMileage: '300',
          FTotalMileage: '200',  
        }
        ,
        {
          FShortName:"简称3",
          FVehicleName: '车牌3',
          FDate: '2000',
          FStartMileage: '100',
          FEndMileage: '300',
          FTotalMileage: '200',  
        }
        ,
        {
          FShortName:"简称3",
          FVehicleName: '车牌3',
          FDate: '2000',
          FStartMileage: '100',
          FEndMileage: '300',
          FTotalMileage: '200',  
        }
        ,
        {
          FShortName:"简称3",
          FVehicleName: '车牌3',
          FDate: '2000',
          FStartMileage: '100',
          FEndMileage: '300',
          FTotalMileage: '200',  
        }
        ,
        {
          FShortName:"简称3",
          FVehicleName: '车牌3',
          FDate: '2000',
          FStartMileage: '100',
          FEndMileage: '300',
          FTotalMileage: '200',  
        }
        ,
        {
          FShortName:"简称3",
          FVehicleName: '车牌3',
          FDate: '2000',
          FStartMileage: '100',
          FEndMileage: '300',
          FTotalMileage: '200',  
        },
        {
          FShortName:"简称3",
          FVehicleName: '车牌3',
          FDate: '2000',
          FStartMileage: '100',
          FEndMileage: '300',
          FTotalMileage: '200',  
        }
        ,
        {
          FShortName:"简称3",
          FVehicleName: '车牌3',
          FDate: '2000',
          FStartMileage: '100',
          FEndMileage: '300',
          FTotalMileage: '200',  
        },
        {
          FShortName:"简称3",
          FVehicleName: '车牌3',
          FDate: '2000',
          FStartMileage: '100',
          FEndMileage: '300',
          FTotalMileage: '200',  
        }

       ],
    }
  },
  mounted(){
    var _this=this;
    HighCharts.chart('report-one', this.option);
    setTimeout(() => {
        this.adjustPage();
    },100);
  },
  components:{
   
  },
  methods: {
    //图表点击切换
    change(){
      this.option.chart.type=$('#test').val();
      HighCharts.chart('report-one', this.option);
    },
    adjustPage(){
        this.totle_height = this.elementsFlex("el_table_wrap", "main-content","pagination",'', true) - 35;
        this.table_height = this.totle_height-320;
    },
  },
  computed:{
    //存储当前编辑的对象

  },
  props: {
      screenHeight: Number
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

</style>
