import { Api } from 'util';
import { EquipmentModel } from 'models';

export default new (class Equipment {
    get = () => {
        return Api.get('/equipment').then(response => {
            if (response.statusText === 'OK') {
                return response.data.map(item => new EquipmentModel(item));
            }
        });
    };

    create = equipment => {
        return Api.post('/equipment', equipment);
    };

    delete = id => {
        return Api.delete('/equipment', { id });
    };
})();
