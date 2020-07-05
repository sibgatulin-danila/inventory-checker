export default class EquipmentModel {
    id        = '';
    name      = '';
    buyDate   = '';
    cost      = '';
    createdAt = '';

    constructor(obj) {
        this.id        = obj._id;
        this.name      = obj.name;
        this.createdAt = obj.name;
    }

    HEADERS = [
        'Название',
        'Дата покупки',
        'Стоимость',
    ]
}