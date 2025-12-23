// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // مكتبة تشفير كلمات المرور

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A user must have a name']
    },
    email: {
        type: String,
        required: [true, 'A user must have an email'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'A password must be provided'],
        minlength: 8,
        select: false // لا يتم عرضه عند جلب بيانات المستخدم
    },
    role: {
        type: String,
        enum: ['user', 'editor', 'admin'],
        default: 'user'
    }
});

// 1  التشفير التلقائي قبل الحفظ (Pre-Save Middleware) 
// يتم تنفيذ هذا قبل حفظ المستخدم في قاعدة البيانات
userSchema.pre('save', async function(next) {
    // إذا لم تتغير كلمة المرور، لا تعيد تشفيرها
    if (!this.isModified('password')) return next();
    
    // تشفير كلمة المرور بقوة 12 (قوة التشفير)
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// 2 دالة مقارنة كلمة المرور (Instance Method) 
// تُستخدم للتحقق من كلمة المرور المدخلة مقابل الكلمة المشفرة في الـ DB
userSchema.methods.correctPassword = async function(
    candidatePassword, // كلمة المرور التي أدخلها المستخدم
    userPassword // كلمة المرور المشفرة من الـ DB
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;