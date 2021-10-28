import express from 'express';
import fs from 'fs';
import sql from 'mssql';
import multer from 'multer';
import bodyParser from 'body-parser'
import fileExtension from 'file-extension';
import xlsxtojson from 'xlsx-to-json';
import xlstojson from "xls-to-json";
import path from 'path';
import date from 'date-and-time';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const crypto = require('crypto');
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
const SENDGRID_API = process.env.SENDGRID_API;
const EMAIL = process.env.EMAIL; 
var config = {
  user: 'xxxxx',
  password: 'xxxxxxxx',
  server: 'xxxxxxxx', 
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
    for(let i=1;i<=users.length;i++){
      users[i-1].id=i;
      users[i-1].answer=(parseInt(users[i-1].answer)+parseInt(i)+parseInt(users[i-1].QuestionDesc.length))*54;
      users[i-1].identity=users[i-1].answer;
      delete users[i-1].answer;
    }
    console.log(users);
    res.send(users);
});
router.post('/exams',(req,res)=>{
  sql.connect(config, function (err) {
    if (err) console.log(err);
    const {schoolId,userClass}=req.body;
    var request = new sql.Request();  
    let query = "exec fetchExams @schoolId='"+schoolId+"',@userClass='"+userClass+"',@timeNow='"+Date.now()+"';" ;  
    console.log(query); 
    request.query(query, function (err, recordset) {      
        if (err) console.log(err)
        console.log(recordset);  
        // const exams = JSON.parse(recordset);  
        res.send(recordset);   
    });
  });
  
});
  
router.post('/adminExams',(req,res)=>{
  sql.connect(config, function (err) {
    if (err) console.log(err);
    const {studentid}=req.body;
    var request = new sql.Request();  
    let query = "exec adminExams @studentid='"+studentid+"';" ;  
    console.log(query); 
    request.query(query, function (err, recordset) {      
        if (err) console.log(err)
        console.log(recordset);  
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
          const { examName, examTime, examId, classSelected, schoolId, studentId,examDate } = req.body;
          var dir = '..\\Questions\\'+req.body.examId;
          console.log(dir);
          if (!fs.existsSync(dir)){
              fs.mkdirSync(dir);
          } 
          sql.connect(config, function (err) {
            if (err) console.log(err);
            var request = new sql.Request();        
           //let questionFile = req.files.file; 
            let query = "exec addexam @examname='" + examName + "', @examtime='" + examTime + "', @examid='" + examId +"', @classSelected='" + classSelected +"', @schoolId='" + schoolId + "', @examDate='" + examDate + "', @studentId='" + studentId +"';" ;  
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
    const { examId,studentId } = req.body;
    let request = new sql.Request();  
    let query = "exec fetchresponse @examid='" + examId + "', @studentid='" + studentId + "';" ;  
    console.log(query);
    request.query(query, function (err, recordset) {
      if (err) {
          console.log(err);
          sql.close();
      }          
      //res.send(recordset.rowsAffected[0]);
      console.log(recordset);
      res.send(recordset);
      sql.close();
    });
    //console.log(records+"hi");
  });  
});
router.post('/fetchClasses',(req,res)=>{
  let records;
   sql.connect(config, function (err) {
    if (err) console.log(err);
    const { schoolId } = req.body;
    let request = new sql.Request();  
    let query = "exec fetchClasses @schoolId='" + schoolId + "';" ;  
    console.log(query);
    request.query(query, function (err, recordset) {
      if (err) {
          console.log(err);
          sql.close();
      }          
      //res.send(recordset.rowsAffected[0]);
      console.log(recordset);
      res.send(recordset);
      sql.close();
    });
    //console.log(records+"hi");
  });  
});
router.post('/fetchEmail',(req,res)=>{
  let records;
   sql.connect(config, function (err) {
    if (err) console.log(err);
    const { emailId } = req.body;
    let request = new sql.Request();  
    let query = "exec fetchEmail @emailId='" + emailId + "';" ;  
    console.log(query);
    request.query(query, function (err, recordset) {
      if (err) {
          console.log(err);
          sql.close();
      }          
      //res.send(recordset.rowsAffected[0]);
      console.log(recordset);
      res.send(recordset);
      sql.close();
    });
    //console.log(records+"hi");
  });  
});
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}
router.post('/createUser',(req,res)=>{
  let records;
   sql.connect(config, function (err) {
    if (err) console.log(err);
    const { name,emailId,mobileNumber,schoolCode,selectedClass,userPassword } = req.body;
    let request = new sql.Request();  
    let sid=makeid();
    let query = "exec createUser @name='" + name + "',@studentId='" + sid + "',@emailId='" + emailId + 
    "',@mobileNumber='" + mobileNumber + "',@schoolCode='" + schoolCode + "',@userPassword='" + userPassword + "',@class='" + selectedClass + "';" ;  
    console.log(query);
    request.query(query, function (err, recordset) {
      if (err) {
          console.log(err);
          res.json("error")
          sql.close();
      }          
      //res.send(recordset.rowsAffected[0]);
      console.log(sid);
      // res.send(sid);
      res.json(sid)
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
    let query = "exec fetchExamHistory @studentid='"+studentId+"',@timeNow='"+Date.now()+"';" ;  
    console.log(query);
    request.query(query, function (err, recordset) {
      if (err) {
          console.log(err);
          // sql.close();
      }          
      //res.send(recordset.rowsAffected[0]);
      // records=recordset.rowsAffected[0];
      console.log(recordset);
      res.send(recordset);
      // sql.close();
    });
    //console.log(records+"hi");
  });  
});
router.post('/fetchExamReport',(req,res)=>{
  let records;
   sql.connect(config, function (err) {
    if (err) console.log(err);
    const { selectedExam } = req.body;
    let request = new sql.Request();  
    let query = "exec fetchExamReport @selectedExam='"+selectedExam+"';" ;  
    console.log(query);
    request.query(query, function (err, recordset) {
      if (err) {
          console.log(err);
          // sql.close();
      }          
      //res.send(recordset.rowsAffected[0]);
      // records=recordset.rowsAffected[0];
      console.log(recordset);
      res.send(recordset);
      // sql.close();
    });
    //console.log(records+"hi");
  });  
});
router.post('/fetchApprovals',(req,res)=>{
  let records;
   sql.connect(config, function (err) {
    if (err) console.log(err);
    const { schoolid } = req.body;
    let request = new sql.Request();  
    let query = "exec fetchApprovals @schoolid='"+schoolid+"';" ;  
    console.log(query);
    request.query(query, function (err, recordset) {
      if (err) {
          console.log(err);
          // sql.close();
      }          
      //res.send(recordset.rowsAffected[0]);
      // records=recordset.rowsAffected[0];
      console.log(recordset);
      res.send(recordset);
      // sql.close();
    });
    //console.log(records+"hi");
  });  
});
router.post('/fetchAllUsers',(req,res)=>{
  let records;
   sql.connect(config, function (err) {
    if (err) console.log(err);
    const { schoolid } = req.body;
    let request = new sql.Request();  
    let query = "exec fetchAllUsers @schoolid='"+schoolid+"';" ;  
    console.log(query);
    request.query(query, function (err, recordset) {
      if (err) {
          console.log(err);
          // sql.close();
      }          
      //res.send(recordset.rowsAffected[0]);
      // records=recordset.rowsAffected[0];
      console.log(recordset);
      res.send(recordset);
      // sql.close();
    });
    //console.log(records+"hi");
  });  
});
router.post('/fetchAdmins',(req,res)=>{
  let records;
   sql.connect(config, function (err) {
    if (err) console.log(err);
    const { schoolid } = req.body;
    let request = new sql.Request();  
    let query = "exec fetchAdmins @schoolid='"+schoolid+"';" ;  
    console.log(query);
    request.query(query, function (err, recordset) {
      if (err) {
          console.log(err);
          // sql.close();
      }          
      //res.send(recordset.rowsAffected[0]);
      // records=recordset.rowsAffected[0];
      console.log(recordset);
      res.send(recordset);
      // sql.close();
    });
    //console.log(records+"hi");
  });  
});
router.post('/fetchUserProfile',(req,res)=>{
  let records;
   sql.connect(config, function (err) {
    if (err) console.log(err);
    const { studentId } = req.body;
    let request = new sql.Request();  
    let query = "exec fetchUserProfile @studentId='"+studentId+"';" ;  
    console.log(query);
    request.query(query, function (err, recordset) {
      if (err) {
          console.log(err);
          // sql.close();
      }          
      //res.send(recordset.rowsAffected[0]);
      // records=recordset.rowsAffected[0];
      console.log(recordset);
      res.send(recordset);
      // sql.close();
    });
    //console.log(records+"hi");
  });  
});

router.post('/approveUser',(req,res)=>{
  let records;
   sql.connect(config, function (err) {
    if (err) console.log(err);
    const { studentId,approvalType } = req.body;
    let request = new sql.Request(); 
    let query=""
    if(approvalType=="approve") {
    query = "exec approveUser @studentId='"+studentId+"';" ; }
    else if(approvalType=="delete") {
    query = "exec deleteUser @studentId='"+studentId+"';" ; }
    else if(approvalType=="makeadmin") {
    query = "exec makeAdmin @studentId='"+studentId+"';" ; }
    else if(approvalType=="RemoveAdmin") {
    query = "exec RemoveAdmin @studentId='"+studentId+"';" ; }
    console.log(query);
    request.query(query, function (err, recordset) {
      if (err) {
          console.log(err);
          // sql.close();
      }          
      //res.send(recordset.rowsAffected[0]);
      // records=recordset.rowsAffected[0];
      console.log(recordset);
      res.send(recordset);
      // sql.close();
    });
    //console.log(records+"hi");
  });  
});
router.post('/activateExam',(req,res)=>{
  let records;
   sql.connect(config, function (err) {
    if (err) console.log(err);
    const { examId,activationType } = req.body;
    let request = new sql.Request(); 
    let query=""
    if(activationType=="activate") {
    query = "exec activateExam @examId='"+examId+"';" ; }
    else if(activationType=="deactivate") {
    query = "exec deactivateExam @examId='"+examId+"';" ; }
    console.log(query);
    request.query(query, function (err, recordset) {
      if (err) {
          console.log(err);
          // sql.close();
      }          
      //res.send(recordset.rowsAffected[0]);
      // records=recordset.rowsAffected[0];
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
        const { examId,totalQuestions,startTime,studentId } = req.body;
        let request = new sql.Request();  
        let query = "exec addresponse @examid='" + examId + "', @studentid='"+studentId+"', @totalquestions="+totalQuestions+", @startTime="+startTime+";";  
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
      const { examId,responseList,totalMarks,studentId } = req.body;
      let request = new sql.Request();  
      let query = "exec updateresponse @examid='" + examId + "', @studentid='"+studentId+"', @response='"+responseList+"',@totalMarks="+totalMarks+";";  
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
    
  router.post('/submitTest',(req,res)=>{ 
    sql.connect(config, function (err) {
      if (err) console.log(err);
      const { examId,studentId } = req.body;
      let request = new sql.Request();  
      let query = "exec submitTest @examid='" + examId + "', @studentid='"+studentId+"';";  
      console.log(query);
      request.query(query, function (err, recordset) {
        if (err) {
            console.log(err);
            req.send(err);
        }
      });
    });  
    res.send("Record Created");
  })
router.post('/loginUser',(req,res)=>{
//users.push(req.body); 
  sql.connect(config, function (err) {
    if (err) console.log(err);
    const { userEmail,userPassword } = req.body;
    let request = new sql.Request();  
    let query = "exec fetchUser @userEmail='" + userEmail + "', @userPassword='"+userPassword+"';";  
    console.log(query);
    request.query(query, function (err, recordset) {
      if (err) {
          console.log(err);
          // req.send(err);
          // sql.close();
          res.send("failed");
      }
      console.log(recordset);
      // console.log(recordset.rowsAffected[0]);
      // console.log(recordset.recordset[0].Student_Name);
      if(recordset.rowsAffected[0]>0 && recordset.recordset[0].Student_id!=null){
          // req.send(err);
          res.send({            
            token: recordset.recordset[0]
          });
        }
        else{
        res.send("failed");
        }
      sql.close();
    });
  });  
  // res.send("Exam Created successfully");
})
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'exambaba16@gmail.com',
    pass: 'Exambaba#123'
  }
});
router.post('/reset-password',(req,res)=>{
  crypto.randomBytes(32,(err,buffer)=>{
      if(err){
          console.log(err)
      }
      const userEmail = req.body.userEmail;
      console.log(userEmail)
      const token = buffer.toString("hex")
      console.log(token)
      sql.connect(config,function (err) {
      var queryString = "exec resetUser @emailId = '"+userEmail+"', @sentToken = '"+token+"';"
      console.log(queryString)
      let request = new sql.Request();
      request.query(queryString, (err, recordset) =>{
            if(err){
              return res.status(422).json({error:"User dont exists with that email"})
            }
            else{
              transporter.sendMail({
                to:userEmail,
                from:'"no-reply@exambaba.com" <foo@example.com>',
                subject:"Password reset",
                html:`
                <p>You requested for password reset</p>
                <h4>click in this <a href="http://localhost:3000/reset/${token}">link</a> to reset password</h4>
                `
              }).catch(console.error)
              res.send({result:recordset.recordset[0].Result})
              console.log(recordset.recordset[0].Result)
            }
        })
      })
  })
})
router.post('/new-password',(req,res)=>{
  //const userPassword = bcrypt.hashSync(req.body.userPassword, saltRounds);
  //bcrypt.compareSync(myPlaintextPassword, hash);
  const userPassword = req.body.userPassword;
  const senttoken = req.body.token;
  //console.log(userEmail)
  sql.connect(config,function (err) {
  var queryString = "exec newPassword @currentToken = '"+senttoken+"', @password = '"+userPassword+"';"
  console.log(queryString)
  let request = new sql.Request();
  request.query(queryString, (err, recordset) =>{
        if(err)
          return res.status(422).json({error:"User dont exists with that email"})
          console.log(recordset.recordset[0].Result)
        res.json({message:"password update successful"})
    })
  })
})

router.delete('/:firstName',(req,res)=>{
    const {firstName}=req.params;
    users=users.filter((user)=>user.firstName !== firstName);
    res.send(`user with the firstname ${name}`);
});
export default router;
