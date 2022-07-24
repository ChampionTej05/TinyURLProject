import express from 'express';
import bodyParser from 'body-parser';
import TinyURLRouter from './routes/TinyURLRouter';
import {
    mongoConnection
} from './configs/db.config';



mongoConnection.once('open', () => console.log('DB is connected'));
mongoConnection.on('error', (err) => console.error('Error in DB connection'))

const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));
// parse application/json
// app.use(bodyParser.json());


// app.use('/user', function(req, res, next) {
//     console.log('User Page');
//     CreateTinyURL("thisistheshortURL");
//     res.status(200);
//     res.send('Welcome to User Page ');
// })



app.use('/api/url', TinyURLRouter);
app.use('/', function(req, res, next) {
    console.log('Home Page');
    res.status(200);
    res.send('Welcome to Home Page ');
})


app.listen(3000, function() {
    console.debug('Server running on localhost 3000');
})