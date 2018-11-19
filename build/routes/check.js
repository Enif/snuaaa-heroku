'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _token = require('../lib/token');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/*
    GET /api/check
*/

router.get('/', function (req, res) {
    console.log('[check]');

    var auth = req.headers.authorization.split(" ");
    var token = void 0;

    if (auth[0] === 'Bearer') {
        token = auth[1];
    }

    if (!token) {
        return res.status(403).json({
            success: false,
            message: 'Token does not exist.'
        });
    }

    (0, _token.verifyToken)(token).then(function (decodedToken) {
        console.log('[check] Token is valid..');
        return res.status(200).json({
            success: true
        });
    }).catch(function (err) {
        console.log('[check] Token is invalid..');
        return res.status(403).json({
            success: false,
            message: 'Token does not valid.'
        });
    });
});

exports.default = router;

// router.get('/', (req, res) => {

//     // read the token from header or url 
//     const token = req.headers['x-access-token'] || req.query.token

//     // token does not exist
//     if(!token) {
//         return res.status(403).json({
//             success: false,
//             message: 'not logged in'
//         })
//     }

//     // create a promise that decodes the token
//     const p = new Promise(
//         (resolve, reject) => {
//             jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
//                 if(err) reject(err)
//                 resolve(decoded)
//             })
//         }
//     )

//     // if token is valid, it will respond with its info
//     const respond = (token) => {
//         res.json({
//             success: true,
//             info: token
//         })
//     }

//     // if it has failed to verify, it will return an error message
//     const onError = (error) => {
//         res.status(403).json({
//             success: false,
//             message: error.message
//         })
//     }

//     // process the promise
//     p.then(respond).catch(onError)

// })