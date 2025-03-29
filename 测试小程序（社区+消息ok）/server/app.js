const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 连接MongoDB
mongoose.connect('mongodb://localhost:27017/outdoor', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// 用户模型
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  avatar: String,
  createdAt: { type: Date, default: Date.now }
});

// 活动模型
const activitySchema = new mongoose.Schema({
  title: String,
  type: String,
  time: String,
  location: String,
  content: String,
  images: [String],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Activity = mongoose.model('Activity', activitySchema);

// 文件上传配置
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage });

// 上传接口
app.post('/api/upload', upload.single('file'), (req, res) => {
  res.json({
    url: `http://localhost:3000/${req.file.path}`
  });
});

// 活动发布接口
app.post('/api/activities', async (req, res) => {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    res.status(201).json(activity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 获取活动列表
app.get('/api/activities', async (req, res) => {
  try {
    const activities = await Activity.find().populate('userId');
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 