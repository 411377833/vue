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

      <el-table :data="tableData" highlight-current-row v-loading="listLoading" style="width: 100%;">
        <!-- <el-table-column type="selection" width="55">
        </el-table-column>-->
        <!-- <el-table-column type="index" label="顺序" width="100" >
        </el-table-column>-->
        <!-- <el-table-column prop="id" label="id" width="200"></el-table-column> -->
        <el-table-column prop="title" label="标题" width="300"></el-table-column>
        <el-table-column prop="description" label="描述" width="200"></el-table-column>
        <!-- <el-table-column prop="signature" label="说明	" min-width="180"></el-table-column> -->
        <el-table-column prop="createTime" label="创建时间" min-width="150"></el-table-column>
        <el-table-column prop="lastUpdateTime" label="最后修改时间" min-width="150"></el-table-column>
        <!-- <el-table-column prop="userType" label="类型" min-width="150"></el-table-column> -->
        <!-- <el-table-column prop="title" label="标题" min-width="180" >
        </el-table-column>-->
        <el-table-column label="操作" min-width="150">
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
      
    </div>
    <div v-if="nextPage" >
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
  // deleteCategory,
  // addCategory,
  // updateCategory
} from "../../api/api";
// import addPage from './addH5Page'
// import editPage from './editPage'
export default {
  data() {
    return {
      page: 1,
      filters: {
        cateName: ""
      },
      nextPage:false,
      //   imageUrl: '',
      total: 0,
      tableData: [],
      listLoading: false,
      addFormVisible: false, //新增界面是否显示
      editFormVisible: false, //编辑界面是否显示
      editData:{}
    };
  },
  methods: {
    queryGetGyInfos() {
      let _this = this;
      if (_this.filters.id) {
        getGyInfos({
          token: sessionStorage.getItem("token"),
          title: _this.filters.id,
          description:_this.filters.id,
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
              _this.getGyInfos();
            }
          });
        })
        .catch(() => {});
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
      this.nextPage = true;
      this.addFormVisible = true;
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.nextPage = true;
      this.addFormVisible = false;
      this.editFormVisible = true;
      this.editData = Object.assign({}, row);
    },
    goBack(){
      this.editFormVisible= false;
      this.addFormVisible = false;
      this.nextPage = false;
    },
    callback(){
      this.editFormVisible= false;
      this.addFormVisible = false;
      this.nextPage = false;
      this.getGyInfos()
    }
    
  },
  mounted() {
    this.getGyInfos();
  },
  // components: {
  //      addPage,
  //      editPage
  // },
};
</script>
<style lang="scss" scoped>
.benefit {
  .top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .goBack{
    text-align: right;
    margin-bottom: 10px;
  }
}
</style>