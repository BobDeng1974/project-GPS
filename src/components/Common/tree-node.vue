<template>
	<ul>
		<li v-for='(item, index) in nodeData'
			v-show="item.visible"
			:class="[(item.children && item.children.length > 0) ? '':'leaf']">


			<i v-if="item.children && item.children.length > 0" @click.stop='handleNodeExpand(item)'
			   :class="[item.open? 'tree-open':'tree-close','icon']">
			</i>
			<div v-show="options.showCheckbox && options.halfCheckedStatus"
				 class="inputCheck" :class="{notAllNodes:item.nodeSelectNotAll}"
				 :style="{width:inputWidth+'px', height:inputWidth+'px'}" @click="walkCheckBox(item)">
				<input type="checkbox" class="check" v-model='item.checked' @change="handlecheckedChange(item)"
					   v-if="options.showCheckbox && options.halfCheckedStatus  &&  !item.nodeSelectNotAll"/>
			</div>
			<i class="fa" :class="{'fa-home fa-2x':getIconType(item)===1,
								   'fa-building fa-lg':getIconType(item)===2,
								   'fa-flag-checkered fa-lg':getIconType(item)===3,
								   'fa-truck':getIconType(item)===4,
			                       'fa-lock fa-lg':getIconType(item)===5}"></i>
			<span @click="handleNode(item)" :class="{'node-selected':(item.checked && !options.showCheckbox) || item.searched }">
				<span class="txt-label" :class="{'txt-company':item.rootType=='1','txt-carTeam':item.rootType=='2'}">{{item.label}}</span>

				<!--数据副label-->
				<span class="sub-label"v-if="item.subLabel&&item.subLabel!=null">【{{item.subLabel}}】</span>
				<!--公司和车队 车辆数-->
				<span v-if="item.count!=null">【{{item.count}}】</span>
				<!--车辆设备状态图标-->
				<span v-if="getIconType(item)===4">
					<i v-show="item.FTHS==1 || item.FTHS==2" class="img-icon carChoiceList-icon"
					   :class="{'ChoiceListIcon-0a':item.FTHS==1,'ChoiceListIcon-0c':item.FTHS==2}"
					   :title="item.FTHS==1?'_温湿度正常_':'_温湿度异常_'"></i>
					<i v-show="item.FCamera==1 || item.FCamera==2" class="img-icon carChoiceList-icon"
					   :class="{'ChoiceListIcon-1a':item.FCamera==1,'ChoiceListIcon-1c':item.FCamera==2}"
					   :title="item.FCamera==1?'_视频监控正常_':'_视频监控异常_'"></i>
					<i v-show="item.FRFID==1 || item.FRFID==2" class="img-icon carChoiceList-icon"
					   :class="{'ChoiceListIcon-2a':item.FRFID==1,'ChoiceListIcon-2c':item.FRFID==2}"
					   :title="item.FRFID==1?'_RFID刷卡正常_':'_RFID刷卡异常_'"></i>
					<i v-show="item.FTPMS==1 || item.FTPMS==2" class="img-icon carChoiceList-icon"
					   :class="{'ChoiceListIcon-3a':item.FTPMS==1,'ChoiceListIcon-3c':item.FTPMS==2}"
					   :title="item.FTPMS==1?'_胎温胎压正常_':'_胎温胎压异常_'"></i>
					<i v-show="item.FScreen==1 || item.FScreen==2" class="img-icon carChoiceList-icon"
					   :class="{'ChoiceListIcon-4a':item.FScreen==1,'ChoiceListIcon-4c':item.FScreen==2}"
					   :title="item.FScreen==1?'_调度屏正常_':'_调度屏异常_'"></i>
					<i v-show="item.FVideo==1 || item.FVideo==2" class="img-icon carChoiceList-icon"
					   :class="{'ChoiceListIcon-5a':item.FVideo==1,'ChoiceListIcon-5c':item.FVideo==2}"
					   :title="item.FVideo==1?'_摄像头正常_':'_摄像头异常_'"></i>
				</span>

			</span>
			<tree-node v-if="item.children && item.children.length > 0"
					   :options="options"
					   @handlecheckedChange="handlecheckedChange"
					   v-show='item.open'
					   :tree-data="item.children">
			</tree-node>
		</li>
	</ul>
</template>
<script>
	export default {
		name: 'treeNode',
		props: {
			treeData: [Array],
			options: [Object]
		},
		data () {
			return {
				nodeData: []
			}
		},
		created () {
			const parent = this.$parent
			if (parent.isTree) {
				this.tree = parent
			} else {
				this.tree = parent.tree
			}

			const tree = this.tree
			if (!tree) {
				console.warn('找不到树节点')
			}
			this.nodeData = (this.treeData || []).slice(0)
		},
		computed: {
			inputWidth: function () {
				if (this.checkFirfox()) {
					return 13
				}
				return 13
			}
		},
		watch: {
			treeData: function (data) {
				this.nodeData = (data || []).slice(0)
			}
		},
		methods: {
			//获得图标类型
			getIconType(obj){
				let id = obj.id;
				if (id.indexOf("@A") != -1) return 1;
				if (id.indexOf("@B") != -1) return 2;
				if (id.indexOf("@C") != -1) return 3;
				if (obj.iconType==0 && id.indexOf("@A") === -1 && id.indexOf("@B") === -1 && id.indexOf("@C") === -1) return 4;
				if (obj.iconType==1 && id.indexOf("@A") === -1 && id.indexOf("@B") === -1 && id.indexOf("@C") === -1) return 5;
			},
			checkFirfox(){
				let u = navigator.userAgent
				if (u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1) {
					return true
				}
				return false
			},
			walkCheckBox(node){
				if (node.nodeSelectNotAll) {
					node.checked = !node.checked
					this.handlecheckedChange(node)
				}
			},
			handleNodeExpand (node) {
				node.open = !node.open
			},
			handlecheckedChange (node) {
				this.$emit('handlecheckedChange', node)
			},
			handleNode (node) {
				if (this.tree.options.showCheckbox) {
					node.checked = !node.checked;
					this.$emit('handlecheckedChange', node)
				} else {                            //单选状态下  点击lable
					if (this.tree.store.last) {
						if (this.tree.store.last.id === node.id) {
							this.tree.store.last.checked = !this.tree.store.last.checked
						} else {
							this.tree.store.last.checked = false
							node.checked = true
							this.tree.store.last = node
						}
					} else {
						this.tree.store.last = node
						node.checked = true
					}
					this.tree.$emit('node-click', node);
				}

			}
		}
	}
</script>
<style>

	li:hover {
		cursor:pointer;
	}

	.icon {
		display:inline-block;
		margin-right:10px;
		vertical-align:middle;
	}

	.halo-tree {
		font-size:14px;
		min-height:20px;
		-webkit-border-radius:4px;
		-moz-border-radius:4px;
		border-radius:4px;
	}

	.node-selected {
		background-color:#ddd
	}
	.halo-tree .label{
		color:#666;
	}
	.halo-tree .txt-company{
		color:#000;
	}
	.halo-tree .txt-carTeam{
		color:#333;
	}

	.halo-tree .sub-label{
		color:#005fc6;
	}
	.halo-tree li {
		margin:0;
		position:relative;
		list-style:none;
	}

	.halo-tree li > span,
	.halo-tree li > i,
	.halo-tree li > a {
		line-height:12px;
		vertical-align:middle;
	}

	.halo-tree ul ul li:hover {
		background:rgba(0, 0, 0, .035)
	}

	.halo-tree li:after,
	.halo-tree li:before {
		content:'';
		left:-8px;
		position:absolute;
		right:auto;
		border-width:1px
	}

	.halo-tree li:before {
		border-left:1px dashed #999;
		bottom:50px;
		height:100%;
		top:-12px;
		width:1px;
	}

	.halo-tree li:after {
		border-top:1px dashed #999;
		height:20px;
		top:14px;
		width:12px
	}

	.halo-tree li span {
		display:inline-block;
		padding:4px 3px;
		text-decoration:none;
		border-radius:3px;
	}

	.halo-tree li:last-child::before {
		height:26px
	}

	.halo-tree > ul {
		padding-left:0
	}

	.halo-tree ul ul {
		padding-left:15px;
	}

	.halo-tree li.leaf {
		padding-left:4px;
	}

	.halo-tree li.leaf:after {
		content:'';
		left:-8px;
		position:absolute;
		right:auto;
		border-width:1px;
		border-top:1px dashed #999;
		height:20px;
		top:14px;
		width:12px;
	}

	.check {
		display:inline-block;
		position:relative;
		top:4px;
	}

	.halo-tree .icon {
		margin-right:0;
	}

	.halo-tree .tree-close {
		width:12px;
		height:12px;
		background-size:cover;
		background-image:url("/static/img/treeOpen-1.png");
	}

	.halo-tree .tree-open {
		width:12px;
		height:12px;
		background-size:cover;
		background-image:url("/static/img/treeClose-2.png");
	}

	.halo-tree .search {
		width:10px;
		height:10px;
		background-size:cover;
		background-image:url("/static/img/search.png");
	}

	.check.notAllNodes {
		-webkit-appearance:none;
		-moz-appearance:none;
		-ms-appearance:none;
		width:13px;
	}

	.inputCheck {
		display:inline-block;
		position:relative;
	}

	.inputCheck.notAllNodes:before {
		content:"";
		display:inline-block;
		position:absolute;
		width:100%;
		height:100%;
		z-index:10;
		top:50%;
		left:50%;
		transform:translate3d(-50%, -20%, 0);
		/*background-image: url("/../../assets/img/half.png");*/
		background-image:url("../../../static/img/half.jpg");
	}

	.carChoiceList-icon {
		display:inline-block;
		width:14px;
		height:14px;
	}

	.ChoiceListIcon-0a {
		background-position:-131px -76px;
	}

	.ChoiceListIcon-1a {
		background-position:-145px -76px;
	}

	.ChoiceListIcon-2a {
		background-position:-159px -76px;
	}

	.ChoiceListIcon-3a {
		background-position:-173px -76px;
	}

	.ChoiceListIcon-4a {
		background-position:-187px -76px;
	}

	.ChoiceListIcon-5a {
		background-position:-117px -76px;
	}

	.ChoiceListIcon-0b {
		background-position:-131px -90px;
	}

	.ChoiceListIcon-1b {
		background-position:-145px -90px;
	}

	.ChoiceListIcon-2b {
		background-position:-159px -90px;
	}

	.ChoiceListIcon-3b {
		background-position:-173px -90px;
	}

	.ChoiceListIcon-4b {
		background-position:-187px -90px;
	}

	.ChoiceListIcon-5b {
		background-position:-117px -90px;
	}

	.ChoiceListIcon-0c {
		background-position:-131px -62px;
	}

	.ChoiceListIcon-1c {
		background-position:-145px -62px;
	}

	.ChoiceListIcon-2c {
		background-position:-159px -62px;
	}

	.ChoiceListIcon-3c {
		background-position:-173px -62px;
	}

	.ChoiceListIcon-4c {
		background-position:-187px -62px;
	}

	.ChoiceListIcon-5c {
		background-position:-117px -62px;
	}
</style>
