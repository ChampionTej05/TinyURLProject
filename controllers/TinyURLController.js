import validUrl from 'valid-url';
import url from 'url';
import intFormat from 'biguint-format';

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
            throw new Error('Invalid URL Specified in Request Body');
        }

        const idGenerator = FlakeGenIDGenerator.getInstance();
        const urlCode = intFormat(idGenerator.next());

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
            const shortURL = new url.URL("/" + urlCode, WEB_BASE_URL);
            console.debug('Short URL generated is : %s', shortURL);

            const urlModel = new ShortURLModel({
                url_code: urlCode,
                short_url: shortURL,
                long_url: longURL
            });

            const createResponse = await ShortURLModel.create(urlModel).catch((err) => {
                console.error("Error in Creating the url  object %s", err);
                throw new Error('Error in Creating the url  object ' + err);
            });

            res.json(urlModel);
        }




    } catch (err) {
        console.error("Error in CreateTinyURL %s", err);
        res.status(500).json("Server Error : " + err);
    }
}

export {
    CreateTinyURL
}