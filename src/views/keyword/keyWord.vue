<template>
  <section class="benefit">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <!-- <el-form-item>
          <el-input v-model="filters.id" placeholder="请输入机构名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="queryGetKeywords">查询</el-button>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <el-table :data="tableData" highlight-current-row v-loading="listLoading" style="width: 100%;">
      <!-- <el-table-column type="selection" width="55">
      </el-table-column>-->
      <!-- <el-table-column type="index" label="顺序" width="100" >
      </el-table-column>-->
      <!-- <el-table-column prop="id" label="机构id" width="100"></el-table-column> -->
      <!-- <el-table-column prop="idCard" label="机构代码" width="200"></el-table-column> -->
      <el-table-column prop="keyWord" label="关键字" min-width="300"></el-table-column>
      <!-- <el-table-column prop="hotWord" label="说明	" min-width="180"></el-table-column> -->
      <!-- <el-table-column prop="createTime" label="创建时间" min-width="150"></el-table-column>
      <el-table-column prop="lastUpdateTime" label="最后修改时间" min-width="150"></el-table-column>-->
      <!-- <el-table-column prop="title" label="标题" min-width="180" >
      </el-table-column>-->
      <el-table-column label="操作" width="220" fixed="right">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
          <!-- <el-button size="small" @click="handleDetails(scope.$index, scope.row)">详情</el-button> -->
        </template>
      </el-table-column>
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

    <!--新增界面-->
    <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
      <el-form size="mini" :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="关键字" prop="keyWord">
          <el-input v-model="addForm.keyWord" placeholder="请输入关键字"></el-input>
        </el-form-item>
        <!-- <el-form-item label="机构名称" prop="displayName">
          <el-input v-model="addForm.displayName"></el-input>
        </el-form-item>
        <el-form-item label="说明" prop="signature">
          <el-input v-model="addForm.signature"></el-input>
        </el-form-item> -->
        <!-- <el-upload
          :data="abc"
          class="avatar-uploader"
          action="http://api.50wlkj.com/api/upload_img"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="addHeadImg" :src="addHeadImg" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload> -->
        <!-- <el-form-item label="发起机构ID"><el-input v-model="addForm.orgId"></el-input></el-form-item>
          <el-form-item label="发起人ID"><el-input v-model="addForm.initiatorId"></el-input></el-form-item>
          <el-form-item label="善款接受方ID"><el-input v-model="addForm.recipientId"></el-input></el-form-item>
          <el-form-item label="项目负责人ID"><el-input v-model="addForm.mgrId"></el-input></el-form-item>
          <el-form-item label="标签"><el-input v-model="addForm.tags"></el-input></el-form-item>
          <el-form-item label="图文详情" prop="imgs"><el-input v-model="addForm.h5Id"></el-input></el-form-item>
          <el-form-item label="公益项目分类id"><el-input v-model="addForm.cateIds"></el-input></el-form-item>
          <el-form-item label="目标善款金额"><el-input v-model="addForm.targetMoney"></el-input></el-form-item>
        <el-form-item label="详情页轮播图"><el-input v-model="addForm.imgs"></el-input></el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--编辑界面-->
    <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="搜索次数" prop="modifyTime">
          <el-input v-model="editForm.modifyTime" placeholder="请输入关键字搜索次数"></el-input>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { getKeywords, delKeyword, addKeyword, updateKeyword } from "../../api/api";
export default {//editForm.headImg
  data() {
    return {
      page: 1,
      filters: {
        id: ""
      },
      dialogVisible:false,
      abc:{
        token:sessionStorage.getItem("token")
      },
      //   imageUrl: '',
      total: 0,
      tableData: [],
      listLoading: false,
      //新增界面数据
      addForm: {
        keyWord: "",
      },
      //编辑界面数据
      editForm: {
        // keyWord: "",
        modifyTime:''
      },
      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      addFormRules: {
        keyWord: [
          { required: true, message: "请输入关键字", trigger: "blur" }
        ],
        // displayName: [
        //   { required: true, message: "请输入机构名称", trigger: "blur" }
        // ],
        // signature: [
        //   { required: true, message: "请填写机构说明", trigger: "blur" }
        // ]
        // headImg:[
        //     {required: true, message: "请上传机构头像", trigger: "blur"}
        // ]
      },
      editFormRules: {
        modifyTime: [
          { required: true, message: "请输入搜索次数,正数为增加搜索的次数量，负数为减少搜索的次数量", trigger: "blur" }
        ],
      
      },
     
    };
  },
  methods: {
    queryGetKeywords() {
      let _this = this;
      if (_this.filters.id) {
        getKeywords({
          token: sessionStorage.getItem("token"),
          
          pageNum: this.page,
          pageSize: 10
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
      } else {
        _this.getKeywords();
      }
    },
    // 列表
    getKeywords() {
      let _this = this;
      getKeywords({
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
    handleDel: function(index, row) {
      let _this = this;
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { id: row.id };
          // removeUser(para).then((res) => {
          // 	this.listLoading = false;
          // 	//NProgress.done();
          this.$message({
            message: "删除成功",
            type: "success"
          });
          // 	this.getUsers();
          // });
          delKeyword({
            token: sessionStorage.getItem("token"),
            id: row.id
          }).then(res => {
            console.log(res);
            if (res.code == 1) {
              this.listLoading = false;
              this.$message({
                message: "删除成功",
                type: "success"
              });
              _this.getKeywords();
            }
          });
        })
        .catch(() => {});
    },
    //分页
    handleCurrentChange(val) {
      this.page = val;
      if (!this.filters.id) {
        this.getKeywords();
      }
    },

    //显示新增界面
    handleAdd: function() {
      this.addFormVisible = true;
      this.addForm = {
        keyWord:""
      };
       this.$nextTick(() => {
        this.$refs["addForm"].resetFields();
      });
    },
    //新增
    addSubmit: function() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.addForm);
            console.log(para)
            // para.headImg=this.addForm.headImg
            para.token = sessionStorage.getItem("token");
            addKeyword(para).then(res => {
              console.log(res);
              if (res.code == 1) {
                //NProgress.done();
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.$refs["addForm"].resetFields();
                this.addFormVisible = false;
                this.getKeywords();
              } else {
                this.$message({
                  message: res.message,
                  type: "error"
                });
              }
              this.addLoading = false;

              // this.getUsers();
            });
          });
        }
      });
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      console.log(row);
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
      console.log(this.editForm);
    },
    //编辑
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        console.log(valid)
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            
            let para = Object.assign({}, this.editForm);
            this.editForm.modifyTime=para.modifyTime
            console.log(para);
            para.token = sessionStorage.getItem("token");
            updateKeyword({
              token:sessionStorage.getItem("token"),
              id:para.id,
              modifyTime:para.modifyTime,
              // keyWord:para.keyWord
            })
              .then(res => {
                console.log(res);
                if (res.code == 1) {
                  //NProgress.done();
                  this.$message({
                    message: "提交成功",
                    type: "success"
                  });
                  // this.$refs["editForm"].resetFields();
                  this.editFormVisible = false;
                  this.getKeywords();
                } else {
                  this.$message({
                    message: res.message,
                    type: "error"
                  });
                }
                this.editLoading = false;
                // //NProgress.done();
                // this.$message({
                // 	message: '提交成功',
                // 	type: 'success'
                // });
                // this.$refs['editForm'].resetFields();
                // this.editFormVisible = false;
                // this.getUsers();
              })
              .catch(res => {
                this.editFormVisible = false;
                console.log(res);
              });
          });
        }
      });
    },
    




  },
  mounted() {
    this.getKeywords();
  }
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