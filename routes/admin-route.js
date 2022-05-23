const express = require('express');
const router = express.Router();
const UserModel = require('../modules/user_model');

router.get('/', async (req, res) => {
    const users = await UserModel.find();
    foundUsers = []
    users.find(user => {
        if (user.subscribe == true) foundUsers.push(user)
    })
    
    if (foundUsers) {
        let printHtml =`<h1>Användarna som är presumerade i mitt nyhetsbrev</h1>`;
        foundUsers.forEach(user => { 
            printHtml += `<div>
            <h2>Username: ${user.userName}</h2>
            </div>`
        });
        return res.send(printHtml);    
    } else {
        return res.send('<h1>Ingen användare prenumerera 😢</h1>')
    }
});

module.exports = router;