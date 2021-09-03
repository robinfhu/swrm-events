export default class Sessions {
    constructor(data) {
        this.data = this.cleanUp(data);
    }

    getData() {
        return this.data; 
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
}