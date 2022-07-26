# TinyURLProject
This is learning project regarding url shortner. 

This tries to implement simplest form of URL shortner to run in single node server using node js framework and mongoDB as database.

## Following things are implemented in small tasks 

1. 64 Bit unique ID generated which can scale well in distributed system and avoid collision for traffic rate of 100 million URL encoding/day for next ~70 years 
2. Uses Base 62 encoded strings to encode the URLs in order to get smaller length in tiny url 
3. Basic Get/Post operation to create and get urls 
4. Does not create duplicate short urls for same long urls
5. No indexing at the moment on any DB field.


## How to Run
1. Import Project using Git clone `git clone <project-url>`
2. Navigate to project folder same level as index.js
3. Install NPM modules `npm install`
4. Run the server on port 3000 `npm run start` 
