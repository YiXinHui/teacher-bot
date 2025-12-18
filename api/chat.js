// 这个文件必须放在 api 文件夹里，名字叫 chat.js
export default async function handler(req, res) {
    // 1. 设置跨域头，允许浏览器访问
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // 2. 如果是浏览器试探性请求(OPTIONS)，直接通过
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { token, agentId, message } = req.body;

    // 3. 检查参数
    if (!token || !agentId || !message) {
        return res.status(400).json({ success: false, error: '缺少 Token 或 ID' });
    }

    try {
        console.log("正在连接腾讯元器...");
        
        // 4. Vercel 帮你去请求腾讯元器
        const response = await fetch('https://yuanqi.tencent.com/openapi/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                model: agentId,
                messages: [
                    { role: 'user', content: message }
                ],
                stream: false
            })
        });

        const data = await response.json();
        console.log("腾讯元器返回:", JSON.stringify(data));

        if (data.error) {
            return res.status(500).json({ success: false, error: data.error.message || '元器API报错' });
        }

        if (data.choices && data.choices.length > 0) {
            return res.status(200).json({ 
                success: true, 
                reply: data.choices[0].message.content 
            });
        } else {
            return res.status(500).json({ success: false, error: '元器返回了空内容' });
        }

    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ success: false, error: 'Vercel 连接失败: ' + error.message });
    }
}
