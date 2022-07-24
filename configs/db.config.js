import mongoose from 'mongoose';
const DB_URI = 'mongodb://localhost:27017/tinyurldb';

mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const mongoConnection = mongoose.connection;

export {
    mongoConnection
}