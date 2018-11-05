const express = require('express');
const app = express();
const Joi = require('joi');
const logger  = require('./logger');
app.use(express.json());

//app.use(logger);

app.use(logger.log());
app.use(logger.auth());
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

app.get('/courses',(req,res)=>{
    res.send(courses);
})
app.get('/courses/:name',(req,res)=>{
    const course = courses.find(c => c.name==(req.params.name));
    if(!course) res.status(404).send("Course Not Found");
    else res.send(course.name);
    
})

app.post('/courses',(req,res)=>{

    const schema = {
        name:Joi.string().min(3).required() };
    const result = Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
    }
    const course = {
        id:courses.length + 1,
        name:req.body.name
    }
    courses.push(course);
    res.send(course);
    console.log(courses);
    

})

// app.post('/courses',(req,res)=>{
//     const schema ={
//         name:Joi.string().min(3).required()
//     };
//     const result = Joi.validate(req.body,schema);
//     if(result.error){
//         res.status(400).send(result.error.details[0].message);
//         return;
//     }
//     const course = {
//         id:courses.length+1,
//         name:res.body.name
//     }
//     courses.push(course);
//     res.send(course)
//     console.log(courses);
    
// })

app.put('/courses/:name',(req,res)=>{
    console.log(courses);
    

    const fcourse = courses.find(c=>c.name==req.params.name)
    if(!fcourse){
        res.status(404).send("Course Not Found");
    }
    //const schema ={name:Joi.string().min(3).required()};
    //const result = Joi.validate(req.body,schema);
    //if(result.error){
      //  res.status(400).send(result.error.details[0].message);
   // }
fcourse.name =req.body.name;
res.send(fcourse);
console.log(courses);
})

app.delete('/courses/:id',(req,res)=>{
    const course = courses.find(c=>c.id==req.params.id);
    if(!course){
        res.status(400).send("Course Does not Exist");
    }
    let index = courses.indexOf(course)
     courses.splice(index,1);
    res.send(courses);
})
//Using Joi for Validation
app.get('/post/:year/:month',(req,res)=>{
    res.send(req.params);
})
const port=process.env.PORT||3000;

app.listen(port,()=>console.log(`Listening to port ${port}`));