// ===================================
// 腾讯元器 (Yuanqi) 配置
// ===================================
const YUANQI_CONFIG = {
    // 🔴 必填：在这里粘贴你的腾讯元器 API Token
    token: 'V840Q13VN7vbs01x1cSRgztvsd806jeZ', 
    
    // 你的 Vercel 中转地址 (不用改)
    apiUrl: '/api/chat'
};

// ===================================
// 学员与老师配置 (手机号版)
// ===================================
const STUDENTS_CONFIG = [
    {
        phone: '13800138000',  // 👈 改成了手机号
        password: '123456',
        name: '张三',
        teacherName: '林雨老师',
        // 🔴 必填：在这里粘贴林雨老师的智能体 ID
        agentId: 'wPXzhpYIdign'
    },
    {
        phone: '13900139000',
        password: '123456',
        name: '李四',
        teacherName: '林雨老师',
        agentId: 'wPXzhpYIdign'
    }
];

