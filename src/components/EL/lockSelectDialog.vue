<!-- content_header.vue -->
<template>
  <div class="container">
    <div class="modal fade carChoiselist noCheckBox" id="modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="myModalLabel" style="color: white">_选择设备_</h4>
          </div>
          <div class="modal-body">
            <el-input
              placeholder="_输入关键字_"
              v-model="filterText">
            </el-input>
            <el-tree
              class="filter-tree"
              :data="data3"
              show-checkbox
              node-key="FAssetID"
              :props="defaultProps"
              :render-content="renderContent"
              :expand-on-click-node="false"
              default-expand-all
              :filter-node-method="filterNode"
              @node-click="handleNodeClick"
              ref="tree2"
            >
            </el-tree>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary " data-dismiss="modal" @click="getCheckedNodes">_确定_</button>
          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal -->
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        filterText: '',
        data3:null,
        defaultProps: {
          children: 'children',
          label: 'FAssetID'
        }
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },

    methods: {
      renderContent(h, { node, data, store }){
        return(
          <span >
        <span  v-show={data.FAssetID.indexOf("@A")!=-1}>{data.FVehicleName}</span>
        <span  v-show={data.FAssetID.indexOf("@A")==-1}>{data.FAssetID}</span>
        <span style="margin-left:10px" v-show={data.FAssetID.indexOf("@A")==-1}>({data.FVehicleName})</span>
        </span>
      )
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.FAssetID.indexOf(value) !== -1;
      },
      handleNodeClick(data){
        var nodeArr=this.$refs.tree2.getCheckedNodes();
        if(nodeArr.indexOf(data)==-1){
          this.$refs.tree2.setChecked(data,true,true)
        }else {
          this.$refs.tree2.setChecked(data,false,true)
        }
      },
      getCheckedNodes() {
        var nodeArr=this.$refs.tree2.getCheckedNodes();
        var temp=[];
        var carId=[];
        $.each(nodeArr,function (index,obj) {
          if(obj.FAssetID.indexOf("@A")===-1){
            temp.push(obj.FAssetID)
            carId.push(obj.FAssetGUID)
          }
        });
        this.$emit("child",[temp,carId])
        //初始化搜索框,选完车辆后直接关闭
        this.filterText=''
      },
    },
    mounted(){
      var _this = this;
      /* 模态框垂直居中,兼容小屏幕太向下的问题*/
      $('#modal').on('shown.bs.modal', function (e) {
        // 关键代码，如没将modal设置为 block，则$modala_dialog.height() 为零
        $(this).css('display', 'block');
        var modalHeight=$(window).height() / 2 - $('#modal .modal-dialog').height() / 2;
        $(this).find('.modal-dialog').css({
          'margin-top': modalHeight
        });
      });
      //获取所有车辆列表
      if(this.$store.state.allLockList!=null){
        setData()
      }else {
        this.$store.commit('getAllLocksData',setData)
      }
      function setData(){
        _this.data3=_this.$store.state.allLocksData;
      }
      let oldValue=_this.$store.state.allLocksData;
      setInterval(function () {
        if(_this.$store.state.allLocksData!=oldValue){
          _this.data3=_this.$store.state.allLocksData;
          oldValue=_this.$store.state.allLocksData;
        }
      },1000)
    },
  };
</script>
<style>
  .noCheckBox .el-tree-node__content > .el-checkbox {
    display:inline-block!important;
  }
</style>
