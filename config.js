// ===================================
// 腾讯元器 (Yuanqi) 配置
// ===================================
const YUANQI_CONFIG = {
    // 🔴 必填：在这里粘贴你的腾讯元器 API Token
    token: 'V840Q13VN7vbs01x1cSRgztvsd806jeZ', 
    
    // 元器的标准接口地址 (OpenAI 兼容版)
    apiUrl: 'https://yuanqi.tencent.com/openapi/v1/chat/completions'
};

// ===================================
// 学员与老师配置
// ===================================
const STUDENTS_CONFIG = [
    {
        studentId: '13911686514',
        password: '123456',
        name: '林同学',
        teacherName: '林雨老师',
        // 🔴 必填：在这里粘贴林雨老师的智能体 ID
        agentId: 'wPXzhpYIdign'
    },
    {
        studentId: '20240002',
        password: '123456',
        name: '李四',
        teacherName: '林雨老师',
        // 如果有不同的老师，填那个老师对应的智能体 ID
        agentId: 'wPXzhpYIdign'
    }
];
