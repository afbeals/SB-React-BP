/**
 * Service for creating LedgerItem
 * @prop {string} userId user's id
 * @prop {string} desc description for ledger item
 * @prop {Number} type number to represent if debt or credit (1 || 0)
 * @prop {string} amt amout for ledger item
 * @prop {string} id ledger item id
 */

module.exports = class LedgerItem {
    constructor(userId,desc,type,amt,id){
        this._userId = userId;
        this._desc = desc;
        this._type = type === 1 ? 1 : 0;
        this._amt = this.convertToFloat(amt);
        this._date = Date.now();
        this._id = id;
    }
    //Getters
    get getUserId() {
        return this._userId;
    }

    get getDescription() {
        return `${this._desc}`;
    }

    get getType() {
        return this._type === 1 ? `debit` : `credit` ;
    }

    get getAmount() {
        return this._type === 1 ? `$-${this._amt}` : `$${this._amt}` ;
    }

    get getDate() {
        return this._date;
    }

    get getId() {
        return this._id;
    }

    //Setter
    set setDescription(newDesc){
        this._desc = newDesc;
    }

    set setType(type) { //should be either 1 = debit || 0 = credit (default = credit)
        this._type = type === 1 ? 1 : 0;
    }

    set setAmount(amt){
        this.amt = amt
    }

    //method
    convertToFloat(amt) {
        const newAmount = parseFloat(amt.replace(/[^0-9.]/g, "")).toFixed(2);
        if(isNaN(newAmount)) {
            console.error('non number supplied as amount');
            return;
        }
        return newAmount;
    }

    formatForDB(){
        return {
            userId: this._userId,
            date: Date.now(),
            description: this._desc,
            amount: this._amt,
            type: this._type === 0 ? 0 : 1,
            id: this._id
        }
    }
};