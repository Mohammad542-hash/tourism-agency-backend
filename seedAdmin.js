// seedAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User'); // تأكد من المسار الصحيح

const ADMIN_EMAIL = 'admin@dashboard.com';
const ADMIN_PASSWORD = 'myadminpassword123'; // كلمة مرور صعبة يجب تغييرها لاحقاً

async function createAdminUser() {
    try {
        console.log("Connecting to DB for Admin Seeding...");
        await mongoose.connect(process.env.MONGO_URI);

        // التحقق مما إذا كان المستخدم موجوداً بالفعل
        const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });

        if (existingAdmin) {
            console.log(`✔️ Admin user with email ${ADMIN_EMAIL} already exists. Skipping creation.`);
            // يمكنك هنا تحديث كلمة المرور إذا أردت:
            // existingAdmin.password = ADMIN_PASSWORD;
            // await existingAdmin.save();
        } else {
            console.log("Creating new Admin user...");
            
            // سيتم تشفير كلمة المرور تلقائياً بواسطة userSchema.pre('save')
            const newAdmin = await User.create({
                name: "System Admin",
                email: ADMIN_EMAIL,
                password: ADMIN_PASSWORD,
                role: 'admin'
            });

            console.log("------------------------------------------");
            console.log(`🔑 Admin created successfully!`);
            console.log(`   Email: ${newAdmin.email}`);
            console.log(`   Password: ${ADMIN_PASSWORD} (Will be hashed in DB)`);
            console.log("------------------------------------------");
        }

        mongoose.connection.close();
        process.exit(0);

    } catch (err) {
        console.error(" Admin Seeding Error:", err.message);
        mongoose.connection.close();
        process.exit(1);
    }
}

createAdminUser();