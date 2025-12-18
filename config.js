// ===================================
// 扣子API配置
// ===================================
const COZE_CONFIG = {
    token: 'pat_TKPDH03KSYWTGmpng5vib4Z2MmQFVG8p5FiK5YykQ0ZiISpSTlcOdGbEiRr0aNFH',
    apiUrl: 'https://api.coze.cn/v3/chat'
};

// ===================================
// 学员配置
// 总计：5 个学员
// ===================================
const STUDENTS_CONFIG = [
    {
        studentId: '20240001',
        password: '123456',
        name: '张三',
        teacherName: '林雨老师',
        botId: '7585150421019852842'
    },
    {
        studentId: '20240002',
        password: '123456',
        name: '李四',
        teacherName: '林雨老师',
        botId: '7585150421019852842'
    },
    {
        studentId: '20240003',
        password: '123456',
        name: '王五',
        teacherName: '林雨老师',
        botId: '7585150421019852842'
    },
    {
        studentId: '20250101',
        password: '123456',
        name: '林同学',
        teacherName: '林雨老师',
        botId: '7585150421019852842'
    },
    {
        studentId: '20250102',
        password: '123456',
        name: '赵六',
        teacherName: '林雨老师',
        botId: '7585150421019852842'
    }
];

// ===================================
// 添加新学员的方法
// ===================================
// 1. 复制上面任意一个学员的配置
// 2. 修改学号、姓名
// 3. 保存文件
// 4. 上传到GitHub
// 5. 等待自动部署（30秒）

// 示例：如果要添加第二个老师的Bot
// {
//     studentId: '20240201',
//     password: '123456',
//     name: '新学员',
//     teacherName: '李老师',
//     botId: '第二个老师的BotID'
// }
