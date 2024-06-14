const express = require('express');
const client = require('../db');
const router = express.Router();
const axios = require('axios');

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
      req.body.client_id,
      req.body.account_id,
      req.body.add_employee,
    ];

    //updating the employee
    try {
      for (const employeeId of req.body.add_employee) {
        const updateEmployeeQuery = `
          UPDATE employee
          SET project = $1, account = $2
          WHERE employee_id = $3
        `;
        const updateEmployeeValues = [req.body.project_id, req.body.account_id, employeeId];
        const result = await client.query(updateEmployeeQuery, updateEmployeeValues);

        // Check if exactly one row was updated
        if (result.rowCount !== 1) {
          throw new Error(`Failed to update employee with ID ${employeeId}. Employee not found.`);
        }
      }
    } catch (err) {
      throw err;
    }

    const newEmployee = await client.query(
      ` INSERT INTO project (
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
        project_end_date,
        client_id,
        account_id,
        add_employee
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16
      )`,
      values
    );

    res.status(200).send('Project added successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send(`Failed to add Project. ${err}`);
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

/*
CREATE TABLE projects (
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
  project_end_date DATE,
  client_id VARCHAR(255),
  account_id VARCHAR(255),
  add_employee VARCHAR(50)[]
);
*/

//sample json data
/* 
{
  "project_id": "project 1 ",
  "project_name": "Sample Project",
  "project_manager_id": 101,
  "project_manager_name": "John Doe",
  "project_description": "This is a sample project description.",
  "project_owning_sbu": "IT",
  "project_owning_bu": "Software Development",
  "project_type": "Internal",
  "country": "USA",
  "state": "California",
  "city": "San Francisco",
  "project_start_date": "2024-06-15",
  "project_end_date": "2024-12-31",
  "client_id": 201,
  "account_id": 301,
  "add_employee": ["D31", 490]
}
 */
