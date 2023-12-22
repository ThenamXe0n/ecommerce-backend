const express = require("express");
const {createBrands, fetchAllBrands} = require('../controllers/Brands');

const router = express.Router();

router.post('/',createBrands);
router.get('/',fetchAllBrands);

module.exports = router;