export default class EquipmentModel {
    _id       = null;
    name      = null;
    buyDate   = null;
    cost      = null;
    createdAt = null;

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