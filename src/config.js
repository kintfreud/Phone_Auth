
const dotenv = require('dotenv').config();
module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
    serviceID : process.env.serviceID || 'VA8272aa07a9861240c073c4953eb61f4a',
   // 'VAa9b9bf95613f250d44dee88f846bad3b',
    accountSID : process.env.accountSID || 'AC0a4149e30f1da33fbfa8599d62c2bd99',
  //  'AC6516ebfb64999bfa9f140b872db8da04',
    authToken : process.env.authToken || '014190985bb6bbc75480f52949df8dab',
  //  'e52641933124482c3e8cc43b440acb56'
};