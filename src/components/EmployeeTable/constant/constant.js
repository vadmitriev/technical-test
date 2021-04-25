export const empAttrTypes = {
    string: 'Строка',
    number: 'Число',
    date: 'Дата'
}

export const positionTypes = {
    cleaner: 'Уборщик',
    director: 'Директор',
    counter: 'Бухгалтер',
    hr: 'HR',
    developer: 'Разработчик',
    manager: 'Менеджер'
}

export const genders = {
    male: 'Мужчина',
    female: 'Женщина'
}

export const dateFormat = 'DD.MM.YYYY'

export const defaultEmp = {
    id: 0,
    surname: 'surname',
    name: 'name',
    fatherName: 'fatherName',
    position: positionTypes.cleaner,
    birthday: '01.05.1900',
    gender: genders.male,
    inDate: '01.05.1900',
    outDate: '',
    hasAccess: false,
    collegsIds: [],
    attributes: []
}
