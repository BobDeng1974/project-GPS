<template>
	<div class="halo-tree">
		<div class="search-module tree-header" id="tree-header">
			<input type="text" class="input-custom no-border search-car-input" placeholder="_请输入关键字_" v-model="search">
			<span class="search-car-btn"><i class="fa fa-search fa-lg"></i></span>
			<span @click="refreshCarData" class="refresh-car-btn"><i class="fa fa-refresh fa-lg"></i></span>
		</div>
		<div id="tree-body">
			<tree-node :treeData='store.root' :options="options" @handlecheckedChange="handlecheckedChange"></tree-node>
		</div>
	</div>
</template>
<script>
	import TreeNode from './tree-node.vue'
	import TreeStore from 'js/Common/tree-store'
	export default {
		name: 'tree',
		props: {
			treeData: [Array],
			options: [Object]
		},
		data () {
			return {
				search: null,
				store: {
					root: [],
					last: null
				}
			}
		},
		created () {
			this.isTree = true
			this.store = new TreeStore({
				root: (this.treeData || []).slice(0),
				last: null
			})
		},
		watch: {
			search: function (val) {
				this.store.filterNodes(val, this.options.search)
				if(val=="") {
					this.treeData[0].open=true;
					this.treeData[0].children.map(function(item,index){
						if(!item.rootType){
							item.open=false
						}
					})
					return;
				}
			},
			treeData: function (data) {
				this.store = new TreeStore({
					root: (this.treeData || []).slice(0),
					last: null
				})
			}
		},
		methods: {
			handlecheckedChange (node) {
				if (this.options.halfCheckedStatus) {
					this.store.changeCheckHalfStatus(node)
				} else {
					this.store.changeCheckStatus(node)
				}
				this.getSelectedNodeIds()
			},
			getSelectedNodes () {
				const allnodes = this.store.datas
				let selectedNodes = []
				for (let [, node] of allnodes) {
					if (node.checked) {
						selectedNodes.push(node)
					}
				}
				return selectedNodes
			},
			getSelectedNodeIds () {
				const allnodes = this.store.datas
				let selectedNodeIds = []
				for (let [, node] of allnodes) {
					if (node.checked) {
						selectedNodeIds.push(node.id)
					}
				}

				this.$emit('choiceCarId', selectedNodeIds)
				return selectedNodeIds
			},
			//调用父组件 刷新数据
			refreshCarData(){
				this.$emit('refresh',true) //向服务器刷新数据
			}
		},
		components: {TreeNode}
	}
</script>
<style>
	#tree-body {
		height:700px;
		overflow:auto;
		padding:5px 0 0 5px;
		font-size: 13px;

	}

	.search-car-input {
		border-bottom:1px solid #d9d9d9;
		width:100%;
		height:33px;
		outline:none;
		padding:0 25px;
		position:relative;
		background:#fbfbfb;
		filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#fbfbfb', endColorstr='#e4e4e4',gradientType=0);
		background:-moz-linear-gradient(top, #fbfbfb, #e4e4e4);
		background:-o-linear-gradient(top, #fbfbfb, #e4e4e4);
		background:-webkit-gradient(linear, left top, left bottom, color-stop(0%, #fbfbfb), color-stop(100%, #e4e4e4));
		background:-webkit-linear-gradient(top, #fbfbfb 0%, #e4e4e4 100%);
		background: -ms-linear-gradient(top, #fbfbfb 0%, #e4e4e4 100%);
		background: linear-gradient(to bottom, #fbfbfb 0%, #e4e4e4 100%);
	}
	.tree-header{
		position:relative;
	}
	.search-car-btn {
		position:absolute;
		left:5px;
		top:5px;
	}

	.refresh-car-btn {
		cursor:pointer;
		position:absolute;
		right:5px;
		top:5px;
	}

</style>

