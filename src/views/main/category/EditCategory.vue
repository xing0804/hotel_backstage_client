<template>
    <div v-if="category">
        <loading :isshow="showloading"></loading>
        <el-form :model="category" :rules="categoryRulrs" ref="categoryForm">
            <el-form-item label="分类名称" prop="cname">
                <el-input v-model="category.cname" placeholder="请输入分类的名称"></el-input>
            </el-form-item>
            <el-form-item label="分类描述" prop="cdesc">
                <el-input v-model="category.cdesc" placeholder="请输入分类的描述"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handlerSubmit">
                    修改
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {URL,SUCCESS} from "../../../lib/base";
    import axios from "axios";
    import loading from "../../../components/loading/loading";

    /*
    *1. 编辑的是哪条数据：show==>edit(query)
    *2. 获取当前编辑的数据，从当前呗激活的路由query获取cid
    * 3. 给后台发送请求
     */

    export default {
        name: "EditCategory",
        components:{
            loading
        },
        data(){
            let validateCname=(rule,value,callback)=>{
                if(value===''){
                    callback(new Error('分类的名称不能为空'));
                }else if(!(/[\u4e00-\u9fa5]{2,6}/.test(value))){
                    callback(new Error('分类只能为2-6个汉字'))
                }else {
                    callback();
                }
            };
            return {
                showloading:false,
                category:null,
                categoryRulrs:{
                    cname:[
                        {validator:validateCname,trigger:'blur'}
                    ],
                    cdesc:[
                        { required: true, message: '请输入栏目描述', trigger: 'blur' },
                        { min: 3, max: 20, message: '长度在 3 到 20个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            handlerSubmit(){
                this.showloading=true;
                let token=sessionStorage.getItem("token");
                this.$refs.categoryForm.validate(valid=>{
                    if(valid){
                        let url=URL+'admin/Category/edit';
                        axios({
                            url,
                            method:'PUT',
                            data:this.category,
                            headers:{
                                token
                            }
                        }).then(res=>{
                            if(res.status===200 && res.data.code==SUCCESS){
                                this.showloading=false;
                                this.$message.success("栏目修改成功！");
                                this.$router.push({path:'/categoryShow'});
                            }
                        }).catch(()=>{
                            this.$message.error("栏目修改失败");
                        })
                    }
                })
            },
            init_Category(cid){
                this.showloading=true;
                let url=URL+'admin/category/read';
                let token=sessionStorage.getItem('token');
                axios({
                    method: 'GET',
                    url,
                    params:{cid},
                    headers:{
                        token,
                    }
                }).then(res=>{
                    if(res.status === 200 && res.data.code === SUCCESS){
                        this.showloading=false;
                        if(res.data.data){
                            this.category=res.data.data;
                        }else{
                            this.$message.error(res.data.msg);
                        }
                    }
                }).catch(()=>{

                })
            }
        },
        mounted() {
            let {cid}=this.$route.query;
            this.init_Category(cid)
        }
    }
</script>

<style scoped>

</style>