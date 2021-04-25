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


import {empAttrTypes, positionTypes, genders} from './constant'

export const initialEmployees = [
    {
        id: 0,
        surname: 'Афанасьев',
        name: 'Андрей',
        fatherName: 'Андреевич',
        position: positionTypes.director,
        birthday: '01.05.1980',
        gender: genders.male,
        inDate: '01.02.2010',
        outDate: undefined,
        hasAccess: true,
        collegsIds: [
            2,
            3
        ],
        attributes: [
            {name: 'Марка автомобиля', type: empAttrTypes.string, value: 'Lexus'},
            {name: 'Количество детей', type: empAttrTypes.number, value: 2},
            {name: 'Следующий отпуск', type: empAttrTypes.date, value: '01.06.2021'},
        ]
    },
    {
        id: 1,
        surname: 'Беглов',
        name: 'Борис',
        fatherName: 'Борисович',
        position: positionTypes.counter,
        birthday: '01.05.1990',
        gender: genders.male,
        inDate: '01.02.2008',
        outDate: '01.10.2018',
        hasAccess: true,
        collegsIds: [],
        attributes: [
            {name: 'Марка автомобиля', type: empAttrTypes.string, value: 'Ford'},
            {name: 'Количество детей', type: empAttrTypes.number, value: 1},
            {name: 'Следующий отпуск', type: empAttrTypes.date, value: '01.07.2021'},
        ]
    },
    {
        id: 2,
        surname: 'Васильева',
        name: 'Виктория',
        fatherName: 'Васильевна',
        position: positionTypes.hr,
        birthday: '01.05.1995',
        gender: genders.female,
        inDate: '01.02.2015',
        outDate: undefined,
        hasAccess: false,
        collegsIds: [4],
        attributes: [
            {name: 'Марка автомобиля', type: empAttrTypes.string, value: 'Toyota'},
            {name: 'Количество детей', type: empAttrTypes.number, value: 0},
            {name: 'Следующий отпуск', type: empAttrTypes.date, value: '01.07.2021'},
        ]
    },
    {
        id: 3,
        surname: 'Гринев',
        name: 'Геннадий',
        fatherName: 'Геннадьевич',
        position: positionTypes.developer,
        birthday: '01.05.1993',
        gender: genders.male,
        inDate: '01.08.2015',
        outDate: undefined,
        hasAccess: false,
        collegsIds: [3],
        attributes: [
            {name: 'Марка автомобиля', type: empAttrTypes.string, value: 'Ford'},
            {name: 'Количество детей', type: empAttrTypes.number, value: 0},
            {name: 'Следующий отпуск', type: empAttrTypes.date, value: '01.08.2021'},
        ]
    },
    {
        id: 4,
        surname: 'Данилко',
        name: 'Даниил',
        fatherName: 'Денисович',
        position: positionTypes.cleaner,
        birthday: '01.05.1983',
        gender: genders.male,
        inDate: '01.08.2012',
        outDate: '01.08.2015',
        hasAccess: false,
        collegsIds: [3],
        attributes: []
    }
]