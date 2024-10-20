
export const required = value => {
    if(value) return undefined;

    return 'field is required'
};


export const maxLength = max => value => {
    if(value && value.length > max) return `max length value ${max} simbols`;

    return undefined;
}