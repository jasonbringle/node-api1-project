// require the express npm module, needs to be added to the project using "npm install express"
const express = require('express');
const shortid = require('shortid');


// creates an express application using the express module
const server = express();
let users = [];

server.use(express.json());


server.post('/api/users', (req, res) => {
    const userInfo = req.body
    userInfo.id = shortid.generate();
    users.push(userInfo)
    res.status(201).json(users)
});

server.get("/api/users", (req,res) => {
    res.status(201).json(users)
})

server.get("/api/users/:id", (req,res) => {
    const { id } = req.params;
    const userInfo = users.find(user => user.id == id)

    if(userInfo) {
    res.status(201).json(userInfo)
    } else { res.status(404).json({message: "Something is wrong."})}
})

server.delete("/api/users/:id", (req,res) => {
    const { id } = req.params;
    const deleted = users.find(user => user.id == id);
    
    if(deleted) {
        users = users.filter(user => user.id !== id);
        res.status(201).json(deleted);
    } else {
        res.status(404).json({message: "user not found"})
    }
})

server.listen(8000, () => console.log('API running on port 8000'));