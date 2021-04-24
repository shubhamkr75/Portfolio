import express from 'express';
import fs from 'fs';

const router=express.Router();
let rawdata = fs.readFileSync('..\\Questions.json');
const users = JSON.parse(rawdata);
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
router.get('/',(req,res)=>{
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