<template>
    <div class="pos">
        <el-row>
            <!-- 这里是订单栏目 -->
            <el-col :span="7" class="pos-order" id="order-list">
                <el-tabs class="buyMude">
                    <el-tab-pane label="点餐">
                        <el-table :data="tableData" border style="width:100%;">
                            <el-table-column prop="goodsName" label="商品名称"></el-table-column>
                            <el-table-column prop="count" label="量"></el-table-column>
                            <el-table-column prop="price" label="金额"></el-table-column>
                            <el-table-column label="操作" fixed="right" width="90">
                                <template slot-scope="scope">
                                      <el-button type="text" size="small" @click="delSingleGoods(scope.row)">删除</el-button>
                                      <el-button type="text" size="small" @click="addOrderlist(scope.row)">增加</el-button>
                                </template>    
                            </el-table-column>
                        </el-table>
                        <div class="totalDiv">
                           <small> 数量：</small> {{totalCount}}&nbsp;&nbsp;&nbsp;<small>金额 ：</small>{{totalMoney}}元 &nbsp;
                        </div>
                        <!-- 下面的按钮 -->
                        <div class="div-btn">   
                            <el-button type="primary">挂单</el-button>
                            <el-button type="danger" @click="delAllGoods()">删除</el-button>
                            <el-button type="success" @click="checkout()">结账</el-button>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="挂单">
                        挂单
                    </el-tab-pane>
                    <el-tab-pane label="外卖">
                        外卖
                    </el-tab-pane>
                </el-tabs>
            </el-col>
            <!-- 这里是产品栏 -->
            <el-col :span="17">
                <!-- 这里是常用商品 -->
                <div class="often-goods">
                    <div class="title">常用商品</div>
                    <div class="often-goods-list">
                        <ul>
                            <li v-for="(item,index) in oftenGoods" :key="index" @click="addOrderlist(item)">
                                <!-- <span>{{item.goodsId}}</span> -->
                                <span>{{item.goodsName}}</span>
                                <span class="o-price">$:{{item.price}}元</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- 套餐  -->
                <div class="goods-type">
                    <el-tabs>
                        <el-tab-pane label="汉堡">
                           <ul class="cookList" v-for="(item,index) in  type0Goods" :key="index">
                               <li @click="addOrderlist(item)">
                                   <span class="foodImg"><img :src="item.goodsImg" alt=""></span>
                                   <span class="foodName">{{item.goodsName}}</span>
                                   <span class="foodPrice">￥{{item.price}}元</span>
                               </li>
                           </ul>
                        </el-tab-pane>
                         <el-tab-pane label="小食">
                            <ul class="cookList" v-for="(item,index) in  type1Goods" :key="index">
                               <li @click="addOrderlist(item)">
                                   <span class="foodImg"><img :src="item.goodsImg" alt=""></span>
                                   <span class="foodName">{{item.goodsName}}</span>
                                   <span class="foodPrice">￥{{item.price}}元</span>
                               </li>
                           </ul>
                        </el-tab-pane>
                         <el-tab-pane label="饮料">
                            <ul class="cookList" v-for="(item,index) in  type2Goods" :key="index">
                               <li @click="addOrderlist(item)"> 
                                   <span class="foodImg"><img :src="item.goodsImg" alt=""></span>
                                   <span class="foodName">{{item.goodsName}}</span>
                                   <span class="foodPrice">￥{{item.price}}元</span>
                               </li>
                           </ul>
                        </el-tab-pane>
                        <el-tab-pane label="套餐">
                            <ul class="cookList" v-for="(item,index) in  type3Goods" :key="index">
                               <li @click="addOrderlist(item)">
                                   <span class="foodImg"><img :src="item.goodsImg" alt=""></span>
                                   <span class="foodName">{{item.goodsName}}</span>
                                   <span class="foodPrice">￥{{item.price}}元</span>
                               </li>
                           </ul>
                        </el-tab-pane>
                    </el-tabs>
                </div>  
            </el-col>
        </el-row>
       
       
    </div>
</template>

<script>
import axios from 'axios';
import { error } from 'util';
import { constants } from 'fs';
export default {
    data(){
        return{
            tableData:[],
            oftenGoods:[],
            // 套餐
            type0Goods:[],
            type1Goods:[],
            type2Goods:[],
            type3Goods:[],
            totalMoney:0,
            totalCount:0


        }
    },
    created(){
        axios.get('https://www.easy-mock.com/mock/5b8b30dbf032f03c5e71de7f/kuaican/oftenGoods')
            .then(response=>{
                if(response.status == 200){
                    this.oftenGoods = response.data
                }
            })
            .catch(error=>{
                console.log(error)
                alert('网络错误')
            })
         axios.get('https://www.easy-mock.com/mock/5b8b30dbf032f03c5e71de7f/kuaican/typeGoods')
            .then(response=>{
                if(response.status == 200){
                    this.type0Goods = response.data[0];
                    this.type1Goods = response.data[1];
                    this.type2Goods = response.data[2];
                    this.type3Goods = response.data[3];
                }
            })
            .catch(error=>{
                console.log(error)
                alert('网络错误')
            })
    },
    mounted(){
        let orderHeight = document.body.clientHeight;
        document.getElementById('order-list').style.height = orderHeight + 'px';
    },
    methods:{
        addOrderlist(goods){
               this.totalMoney = 0;
               this.totalCount = 0;
            // 商品是否已经存在列表之中
            let isHave = false;
            for(let i=0;i<this.tableData.length;i++){
                if(this.tableData[i].goodsId == goods.goodsId){
                    isHave = true;
                }
            }
            //根据判断编写业务逻辑
            if(isHave){
                let arr = this.tableData.filter(o => o.goodsId == goods.goodsId);
                arr[0].count++
            }else{
                let newGoods = {goodsId:goods.goodsId,goodsName:goods.goodsName,price:goods.price,count:1}
                this.tableData.push(newGoods)
            }
            //计算汇总
            this.tableData.forEach((element)=>{
                this.totalCount+=element.count;
                this.totalMoney = this.totalMoney+(element.price * element.count);
            })
           
        },
        // 删除单个的商品
        delSingleGoods(goods){
            this.tableData = this.tableData.filter(o=>o.goodsId !=goods.goodsId)
            this.getAllMoney()
        },
        getAllMoney(){
            this.totalCount=0;
            this.totalMoney=0;
            if(this.tableData){
                    this.tableData.forEach((element) => {
                this.totalCount+=element.count;
                this.totalMoney=this.totalMoney+(element.price*element.count);   
            });
            }
            
        },
        // 删除所有商品
        delAllGoods(goods){
            this.tableData = [];
            this.totalMoney = 0;
            this.totalCount = 0;

        },
        // 结账的模拟
        checkout(){
            if(this.tableData!=0){
                this.tableData = [];
                this.totalCount = 0;
                this.totalMoney = 0;
                this.$message({
                    message:'结账成功，感谢你',
                    type:'success'
                })
            }else{
                this.$message({
                    message:'结账失败，不能空结，或联系管理员',
                    type:'error'
                })
            }
        }
    }    
}

</script>

<style scoped>
  .pos-order{
      background-color: #f9fafc;
      border-right: 1px solid #c0ccda;
  }
  .buyMude{
      padding-left: 10px;
  }
  .div-btn{
      margin-top: 20px;
  }
  .title{
      height:20px;
      border-bottom: 1px solid #d3dce6;
      background-color: #f9fafc;
      padding: 9.5px;
      text-align: left;
  }
  .often-goods-list ul li{
      list-style: none;
      background-color: #f9fafc;
      float: left;
      padding: 10px;
      margin: 10px;
      color: #3f4c58;
      border: 1px solid #b3bdbd;
  }
  .o-price{
      color: #ef6613;
  }
  .goods-type{
      clear: both;
      padding-left:10px;
  }
  .cookList{
      list-style: none;
  }
  .cookList li{
      float: left;
      padding: 10px;
      margin: 10px;
      border:1px solid #b3bdbd;
  }
  .foodPrice{
       color: #ef6613;
  }
  .foodName{
      color: #3f4c58;
  }
  .totalDiv{
      background-color: #fff;
      padding: 10px;
      border-bottom: 1px solid #d4dadc;
      text-align: center;
  }
</style>
