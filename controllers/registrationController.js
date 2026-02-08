    // C R E A T I N G a  C O N T R O L L E R

// impoting model

const Registration = require('../models/Registration');

const bcrypt = require('bcrypt');

const createRegistration = async(req,res) =>{
    try{
        const {name, email, password} = req.body;
        const existingUser = await Registration.findOne({email});
        if(existingUser){
         return res.status(409).json({message:'User already exists'});
        }

        // password Hashing
        const hashingPassword = await bcrypt.hash(password,10);

            const createRegistration = new Registration({
                name,
                email,
                password : hashingPassword, /*Hashing Password */
            })

            await createRegistration.save()

           res.status(201).json({message:'Registered Successfully'});
    }catch(err){
        res.status(500).json({message:'Server Error' + err});
    }
}

    const createLogin = async(req,res) => {
        try {
            const {email, password} = req.body;

            const user = await Registration.findOne({email});

            if(!user){
                return res.status(404).json({message:'User not found'});
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch) {
                return res.status(400).json({message:'Wrong password'});

                // res.send('Your password doesnt match');
            }
            res.status(200).json({message : 'Login Successfully'});
        }
        catch(err) {
            res.status(500).json({message:'Server error'});
        }
    }

    const deleteUser = async(req,res) => {
        try{
            const {email} = req.params;
            const user = await Registration.findOne({email});
            if(!user) {
                return res.status(404).json({message:'User not found'});
            }

            await Registration.deleteOne({email});
            res.status(200).json({message:'User deleted Successfully'});

        }catch(err) {
            console.log(err);
            res.status(500).json({message:'Server Error'});
        }
    }

    module.exports = {createRegistration, createLogin, deleteUser};