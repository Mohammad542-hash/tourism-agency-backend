// seed.js - الكود النهائي والمُصحح
require('dotenv').config();
const mongoose = require('mongoose');

// 1. استيراد النماذج (Model)
const Destination = require('./models/Destination');
const Tour = require('./models/Tour');

// 2. استيراد بيانات التغذية (Data)
// يجب التأكد من أن هذه الملفات تصدّر مصفوفات مباشرة (module.exports = [...])
const destinationsData = require('./data/destinations'); 
const tripsData = require('./data/trips'); 

async function seedData() {
    try {
        console.log("Connecting to DB...");
        // استخدام الخيارات الحديثة للاتصال
        await mongoose.connect(process.env.MONGO_URI);

        console.log("Clearing old data...");
        await Destination.deleteMany({});
        await Tour.deleteMany({}); 

        console.log("1. Inserting new destinations...");
        // 1. إضافة الوجهات والحصول على البيانات المُدخلة
        const insertedDestinations = await Destination.insertMany(destinationsData);

        // 2. إنشاء خريطة ربط (Name -> ObjectId)
        const destinationMap = {};
        insertedDestinations.forEach(d => {
            // يستخدم d.name لربط (اسم المدينة) بـ (ObjectId الخاص بها)
            destinationMap[d.name] = d._id; 
        });

        console.log("2. Preparing and inserting new tours...");
        
        const finalTours = tripsData.map(trip => {
            const destinationObjectId = destinationMap[trip.city]; 

            if (!destinationObjectId) {
                console.warn(`Warning: Could not find Destination ID for city: ${trip.city}`);
                return null;
            }

            // **  الحل لمشكلة 'Cast to ObjectId failed': **
            // نستخدم Destructuring لفصل حقل 'id' القديم و 'destinationId' القديم
            // عن باقي البيانات (restOfTripData) لضمان عدم إرسال حقل 'id' إلى Mongoose.
            const { id, destinationId: oldDestinationId, ...restOfTripData } = trip;

            return {
                // نمرر باقي البيانات النظيفة 
                ...restOfTripData, 
                // ونضيف الـ ObjectId الجديد الصحيح للربط
                destinationId: destinationObjectId
            };
        }).filter(t => t !== null); // إزالة أي رحلات لم يتم ربطها

        await Tour.insertMany(finalTours);

        console.log("✔️ Database seeding completed!");
        process.exit(0);
    } catch (err) {
        console.error("Seed error:", err);
        process.exit(1);
    }
}

seedData();