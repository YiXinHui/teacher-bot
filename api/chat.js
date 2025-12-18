// 这个文件运行在 Vercel 服务器上，专门负责转发请求给腾讯元器
// 它可以绕过浏览器的安全限制

export default async function handler(req, res) {
    // 允许网页跨域访问
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // 如果是预检请求，直接通过
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { token, agentId, message } = req.body;

    if (!token || !agentId || !message) {
        return res.status(400).json({ success: false, error: '缺少必要参数' });
    }

    try {
        // Vercel 服务器替你向腾讯元器发请求
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

        // 处理腾讯返回的结果
        if (data.choices && data.choices.length > 0) {
            return res.status(200).json({ 
                success: true, 
                reply: data.choices[0].message.content 
            });
        } else {
            return res.status(500).json({ 
                success: false, 
                error: data.error ? data.error.message : '元器返回未知错误' 
            });
        }

    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ success: false, error: '服务器连接失败' });
    }
}
