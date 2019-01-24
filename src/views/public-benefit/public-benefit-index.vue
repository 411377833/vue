<template>
  <section class="benefit">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.id" placeholder="请输入项目名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="queryGetProjects">查询</el-button>
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
      <!-- <el-table-column prop="id" label="编号" width="120" >
      </el-table-column>-->
      <el-table-column prop="title" label="标题" width="280"></el-table-column>
      <!-- <el-table-column prop="creatorId" label="创建人编号" width="200">
      </el-table-column>-->
      <el-table-column prop="description" label="简介描述	" min-width="380"></el-table-column>
      <!-- <el-table-column prop="createTime" label="创建日期" min-width="100" >
          </el-table-column>
          <el-table-column prop="lastUpdateTime" label="最后修改时间" min-width="120" >
      </el-table-column>-->
      <el-table-column label="操作" min-width="100">
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
      <el-form size="mini" :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="标题" prop="title">
          <el-input v-model="addForm.title"></el-input>
        </el-form-item>
        <el-form-item label="简介描述">
          <el-input v-model="addForm.description"></el-input>
        </el-form-item>
        <el-form-item label="公益透明度提示">
          <el-input v-model="addForm.tips"></el-input>
        </el-form-item>
        <el-form-item label="发起机构ID">
          <el-input v-model="addForm.orgId"></el-input>
        </el-form-item>
        <el-form-item label="发起人ID">
          <el-input v-model="addForm.initiatorId"></el-input>
        </el-form-item>
        <el-form-item label="善款接受方ID">
          <el-input v-model="addForm.recipientId"></el-input>
        </el-form-item>
        <el-form-item label="项目负责人ID">
          <el-input v-model="addForm.mgrId"></el-input>
        </el-form-item>
        <el-form-item label="标签" prop="tags">
          <el-checkbox-group v-model="checkedLabels" :min="1" :max="3">
            <el-checkbox v-for="label in labels" :label="label" :key="label">{{label}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="图文详情" prop="imgs">
          <el-input v-model="addForm.h5Id"></el-input>
        </el-form-item>
        <el-form-item label="公益项目分类id">
          <el-input v-model="addForm.cateIds"></el-input>
        </el-form-item>
        <el-form-item label="目标善款金额">
          <el-input v-model="addForm.targetMoney"></el-input>
        </el-form-item>
        <el-form-item label="详情页轮播图">
          <el-upload
            :data="abc"
            action="http://api.50wlkj.com/api/upload_img"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt>
          </el-dialog>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--编辑界面-->
    <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="标题" prop="title">
          <el-input v-model="editForm.title"></el-input>
        </el-form-item>
        <el-form-item label="简介描述">
          <el-input v-model="editForm.description"></el-input>
        </el-form-item>
        <el-form-item label="公益透明度提示">
          <el-input v-model="editForm.tips"></el-input>
        </el-form-item>
        <el-form-item label="发起机构ID">
          <el-input v-model="editForm.orgId"></el-input>
        </el-form-item>
        <el-form-item label="发起人ID">
          <el-input v-model="editForm.initiatorId"></el-input>
        </el-form-item>
        <el-form-item label="善款接受方ID">
          <el-input v-model="editForm.recipientId"></el-input>
        </el-form-item>
        <el-form-item label="项目负责人ID">
          <el-input v-model="editForm.mgrId"></el-input>
        </el-form-item>
        <el-form-item label="标签">
          <el-input v-model="editForm.tags"></el-input>
        </el-form-item>
        <el-form-item label="图文详情" prop="imgs">
          <el-input v-model="editForm.h5Id"></el-input>
        </el-form-item>
        <el-form-item label="公益项目分类id">
          <el-input v-model="editForm.cateIds"></el-input>
        </el-form-item>
        <el-form-item label="目标善款金额">
          <el-input v-model="editForm.targetMoney"></el-input>
        </el-form-item>
        <el-form-item label="详情页轮播图">
          <el-input v-model="editForm.imgs"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!-- 详情页面 -->
    <el-dialog title="详情" v-model="detailsVisible" :close-on-click-modal="false">
      <particulars :particulars = "particulars"/>
    </el-dialog>
  </section>
</template>

<script>
import {
  getProjects,
  delProject,
  // getProject,
  addProject,
  updateProject
} from "../../api/api";
import particulars from '../component/particulars'
const checkLabel = ["一周一善行", "特别关注", "爱心进展"];
export default {
  data() {
    return {
      checkedLabels: ["一周一善行", "特别关注"],
      labels: checkLabel,
      page: 1,
      filters: {
        title: ""
      },
      dialogImageUrl: "",
      dialogVisible: false,
      detailsVisible:false,
      abc: {
        token: sessionStorage.getItem("token")
      },
      total: 0,
      tableData: [],
      listLoading: false,
      particulars:{},
      //新增界面数据
      addForm: {
        initiatorId: "",
        recipientId: "",
        mgrId: "",
        // tags: "",
        h5Id: "",
        cateIds: "",
        orgId: "",
        tips: "",
        description: "",
        title: "",
        targetMoney: "",
        imgs: ""
      },
      //编辑界面数据
      editForm: {
        initiatorId: "",
        recipientId: "",
        mgrId: "",
        // tags: "",
        h5Id: "",
        cateIds: "",
        orgId: "",
        tips: "",
        description: "",
        title: "",
        targetMoney: "",
        imgs: ""
      },
      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      addFormRules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        imgs: [{ required: true, message: "请输入图片地址", trigger: "blur" }]
      },
      editFormRules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        imgs: [{ required: true, message: "请输入图片地址", trigger: "blur" }]
      }
    };
  },
  methods: {
    queryGetProjects() {
      let _this = this;
      if (_this.filters.id) {
        getProjects({
          token: sessionStorage.getItem("token"),
          title: _this.filters.id,
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
        _this.getProjects();
      }
    },
    getProjects() {
      let _this = this;
      getProjects({
        token: sessionStorage.getItem("token"),
        pageNum: this.page,
        pageSize: 10,
        title: "",
        description: ""
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
          delProject({
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
              _this.getProjects();
            }
          });
        })
        .catch(() => {});
    },
//查询单条
handleDetails: function(index,row){
      console.log(Object.assign({}, row))
        this.detailsVisible = true;
        this.particulars={}
        this.particulars = Object.assign({}, row)
    },



    //分页
    handleCurrentChange(val) {
      console.log(val);
      this.page = val;
      if (!this.filters.id) {
        this.getProjects();
      }
      // this.getProjects()
    },

    //上传轮播图
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //显示新增界面
    handleAdd: function() {
      this.addFormVisible = true;
      this.addForm = {
        initiatorId: "",
        recipientId: "",
        mgrId: "",
        tags: "",
        h5Id: "",
        cateIds: "",
        orgId: "",
        tips: "",
        description: "",
        title: "",
        targetMoney: "",
        imgs: ""
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
            addProject(para).then(res => {
              console.log(res);
              if (res.code == 1) {
                //NProgress.done();
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.$refs["addForm"].resetFields();
                this.addFormVisible = false;
                this.getProjects();
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
            updateProject(para)
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
                  this.getProjects();
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
    this.getProjects();
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
</style>