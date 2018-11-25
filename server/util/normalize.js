module.exports = {
    /**
     * add comma after every three digits
     * @param {Number} num number to be converted
     * @return string
     */
    addComma : (num) => {
        const p = num.toString().split(".");
        p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return p.join(".");
    }
}