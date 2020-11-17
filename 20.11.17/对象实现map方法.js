Object.prototype.map = function(fn) {
    const res = {}
    for(e in this) {
        if(this.hasOwnProperty(e)) {
            res[e] = fn(this[e])
        }
    }
    return res
}
Object.prototype._map = function(fn) {
    const deepclone = JSON.parse(JSON.stringify(this));
    return Object.keys(deepclone).reduce((result, key, index) => {
        result[key] = fn(deepclone[key], key, index);
        return result;
    }, {})
}
