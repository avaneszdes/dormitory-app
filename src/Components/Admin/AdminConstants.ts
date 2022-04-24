
export interface Faculty {
    name: string,
    number: number
}

export interface Dormitory {
    name: string,
    address: string,
    number: number
}


export const faculties: Faculty[] =
    [
        {name: "АТФ", number: 101},
        {name: "ФГДЭ", number: 102},
        {name: "МСФ", number: 103},
        {name: "МТФ", number: 104},
        {name: "ФММП", number: 105},
        {name: "ЭФ", number: 106},
        {name: "ФИТР", number: 107},
        {name: "ФТУГ", number: 108},
        {name: "ИПФ", number: 109},
        {name: "ФЭС", number: 110},
        {name: "АФ", number: 111},
        {name: "СФ", number: 112},
        {name: "ПСФ", number: 113},
        {name: "ФТК", number: 114},
        {name: "ВТФ", number: 115},
        {name: "СТФ", number: 116},
        {name: "ФМС", number: 117}
    ]

export const dormitories: Dormitory[] =
    [
        {name: "МТФ", address: "Пр-т Независимости, 63" , number: 3},
        {name: "АТФ", address:  "Пр-т Независимости, 61", number: 4},
        {name: "ФИТР", address: "Ул. Дорошевича, 3 " , number: 5},
        {name: "ФММП, МСФ", address:  "Ул. Якуба Коласа, 26 ", number: 6},
        {name: "ПСФ", address: "Ул. Сурганова, 47, корп. 3" , number: 8},
        {name: "ЭФ", address:  "Ул. Сурганова, 37, корп. 5", number: 9},
        {name: "ВТФ", address: "Ул. Сурганова, 37, корп. 4" , number: 10},
        {name: "ЭФ", address:  "Ул. Сурганова, 37, корп. 3", number: 11},
        {name: "ФИТР", address:  "Ул. Сурганова, 37, корп. 2", number: 12},
        {name: "АТФ", address:  "Ул. Сурганова, 47, корп. 5", number: 13},
        {name: "ПСФ, ФГД, МСФ", address: "Ул. Сурганова, 47, корп. 4" , number: 14},
        {name: "СФ, АТФ, ФГДЭ, АФ, ФЭС, ФТУГ", address:  "Пр-т Независимости, 148, корп 1", number: 15},
        {name: "АФ, ИПФ, ФЭС", address:  "Пр-т Независимости, 148, корп 2", number: 16},
        {name: "ФТУГ, ФЭС, ФТК", address:  "Пр-т Независимости, 148, корп 3", number: 17},
        {name: "АТФ, ФММП, ЭФ, ФИТР, АФ, СТФ", address: "Пр-т Дзержинского, 83/16" , number: 18},
    ]
