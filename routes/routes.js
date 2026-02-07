// C R E A T I N G   R O U T E S 

const express = require('express')

const router = express.Router()

const Register = require('../models/Registration');

const registrationController = require('../controllers/registrationController');


router.post('/register', registrationController.createRegistration);

router.post('/login', registrationController.createLogin);

router.get('/delete/:email', registrationController.deleteUser);

module.exports = router;

