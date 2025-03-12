import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const candidatureSchema = new Schema({
    userId: mongoose.Types.ObjectId,
    motiv: { type: Text, required: true },
    status: { type: String, enum: ["pending", "accepted", "rejeted"], default: "pending" },
}, { timestamps: true

});

const Candidature = model('Candidature', candidatureSchema);
export default Candidature;