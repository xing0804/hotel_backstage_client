<template>
    <div>
        <loading :isshow="showloading"></loading>
        <el-form>
            <el-form-item>
                <el-input placeholder="请输入分类名称" style="width: 200px;margin-right: 30px" v-model="search.cname"></el-input>
                <el-button type="primary" @click="handlerSearch">搜索</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="categories" stripe>
            <el-table-column prop="cid" label="ID"></el-table-column>
            <el-table-column prop="cname" label="分类名称"></el-table-column>
            <el-table-column prop="cdesc" label="分类描述"></el-table-column>
            <el-table-column label="操作" fixed="right">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handlerEdit(scope.row.cid)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="handleDelete(scope.row.cid)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="paginate">
            <el-pagination @current-change="handleCurrentChange" :page-size="paginate.limit" layout="total,  prev, pager, next, jumper" :total="count" :current-page="paginate.page">
            </el-pagination>
        </div>
    </div>

</template>

<script>
    import {URL,SUCCESS} from "../../../lib/base";
    import axios from "axios";
    import loading from "../../../components/loading/loading";

    export default {
        name: "ShowCategory",
        components:{
            loading
        },
        data(){
            return {
                showloading:false,
                //搜索条件
                search:{cname:''},
                //分页
                paginate:{
                    page:1,
                    limit:3,
                },
                categories:[],
                count:0,
            }
        },
        methods:{
            initCategory(){
                this.showloading=true;
                let url=URL+'admin/Category/show';
                let token=sessionStorage.getItem('token');
                let params=Object.assign({},this.paginate,this.search);
                axios({
                    method:'GET',
                    url,
                    headers:{
                        token
                    },
                    params,
                }).then(res=>{

                    if(res.status===200 && res.data.code==SUCCESS){
                        this.showloading=false;
                        if(res.data.data){
                            this.categories=res.data.data;
                            this.count=res.data.count;
                        }else {
                            this.$message.info(res.data.msg);
                        }
                    }
                }).catch(()=>{
                    this.$message.error("栏目查询失败");
                })
            },
            handleCurrentChange(val){
                this.paginate.page=val;
                this.initCategory();
            },
            handlerSearch(){
                this.paginate.page=1;
                this.initCategory();
            },
            handleDelete(cid){
                console.log(cid);
                this.showloading=true;
                let url=URL+'admin/Category/delete';
                let token=sessionStorage.getItem('token');
                axios({
                    url,
                    data:{cid},
                    method: "DELETE",
                    headers:{
                        token
                    }
                }).then((res)=>{
                    if(res.status===200 && res.data.code===SUCCESS){
                        this.showloading=false;
                        this.$message.success("栏目删除成功！");
                        this.initCategory();
                    }
                }).catch(()=>{
                    this.$message.error("栏目删除失败！")
                })
            },
            handlerEdit(cid){
                console.log(cid);
                this.$router.push({path:'/categoryEdit',query:{cid}})
            }
        },
        mounted() {
            this.initCategory();
        }
    }
</script>
<style>
    .el-main{
        line-height: 0 !important;
    }
</style>
<style scoped>
    .paginate{
        margin-top: 20px;
    }
    .el-form-item{
        text-align: left;
    }
</style>