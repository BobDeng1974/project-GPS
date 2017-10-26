<!-- overtime_record.vue -->
<template>
  <section>
     <el-popover
      ref="popover4"
      placement="bottom-start"
      width="400"
      trigger="click"> 
      <el-form ref="form"  label-width="100px" :model="formc">
        <el-form-item label="车牌号" prop='carNum'>
          <el-input class="col-md-12"  v-model="formc.carNum"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop='status'>
          <el-select class="col-md-12" v-model="formc.status" placeholder="请选择">
            <el-option label="已启用" value="use"></el-option>
            <el-option label="已禁用" value="forbidden"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="注册时间起" prop='starTime'>
          <el-col class="col-md-12">
            <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"  v-model="formc.starTime"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="注册时间止" prop='endTime'>
          <el-col class="col-md-12">
            <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"  v-model="formc.endTime"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
     </el-popover>
    <!--操作栏-->
    <div id="operate_wrapper">
      <div class='box-header'>
        <div class="rightinput">
          <input type="text" placeholder="请输入关键字">
          <button class="glyphicon glyphicon-search searchBtn" style="height: 28px;"></button>
          <button class="glyphicon glyphicon-chevron-down" v-popover:popover4></button>
        </div>
      </div>
    </div>
    <div class="el_table_wrap" id="el_table_wrap">
      <el-table :data="tableData3" stripe style="width: 100%;" :height="table_height">
        <el-table-column type='index' label="序号" width="80">
        </el-table-column>
        <el-table-column label="操作" width="80">
              <template scope="scope">
                <router-link to="xingshixiang">
                  <i class="img_track"></i>
                </router-link>
              </template>
            </el-table-column>
        <el-table-column prop="c" label="产品类别" width="140">
        </el-table-column>
        <el-table-column prop="FVehicleName" label="_车牌号_" width="150"></el-table-column>
        <el-table-column prop="e" label="行车类型" width="140">
        </el-table-column>
        <el-table-column prop="FStartTime" label="_开始时间_" width="140">
        </el-table-column>
        <el-table-column prop="FEndTime" label="_结束时间_" width="140">
        </el-table-column>
        <el-table-column prop="FStartMileage" label="_开始里程(km)_" width="150">
        </el-table-column>
        <el-table-column prop="FEndMileage" label="_结束里程(km)_" width="150">
        </el-table-column>
        <el-table-column prop="FTotalMileage" label="_运行公里(km)_" width="150">
        </el-table-column>
         <el-table-column prop="FTimeLength" label="_运行时长_" width="150">
        </el-table-column>
        <el-table-column prop="FMaxSpeed" label="_最大速度(km/h)_" width="155">
        </el-table-column>
        <el-table-column prop="FAverageSpeed" label="_平均速度(km/h)_" width="155">
        </el-table-column>
        <el-table-column prop="n" label="开始位置" width="140">
        </el-table-column>
        <el-table-column prop="o" label="结束位置" width="140">
        </el-table-column>
        <el-table-column prop="p" label="组织名称" width="140">
        </el-table-column>
      </el-table>
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

export default {
  data() {
    return {
      value1: '',
      FTotalCount:'FTotalCount',
      table_height: null,
      formc: {
          carNum: '',
          status: '',
          starTime: '',
          endTime: '',
        },
        tableData3: [{
          c: '产品类别？',
          FVehicleName:"车牌1",        
          e: '行车类型？',
          FStartTime: '2000',
          FEndTime: '2001',
          FStartMileage: '12',
          FEndMileage: '15',
          FTotalMileage: '3',
          FTimeLength: '4',
          FMaxSpeed: '100',
          FAverageSpeed: '13',
          n: '开始位置？',
          o: '结束位置？',
          p: '组织名称？'
        },
        {
          c: '产品类别？',
          FVehicleName:"车牌2",          
          e: '行车类型？',
          FStartTime: '2000',
          FEndTime: '2001',
          FStartMileage: '12',
          FEndMileage: '15',
          FTotalMileage: '3',
          FTimeLength: '4',
          FMaxSpeed: '100',
          FAverageSpeed: '13',
          n: '开始位置？',
          o: '结束位置？',
          p: '组织名称？'
        },
        {
          c: '产品类别？', 
          FVehicleName:"车牌3",         
          e: '行车类型？',
          FStartTime: '2000',
          FEndTime: '2001',
          FStartMileage: '12',
          FEndMileage: '15',
          FTotalMileage: '3',
          FTimeLength: '4',
          FMaxSpeed: '100',
          FAverageSpeed: '13',
          n: '开始位置？',
          o: '结束位置？',
          p: '组织名称？'
        },
     ],
    }
  },
  mounted(){ 
    var _this=this;
      setTimeout(() => {
        this.adjustPage();
      },100);
      this.doQuery();
  },
  components:{
  
  },
  methods: { 
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
      this.resetForm(formName);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    /*Pagination*/
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
    }, 
    adjustPage(){
        this.table_height = this.elementsFlex("el_table_wrap", "main-content", "operate_wrapper", "pagination", true) -35;
    },
  }
}
</script>
<style scoped>
.el-table th>.cell{
  text-align:center;
}
.box-header {
  height: 46px;
  line-height:46px;
  color: #444;
  display: block;
  padding:0 0 0 18px;
  position: relative;
  border: 1px solid #d9d9d9;
  margin:0 0 5px 0;
  background-color:#fff;
}
.leftbtn{
    float: left;
  }
.rightinput{
  float: right;
  margin-right: 10px;
}
.rightinput input{
  border:1px solid #1970cf;
  height: 28px;
  border-radius: 15px;
  box-shadow: none!important;
  width: 180px;
  padding-left: 10px;

}
.rightinput input:active{
  box-shadow: none!important;
  outline: none;
}
.rightinput input:focus{
  box-shadow: none!important;
  outline: none;
}
.searchBtn{
  border: none;
  background-color: white;
  margin-left: -40px;
  box-shadow: none;
  height: 20px!important;
  outline: none; 
}
.glyphicon-chevron-down{
  margin-left: 30px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    outline: none;
    background-color: white;
    border: 1px solid #1970cf;
  }
  .img_track{
    background-image: url(/static/img/img_track.png);
    background-repeat: no-repeat;
    display: inline-block;
    width:19px;
    height:13px;
  }
</style>
