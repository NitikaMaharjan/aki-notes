const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    obj = {
        name: "nitika",
        age: 21
    }
    res.json(obj);
})

module.exports = router;