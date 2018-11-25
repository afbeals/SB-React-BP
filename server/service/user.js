/**
 * Service for creating user
 * @prop {string} userId user's id
 * @prop {string} desc description for ledger item
 * @prop {Number} type number to represent if debt or credit (1 || 0)
 * @prop {string} amt amout for ledger item
 * @prop {string} id ledger item id
 */

module.exports = class User {
    constructor(userId,uname,fname,lname,email){
        this._userId = userId;
        this._uname = uname;
        this._fname = fname;
        this._lname = lname;
        this._email = email;
    }
    //Getters
    get getUserId() {
        return this._userId ? this._userId : null;
    }

    get getUsername() {
        return `${this._uname}`;
    }

    get getFullName() {
        return `${this._fname} ${this._lname}`;
    }

    get getFirstName() {
        return `${this._fname}`;
    }

    get getLastName() {
        return `${this._lname}`;
    }

    get getEmail() {
        return `${this._email}`;
    }

    //Setter
    set setAllUserInfo({userId,uname,fname,lname,email}){
        this._userId = userId;
        this._uname = uname;
        this._fname = fname;
        this._lname = lname;
        this._email = email;
    }
};