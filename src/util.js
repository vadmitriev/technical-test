export const compareFields = (a_field, b_field) => {
    if (a_field < b_field) {
        return -1
    }
    if (a_field > b_field) {
        return 1
    }
    return 0
}

export const sorterFields = (key) => {
    return (a, b) => compareFields(a[key], b[key])
}

export async function promise(func, ms) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(func()), ms)
    })
}

export function deleteUndefinedKeys(obj) {
    return Object.keys(obj).map(key => key === 'undefined' && delete obj[key])
}
