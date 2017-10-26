<template>
  <section>
    <div class="modal fade" id="modal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content" >
          <div class="modal-header" style="height: 32px;padding: 10px;background:#1970cf;">
            <button type="button" class="close mybtn" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h5 class="modal-title" style="color: white">{{FAssetID}}</h5>
          </div>
          <div class="modal-body" style="height: 100%;margin:20px 0">
            <input type="text" placeholder="_请输入6位数字新密码_" style="width: 100%" id="newPsd" maxlength="6">
            <!--<input type="password" placeholder="_请再次输入新密码_" style="width: 100%;margin-top: 10px" id="rePsd">-->
            <span id="error" style="font-size: 12px;color:red;display: none">_输入的密码不符合_</span>
          </div>
          <div class="modal-footer" style="margin-right: 10px">
            <button type="submit" class="btn btn-primary submit" @click="changePsd()" v-if="changeType==0" >_确定_</button>
            <button type="submit" class="btn btn-primary submit" @click="changePsds()" v-if="changeType==1">_确定_</button>
            <button type="reset" class="btn btn-default" data-dismiss="modal">_取消_</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal -->
    </div>
    <lock-select-dialog v-on:child="get" ref="lock"></lock-select-dialog>
    <div id="operate_wrapper">
      <div class="box-header">
        <div class="block" style="margin-right: 20px">
          <span class="operatExp">_选择设备_</span>
          <div class="search-input-wrap" data-toggle="modal" data-target="#modal"><!---->
            <a href="javascript:;" class="get-carList-dialog">
              <i class="fa fa-lock" style="font-size: 18px" ></i>
            </a>
            <input type="text" class="search-input" readonly="readonly">
          </div>
        </div>
        <div class="btnList">
          <el-button type="primary" class="search" @click="doQuery()">_查询_</el-button>
          <el-button type="primary" class="reset" @click="reset">_重置_</el-button>
          <el-button type="primary" class="reset" @click="changeType=1" data-toggle="modal" data-target="#modal1">_修改密码_</el-button>
        </div>
      </div>
    </div>
    <div class="el_table_wrap" id="el_table_wrap" >
          <!--   <div v-bind:height="table_height"> -->
          <el-table :data="table" empty-text="_暂无数据_" stripe :height="table_height" style="width:100%"  @selection-change="handleSelectionChange" v-loading.body="loading"
                    element-loading-text="_正在修改中_">
            <el-table-column
              type="selection"
              :selectable="check"
              width="55">
            </el-table-column>
            <el-table-column  prop="RowNo"  label="_序号_"  width="80"></el-table-column>
            <el-table-column prop="" width="120" label="_操作_">
              <template scope="scope">
                <a href="javascript:" data-toggle="modal" data-target="#modal1" @click="change(scope.row)" v-if="scope.row.FAlarmOffLine=='_在线_'">_修改密码_</a>
                <a href="javascript:" style="cursor:not-allowed;color: #cccccc " v-if="scope.row.FAlarmOffLine=='_离线_'" title="离线状态不可修改">_修改密码_</a>
              </template>
            </el-table-column>
            <el-table-column prop="FAssetID" label="_终端号_" width="120" sortable></el-table-column>
            <el-table-column prop="FAlarmOffLine" label="_状态_" width="100" sortable></el-table-column>
            <el-table-column prop="FStaticPassword" label="_密码_" width="100" sortable></el-table-column>
            <el-table-column  prop="FVehicleName" sortable label="_车牌号_" width="100"></el-table-column>
            <el-table-column  prop=""  label="_修改进度_" width="140" class-name="changeProgress">
              <template scope="scope">
                <span v-bind:class="{error:scope.row.progress=='_修改失败_',green:scope.row.progress=='_修改成功_'}">{{scope.row.progress}}<img
                  src="/static/img/myloading.gif" alt="" v-if="scope.row.progress=='_正在修改中_'"></span>
              </template>
            </el-table-column>
            <el-table-column  prop="" label="" ></el-table-column>
          </el-table>
          <!-- </div>  -->
        </div>
    <div class="pagination">
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageIndex"
              :page-sizes="[10, 20, 30,]"
              :page-size="pageSize"
              layout="prev, pager, next, jumper,total,sizes"
              :total="total">
            </el-pagination>
          </div>
        </div>
  </section>
</template>
<script>
  import lockSelectDialog from './lockSelectDialog.vue'
  let _this
  export default{
    data(){
      _this=this;
      return {
        total:0,
        pageSize:20,
        pageIndex:1,
        table_height:null,
        table:null,
        FAssetID:null,
        FAssetGUID:null,
        changeObj:null,
        timer:null,
        loading:false,
        multipleSelection:[],
        changeType:null,
        changeNum:0,
        a:null
      }
    },
    props: {
      screenHeight: Number
    },
    mounted(){
      setTimeout(() => {
        this.adjustPage();
      },100);
    },
    computed:{
    },
    updated(){
      if($("#modal1").css("display")=="none"){
        $("#newPsd").val("");
        $("#error").css("display","none");
      }
    },
    methods: {
      handleSizeChange(val){
        this.pageSize=val;
        this.doQuery()
      },
      handleCurrentChange(val){
        this.pageIndex=val
        this.doQuery()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      check(row,index){
        if(row.FAlarmOffLine=="_离线_"){
          return false
        }else {
          return true
        }

      },
      doQuery(){
        var FVehicleID = $(".search-input").attr("fguid");
        $.post('/web/Lock/Lock_SmartLock',
          {
            FTokenID:_this.$store.state.FTokenID,
            FAction:"QueryLockAndOpenPasswordInfo",
            FAssetGUIDs:FVehicleID,
            FPageSize:_this.pageSize,
            FPageIndex:_this.pageIndex,
            FVersion:"1.0.0"
          },
          function (json) {
            console.log(json);
            let totalArr=FVehicleID.split(',');
            _this.total=totalArr.length;
            _this.table=json.FObject;
            $.each(_this.table,function (index,obj) {
              if(obj.FAlarmOffLine==false){
                obj.FAlarmOffLine="_在线_"
              }else {
                obj.FAlarmOffLine="_离线_"
              }

            })
          })
      },
      change(row){
        this.changeType=0
        this.FAssetID=row.FAssetID;
        this.FAssetGUID=row.FAssetGUID;
        this.changeObj=row
      },
      //修改密码（单个）
       changePsd(){
           let reg = new RegExp(/^\d{6}$/);
           let psd=$("#newPsd").val();
           if(!reg.test(psd)){
             $("#error").css("display","inline");
             if($(".submit").attr("data-dismiss")){
               $(".submit").removeAttr("data-dismiss")
             }
           }else if(psd==undefined||psd==""){
             return
           }else {
             $("#error").css("display","none");
             $(".submit").attr("data-dismiss","modal");
             $.each(_this.table,function (index,obj) {
               if(obj.FAssetID==_this.FAssetID){
                 _this.a=index;
                 _this.$set(_this.table[index],'progress',"_正在修改中_");
               }
             });
             $.post('/web/Lock/Lock_SmartLock',
               {
                 FTokenID:_this.$store.state.FTokenID,
                 FAction:"UpdateStaticPassword",
                 FAssetID:_this.FAssetID,
                 FNewStaticPassword:psd,
                 FOldStaticPassword:_this.changeObj.FStaticPassword,
                 FVersion:"1.0.0"
               },
               function (json) {
                 let i=0;
                 if(json.Result==200){
                   _this.timer=setInterval(function () {
                     i++;
                     if(i>5){
                       clearInterval(_this.timer);
                       _this.$set(_this.table[_this.a],'progress',"_修改失败_");
                     /*  if(_this.changeType==0){
                         _this.$message({
                           showClose: true,
                           message: '_修改失败_',
                           type: 'error'
                         });
                       }*/
                     }else {
                       _this.getChangeResult()
                     }
                   },2000)
                 }else if(json.Result==104){
                   _this.$message({
                     showClose: true,
                     message: '_登录超时,5S后跳转到登录页面_',
                     type: 'warning'
                   });
                   setTimeout(function(){
                     _this.$store.commit("goLogin");
                   },5000)
                 }else {
               /*    _this.$message({
                     showClose: true,
                     message: '_修改失败_',
                     type: 'error'
                   });*/
                 }
               })
           }
      },
      getChangeResult(){
          $.post('/web/Lock/Lock_SmartLock',
            {
              FTokenID:_this.$store.state.FTokenID,
              FAction:"QueryNewOpenPasswordInfo",
              FAssetGUID:_this.FAssetGUID,
              FVersion:"1.0.0"
            },
            function (json) {
              console.log(json);
              if(json.Result==200){
                if(json.FObject[0].FStatus==1){
                  clearInterval(_this.timer);
                  _this.$set(_this.table[_this.a],'progress',"_修改成功_");
            /*      if(_this.changeType==0){
                    _this.$message({
                      showClose: true,
                      message: '_修改成功_',
                      type: 'success'
                    });
                  }*/
                }
              }else {
              /*  _this.$message({
                  showClose: true,
                  message: '_修改失败_',
                  type: 'error'
                });*/
              }
            })
      },
      //修改密码（多个）
      async changePsds(){
           $.each(_this.multipleSelection,async function (index,obj) {
             let i=0;
             let b;
             let timer;
             _this.FAssetID = obj.FAssetID;
             let FAssetGUID = obj.FAssetGUID;
             _this.changeObj = obj;
            await new Promise(resove=> {
               let reg = new RegExp(/^\d{6}$/);
               let psd = $("#newPsd").val();
               if (!reg.test(psd)) {
                 $("#error").css("display", "inline");
                 if ($(".submit").attr("data-dismiss")) {
                   $(".submit").removeAttr("data-dismiss")
                 }
               } else if (psd == undefined || psd == "") {
                 return
               } else {
                 $("#error").css("display", "none");
                 $(".submit").attr("data-dismiss", "modal");
                 $.each(_this.table, function (index, obj) {
                   if (obj.FAssetID == _this.FAssetID) {
                     b = index;
                     _this.$set(_this.table[index], 'progress', "_正在修改中_");
                   }
                 });
                 $.post('/web/Lock/Lock_SmartLock',
                   {
                     FTokenID: _this.$store.state.FTokenID,
                     FAction: "UpdateStaticPassword",
                     FAssetID: _this.FAssetID,
                     FNewStaticPassword: psd,
                     FOldStaticPassword: _this.changeObj.FStaticPassword,
                     FVersion: "1.0.0"
                   },
                   function (json) {
                     let i = 0;
                     if (json.Result == 200) {
                       resove()
                     } else {
                       _this.$set(_this.table[b], 'progress', "_修改失败_");
                     }
                   })
               }
             });
             timer = setInterval(function () {
               i++;
               if (i>5) {
                 clearInterval(timer);
                 _this.$set(_this.table[b], 'progress', "_修改失败_");
                 /*  if(_this.changeType==0){
                    _this.$message({
                    showClose: true,
                    message: '_修改失败_',
                    type: 'error'
                    });
                    }*/
                 }else {
                 $.post('/web/Lock/Lock_SmartLock',
                   {
                     FTokenID:_this.$store.state.FTokenID,
                     FAction:"QueryNewOpenPasswordInfo",
                     FAssetGUID:FAssetGUID,
                     FVersion:"1.0.0"
                   },
                   function (json) {
                     console.log(json);
                     if(json.Result==200){
                       if(json.FObject[0].FStatus==1){
                         clearInterval(timer);
                         _this.$set(_this.table[b],'progress',"_修改成功_");
                         _this.table[b].FStaticPassword=json.FObject[0].FStaticPassword
                         /*      if(_this.changeType==0){
                          _this.$message({
                          showClose: true,
                          message: '_修改成功_',
                          type: 'success'
                          });
                          }*/
                       }
                     }else {
                       /*  _this.$message({
                        showClose: true,
                        message: '_修改失败_',
                        type: 'error'
                        });*/
                     }
                   })
                 }
        },2000)
             })
      },
      adjustPage(){
        this.table_height = this.elementsFlex("el_table_wrap", "main-content", "operate_wrapper", "pagination", true) - 20;
        //this.countHeight=this.elementsFlex("el_table_wrap", "main-content", "operate_wrapper", "", true) - 70;
      },
      get: function (data) {
        $('.search-input').val("已选"+data[0].length);
        $('.search-input').attr('title',data[0])
        $('.search-input').attr('fguid',data[1])
      },
      //重置表单
      reset:function () {
        $('.search-input').val('');
        $('.search-input').removeAttr('fguid');
        this.table=null;
        this.total=0;
        this.$refs.lock.$children[1].setCheckedKeys([]);
      },
    },
    watch: {
      screenHeight () {
        this.adjustPage();
      },
    },
    components: {
      lockSelectDialog,
    }
  }
</script>
<style>
#modal2 .modal-content{
  background: none;
  border:none
}
  .error{
    color: red;
  }

</style>

