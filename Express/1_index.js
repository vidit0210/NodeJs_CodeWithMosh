const express = require('express');
const app = express();

const courses =[
    {id:1,name:'C++'},
    {id:2,name:'Java'}
]
app.get('/',(req,res)=>{
    res.send('Hello Word');
})
const courseAPi= '/courses/api';

app.get(courseAPi,(req,res)=>{
    res.send('This is APi Courses');
})

app.get('/courses/:name',(req,res)=>{
    const course = courses.find(c => c.name==(req.params.name));
    if(!course) res.status(404).send("Course Not Found");
    else res.send(course.name);
    
})

app.get('/post/:year/:month',(req,res)=>{
    res.send(req.params);
})
const port=process.env.PORT||3000;

app.listen(port,()=>console.log(`Listening to port ${port}`));