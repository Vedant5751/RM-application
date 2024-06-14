const express = require('express');
const client = require('../db');
const router = express.Router();

router.get('/client', async (req, res) => {
  try {
    const allclients = await client.query('SELECT * FROM client');
    res.status(200).send(allclients.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch clients');
  }
});

router.get('/client/:id', async (req, res) => {
  try {
    const currentClient = await client.query('SELECT * FROM client WHERE client_id = $1', [req.params.id]);
    if (currentClient.rowCount == 0) {
      res.status(404).send('client not found');
    } else {
      res.send(currentClient.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch client');
  }
});

router.post('/client', async (req, res) => {
  try {
    const values = [
      req.body.client_id,
      req.body.client_name,
      req.body.currency,
      req.body.bu,
      req.body.billing_method,
      req.body.email_id,
      req.body.first_name,
      req.body.last_name,
      req.body.location,
    ];

    const queryText = await client.query(
      `
      INSERT INTO client (
        client_id,
        client_name,
        currency,
        bu,
        billing_method,
        email_id,
        first_name,
        last_name,
        location
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     `,
      values
    );

    res.status(200).send('client added successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send(`Failed to add client. ${err}`);
  }
});

router.delete('/client/:id', async (req, res) => {
  try {
    const deletedclient = await client.query('DELETE FROM client WHERE client_id = $1', [req.params.id]);
    if (deletedclient.rowCount === 0) {
      return res.status(404).send('client not found');
    } else {
      res.status(200).send('client deleted');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to delete client');
  }
});

module.exports = router;

/* 
CREATE TABLE client (
  client_id VARCHAR(255) PRIMARY KEY,
  client_name VARCHAR(255),
  currency VARCHAR(50),
  bu VARCHAR(100),
  billing_method VARCHAR(100),
  email_id VARCHAR(255),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  location VARCHAR(255)
);
 */

//exmaple json example
/* 
{
    "client_id":"D2312",
    "client_name": "Acme Corporation",
    "currency": "USD",
    "bu": "Technology",
    "billing_method": "Credit Card",
    "email_id": "contact@acme.com",
    "first_name": "John",
    "last_name": "Doe",
    "location": "New York, USA"
  }
*/