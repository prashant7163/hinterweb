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
 
const PORT = process.env.PORT || 80;
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
 
app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'hinterwebapp'));
 
// TODO: implement data requests securely
app.get('/api/*', (req, res) => {
  res.status(404).send('data requests are not supported');
});

app.get('/image/:type/:id', (req, res) => {
	console.log("image url called, type="+req.params.type+", id="+req.params.id);
 	var URL = "http://ec2-52-221-207-13.ap-southeast-1.compute.amazonaws.com:7576/hinterapi/content/photo/9610/thumb/image.jpg";
        if(req.params.type && req.params.type=='entry'){
	  URL = "http://ec2-52-221-207-13.ap-southeast-1.compute.amazonaws.com:7576/hinterapi/content/photo/" + req.params.id + "/thumb/image.jpg";
	}else if(req.params.type && req.params.type=='user'){
	  URL = "http://ec2-52-221-204-177.ap-southeast-1.compute.amazonaws.com:7576/hinterapi/user/profile/photo/thumb/image.jpg?userId=" + req.params.id + "&dpTime=0";
	}else{
	  res.status(404).send('invalid url');
	  return;
	}
	request.get(URL, {encoding:'binary'},function(error, response){
             res.writeHead(200, {'Content-Type': 'image/jpeg', 'Cache-Control': 'no-cache' });
             res.end(response.body, 'binary');
        });

  //res.status(200).send('images supported');
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
