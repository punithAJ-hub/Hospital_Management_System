const router = require('express').Router();

const controller = require('./users.controller');
var bodyParser = require('body-parser')
 
// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
 

router.post('/signUp',jsonParser, controller.createUser);
router.post('/signIn', jsonParser, controller.getUserWithDetails)
router.put('/:id', controller.updateUser);
// router.get('/:id',urlencodedParser, controller.getUserWithDetails);


module.exports = router;
