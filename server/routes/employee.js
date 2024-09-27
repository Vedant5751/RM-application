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

// to get one employee
router.get('/employee/:id', async (req, res) => {
  try {
    const employee = await client.query('SELECT * FROM employee WHERE employee_id = $1', [req.params.id]);
    if (employee.rowCount == 0) {
      res.status(404).send('Employee not found');
    } else {
      res.send(employee.rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch employee');
  }
});

// to add an employee
router.post('/employee', async (req, res) => {
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
      req.body.account,
      req.body.project,
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
      `INSERT INTO employee (
        employee_id, employee_name, designation, bu, doj, year_of_joining, dob, location, 
        offshore_onsite, account, project, project_remarks_from_bu, project_start_date, 
        project_end_date, billed, unbilled_days, allocation_start_date, allocation_end_date, 
        bilingual, language_level, primary_skill, secondary_skill, srm_experience_in_years, 
        previous_experience, overall_experience, certification, certification_2, 
        appraisal_rating_2023, bill_rate, ctc, separation_date, remarks
      ) 
      VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32)`,
      values
    );
    res.status(200).send('Employee added successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send(`Failed to add employee. ${err}`);
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

//update an employee
router.put('/employee/:id', async (req, res) => {
  try {
    const values = [
      req.body.employee_name,
      req.body.designation,
      req.body.bu,
      req.body.doj,
      req.body.year_of_joining,
      req.body.dob,
      req.body.location,
      req.body.offshore_onsite,
      req.body.account,
      req.body.project,
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
      req.body.employee_id,
    ];

    const updatedEmployee = await client.query(
      ` UPDATE employee SET
        employee_name = $1,
        designation = $2,
        bu = $3,
        doj = $4,
        year_of_joining = $5,
        dob = $6,
        location = $7,
        offshore_onsite = $8,
        account = $9,
        project = $10,
        project_remarks_from_bu = $11,
        project_start_date = $12,
        project_end_date = $13,
        billed = $14,
        unbilled_days = $15,
        allocation_start_date = $16,
        allocation_end_date = $17,
        bilingual = $18,
        language_level = $19,
        primary_skill = $20,
        secondary_skill = $21,
        srm_experience_in_years = $22,
        previous_experience = $23,
        overall_experience = $24,
        certification = $25,
        certification_2 = $26,
        appraisal_rating_2023 = $27,
        bill_rate = $28,
        ctc = $29,
        separation_date = $30,
        remarks = $31
      WHERE employee_id = $32`,
      values
    );
    if (updatedEmployee.rowCount === 0) {
      return res.status(404).send('Employee not found');
    } else {
      res.status(200).send('Employee updated');
    }
  } catch (err) {
    res.status(500).send('Failed to update employee ' + err);
  }
});

module.exports = router;

/* 
  CREATE TABLE employee (
    id SERIAL,
    employee_id VARCHAR(255) PRIMARY KEY,
    employee_name VARCHAR(255),
    designation VARCHAR(255),
    bu VARCHAR(255),
    doj DATE,
    year_of_joining INT,
    dob DATE,
    location VARCHAR(255),
    offshore_onsite VARCHAR(255),
    account VARCHAR(255),
    project VARCHAR(255),
    project_remarks_from_bu VARCHAR(255),
    project_start_date DATE,
    project_end_date DATE,
    billed VARCHAR(1),
    unbilled_days INT,
    allocation_start_date DATE,
    allocation_end_date DATE,
    bilingual VARCHAR(1),
    language_level VARCHAR(255),
    primary_skill VARCHAR(255),
    secondary_skill VARCHAR(255),
    srm_experience_in_years INT,
    previous_experience INT,
    overall_experience INT,
    certification VARCHAR(255),
    certification_2 VARCHAR(255),
    appraisal_rating_2023 INT,
    bill_rate INT,
    ctc INT,
    separation_date DATE,
    remarks VARCHAR(255)
  );
*/

//employee adding json example

/* 
{
  "employee_id": "491",
  "employee_name": "Jane Smith",
  "designation": "Senior Developer",
  "bu": "IT",
  "doj": "2022-05-15",
  "year_of_joining": 2022,
  "dob": "1985-07-20",
  "location": "San Francisco",
  "offshore_onsite": "Onsite",
  "account": "Project B",
  "project": "Subproject B1",
  "project_remarks_from_bu": "Key resource",
  "project_start_date": "2022-05-15",
  "project_end_date": "2023-05-15",
  "billed": "Y",
  "unbilled_days": 0,
  "allocation_start_date": "2022-05-15",
  "allocation_end_date": "2023-05-15",
  "bilingual": "N",
  "language_level": "Advanced",
  "primary_skill": "Python",
  "secondary_skill": "Django",
  "srm_experience_in_years": 10,
  "previous_experience": 5,
  "overall_experience": 15,
  "certification": "AWS Certified",
  "certification_2": "Azure Certified",
  "appraisal_rating_2023": 5,
  "bill_rate": 200,
  "ctc": 1200000,
  "separation_date": null,
  "remarks": "Outstanding performer"
}
 */
