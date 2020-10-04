<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="6"><div class="grid-content bg-purple">
                <ve-line :data="chartData"></ve-line>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <ve-histogram :data="chartData2" :settings="chartSettings"></ve-histogram>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <ve-pie :data="chartData3"></ve-pie>
            </div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple">
                <ve-scatter :data="chartData4"></ve-scatter>
            </div></el-col>
        </el-row>
    </div>
</template>

<script>
    import VeLine from 'v-charts/lib/line.common';
    import VeHistogram from 'v-charts/lib/histogram.common'
    import VePie from 'v-charts/lib/pie.common'
    import VeScatter from 'v-charts/lib/scatter.common'

    export default {
        name: "vcharts",
        components:{
            VeLine,
            VeHistogram,
            VePie,
            VeScatter
        },
        data () {
            this.chartSettings = {
                axisSite: { right: ['下单率'] },
                yAxisType: ['KMB', 'percent'],
                yAxisName: ['数值', '比率'],
            }
            return {
                chartData: {
                    columns: ['日期', '访问用户', '下单用户'],
                    rows: [
                        { '日期': '2018-05-22', '访问用户': 32371, '下单用户': 19810 },
                        { '日期': '2018-05-23', '访问用户': 12328, '下单用户': 4398 },
                        { '日期': '2018-05-24', '访问用户': 92381, '下单用户': 52910 }
                    ]
                },
                chartData2: {
                    columns: ['日期', '访问用户', '下单用户', '下单率'],
                    rows: [
                        { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
                        { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
                        { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
                        { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
                        { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
                        { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
                    ]
                },
                chartData3: {
                    columns: ['日期', '访问用户'],
                    rows: [
                        { '日期': '1/1', '访问用户': 1393 },
                        { '日期': '1/2', '访问用户': 3530 },
                        { '日期': '1/3', '访问用户': 2923 },
                        { '日期': '1/4', '访问用户': 1723 },
                        { '日期': '1/5', '访问用户': 3792 },
                        { '日期': '1/6', '访问用户': 4593 }
                    ]
                },
                chartData4: {
                    columns: ['日期', '访问用户', '下单用户', '年龄'],
                    rows: [
                        { '日期': '1/1', '访问用户': 123, '年龄': 3, '下单用户': 1244 },
                        { '日期': '1/2', '访问用户': 1223, '年龄': 6, '下单用户': 2344 },
                        { '日期': '1/3', '访问用户': 7123, '年龄': 9, '下单用户': 3245 },
                        { '日期': '1/4', '访问用户': 4123, '年龄': 12, '下单用户': 4355 },
                        { '日期': '1/5', '访问用户': 3123, '年龄': 15, '下单用户': 4564 },
                        { '日期': '1/6', '访问用户': 2323, '年龄': 20, '下单用户': 6537 }
                    ]
                }
            }
        }
    }
</script>
<style>
    .el-row {
        margin-bottom: 20px;
    &:last-child {
         margin-bottom: 0;
     }
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>
<style scoped>

</style>