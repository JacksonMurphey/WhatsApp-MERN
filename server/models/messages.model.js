import mongoose from "mongoose";


const WhatsAppSchema = new mongoose.Schema({

    message: {
        type: String
    },

    name: {
        type: String
    },

    timestamp: {
        type: String
    },

    received: {
        type: Boolean
    }



}, { timestamps: true })

const Messages = mongoose.model('messages', WhatsAppSchema)
export default Messages