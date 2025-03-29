'use strict';

exports.main = async (event, context) => {
    // 获取上传的文件
    const { file } = event;

    // 检查是否上传了文件
    if (!file) {
        return {
            code: 400,
            message: '请上传文件'
        };
    }

    // 检查 file 对象是否包含必要的字段
    if (!file.name || !file.tempFilePath || !file.type) {
        return {
            code: 400,
            message: '传递的 file 对象缺少必要字段，请检查前端文件上传逻辑。'
        };
    }

    // 打印 file 对象，用于调试
    console.log('上传的文件对象:', file);

    // 检查 tempFilePath 是否为有效的本地路径
    if (!file.tempFilePath || typeof file.tempFilePath !== 'string' || file.tempFilePath.trim() === '') {
        return {
            code: 400,
            message: '传递的 tempFilePath 为空或不是有效的字符串，请检查前端文件上传逻辑。'
        };
    }

    // 定义允许上传的文件类型和最大文件大小（示例：允许上传图片，最大 5MB）
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    // 检查文件类型和大小
    if (!allowedTypes.includes(file.type)) {
        return {
            code: 400,
            message: '不允许上传该类型的文件，请上传图片文件'
        };
    }

    // 生成文件存储路径
    const filePath = `uploads/${Date.now()}_${file.name}`;

    // 上传文件到云存储
    try {
        const result = await uniCloud.uploadFile({
            filePath: file.tempFilePath, // 直接使用临时文件路径
            cloudPath: filePath // 云端存储路径
        });

        // 构建文件下载链接
        const downloadUrl = `https://mp-4d741a2a-2b64-40b1-8ef5-31be31049de4.cdn.bspapp.com/${filePath}`;

        return {
            code: 200,
            message: '上传成功',
            data: {
                fileID: result.fileID, // 返回文件ID
                filePath: filePath, // 返回文件路径
                downloadUrl: downloadUrl // 返回文件下载链接
            }
        };
    } catch (error) {
        console.error('文件上传出错:', error);
        return {
            code: 500,
            message: '上传失败',
            error: {
                message: error.message,
                type: error.constructor.name,
                stack: error.stack
            }
        };
    }
};