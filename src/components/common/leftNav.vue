<template>
    <div class="left-nav">
      <ul>
        <li>
            <i class="icon iconfont icon-zhuanshi"></i><br/>
            <div>砖石</div>
        </li>
        <li>
            <i class="icon iconfont icon-shouji"></i>
            <div>外卖</div>
        </li>
        <li>
            <i class="icon iconfont icon-icon-test"></i>
            <div>汉堡</div>
        </li>
        <li>
            <i class="icon iconfont icon-dianpu"></i>
            <div>店铺</div>
        </li>
        <li>
            <i class="icon iconfont icon-huiyuanqia"></i>
            <div>会员</div>
        </li>
        <li>
            <i class="icon iconfont icon-gongnengjianyi"></i>
            <div>建议</div>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    }
}
</script>

<style>
   .left-nav{
       color: #ffffff;
       font-size: 13px;
       height:100%;
       background-color: #1d8ce0;
       float: left;
       width: 5%;
   }
   .iconfont{
       font-size: 24px;
   }
   .left-nav ul{
       padding: 0px;
       margin: 0px;
   }
   .left-nav li{
       list-style: none;
       text-align: center;
       border-bottom: 1px solid #20a0ff;
       padding: 10px;
   }
    .left-nav li div{
        color: #ffffff;
    }
</style>
