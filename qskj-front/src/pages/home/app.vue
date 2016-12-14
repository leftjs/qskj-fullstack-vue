<template>
  <div>
    <qs-nav :hasNoShadow="true"></qs-nav>
    <div class="tool wow slideInRight">
      <div class="inner">
        <div class="left">
          <el-button size='small'>概述</el-button>
        </div>
        <div class="right">
          <el-button type='primary' size='small'>加入购物车</el-button>
          <el-button type='danger' size='small'>立即购买</el-button>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="show1">
        <h1 class="wow fadeInDown">湛泸</h1>
        <p class="desc wow fadeInUp">给你一个全新的开始</p>
        <div class="images">
          <img src="src/images/home/home_product_4.png" class="img1 wow fadeInLeft">
          <img src="src/images/home/home_product_5.png" class="img2 wow fadeInRight">
        </div>
      </div>
      <div class="show2">
        <h1 class="wow fadeInLeftBig">湛泸</h1>
        <p class="desc wow fadeInRightBig">匠心独运，大道至简</p>
        <img class="wow fadeIn" src="src/images/home/home_product_6.png" >
      </div>
      <div class="show3">
        <div class="left">
          <h1 class="wow fadeInLeftBig"><span>湛</span>泸</h1>
          <p class="subtitle wow fadeInRightBig">匠心独运，大道至简</p>
          <p class="desc wow fadeInUpBig">湛泸启动系统适用于GY6-125款发动机，让您感受"其疾如风，其徐如林，不动如山，动若雷霆"的摩托车驾车体验。彰显自我从起步开始。</p>
          <p class="price wow fadeInDownBig"><span>260</span>元起</p>
        </div>
        <div class="right">
          <img class="img1 wow fadeInLeftBig" src="src/images/home/home_product_1.png">
          <img class="img2 wow fadeInUpBig" src="src/images/home/home_product_2.png">
          <img class="img3 wow fadeInRightBig" src="src/images/home/home_product_3.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Nav from 'src/components/nav'
  export default {
    name: 'app',
    methods: {
      handleClick() {
        this.$notify({
          title: 'it works',
          message: 'asdfasdf'
        })
      }
    },
    mounted() {
      new WOW().init()
    },
    components: {
      'qs-nav': Nav
    }
  };
</script>


<style scoped lang="less">
  .tool {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items:center;
    box-shadow: 1px 1px 5px lightgrey;
    .inner {
      flex-grow:1;
      max-width: 968px;
      padding: 5px 20px;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items:center;
    }
  }

  .show1 {
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;
    box-shadow: 1px 1px 5px lightgrey;
    padding-bottom: 10px;
    h1 {
      font-size: 60px;
      font-weight: 100;
      margin-bottom: 0;
    }
    .desc {
      font-size: 30px;
      color: dimgrey;
    }
    .images {
      width:100%;
      display: flex;
      flex-direction: row;
      justify-content:center;
      align-items:center;
      .img1 {
        width: 30%;
      }
      .img2 {
        margin-left: 20px;
        width: 30%
      }
    }
  }

  .show2{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 1px 1px 5px lightgrey;
    h1 {
      font-size: 60px;
      font-weight: 100;
      margin-bottom: 0;

    }
    .desc {
      font-size: 30px;
      color: dimgray;
    }
    img {
      width: 100%;
    }
  }

  .show3{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items:center;
    box-shadow: 1px 1px 5px lightgrey;
    .left {
      width: 30%;
      margin-right: 50px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      h1 {
        font-size: 50px;
        margin-bottom: 0;
        span {
          border-bottom: 4px solid dodgerblue;
        }

      }
      .subtitle {
        font-size: 30px;
        margin-bottom: 0;
        color: dimgray;
      }
      .desc {
        font-size: 18px;
      }
      .price {
        text-align: center;
        font-size: 16px;
        span {
          color: red;
          font-size: 30px;
        }
      }
    }
    .right{
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items:center;
      width: 40%;
      .img1 {
        width: 60%;
        align-self: flex-end;
      }
      .img2{
        width: 80%;
        align-self: flex-start;
      }
      .img3{
        width: 70%;
      }
    }
  }

</style>
