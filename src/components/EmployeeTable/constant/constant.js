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

export const DEFAULT_EMP = {
    id: 0,
    surname: 'surname',
    name: 'name',
    fatherName: 'fatherName',
    position: 'position',
    birthday: 'birthday',
    gender: 'gender',
    inDate: 'inDate',
    outDate: 'outDate',
    hasAccess: 'hasAccess',
    coworkers: 'coworkers',
    attributes: 'attributes'
}

export const RUS_FIELDS = {
    surname: 'Фамилия',
    name: 'Имя',
    fatherName: 'Отчество',
    position: 'Должность',
    birthday: 'День рождения',
    gender: 'Пол',
    inDate: 'Дата приема',
    outDate: 'дата увольнения',
    hasAccess: 'Права доступа',
    coworkers: 'Коллеги',
    attributes: 'Атрибуты'
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
