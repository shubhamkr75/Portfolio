import express from 'express';
import fs from 'fs';
import sql from 'mssql';
import multer from 'multer';
import bodyParser from 'body-parser'
import fileExtension from 'file-extension';
import xlsxtojson from 'xlsx-to-json';
import xlstojson from "xls-to-json";
import path from 'path';
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
        //console.log(recordset);  
        // const exams = JSON.parse(recordset);  
        res.send(recordset);   
    });
  });
  
});
  

let storage = multer.diskStorage({ 
});
let upload = multer({storage: storage});
// let upload = multer({storage: storage}).single("file");
router.post('/createExam',(req,res)=>{
    //users.push(req.body);      
      let excel2json;
        upload.single("file")(req,res,function(err){
          console.log(req.body);         
          const { examName, examTime, examId } = req.body;
          var dir = '..\\Questions\\'+req.body.examId;
          console.log(dir);
          if (!fs.existsSync(dir)){
              fs.mkdirSync(dir);
          } 
          sql.connect(config, function (err) {
            if (err) console.log(err);
            var request = new sql.Request();        
           //let questionFile = req.files.file; 
            let query = "exec addexam @examname='" + examName + "', @examtime='" + examTime + "', @examid='" + examId +"';" ;  
            console.log(query);
            request.query(query, function (err, recordset) {
              if (err) {
                  console.log(err);
                  //sql.close();
              }
              console.log(recordset);
              //sql.close();
            });
          });
            if(err){
                 res.json({error_code:401,err_desc:err});
                 return;
            }
            if(!req.file){
                res.json({error_code:404,err_desc:"File not found!"});
                return;
            }

            if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
                excel2json = xlsxtojson;
            } else {
                excel2json = xlstojson;
            }

           //  code to convert excel data to json  format
            excel2json({
                input: req.file.path,  
                output: `..\\Questions\\${examId}\\Questions.json`, // output json 
                lowerCaseHeaders:true
            }, function(err, result) {
                if(err) {
                  // res.json(err);
                } else {
                  console.log(result);
                  // res.json(result);
                }
            });

        })
        res.send("Exam Created successfully");
});

router.post('/fetchResponse',(req,res)=>{
  let records;
   sql.connect(config, function (err) {
    if (err) console.log(err);
    const { examId } = req.body;
    let request = new sql.Request();  
    let query = "exec fetchresponse @examid='" + examId + "', @studentid='1';" ;  
    console.log(query);
    request.query(query, function (err, recordset) {
      if (err) {
          console.log(err);
          sql.close();
      }          
      //res.send(recordset.rowsAffected[0]);
      records=recordset.rowsAffected[0];
      console.log(recordset);
      res.send(recordset);
      sql.close();
    });
    //console.log(records+"hi");
  });  
});
router.post('/fetchExamHistory',(req,res)=>{
  let records;
   sql.connect(config, function (err) {
    if (err) console.log(err);
    const { studentId } = req.body;
    let request = new sql.Request();  
    let query = "exec fetchExamHistory @studentid="+studentId+";" ;  
    console.log(query);
    request.query(query, function (err, recordset) {
      if (err) {
          console.log(err);
          // sql.close();
      }          
      //res.send(recordset.rowsAffected[0]);
      records=recordset.rowsAffected[0];
      console.log(recordset);
      res.send(recordset);
      // sql.close();
    });
    //console.log(records+"hi");
  });  
});
router.post('/createResponse',(req,res)=>{
  //users.push(req.body); 
      sql.connect(config, function (err) {
        if (err) console.log(err);
        const { examId,totalQuestions,startTime } = req.body;
        let request = new sql.Request();  
        let query = "exec addresponse @examid='" + examId + "', @studentid='1', @totalquestions="+totalQuestions+", @startTime="+startTime+";";  
        console.log(query);
        request.query(query, function (err, recordset) {
          if (err) {
              console.log(err);
              req.send(err);
              // sql.close();
          }
          
          //console.log(recordset.rowsAffected[0]);
          // sql.close();
        });
      });  
      res.send("Record Created");
      // res.send("Exam Created successfully");
    })
router.post('/saveResponse',(req,res)=>{
//users.push(req.body); 
    sql.connect(config, function (err) {
      if (err) console.log(err);
      const { examId,responseList,totalMarks } = req.body;
      let request = new sql.Request();  
      let query = "exec updateresponse @examid='" + examId + "', @studentid='1', @response='"+responseList+"',@totalMarks="+totalMarks+";";  
      console.log(query);
      request.query(query, function (err, recordset) {
        if (err) {
            console.log(err);
            res.send(err);
            // sql.close();
        }
        //console.log(recordset);
        //console.log(recordset.rowsAffected[0]);
        // sql.close();
      });
    });  
    res.send("Record Updated");
    // res.send("Exam Created successfully");
  })
    

router.delete('/:firstName',(req,res)=>{
    const {firstName}=req.params;
    users=users.filter((user)=>user.firstName !== firstName);
    res.send(`user with the firstname ${name}`);
});
export default router;