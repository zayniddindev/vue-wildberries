export function encodeQueryData(data) {
    const ret = [];
    for (let d in data) {
        if (data[d].length > 1) {
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
        }
    }
    return ret.join('&');
}