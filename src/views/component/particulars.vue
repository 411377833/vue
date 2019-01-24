<template>
  <div>
    <div v-if="particular.id">
      <span class="name">id</span>
      {{particular.id}}
    </div>
    <div v-if="particular.creatorId">
      <span class="name">创建者id</span>
      {{particular.creatorId}}
    </div>
    <div v-if="particular.bannerDesc">
      <span class="name">banner描述</span>
      {{particular.bannerDesc}}
    </div>
    <div v-if="particular.title">
      <span class="name">标题</span>
      {{particular.title}}
    </div>
    <div v-if="particular.idCard">
      <span class="name">创建者id</span>
      {{particular.idCard}}
    </div>
    <div v-if="particular.gyItemId">
      <span class="name">关联的项目id</span>
      {{particular.gyItemId}}
    </div>
    <div v-if="particular.createTime"><span class="name">创建时间</span>{{particular.createTime}}</div>
    <div v-if="particular.lastUpdateTime"><span class="name">最后更新时间</span>{{particular.lastUpdateTime}}</div>
    <div v-if="particular.deleteFlag"><span class="name">删除标记</span>{{particular.deleteFlag}}</div>
    <div v-if="particular.displayName"><span class="name">名称</span>{{particular.displayName}}</div>
    <div v-if="particular.orgId"><span class="name">发起机构ID</span>{{particular.orgId}}</div>
    <div v-if="particular.initiatorId"><span class="name">发起人ID</span>{{particular.initiatorId}}</div>
    <div v-if="particular.recipientId"><span class="name">善款接受方ID</span>{{particular.recipientId}}</div>
    <div v-if="particular.mgrId"><span class="name">项目负责人ID</span>{{particular.mgrId}}</div>
    <div v-if="particular.tags"><span class="name">标签</span>{{particular.tags}}</div>
    <div v-if="particular.description"><span class="name">描述</span>{{particular.description}}</div>
    <div v-if="particular.signature"><span class="name">说明</span>{{particular.signature}}</div>
    <div v-if="particular.phone"><span class="name">联系方式</span>{{particular.phone}}</div>
    <div v-if="particular.userType"><span class="name">类型</span>{{particular.userType}}</div>
    <div v-if="particular.tips"><span class="name">透明度提示</span>{{particular.tips}}</div>
    <div v-if="particular.bannerType"><span class="name">类型</span>{{particular.bannerType}}</div>
    <div v-if="particular.projectId"><span class="name">关联的项目id</span>{{particular.projectId}}</div>
    <div v-if="particular.status"><span class="name">状态</span>{{particular.status}}</div>
    <div v-if="particular.targetMoney"><span class="name">目标善款金额</span>{{particular.targetMoney}}</div>
    <div v-if="particular.h5Id"><span class="name">图文详情</span>{{particular.h5Id}}</div>
    <div v-if="particular.transCount"><span class="name">转发次数</span>{{particular.transCount}}</div>
    <div v-if="particular.priority"><span class="name">优先级</span>{{particular.priority}}</div>
    
    <div v-if="particular.headImg"><span class="name img">图片</span><img :src="particular.headImg" alt></div>
    <div v-if="particular.bannerImg"><span class="name img">图片</span><img :src="particular.bannerImg" alt></div>
    <div v-if="particular.imgs"><span class="name img">轮播图</span><img :src="particular.imgs" alt></div>
    <div v-if="particular.url"><span class="name img">内容</span><img :src="particular.url" alt></div>
    <div v-if="particular.image"><span class="name img">内容</span><img :src="particular.image" alt></div>

  </div>
</template>
<style>
.name{
  display: inline-block;
  width: 120px;
  height: 30px;
  font-size: 16px;
  color: black;
  text-align:right;
  margin-right: 10px;
}
.img{
  vertical-align: top;
}
</style>
<script>
export default {
  props: ["particulars"],
  data() {
    return {
      particular: this.particulars
    };
  },
  methods: {
    //   catchData(value){
    //     console.log(value)
    //     this.content=value      //在这里接受子组件传过来的参数，赋值给data里的参数
    //   }
  },
  mounted() {
    console.log(this.particular);
  }
};
</script>