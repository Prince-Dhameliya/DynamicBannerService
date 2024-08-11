const express = require('express');
const router = express.Router();
const { getBanners, updateBanner, createBanner, getBanner } = require('../controllers/Banner.js');
const { handleLogin } = require('../controllers/Login.js');
const { handleNewUser } = require('../controllers/Registration.js');

router.route('/banner')
    .get(getBanners)
    .post(createBanner);


router.route('/banner/:id')
    .get(getBanner)
    .put(updateBanner)

router.route('/login')
    .post(handleLogin)

router.route('/register')
    .post(handleNewUser)

module.exports = router;