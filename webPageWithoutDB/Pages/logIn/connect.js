// connect.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3002;
const mysql = require('mysql2');

const db = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users1'

})

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // İstemcilerin erişim izni
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // İzin verilen HTTP metodları
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // İzin verilen başlık alanları
    res.setHeader('Access-Control-Allow-Credentials', true); // Kimlik doğrulama izinleri (varsa)
    next();
}); 

db.connect((err)=>{

    if(err){

        console.error("veritabanı bağlantı hatası", err);
        return

    }
    else{
        console.log("veritabanı ile bağlantı sağlandı");
    }

})

module.exports = db;

// Middleware ayarları
app.use(cors());
app.use(bodyParser.json());

// POST isteği için /login endpoint'ini tanımla
app.post('/login', (req, res) => {
    const { userNameV, passWordV } = req.body;

    // Kullanıcı adı ve şifreyi logla
    console.log('Kullanıcı adı:', userNameV);
    console.log('Şifre:', passWordV);

    // Veritabanı sorgusu
    db.query('SELECT * FROM kullanici WHERE email = ? AND password = ?', [userNameV, passWordV], (err, results) => {
        if (err) {
            console.error('Sorgu hatası:', err);
            return res.status(500).json({ message: 'Sunucu hatası' });  // Hata durumunda yanıtı döndür
        }

        if (results.length > 0) {
            console.log('Giriş başarılı');
            return res.json({ message: 'Giriş başarılı' });  // Başarı durumunda yanıtı döndür
        } else {
            console.log('giris basarısız');
            return res.status(401).json({ message: 'Giriş başarısız' });  // Başarısızlık durumunda yanıtı döndür
        }
    });
});


// Sunucuyu başlat
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalışıyor`);
});




// bu izinler ile chrome' erişim sağlmaayı basardim



