<template>
	<div class="content">
		<el-col :span="24" class="header">
			<el-col :span="4" class="logo">
				{{logo}}
			</el-col>
			<el-col :span="10">
				<div class="tools">
					<i class="fa fa-align-justify"></i>
				</div>
			</el-col>
			<el-col :span="10" class="userinfo">
				<el-dropdown trigger="hover">
				  <span class="el-dropdown-link userinfo-inner">
				    <img :src="sysUserAvatar">
				    {{sysUserName}}
				  </span>
				  <el-dropdown-menu slot="dropdown">
				    <el-dropdown-item>我的消息</el-dropdown-item>
				    <el-dropdown-item>设置</el-dropdown-item>
				    <el-dropdown-item divided @click.native="unLogin">退出登录</el-dropdown-item>
				  </el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
		<el-col :span="24" class="main">
			<aside>
				<el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :default-active="$route.path" class="el-menu-vertical-demo" unique-opened router>
					<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
						<el-submenu :index="index+''" v-if="!item.leaf">
							<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
							<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden&&!child.children">{{child.name}}</el-menu-item>
							<template v-for="(child,count) in item.children" v-if="child.children">
								<el-submenu :index="index+count+''">
						          <template slot="title">{{child.name}}</template>
						          <el-menu-item :index="itemChild.path" :key="itemChild.path" v-for="itemChild in child.children">{{itemChild.name}}</el-menu-item>
						        </el-submenu>
							</template>
						</el-submenu>
						<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
					</template>
				</el-menu>
			</aside>
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24">
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24" class="grid-content-main">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				logo:'logo',
				sysUserAvatar:'',
				sysUserName:'',
			}
		},
		methods:{
			unLogin:function(){
				this.$confirm('确认退出吗？','提示',{

				}).then(() => {
					sessionStorage.removeItem('user');
					this.$router.push('/login');
				}).catch((err) => {
					console.log('退出失败：' + err);
				})
			}
		},
		mounted:function(){
			var user = sessionStorage.getItem('user');
			if(user){
				user = JSON.parse(user);
				this.sysUserName = user.name;
				this.sysUserAvatar = user.avatar;
			}
		}
	}
</script>
<style lang="less" scoped>
	.content {
		.header {
			background-color: rgba(0,0,0,0.8);
			color: #fff;
			height: 60px;
			line-height:60px;
			.logo {
				text-align: center;
				font-size: 20px
			}
			.tools {
				text-align: left
			}
			.userinfo {
				float:right;
				text-align: right;
				padding-right: 40px;
				&-inner {
					color: #fff;
					img {
						width: 40px;
						height: 40px;
						border-radius: 100%;
						float:right;
						margin: 10px 
					}
				}
			}
		}
		.main {
			display: flex;
			position: absolute;
			bottom: 0;
			left:0;
			top: 60px;
			overflow: hidden;
			aside {
				flex:0 0 230px;
				width: 230px;
				background-color: #545c64;
				.el-menu {
					width: 100%
				}
			}
		}
		.content-container {
			flex: 1;
			padding: 20px;
			overflow-y: scroll; 
			box-sizing: border-box;
			.grid-content-main {
				margin-top: 20px
			}
		}
	}
	
</style>