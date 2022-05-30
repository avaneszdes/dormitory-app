export const getFullDate = (date: Date) => {
    const language = lng()
    const lacale = language === 'ru' ? 'ru-RU' : language === 'en' ? 'en-US' : 'zh-ZH'

    return new Date(Date.parse(date.toString())).toLocaleDateString(lacale, {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

export const lng = () => localStorage.getItem("i18nextLng")

export const regexes = {
    phoneRegExp: '^[0-9+]{10,15}$',
    password: '^[0-9+]{5,10}$',
    login: '^[0-9+]{10,15}$',
}

export function getErrorInformation(error: any){

    if (error?.response?.data?.status === undefined ){
        return null
    }

    return error?.response?.data?.status + ' ' + error?.response?.data?.status?.error + '\t' + error?.response?.data?.status?.timestamp
}


export const getRole = (role: string): string => {
    const lang = lng()
    if(role === 'Student' &&  lang === 'ru'){
        return 'СТУДЕНТ'
    }else if(role === 'Student' &&  lang === 'en'){
        return 'STUDENT'
    }else if(role === 'Administrator' &&  lang === 'ru'){
        return 'АДМИНИСТРАТОР'
    }else if(role === 'Administrator' &&  lang === 'en'){
        return 'ADMINISTRATOR'
    }else if(role === 'Accountant' &&  lang === 'ru'){
        return 'БУХГАЛТЕР'
    }else if(role === 'Accountant' &&  lang === 'en'){
        return 'ACCOUNTANT'
    } else if(role === 'Dean' &&  lang === 'en'){
        return 'DEAN'
    } else if(role === 'Dean' &&  lang === 'ru'){
        return 'ДЕКАН'
    }

    return ''
}
