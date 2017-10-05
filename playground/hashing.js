const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!'

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  })
})

var hashedPass = '$2a$10$H6ThFFkl6zi7cOvDU/axDutL6KTvlc.kGOi09xCCeb4gR6OZenk82';

bcrypt.compare(password, hashedPass, (err, res) => {
  console.log(res);
})
// jwt.sign
// jwt.verify

// var message = "I am user number 3";
// var hash = SHA256(message).toString();
//
// console.log('Message: ', message);
// console.log('Hash: ', hash);
//
// var data = {
//   id: 4
// };
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };
//
// var resultHash =SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// if (resultHash === token.hash) {
//   console.log('Data was not change');
// } else {
//   console.log('Data was changed');
// }
