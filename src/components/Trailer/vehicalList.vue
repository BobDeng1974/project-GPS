<!-- content_header.vue -->
<template>
	<div class="container">
		<div class="modal fade carChoiselist" id="modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
			 aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title" id="myModalLabel" style="color: white">_选择车辆_</h4>
					</div>
					<div class="modal-body">
						<el-input
							placeholder="_输入关键字_"
							v-model="filterText">
						</el-input>
						<el-tree
							class="filter-tree"
							:data="data3"
							:props="defaultProps"
							default-expand-all
							:filter-node-method="filterNode"
							@node-click="handleNodeClick"
							ref="tree2">
						</el-tree>
					</div>
<!--
					<div class="modal-footer">
						&lt;!&ndash; <button type="button" class="btn btn-primary " data-dismiss="modal" >确定</button> &ndash;&gt;
					</div>
-->
				</div>
			</div>
		</div>
	</div>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				filterText: '',
				data3: null,
				defaultProps: {
					children: 'children',
					label: 'label'
				}
			}
		},
		watch: {
			filterText(val) {
				this.$refs.tree2.filter(val);
			}
		},

		methods: {
			filterNode(value, data) {
				if (!value) return true;
				return data.label.indexOf(value) !== -1;
			},
			handleNodeClick(data) {
				//console.log(data)
				var temp;
				var carId;
				if(data.id.indexOf("@A")===-1 && data.id.indexOf("@B")===-1 && data.id.indexOf("@C")===-1){
					temp = data.label;
					carId = data.id;
                    $('#modal').modal('hide')
				}
				this.$emit("child", [temp, carId]);
				//初始化搜索框,选完车辆后直接关闭
				this.filterText = ''
			},
//      getCheckedNodes() {
//        var nodeArr=this.$refs.tree2.getCheckedNodes();
//        var reg=/[\u4e00-\u9fa5_a-zA-Z0-9_]{7}/g;
//        var temp=[];
//        var carId=[];
//        $.each(nodeArr,function (index,obj) {
//          if(obj.label.match(reg)!=null){
//            temp.push(obj.label)
//            carId.push(obj.id)
//          }
//        })
//      },
		},
		mounted(){
			var _this = this;
			/* 模态框垂直居中,兼容小屏幕太向下的问题*/
			$('#modal').on('shown.bs.modal', function (e) {
				// 关键代码，如没将modal设置为 block，则$modala_dialog.height() 为零
				$(this).css('display', 'block');
				var modalHeight = $(window).height() / 2 - $('#modal .modal-dialog').height() / 2;
				$(this).find('.modal-dialog').css({
					'margin-top': modalHeight
				});
			});
			//获取所有车辆列表
			if (this.$store.state.allCarsList != null) {
				setData()
			} else {
				this.$store.commit('getAllCarsData', setData)
			}
			function setData() {
				_this.data3 = _this.$store.state.allCarsData;
			}

		},
	};
</script>
<style>
	.carChoiselist .modal-dialog{
		height:445px;
		margin: auto;
		position: absolute;
		top: 0; left: 0; bottom: 0; right: 0;
	}
	.carChoiselist .modal-header {
		background:#1a70ce;
		color:white;
		font-size:14px;
		height:40px;
		line-height:40px;
		padding:10px;
	}

	.carChoiselist .modal-content {
		width:300px;
		padding-bottom:15px;
	}

	.carChoiselist .modal-footer {
		height:auto;
		text-align:center;
		padding-top:5px;
	}

	.carChoiselist .el-input {
		margin:5px 0;
	}

	.carChoiselist .el-input__inner {
		height:30px;
	}

	.carChoiselist .el-tree {
		height:300px;
		overflow-y:auto;
	}

	.carChoiselist .el-tree-node__content {
		height:30px !important;
		line-height:30px !important;
	}

	.carChoiselist .el-tree-node__content > .el-checkbox {
		display:none;
	}

</style>
