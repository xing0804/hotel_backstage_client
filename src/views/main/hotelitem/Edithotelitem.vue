<template>
    <div>
        <loading isshow="showloading"></loading>
        酒店编辑
    </div>
</template>

<script>
    import loading from "../../../components/loading/loading";
    export default {
        name: "Edithotelitem",
        components:{
            loading,
        },
        data(){
            return {
                showloading:false,

            }
        },
        methods:{
            // inithotelitem(hid){
            //     this.showloading=true;
            //
            // }
        },
        mounted() {
            let {hid}=this.$route.query;
            this.inithotelItem(hid);
        }
    }
</script>

<style scoped>

</style>