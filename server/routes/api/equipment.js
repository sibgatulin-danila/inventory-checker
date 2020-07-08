const express = require('express');
const mongodb = require('mongodb');
const EquipmentModel = require('../../models/EquipmentModel');

const router = express.Router();

router.get('/', async (req, res) => {
    const equipments = await loadEquipmentCollection();
    res.send(await equipments.find({}).toArray());
});

router.post('/', async (req, res) => {
    
    const equipments = await loadEquipmentCollection();
    await equipments.insertOne(new EquipmentModel(req.body));
    res.status(201).send();
});

router.delete('/', async (req, res) => {
    const equipments = await loadEquipmentCollection();
    await equipments.deleteOne({ _id: new mongodb.ObjectID(req.body.id) });
    res.status(200).send();
});

async function loadEquipmentCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb://mongo',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )

    return client.db('database').collection('equipments');
}

module.exports = router;