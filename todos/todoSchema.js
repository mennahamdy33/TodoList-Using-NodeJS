const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
    title: 'string',
    status: 'string',
});

module.exports = todoSchema;
