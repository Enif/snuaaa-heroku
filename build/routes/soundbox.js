'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _post = require('../models/post');

var _post2 = _interopRequireDefault(_post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (req, res) {
    console.log('[retrivepost] ');
    _post2.default.findOne({ board_no: "b00" }, '_id post_no author_id author_name title created contents', { sort: { 'created_at': -1 } }, function (err, posts) {
        if (err) return res.status(500).json({ error: err });
        res.json(posts);
    });
});

exports.default = router;