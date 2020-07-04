import {
    Api,
} from 'util';

export default new class Equipment {
    get = () => {
        return Api.get('/equipment');
    }

    post = (equipment) => {
        return Api.post('/equipment', equipment);
    }

    delete = (id) => {
        return Api.post('/equipment/delete', {id});
    }
}