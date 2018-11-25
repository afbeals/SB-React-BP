const   normalize = require('./../util/normalize'),
        path = require('path');
        fs = require('fs'),
        userJson = path.join(__dirname+'/../../src/util/api/data/users.json');
        
/**
 * Service Module
 * @prop {} 
 */

module.exports = class ServiceModule {
    constructor(item){
        this._item = item;
    }
    //Getters
    get getItem() {
        let db = JSON.parse(fs.readFileSync(userJson,'utf8'));
        return this._userLedgerList;
    }

    //Setters
    set item(item) {
        this._item = item;
    }

    //method
};