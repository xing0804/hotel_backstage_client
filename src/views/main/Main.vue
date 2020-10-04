<template>
    <el-container class="main-box">
        <el-header>
            <img src="../../assets/logo.png" alt="">
            <el-menu mode="horizontal" :default-active="activeIndex" class="el-menu-demo" style="background: none" text-color="#fff"  active-text-color="#ffd04b" background-color="#545c64">
                <el-menu-item index="1">管理中心</el-menu-item>
                <el-submenu index="2">
                    <template slot="title">我的工作台</template>
                    <el-menu-item index="2-1">选项1</el-menu-item>
                    <el-menu-item index="2-2">选项2</el-menu-item>
                    <el-menu-item index="2-3">选项3</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu default-active="1">
                    <el-submenu index="1" class="el-menu-vertical-demo">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>分类管理</span>
                        </template>
                        <el-menu-item index="1-1">
                            <router-link to="/categoryAdd">分类添加</router-link>
                        </el-menu-item>
                        <el-menu-item index="1-2">
                            <router-link to="/categoryShow">分类查看</router-link>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="2" class="el-menu-vertical-demo">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>酒店管理</span>
                        </template>
                        <el-menu-item index="2-1">
                            <router-link to="/hotelitemAdd">酒店添加</router-link>
                        </el-menu-item>
                        <el-menu-item index="2-2">
                            <router-link to="/hotelitemShow">酒店查看</router-link>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-container>
<!--                <el-main>-->
<!--                    <router-view></router-view>-->
<!--                </el-main>-->
                <el-scrollbar :style="{height: windowHeight,width: '100%'}">
                    <el-main>
                        <router-view></router-view>
                    </el-main>
                </el-scrollbar>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "Main",
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1',
                windowHeight: '700px',
            };
        },

    }
</script>


<style scoped>
    .main-box{
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
    }
    .el-header {
        background-color: #545C64;
        color: #333;
        line-height: 100px;
    }
    .el-header img{
        height: 50px;
        width: 50px;
        margin-left: 50px;
    }

    .el-aside {
        background-color: #fff;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }
    .el-menu-demo{
        float: right;

    }
    .el-menu--horizontal>.el-menu-item.is-active{
        border-bottom: 2px solid #FFD04B;
        color: #FFD04B;
    }
    .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover{
        background: #434A50;
    }
    .el-menu--horizontal .el-menu-item:not(.is-disabled):hover{
        color: #FFD04B;
    }
</style>