// 文件路径: api/chat.js

export default async function handler(req, res) {
    // 1. 设置跨域头，允许网页访问
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { token, agentId, message } = req.body;

    if (!token || !agentId || !message) {
        return res.status(400).json({ success: false, error: '缺少参数' });
    }

    try {
        console.log("正在连接腾讯元器...");
        
        // ✅ 1. 使用你确认过的正确网址
        const yuanqiUrl = 'https://yuanqi.tencent.com/openapi/v1/agent/chat/completions';
        
        const response = await fetch(yuanqiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'X-Source': 'openapi' // ✅ 2. 加上了这个关键暗号
            },
            body: JSON.stringify({
                assistant_id: agentId, // ✅ 3. 改正参数名 (model -> assistant_id)
                user_id: "user_001",   // ✅ 4. 必填的用户ID
                stream: false,
                messages: [
                    {
                        role: 'user',
                        content: [ // ✅ 5. 使用严格的数组格式
                            { type: 'text', text: message }
                        ]
                    }
                ]
            })
        });

        const data = await response.json();
        console.log("腾讯元器返回:", JSON.stringify(data));

        if (data.error) {
            return res.status(500).json({ success: false, error: data.error.message || '元器API报错' });
        }

        // ✅ 6. 解析返回结果
        let replyText = "";
        if (data.choices && data.choices.length > 0) {
            replyText = data.choices[0].message.content;
        } else if (data.content) {
            replyText = data.content;
        }

        if (replyText) {
            return res.status(200).json({ success: true, reply: replyText });
        } else {
            return res.status(500).json({ success: false, error: 'AI回复为空，请检查后台日志' });
        }

    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ success: false, error: '连接失败: ' + error.message });
    }
}
