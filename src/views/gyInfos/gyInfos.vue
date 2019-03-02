<template>
  <section class="benefit">
    <div v-if="!nextPage">
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.id" placeholder="请输入标题或描述进行查询"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="queryGetGyInfos">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleAdd">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-table
        :data="tableData"
        highlight-current-row
        v-loading="listLoading"
        style="width: 100%;"
      >
        <el-table-column prop="title" label="标题" width="300"></el-table-column>
        <el-table-column prop="description" label="描述" min-width="180"></el-table-column>

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
        <el-form
          size="mini"
          :model="addForm"
          label-width="120px"
          :rules="addFormRules"
          ref="addForm"
        >
          <el-form-item label="关联的公益项目">
            <!-- <el-input v-model="addForm.gyItemId" ></el-input> -->
            <el-select
              v-model="addForm.gyItemId"
              filterable
              remote
              placeholder="请输入公益项目进行查询"
              :remote-method="querySearchProject"
              clearable
            >
              <el-option
                v-for="item in projectIds"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="关联的资讯" prop="h5Id">
            <!-- <el-input v-model="addForm.h5Id"></el-input> -->
            <el-select
              v-model="addForm.h5Id"
              filterable
              remote
              placeholder="请输入资讯进行查询"
              :remote-method="querySearchH5"
              clearable
            >
              <el-option
                v-for="item in h5Ids"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标题" prop="title">
            <el-input v-model="addForm.title" placeholder="请填写标题"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="addForm.description" placeholder="请填写描述" type="textarea" :rows="2"></el-input>
          </el-form-item>
          
          <el-form-item label="图片" prop="image">
            <el-upload
              :data="abc"
              class="avatar-uploader"
              action="http://api.50wlkj.com/api/upload_img"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="addImage" :src="addImage" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
        </div>
      </el-dialog>


<!--编辑界面-->
    <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">
        <el-form-item label="关联的公益项目">
            <!-- <el-input v-model="addForm.gyItemId" ></el-input> -->
            <el-select
              v-model="editForm.gyItemId"
              filterable
              remote
              placeholder="请输入公益项目进行查询"
              :remote-method="querySearchProject"
              clearable
            >
              <el-option
                v-for="item in projectIds"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="关联的资讯" prop="h5Id">
            <!-- <el-input v-model="addForm.h5Id"></el-input> -->
            <el-select
              v-model="editForm.h5Id"
              filterable
              remote
              placeholder="请输入资讯进行查询"
              :remote-method="querySearchH5"
              clearable
            >
              <el-option
                v-for="item in h5Ids"
                :key="item.id"
                :label="item.value"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标题" prop="title">
            <el-input v-model="editForm.title" placeholder="请填写标题"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="editForm.description" placeholder="请填写描述" type="textarea" :rows="2"></el-input>
          </el-form-item>
          
          <el-form-item label="图片" prop="image">
            <el-upload
              :data="abc"
              class="avatar-uploader"
              action="http://api.50wlkj.com/api/upload_img"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="editImage" :src="editImage" class="avatar">
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
    </div>
    <div v-if="nextPage">
      <div class="goBack">
        <el-button type="primary" v-on:click="goBack">返回</el-button>
      </div>
      <addPage v-if="addFormVisible" :callback="callback"/>
      <editPage v-if="editFormVisible" :callback="callback" :editData="editData"/>
    </div>
  </section>
</template>

<script>
import {
  getGyInfos,
  delGyInfos,
  getGyInfo,
  addGyInfo,
  getProjects,
  updateGyInfo,
  listH5,
  // listOrg
  // addCategory,
  // updateCategory
} from "../../api/api";
// import addPage from './addH5Page'
// import editPage from './editPage'
import particulars from "../component/particulars";

export default {
  data() {
    return {
      particulars: {},
      page: 1,
      filters: {
        title: ""
        // description:""
      },
      nextPage: false,
      //   imageUrl: '',
      total: 0,
      detailsVisible: false,
      abc: {
        token: sessionStorage.getItem("token")
      },
      tableData: [],
      listLoading: false,
      addFormVisible: false, //新增界面是否显示
      editFormVisible: false, //编辑界面是否显示
      addLoading: false,
      editData: {},
      projectIds: [],
      h5Ids:[],
      editLoading:false,
      addLoading:false,
      //新增界面数据
      addForm: {
        // idCard: "",
        gyItemId: "",
        title: "",
        description: "",
        image: "",
        h5Id: ""
        // phone:""
      },
      //编辑界面数据
      editForm: {
        gyItemId: "",
        title: "",
        description: "",
        image: "",
        h5Id: ""
      },
      editImage:"",
      addFormRules: {
        // idCard: [{ required: true, message: "请输入机构id", trigger: "blur" }],
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        description: [
          { required: true, message: "请输入描述", trigger: "blur" }
        ],
        image: [{ required: true, message: "请上传图片", trigger: "blur" }]
      },
      editFormRules: {
        // idCard: [{ required: true, message: "请输入机构id", trigger: "blur" }],
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        description: [
          { required: true, message: "请输入描述", trigger: "blur" }
        ],
        image: [{ required: true, message: "请上传图片", trigger: "blur" }]
      },
      addImage: "",
      
    };
  },
  created() {
    let that = this;
    document.onkeypress = function(e) {
      var keycode = document.all ? event.keyCode : e.which;
      if (keycode == 13) {
        that.queryGetGyInfos(); // 登录方法名
        return false;
      }
    };
  },
  methods: {
    // 关联接口数据
    

    //此方法为公益项目关键字搜索方法
    querySearchProject(queryString) {
      getProjects({
        token: sessionStorage.getItem("token"),
        pageNum: this.page,
        pageSize: 10,
        title: queryString
      }).then(res => {
        if (res.code == 1) {
          let reOrg = [];
          for (let i = 0; i < res.data.data.length; i++) {
            let item = res.data.data[i];
            reOrg.push({
              value: item.title,
              id: item.id
            });
          }
          this.projectIds = reOrg;
        }
      });
    },
    //此方法为H5页面搜索方法
    querySearchH5(queryString) {
      listH5({
        token: sessionStorage.getItem("token"),
        pageNum: this.page,
        pageSize: 10,
        title: queryString
      }).then(res => {
        if (res.code == 1) {
          let reH5 = [];
          for (let i = 0; i < res.data.data.length; i++) {
            let item = res.data.data[i];
            reH5.push({
              value: item.title,
              id: item.id
            });
          }
          this.h5Ids = reH5;
        }
      });
    },
    queryGetGyInfos() {
      let _this = this;
      if (_this.filters.id) {
        getGyInfos({
          token: sessionStorage.getItem("token"),
          title: _this.filters.id,
          // description:_this.filters.id,
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
        _this.getGyInfos();
      }
    },
    // 列表
    getGyInfos() {
      let _this = this;
      getGyInfos({
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
          delGyInfos({
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
              _this.getGyInfos();
            }
          });
        })
        .catch(() => {});
    },
    //上传图片
    handleAvatarSuccess(res, file) {
      console.log(URL.createObjectURL(file.raw));
      // this.imageUrl = URL.createObjectURL(file.raw);
      if (res.code === 1) {
        if (this.addFormVisible) {
          this.addForm.image = res.data;
          this.addImage = res.data;
        } else if (this.editFormVisible) {
          this.editForm.image = res.data;
          this.editImage = res.data;
        }

        console.log(this.addForm.image);
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
      const isLt4M = file.size / 1024 / 1024 < 4;

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt4M) {
        this.$message.error("上传头像图片大小不能超过 4MB!");
      }
      return isLt4M;
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
        this.getGyInfos();
      }
    },
    //显示新增界面
    handleAdd: function() {
      this.addFormVisible = true;
      this.addLoading=false;
      this.addImage = "";
      this.addForm = {
        gyItemId: "",
        title: "",
        description: "",
        image: "",
        h5Id: ""
      };
      this.$nextTick(() => {
        this.$refs["addForm"].resetFields();
      });
    },
    //新增
    addSubmit: function() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          let para = Object.assign({}, this.addForm);
          console.log(!para.gyItemId || !para.h5Id)
          console.log(!!para.gyItemId || !!para.h5Id)
          if(para.gyItemId && para.h5Id){
            this.$message({
                message: '关联的公益项目和关联的资讯只能填写一个！',
                type: "error"
              });
              return;
            
          }else if(!para.gyItemId && !para.h5Id){
            this.$message({
                message: '关联的公益项目和关联的资讯至少关联一个！',
                type: "error"
              });
              return;
          }
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addLoading = true;
            //NProgress.start();
            
            console.log(para);
            para.token = sessionStorage.getItem("token");
            addGyInfo(para).then(res => {
              console.log(res);
              if (res.code == 1) {
                //NProgress.done();
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.$refs["addForm"].resetFields();
                this.addFormVisible = false;
                this.getGyInfos();
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
      this.editLoading = false;
      this.editImage = row.image;
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
            updateGyInfo({
              token: sessionStorage.getItem("token"),
              gyItemId: para.gyItemId,
              h5Id:para.h5Id,
              title: para.title,
              description: para.description,
              image: para.image,
              id: para.id
            }).then(res => {
                console.log(res);
                if (res.code == 1) {
                  //NProgress.done();
                  this.$message({
                    message: "提交成功",
                    type: "success"
                  });
                  this.editFormVisible = false;
                  this.getGyInfos();
                } else {
                  this.$message({
                    message: res.message,
                    type: "error"
                  });
                }
                this.editLoading = false;
                
              })
              .catch(res => {
                this.editFormVisible = false;
                console.log(res);
              });
          });
        }
      });
    },
    goBack() {
      this.editFormVisible = false;
      this.addFormVisible = false;
      this.nextPage = false;
    },
    callback() {
      this.editFormVisible = false;
      this.addFormVisible = false;
      this.nextPage = false;
      this.getGyInfos();
    }
  },
  mounted() {
    this.getGyInfos();
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
  .goBack {
    text-align: right;
    margin-bottom: 10px;
  }
}
</style>