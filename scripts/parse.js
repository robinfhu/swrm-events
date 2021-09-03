const csv = require('csvtojson');
const fs = require('fs');
(async function() {
    const result = await csv().fromFile(process.argv[2]);
    fs.writeFileSync("./output.json", JSON.stringify(result,null,'  '));
})();