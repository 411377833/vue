<template>
	<div id="father">
        <div class="title">
            <div style="width:80px;">标题名：</div>
            <el-input style="width:300px;" size='small' v-model="inputTitle" placeholder="请输入标题"></el-input>
        </div>
        <wangeditor :catchData="catchData" :editDatas="editData"></wangeditor>
        <div style="text-align: center;margin-top:20px;">
            <el-button type="primary" @click="saves">保存</el-button>
        </div>
    </div>
</template>
<style>
    .title{
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }
</style>
<script>
  import wangeditor from './wangeditor.vue'
  import {addH5} from "../../api/api";
  export default {
    props:['callback','editData'],
    data(){
      return{
        content:"",
        inputTitle:this.editData.title,
        editDatas:this.editData
      }
    },
    
    methods:{
      catchData(value){
        console.log(this)
        console.log(this.editData)
        this.content=value      //在这里接受子组件传过来的参数，赋值给data里的参数
      },
      saves(){
          console.log(this.inputTitle)
          console.log(this.content)
          let _this = this
          addH5({
              token: sessionStorage.getItem("token"),
              title:this.inputTitle,
              content:this.content
          }).then((res)=>{
              if(res.code===1){
                  _this.callback()
              }else{
                this.$message({
                    message: res.message,
                    type: "error"
                });
              }
          })
      }
    },
    components: {
      wangeditor
    },
  }
</script>