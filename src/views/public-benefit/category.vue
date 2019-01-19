<template>
  <section class="benefit">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.id" placeholder="请输入分类名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="queryCateName">查询</el-button>
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
      <el-table-column prop="id" label="id" width="200"></el-table-column>
      <el-table-column prop="cateName" label="分类名称" width="300"></el-table-column>
      <el-table-column prop="creatorId" label="创建人编号" width="200"></el-table-column>
      <!-- <el-table-column prop="signature" label="说明	" min-width="180"></el-table-column> -->
      <el-table-column prop="createTime" label="创建时间" min-width="150"></el-table-column>
      <el-table-column prop="lastUpdateTime" label="最后修改时间" min-width="150"></el-table-column>
      <!-- <el-table-column prop="userType" label="类型" min-width="150"></el-table-column> -->
      <!-- <el-table-column prop="title" label="标题" min-width="180" >
      </el-table-column>-->
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--工具条-->
    <el-col :span="24" class="toolbar" v-if="!filters.id">
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
        <!-- <el-form-item label="机构代码" prop="idCard">
          <el-input v-model="addForm.idCard"></el-input>
        </el-form-item> -->
        <el-form-item label="分类名称" prop="cateName">
          <el-input v-model="addForm.cateName"></el-input>
        </el-form-item>
        <el-form-item label="排序号" prop="priority">
          <el-input v-model="addForm.priority"></el-input>
        </el-form-item>
        <el-form-item label="分类图路径" prop="cateImg">
          <el-input v-model="addForm.cateImg"></el-input>
        </el-form-item>
        <!-- <el-form-item label="联系电话" >
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>-->
        <!-- <el-upload
          class="avatar-uploader"
          action="http://api.50wlkj.com/api/upload_img"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
         >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>-->
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
         <el-form-item label="分类名称" prop="cateName">
          <el-input v-model="editForm.cateName"></el-input>
        </el-form-item>
        <el-form-item label="排序号" prop="priority">
          <el-input v-model="editForm.priority"></el-input>
        </el-form-item>
        <el-form-item label="分类图路径" prop="cateImg">
          <el-input v-model="editForm.cateImg"></el-input>
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
import {
  listCategory,
  deleteCategory,
  getLeader,
  addCategory,
  updateCategory
} from "../../api/api";
export default {
  data() {
    return {
      page: 1,
      filters: {
        cateName: ""
      },
      //   imageUrl: '',
      total: 0,
      tableData: [],
      listLoading: false,
      //新增界面数据
      addForm: {
        // idCard: "",
        cateName: "",
        priority: "",
        cateImg:""
      },
      //编辑界面数据
      editForm: {
        // idCard: "",
        displayName: "",
        priority: "",
        cateImg:""

      },
      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      addFormRules: {
        // idCard: [{ required: true, message: "请输入机构id", trigger: "blur" }],
        cateName: [
          { required: true, message: "请填写分类名称", trigger: "blur" }
        ],
        priority: [{ required: true, message: "请输入排序号", trigger: "blur" }],
        cateImg:[
            {required: true, message: "请上传图片", trigger: "blur"}
        ]
      },
      editFormRules: {
        
      }
    };
  },
  methods: {
    queryCateName() {
      let _this = this;
      if (_this.filters.id) {
        listCategory({
          token: sessionStorage.getItem("token"),
          cateName: _this.filters.id,
          pageNum: this.page,
          pageSize: 10
        }).then(res => {
          console.log(res);
          if (res.code === 1) {
            // let arr = [];
            //   arr.push(res.data);
            _this.tableData = res.data.data;
            // console.log(_this.tableData );
            _this.total = res.data.total;
          } else {
            this.$message({
              message: res.message,
              type: "error"
            });
          }
        });
      } else {
        _this.listCategory();
      }
    },
    // 列表
    listCategory() {
      let _this = this;
      listCategory({
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
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      console.log(row);
      // this.editFormVisible = true;
      // this.editForm = Object.assign({}, row);
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
          deleteCategory({
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
              _this.listCategory();
            }
          });
        })
        .catch(() => {});
    },
    //分页
    handleCurrentChange(val) {
      this.page = val;
      if (!this.filters.id) {
        this.listCategory();
      }
    },
    //显示新增界面
    handleAdd: function() {
      this.addFormVisible = true;
      this.addForm = {
         cateName: "",
        priority: "",
        cateImg:""
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
            addCategory(para).then(res => {
              console.log(res);
              if (res.code == 1) {
                //NProgress.done();
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.$refs["addForm"].resetFields();
                this.addFormVisible = false;
                this.listCategory();
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
            updateCategory(para)
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
                  this.listCategory();
                } else {
                  this.$message({
                    message: res.message,
                    type: "error"
                  });
                }
                // this.editLoading = false;
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
    this.listCategory();
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
</style>