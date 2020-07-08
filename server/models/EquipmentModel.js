module.exports = class EquipmentModel {
    constructor({
        _id     = null,
        name    = null,
        buyDate = null,
        cost    = 0,
    }) {
        this._id       = _id;
        this.name      = name;
        this.buyDate   = buyDate;
        this.cost      = cost;
        this.createdAt = new Date();
    }
}