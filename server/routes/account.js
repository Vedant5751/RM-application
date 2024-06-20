const express = require('express');
const client = require('../db');
const router = express.Router();

router.get('/account', async (req, res) => {
  try {
    const allAccounts = await client.query('SELECT * FROM account');
    res.status(200).send(allAccounts.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch accounts');
  }
});

router.get('/account/:id', async (req, res) => {
  try {
    const account = await client.query('SELECT * FROM account WHERE account_id = $1', [req.params.id]);
    if (account.rowCount == 0) {
      res.status(404).send('Account not found');
    } else {
      res.send(account.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch account');
  }
});

router.post('/account', async (req, res) => {
  try {
    const values = [
      req.body.account_id,
      req.body.account_name,
      req.body.client_name,
      req.body.region,
      req.body.account_manager,
      req.body.account_bu,
      req.body.country,
      req.body.industry_domain,
      req.body.currency,
    ];

    const queryText = await client.query(
      `
      INSERT INTO account (
        account_id, 
        account_name, 
        client_name, 
        region, 
        account_manager, 
        account_bu, 
        country, 
        industry_domain, 
        currency
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9
      )
    `,
      values
    );

    res.status(200).send('Account added successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send(`Failed to add account. ${err}`);
  }
});

//to update a account
router.put('/account/:id', async (req, res) => {
  try {
    const values = [
      req.body.account_name,
      req.body.client_name,
      req.body.region,
      req.body.account_manager,
      req.body.account_bu,
      req.body.country,
      req.body.industry_domain,
      req.body.currency,
      req.params.id,
    ];

    const updatedAccount = await client.query(
      `UPDATE account SET
        account_name = $1,
        client_name = $2,
        region = $3,
        account_manager = $4,
        account_bu = $5,
        country = $6,
        industry_domain = $7,
        currency = $8
      WHERE account_id = $9`,
      values
    );

    if (updatedAccount.rowCount === 0) {
      return res.status(404).send('Account not found');
    } else {
      res.status(200).send('Account updated');
    }
  } catch (err) {
    res.status(500).send('Failed to update account ' + err);
  }
});

router.delete('/account/:id', async (req, res) => {
  try {
    const deletedAccount = await client.query('DELETE FROM account WHERE account_id = $1', [req.params.id]);
    if (deletedAccount.rowCount === 0) {
      return res.status(404).send('Account not found');
    } else {
      res.status(200).send('Account deleted');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to delete account');
  }
});

module.exports = router;

/* 

CREATE TABLE account (
  account_id VARCHAR(255) PRIMARY KEY,
  account_name VARCHAR(255),
  client_name VARCHAR(255),
  region VARCHAR(255),
  account_manager VARCHAR(255),
  account_bu VARCHAR(255),
  country VARCHAR(255),
  industry_domain VARCHAR(255),
  currency VARCHAR(255)
);
*/

//example json data
/* 
{
    "account_id": "ACCT001",
    "account_name": "ABC Corporation",
    "client_name": "ABC Inc.",
    "region": "North America",
    "account_manager": "John Doe",
    "account_bu": "Enterprise",
    "country": "United States",
    "industry_domain": "Technology",
    "currency": "USD"
}
*/
