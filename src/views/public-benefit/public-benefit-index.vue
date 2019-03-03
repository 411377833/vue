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
      <el-table-column prop="title" label="标题" width="280"></el-table-column>

      <el-table-column prop="description" label="简介描述	" min-width="380"></el-table-column>

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
      <el-form size="mini" :model="addForm" label-width="120px" :rules="addFormRules" ref="addForm" label-padding="left:10px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="addForm.title"></el-input>
        </el-form-item>
        <el-form-item label="简介描述" prop="description">
          <el-input v-model="addForm.description" type="textarea" :rows="2"></el-input>
        </el-form-item>
        <el-form-item label="公益透明度提示" prop="tips">
          <el-input v-model="addForm.tips" type="textarea" :rows="2"></el-input>
        </el-form-item>
        <el-form-item label="公益机构" class="dian" >
          <el-select
            v-model="addForm.orgId"
            filterable
            remote
            placeholder="必选项"
            :remote-method="querySearchOrg"
            clearable
          >
            <el-option v-for="item in orgIds" :key="item.id" :label="item.value" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发起人">
          <el-select
            v-model="addForm.initiatorId"
            filterable
            remote
            placeholder="必选项"
            :remote-method="querySearchInitiator"
            clearable
          >
            <el-option
              v-for="item in initiatorIds"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="善款接受方">
          <!-- <el-input v-model="addForm.recipientId"></el-input> -->
          <el-select
            v-model="addForm.recipientsId"
            filterable
            remote
            placeholder="必选项"
            :remote-method="querySearchRecipients"
            clearable
          >
            <el-option
              v-for="item in recipientsIds"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目负责人">
          <!-- <el-input v-model="addForm.mgrId"></el-input> -->
          <el-select
            v-model="addForm.leaderId"
            filterable
            remote
            placeholder="必选项"
            :remote-method="querySearchLeader"
            clearable
          >
            <el-option
              v-for="item in leaderIds"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签" prop="tags">
          <el-checkbox-group v-model="checkedLabels" :min="1" :max="3">
            <el-checkbox v-for="label in labels" :label="label" :key="label">{{label}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="图文详情">
          <!-- <el-input v-model="addForm.h5Id"></el-input> -->
          <el-select
            v-model="addForm.h5Id"
            filterable
            remote
            placeholder="必选项"
            :remote-method="querySearchH5Id"
            clearable
          >
            <el-option v-for="item in H5Ids" :key="item.id" :label="item.value" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公益项目分类" prop="cateIds">
          <!-- <el-input v-model="addForm.cateIds"></el-input> -->
          <el-checkbox-group v-model="addCheckboxData.checkedCities">
            <el-checkbox
              v-for="item in addCheckboxData.cities"
              :label="item.id"
              :key="item.id"
            >{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="目标善款金额" prop="targetMoney">
          <el-input
            v-model="addForm.targetMoney"
            type="number"
            onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )"
          ></el-input>
        </el-form-item>
        <el-form-item label="轮播图" prop="bannerImgs">
          <bannner-Upload @returnImgList="getBannerList"></bannner-Upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <template slot-scope="scope">
          <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addSubmit(scope.$index,scope.res)" :loading="addLoading">提交</el-button>
        </template> -->
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--编辑界面-->
    <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">
        <el-form-item label="标题" prop="title">
          <el-input v-model="editForm.title"></el-input>
        </el-form-item>
        <el-form-item label="简介描述" prop="description">
          <el-input v-model="editForm.description" type="textarea" :rows="2"></el-input>
        </el-form-item>
        <el-form-item label="公益透明度提示" prop="tips">
          <el-input v-model="editForm.tips" type="textarea" :rows="2"></el-input>
        </el-form-item>
        <el-form-item label="公益机构" class="dian" >
          <el-select
            v-model="editForm.orgId"
            filterable
            remote
            placeholder="必选项"
            :remote-method="querySearchOrg"
            clearable
          >
            <el-option v-for="item in orgIds" :key="item.id" :label="item.value" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发起人">
          <el-select
            v-model="editForm.initiatorId"
            filterable
            remote
            placeholder="必选项"
            :remote-method="querySearchInitiator"
            clearable
          >
            <el-option
              v-for="item in initiatorIds"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="善款接受方">
          <!-- <el-input v-model="addForm.recipientId"></el-input> -->
          <el-select
            v-model="editForm.recipientsId"
            filterable
            remote
            placeholder="必选项"
            :remote-method="querySearchRecipients"
            clearable
          >
            <el-option
              v-for="item in recipientsIds"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目负责人">
          <!-- <el-input v-model="addForm.mgrId"></el-input> -->
          <el-select
            v-model="editForm.leaderId"
            filterable
            remote
            placeholder="必选项"
            :remote-method="querySearchLeader"
            clearable
          >
            <el-option
              v-for="item in leaderIds"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标签" prop="tags">
          <el-checkbox-group v-model="checkedLabels" :min="1" :max="3">
            <el-checkbox v-for="label in labels" :label="label" :key="label">{{label}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="图文详情">
          <!-- <el-input v-model="addForm.h5Id"></el-input> -->
          <el-select
            v-model="editForm.h5Id"
            filterable
            remote
            placeholder="必选项"
            :remote-method="querySearchH5Id"
            clearable
          >
            <el-option v-for="item in H5Ids" :key="item.id" :label="item.value" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="公益项目分类" prop="cateIds">
          <!-- <el-input v-model="addForm.cateIds"></el-input> -->
          <el-checkbox-group v-model="addCheckboxData.checkedCities">
            <el-checkbox
              v-for="item in addCheckboxData.cities"
              :label="item.id"
              :key="item.id"
            >{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="目标善款金额" prop="targetMoney">
          <el-input
            v-model="editForm.targetMoney"
            type="number"
             onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )" 
          ></el-input>
        </el-form-item>
        <el-form-item label="轮播图" prop="bannerImgs">
          <bannner-Upload @returnImgList="getBannerList"></bannner-Upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!-- 详情页面 -->
    <el-dialog title="详情" v-model="detailsVisible" :close-on-click-modal="false">
      <particulars :particulars="particulars" :page="1"/>
    </el-dialog>
  </section>
</template>

<script>
import {
  getProjects,
  delProject,
  // getProject,
  addProject,
  updateProject,
  listOrg,
  listInitiator,
  listCategory,
  listRecipients,
  listLeader,
  listH5
} from "../../api/api";
import particulars from "../component/particulars";
import bannerUpload from "../component/bannerUpload";
import "../../style/element-ui.css";
const checkLabel = ["一周一善行", "特别关注", "爱心进展"];
export default {
  data() {
    return {
      displayName: [],
      checkedLabels: [],
      labels: checkLabel,
      page: 1,
      filters: {
        title: ""
      },
      //关联数据接口
      addAllIdsName: {
        orgName: ""
        // originatorName:""
      },
      orgIds: [],
      initiatorIds: [],
      recipientsIds: [],
      leaderIds: [],
      H5Ids: [],
      //此处数据为新增的复选框数据
      addCheckboxData: {
        checkedCities: [],
        cities: []
      },
      dialogImageUrl: "",
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
        // initiatorId: "",
        recipientId: "",
        // mgrId: "",
        tags: "",
        h5Id: "",
        cateIds: "",
        // orgId: "",
        tips: "",
        description: "",
        title: "",
        targetMoney: "",
        imgs: "",
        initiatorId:""
      },
      //编辑界面数据
      editForm: {
       // initiatorId: "",
        recipientId: "",
        // mgrId: "",
        tags: "",
        h5Id: "",
        cateIds: "",
        // orgId: "",
        tips: "",
        description: "",
        title: "",
        targetMoney: "",
        imgs: "",
        initiatorId:""
      },
      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      addFormRules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        description: [
          { required: true, message: "请输入项目简介或描述", trigger: "blur" }
        ],
        tips: [
          { required: true, message: "请填写公益透明度提示", trigger: "blur" }
        ],
        //  orgId: [{ required: true, message: "请选择公益机构", trigger: "blur" }],
        //  initiatorId: [{ required: true, message: "请选择发起人", trigger: "blur" }],
        //  recipientsId: [{ required: true, message: "请选择善款接受方", trigger: "blur" }],
        //  leaderId: [{ required: true, message: "请选择项目负责人", trigger: "blur" }],
        // tags: [{ required: true, message: "请选择标签", trigger: "blur" }],
        //  h5Id: [{ required: true, message: "请选择图文详情", trigger: "blur" }],
        // cateIds: [{ required: true, message: "请选择分类", trigger: "blur" }],
        // bannerImgs: [
        //   { required: true, message: "请上传轮播图", trigger: "blur" }
        // ],

        targetMoney: [
          {
            required: true,
            message: "请输入正确的金额数值",
            trigger: "blur"
          }
        ]
      },
      editFormRules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        description: [
          { required: true, message: "请输入项目简介或描述", trigger: "blur" }
        ],
        tips: [
          { required: true, message: "请填写公益透明度提示", trigger: "blur" }
        ],
        targetMoney: [
          {
            required: true,
            message: "请输入正确的金额数值",
            trigger: "blur"
          }
        ]
        // imgs: [{ required: true, message: "请输入图片地址", trigger: "blur" }]
      },
      options: []
    };
  },
  created() {
    let that = this;
    document.onkeypress = function(e) {
      var keycode = document.all ? event.keyCode : e.which;
      if (keycode == 13) {
        that.queryGetProjects(); // 登录方法名
        return false;
      }
    };
  },

  methods: {
    // 搜索列表
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
    // 列表
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
    handleDetails: function(index, row) {
      this.detailsVisible = true;
      this.particulars = {};
      this.particulars = Object.assign({}, row);
      console.log(this.particulars);
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
        // initiatorId: "",
        recipientId: "",
        mgrId: "",
        tags: "",
        h5Id: "",
        cateIds: "",
        // orgId: "",
        tips: "",
        description: "",
        title: "",
        targetMoney: "",
        imgs: ""
      };
      // this.$refs['addForm'].resetFields();
      this.$nextTick(() => {
        this.$refs["addForm"].resetFields();
      });
    },
    //新增
    addSubmit: function() {
      
      this.$refs.addForm.validate(valid => {
        
        if (valid) {
          
          // if(this.addForm.orgId =""){
          //   console.log(1);
          //   this.$message({
          //         message: "请选择公益机构",
          //         type: "warning"
          //       });
          // }else if(this.addForm.initiatorId =""){
          //     this.$message({
          //       message: "请选择发起人",
          //       type: "warning"
          //     });
          // }
          
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addLoading = true;
            //NProgress.start();
            this.addForm.cateIds = this.addCheckboxData.checkedCities.toString();

            this.addForm.tags = this.checkedLabels.toString();
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
      this.editLoading=false;
      this.editForm = Object.assign({}, row);
      this.$nextTick(() => {
        this.$refs["editForm"].resetFields();
      });
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
            updateProject({
              token: sessionStorage.getItem("token"),
              description: para.description,
              title: para.title,
              targetMoney: para.targetMoney,
              tips:para.tips,
              orgId:para.orgId,
              initiatorId:para.initiatorId,
              recipientId:para.recipientId,
              mgrId:para.mgrId,
              h5Id:para.h5Id,
              tags:para.tags,
              cateIds:para.cateIds,
              imgs: para.imgs,
              id: para.id
            }).then(res => {
                console.log(res);
                if (res.code == 1) {
                  //NProgress.done();
                  this.$message({
                    message: "提交成功",
                    type: "success"
                  });
                  // this.$refs["editForm"].resetFields();
                  this.editFormVisible = false;
                  this.getProjects();
                } else {
                  this.$message({
                    message: res.message,
                    type: "error"
                  });
                }
              })
              .catch(res => {
                this.editFormVisible = false;
                console.log(res);
              });
          });
        }
      });
    },

    // 关联接口数据
    //此方法为机构关键字搜索方法
    querySearchOrg(queryString) {
      listOrg({
        token: sessionStorage.getItem("token"),
        pageNum: this.page,
        pageSize: 10,
        displayName: queryString
      }).then(res => {
        if (res.code == 1) {
          let reOrg = [];
          for (let i = 0; i < res.data.data.length; i++) {
            let item = res.data.data[i];
            reOrg.push({
              value: item.displayName,
              id: item.id
            });
          }
          this.orgIds = reOrg;
        }
      });
    },

    //  此方法为发起人搜索方法

    querySearchInitiator(queryString) {
      listInitiator({
        token: sessionStorage.getItem("token"),
        pageNum: this.page,
        pageSize: 10,
        displayName: queryString
      }).then(res => {
        if (res.code == 1) {
          let reInitiator = [];
          for (let i = 0; i < res.data.data.length; i++) {
            let item = res.data.data[i];
            reInitiator.push({
              value: item.displayName,
              id: item.id
            });
          }
          this.initiatorIds = reInitiator;
        }
      });
    },

    //  此方法为善款接受方搜索方法

    querySearchRecipients(queryString) {
      listRecipients({
        token: sessionStorage.getItem("token"),
        pageNum: this.page,
        pageSize: 10,
        displayName: queryString
      }).then(res => {
        if (res.code == 1) {
          let reRecipients = [];
          for (let i = 0; i < res.data.data.length; i++) {
            let item = res.data.data[i];
            reRecipients.push({
              value: item.displayName,
              id: item.id
            });
          }
          this.recipientsIds = reRecipients;
        }
      });
    },

    // 此方法为项目负责人搜索方法
    querySearchLeader(queryString) {
      listLeader({
        token: sessionStorage.getItem("token"),
        pageNum: this.page,
        pageSize: 10,
        displayName: queryString
      }).then(res => {
        if (res.code == 1) {
          let reLeader = [];
          for (let i = 0; i < res.data.data.length; i++) {
            let item = res.data.data[i];
            reLeader.push({
              value: item.displayName,
              id: item.id
            });
          }
          this.leaderIds = reLeader;
        }
      });
    },

    //此方法为h5Id搜索方法
    querySearchH5Id(queryString) {
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
          this.H5Ids = reH5;
        }
      });
    },

    // 轮播图上传
    //子父传值获取图片上传之后的图片地址
    getBannerList(val) {
      this.addForm.imgs = String(val);
    }
  },
  mounted() {
    this.getProjects();

    //获取新增复选框数据
    listCategory({
      token: sessionStorage.getItem("token"),
      pageNum: this.page,
      pageSize: 100,
      cateName: ""
    }).then(res => {
      if (res.code == 1) {
        for (var i = 0; i < res.data.data.length; i++) {
          var item = res.data.data[i];
          this.addCheckboxData.cities.push({
            name: item.cateName,
            id: item.id
          });
        }
      }
    });
  },
  components: {
    particulars,
    "bannner-Upload": bannerUpload
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
.inline-input {
  width: 380px;
}
// .dian {
//   position: relative;
// }
// .dian::before {
//   content: "*";
//   color: #ff4949;
//   position: absolute;
//   top: 14px;
//   left: 0;
// }

</style>