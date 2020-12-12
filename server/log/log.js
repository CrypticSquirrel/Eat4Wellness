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
    logDate: Joi.date().required(),
    logData: Joi.string().required(),
});

router.get('/', (req, res) => {
    res.json({
        message: 'here',   
    });
});

module.exports = router;

/* ---------------------------------Route for creating new entry---------- ----------------------- */
router.post('/some', (req, res) => {
    console.log(req.body);

    console.log(req.body.something)

    res.json({
        message: 'here',   
    });
})

router.post('/addlog', (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error === undefined) {
        logs
            .findOne({
                logDate: value.logDate,
                logData: value.logData,
            })
            .then((log) => {
                if (log) {
                    const duplicate = new Error(
                        'A log already exists for that day.'
                    );
                    res.status(409);
                    next(duplicate);
                } else{
                    
                        const newLog = {
                            logDate: value.logDate,
                            logData: value.logData,
                        };
                        logs.insert(newLog).then((insertedLog) => {
                            const jwtPayload = {
                                token: insertedLog.logData,
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

/* ---------------------------------Route for deleting an entry---------- ----------------------- */

router.post('/deletelog', (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error === undefined) {
    logs
    .findOne({logDate: value.logDate}, function(err, result) {
        if(result){
            
        
            res.json({
               message:("Deleted log from:" + " " + value.logDate)
            });
        
                logs.remove({'logDate': value.logDate})

        } 
            else {
                res.json({
                    message: 'Log entry not found.',
                });
                
            };
        });
    }});