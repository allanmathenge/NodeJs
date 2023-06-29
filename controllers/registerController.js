const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) {this.users = data }
}
const fsPromises = require('fs').promises;
const path = require ('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const  { user, pwd } = req.body;
    if (!user || !pwd ) return res.status(400).json({"Message": "Username and password are required!"});
    //check for duplicate usernames in the database;
    const duplicate = usersDB.users.find(person => person.username === user );
    if (duplicate) return res.sendStatus(409); //conflict
    try {
        //encrypt the passwaord
        const hashedPwd = await bcrypt.hash(pwd, 10);
        //store the new user
        const newUser = { "username": user, "password": hashedPwd };
        usersDB.setUsers([...usersDB.users, newUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        console.log(usersDB.users);
        res.status(201).json({"Success": `New user ${user} created!`});
    } catch (err) {
        res.status(500).json({ "Message": err.message });
    }
}

module.exports = { handleNewUser };