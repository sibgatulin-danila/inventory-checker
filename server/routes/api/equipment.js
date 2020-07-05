const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

router.get('/', async (req, res) => {
    const equipments = await loadEquipmentCollection();
    res.send(await equipments.find({}).toArray());
});

router.post('/', async (req, res) => {
    const equipments = await loadEquipmentCollection();
    await equipments.insertOne({
        text: req.body.text,
        createdAt: new Date(),
    });
    res.status(201).send();
});

router.post('/delete', async (req, res) => {
    const equipments = await loadEquipmentCollection();
    await equipments.deleteOne({ _id: new mongodb.ObjectID(req.data.id) });
    res.status(200).send();
});

async function loadEquipmentCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb://mongo',
        { useNewUrlParser: true }
    )

    return client.db('database').collection('equipments');
}

module.exports = router;