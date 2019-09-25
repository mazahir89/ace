/* eslint-disable */

const fs = require('fs');
const doczPackage = require('../../docz/package.json');

fs.writeFile('_DOCZ_VERSION', doczPackage.version, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Version file generated:', doczPackage.version);
});
