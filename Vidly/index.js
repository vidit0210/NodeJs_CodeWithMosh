const Joi = require('joi');
const express = require('express');
const app =  express();
app.use(express.json());

const list = [
    {id:1,genre:'Action',code:'red'},
    {id:2,genre:'Comedy',code:'green'},
    {id:3,genre:'Drama',code:'blue'},
]

function validate(genre){
    const schema = { genre:Joi.string().min(4).required(),
                    code: Joi.string().min(3).required()};
    result = Joi.validate(genre,schema);
    return result;
}
app.get('/api/genre',(req,res)=>{
    res.send(list);
})
app.post('/api/genre',(req,res)=>{
    console.log(list);
    const {error}=validate(req.body);
    if(error){return res.status(400).send(error.details[0].message)};
    const added ={
        id:list.length+1,
        genre:req.body.genre,
        code:req.body.code
    }
    list.push(added);
    res.send(list)
    console.log("Update List",list);

})

app.put('/api/genre/:id',(req,res)=>{
    const {error} = validate(req.body);
    if(error) {
    return res.status(400).send(error.details[0].message);
    }
    const search = list.find(s=>s.id==req.params.id);
    if(!search){ return res.send("Item Not Found")};
    
    search.genre=req.body.genre;
    search.code=req.body.code;

    res.send(list);



})

app.delete('/api/genre/:id',(req,res)=>{
 const search = list.find(s =>s.id == req.params.id);
 if(!search){
     return res.send('Index not found');
 }
 const index = list.indexOf(search);
 list.splice(index,1);
 res.send(list);
})

const port = process.env.PORT||5000;
app.listen(port,()=>console.log(`Listening to port ${port}...`));
