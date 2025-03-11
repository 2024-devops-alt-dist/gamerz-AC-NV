import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true, default: 'user' },
    avatar: { type: String, default: 'https://images.icon-icons.com/1378/PNG/512/avatardefault_92824.png' },
    status: { type: String, default: 'pending' },
    birthdate: { type: Date, required: true }
}, { timestamps: true

});

const User = model('User', userSchema);
export default User;