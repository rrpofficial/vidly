const express = require('express');
const router = express.Router();

router.use('/', (req, res)=>{
    res.send('home');
});

module.exports = router;