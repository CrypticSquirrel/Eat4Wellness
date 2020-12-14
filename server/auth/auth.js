/* eslint-disable no-underscore-dangle */
/* ---------------------------------------- Dependencies ---------------------------------------- */

const express = require('express');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');     
const bcrypt = require('bcrypt');  
const db = require('../db/connection');
require('dotenv').config();

const router = express.Router();
const users = db.get('users');
users.createIndex('username', { unique: true });

/* ----------------------------------------- Validation ----------------------------------------- */

const schema = Joi.object({
    username: Joi.string().alphanum().min(2).max(30).required(),
    password: Joi.string().alphanum().min(4).required(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string(),
    address: Joi.string(),
    country: Joi.string(),
    state: Joi.string(),
    city: Joi.string(),
    zip: Joi.string().alphanum(),
});

router.get('/', (req, res) => {
    res.json({
        message: '🗝🔓',
    });
});

/* ------------------------------------ Route for signing up ------------------------------------ */

router.post('/signup', (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error === undefined) {
        users
            .findOne({
                username: value.username,   
            })
            .then((user) => {
                if (user) {
                    const duplicate = new Error(
                        'That username is already taken. Please choose another one.'
                    );
                    res.status(409);
                    next(duplicate);
                } else {
                    
                        const newUser = {
                                username: value.username,
                                password: value.password,
                                firstName: value.firstName,
                                lastName: value.lastName,
                                email: value.email,
                                address: value.address,
                                country: value.country,
                                state: value.state,
                                city: value.city,
                                zip: value.zip,     
                        };
                        users.insert(newUser).then((insertedUser) => {
                            const jwtPayload = {
                                token: insertedUser.username,
                            };
                            console.log(jwtPayload)
                            res.json(jwtPayload);
                        });
                     
                }
            });
    } else {
        res.status(422);
        next(error);
    }
});

/* ------------------------------------ Route for logging in ------------------------------------ */

router.post('/login', (req, res, next) => {
    const loginError = new Error('Unable to login');
    console.log(req.body)
    const { error, value } = schema.validate(req.body);
    
    
    if (error === undefined) {
        users
            .findOne({username: value.username}, function(err, result) {
                if (result) {

                    

                 users.findOne({password: value.password}).then((result) => {
                        if (result) {

                           
                            const payload = {
                                _id: users._id,
                                username: users.username,
                            };
                            jwt.sign(
                                payload,
                                process.env.TOKEN_SECRET,
                                { expiresIn: '1d' },
                                (err, token) => {
                                    if (err) {
                                        res.status(401);
                                        next(loginError);
                                    } else {
                                        res.json({
                                            token,
                                        });
                                    }
                                }
                            );
                        } else {
                            res.status(401);
                            next(loginError);
                        }
                    });
                
            }
            
            else {
                res.status(401);
                next(loginError);
            }})
     
            

    } else {
        res.status(401);
        next(loginError);
    }
});

module.exports = router;
