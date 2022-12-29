const mongoose = require('mongoose');
require('dotenv').config();

const DATABASE = process.env.DATABASE;

const dbConnect = () => {
    return mongoose.connect(DATABASE)
}

module.exports = dbConnect