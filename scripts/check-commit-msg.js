const fs = require('fs');

const msgPath = process.argv[2];
const msg = fs.readFileSync(msgPath, 'utf-8').trim();
const prefix = 'HS User Lambda';

if (!msg.startsWith(prefix)) {
  const newMsg = `${prefix} ${msg
