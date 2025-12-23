
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// 1. استيراد المسارات (Routes)
const destinationRoutes = require('./routes/destinationRoutes');
const tourRoutes = require('./routes/tourRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const contactRoutes = require('./routes/contactRoutes');
const authRouter = require('./routes/authRoutes');


const app = express();
// 2(Middleware)
app.use(express.json()); // تحليل (Parse) لـ JSON Body
app.use(cors()); 
app.use('/api', authRouter)       // تمكين CORS لجميع الطلبات
// 3. تعريف المسارات (Route Definitions)
app.use('/api/destinations', destinationRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/contact', contactRoutes);

// ******* 4. التعامل مع المسارات غير الموجودة (404 Not Found) *******
app.use((req, res, next) => {
    // إذا لم يصل الطلب إلى أي من المسارات المحددة أعلاه
    res.status(404).json({ message: 'Resource not found (404)' });
});


const PORT = process.env.PORT || 5000; // تم تغيير الافتراضي من 3000 إلى 5000

// 5. الاتصال بقاعدة البيانات وتشغيل السيرفر
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tourism';

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅ MongoDB Connected Successfully.');
        app.listen(PORT, () => console.log(`🌍 Server running on port ${PORT}`));
    })
    .catch(err => {
        console.error('❌ FATAL: Mongo connection error:', err.message);
        // التوصية: إغلاق التطبيق إذا لم يتمكن من الاتصال بـ DB
        process.exit(1); 
    });