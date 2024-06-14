const express = require('express');
const client = require('../db');
const router = express.Router();

router.get('/project', async (req, res) => {
  try {
    const allprojects = await client.query('SELECT * FROM project');
    res.status(200).send(allprojects.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch project');
  }
});

router.get('/project/:id', async (req, res) => {
  try {
    const project = await client.query('SELECT * FROM project WHERE project_id = $1', [req.params.id]);
    if (project.rowCount == 0) {
      res.status(404).send('project not found');
    } else {
      res.send(project.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch project');
  }
});

router.post('/project', async (req, res) => {
  try {
    const values = [
      req.body.project_id,
      req.body.project_name,
      req.body.project_manager_id,
      req.body.project_manager_name,
      req.body.project_description,
      req.body.project_owning_sbu,
      req.body.project_owning_bu,
      req.body.project_type,
      req.body.country,
      req.body.state,
      req.body.city,
      req.body.project_start_date,
      req.body.project_end_date,
    ];

    const queryText = `
      INSERT INTO project (
        project_id, 
        project_name, 
        project_manager_id, 
        project_manager_name, 
        project_description, 
        project_owning_sbu, 
        project_owning_bu, 
        project_type, 
        country, 
        state, 
        city, 
        project_start_date, 
        project_end_date
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13
      )
    `;

    await client.query(queryText, values);
    res.status(200).send('project added successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send(`Failed to add project. ${err.detail}`);
  }
});

router.delete('/project/:id', async (req, res) => {
  try {
    //use paramatrized query instead of template literal when working with dbs
    const deletedproject = await client.query('DELETE FROM project WHERE project_id = $1', [req.params.id]);
    if (deletedproject.rowCount === 0) {
      return res.deletedproject(404).send('project not found');
    } else {
      res.status(200).send('project deleted');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to delete project');
  }
});

module.exports = router;

/*CREATE TABLE project (
  project_id VARCHAR(50) PRIMARY KEY,
  project_name VARCHAR(255),
  project_manager_id VARCHAR(50),
  project_manager_name VARCHAR(255),
  project_description VARCHAR(255),
  project_owning_sbu VARCHAR(255),
  project_owning_bu VARCHAR(255),
  project_type VARCHAR(255),
  country VARCHAR(100),
  state VARCHAR(100),
  city VARCHAR(100),
  project_start_date DATE,
  project_end_date DATE
);*/
