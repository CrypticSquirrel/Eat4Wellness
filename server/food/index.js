/* ---------------------------------------- Dependencies ---------------------------------------- */

const express = require('express');
const Joi = require('@hapi/joi');
const db = require('../db/connection');
require('dotenv').config();

const router = express.Router();
const food = db.get('food');
food.createIndex('food', { unique: true });

/* ----------------------------------------- Validation ----------------------------------------- */

const schema = Joi.object({
    food: Joi.string().alphanum().required(),
    foodData: Joi.string().alphanum().required(),
});

router.get('/', (req, res) => {
    res.json({
        message: '',
    });
});

module.exports = router;

/* ---------------------------------Route for creating new entry---------- ----------------------- */

router.post('/addfood', (req, res, next) => {
    const { error, value } = schema.validate(req.body);
    if (error === undefined) {
        food
            .findOne({
                food: value.food,
            })
            .then((food) => {
                if (food) {
                    const duplicate = new Error(
                        'That food item already exists.'
                    );
                    res.status(409);
                    next(duplicate);
                } else{
                    bcrypt.hash(value.foodData.trim(), 10, (err, hash) => {
                        const newFood = {
                            food: value.food,
                            foodData: hash,
                        };
                        food.insert(newFood).then((insertedFood) => {
                            const jwtPayload = {
                                token: insertedFood.foodData,
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