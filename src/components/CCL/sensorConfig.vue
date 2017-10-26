<template>
  <section style="height: 100%" class="row">
    <div  class="vehicleList">
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
          default-expand-all
          :filter-node-method="filterNode"
          :render-content="renderContent"
          @node-click="handleNodeClick"
          ref="tree2">
        </el-tree>
      </div>
    </div>
    <div class="configPanel" >
      <header class="configCar">{{FVehicleName}}</header>
      <div style="height: 100%;position: relative">
        <div class="configPram">
          <ul>
            <li><h1>1</h1><p>ID：<input type="text" v-model="SensorObj.FSensorID1"></p><p>时间：{{SensorObj.FSensor1GPSDateTime}}</p><p>温度：{{SensorObj.FTemperature1}}°C</p><p>湿度：{{SensorObj.FHumidity1}}%</p><p>电量：{{SensorObj.FBattery1}}%</p></li>
            <li><h1>2</h1><p>ID：<input type="text" v-model="SensorObj.FSensorID2"></p><p>时间：{{SensorObj.FSensor2GPSDateTime}}</p><p>温度：{{SensorObj.FTemperature2}}°C</p><p>湿度：{{SensorObj.FHumidity2}}%</p><p>电量：{{SensorObj.FBattery2}}%</p></li>
            <li><h1>3</h1><p>ID：<input type="text" v-model="SensorObj.FSensorID3"></p><p>时间：{{SensorObj.FSensor3GPSDateTime}}</p><p>温度：{{SensorObj.FTemperature3}}°C</p><p>湿度：{{SensorObj.FHumidity3}}%</p><p>电量：{{SensorObj.FBattery3}}%</p></li>
            <li><h1>4</h1><p>ID：<input type="text" v-model="SensorObj.FSensorID4"></p><p>时间：{{SensorObj.FSensor4GPSDateTime}}</p><p>温度：{{SensorObj.FTemperature4}}°C</p><p>湿度：{{SensorObj.FHumidity4}}%</p><p>电量：{{SensorObj.FBattery4}}%</p></li>
          </ul>
        </div>
        <div class="saveConfig" >
          <div class="carImgContainer">
            <img src="/static/img/position-tem.png" alt="">
          </div>
          <div style="text-align: center;">
            <el-button type="primary" @click="save()">_保存配置_</el-button>
          </div>
        </div>
        </div>
    </div>
  </section>
</template>
<script>
  import baidu  from '../../js/GIS/Baidu/BaiduAPI'
  let _this
  export default{
    data(){
      _this=this;
      return{
        loading:true,
        filterText: '',
        data3: null,
        defaultProps: {
          children: 'children',
          label: 'label',
          id:'id',
        },
        FVehicleName:null,
        FAssetGUID:null,
        FAssetID:null,
        success:false,
        error:false,
        SensorObj:{
          //设备ID
          SensorID1:null,
          SensorID2:null,
          SensorID3:null,
          SensorID4:null,
          //湿度
          humidity1:null,
          humidity2:null,
          humidity3:null,
          humidity4:null,
          //温度
          Temperature1:null,
          Temperature2:null,
          Temperature3:null,
          Temperature4:null,
          //电量
          electricity1:null,
          electricity2:null,
          electricity3:null,
          electricity4:null,
        }
      }
    },
    activated: function(){
    },
    watch:{
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },
    mounted(){
      if (this.$store.state.allCarsList != null) {
        setData()
      } else {
        this.$store.commit('getAllCarsData', setData)
      }
      function setData() {
        _this.data3 = _this.$store.state.allCarsData;
        console.log(_this.data3)
      }
    },
    updated(){
      $('.configResult').eq($('.configResult').length-1).css("border-bottom","1px solid #ccc")
    },
    methods:{
      renderContent(h, { node, data, store }){
        return(
          <span class={{"green":!data.FAlarmOffLine&&data.id.indexOf("@A")==-1&&data.id.indexOf("@B")==-1&&data.id.indexOf("@C")==-1}}>
            <i class="fa fa-home icon fa-lg" v-show={data.id.indexOf("@A")!=-1}></i>
            <i class="fa fa-building icon" v-show={data.id.indexOf("@B")!=-1}></i>
            <i class="fa fa-flag-checkered icon" v-show={data.id.indexOf("@C")!=-1}></i>
            <i class="fa fa-truck icon" v-show={data.id.indexOf("@B")==-1&data.id.indexOf("@A")==-1&data.id.indexOf("@C")==-1}></i>
            {node.label}
            <span v-show={data.id.indexOf("@B")!=-1||data.id.indexOf("@A")!=-1||data.id.indexOf("@C")!=-1} style="font-weight:bold">[{data.count}]</span>
             <span style="margin-left:10px" v-show={data.id.indexOf("@B")==-1&data.id.indexOf("@A")==-1&data.id.indexOf("@C")==-1}>({data.FVehicleSerialCode})</span>
            <div class={{"configResult":true,"green":data.message=="配置成功"}}>
            <i class={{"el-icon-loading":data.message=="正在配置","el-icon-circle-check":data.message=="配置成功","el-icon-circle-close":data.message=="配置失败"}}></i>
              <span v-show={data.ISConfigSensorid&&data.message==null}>已配置</span> <span v-show={data.message!=null}>{data.message}</span></div>
          </span>
      )
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      handleNodeClick(data){
        if(data.id.indexOf("@A")===-1 && data.id.indexOf("@B")===-1 && data.id.indexOf("@C")===-1){
          _this.FVehicleName=data.label;
          _this.FAssetGUID=data.FAssetGUID;
          $.ajax({
            "url": "/web/ColdChain/ColdChain_Admin",
            "cache": false,
            "async": true,
            "type": "post",
            "dataType": "json",
            "contentType": "application/json; charset=utf-8",
            "data": '{"FTokenID":"' + _this.$store.state.FTokenID + '","FAction":"QueryBindingSensor","FAssetGUID":"'+_this.FAssetGUID+'","FVersion":"1.0.0"}',
            success: function (json) {
              console.log(json);
              _this.SensorObj=json.FObject[0];
              if(_this.SensorObj.FSensor1GPSDateTime!=null){
                _this.SensorObj.FSensor1GPSDateTime=_this.parseGMT(_this.SensorObj.FSensor1GPSDateTime);
              }
              if(_this.SensorObj.FSensor2GPSDateTime!=null){
                _this.SensorObj.FSensor2GPSDateTime=_this.parseGMT(_this.SensorObj.FSensor2GPSDateTime);
              }
             if(_this.SensorObj.FSensor3GPSDateTime!=null){
               _this.SensorObj.FSensor3GPSDateTime=_this.parseGMT(_this.SensorObj.FSensor3GPSDateTime);
             }
             if(_this.SensorObj.FSensor4GPSDateTime!=null){
               _this.SensorObj.FSensor4GPSDateTime=_this.parseGMT(_this.SensorObj.FSensor4GPSDateTime)
             }

          /*    _this.SensorID1=json.FObject[0].FSensorID1;
              _this.SensorID2=json.FObject[0].FSensorID2;
              _this.SensorID3=json.FObject[0].FSensorID3;
              _this.SensorID4=json.FObject[0].FSensorID4;
              _this.Temperature1=json.FObject[0].FTemperature1;
              _this.Temperature2=json.FObject[0].FTemperature2;
              _this.Temperature3=json.FObject[0].FTemperature3;
              _this.Temperature4=json.FObject[0].FTemperature4;
              _this.electricity1=json.FObject[0].FBattery1;
              _this.electricity2=json.FObject[0].FBattery2;
              _this.electricity3=json.FObject[0].FBattery3;
              _this.electricity4=json.FObject[0].FBattery4;
               _this.humidity1=json.FObject[0].FHumidity1;
               _this.humidity2=json.FObject[0].FHumidity2;
               _this.humidity3=json.FObject[0].FHumidity3;
               _this.humidity4=json.FObject[0].FHumidity4;*/
            },
            error:function () {

            }
          })
        }
      },
      save(){
        if(_this.FAssetGUID!=''&&_this.FAssetGUID!=null){
          $.each(_this.data3[0].children,function (index,obj) {
            $.each(obj.children,function (i,item) {
              $.each(item.children,function (j,a) {
                if(a.label==_this.FVehicleName){
                  a.message="正在配置"
                }
              })
            })
          })
          $.ajax({
            "url": "/web/ColdChain/ColdChain_Admin",
            "cache": false,
            "async": true,
            "type": "post",
            "dataType": "json",
            "contentType": "application/json; charset=utf-8",
            "data": '{"FTokenID":"' + _this.$store.state.FTokenID + '","FAction":"UpdateBindingSensor",' +
            '"FAssetGUID":"'+_this.FAssetGUID+'","FSensorID1":"'+_this.SensorObj.FSensorID1+'","FSensorID2":"'+_this.SensorObj.FSensorID2+'","FSensorID3":"'+_this.SensorObj.FSensorID3+'","FSensorID4":"'+_this.SensorObj.FSensorID4+'","FVersion":"1.0.0"}',
            success: function (json) {
              console.log(json)
              $.each(_this.data3[0].children,function (index,obj) {
                $.each(obj.children,function (i,item) {
                  $.each(item.children,function (j,a) {
                    if(a.label==_this.FVehicleName){
                      if(json.Result==200) {
                        a.message = "配置成功"
                      }else {
                        a.message = "配置失败"
                      }
                    }
                  })
                })
              })

            },
            error:function () {

            }
          })
        }else {
          _this.$message({
            showClose: true,
            message: '_请选择车辆_',
            type: 'warning'
          });
        }
      },

    },
    computed(){

    },
    components:{
    }
  }
</script>
<style>
 .vehicleList{
   height: 100%;
   padding-left:16px;
   width:390px;
   float: left
 }
  .configResult{
    float:right;
    width:80px;
    height:36px;
    background:white;
    border-left:1px solid #ccc;
    text-align: center;
  }
 .configPanel{
   border: 1px solid #cccccc;
   background:white;
   padding-left: 0px;
   height: 100%;
   margin-left: 395px;
   margin-right: 20px;
 }
 .configPanel header{
   height: 40px;
   line-height: 40px;
   border-bottom: 1px solid #cccccc;
 }
   .configPram{
     width: 740px;
     height: 150px;
     margin: 50px auto ;

   }
   .saveConfig{
     position: absolute;
     bottom:120px;
     width: 100%
   }
 @media screen and (max-width: 1370px) {
   .carImgContainer img{
     width: 500px;
   }
 }
 .configPram ul li{
   width: 185px;
   height: 140px;
   box-sizing: border-box;
   border-right: 1px solid #cccccc;
   float: left;
 }
 .configPram ul li h1{
   text-align: center;
   font-size: 26px;
   color:#005fc6;
   margin-top: -20px;
 }
 .configPram ul li p{
   padding-left: 5px;
   line-height: 24px;
   font-weight:bold;
 }
 .configPram ul li input{
   width: 90px;
   margin-left: 5px;
 }
  .configCar{
    line-height: 50px;
    padding-left: 20px;
    font-size: 20px;
    font-weight: bold;
  }
  .carImgContainer{

  }
 .carImgContainer img{
   display: block;
   margin: 0px auto;
 }
</style>
