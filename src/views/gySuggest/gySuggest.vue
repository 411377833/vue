<template>
  <section class="benefit">
    
    <el-table :data="tableData" highlight-current-row v-loading="listLoading" style="width: 100%;">
      
      <el-table-column prop="displayName" label="昵称" width="300"></el-table-column>
      <el-table-column prop="content" label="内容" min-width="180"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" min-width="120"></el-table-column>


      
     
    </el-table>
    <!--工具条-->
    <el-col :span="24" class="toolbar" v-if="total">
      <!-- <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button> -->
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="10"
        :total="total"
        style="float:right;"
      ></el-pagination>
    </el-col>

  </section>
</template>

<script>
import { listGy_suggest} from "../../api/api";
import particulars from '../component/particulars'

export default {//editForm.headImg
  data() {
    return {
      page: 1,
      filters: {
        displayName: ""
      },
      dialogVisible:false,
    //   abc:{
    //     token:sessionStorage.getItem("token")
    //   },
      detailsVisible:false,
        imageUrl: '',
    //   headImg:"",
      total: 0,
      tableData: [],
      listLoading: false,
      particulars:{},
      //新增界面数据
    //   addForm: {
    //     idCard: "",
    //     displayName: "",
    //     signature: "",
    //     headImg:''
    //   },
      //编辑界面数据
    //   editForm: {
    //     idCard: "",
    //     displayName: "",
    //     signature: "",
    //     headImg:''
    //   },
    //   addFormVisible: false, //新增界面是否显示
    //   addLoading: false,
    //   editFormVisible: false, //编辑界面是否显示
    //   editLoading: false,
    //   addFormRules: {
    //     idCard: [
    //       { required: true, message: "请输入机构代码", trigger: "blur" }
    //     ],
    //     displayName: [
    //       { required: true, message: "请输入机构名称", trigger: "blur" }
    //     ],
    //     signature: [
    //       { required: true, message: "请填写机构说明", trigger: "blur" }
    //     ]
        // headImg:[
        //     {required: true, message: "请上传机构头像", trigger: "blur"}
        // ]
    //   },
    //   editFormRules: {
    //     idCard: [
    //       { required: true, message: "请输入机构代码", trigger: "blur" }
    //     ],
    //     displayName: [
    //       { required: true, message: "请输入机构名称", trigger: "blur" }
    //     ],
    //     signature: [
    //       { required: true, message: "请填写机构说明", trigger: "blur" }
    //     ]
    //   },
    //   addHeadImg:"",
    //   editHeadImg:''
      
    };
  },
  methods: {
    // queryListGy_suggest() {
    //   let _this = this;
    //   if (_this.filters.id) {
    //     listGy_suggest({
    //       token: sessionStorage.getItem("token"),
    //       displayName: _this.filters.id,
    //       pageNum: this.page,
    //       pageSize: 10
    //     }).then(res => {
    //       console.log(res);
    //       if (res.code === 1) {
    //          _this.tableData = res.data.data;
    //         _this.total = res.data.total;
    //       } else {
    //         this.$message({
    //           message: res.message,
    //           type: "error"
    //         });
    //       }
    //     });
    //   } else {
    //     _this.listGy_suggest();
    //   }
    // },
    // 列表
    listGy_suggest() {
      let _this = this;
      listGy_suggest({
        token: sessionStorage.getItem("token"),
        pageNum: this.page,
        pageSize: 10,
        // title: "",
        // description: ""
      }).then(res => {
        console.log(res);
        if (res.code === 1) {
          _this.tableData = res.data.data;
          _this.total = res.data.total;
        } else {
          this.$message({
            message: res.message,
            type: "error"
          });
        }
      });
    },
    //删除
    // handleDel: function(index, row) {
    //   let _this = this;
    //   this.$confirm("确认删除该记录吗?", "提示", {
    //     type: "warning"
    //   })
    //     .then(() => {
    //       this.listLoading = true;
    //       //NProgress.start();
    //       let para = { id: row.id };
    //       // removeUser(para).then((res) => {
    //       // 	this.listLoading = false;
    //       // 	//NProgress.done();
    //       this.$message({
    //         message: "删除成功",
    //         type: "success"
    //       });
    //       // 	this.getUsers();
    //       // });
    //       deletOrg({
    //         token: sessionStorage.getItem("token"),
    //         id: row.id
    //       }).then(res => {
    //         console.log(res);
    //         if (res.code == 1) {
    //           this.listLoading = false;
    //           this.$message({
    //             message: "删除成功",
    //             type: "success"
    //           });
    //           _this.listOrg();
    //         }
    //       });
    //     })
    //     .catch(() => {});
    // },


//查询单条
    // handleDetails: function(index,row){
    //   console.log(Object.assign({}, row))
    //     this.detailsVisible = true;
    //     this.particulars={}
    //     this.particulars = Object.assign({}, row)
    // },


    //分页
    handleCurrentChange(val) {
      this.page = val;
      if (!this.filters.id) {
        this.listGy_suggest();
      }
    },
//上传图片
    // handleAvatarSuccess(res, file) {
    //   console.log(URL.createObjectURL(file.raw));
    //     // this.imageUrl = URL.createObjectURL(file.raw);
    //     if(res.code === 1 ){
    //       this.addForm.headImg = res.data;
    //       this.addHeadImg = res.data
    //       this.editHeadImg = res.data
    //       console.log(this.addForm.headImg)
    //     }else{
    //       this.$message({
    //         message: '上传失败！',
    //         type: "error"
    //       });
    //     }
    //   },
    //   beforeAvatarUpload(file) {
    //     const isJPG = file.type === 'image/gif,image/jpeg,image/jpg,image/png,image/svg';
    //     const isLt2M = file.size / 1024 / 1024 < 4;

    //     // if (!isJPG) {
    //     //   this.$message.error('上传头像图片只能是 JPG 格式!');
    //     // }
    //     if (!isLt2M) {
    //       this.$message.error('上传头像图片大小不能超过 4MB!');
    //     }
    //     return  isLt2M;
    //   },


    //显示新增界面
    // handleAdd: function() {
    //   this.addFormVisible = true;
    //   this.addHeadImg = ''
    //   this.addForm = {
    //     idCard: "",
    //     displayName: "",
    //     signature: "",
        
    //   };
    // },
    //新增
    // addSubmit: function() {
    //   this.$refs.addForm.validate(valid => {
    //     if (valid) {
    //       this.$confirm("确认提交吗？", "提示", {}).then(() => {
    //         this.addLoading = true;
    //         //NProgress.start();
    //         let para = Object.assign({}, this.addForm);
    //         console.log(para)
    //         // para.headImg=this.addForm.headImg
    //         para.token = sessionStorage.getItem("token");
    //         addOrg(para).then(res => {
    //           console.log(res);
    //           if (res.code == 1) {
    //             //NProgress.done();
    //             this.$message({
    //               message: "提交成功",
    //               type: "success"
    //             });
    //             this.$refs["addForm"].resetFields();
    //             this.addFormVisible = false;
    //             this.listOrg();
    //           } else {
    //             this.$message({
    //               message: res.message,
    //               type: "error"
    //             });
    //           }
    //           this.addLoading = false;

    //           // this.getUsers();
    //         });
    //       });
    //     }
    //   });
    // },
    //显示编辑界面
    // handleEdit: function(index, row) {
    //   console.log(row);
    //   this.editFormVisible = true;
    //   this.editHeadImg = row.headImg
    //   this.editForm = Object.assign({}, row);
    //   console.log(this.editForm);
    // },
    //编辑
    // editSubmit: function() {
    //   this.$refs.editForm.validate(valid => {
    //     if (valid) {
    //       this.$confirm("确认提交吗？", "提示", {}).then(() => {
    //         this.editLoading = true;
    //         //NProgress.start();
    //         console.log(valid);
    //         console.dir(this.editForm);
    //         let para = Object.assign({}, this.editForm);
    //         console.log(para);
    //         para.token = sessionStorage.getItem("token");
    //         updateOrg({
    //           token:sessionStorage.getItem("token"),
    //           headImg:para.headImg,
    //           displayName:para.displayName,
    //           signature:para.signature,
    //           idCard:para.idCard,
    //           id:para.id,
    //         }).then(res => {
    //             console.log(res);
    //             if (res.code == 1) {
    //               //NProgress.done();
    //               this.$message({
    //                 message: "提交成功",
    //                 type: "success"
    //               });
    //               this.$refs["editForm"].resetFields();
    //               this.editFormVisible = false;
    //               this.listOrg();
    //             } else {
    //               this.$message({
    //                 message: res.message,
    //                 type: "error"
    //               });
    //             }
    //             this.editLoading = false;
    //             // //NProgress.done();
    //             // this.$message({
    //             // 	message: '提交成功',
    //             // 	type: 'success'
    //             // });
    //             // this.$refs['editForm'].resetFields();
    //             // this.editFormVisible = false;
    //             // this.getUsers();
    //           })
    //           .catch(res => {
    //             this.editFormVisible = false;
    //             console.log(res);
    //           });
    //       });
    //     }
    //   });
    // },
    




  },
  mounted() {
    this.listGy_suggest();
  },
  components: {
      particulars
  },
};
</script>
<style lang="scss" scoped>
.benefit {
  .top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>