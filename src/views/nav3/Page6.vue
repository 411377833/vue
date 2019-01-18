<template>
	<section>
		<el-upload
			action="http://api.50wlkj.com/api/upload_img"
			list-type="picture-card"
			:on-preview="handlePictureCardPreview"
			:on-remove="handleRemove">
			<i class="el-icon-plus"></i>
			</el-upload>
			<el-dialog :visible.sync="dialogVisible">
			<img width="100%" :src="dialogImageUrl" alt="">
		</el-dialog>
	</section>
</template>
<script>
  export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false
      };
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
		  console.log(file)
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    }
  }
</script>