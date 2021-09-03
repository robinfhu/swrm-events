export default class Sessions {
    constructor(data) {
        this.data = this.cleanUp(data);
        this.dates = this.countDates(data);
    }

    getData() {
        return this.data; 
    }

    getDates() {
        return this.dates;
    }

    cleanUp(data) {
        let result = [];
        result = data.map((item) => {
            let entry = {};
            for (const key in item) {
                let keyClean = key.replace(/\s/g, '');
                entry[keyClean] = item[key];
            }
            return entry;
        });
        return result;
    }

    countDates(data) {
        let result = {};
        data.forEach((item) => {
            if (item.Date) {
                let [m,d,y] = item.Date.split("/");
                let dateStr = `${y}-${m}-${d}`
                result[dateStr] = 1;
            }
        });
        return Object.keys(result).sort();
    }
}