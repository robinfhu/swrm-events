const csv = require('csvtojson');
const fs = require('fs');
(async function() {
    const result = await csv().fromFile(process.argv[2]);
    const idKey = process.argv[3] || 'ID';
    const mapResult = {};
    for(const item of result) {
        if (!item[idKey]) {
            throw new Error("Missing ID key");
        }
        mapResult[item[idKey]] = item;
    }
    fs.writeFileSync("./output-map.json", JSON.stringify(mapResult,null,'  '));
})();

