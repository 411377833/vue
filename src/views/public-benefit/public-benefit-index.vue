<template>
	<section class="benefit">
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
          <el-form :inline="true" :model="filters">
            <el-form-item>
              <el-input v-model="filters.id" placeholder="请输入项目id"></el-input>
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
          </el-table-column> -->
          <!-- <el-table-column type="index" label="顺序" width="100" >
          </el-table-column> -->
          <el-table-column prop="id" label="编号" width="120" >
          </el-table-column>
          <el-table-column prop="creatorId" label="创建人编号" width="100">
          </el-table-column>
          <el-table-column prop="createTime" label="创建日期" width="100" >
          </el-table-column>
          <el-table-column prop="lastUpdateTime" label="最后修改时间" width="120" >
          </el-table-column>
          <el-table-column prop="title" label="标题" min-width="180" >
          </el-table-column>
          <el-table-column prop="description" label="简介描述	" min-width="180" >
          </el-table-column>
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
          <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
          </el-pagination>
        </el-col>


        <!--新增界面-->
      <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
        <el-form size='mini' :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
          <el-form-item label="标题" prop="title"><el-input v-model="addForm.title"></el-input></el-form-item>
          <el-form-item label="简介描述"><el-input v-model="addForm.description"></el-input></el-form-item>
          <el-form-item label="公益透明度提示"><el-input v-model="addForm.tips"></el-input></el-form-item>
          <el-form-item label="发起机构ID"><el-input v-model="addForm.orgId"></el-input></el-form-item>
          <el-form-item label="发起人ID"><el-input v-model="addForm.initiatorId"></el-input></el-form-item>
          <el-form-item label="善款接受方ID"><el-input v-model="addForm.recipientId"></el-input></el-form-item>
          <el-form-item label="项目负责人ID"><el-input v-model="addForm.mgrId"></el-input></el-form-item>
          <el-form-item label="标签"><el-input v-model="addForm.tags"></el-input></el-form-item>
          <el-form-item label="图文详情" prop="imgs"><el-input v-model="addForm.h5Id"></el-input></el-form-item>
          <el-form-item label="公益项目分类id"><el-input v-model="addForm.cateIds"></el-input></el-form-item>
          <el-form-item label="目标善款金额"><el-input v-model="addForm.targetMoney"></el-input></el-form-item>
          <el-form-item label="详情页轮播图"><el-input v-model="addForm.imgs"></el-input></el-form-item>


        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click.native="addFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
        </div>
      </el-dialog>


      <!--编辑界面-->
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
          <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
            <el-form-item label="标题" prop="title"><el-input v-model="editForm.title"></el-input></el-form-item>
            <el-form-item label="简介描述"><el-input v-model="editForm.description"></el-input></el-form-item>
            <el-form-item label="公益透明度提示"><el-input v-model="editForm.tips"></el-input></el-form-item>
            <el-form-item label="发起机构ID"><el-input v-model="editForm.orgId"></el-input></el-form-item>
            <el-form-item label="发起人ID"><el-input v-model="editForm.initiatorId"></el-input></el-form-item>
            <el-form-item label="善款接受方ID"><el-input v-model="editForm.recipientId"></el-input></el-form-item>
            <el-form-item label="项目负责人ID"><el-input v-model="editForm.mgrId"></el-input></el-form-item>
            <el-form-item label="标签"><el-input v-model="editForm.tags"></el-input></el-form-item>
            <el-form-item label="图文详情" prop="imgs"><el-input v-model="editForm.h5Id"></el-input></el-form-item>
            <el-form-item label="公益项目分类id"><el-input v-model="editForm.cateIds"></el-input></el-form-item>
            <el-form-item label="目标善款金额"><el-input v-model="editForm.targetMoney"></el-input></el-form-item>
            <el-form-item label="详情页轮播图"><el-input v-model="editForm.imgs"></el-input></el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="editFormVisible = false">取消</el-button>
            <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
          </div>
        </el-dialog>


    </section>
    
</template>

<script>
  import {getProjects,delProject,getProject,addProject,updateProject} from '../../api/api'
  export default {
    data() {
      return {
        page:1,
        filters: {
					id: ''
        },
        total:0,
        tableData: [],
        listLoading:false,
        //新增界面数据  
				addForm: {
					initiatorId: '',
					recipientId: '',
					mgrId: '',
					tags: '',
					h5Id: '',
					cateIds:'',
					orgId:'',
					tips:'',
					description:'',
					title:'',
          targetMoney:'',
          imgs:'',
        },
        //编辑界面数据
				editForm: {
					initiatorId: '',
					recipientId: '',
					mgrId: '',
					tags: '',
					h5Id: '',
					cateIds:'',
					orgId:'',
					tips:'',
					description:'',
					title:'',
          targetMoney:'',
          imgs:'',
				},
        addFormVisible: false,//新增界面是否显示
        addLoading: false,
        editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				addFormRules: {
					title: [
						{ required: true, message: '请输入标题', trigger: 'blur' }
          ],
          imgs: [
						{ required: true, message: '请输入图片地址', trigger: 'blur' }
					],
        },
        editFormRules: {
					title: [
						{ required: true, message: '请输入标题', trigger: 'blur' }
          ],
          imgs: [
						{ required: true, message: '请输入图片地址', trigger: 'blur' }
					],
				},
        
      };
    },
    methods: {
      queryGetProjects(){
        let _this = this;
        if(_this.filters.id){
          getProject({
            token:sessionStorage.getItem('token'), 
            id:_this.filters.id
          }).then((res)=>{
            console.log(res)
            if(res.code ===1){
              let arr = []
              arr.push(res.data)
              _this.tableData = arr
              _this.total= res.data.total
            }else{
              this.$message({
                message: res.message,
                type: 'error'
              });
            }
          })
        }else{
          _this.getProjects()
        }
      },
      getProjects(){
        let _this = this;
        getProjects({
          token:sessionStorage.getItem('token'),
          pageNum:this.page,
          pageSize:10,
          title:'',
          description:''
        }).then((res)=>{
          console.log(res)
          if(res.code ===1){
            _this.tableData = res.data.data
            _this.total= res.data.total
          }else{
            this.$message({
              message: res.message,
              type: 'error'
            });
          }
        })
      },
      
      //删除
			handleDel: function (index, row) {
        let _this = this;
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id };
					// removeUser(para).then((res) => {
					// 	this.listLoading = false;
					// 	//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
					// 	this.getUsers();
          // });
          delProject({
            token:sessionStorage.getItem('token'),
            id:row.id
          }).then((res)=>{
            console.log(res)
            if(res.code == 1){
              this.listLoading = false;
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              _this.getProjects()
            }
          })
				}).catch(() => {

				});
      },
      //分页
      handleCurrentChange(val) {
        console.log(val)
        this.page = val;
        if(!this.filters.id){
          this.getProjects()
        }
        // this.getProjects()
      },
      //显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					initiatorId: '',
					recipientId: '',
					mgrId: '',
					tags: '',
					h5Id: '',
					cateIds:'',
					orgId:'',
					tips:'',
					description:'',
					title:'',
          targetMoney:'',
          imgs:'',
				};
      },
      //新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
          
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
              let para = Object.assign({}, this.addForm);
              console.log(para)
							para.token = sessionStorage.getItem('token')
							addProject(para).then((res) => {
                console.log(res)
                if(res.code == 1){
                  //NProgress.done();
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  });
                  this.$refs['addForm'].resetFields();
                  this.addFormVisible = false;
                  this.getProjects();
                }else{
                  this.$message({
                    message: res.message,
                    type: 'error'
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
			handleEdit: function (index, row) {
                console.log(row)
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
                    
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
                            //NProgress.start();
                            console.log(valid)
                            console.dir(this.editForm)
              let para = Object.assign({}, this.editForm);
              console.log(para)
							para.token = sessionStorage.getItem('token')
							updateProject(para).then((res) => {
                console.log(res)
                if(res.code == 1){
                  //NProgress.done();
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  });
                  this.$refs['editForm'].resetFields();
                  this.editFormVisible = false;
                  this.getProjects();
                }else{
                  this.$message({
                    message: res.message,
                    type: 'error'
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
							}).catch((res)=>{
                this.editFormVisible = false;
                console.log(res)
              });
						});
					}
				});
			},
    },
    mounted() {
      this.getProjects();
    }
  };
</script>
<style lang="scss" scoped>
.benefit{

    .top{
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
    }
} 
</style>