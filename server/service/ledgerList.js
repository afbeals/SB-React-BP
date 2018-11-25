const   normalize = require('./../util/normalize'),
        path = require('path');
        fs = require('fs'),
        LedgerItem = require('./ledgerItem'),
        ledgersJson = path.join(__dirname+'/../../src/util/api/data/ledger.json');
        
/**
 * Service for creating LedgerList
 * @prop {array} ledgerList array of LedgerItems
 */

module.exports = class LedgerList {
    constructor(ledgerList){
        this._userLedgerList = ledgerList || [];
        this._allLedgerList = [];
    }
    //Getters
    get getUserLedgerList() {
        return this._userLedgerList;
    }

    get getAllLedgerList() {
        return this._allLedgerList;
    }

    get getBalance() {
        let total = 0;
        [...this._userLedgerList].forEach((item)=>{
            let curAmt = Number(parseFloat(item.getAmount.replace(/[^0-9.]/g, "")).toFixed(2));
            if(item._type){ // if debit
                total -= curAmt;
            } else {
                total += curAmt;
            }
        });

        return `$${normalize.addComma(total)}`;
    }

    
    //Setter
    set setUserLedgerList(userId) {
        let ledgerList = JSON.parse(fs.readFileSync(ledgersJson,'utf8')).mock;
        this._userLedgerList = [];
        [...ledgerList].forEach((ledgerItem)=>{
            if(ledgerItem.userId === userId){this._userLedgerList.push(new LedgerItem(ledgerItem.userId,ledgerItem.description,ledgerItem.type,ledgerItem.amount,ledgerItem.id))} 
        });
    }

    set setAllLedgerList(shouldFormat){
        let ledgerList = JSON.parse(fs.readFileSync(ledgersJson,'utf8')).mock;
            this._allLedgerList = [];
        [...ledgerList].forEach((ledgerItem)=>{
            if(shouldFormat){
                this._allLedgerList.push(new LedgerItem(ledgerItem.userId,ledgerItem.description,ledgerItem.type,ledgerItem.amount,ledgerItem.id).formatForDB());
            } else {
                this._allLedgerList.push(new LedgerItem(ledgerItem.userId,ledgerItem.description,ledgerItem.type,ledgerItem.amount,ledgerItem.id));
            }
        });
    }

    //method
    handleGetNextLedgerId(){
        const   ledgerList = JSON.parse(fs.readFileSync(ledgersJson,'utf8')).mock,
                ledgerListLength = ledgerList.length,
                lastItemId = ledgerList[ledgerListLength-1].id;
        return Number(lastItemId)+1;    
    }
};