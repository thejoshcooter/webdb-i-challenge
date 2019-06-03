const express = require('express');
const db = require('./data/accounts-model');
const bodyParser = require('body-parser');

const server = express();

server.use(bodyParser.json());

server.get('/', (req, res) => {
    // res.status(200).json({ message: 'success', operation: 'GET' });

    db.find()
    .then(data => {
        res.status(200).send(data)
    })
    .catch(err => {
        res.status(404).send('error returning', err)
    });
});

server.post('/', (req, res) => {
    // res.status(200).json({ message: 'success', operation: 'POST' });
    console.log(req.body);
    const { name, budget } = req.body;
    const account = { name, budget };
    
    if(!name || !budget) {
        res.status(500).send('name and budget required');
    };

    db
    .add(account)
    .then(account => {
        res.status(200).json(account);
    })
    .catch(error => {
        res.status(500).json({ error: 'error adding account', error});
    });
});

server.delete('/:id', (req, res) => {
    // res.status(200).json({ message: 'success', operation: 'DELETE' });
    const id = req.params.id;
    
    db
    .remove(id)
    .then(account => {
        res.status(200).json(account);
    })
    .catch(error => {
        res.status(500).json({ error: 'error removing account', error });
    });
});

server.put('/:id', (req, res) => {
    // res.status(200).json({ message: 'success', operation: 'PUT' });
    const id = req.params.id;
    const accountDetails = req.body;
    console.log(accountDetails);

    db
    .update(id, accountDetails)
    .then(account => {
        res.status(200).json({ message: 'success', operation: 'PUT' });
    })
    .catch(error => {
        res.status(500).json({ error: 'error updating account', error });
    });
});

// fallback
server.use('/', (req, res) => {
    res.status(200).send('<h1>WebDB Challenge 1</h1>')
});

module.exports = server;