<template>
	<div id="father">
    <wangeditor :catchData="catchData"></wangeditor>
  </div>
</template>
<style>

</style>
<script>
  // import wangeditor from './wangeditor.vue'
  export default {
    data(){
      return{
        content:""
      }
    },
    methods:{
      catchData(value){
        console.log(value)
        this.content=value      //在这里接受子组件传过来的参数，赋值给data里的参数
      }
    },
    // components: {
    //   wangeditor
    // },
  }
</script>