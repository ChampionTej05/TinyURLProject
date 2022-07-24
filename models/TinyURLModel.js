import mongoose from 'mongoose';

const TinyURLSchema = new mongoose.Schema({


    short_url: {
        type: String,
        required: true,
        example: '1basbnj'
    },
    long_url: {
        type: String,
        required: true,
        example: 'https://foobar.com/1basbnjhfhfoehf'
    },
    url_code: {
        type: String,
        required: true,
        unique: true
    } // primary key for our Model 
}, {
    collection: 'TinyURL',
    timestamps: true,
    _id: false
});

const ShortURLModel = mongoose.model('TinyURL', TinyURLSchema);

export {
    ShortURLModel
}