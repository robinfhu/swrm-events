/**
 * You want to construct this with the list of all sessions.
 * It has convenience methods for parsing the session data.
 * 
 * Load in the speakers and media maps as well here.
 */
export default class Sessions {
    constructor(config, sessions, speakers, media) {
        this.config = config;
        this.data = this.cleanUp(sessions);
        this.dates = this.countDates(this.data);
        this.sortByTime(this.data);
        this.rooms = this.countRooms(this.data);
        this.speakers = speakers;
        this.media = media;
        this.loadSpeakersMedia(this.data);
    }

    getData() {
        return this.data; 
    }

    getBaseLocation() {
        return this.config["baseLocation"] || "";
    }

    getParentSessions() {
        return this.data.filter((item)=> item.Parent === "")
    }

    getSpeaker(id) {
        return this.speakers[id];
    }

    getMedia(id) {
        return this.media[id];
    }

    getDates() {
        return this.dates;
    }

    getRooms() {
        return this.rooms;
    }

    getSession(id) {
        return this.data.find((item)=> item.SessionID === id);
    }

    getChildSessions(parentId) {
        return this.data.filter((item)=> item["Parent"] === parentId);
    }

    // Removes trailing hyphens from a string.
    removeTrailing(str) {
        return str.trim().replace(/\-$/,'').trim();
    }

    // Converts Start time to 24 h time string, and then sorts on that in ascending order.
    sortByTime(data) {
        data.forEach((item)=> {
            let startTime = item["StartTime"];
            item.StartTime24H = "";
            if (!startTime) {
                return;
            }
            let isPM = startTime.includes("PM");
            let [_, h, m] = startTime.match(/(\d+):(\d+)/);
            if (isPM && h != "12") {
                h = parseInt(h) + 12;
            }
            item.StartTime24H = `${h}${m}`;
        });

        let asc = (a,b, whenEqual)=> {
            if (a < b) {
                return -1;
            }
            else if (a > b) {
                return 1;
            }
            else {
                return whenEqual;
            }
        }

        data.sort((a,b) => {
            return asc(a.DateKey,b.DateKey,
                asc(a.StartTime24H,b.StartTime24H,
                asc(a.Location,b.Location,0))); 
        });
    }

    // Removes spaces from the keys of each JSON item.
    // Removes trailing dash from locations and titles
    // Creates a search blob
    cleanUp(data) {
        let result = [];
        // If the time is something like 7:00, make it 07:00.
        const zeroPad = (time) => {
            if (time.length === 7) {
                return "0" + time;
            }
            else {
                return time;
            }
        }
        result = data.map((item) => {
            let entry = {};
            for (const key in item) {
                let keyClean = key.replace(/\s/g, '');
                entry[keyClean] = item[key];
            }
            //If location appears in session description, have it removed.
            entry["SessionDescription"] = entry["SessionDescription"].replace(entry["Location"],'').trim();
            entry["Location"] = this.fixLocation(entry["Location"]);
            entry["SessionTitle"] = this.fixSessionTitle(entry["SessionTitle"]);
            entry["SessionDescription"] = this.removeTrailing(entry["SessionDescription"]);
            entry["SearchBlob"] = [
                entry["SessionTitle"].toLowerCase() ,
                entry["SessionDescription"].toLowerCase(),
                entry["SessionID"].toLowerCase()
            ].join(' ');

            entry["StartTime"] = zeroPad(entry["StartTime"]);
            entry["EndTime"] = zeroPad(entry["EndTime"]);

            return entry;
        });
        return result;
    }

    fixLocation(location) {
        if (this.config["baseLocation"]) {
            location = location.replace(this.config["baseLocation"], '');
            location = this.removeTrailing(location);
        }

        let mapping = this.config["locationMappings"] || {};
        if (mapping[location] != null) {
            location = mapping[location];
        }
        return location;
    }

    fixSessionTitle(title) {
        if (!this.config["sessionPrefixToRemove"]) {
            return title;
        }
        let prefix = this.config["sessionPrefixToRemove"];
        let reg = new RegExp(`^${prefix}\\s?:?`);
        return this.removeTrailing(title).replace(reg,'').trim();
    }

    // Finds all unique dates in the sessions data set.
    countDates(data) {
        let result = {};
        const zeropad = (n) => {
            if (n.length <= 1) {
                return "0" + n;
            }
            else {
                return n;
            }
        }
        data.forEach((item) => {
            if (item.Date) {
                let [m,d,y] = item.Date.split("/");
                // Removes invalid dates.
                if (!m) { return; }

                //If the year is two digits, add "20" in front of it.
                if (y.length == 2) {
                    y = "20" + y;
                }
                m = zeropad(m);
                d = zeropad(d);
                let dateKey = `${y}-${m}-${d}`
                item.DateKey = dateKey;
                result[dateKey] = 1;
            }
        });
        return Object.keys(result).sort();
    }

    countRooms(data) {
        let result = {};
        data.forEach((item) => {
            if (item.Location) {
                result[item.Location] = 1;
            }
        });
        return Object.keys(result).sort();
    }

    loadSpeakersMedia(data) {
        data.forEach((item) => {
            if (item["SpeakerID"]) {
                item["Speakers"] = item["SpeakerID"].split(",")
                .map((d) => d.trim())
                .map((id) => this.getSpeaker(id)).filter(d => d);
            }

            if (item["Media"]) {
                item["MediaContent"] = this.getMedia(item["Media"]);
            }
        });
    }

    searchFilter(query) {
        let parts = query.split(' ').map((d)=> d.toLowerCase());
        return this.getParentSessions().filter((item) => !!item["Date"]).filter((item) => {
            return parts.every((part)=> item['SearchBlob'].includes(part));
        });
    }
}