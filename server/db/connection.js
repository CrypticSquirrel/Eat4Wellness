const monk = require('monk');

const url = 'localhost/betterfood';
const db = monk(url);

db.then(() => {
    console.log('Connected correctly to server');
});

module.exports = db;
