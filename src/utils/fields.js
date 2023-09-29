

export const fieldTypes = {
    services: {
        name: 'text',
        price: 'number',
        duration: 'number',
        professionalsIds: 'multi-select'
    },
    professionals: {
        name: 'text',
        surname: 'text'
    },
    'available-hours': {
        service: 'select',
        professional: 'select',
        start: 'time'
    }
}