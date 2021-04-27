import express from 'express';
import fs from 'fs';
import sql from 'mssql';

const router=express.Router();
var config = {
  user: 'skuma561',
  password: 'Test@123',
  server: 'LIN77001221\\SQLEXPRESS', 
  database: 'CodeBabaDB' 
};

// connect to your database

// const users=[
//     {
//         firstName:"John",
//         lastname:"DOE",
//         age:25
//     },
//     {
//         firstName:"Johny",
//         lastname:"Biden",
//         age:27
//     }
// ]
router.get('/questions/:id',(req,res)=>{
    const {id}=req.params;
    let rawdata = fs.readFileSync(`..\\Questions\\${id}\\Questions.json`);
    const users = JSON.parse(rawdata);  
    res.send(users);
});
router.get('/exams',(req,res)=>{
  sql.connect(config, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();     
    request.query('select * from Examination where school_id=1', function (err, recordset) {      
        if (err) console.log(err)
        console.log(recordset);  
        // const exams = JSON.parse(recordset);  
        res.send(recordset);   
    });
  });
  
});
router.post('/createExam',(req,res)=>{
    //users.push(req.body);
    sql.connect(config, function (err) {
      if (err) console.log(err);
      var request = new sql.Request();   
      let query = "exec addexam @examname='" + req.body.examName + "', @examtime='" + req.body.examTime + "';";  
      request.query(query, function (err, recordset) {
        if (err) {
            console.log(err);
            sql.close();
        }
        sql.close();

      });
    });
    res.send(`user with the exam Name: ${req.body.examName}`);
});
router.delete('/:firstName',(req,res)=>{
    const {firstName}=req.params;
    users=users.filter((user)=>user.firstName !== firstName);
    res.send(`user with the firstname ${name}`);
});
export default router;