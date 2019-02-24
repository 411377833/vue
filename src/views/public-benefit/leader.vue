<template>
  <section class="benefit">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.id" placeholder="请输入项目负责人姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="queryListLeader">查询</el-button>
        </el-form-item>
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
      <!-- <el-table-column prop="id" label="ID" width="200"></el-table-column> -->
      <el-table-column prop="displayName" label="项目负责人" width="300"></el-table-column>
      <el-table-column prop="signature" label="说明	" min-width="180"></el-table-column>
      <!-- <el-table-column prop="createTime" label="创建时间" min-width="150"></el-table-column>
      <el-table-column prop="lastUpdateTime" label="最后修改时间" min-width="150"></el-table-column>
      <el-table-column prop="userType" label="类型" min-width="150"></el-table-column>-->
      <!-- <el-table-column prop="title" label="标题" min-width="180" >
      </el-table-column>-->
      <el-table-column label="操作" width="220" fixed="right">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
          <el-button size="small" @click="handleDetails(scope.$index, scope.row)">详情</el-button>
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
      <el-form size="mini" :model="addForm" label-width="120px" :rules="addFormRules" ref="addForm">
        <!-- <el-form-item label="机构代码" prop="idCard">
          <el-input v-model="addForm.idCard"></el-input>
        </el-form-item>-->
        <el-form-item label="项目负责人" prop="displayName">
          <el-input v-model="addForm.displayName"></el-input>
        </el-form-item>
        <el-form-item label="说明" prop="signature">
          <el-input v-model="addForm.signature"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            :data="abc"
            class="avatar-uploader"
            action="http://api.50wlkj.com/api/upload_img"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="addHeadImg" :src="addHeadImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
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
      <el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">
        <el-form-item label="项目负责人" prop="displayName">
          <el-input v-model="editForm.displayName"></el-input>
        </el-form-item>
        <!-- <el-form-item label="id" >
          <el-input v-model="editForm.id"></el-input>
        </el-form-item>-->
        <el-form-item label="说明" prop="signature">
          <el-input v-model="editForm.signature"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="editForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            :data="abc"
            class="avatar-uploader"
            action="http://api.50wlkj.com/api/upload_img"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="editHeadImg" :src="editHeadImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!-- 详情界面 -->
    <el-dialog title="详情" v-model="detailsVisible" :close-on-click-modal="false">
      <particulars :particulars="particulars"/>
    </el-dialog>
  </section>
</template>

<script>
import {
  listLeader,
  deleteLeader,
  // getLeader,
  addLeader,
  updateLeader
} from "../../api/api";
import particulars from "../component/particulars";
export default {
  data() {
    return {
      page: 1,
      filters: {
        displayName: ""
      },
      //   imageUrl: '',
      dialogVisible: false,
      detailsVisible: false,
      abc: {
        token: sessionStorage.getItem("token")
      },
      total: 0,
      tableData: [],
      listLoading: false,
      particulars: {},
      //新增界面数据
      addForm: {
        // idCard: "",
        displayName: "",
        signature: "",
        headImg: ""
      },
      //编辑界面数据
      editForm: {
        // idCard: "",
        displayName: "",
        signature: "",
        headImg: ""
      },
      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      addFormRules: {
        // idCard: [{ required: true, message: "请输入机构id", trigger: "blur" }],
        displayName: [
          { required: true, message: "请填写项目负责人", trigger: "blur" }
        ],
        signature: [{ required: true, message: "请填写说明", trigger: "blur" }]
        // headImg:[
        //     {required: true, message: "请上传机构头像", trigger: "blur"}
        // ]
      },
      editFormRules: {
        displayName: [
          { required: true, message: "请填写项目负责人", trigger: "blur" }
        ],
        signature: [{ required: true, message: "请填写说明", trigger: "blur" }]
      },
      addHeadImg: "",
      editHeadImg: ""
    };
  },
  created() {
    let that = this;
    document.onkeypress = function(e) {
      var keycode = document.all ? event.keyCode : e.which;
      if (keycode == 13) {
        that.queryListLeader(); // 登录方法名
        return false;
      }
    };
  },
  methods: {
    queryListLeader() {
      let _this = this;
      if (_this.filters.id) {
        listLeader({
          token: sessionStorage.getItem("token"),
          displayName: _this.filters.id,
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
        _this.listLeader();
      }
    },
    // 列表
    listLeader() {
      let _this = this;
      listLeader({
        token: sessionStorage.getItem("token"),
        pageNum: this.page,
        pageSize: 10
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
    //显示编辑界面
    // handleEdit: function(index, row) {
    //   console.log(row);
    //   // this.editFormVisible = true;
    //   // this.editForm = Object.assign({}, row);
    // },

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
          deleteLeader({
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
              _this.listLeader();
            }
          });
        })
        .catch(() => {});
    },
    //查询单条
    handleDetails: function(index, row) {
      console.log(Object.assign({}, row));
      this.detailsVisible = true;
      this.particulars = {};
      this.particulars = Object.assign({}, row);
    },

    //分页
    handleCurrentChange(val) {
      this.page = val;
      if (!this.filters.id) {
        this.listLeader();
      }
    },
    //上传图片
    handleAvatarSuccess(res, file) {
      console.log(URL.createObjectURL(file.raw));
      // this.imageUrl = URL.createObjectURL(file.raw);
      if (res.code === 1) {
        if (this.addFormVisible) {
          this.addForm.headImg = res.data;
          this.addHeadImg = res.data;
        } else if (this.editFormVisible) {
          this.editForm.headImg = res.data;
          this.editHeadImg = res.data;
        }

        console.log(this.addForm.headImg);
      } else {
        this.$message({
          message: "上传失败！",
          type: "error"
        });
      }
    },
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/gif,image/jpeg,image/jpg,image/png,image/svg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },

    //显示新增界面
    handleAdd: function() {
      this.addFormVisible = true;
      this.addHeadImg = "";
      this.addForm = {
        // idCard: "",
        displayName: "",
        signature: "",
        phone: ""
      };
    },
    //新增
    addSubmit: function() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addLoading = true;
            //NProgress.start();
            let para = Object.assign({}, this.addForm);
            console.log(para);
            para.token = sessionStorage.getItem("token");
            addLeader(para).then(res => {
              console.log(res);
              if (res.code == 1) {
                //NProgress.done();
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.$refs["addForm"].resetFields();
                this.addFormVisible = false;
                this.listLeader();
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
      this.editHeadImg = row.headImg;
      this.editForm = Object.assign({}, row);
    },
    //编辑
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;
            //NProgress.start();
            console.log(valid);
            console.dir(this.editForm);
            let para = Object.assign({}, this.editForm);
            console.log(para);
            para.token = sessionStorage.getItem("token");
            updateLeader(
              {
              token: sessionStorage.getItem("token"),
              headImg: para.headImg,
              displayName: para.displayName,
              signature: para.signature,
              idCard: para.idCard,
              id: para.id
            }
            // para
            )
              .then(res => {
                console.log(res);
                if (res.code == 1) {
                  //NProgress.done();
                  this.$message({
                    message: "提交成功",
                    type: "success"
                  });
                  this.$refs["editForm"].resetFields();
                  this.editFormVisible = false;
                  this.listLeader();
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
    }
  },
  mounted() {
    this.listLeader();
  },
  components: {
    particulars
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