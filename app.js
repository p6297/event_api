const express=require("express");
const app = express();
const mongodb = require("mongodb");
const connectDB = require("./config/db")



const PORT =process.env.PORT || 4000;

//middlewarea
app.use(express.json());

app.get("/",(req,res)=> {
  res.send("ok")
})

app.get("/api/v3/app/events",async(req,res) => {
    try {
      const event_id = req.query.id
  
    let data = await connectDB();
    let result = await data.findOne({_id:new mongodb.ObjectId(event_id)});
    if (!result) {
        return res.status(404).send({ error: 'Event not found' });
      }
      res.status(200).send(result);
       
    } catch (error) {
      res.status(501).send(error.message)
       
    }
    
    
    
  })

  app.get('/api/v3/app/events', async (req, res) => {
    try {
      const { type, limit, page } = req.query;
  
      let query = {};
      if (type) {
        query.type = type;
      }
  
      const data = await connectDB();
  
      const totalCount = await data.countDocuments(query);
      const totalPages = Math.ceil(totalCount / limit);
  
      const events = await data.find(query).limit(Number(limit)).skip((Number(page) - 1) * Number(limit)).toArray();
  
      if (events.length === 0) {
        return res.status(404).send({ error: 'No events found' });
      }
  
      res.status(200).json({ events, totalPages });
    } catch (error) {
      res.status(501).send(error.message);
    }
  });
  


app.post("/api/v3/app/events",async(req,res) => {
  try {
    let data = await  connectDB();
  let result = await data.insertOne(req.body);
  res.status(201).send(result);
     
  } catch (error) {
     res.status(501).send(error.message);
  }
  
});


app.put("/api/v3/app/events/:id",async(req,res)=> {
  try { 
    let data = await connectDB();
    
    let updatedResult =await data.updateOne({_id:new mongodb.ObjectId(req.params.id)},{$set:req.body});
  if (!updatedResult) {
      return res.status(404).send({ error: 'Event not found' });
    }
    res.status(200).send('Updated Succesfully.');
    
     
  } catch (error) {
    res.status(501).send(error.message);
     
  }
  
  
});


app.delete("/api/v3/app/events/:id",async(req,res) => {

    try {
      let data = await connectDB();
      let result = await data.deleteOne({_id: new mongodb.ObjectId(req.params.id)});
      if (result.deletedCount === 0) {
          return res.status(404).send({ error: "Event not found" });
        }
      res.status(200).send("Deleted Successfully");
      
      
       
    } catch (error) {
      res.status(501).send(error);
       
    }
    
    
  })




app.listen(PORT,()=> {
  console.log(`Server is running on port:${PORT}`);
})