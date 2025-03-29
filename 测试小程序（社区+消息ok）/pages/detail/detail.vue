<template>
    <view class="detail-container">
        <!-- ... existing code ... -->
        
        <!-- 添加举报按钮到操作栏 -->
        <view class="action-bar">
            <!-- ... existing buttons ... -->
            <button class="report-btn" @click="showReport">举报</button>
        </view>
        
        <!-- 举报对话框 -->
        <uni-popup ref="reportPopup" type="center" :mask-click="false" v-if="showReportDialog">
            <view class="report-dialog">
                <view class="report-title">举报内容</view>
                <view class="report-form">
                    <view class="form-item">
                        <view class="label">举报类型</view>
                        <radio-group @change="e => reportForm.type = e.detail.value">
                            <label v-for="type in reportTypes" :key="type.value">
                                <radio :value="type.value" :checked="reportForm.type === type.value" />
                                {{type.label}}
                            </label>
                        </radio-group>
                    </view>
                    <view class="form-item">
                        <view class="label">举报原因</view>
                        <textarea v-model="reportForm.reason" placeholder="请详细描述举报原因" />
                    </view>
                    <view class="btn-group">
                        <button @click="showReportDialog = false">取消</button>
                        <button type="primary" @click="submitReport">提交</button>
                    </view>
                </view>
            </view>
        </uni-popup>
    </view>
</template>

<style>
/* 添加举报相关样式 */
.report-btn {
    font-size: 28rpx;
    color: #666;
    background: none;
    border: none;
    padding: 0;
    margin-left: 20rpx;
}

.report-dialog {
    background: #fff;
    border-radius: 12rpx;
    width: 600rpx;
    padding: 30rpx;
}

.report-title {
    font-size: 32rpx;
    font-weight: bold;
    text-align: center;
    margin-bottom: 30rpx;
}

.report-form .form-item {
    margin-bottom: 20rpx;
}

.report-form .label {
    font-size: 28rpx;
    margin-bottom: 10rpx;
}

.report-form radio-group {
    display: flex;
    flex-direction: column;
}

.report-form radio-group label {
    margin: 10rpx 0;
}

.report-form textarea {
    width: 100%;
    height: 200rpx;
    border: 1rpx solid #eee;
    border-radius: 8rpx;
    padding: 20rpx;
    font-size: 28rpx;
}

.btn-group {
    display: flex;
    justify-content: space-between;
    margin-top: 30rpx;
}

.btn-group button {
    width: 45%;
    font-size: 28rpx;
}
</style>

<script>
export default {
    data() {
        return {
            showReportDialog: false,
            reportTypes: [
                { value: 'SPAM', label: '垃圾广告' },
                { value: 'INAPPROPRIATE', label: '不当内容' },
                { value: 'FRAUD', label: '欺诈信息' },
                { value: 'VIOLATION', label: '违规内容' },
                { value: 'ILLEGAL', label: '违法信息' }
            ],
            reportForm: {
                type: '',
                reason: ''
            }
        }
    },
    methods: {
        showReport() {
            this.showReportDialog = true;
        },
        
        async submitReport() {
            if (!this.reportForm.type) {
                uni.showToast({
                    title: '请选择举报类型',
                    icon: 'none'
                });
                return;
            }
            
            try {
                const res = await uniCloud.callFunction({
                    name: 'reportHandler',
                    data: {
                        action: 'submitReport',
                        targetId: this.detail._id,
                        type: this.reportForm.type,
                        reason: this.reportForm.reason,
                        reporterId: this.userInfo._id
                    }
                });
                
                if (res.result.code === 0) {
                    uni.showToast({
                        title: '举报成功',
                        icon: 'success'
                    });
                    this.showReportDialog = false;
                    this.reportForm = {
                        type: '',
                        reason: ''
                    };
                } else {
                    throw new Error(res.result.msg);
                }
            } catch (error) {
                uni.showToast({
                    title: error.message || '举报失败',
                    icon: 'none'
                });
            }
        }
    }
}
</script> 