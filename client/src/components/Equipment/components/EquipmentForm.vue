<template>
    <form>
        <div class="form-group">
            <label for="exampleInputEmail1">Навание оборудования</label>
            <input
                class="form-control"
                aria-describedby="emailHelp"
                placeholder="Название оборудования"
                v-model="equipment.name"
            />
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
            />
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Дата покупки</label>
            <Datepicker />
        </div>
        
        <div class="form-check">
            <input
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
            />
            <label class="form-check-label" for="exampleCheck1"
                >Check me out</label
            >
        </div>
        <Button class="btn-primary" text="Сохранить" />
    </form>
</template>

<script>
import { Button, Datepicker } from 'ui';
import { EquipmentModel } from 'models';

export default {
    name: 'EquipmentForm',
    components: {
        Button,
        Datepicker
    },
    data: function () {
        return {
            equipment: new EquipmentModel(),
        };
    },
};
</script>
