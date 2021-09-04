export default class Sessions {
    constructor(data) {
        this.data = this.cleanUp(data);
        this.dates = this.countDates(this.data);
    }

    getData() {
        return this.data; 
    }

    getParentSessions() {
        return this.data.filter((item)=> item.Parent === "")
    }

    getDates() {
        return this.dates;
    }

    getSession(id) {
        return this.data.find((item)=> item.SessionID === id);
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
                let dateKey = `${y}-${m}-${d}`
                item.DateKey = dateKey;
                result[dateKey] = 1;
            }
        });
        return Object.keys(result).sort();
    }
}