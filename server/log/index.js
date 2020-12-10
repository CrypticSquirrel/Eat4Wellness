/* ---------------------------------------- Dependencies ---------------------------------------- */

const express = require('express');
const Joi = require('@hapi/joi');
const db = require('../db/connection');
require('dotenv').config();

const router = express.Router();
const logs = db.get('logs');
logs.createIndex('log', { unique: true });

/* ----------------------------------------- Validation ----------------------------------------- */

const schema = Joi.object({
    logDate: Joi.string().alphanum().required(),
    logData: Joi.string().alphanum().required(),
});

router.get('/', (req, res) => {
    res.json({
        message: 'here',   
    });
});

module.exports = router;

/* ---------------------------------Route for creating new entry---------- ----------------------- */


router.post('/addlog', (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error === undefined) {
        logs
            .findOne({
                logDate: value.logDate,
            })
            .then((log) => {
                if (log) {
                    const duplicate = new Error(
                        'A log already exists for that day.'
                    );
                    res.status(409);
                    next(duplicate);
                } else{
                    bcrypt.hash(value.logData.trim(), 10, (err, hash) => {
                        const newLog = {
                            logDate: value.logDate,
                            logData: hash,
                        };
                        logs.insert(newLog).then((insertedLog) => {
                            const jwtPayload = {
                                token: insertedLog.logData,
                            };
                            res.json(jwtPayload);
                        });
                    });
                }
            }); 

    } else {
        res.status(422);
        next(error);
    }
});