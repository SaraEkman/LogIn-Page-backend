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
    let { email, passWord, subscribe } = req.body;
    console.log(email, passWord);

    if (email === undefined && passWord === undefined || email === undefined || passWord === undefined) {
        return res.status(200).json({ 'status': 'empty' });
    } else {
        let users = await UserModel.find();
        console.log(users);
        let user = users.find((user) => email === user.email);
        console.log(user);
        if (user) {
            const originPass = CryptoJs.AES.decrypt(user.passWord, "passWord").toString(CryptoJs.enc.Utf8);
            if (passWord == originPass) {
                user.subscribe = subscribe;
                await user.save();
                return res.json({ 'status': 'found user', '_id': user._id });

            } else {
                return res.json({ 'status': 'password not found' });
            }
        } else {
            return res.json({ 'status': 'Not found user' });
        }
    }
});

router.put('/update', async (req, res) => {
    let { _id, subscribe } = req.body;
    await UserModel.findByIdAndUpdate(_id, { subscribe });
    if (subscribe) {
        res.json('update subscribe to true');    
    } else {
        res.json('update subscribe to false')
    }
});

router.post('/create', async (req, res) => {
    let { email, passWord, subscribe } = req.body;
    if (email === undefined && passWord === undefined || email === undefined || passWord === undefined) {
        return res.status(200).json({ 'status': 'empty' });
    } else {
        let users = await UserModel.find();
        let foundUser = users.find((user) => email === user.email);
        if (foundUser) {
            return res.json('user in use');

        } else {
            const encryptedPass = CryptoJs.AES.encrypt(passWord, "passWord").toString();
            if (subscribe == '') {
                subscribe = false;
                await UserModel.create({
                    email, passWord: encryptedPass, subscribe
                });
            } else {
                await UserModel.create({
                    email, passWord: encryptedPass, subscribe
                });
            }

            return res.json('new user created');
        }
    }
});

module.exports = router;