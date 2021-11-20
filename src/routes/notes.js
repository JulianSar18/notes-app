const router = require ('express').Router();

router.get('/notes', (req, res)=>{
    res.send('notas aquí');
});
module.exports = router;