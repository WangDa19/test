<template>
  <view class="publish-container">
    <view class="form-item">
      <input v-model="form.title" placeholder="活动标题" />
    </view>
    <view class="form-item">
      <textarea v-model="form.content" placeholder="活动描述" />
    </view>
    <view class="form-item">
      <button @tap="uploadImage">上传图片</button>
      <image v-for="(img, index) in form.images" :key="index" :src="img" class="preview-image" />
    </view>
    <button @tap="submit">发布活动</button>
  </view>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: '',
        content: '',
        images: []
      }
    }
  },
  methods: {
    async uploadImage() {
      const [file] = await uni.chooseImage({
        count: 1,
        sourceType: ['album']
      });
      
      uni.uploadFile({
        url: 'http://localhost:3000/api/upload',
        filePath: file.tempFilePath,
        name: 'file',
        success: (res) => {
          this.form.images.push(JSON.parse(res.data).url);
        }
      });
    },
    async submit() {
      try {
        const res = await uni.request({
          url: 'http://localhost:3000/api/activities',
          method: 'POST',
          data: this.form
        });
        
        uni.showToast({ title: '发布成功' });
        uni.navigateBack();
      } catch (error) {
        uni.showToast({ title: '发布失败', icon: 'none' });
      }
    }
  }
}
</script> 