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
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    address: Joi.string().required(),
    country: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    zip: Joi.string().alphanum().required(),
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
    const { error, value } = schema.validate(req.body);
    if (error === undefined) {
        users
            .findOne({
                username: value.username,
            })
            .then((user) => {
                if (user) {
                    bcrypt.compare(value.password, user.password).then((result) => {
                        if (result) {

                            res.json({
                                message: 'here',
                            });


                            const payload = {
                                _id: user._id,
                                username: user.username,
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
                } else {
                    res.status(401);
                    next(loginError);
                }
            });
    } else {
        res.status(401);
        next(loginError);
    }
});

module.exports = router;
