import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const messageSchema = new Schema({
    description: { type: String, required: true },
    sender: { type: String, required: true },  
    //sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    channel: { type: Schema.Types.ObjectId, ref: 'Channel', required: true },
    createdAt: { type: Date, default: Date.now }

}, { timestamps: true

});

const Message = model('Message', messageSchema);
export default Message;