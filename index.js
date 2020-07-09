// require the express npm module, needs to be added to the project using "npm install express"
const express = require('express');
const shortid = require('shortid');


// creates an express application using the express module
const server = express();
let users = [];

server.use(express.json());


server.post('/api/users', (req, res) => {
    const userInfo = req.body

    const bodyKeys = Object.keys(userInfo);
    try{
        if(bodyKeys.length == 3){
            userInfo.id = shortid.generate();
            users.push(userInfo);
            res.status(201).json(userInfo)
        } else { res.status(400).json({errorMessage: "Please provide name and bio for the user."})
        }
    } catch (err) {
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database"})}
    }        
)



server.get("/api/users", (req,res) => {
    if(users.length !== 0) {
    res.status(201).json(users)
    } else {res.status(500).json({ errorMessage: "The users information could not be retrieved." })}
})

server.get("/api/users/:id", (req,res) => {
    const { id } = req.params;
    const userInfo = users.find(user => user.id == id)

    try{
        if(userInfo) {
        res.status(201).json(userInfo)
        } else { res.status(404).json({ message: "The user with the specified ID does not exist." })}
        } catch (err) {
        res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    }
})

server.delete("/api/users/:id", (req,res) => {
    const { id } = req.params;
    const deleted = users.find(user => user.id == id);
    
    try{
        if(deleted) {
        users = users.filter(user => user.id !== id);
        res.status(201).json(deleted);
        } else { res.status(404).json({ message: "The user with the specified ID does not exist." })
        }} catch (err) { 
        res.status(500).json({ errorMessage: "The user could not be removed" })
    }
})

server.put("/api/users/:id", (req, res) => {
        // Assigns the text after the semicolon to id (params is on the reg object)
    const { id } = req.params;
        // Assigns the request body to the request.  Uses /*server.use(express.json());*/ above. Which assigns all incoming to be JSON
    const userChange = req.body

        // Finds the id for the user located in the array and asigns it to variable 'index'.
    let index = users.findIndex(user => user.id === id);
        // Checks if index exists... basically
    try{
        if(index === -1){
            res.status(400).json({ message: "The user with the specified ID does not exist." })
        } else if (!userChange.name || !userChange.bio){
            res.status(400).json({ message: "Please provide name and bio for the user."}
            )
        } else {{
            // Assigns the id from req.params to the userChange object
            userChange.id == id;
            // Assign the changes to the object in the array it is changing out. (Uses the  index to locate)
            users[index] = userChange;
            // Returns response to client that is the changed object from the array... after it's been changed.
        res.status(201).json(users[index])}
        } }
        catch (err) {
        // Returns 404 with error message if the user has not been updated.
        res.status(500).json({ errorMessage: "The user information could not be modified." })
    } 
})

server.listen(8000, () => console.log('API running on port 8000'));