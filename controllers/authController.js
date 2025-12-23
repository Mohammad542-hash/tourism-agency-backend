// controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
const { promisify } = require('util'); 

// 1. دالة لتوليد التوكن (JWT)
const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

// 2. دالة إرسال التوكن بالصيغة المطلوبة
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    // إزالة كلمة المرور من الرد
    user.password = undefined;

    res.status(statusCode).json({
        token: token,
        admin: {
            id: user._id,
            email: user.email,
            role: user.role
        }
    });
};

// 3. 🔑 دالة تسجيل الدخول (المطلوبة: POST /api/admin/login) 🔑
exports.loginAdmin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    // البحث عن المستخدم باستخدام select('+password')
    const user = await User.findOne({ email }).select('+password');

    // التحقق من صحة المستخدم ودوره (يجب أن يكون Admin)
    if (!user || user.role !== 'admin' || !(await user.correctPassword(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials or you are not authorized as an Admin.' });
    }

    // إرسال التوكن والبيانات المطلوبة
    createSendToken(user, 200, res);
};

// 4.  وظيفة الحماية الأساسية (Protect Middleware) 
exports.protect = async (req, res, next) => {
    let token;
    
    // 1) الحصول على التوكن من الـ Header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: 'Access denied. Please log in.' });
    }

    try {
        // 2) التحقق من صحة التوكن
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        
        // 3) التحقق من وجود المستخدم ودوره (يجب أن يكون Admin)
        const currentUser = await User.findById(decoded.id);

        if (!currentUser || currentUser.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden. Only Admins can access this resource.' });
        }

        req.user = currentUser;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid Token or session expired.' });
    }
};