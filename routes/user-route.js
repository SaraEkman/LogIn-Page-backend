var express = require('express');
var router = express.Router();
var CryptoJs = require('crypto-js');
const cors = require('cors');
const UserModel = require('../modules/user_model');
router.use(cors());

/* GET users listing. */
router.get('/', async (req, res, next) => {
    const users = await UserModel.find();
    res.status(200).json(users);
});

router.post('/logIn', async (req, res) => {
    let { userName, passWord, subscribe } = req.body;
    console.log(userName, passWord);

    if (userName === '' && passWord === '' || userName === '' || passWord === '') {
        return res.status(200).json({ 'status': 'empty' });
    } else {
        let users = await UserModel.find();
        console.log(users);
        let user = users.find((user) => userName === user.userName);
        console.log(user);
        if (user) {
            const originPass = CryptoJs.AES.decrypt(user.passWord, "passWord").toString(CryptoJs.enc.Utf8);
            if (passWord == originPass) {
                user.subscribe = subscribe
                await user.save()
                return res.json({ 'status': 'found user','_id':user._id });

            } else {
                return res.json({ 'status': 'password not found' }); 
            }
        } else {
            return res.json({ 'status': 'Not found user' });
        }
    }
});

router.post('/create', async (req, res) => {
    let { userName, passWord,subscribe } = req.body;
    if (userName === '' && passWord === '' || userName === '' || passWord === '') {
        return res.status(200).json({ 'status': 'empty' });
    } else {
        let users = await UserModel.find();
        let foundUser = users.find((user) => userName === user.userName);
        if (foundUser) {
            const originPass = CryptoJs.AES.decrypt(foundUser.passWord, "passWord").toString(CryptoJs.enc.Utf8);
            if (originPass == passWord) {
                return res.json('user found already')
            } else {
                return res.json('user forgot password')
            }

        } else {
            const encryptedPass = CryptoJs.AES.encrypt(passWord, "passWord").toString();
            if (subscribe == '') {
                subscribe = false
                const user = await UserModel.create({
                    userName, passWord: encryptedPass, subscribe
                });
            } else {
                const user = await UserModel.create({
                    userName, passWord: encryptedPass, subscribe
                });
            }
            
           return res.json('new user created')  
        }
    }
});


router.post('/newsLetter', async (req, res) => {
    const users = await UserModel.find();
    const foundUser = users.find(user => user._id == req.body._id);
    if (foundUser) {
        foundUser.subscribe = !foundUser.subscribe
        await UserModel.create(foundUser)
        res.status(200).json({ 'status': 'ok' });
    } else {
        res.json({ 'status': 'not found' });
    }
    console.log(foundUser);
});

module.exports = router;