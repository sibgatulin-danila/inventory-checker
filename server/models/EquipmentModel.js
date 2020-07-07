module.exports = class EquipmentModel {
    _id       = '';
    name      = '';
    buyDate   = '';
    cost      = '';
    createdAt = '';

    constructor(obj) {
        this._id       = obj._id;
        this.name      = obj.name;
        this.buyDate   = obj.buyDate;
        this.cost      = obj.cost;
        this.createdAt = new Date();
    }
}