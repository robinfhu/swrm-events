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
        const agendaLink = dom.window.document.getElementsByTagName("a")[0];
        if (!agendaLink) {
            console.log("Missing link for ", item.ID);
            continue;
        }
        const eventId = agendaLink.href.split(":")[5];
        agendaLink.setAttribute("href", `#/event/${eventId}`);

        let header = dom.window.document.getElementsByTagName("h1")[0];
        if (header) {
            dom.window.document.body.removeChild(header);
        }
        item["Description"] = dom.window.document.body.innerHTML;
        delete item["Type"];
        mapResult[item[idKey]] = item;
    }
    fs.writeFileSync("./output-media.json", JSON.stringify(mapResult,null,'  '));
})();

