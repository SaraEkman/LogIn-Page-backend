const express = require('express');
const router = express.Router();
const UserModel = require('../modules/user_model');
const adminName = 'admin';
const adminPass = '000';
const links = '<link rel="stylesheet" href="./style.css">'

router.post('/', (req, res) => {
    if (adminName == req.body.adminName && adminPass == req.body.adminPass) {
        res.cookie('isLogged', 'ok');
        return res.redirect('/admin/showAllUsers');

    } else {
        return res.redirect('/');
    }
});

router.get('/showAllUsers', async (req, res) => {
    console.log(req.cookies['isLogged']);
    if (req.cookies['isLogged'] == 'ok') {
        const users = await UserModel.find();
        foundUsersSu = [];
        foundUsersUn = [];
        let printHtml;
        users.find(user => {
            if (user.subscribe) foundUsersSu.push(user);
            else foundUsersUn.push(user);
        });

        if (foundUsersSu && foundUsersUn) {
            printHtml = `<h1>Användarna som är presumerade i mitt nyhetsbrev</h1>`;
            foundUsersSu.forEach(user => {
                printHtml += `<div>
                    <h2>email: ${user.email}</h2>
                 </div>`;
            });
       
            printHtml += `<h1>Användarna som inte prenumerera</h1 >`;
            foundUsersUn.forEach(user => {
                printHtml += `<div>
                <h2>UserName: ${user.email}</h2>
                </div>`;
            });

            return res.send(printHtml+ links);
        } else {
            return res.send('<h1>Inga användare att vissa 😰</h1>'+ links)
        }
    }
});



module.exports = router;