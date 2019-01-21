<template>
  	<div>
        <div v-if="particular.id"><span>id</span>{{particular.id}}</div>
        <div><span>创建时间</span>{{particular.createTime}}</div>
        <div>{{particular.lastUpdateTime}}</div>
        <div>{{particular.deleteFlag}}</div>
        <div>{{particular.displayName}}</div>
        <div>{{particular.signature}}</div>
        <div>{{particular.phone}}</div>
        <div>{{particular.userType}}</div>
        <img :src="particular.headImg" alt="">
    </div>
</template>
<style>

</style>
<script>
  export default {
    props:['particulars'],
    data(){
      return{
        particular:this.particulars
      }
    },
    methods:{
    //   catchData(value){
    //     console.log(value)
    //     this.content=value      //在这里接受子组件传过来的参数，赋值给data里的参数
    //   }
    },mounted() {
    console.log(this.particular)
  },
  }
</script>