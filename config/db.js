const {MongoClient,ObjectId} = require("mongodb");
const uri = "mongodb+srv://test:test123@cluster0.jnkr7m9.mongodb.net/Event_api?retryWrites=true&w=majority";
const database = "Event_api";


const client = new MongoClient(uri);


async function connectDB() {
    let result = await client.connect();
    db =result.db(database);
    return db.collection("Events");
 


}

module.exports = connectDB;
