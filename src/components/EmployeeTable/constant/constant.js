export const ATTR_FIELDS = {
    id: 0,
    name: 'attrName',
    type: 'attrType',
    value: 'attrValue'
}

export const EMP_ATTR_TYPES = {
    string: 'Строка',
    number: 'Число',
    date: 'Дата'
}

export const POSITION_TYPES = {
    cleaner: 'Уборщик',
    director: 'Директор',
    counter: 'Бухгалтер',
    hr: 'HR',
    developer: 'Разработчик',
    manager: 'Менеджер'
}

export const GENDERS = {
    male: 'Мужчина',
    female: 'Женщина'
}

export const REQUIRED_FIELDS = [
    'surname',
    'name',
    'birthday',
    'gender',
    'inDate'
]

export const DEFAULT_EMP = {
    id: 0,
    surname: 'фамилия',
    name: 'Имя',
    fatherName: 'Отчество',
    position: 'Должность',
    birthday: 'Дата рождения',
    gender: 'Пол',
    inDate: 'Дата приема',
    outDate: '',
    hasAccess: false,
    coworkers: [],
    attributes: []
}

export const MODALS_TITLES = {
    create: {
        actionName: 'create',
        title: 'Добавить работника'
    },
    edit: {
        actionName: 'edit',
        title: 'Изменить данные работника'
    },
    attr: {
        actionName: 'attr',
        title: 'Добавить атрибут'
    },
    coworkers: {
        actionName: 'coworkers',
        title: 'Коллеги работника'
    }
}

export const DATE_FORMAT = 'DD.MM.YYYY'
