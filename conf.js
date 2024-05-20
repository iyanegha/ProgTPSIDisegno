const fs = require('fs');

// connessione al DB
module.exports = {
   "host": "mysqlbaldonado-progtpsiandrea.c.aivencloud.com",
   "user": "avnadmin",
   "password": "AVNS_2Ocn2UWOIPeeTblPYnJ",
   "database": "progettoDisegno",
    "port": 22834,
  "ssl": {
    "ca" : fs.readFileSync('ca.pem'),
    "rejectUnauthorized": true
  }
}
