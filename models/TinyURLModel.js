import mongoose from 'mongoose';

const TinyURLSchema = new mongoose.Schema({


    short_url: {
        type: String,
        required: true,
        example: '1basbnj',
        description: 'Base62 Encoded version of url_code field'
    },
    long_url: {
        type: String,
        required: true,
        example: 'https://foobar.com/1basbnjhfhfoehf'
    },
    url_code: {
        type: String,
        required: true,
        unique: true,
        description: '64 Bit ID generated from Twitter Snowflake'
    } // primary key for our Model 
}, {
    collection: 'TinyURL',
    timestamps: true
});

const ShortURLModel = mongoose.model('TinyURL', TinyURLSchema);

export {
    ShortURLModel
}