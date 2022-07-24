import validUrl from 'valid-url';
import url from 'url';
import intFormat from 'biguint-format';
import base62 from 'base62/lib/ascii';
import lodash from 'lodash';
const {
    isNil
} = lodash;

import {
    WEB_BASE_URL
} from '../configs/system.config';
import FlakeGenIDGenerator from '../utils/FlakeGenIDGenerator';
import {
    ShortURLModel
} from '../models/TinyURlModel';


const CreateTinyURL = async function(req, res) {

    try {
        const reqBody = req.body;
        console.debug('Req body Received : %s', reqBody);

        const longURL = reqBody.long_url;

        if (!validUrl.isUri(longURL)) {
            console.error('LongURL %s is not valid URL ', longURL);
            const errorMessage = 'Invalid URL Specified in Request Body';
            // throw new Error('');
            res.status(400).json(errorMessage);
            return;
        }

        const idGenerator = FlakeGenIDGenerator.getInstance();
        const urlCodeInt = intFormat(idGenerator.next());
        const base62Code = base62.encode(urlCodeInt);


        // if URL exists in our System then we are returning same URL at the moment 
        const urlModelObject = await ShortURLModel.findOne({
            long_url: longURL
        }).catch((err) => {
            console.error("Error in Fetching the existing long url %s", err);
            throw new Error('Error in fetching existing long url ' + err);
        });

        if (!isNil(urlModelObject)) {
            console.debug("Url with this name already exists in the system : %o",
                urlModelObject);
            res.json(urlModelObject);
        } else {
            console.debug('Encoded Short URL code is %s', base62Code);
            const shortURL = new url.URL("/" + base62Code, WEB_BASE_URL);
            console.debug('Short URL generated is : %s', shortURL);

            const urlModel = new ShortURLModel({
                url_code: urlCodeInt,
                short_url: shortURL,
                long_url: longURL
            });

            const createResponse = await ShortURLModel.create(urlModel).catch((err) => {
                console.error("Error in Creating the url  object %s", err);
                throw new Error('Error in Creating the url  object ');
            });

            res.json(urlModel);
        }




    } catch (err) {
        console.error("Error in CreateTinyURL %s", err);
        res.status(500).json("Server Error : " + err);
    }
}

const GetTinyURL = async function(req, res) {
    try {

        const base62Code = req.params.code;
        const expectedShortURL = new url.URL("/" + base62Code, WEB_BASE_URL);
        const urlModelObject = await ShortURLModel.findOne({
            short_url: expectedShortURL
        }).catch((err) => {
            console.error("Error in Fetching the existing long url %s", err);
            throw new Error('Error in fetching existing long url ' + err);
        });
        if (isNil(urlModelObject)) {
            const errorMessage = 'Requested URL ' + expectedShortURL +
                ' does not exists in our System. Please try creating it again ';
            res.status(404).json(errorMessage);
            return;
        }
        res.json(urlModelObject);
    } catch (err) {
        console.error("Error in GetTinyURL %s", err);
        res.status(500).json("Server Error : " + err);
    }
}

export {
    CreateTinyURL,
    GetTinyURL
}