import express from 'express';
import fs from 'fs';

const router=express.Router();

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
router.get('/:id',(req,res)=>{
    const {id}=req.params;
    let rawdata = fs.readFileSync(`..\\Questions\\${id}\\Questions.json`);
    const users = JSON.parse(rawdata);  
    res.send(users);
});
router.post('/',(req,res)=>{
    users.push(req.body);
    res.send(`user with the firstname ${req.body.firstName}`);
});
router.delete('/:firstName',(req,res)=>{
    const {firstName}=req.params;
    users=users.filter((user)=>user.firstName !== firstName);
    res.send(`user with the firstname ${name}`);
});
export default router;