<template>
  <div>
    <div v-if="particular.bannerDesc">
      <span class="name">轮播图描述</span>
      {{particular.bannerDesc}}
    </div>
    <div v-if="particular.title">
      <span class="name">标题</span>
      {{particular.title}}
    </div>

    <div v-if="particular.userName">
      <span class="name">姓名</span>
      {{particular.userName}}
    </div>
    <div v-if="particular.userPhone">
      <span class="name">联系电话</span>
      {{particular.userPhone}}
    </div>
    <div v-if="particular.content">
      <span class="name">证实内容</span>
      {{particular.content}}
    </div>
    <div v-if="particular.relation">
      <span class="name">与受款人关系</span>
      {{particular.relation}}
    </div>
    
    <div v-if="particular.displayName">
      <span class="name">名称</span>
      {{particular.displayName}}
    </div>
    
    <div v-if="particular.tags">
      <span class="name">标签</span>
      {{particular.tags}}
    </div>
    <div v-if="particular.description">
      <span class="name">描述</span>
      {{particular.description}}
    </div>
    <div v-if="particular.signature">
      <span class="name">说明</span>
      {{particular.signature}}
    </div>
    <div v-if="particular.cateList">
      <span class="name">分类</span>
      <span v-for="item in particular.cateList"> 
        {{item.cateName}}
      </span>
    </div>
    <div v-if="particular.phone">
      <span class="name">联系方式</span>
      {{particular.phone}}
    </div>
    <div v-if="particular.userType">
      <span class="name">类型</span>
      {{particular.userType}}
    </div>
    <div v-if="particular.tips">
      <span class="name">透明度提示</span>
      {{particular.tips}}
    </div>
    <div v-if="particular.bannerType">
      <span class="name">类型</span>
      {{particular.bannerType}}
    </div>
    <!-- <div v-if="particular.projectId"><span class="name">关联的项目id</span>{{particular.projectId}}</div> -->
    <div v-if="particular.status">
      <span class="name">状态</span>
      {{particular.status}}
    </div>
    <div v-if="particular.targetMoney">
      <span class="name">目标善款金额</span>
      {{particular.targetMoney}}
    </div>
    <!-- <div v-if="particular.h5Id"><span class="name">图文详情</span>{{particular.h5Id}}</div> -->
    <div v-if="particular.transCount">
      <span class="name">转发次数</span>
      {{particular.transCount}}
    </div>
    <div v-if="particular.priority">
      <span class="name">优先级</span>
      {{particular.priority}}
    </div>
    <div v-if="particular.orderNum">
      <span class="name">订单编号</span>
      {{particular.orderNum}}
    </div>
    <div v-if="particular.orderStatus">
      <span class="name">支付状态</span>
      {{particular.orderStatus}}
    </div>
    <div v-if="particular.donationTotal">
      <span class="name">总捐款数</span>
      {{particular.donationTotal}}
    </div>
    <div v-if="particular.donationCash">
      <span class="name">现金捐款数</span>
      {{particular.donationCash}}
    </div>
    <div v-if="particular.donationFlower">
      <span class="name">小红花捐款数</span>
      {{particular.donationFlower}}
    </div>
    <div v-if="particular.itemTitle">
      <span class="name">公益项目</span>
      {{particular.itemTitle}}
    </div>

    <div v-if="particular.headImg" style="display:flex">
      <span class="name img">头像</span>
      <img :src="particular.headImg" class="avatar">
    </div>
    <div v-if="particular.bannerImg" style="display:flex">
      <span class="name img">轮播图</span>
      <img :src="particular.bannerImg" class="avatar">
    </div>
    <div v-if="particular.imgs" style="display:flex">
      <span class="name img">头像</span>
      <img :src="particular.imgs" class="avatar">
    </div>
    <div v-if="particular.url" style="display:flex">
      <span class="name img">内容</span>
      <img :src="particular.url" class="avatar">
    </div>
    <div v-if="particular.image" style="display:flex">
      <span class="name img">图片</span>
      <img :src="particular.image" class="avatar">
    </div>
    <div v-if="particular.htmlUrl" style="display:flex">
      <span class="name img">内容</span>
      <div v-html="particular.htmlUrl">
        {{particular.htmlUrl}}
      </div>
    </div>
    <div v-if="particular.transCount">
      <span class="name">转发次数</span>
      {{particular.transCount}}
    </div>
    
  </div>
</template>
<style>
.name {
  display: inline-block;
  width: 120px;
  height: 34px;
  font-size: 12px;
  color: #999;
  text-align: left;
  margin-right: 10px;
  line-height: 34px;
  margin-left: 30px;
  letter-spacing: 4px;
}
.img {
  vertical-align: top;
}
.avatar {
  width: 178px;
  height: 178px;
  display: inline-block;
}
</style>
<script>
// import { getProject } from "../../api/api";

export default {
  props: ["particulars"],
  data() {
    return {
      particular: this.particulars,
    };
  },
  methods: {
    
  },
  mounted() {
    
  },
  watch: {
    particulars: {
      handler(newValue, oldValue) {
        this.particular = newValue;
        console.log(newValue);
      },
      deep: true
    }
  }
};
</script>