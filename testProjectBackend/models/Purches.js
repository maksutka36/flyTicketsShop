const {Schema, model} = require('mongoose')

const Purches = new Schema({
    username:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    trip:{
        type: Array,
        required: true
    }
})

module.exports = model('Purches', Purches)