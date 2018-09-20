import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { enableProdMode } from '@angular/core';

import * as express from 'express';
import { join } from 'path';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();
var fs = require('fs');
var request = require('request');

// Express server
const app = express();

const PORT = process.env.PORT || 3000;
const DIST_FOLDER = join(process.cwd(), 'dist');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');

// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

app.engine('html', ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [
        provideModuleMap(LAZY_MODULE_MAP)
    ]
}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "authToken, Content-Type, email");
    res.header("access-control-expose-headers", " Content-Type,authToken,email");
    next();
});

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'hinterwebapp'));



app.get('/image/:type/:id', (req, res) => {
    console.log("image url called, type=" + req.params.type + ", id=" + req.params.id);
    var URL = "http://ec2-52-221-207-13.ap-southeast-1.compute.amazonaws.com:7576/hinterapi/content/photo/9610/thumb/image.jpg";
    if (req.params.type && req.params.type == 'entry') {
        URL = "http://ec2-52-221-207-13.ap-southeast-1.compute.amazonaws.com:7576/hinterapi/content/photo/" + req.params.id + "/thumb/image.jpg";
    } else if (req.params.type && req.params.type == 'user') {
        URL = "http://ec2-52-221-204-177.ap-southeast-1.compute.amazonaws.com:7576/hinterapi/user/profile/photo/thumb/image.jpg?userId=" + req.params.id + "&dpTime=0";
    } else {
        res.status(404).send('invalid url');
        return;
    }
    request.get(URL, { encoding: 'binary' }, function (error, response) {
        res.writeHead(200, { 'Content-Type': 'image/jpeg', 'Cache-Control': 'no-cache' });
        res.end(response.body, 'binary');
    });

    //res.status(200).send('images supported');
});


app.get('/hsimage/:server/:type/:id/:dpTime', (req, res) => {
    console.log("image url called, type=" + req.params.type + ", id=" + req.params.id);
    var URL = "http://ec2-52-221-207-13.ap-southeast-1.compute.amazonaws.com:7576/hinterapi";
    if (req.params.server == 'dev') {
        URL = "http://ec2-52-221-204-177.ap-southeast-1.compute.amazonaws.com:7576/hinterapi";
    }
    if (req.params.type && req.params.type == 'entry') {
        URL = URL + "/content/photo/" + req.params.id;
    } else if (req.params.type && req.params.type == 'user') {
        URL = URL + "/user/profile/photo/thumb?userId=" + req.params.id + "&dpTime=" + req.params.dpTime;
    } else {
        res.status(404).send('invalid url');
        return;
    }
    request.get(URL, { encoding: 'binary' }, function (error, response) {
        res.writeHead(200, { 'Content-Type': 'image/jpeg', 'Cache-Control': 'no-cache' });
        res.end(response.body, 'binary');
    });

    //res.status(200).send('images supported');
});

app.get('/hs/:server/:type/*', (req, res) => {
    console.log("hs url called, server=" + req.params.server + ", type=" + req.params.type);
    var URL = "http://ec2-52-221-207-13.ap-southeast-1.compute.amazonaws.com:7576/hinterapi";
    // var requested_url = req.url;
    if (req.params.server == 'dev') {
        URL = "http://ec2-52-221-204-177.ap-southeast-1.compute.amazonaws.com:7576/hinterapi";
    }
    URL = URL + "/" + req.params[0];
    console.log("hs url called:" + URL);
    URL = URL + "?";
    for (let queryKey in req.query) {
        URL = URL + queryKey + "=" + req.query[queryKey] + "&";
    }
    if (URL[URL.length - 1] == '&' || URL[URL.length - 1] == '?') {
        URL = URL.substring(0, URL.length - 1);
    }
    console.log("hs url called:" + URL + ":" + req.headers.email);
    if (req.params.type == 'get') {
        request.get(URL, {
            headers:
                { 'content-type': 'application/json', 'email': req.headers.email, 'authToken': req.headers.authtoken }
        }, function (error, response) {
            res.writeHead(response.statusCode, { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' });
            res.end(response.body);
        });
    } else {
        request.post({
            uri: URL,
            headers:
                { 'content-type': 'application/json', 'email': req.headers.email, 'authToken': req.headers.authtoken },
            body: ''
        }, function (error, response) {
            console.log(response);
            res.writeHead(response.statusCode, { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' });
            res.end(response.body);
        });
    }

    return;
});

// TODO: implement data requests securely
app.get('/api/*', (req, res) => {
    res.status(404).send('data requests are not supported');
});

// Server static files from /hinterwebapp
app.get('*.*', express.static(join(DIST_FOLDER, 'hinterwebapp')));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
    res.render('index', { req });
});

// Start up the Node server
app.listen(PORT, () => {
    console.log(`Node server listening on http://localhost:${PORT}`);
});
