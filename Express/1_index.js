const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send('Hello Word');
})
const courseAPi= '/courses/api';

app.get(courseAPi,(req,res)=>{
    res.send('This is APi Courses');
})

app.listen(3000,()=>console.log('Listening to port 3000'));