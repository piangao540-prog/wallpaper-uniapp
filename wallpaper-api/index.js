const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const path = require('path')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/static', express.static(path.resolve(__dirname, '../static')))

const JWT_SECRET = 'wallpaper_secret_key_2026'

const db = mysql.createConnection({
    host: '127.0.0.1',
    port: 3307,
    user: 'root',
    password: 'you520.zb',
    database: 'wallpaper'
})

db.connect(err => {
    if (err) {
        console.error('MySQL 连接失败', err)
        return
    }
    console.log('MySQL 已连接')
})


app.get('/api/wallpapers', (req, res) => {
    let sql = 'SELECT * FROM wallpapers'
    let params = []

    if (req.query.id) {
        sql += ' WHERE id = ?'
        params.push(req.query.id)
    }

    db.query(sql, params, (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        res.json(req.query.id ? results[0] : results)
    })
})


// 获取最新文章
app.get('/api/wallpapers/latest', (req, res) => {
    db.query('SELECT * FROM wallpapers ORDER BY id DESC LIMIT 8', (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        res.json(results)
    })
})

// 获取所有分类和封面图
app.get('/api/categories', (req, res) => {
    const sql = 'SELECT category,ANY_VALUE(author) as author, MIN(url) as cover,COUNT(*) as count FROM wallpapers GROUP BY category ORDER BY category'
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        res.json(results)
    })
})



// 根据种类获取壁纸信息
app.get('/api/wallpapers/:category', (req, res) => {
    db.query('SELECT * FROM wallpapers WHERE category=?', [req.params.category], (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        res.json(results)
    })
})

// 验证token中间件
const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(401).json({ error: '未登录' })
    try {
        req.user = jwt.verify(token, JWT_SECRET)
        next()
    } catch {
        res.status(401).json({ error: 'Token无效' })
    }
}

// 注册
app.post('/api/register', (req, res) => {
    const { username, password } = req.body
    if (!username || !password) return res.status(400).json({ error: '请输入用户名和密码' })
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).json({ error: err.message })
        db.query('INSERT  INTO users (username,password) VALUES  (?,?)', [username, hash], (err) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') return res.status(400).json({ error: '用户名已存在' })
                return res.status(500).json({ error: err.message })
            }
            res.json({ success: true, message: '注册成功' })
        })
    })
})

app.listen(3000, () => {
    console.log('api')
})