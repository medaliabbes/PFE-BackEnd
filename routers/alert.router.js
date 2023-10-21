
const router  = require('express').Router() ;

const alertController = require('../controllers/alert.controller') ;

router.post('/' , alertController.Create) ;

router.get('/' , alertController.ReadAll) ;

router.get('/:id' , alertController.Read)  ;

router.delete('/:id' , alertController.Delete) ;

router.put('/:id' , alertController.Update) ;

router.get('/user/:userid' , alertController.getUserAlerts) ;


module.exports = router ;