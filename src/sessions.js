/**
 * You want to construct this with the list of all sessions.
 * It has convenience methods for parsing the session data.
 * 
 * Load in the speakers and media maps as well here.
 */
export default class Sessions {
    constructor(sessions, speakers, media) {
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

    removeTrailing(str) {
        return str.replace(/\-$/,'').trim();
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
            let [_, h, m] = startTime.match(/(\d\d):(\d\d)/);
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
    cleanUp(data) {
        let result = [];
        result = data.map((item) => {
            let entry = {};
            for (const key in item) {
                let keyClean = key.replace(/\s/g, '');
                entry[keyClean] = item[key];
            }
            //If location appears in session description, have it removed.
            entry["SessionDescription"] = entry["SessionDescription"].replace(entry["Location"],'').trim();
            entry["Location"] = this.removeTrailing(entry["Location"]);
            entry["SessionTitle"] = this.removeTrailing(entry["SessionTitle"]);
            entry["SessionDescription"] = this.removeTrailing(entry["SessionDescription"]);

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
                .map((id) => this.getSpeaker(id));
            }

            if (item["Media"]) {
                item["MediaContent"] = this.getMedia(item["Media"]);
            }
        });
    }
}