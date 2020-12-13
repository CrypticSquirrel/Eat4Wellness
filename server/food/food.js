/* ---------------------------------------- Dependencies ---------------------------------------- */

const express = require('express');
const Joi = require('@hapi/joi');
const db = require('../db/connection');
require('dotenv').config();

const router = express.Router();
const foods = db.get('foods');
foods.createIndex('food', { unique: true });

/* ----------------------------------------- Validation ----------------------------------------- */

const schema = Joi.object({
    foodName: Joi.string().alphanum().required(),
    foodData: Joi.string().required(),
});

router.get('/', (req, res) => {
    res.json({
        message: 'here',
    });
});

module.exports = router;

/* ---------------------------------Route for creating new entry---------- ----------------------- */


router.post('/addfood', (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error === undefined) {
        foods
            .findOne({
                foodName: value.foodName,
            })
            .then((food) => {
                if (food) {
                    const duplicate = new Error(
                        'That food item already exists.'
                    );
                    res.status(409);
                    next(duplicate);
                } else{
                   
                        const newFood = {
                            foodName: value.foodName,
                            foodData: value.foodData,
                        };
                        foods.insert(newFood).then((insertedFood) => {
                            const jwtPayload = {
                                token: insertedFood.foodData,
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

router.post('/deletefood', (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error === undefined) {
    foods
    .findOne({foodName: value.foodName}, function(err, result) {
        if(result){
            
        
            res.json({
               message:("Deleted:" + " " + value.foodName)
            });
        
                foods.remove({'foodName': value.foodName})

        } 
            else {
                res.json({
                    message: 'Food not found.',
                });
                
            };
        });
    }});

    /* ---------------------------------Route for editing an entry---------- ----------------------- */

router.post('/editfood', (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error === undefined) {
    foods
    .findOne({foodName: value.foodName}, function(err, result) {
        if(result){
            
        
            res.json({
               message:("Edited:" + " " + value.foodName)
            });
        
                foods.update(
                    {'foodName': value.foodName},
                    {$set:{"foodData": value.foodData}
                })

        } 
            else {
                res.json({
                    message: 'Food not found.',
                });
                
            };
        });    
    
}});