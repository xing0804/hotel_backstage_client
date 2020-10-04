<template>
    <div class="loading" v-show="isshow">
        <div class="loading-content">
            <div class="loading-item">
                <div class="loading-line"></div>
            </div>
            <div class="loading-item">
                <div class="loading-line"></div>
            </div>
            <div class="loading-item">
                <div class="loading-line"></div>
            </div>
            <div class="loading-item">
                <div class="loading-line"></div>
            </div>
            <div class="loading-item">
                <div class="loading-line"></div>
            </div>
            <div class="loading-item">
                <div class="loading-line"></div>
            </div>
            <div class="loading-item">
                <div class="loading-line"></div>
            </div>
            <div class="loading-item">
                <div class="loading-line"></div>
            </div>
            <div class="loading-item">
                <div class="loading-line"></div>
            </div>
            <div class="loading-item">
                <div class="loading-line"></div>
            </div>
            <div class="loading-item">
                <div class="loading-line"></div>
            </div>
            <div class="loading-item">
                <div class="loading-line"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "loading",
        props:{
            isshow:{
                type:Boolean,
                default:false,
            }
        }
    }
</script>

<style scoped>
    .loading{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        z-index: 999;
        background: rgba(0,0,0,.6);
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200px;
        height: 200px;
    }
    .loading > .loading-content{
        position: relative;
        width: 100px;
        height: 100px;
    }
    .loading-item{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }

    .loading-item > .loading-line{
        position: absolute;
        top: 0;
        left: 49px;
        width: 2px;
        height: 25px;
        background: #409eff;
        animation: loading 1.2s infinite linear;
    }
    .loading-item:nth-child(1){
        transform: rotateZ(0deg);
    }
    .loading-item:nth-child(2){
        transform: rotateZ(30deg);
    }
    .loading-item:nth-child(3){
        transform: rotateZ(60deg);
    }
    .loading-item:nth-child(4){
        transform: rotateZ(90deg);
    }
    .loading-item:nth-child(5){
        transform: rotateZ(120deg);
    }
    .loading-item:nth-child(6){
        transform: rotateZ(150deg);
    }
    .loading-item:nth-child(7){
        transform: rotateZ(180deg);
    }
    .loading-item:nth-child(8){
        transform: rotateZ(210deg);
    }
    .loading-item:nth-child(9){
        transform: rotateZ(240deg);
    }
    .loading-item:nth-child(10){
        transform: rotateZ(270deg);
    }
    .loading-item:nth-child(11){
        transform: rotateZ(300deg);
    }
    .loading-item:nth-child(12){
        transform: rotateZ(330deg);
    }

    .loading-item:nth-child(1) > .loading-line{
        animation-delay: 100ms;
    }
    .loading-item:nth-child(2) > .loading-line{
        animation-delay: 200ms;
    }
    .loading-item:nth-child(3) > .loading-line{
        animation-delay: 300ms;
    }
    .loading-item:nth-child(4) > .loading-line{
        animation-delay: 400ms;
    }
    .loading-item:nth-child(5) > .loading-line{
        animation-delay: 500ms;
    }
    .loading-item:nth-child(6) > .loading-line{
        animation-delay: 600ms;
    }
    .loading-item:nth-child(7) > .loading-line{
        animation-delay: 700ms;
    }
    .loading-item:nth-child(8) > .loading-line{
        animation-delay: 800ms;
    }
    .loading-item:nth-child(9) > .loading-line{
        animation-delay: 900ms;
    }
    .loading-item:nth-child(10) > .loading-line{
        animation-delay: 1000ms;
    }
    .loading-item:nth-child(11) > .loading-line{
        animation-delay: 1100ms;
    }
    .loading-item:nth-child(12) > .loading-line{
        animation-delay: 1200ms;
    }

    @keyframes loading {
        from{
            opacity: 0;
        }
        to{
            opacity: 1;
        }
    }

</style>