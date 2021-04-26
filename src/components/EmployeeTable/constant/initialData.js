/*  Наименование параметра  |   Тип                                                     |   Валидация
    ________________________|___________________________________________________________|___________________
    Фамилия	                |   Строка	                                                |   Required
    Имя	                    |   Строка	                                                |   Required
    Отчество	            |   Строка                                                  |
    Должность	            |   Выбор из справочника (формат данных придумать самому)	|   Required
    Дата рождения	        |   Дата, выбор из календаря	                            |   Required
    Пол	                    |   Выбор с помощью радио переключателя с двумя значениями	|   Required
    Дата приема на работу	|   Дата, выбор из календаря	                            |   Required
    Дата увольнения	        |   Дата, выбор из календаря	                            |   Не может быть меньше даты приема на работу
    Наличие прав	        |   Булевский атрибут, редактируется с помощью чек бокса	|   Required
    Коллеги                 |   (дополнительно, не обязательно)	Выбор из списка сотрудников (с возможностью мульти выбора)
    _________________________________________________________________________________________________________
    *Доп. атрибуты          |   в карточке сотрудника должна появиться отдельная область,
                            |   в которой можно добавлять дополнительные атрибуты, с указанием их типа
                            |   (строка, число, дата) и возможностью сохранения их значений.
                            |   У каждого сотрудника свой перечень дополнительных атрибутов.
*/


import {EMP_ATTR_TYPES, POSITION_TYPES, GENDERS} from './constant'

export const initialEmployees = [
    {
        id: 0,
        surname: 'Афанасьев',
        name: 'Андрей',
        fatherName: 'Андреевич',
        position: POSITION_TYPES.director,
        birthday: '01.05.1980',
        gender: GENDERS.male,
        inDate: '01.02.2010',
        outDate: undefined,
        hasAccess: true,
        coworkers: [
            2,
            3
        ],
        attributes: [
            {id: 0, name: 'Марка автомобиля', type: EMP_ATTR_TYPES.string, value: 'Lexus'},
            {id: 1, name: 'Количество детей', type: EMP_ATTR_TYPES.number, value: 2},
            {id: 2, name: 'Следующий отпуск', type: EMP_ATTR_TYPES.date, value: '01.06.2021'},
        ]
    },
    {
        id: 1,
        surname: 'Беглов',
        name: 'Борис',
        fatherName: 'Борисович',
        position: POSITION_TYPES.counter,
        birthday: '01.05.1990',
        gender: GENDERS.male,
        inDate: '01.02.2008',
        outDate: '01.10.2018',
        hasAccess: true,
        coworkers: [],
        attributes: [
            {id: 0, name: 'Марка автомобиля', type: EMP_ATTR_TYPES.string, value: 'Ford'},
            {id: 1, name: 'Количество детей', type: EMP_ATTR_TYPES.number, value: 1},
            {id: 2, name: 'Следующий отпуск', type: EMP_ATTR_TYPES.date, value: '01.07.2021'},
        ]
    },
    {
        id: 2,
        surname: 'Васильева',
        name: 'Виктория',
        fatherName: 'Васильевна',
        position: POSITION_TYPES.hr,
        birthday: '01.05.1995',
        gender: GENDERS.female,
        inDate: '01.02.2015',
        outDate: undefined,
        hasAccess: false,
        coworkers: [4],
        attributes: [
            {id: 0, name: 'Марка автомобиля', type: EMP_ATTR_TYPES.string, value: 'Toyota'},
            {id: 1, name: 'Количество детей', type: EMP_ATTR_TYPES.number, value: 0},
            {id: 2, name: 'Следующий отпуск', type: EMP_ATTR_TYPES.date, value: '01.07.2021'},
        ]
    },
    {
        id: 3,
        surname: 'Гринев',
        name: 'Геннадий',
        fatherName: 'Геннадьевич',
        position: POSITION_TYPES.developer,
        birthday: '01.05.1993',
        gender: GENDERS.male,
        inDate: '01.08.2015',
        outDate: undefined,
        hasAccess: false,
        collegs: [3],
        attributes: [
            {id: 0, name: 'Марка автомобиля', type: EMP_ATTR_TYPES.string, value: 'Ford'},
            {id: 1, name: 'Количество детей', type: EMP_ATTR_TYPES.number, value: 0},
            {id: 2, name: 'Следующий отпуск', type: EMP_ATTR_TYPES.date, value: '01.08.2021'},
        ]
    },
    {
        id: 4,
        surname: 'Данилко',
        name: 'Даниил',
        fatherName: 'Денисович',
        position: POSITION_TYPES.cleaner,
        birthday: '01.05.1983',
        gender: GENDERS.male,
        inDate: '01.08.2012',
        outDate: '01.08.2015',
        hasAccess: false,
        coworkers: [3],
        attributes: []
    }
]