const mongoose = require('mongoose');
const chatmodel = mongoose.Schema({
    senderId: {
        type: String,
        required: true
    },
    RecId: {
        type: String,
        required: true
    },
    chat: [
        {
            senderid: {
                type: String
            },
            message: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now()
            },
            readStatus: {
                type: Boolean,
                default: false
            }
        }
    ]
});
const chat = mongoose.model('chat', chatmodel);
module.exports = chat;