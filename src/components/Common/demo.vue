<!-- overtime_record.vue -->
<template>
    <!-- Main content -->
    <section>
      <!-- <div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
              <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                  <h4 class="modal-title" id="myModalLabel">请输入申请描述</h4>
              </div>
              <div class="modal-body">
                 <textarea class="form-control" rows="3" placeholder="请输入文字" style="resize: none"></textarea>
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                  <button type="button" class="btn btn-primary" data-dismiss="modal">提交申请</button>
              </div>
          </div>/.modal-content
        </div>/.modal
           </div> -->
       <div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div class="modal-dialog" style='width:800px'>
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="myModalLabel" >新增用户</h4>
                </div>
                <div class="modal-body clearfix">       
                    <div class="form-horizontal" role="form">
                      <div class="form-group col-xs-6">
                        <label for="addname" class="col-sm-4 control-label"><span class='star'>*</span>&nbsp;用户名</label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" id="addname" 
                               placeholder="请输入名字" required>
                        </div>
                      </div>
                      <div class="form-group col-xs-6">
                        <label for="addpassword" class="col-sm-4 control-label"><span class='star'>*</span>&nbsp;密码</label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" id="addpassword" 
                               placeholder="请输入密码" required>
                        </div>
                      </div>
                      <div class="form-group col-xs-6">
                        <label for="addnotword" class="col-sm-4 control-label">确认密码</label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control" id="addnotword" required>
                        </div>
                      </div>
                      <div class="form-group col-xs-6">
                        <label class="col-sm-4 control-label">真实姓名</label>
                        <div class="col-sm-8">
                          <input type="text" class="form-control">
                        </div>
                      </div>
                      <div class="form-group col-xs-6">
                        <label class="col-sm-4 control-label">说明</label>
                        <div class="col-sm-8">
                          <textarea  class="form-control" ></textarea>
                        </div>
                      </div>
                      <div class="form-group col-xs-6">
                        <label class="col-sm-4 control-label">所属组织</label>
                        <div class="col-sm-8 ">
                          <div class="input-group">
                              <input type="text" class="form-control">
                              <span class="input-group-addon">...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <button type="submit" class="btn btn-primary">保存</button>   
                </div>
            </div>
          </div>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <div class="box">
            <div class="box-header with-border">
                <!-- <h3 class="box-title">加班记录</h3> -->
                <div class="topTool pull-left">
                  <button class="btn btn-sm btn-primary" data-toggle="modal" data-target='#modal'>
                      <span class="glyphicon glyphicon-edit "></span> 新增</button>
                  <button class="btn btn-sm btn-primary">
                      <span class="glyphicon glyphicon-play-circle"></span> 启用</button>
                  <button class="btn btn-sm btn-primary">
                      <span class="glyphicon glyphicon-ban-circle"></span> 禁用</button>
                  <button class="btn btn-sm btn-primary">
                      <span class="glyphicon glyphicon-trash"></span> 删除</button>
                </div>
                <div class="pull-right">
                  <div class='search pull-left'>
                    <input type="text" placeholder="请输入关键字">
                    <button type="button" ></button>
                  </div>
                  <div class="btn-group pull-right" style='margin:0 11px 0 10px'>
                    <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                        <span class="caret"></span>
                    </button>
                    <div class="dropdown-menu" >
                       <form class='form-horizontal' role='form' style='width:300px;height:200px'>
                          <div class='form-group'>
                             <label for="firstname" class='col-sm-4' control-label>用户名</label>
                             <div class='col-sm-8'>
                                 <input type="text" id='firstname' class='form-control' placeholder="请输入用户名">
                             </div>
                          </div>
                          <div class='form-group'>
                             <label for="status" class='col-sm-4' control-label>状态</label>
                             <div class='col-sm-8'>
                                  <select class="form-control">
                                    <option value="all">请选择</option>
                                    <option value="true">已启用</option>
                                    <option value="false">未禁用</option>
                                  </select>
                             </div>
                          </div>
                          <div class='form-group'>
                             <label for="org" class='col-sm-4' control-label>所属组织</label>
                             <div class='col-sm-8'>
                                  <input type="text" id='org' class='form-control'>
                             </div>
                          </div> 
                          <div class="form-group">
                            <div class="col-sm-offset-4 col-sm-10">
                              <button type="submit" class="btn btn-default" style='margin:20px'>查询</button>
                              <button type="close" class="btn btn-default ">重置</button>
                            </div>
                          </div>  
                       </form>
                    </div>
                  </div>  
              </div>

                <!-- <form action="" class="form-inline">
                    <div class="form-group">
                      <label for="">类别：</label>
                      <select class="form-control">
                        <option value="all">全部</option>
                        <option value="false">未通过</option>
                        <option value="true">已通过</option>
                        <option value="true">未审批</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="">姓名：</label>
                      <input type="text" class="form-control" placeholder="姓名">
                    </div>
                    <div class="form-group">
                      <div class="input-group" style="width:220px;">
                        <div class="input-group-addon">
                          <i class="fa fa-calendar"></i>
                        </div>
                        <input type="text" class="form-control pull-right" name="daterange" readonly="readonly">
                      </div>
                    </div>
                    <div class="form-group">
                      <button class="btn btn-primary ">
                        搜索
                      </button>
                    </div>
                </form> -->
            <!-- /.box-header -->
            <div class="box-body">
              <table class="table table-hover">
                <thead>
                  <tr style="background:#1a70ce">
                    <th style="width:10px"><input type="checkbox"></th>
                    <th>序号</th>
                    <th>操作</th>
                    <th>用户名</th>
                    <th>联系人名称</th>
                    <th>所属组织</th>
                    <th>备注</th>
                    <th>状态</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="person in menuData.people">
                    <td style="width:10px"><input type="checkbox"></td>
                    <td>{{person.xuhao}}</td>
                    <td>
                        <button><span class="fa fa-user-plus"></span></button>
                        <button><span class="glyphicon glyphicon-edit"></span></button>
                        <button><span class="glyphicon glyphicon-lock"></span></button>
                    </td>
                    <td>{{person.user}}</td>
                    <td>{{person.mingcheng}}</td>
                    <td>{{person.zhuzi}}</td>
                    <td>{{person.beizhu}}</td>
                    <td>
                      <input type="checkbox" name="switch"  class='switch' checked>
                      <!-- <button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#modal">申请</button> -->
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- /.box-body -->
            <div class="box-footer clearfix ">
              <div class='pull-right'>
               <span class='xuanze'>选择每页条数</span>
                <select >
                   <option value="10">10</option>
                   <option value="10">20</option>
                   <option value="30">30</option>
                   <option value="40">40</option>
                </select>
                <span> 共100页</span>
              </div>
              <ul class="pagination pagination-sm no-margin pull-right">
                <li><a href="#">首页</a></li>
                <li><a href="#">&laquo;</a></li>
                <li><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">&raquo;</a></li>
                <li><a href="#">尾页</a></li>
              </ul>
            </div>
          </div>
          <!-- /.box -->
          </div>
        </div>
      </div>
    </section>

</template>
<script>
//import contentHeader from './content_header';
//var plugin = require('../js/plugin.js');
//plugin.getiCheck();
//plugin.getdatepicker();

require("!style!css!../../bootstrap/css/bootstrap-switch.css")
//require("!style!css!../../bootstrap/css/jquery-ui-1.12.1.custom/jquery-ui.css")
require("../../bootstrap/js/bootstrap-switch.js")
  
   
export default {
  data() {
    return {
        // msg:'数据',
        // menuList:[
        //   {
        //     text:"加班管理",
        //     isActive:false
        //   },
        //   {
        //     text:"加班记录",
        //     isActive:true
        //   }
        // ],
        menuData:{
          people:[{
             xuhao:'1',
             user:'zhangsan',
             mingcheng:'zh',
             zhuzi:'a',
             beizhu:'备注1'
          },
          {
             xuhao:'2',
             user:'lisi',
             mingcheng:'li',
             zhuzi:'b',
             beizhu:'备注2'
          },
          {
            xuhao:'3',
             user:'wangwu',
             mingcheng:'ww',
             zhuzi:'c',
             beizhu:'备注3'
          }]
        }
    }
  },
  components: {
    //contentHeader
  },
  mounted(){

    $('.modal-dialog').draggable({
        handle: ".modal-header", 
        cursor:'move',
        refreshPositions:false});

    $('input[name="switch"]').bootstrapSwitch();
    $('form').on("click",function(e){
            e.stopPropagation();
     }); 

    $('input[type="checkbox"]').iCheck({
      checkboxClass: 'icheckbox_flat-blue',
      radioClass: 'iradio_flat-blue'
  });
  $('input[name="daterange"]').daterangepicker({
    "singleDatePicker": true,
    "opens": "right",
    autoclose: true,
      // buttonClasses : [ 'btn btn-default' ],  
      applyClass : 'btn-small btn-primary',  
      cancelClass : 'btn-small',
      locale : {  
        applyLabel : '确定',  
        cancelLabel : '取消',  
        daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],  
        monthNames : [ '1月', '2月', '3月', '4月', '5月', '6月',  
        '7月', '8月', '9月', '10月', '11月', '12月' ],  
        firstDay : 1,
      }
    }
    , function(start, end, label) {
      console.log("改变" + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
  });
  },
  methods: {
     
  }
}
</script>
<style scoped>
.xuanze{
  margin-left: 20px;
}
.table th,.table td{
    text-align: center;
}
.table td{
    vertical-align: middle;
}
.table td button{
    border: none;
    background: white;
    color:#337ab7;
    margin-left: 10px;
}
.search {
  position: relative;
}
.search input {
  width:200px;
  height: 32px;
  padding-left: 10px;
  border: 2px solid #1a70ce;
  border-radius: 5px;
  outline: none;
}
.search button {
  position:absolute; 
  top: 0;
  right: 0;
  width: 32px;
  height: 32px;
  border: none;
  background: #1a70ce;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
}
.search button:before {
  content: "\f002";
  font-family: FontAwesome;
  font-size: 16px;
  color: #F9F0DA;
}
.pull-right > .dropdown-menu{
  padding:20px;
}
.modal-header{
  background:#1a70ce;
}
.star{
  color:red;
}
</style>