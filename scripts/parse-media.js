const csv = require('csvtojson');
const fs = require('fs');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;

(async function() {
    const result = await csv().fromFile(process.argv[2]);
    const idKey = process.argv[3] || 'ID';
    const mapResult = {};
    for(const item of result) {
        if (!item[idKey]) {
            throw new Error("Missing ID key");
        }
        const dom = new JSDOM(item["Description"]);
        item["Description"] = dom.window.document.body.innerHTML;
        delete item["Type"];
        mapResult[item[idKey]] = item;
    }
    fs.writeFileSync("./output-media.json", JSON.stringify(mapResult,null,'  '));
})();

