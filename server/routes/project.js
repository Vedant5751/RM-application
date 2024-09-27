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
      req.body.project_status,
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
      req.body.add_employees,
    ];

    //updating the employee
    try {
      for (const employeeId of req.body.add_employees) {
        const updateEmployeeQuery = `
          UPDATE employee
          SET project = $1, account = $2, bu = $3, project_start_date = $4, project_end_date = $5
          WHERE employee_id = $6
        `;
        const updateEmployeeValues = [
          req.body.project_id,
          req.body.account_id,
          req.body.project_owning_bu,
          req.body.project_start_date,
          req.body.project_end_date,
          employeeId,
        ];
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
        project_status,
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
        add_employees
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17
      )`,
      values
    );

    res.status(200).send('Project added successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send(`Failed to add Project. ${err}`);
  }
});

// updating an project
router.put('/project/:id', async (req, res) => {
  try {
    const values = [
      req.body.project_name,
      req.body.project_status,
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
      req.body.add_employees,
      req.params.id,
    ];

    //updating the employee
    try {
      for (const employeeId of req.body.add_employees) {
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

    const updatedProject = await client.query(
      `UPDATE project SET
        project_name = $1,
        project_status = $2,
        project_manager_id = $3,
        project_manager_name = $4,
        project_description = $5,
        project_owning_sbu = $6,
        project_owning_bu = $7,
        project_type = $8,
        country = $9,
        state = $10,
        city = $11,
        project_start_date = $12,
        project_end_date = $13,
        client_id = $14,
        account_id = $15,
        add_employees = $16
      WHERE project_id = $17`,
      values
    );

    if (updatedProject.rowCount === 0) {
      return res.status(404).send('Project not found');
    } else {
      res.status(200).send('Project updated');
    }
  } catch (err) {
    res.status(500).send('Failed to update project ' + err);
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
CREATE TABLE project (
  project_id VARCHAR(50) PRIMARY KEY,
  project_name VARCHAR(255),
  project_status varchar(255),
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
  add_employees VARCHAR(50)[]
);
*/

//sample json data
/* 
{
  "project_id": "P001",
  "project_name": "Cloud Migration Project",
  "project_status": "Active",
  "project_manager_id": "PM001",
  "project_manager_name": "John Doe",
  "project_description": "Migrating on-premises applications to cloud infrastructure.",
  "project_owning_sbu": "Technology Solutions",
  "project_owning_bu": "IT Services",
  "project_type": "Infrastructure",
  "country": "USA",
  "state": "California",
  "city": "San Francisco",
  "project_start_date": "2023-01-15",
  "project_end_date": "2024-06-30",
  "client_id": "C001",
  "account_id": "A001",
  "add_employees": ["H2941", 491]
}
 */
