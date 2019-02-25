<template>
  <section class="benefit">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.id" placeholder="请输入公益项目编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="queryGetProve">查询</el-button>
        </el-form-item>
        <!-- <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>-->
      </el-form>
    </el-col>

    <el-table :data="tableData" highlight-current-row v-loading="listLoading" style="width: 100%;">
      <!-- <el-table-column type="selection" width="55">
      </el-table-column>-->
      <!-- <el-table-column type="index" label="顺序" width="100" >
      </el-table-column>-->
      <!-- <el-table-column prop="id" label="ID" width="200"></el-table-column> -->
      <el-table-column prop="gyItemId" label="公益项目编号" width="300"></el-table-column>
      <el-table-column prop="userName" label="证实人姓名	" width="180"></el-table-column>
      <el-table-column prop="userPhone" label="证实人手机号码	" width="180"></el-table-column>
      <el-table-column prop="content" label="证实内容" min-width="180"></el-table-column>
      <el-table-column prop="relation" label="与受捐者关系" min-width="180"></el-table-column>
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

    <!--编辑界面-->
    <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false" >
      <el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">
        <el-form-item label="证实人姓名" prop="userName">
          <el-input v-model="editForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="userPhone">
          <el-input v-model="editForm.userPhone" type="number"
            onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )"></el-input>
        </el-form-item>
        

        <el-form-item label="证实内容" prop="content">
          <el-input v-model="editForm.content"></el-input>
        </el-form-item>
        <el-form-item label="与受款人关系" prop="relation">
          <el-input v-model="editForm.relation"></el-input>
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
var validPhone=(rule, value,callback)=>{
      if (!value){
          callback(new Error('请输入电话号码'))
      }else  if (!isvalidPhone(value)){
        callback(new Error('请输入正确的11位手机号码'))
      }else {
          callback()
      }
  };

import {
  getProves,
  delProve,
  // getLeader,
  // addLeader,
  updateProve
} from "../../api/api";
import particulars from "../component/particulars";
import {isvalidPhone} from "../../common/js/validate"
export default {
  data() {
    return {
      page: 1,
      filters: {
        gyItemId: ""
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
      // addForm: {

      //   // idCard: "",
      //   displayName: "",
      //   signature: "",
      //   headImg:""
      // },
      //编辑界面数据
      editForm: {
        // idCard: "",
        userName: "",
        userPhone: "",
        content: "",
        relation: ""
      },
      // addFormVisible: false, //新增界面是否显示
      // addLoading: false,
      editFormVisible: false, //编辑界面是否显示
      editLoading: false,

      editFormRules: {
        userName: [
          { required: true, message: "请填写证实人姓名", trigger: "blur" }
        ],
        userPhone: [
          // { required: true, message: "联系电话不能为空", trigger: "blur" }
          { required: true,trigger: "blur" , validator: validPhone }
          // { type: 'number', message: '年龄必须为数字值'}
        ],
        content: [
          { required: true, message: "请填写证实内容", trigger: "blur" }
        ],
        relation: [
          { required: true, message: "请填写与受款人的关系", trigger: "blur" }
        ]
      }
      // addHeadImg:"",
      // editHeadImg:''
    };
  },
  created() {
    let that = this;
    document.onkeypress = function(e) {
      var keycode = document.all ? event.keyCode : e.which;
      if (keycode == 13) {
        that.queryGetProve(); // 登录方法名
        return false;
      }
    };
  },
  methods: {
    queryGetProve() {
      let _this = this;
      if (_this.filters.id) {
        getProves({
          token: sessionStorage.getItem("token"),
          gyItemId: _this.filters.id,
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
        _this.getProves();
      }
    },
    // 列表
    getProves() {
      let _this = this;
      getProves({
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
          delProve({
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
              _this.getProves();
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
        this.getProves();
      }
    },
    
    //显示编辑界面
    handleEdit: function(index, row) {
      console.log(row);
      this.editFormVisible = true;
      // this.editHeadImg = row.headImg;
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
            
            updateProve({
              token: sessionStorage.getItem("token"),
              id: para.id,
              userName: para.userName,
              userPhone: para.userPhone,
              content: para.content,
              relation: para.relation
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
                  this.getProves();
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
    this.getProves();
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