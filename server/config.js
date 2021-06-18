module.exports.requestsUrls = {
    requestsCreate: '/requests/create',
}

module.exports.employeesUrls = {
    employeesCreate: '/employees/create'
}

module.exports.equipmentsUrls = {
    equipmentsCreate: '/equipments/create',
    equipmentsUpdate: '/equipments/update'
}

module.exports.equipmentTypesUrls = {
    equipmentTypesIndex: '/equipments/types/',
    equipmentTypesCreate: '/equipments/types/create',
    equipmentTypesUpdate: '/equipments/types/update',
}

module.exports.requestsStatuses = {
    pending: {
        name: 'pending',
        lang: 'В обработке',
        class: 'warning'
    },
    resolve: {
        name: 'resolve',
        lang: 'Принята',
        class: 'success'
    },
    reject: {
        name: 'reject',
        lang: 'Отклонена',
        class: 'danger'
    },
}

module.exports.requestsTypes = {
    buy: {
        name: 'buy',
        lang: 'Приобретение',
    },
    repair: {
        name: 'repair',
        lang: 'Ремонт',
    },
    move: {
        name: 'move',
        lang: 'Передача',
    },
    remove: {
        name: 'remove',
        lang: 'Списание',
    },
}
