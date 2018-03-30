<template>
	<div class="content">
		<el-form :model="ruleForm2" status-icon :rules="rules2" label-position="left" ref="ruleForm2" class="demo-ruleForm">
		  <h2 class="title">登录系统</h2>
		  <el-form-item prop="account">
		    <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
		  </el-form-item>
		  <el-form-item prop="pass">
		    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="密码"></el-input>
		  </el-form-item>
		 <el-checkbox class="remember" v-model="checked">记住密码</el-checkbox>
		  <el-form-item style="width: 100%">
		    <el-button style="width: 100%" type="primary" @click.prevent="submitForm('ruleForm2')" :loading="logining">登录</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>
<script>
	import { requestLogin } from '../api/api'
	 export default {
	    data() {
	      return {
	      	logining:false,
	        ruleForm2: {
	          account:'',
	          pass: '',
	        },
	        rules2: {
	          account: [
	            { required: true, message: '请输入账号', trigger: 'blur' },
	          ],
	          pass: [
	            { required: true, message: '请输入密码', trigger: 'blur' },
	          ]
	        },
	        checked:false
	      };
	    },
	    methods: {
	      submitForm(formName) {
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	          	this.logining = true;
	            var loginParams = {
	            	username: this.ruleForm2.account,
	            	password: this.ruleForm2.pass
	            } 
	            requestLogin(loginParams).then(data => {
	            	this.logining = false;
	            	let {code, msg, user} = data;
	            	if(code != 200) {
	            		this.$message({
	            			message:msg,
	            			type: 'error'
	            		})
	            	}else {
	            		if(this.checked){
	            			sessionStorage.setItem('user',JSON.stringify(user));
	            		}else {
	            			sessionStorage.removeItem('user');
	            		}
	            		sessionStorage.setItem('user',JSON.stringify(user));
	            		this.$router.push({ path: '/home' });
	            	}
	            })
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        });
	      }
	    },
	    created:function(){
	    	let user = JSON.parse(sessionStorage.getItem("user"));
	    	if(user){
	    		this.ruleForm2.account = user.username;
	    		this.checked = true;
	    	}else {
	    		this.ruleForm2.account = '';
	    		this.checked = false;
	    	}
	    }
	  }
</script>
<style scoped>
	.content {
		margin: 200px auto;
		width: 400px;
		border-radius: 5px;
		padding: 30px 20px;
		box-shadow: 0 0 10px rgba(0,0,0,0.3);
		text-align: left
	}
	.title {
		text-align: center;
		margin-bottom: 20px;
		font-size: 20px
	}
	.remember {
		margin-top: 10px;
      margin-bottom: 20px
    }
</style>