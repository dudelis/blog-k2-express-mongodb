const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;

const mongoUri = 'mongodb://test-user:K2pass!@ds211865.mlab.com:11865/db-test';


//Create - POST /collection
router.post('/:collection', function(req, res, next){
    const collection = req.params.collection;
    const dataForInsert = req.body;
    MongoClient.connect(mongoUri, function(err, client){
        const db = client.db();
        db.collection(collection).insertOne(dataForInsert, function(err, r){
            res.send({id:r.insertedId});
            client.close();
        });        
    })
});

//GET /requests
router.get('/', function(req, res, next){
    MongoClient.connect(mongoUri, function(err, client){
        const db = client.db('db-test');
        const results = db.collection('request').find({}).toArray();

        res.send(results);
        client.close();

    })
});

router.get('/', function(req, res, next){
    MongoClient.connect(mongoUri, function(err, client){
        const db = client.db('db-test');
        const resp = db.collection('request').find({}).toArray();

    })
});

module.exports = router;