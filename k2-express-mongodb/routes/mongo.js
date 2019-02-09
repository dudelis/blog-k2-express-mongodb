const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const _ = require('lodash');

const mongoUri = 'mongodb://test-user:K2pass!@ds211865.mlab.com:11865/db-test';



//Create - POST /collection - Create 1 item
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
//GET /request/:id - Returns 1 document
router.get('/:collection/:id', function(req, res, next){
    const collection = req.params.collection;
    const id = req.params.id;
    MongoClient.connect(mongoUri, function(err, client){
        const db = client.db();
        db.collection(collection).findOne({_id: new ObjectId(id)}, function(err, doc){
            res.send(doc);
            client.close();
        });
    })
});
//GET /request - returns all Documents
router.get('/:collection', function(req, res, next){
    const collection = req.params.collection;
    MongoClient.connect(mongoUri, function(err, client){
        const db = client.db();
        db.collection(collection).find({}, async function(err, docs){
            const results = await docs.toArray();
            res.send(results);
            client.close();
        } );        
    })
});
//PATCH /request/:id - Updates a document
router.patch('/:collection/:id', function(req, res, next){
    const collection = req.params.collection;
    const id = req.params.id;
    const item = req.body;
    MongoClient.connect(mongoUri, function(err, client){
        const db = client.db();
        db.collection(collection).updateOne(
            {_id: new ObjectId(id)},
            {$set: _.omitBy(item, _.isNil)
        }, function(err, doc){
            res.send(doc);
            client.close();
        } )
    })
});
//DELETE /request/:id - Deletes a document
router.delete('/:collection/:id', function(req, res, next){
    const collection = req.params.collection;
    const id = req.params.id;
    MongoClient.connect(mongoUri, function(err, client){
        const db = client.db();
        db.collection(collection).deleteOne({_id: new ObjectId(id)}, function(err, doc){
            res.send(doc);
            client.close();
        })
    })
});

module.exports = router;