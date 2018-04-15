const base_url = 'http://localhost:3000/';
const stringCustom = function(string){
    var strings = string.toUpperCase()
    return strings.charAt(0);
}

module.exports = {
    base_url : base_url,
    stringCustom : stringCustom(string),
}