/**
 * You want to construct this with the list of all sessions.
 * It has convenience methods for parsing the session data.
 */
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

    // Removes spaces from the keys of each JSON item.
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

    // Finds all unique dates in the sessions data set.
    countDates(data) {
        let result = {};
        data.forEach((item) => {
            if (item.Date) {
                let [m,d,y] = item.Date.split("/");
                // Removes invalid dates.
                if (!m) { return; }
                let dateKey = `${y}-${m}-${d}`
                item.DateKey = dateKey;
                result[dateKey] = 1;
            }
        });
        return Object.keys(result).sort();
    }
}