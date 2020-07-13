export default class EquipmentModel {
    _id       = null;
    name      = '';
    buyDate   = '';
    createdAt = '';
    cost      = '';

    constructor (obj = {
        _id      : null,
        cost     : '',
        name     : '',
        buyDate  : '',
        createdAt: '',
    }) {
        this._id       = obj._id;
        this.name      = obj.name;
        this.buyDate   = obj.buyDate;
        this.createdAt = obj.createdAt;
        this.cost      = obj.cost;
    }

    static HEADERS = [
        'Название',
        'Стоимость',
        'Дата покупки',
    ]

    formData = () => {
        return {
            _id      : this._id,
            name     : this.name,
            buyDate  : this.buyDate,
            cost     : this.cost,
            createdAt: this.createdAt,
        }
    }
}