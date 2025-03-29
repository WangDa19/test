const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const auth = require('../middleware/auth');

// 配置文件上传
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/avatars/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 限制5MB
});

// 获取用户信息
router.get('/info', auth, async (req, res) => {
  try {
    // 从数据库获取用户信息
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ code: 1, msg: '用户不存在' });
    }
    
    // 返回非敏感信息
    res.json({
      code: 0,
      data: {
        id: user._id,
        nickname: user.nickname,
        avatar: user.avatar,
        signature: user.signature,
        contact: user.contact,
        followCount: user.followCount,
        fansCount: user.fansCount,
        likeCount: user.likeCount,
        educationInfo: user.educationInfo
      }
    });
  } catch (err) {
    res.status(500).json({ code: 1, msg: '服务器错误' });
  }
});

// 更新用户资料
router.post('/profile', auth, async (req, res) => {
  try {
    const { nickname, signature, contact } = req.body;
    
    // 简单验证
    if (!nickname) {
      return res.status(400).json({ code: 1, msg: '昵称不能为空' });
    }
    
    // 更新数据库中的用户信息
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { 
        nickname,
        signature,
        contact
      },
      { new: true } // 返回更新后的数据
    );
    
    res.json({
      code: 0,
      msg: '更新成功',
      data: {
        id: updatedUser._id,
        nickname: updatedUser.nickname,
        avatar: updatedUser.avatar,
        signature: updatedUser.signature,
        contact: updatedUser.contact
      }
    });
  } catch (err) {
    res.status(500).json({ code: 1, msg: '服务器错误' });
  }
});

// 上传头像
router.post('/upload', auth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ code: 1, msg: '请选择要上传的文件' });
    }
    
    // 文件URL
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/avatars/${req.file.filename}`;
    
    // 更新用户头像
    await User.findByIdAndUpdate(req.userId, { avatar: fileUrl });
    
    res.json({
      code: 0,
      msg: '上传成功',
      url: fileUrl
    });
  } catch (err) {
    res.status(500).json({ code: 1, msg: '服务器错误' });
  }
});

module.exports = router; 