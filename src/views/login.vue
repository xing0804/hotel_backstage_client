<template>
    <div class="login">
        <div class="login-content">
            <el-form :model="loginForm" label-width="80px" :rules="rules" ref="loginForm">
                <el-form-item label="用户名：" prop="username" class="item">
                    <el-input v-model="loginForm.username" class="item_input" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密    码：" prop="password" class="item">
                    <el-input type="password" v-model="loginForm.password" class="item_input"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click.prevent="handleLogin">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    /*
    * 1. 表单验证
    * 2. fetch axios
     */
    import axios from "axios";
    import {SUCCESS,URL} from "../lib/base";

    export default {
        name: "login",
        data(){
            return {
                loginForm:{
                    username:'',
                    password:''
                },
                rules:{
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
                    ],
                    password:[
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            handleLogin(){
                this.$refs.loginForm.validate((valid)=>{
                    if (valid) {
                        let that=this;
                        /*
                        * 解决跨域
                        * 1. 代理（前端）
                        * 2. 服务器端
                        * 3. jsonp（前端）
                         */
                        let url=URL+'admin/Login/check';
                        axios.post(url,this.loginForm).then(function (res) {
                            // console.log(res);
                            if(res.status===200 && res.data.code===SUCCESS) {
                                sessionStorage.setItem('token', res.data.token);
                                //从哪来回哪去
                                let redirect = that.$route.query.redirect || 'index';
                                that.$router.push({name: redirect})
                            }else {
                                // that.$message.error(res.data.msg);
                                that.$message.error("账号或密码错误");
                            }
                        }).catch(function (error) {
                            console.log(error);
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },

    }
</script>

<style>
    .item .el-form-item__label{
        color: #ffffff;
    }
    .item_input input.el-input__inner{
        background: rgba(0,0,0,.2);
    }
</style>

<style scoped>
    .login{
        background-image: url("../assets/背景.jpg");
        background-size: cover;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;

    }
    .login-content{
        position: absolute;
        top: -300px;
        right: 0;
        bottom: 0;
        left: 600px;
        margin: auto;
        width: 400px;
        height: 165px;
        background: rgba(0,0,0,.2);
        border-radius: 20px;
        padding: 30px 20px;
    }
    el-form-item{
        color: #fff;
    }
</style>