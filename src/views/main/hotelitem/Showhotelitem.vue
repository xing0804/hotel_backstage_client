<template>
    <div>
        <loading :isshow="showloading"></loading>
        <el-form inline :model="search">
            <el-form-item label="酒店所属类型">
                <el-select v-model="search.htype" placeholder="酒店类型">
                    <el-option label="豪华型" value="haohua"></el-option>
                    <el-option label="经济型" value="jingji"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="酒店名称">
                <el-input v-model="search.hname"></el-input>
            </el-form-item>
            <el-form-item label="酒店所在城市">
                <el-input v-model="search.hcity"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">提交</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="hotelItem">
            <el-table-column label="ID" prop="hid"></el-table-column>
            <el-table-column label="酒店名称" prop="hname"></el-table-column>
            <el-table-column label="酒店价格" prop="hprice"></el-table-column>
            <el-table-column label="酒店评分" prop="hscore"></el-table-column>
            <el-table-column label="酒店类型" prop="htype"></el-table-column>
            <el-table-column label="酒店地址">
                <template slot-scope="scope">
                    <span>{{scope.row.hprovince}}{{scope.row.hcity}}{{scope.row.haddress}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handlerEdit(scope.row)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import loading from "../../../components/loading/loading";
    import instance from "../../../http/http";
    export default {
        name: "Showhotelitem",
        components:{
          loading
        },
        data(){
            return {
                search:{htype:'',hname:'',hcity:''},
                paginate:{limit:5,page:1},
                hotelItem:[],
                showloading:false,
                total:0
            }
        },
        methods:{
            inithotelItem(){
                let that=this;
                that.showloading=true;
                let params=Object.assign({},this.search,this.paginate);
                instance.get('api/hotelItem',{
                    params,
                }).then(res=>{
                    if(res.data){
                        that.hotelItem=res.data;
                        that.total=res.total;
                    }else{
                        that.$message.success("暂无数据");
                    }
                    that.showloading=false;

                }).catch(()=>{

                })
            },
            handlerEdit(row){
                console.log(row);
                let hid=row.hid;
                this.$router.push({path:'/hotelitemEdit',query:{hid}})
            },
            handleDelete(row){
                console.log(row);
            }
        },
        mounted() {
            this.inithotelItem();
        }
    }
</script>

<style scoped>

</style>