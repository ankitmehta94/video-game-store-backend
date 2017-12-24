const express = require('express');
const igdb = require('igdb-api-node').default;
const client = igdb('4610373d01125542a9c7c3618762c6c2');

const app = express();
const port = 6500;
app.listen(port,()=>{
	console.log("Server is up at ",port);
})

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})
function improveImageQuality(string, initial, final){
	return string.replace(inital, final);
}
app.get('/games',(req, res)=>{
	client.games({
    fields: 'name,cover,aggregated_rating', // Return all fields
    limit: 12, // Limit to 5 results
    offset: 0, // Index offset for results
    order:'popularity:desc'
}).then(response => {
	//console.log(response);
	response.body.forEach((datum)=>{
		if(datum.cover && datum.cover.cloudinary_id){
			datum.cover.url = client.image({
								    cloudinary_id: datum.cover.cloudinary_id
								}, 'screenshot_huge', 'jpg');
		}
	});
	 res.status(200).send(response.body);
}).catch(error => {
    throw error;
});
});

app.get('/gamesList',(req, res)=>{
	console.log(req.query.game_id);
	//console.log('Ankit');
	client.games({
	ids:req.query.game_id,
    fields: 'name,cover,aggregated_rating', // Return all fields
    limit: 12, // Limit to 5 results
    offset: 0, // Index offset for results
    order:'popularity:desc'
}).then(response => {
	//console.log(response);
	response.body.forEach((datum)=>{
		if(datum.cover && datum.cover.cloudinary_id){
			datum.cover.url = client.image({
								    cloudinary_id: datum.cover.cloudinary_id
								}, 'screenshot_huge', 'jpg');
		}
	});
	 res.status(200).send(response.body);
}).catch(error => {
    throw error;
});
});
app.get('/singleGame',(req, res)=>{
	console.log(req.query.game_id);
	//console.log('Ankit');
	client.games({
	ids:[req.query.game_id],
    fields: '*', // Return all fields
    limit: 12, // Limit to 5 results
    offset: 0, // Index offset for results
    order:'popularity:desc'
}).then(response => {
	//console.log(response);
	response.body.forEach((datum)=>{
		if(datum.cover && datum.cover.cloudinary_id && datum.screenshots){
			datum.cover.url = client.image({
								    cloudinary_id: datum.cover.cloudinary_id
								}, 'screenshot_huge', 'jpg');
			console.log(datum.screenshots);
			datum.screenshots.forEach((datum)=>{
				 datum.url = client.image({
								    cloudinary_id: datum.cloudinary_id
								}, 'screenshot_huge', 'jpg');
			})
		}
	});
	 res.status(200).send(response.body);
}).catch(error => {
    throw error;
});
});
app.get('/genres',(req, res)=>{
	console.log('genres');
	client.genres({
    fields: '*', // Return all fields
    limit: 40, // Limit to 5 results
}).then(response => {
	 res.status(200).send(response.body);
}).catch(error => {
    throw error;
});
});