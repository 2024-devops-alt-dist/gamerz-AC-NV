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
    // activationToken: { type: String },
    // refreshToken: { type: String },
    // resetToken: { type: String },
    // expireToken: { type: Date },
    // followers: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    // following: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    // notifications: [
    //     {
    //         type: { type: String },
    //         senderId: { type: mongoose.Types.ObjectId, ref: 'User' },
    //         text: { type: String },
    //         viewProfile: { type: Boolean, default: false },
    //         postId: { type: mongoose.Types.ObjectId, ref: 'Post' },
    //     },
    // ],
    // messages: [
    //     {
    //         sender: { type: mongoose.Types.ObjectId, ref: 'User' },
    //         text: { type: String },
    //         media: { type: String },
    //         call: { type: Object },
    //     },
    // ],

}, { timestamps: true

});

const User = model('User', userSchema);
export default User;