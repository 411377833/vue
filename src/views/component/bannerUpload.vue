<template>
<div class="bannerUpload">
    <el-upload 
         class="upload-demo"
         list-type="picture" 
         ref="upload"
         action="http://api.50wlkj.com/api/upload_img" 
         :data="uploadConfiguration.uploadData" 
         :limit="uploadConfiguration.limit" 
         :multiple="uploadConfiguration.multiple" 
         :on-remove="handleRemove" 
         :on-success="handleAvatarSuccess"
         :on-error="imgUploadError"
         :on-exceed="handleExceed">
           <el-button size="small" type="primary">点击上传</el-button>
           <div slot="tip" class="el-upload__tip">上传图片大小不能超过4M</div>
        </el-upload>
</div>
</template>
<script>
export default {
    name: 'bannerUpload',
    data() {
        return {
            uploadConfiguration: {
                fileList1: [],
                uploadData: {
                    token: sessionStorage.getItem('token')
                },
                limit: '3',
                multiple: true,
            }
        };
    },
    methods: {
        handleRemove(file, fileList) { //移除图片
            this.uploadConfiguration.fileList1 = [];
            for(var i = 0;i<fileList.length;i++){
                var item = fileList[i];
                this.uploadConfiguration.fileList1.push(item.response.data);
            }
            this.$emit("returnImgList", this.uploadConfiguration.fileList1);
        },
        beforeAvatarUpload(file) { //文件上传之前调用做一些拦截限制
            const isJPG =
        file.type === "image/gif,image/jpeg,image/jpg,image/png,image/svg";
      const isLt4M = file.size / 1024 / 1024 < 4;

            // if (!isJPG) {
            //     this.$message.error('上传头像图片只能是 JPG 格式!');
            // }
            if (!isLt4M) {
                this.$message.error('上传图片大小不能超过 4MB!');
            }
            return  isLt4M;
        },
        handleAvatarSuccess(res, file) {
            if (res.code == 1) {
                this.$message({
                    message: '图片上传成功',
                    type: 'success'
                });
                this.uploadConfiguration.fileList1.push(res.data);
                this.$emit("returnImgList", this.uploadConfiguration.fileList1);
            }
        },
        submitUpload() { //图片上传成功
            this.$refs.upload.submit();
        },
        handleExceed(files, fileList) { //图片上传超过数量限制
            this.$message.warning(`当前限制选择 ${this.uploadConfiguration.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        imgUploadError(err, file, fileList) { //图片上传失败调用
            this.$message.error('上传图片失败!');
        }
    }

}
</script>

<style>
.bannerUpload .el-upload-list--picture .el-upload-list__item {
    width: 30%;
    display: inline-block;
    margin-left: 10px;
}
</style>