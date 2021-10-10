const csv = require('csvtojson');
const fs = require('fs');
(async function() {
    const result = await csv().fromFile(process.argv[2]);
    let i = 1;
    for (const item of result) {
        item["Session Title"] = item["Event Title"];
        delete item["Event Title"];
        item["Session Description"] = '';
        if (item["Person"]) {
            item["Session Description"] += `Presiders: ${item["Person"]}. `;
        }
        if (item["Room"].includes("Zlotnik")) {
            item["Location"] = "Exhibition Hall";
        }
        else {
            item["Location"] = item["Room"];
            delete item["Room"];
        }

        if (item["Start Time"].length === 7) {
            item["Start Time"] = '0' + item["Start Time"];
        }
        if (item["End Time"].length === 7) {
            item["End Time"] = '0' + item["End Time"];
        }

        item["Long Description"] = item["Description"];
        if (item["Location"] === "Courtyard") {
            item["Session Description"] += item["Description"];
            delete item["Long Description"];
        }
        delete item["Description"];
        delete item["Person"];
        item["Session ID"] = `SOCIAL-${i}`;
        i++;
        item["Speaker ID"] = '';
        item["Parent"] = '';
    }
    fs.writeFileSync("./output-social.json", JSON.stringify(result,null,'  '));
})();