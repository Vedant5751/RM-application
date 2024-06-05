const express = require('express');
const client = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    res.send('working');
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// to get all the employee
router.get('/employee', async (req, res) => {
  try {
    const allEmployees = await client.query('SELECT * FROM employee');
    res.status(200).send(allEmployees.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch employees');
  }
});

// to add an employee
router.post(/employee/, async (req, res) => {
  try {
    const values = [
      req.body.employee_id,
      req.body.employee_name,
      req.body.designation,
      req.body.bu,
      req.body.doj,
      req.body.year_of_joining,
      req.body.dob,
      req.body.location,
      req.body.offshore_onsite,
      req.body.project,
      req.body.sub_project,
      req.body.project_remarks_from_bu,
      req.body.project_start_date,
      req.body.project_end_date,
      req.body.billed,
      req.body.unbilled_days,
      req.body.allocation_start_date,
      req.body.allocation_end_date,
      req.body.bilingual,
      req.body.language_level,
      req.body.primary_skill,
      req.body.secondary_skill,
      req.body.srm_experience_in_years,
      req.body.previous_experience,
      req.body.overall_experience,
      req.body.certification,
      req.body.certification_2,
      req.body.appraisal_rating_2023,
      req.body.bill_rate,
      req.body.ctc,
      req.body.separation_date,
      req.body.remarks,
    ];

    const newEmployee = await client.query(
      `INSERT INTO employee(
      employee_id, employee_name, designation, bu, doj, 
      year_of_joining, dob, location, offshore_onsite, project, sub_project, project_remarks_from_bu, 
      project_start_date, project_end_date, billed, unbilled_days, allocation_start_date, allocation_end_date, bilingual,
      language_level, primary_skill, secondary_skill, srm_experience_in_years, previous_experience, overall_experience, certification, certification_2, 
      appraisal_rating_2023, bill_rate, ctc, separation_date, remarks
      ) 
       VALUES 
       ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32
        
       )`,
      values
    );
    res.status(200).send('Employee added successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send(`Failed to add employee.${err.detail}`);
  }
});

//deleting an employee
router.delete('/employee/:id', async (req, res) => {
  try {
    //use paramatrized query instead of template literal when working with dbs
    const deltedEmployee = await client.query('DELETE FROM employee WHERE employee_id = $1', [req.params.id]);
    if (deltedEmployee.rowCount === 0) {
      return res.status(404).send('Employee not found');
    } else {
      res.status(200).send('Employee deleted');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to delete employee');
  }
});

module.exports = router;

/* 
CREATE TABLE employee (
  id SERIAL,
  employee_id VARCHAR(255) PRIMARY KEY,
  employee_name VARCHAR(255) NOT NULL,
  designation VARCHAR(255) NOT NULL,
  bu VARCHAR(255) NOT NULL,
  doj DATE NOT NULL,
  year_of_joining INT NOT NULL,
  dob DATE NOT NULL,
  location VARCHAR(255) NOT NULL,
  offshore_onsite VARCHAR(255),
  project VARCHAR(255),
  sub_project VARCHAR(255),
  project_remarks_from_bu TEXT,
  project_start_date DATE,
  project_end_date DATE,
  billed CHAR(1) NOT NULL,
  unbilled_days INT,
  allocation_start_date DATE,
  allocation_end_date DATE,
  bilingual CHAR(1),
  language_level VARCHAR(255),
  primary_skill VARCHAR(255) ,
  secondary_skill VARCHAR(255),
  srm_experience_in_years NUMERIC,
  previous_experience NUMERIC,
  overall_experience NUMERIC,
  certification VARCHAR(255),
  certification_2 VARCHAR(255),
  appraisal_rating_2023 INT,
  bill_rate NUMERIC,
  ctc NUMERIC NOT NULL,
  separation_date DATE,
  remarks TEXT
);
*/
