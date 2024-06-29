const express = require('express');
const router = express.Router();
const client = require('../db');

router.get('/user', async (req, res) => {
  try {
    const allUsers = await client.query('SELECT * FROM "user"');
    res.status(200).send(allUsers.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch users');
  }
});

router.get('/user/:id', async (req, res) => {
  try {
    const user = await client.query('SELECT * FROM "user" WHERE id = $1', [req.params.id]);
    if (user.rowCount == 0) {
      res.status(404).send('User not found');
    } else {
      res.send(user.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch user');
  }
});

router.post('/user', async (req, res) => {
  try {
    const values = [
      req.body.email,
      req.body.name,
      req.body.oauth_provider,
      req.body.oauth_id,
      req.body.role,
      req.body.business_unit,
    ];

    const queryText = await client.query(
      `
      INSERT INTO "user" (
        email,
        name,
        oauth_provider,
        oauth_id,
        role,
        business_unit
    ) VALUES ($1, $2, $3, $4, $5, $6)
     `,
      values
    );

    res.status(200).send('User added successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send(`Failed to add user. ${err}`);
  }
});

router.delete('/user/:id', async (req, res) => {
  try {
    //use paramatrized query instead of template literal when working with dbs
    const deletedUser = await client.query('DELETE FROM "user" WHERE id = $1', [req.params.id]);
    if (deletedUser.rowCount === 0) {
      return res.status(404).send('User not found');
    } else {
      res.status(200).send('User deleted');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to delete User');
  }
});

router.put('/user/:id', async (req, res) => {
  try {
    const values = [
      req.body.email,
      req.body.name,
      req.body.oauth_provider,
      req.body.oauth_id,
      req.body.role,
      req.body.business_unit,
      req.params.id,
    ];

    const updatedUser = await client.query(
      `UPDATE "user" SET
        email = $1,
        name = $2,
        oauth_provider = $3,
        oauth_id = $4,
        role = $5,
        business_unit = $6
      WHERE id = $7`,
      values
    );

    if (updatedUser.rowCount === 0) {
      return res.status(404).send('User not found');
    } else {
      res.status(200).send('User updated');
    }
  } catch (err) {
    res.status(500).send('Failed to update user ' + err);
  }
});

module.exports = router;

/* 
CREATE TABLE "user" (
	id SERIAL primary key,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  oauth_provider VARCHAR(50),
  oauth_id VARCHAR(255),
  role VARCHAR(50) NOT NULL,
  business_unit VARCHAR(255)
);
*/
