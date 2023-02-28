const mongoose = require('mongoose');


const queriesSchema = new mongoose.Schema({
    query_id:{
        type: String,
        required: [true, 'must get query_id'],
        trim: true
        
    },
    query_date:{
        type: Number,
        required: [true, 'must get query date'],
    },
    query:{
        type: Number,
        required: [true, 'must get query'],
    },
    user_id:{
            type: String,
            required: [true, 'must get user_id'],
    }
});

const Queries = mongoose.model('queries',queriesSchema);

module.exports = Queries