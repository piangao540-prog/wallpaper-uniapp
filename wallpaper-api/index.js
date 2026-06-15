const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

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

// 获取壁纸所有信息
app.get('/api/wallpapers', (req, res) => {
    db.query('SELECT * FROM wallpapers', (err, results) => {
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

app.listen(3000, () => {
    console.log('api')
})