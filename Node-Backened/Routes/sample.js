import express from 'express';
import fs from 'fs';
import sql from 'mssql';
import multer from 'multer';
import bodyParser from 'body-parser'
const router=express.Router();
var config = {
  user: 'skuma561',
  password: 'Test@123',
  server: 'LIN77001221\\SQLEXPRESS', 
  database: 'CodeBabaDB' ,
  "options": {
    "encrypt": true,
    "enableArithAbort": true
    }
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


const upload = multer();
router.post('/createExam',upload.single("file"),(req,res)=>{
    //users.push(req.body);
      console.log(req.file);
    // // console.log(req);
    // // console.log(req.body);
    // // console.log(req.files);
    
    const { examName, examTime } = req.body;
    sql.connect(config, function (err) {
      if (err) console.log(err);
      var request = new sql.Request();        
     //let questionFile = req.files.file; 
      let query = "exec addexam @examname='" + examName + "', @examtime='" + examTime + "';";  
      console.log(query);
      request.query(query, function (err, recordset) {
        if (err) {
            console.log(err);
            sql.close();
        }
        sql.close();
      });
    });
    //res.send(`user with the exam Name: ${req.body.examName}`);
    res.send(req.JSON);
});
export default router;