<template>
    <div>
        <loading :isshow="showloading"></loading>
        <el-form :model="hotelForm" ref="hotelform">
            <el-form-item label="酒店名称">
                <el-input v-model="hotelForm.hname"></el-input>
            </el-form-item>
            <el-form-item label="酒店价钱">
                <el-input v-model="hotelForm.hprice"></el-input>
            </el-form-item>
            <el-form-item label="酒店所属类型">
                <el-select v-model="hotelForm.htype" placeholder="酒店类型">
                    <el-option label="豪华型" value="豪华型"></el-option>
                    <el-option label="经济型" value="经济型"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="酒店标签">
                <el-checkbox-group v-model="checkedlabel" size="small">
                    <el-checkbox v-for="(item,index) in hotellabel" :label="item" border :key="index"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="酒店评分">
                <el-input v-model="hotelForm.hscore"></el-input>
            </el-form-item>
            <el-form-item label="酒店缩略图">

            </el-form-item>
            <el-form-item>
                <el-upload
                        class="avatar-uploader"
                        :action="uploadurl"
                        :show-file-list="false"
                        :on-success="handleImgurlSuccess"
                        :before-upload="beforeImgurlUpload">
                    <img v-if="hotelForm.himgurl" :src="IMGURL+hotelForm.himgurl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    <div slot="tip" class="el-upload__tip" style="color: red">只能上传jpg/png/jpeg/webp文件，且不超过400kb,最佳比例1:1</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="酒店所在省份">
                <el-select v-model="hotelForm.hprovince">
                    <el-option v-for="(item,index) in province" :label="item" :value="item" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="酒店所在城市">
                <el-select v-model="hotelForm.hcity">
                    <el-option v-for="(item,index) in cityList" :label="item" :value="item" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="酒店所在区域">
                <el-select v-model="hotelForm.harea">
                    <el-option v-for="(item,index) in areaList" :label="item" :value="item" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="酒店详细地址">
                <el-input v-model="hotelForm.haddress"></el-input>
            </el-form-item>
            <el-form-item label="酒店详情">

            </el-form-item>
            <el-form-item>
<!--                <div id="hdetail" ref="hdetail">-->

<!--                </div>-->
                <rich-text @rich-change="setHnotice" formfield="hdetail"></rich-text>
            </el-form-item>
            <el-form-item label="酒店入住须知">

            </el-form-item>
            <el-form-item>
                <rich-text @rich-change="setHnotice" formfield="hnotice"></rich-text>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSubmit">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    // import E from "wangeditor";
    import RichText from "../../../components/rich-text/RichText";
    import {URL,SUCCESS,IMGURL} from "../../../lib/base";
    import loading from "../../../components/loading/loading";
    import city from "../../../lib/city.json";
    // import instance from "../../../http/http";

    console.log(city);

    export default {
        name: "Addhotelitem",
        components:{
            loading,
            RichText
        },
        data(){
            return {
                IMGURL,
                showloading:false,
                hotellabel:["干净卫生","有停车场","行李寄存","无线上网","靠近车站"],
                checkedlabel:[],
                hotelForm:{
                    hname:'',
                    hprice:'',
                    htype:'',
                    hlabel:"",
                    hscore:'',
                    himgurl:'',
                    hprovince:'',
                    hcity:'',
                    harea:'',
                    haddress:'',
                    hdetail:'',
                    hnotice:'',
                },
                uploadurl: URL+'admin/upload/index',
                city,
                province:[],
            }
        },
        computed:{
            cityList(){
                let cityList=[];
                let current =this.city.find(ele=>ele.name==this.hotelForm.hprovince);
                if(current){
                    cityList=current.city.map(ele=>ele.name);
                }
                return cityList;
            },
            areaList(){
                let areaList=[];
                let current =this.city.find(ele=>ele.name==this.hotelForm.hprovince);
                if(current){
                    let current2=current.city.find(ele=>ele.name==this.hotelForm.hcity);
                    if(current2){
                        areaList=current2.area;
                    }
                }
                return areaList;
            }
        },
        methods:{
            //缩略图上传成功
            handleImgurlSuccess(res){
                if(res.code===SUCCESS){
                    this.hotelForm.himgurl=res.imgurl;
                }

            },
            //缩略图上传前
            beforeImgurlUpload(file){
                let {size,type}=file;
                let uploadMaxSize=400*1024;
                let uploadType=['image/jpg','image/png','image/jpeg','image/webp'];
                let sizeFlag=true,typeFlag=true;
                sizeFlag=size < uploadMaxSize;
                typeFlag=uploadType.some(ele=>ele==type);
                if(!sizeFlag){
                    this.$message.error("图片大小不能超过400kb");
                }
                if(!typeFlag){
                    this.$message.error("图片格式必须是jpg,jpeg,png,webp");
                }
                return sizeFlag && typeFlag;
            },
            //获取省份
            setProvince(){
                this.province=this.city.map(ele=>ele.name);
            },
            setHnotice(field,html){
                this.hotelForm[field]=html;
            },
            handleSubmit(){
                this.showloading=true;
                let token=sessionStorage.getItem("token");
                let url=URL+'api/hotelItem';
                this.hotelForm.hlabel=this.checkedlabel.join(",");
                console.log(this.hotelForm);
                this.$http({
                    url:url,
                    method:'POST',
                    headers:{
                        token
                    },
                    data:this.hotelForm
                }).then(res=>{
                    this.showloading=false;
                    this.$message.success(res.data.msg);
                    // this.$route.push({path:""})
                }).catch(()=>{
                    this.$message.error("酒店插入失败");
                })

                // instance('api/hotelItem',this.hotelForm).then(res=>{
                //     if(res.data.code===SUCCESS){
                //         this.showloading=false;
                //         this.$message.success(res.data.msg);
                //     }
                // }).catch(()=>{
                //     this.$message.error("栏目插入失败");
                // })
            }
        },
        mounted() {
            this.setProvince();

        }

    }
</script>

<style>
    .el-icon-plus.avatar-uploader-icon{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .avatar-uploader{
        text-align: left;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;

    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .el-form-item__content{
        text-align: left;
    }
</style>

<style scoped>
    #hdetail{
        text-align: left;
    }


</style>