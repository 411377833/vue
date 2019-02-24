<template>
  <section class="benefit">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <!-- <el-form-item>
          <el-input v-model="filters.id" placeholder="请输入捐款订单号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="queryListOrg">查询</el-button>
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
      <el-table-column prop="orderNum" label="捐款订单号" width="200"></el-table-column>
      
      
      <el-table-column prop="itemTitle" label="公益项目" width="300"></el-table-column>
      <el-table-column prop="recUserName" label="善款接收人" width="200"></el-table-column>
      <el-table-column prop="donationCash" label="捐款现金数" min-width="120"></el-table-column>
      <el-table-column prop="donationFlower" label="捐款小红花数" min-width="120"></el-table-column>

      <el-table-column label="操作" width="220" fixed="right">
        <template slot-scope="scope">
          <!-- <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
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
        <el-form-item label="公益项目" prop="gyItemId">
          <el-input v-model="addForm.gyItemId"></el-input>
          
        </el-form-item>
        <el-form-item label="用户编号" prop="userId" placeholder="请填写用户编号">
          <el-input v-model="addForm.userId"></el-input>
        </el-form-item>
        <el-form-item label="捐款的现金数" prop="donationCash" placeholder="请填写捐款金额">
          <el-input v-model="addForm.donationCash"></el-input>
        </el-form-item>
        <el-form-item label="捐款的小红花数" prop="donationFlower" placeholder="请填写捐款小红花数量">
          <el-input v-model="addForm.donationFlower"></el-input>
        </el-form-item>
       
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>

    

    <!-- 详情界面 -->
    <el-dialog title="详情" v-model="detailsVisible" :close-on-click-modal="false">
      <particulars :particulars = "particulars"/>
    </el-dialog>
  </section>
</template>

<script>
import { getDonations, delDonation, addDonation } from "../../api/api";
import particulars from '../component/particulars'

export default {//editForm.headImg
  data() {
    return {
      page: 1,
      filters: {
        displayName: ""
      },
      dialogVisible:false,
      abc:{
        token:sessionStorage.getItem("token")
      },
      detailsVisible:false,
      //   imageUrl: '',
      total: 0,
      tableData: [],
      listLoading: false,
      particulars:{},
      //新增界面数据
      addForm: {
        gyItemId: "",
        userId: "",
        donationCash: "",
        donationFlower:''
      },
      
      addFormVisible: false, //新增界面是否显示
      addLoading: false,
      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      addFormRules: {
        gyItemId: [
          { required: true, message: "请输入公益项目编号", trigger: "blur" }
        ],
        userId: [
          { required: true, message: "请输入用户编号", trigger: "blur" }
        ],
        donationCash: [
          { required: true, message: "请填写捐款的现金数", trigger: "blur" }
        ],
        donationFlower: [
          { required: true, message: "请填写捐款的小红花数", trigger: "blur" }
        ]
        // headImg:[
        //     {required: true, message: "请上传机构头像", trigger: "blur"}
        // ]
      },
      // editFormRules: {
      //   idCard: [
      //     { required: true, message: "请输入机构代码", trigger: "blur" }
      //   ],
      //   displayName: [
      //     { required: true, message: "请输入机构名称", trigger: "blur" }
      //   ],
      //   signature: [
      //     { required: true, message: "请填写机构说明", trigger: "blur" }
      //   ]
      // },
      addHeadImg:"",
      editHeadImg:''
      
    };
  },
  methods: {
    queryListOrg() {
      let _this = this;
      if (_this.filters.id) {
        getDonations({
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
        _this.getDonations();
      }
    },
    // 列表
    getDonations() {
      let _this = this;
      getDonations({
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
          delDonation({
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
              _this.getDonations();
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
      this.page = val;
      if (!this.filters.id) {
        this.getDonations();
      }
    },



    //显示新增界面
    handleAdd: function() {
      this.addFormVisible = true;
      this.addHeadImg = ''
      this.addForm = {
        gyItemId: "",
        userId: "",
        donationCash: "",
        donationFlower: "",
        
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
            console.log(para)
            // para.headImg=this.addForm.headImg
            para.token = sessionStorage.getItem("token");
            addDonation(para).then(res => {
              console.log(res);
              if (res.code == 1) {
                //NProgress.done();
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.$refs["addForm"].resetFields();
                this.addFormVisible = false;
                this.getDonations();
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
    
   



  },
  mounted() {
    this.getDonations();
    
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