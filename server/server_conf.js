let server = require('ws').Server;
let s = new server({ port: 5500 });

module.exports = s;