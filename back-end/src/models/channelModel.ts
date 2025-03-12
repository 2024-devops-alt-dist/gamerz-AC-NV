import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const channelSchema = new Schema({
    channelName: { type: String, required: true },
    description: { type: String, required: true },
    admin: { type: Schema.Types.ObjectId, ref: 'User' },
    subscribers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    connectedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now }

}, { timestamps: true

});

const Channel = model('Channel', channelSchema);
export default Channel;