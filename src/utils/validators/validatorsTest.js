

export const required = value => {
    if(value) return undefined;

    return 'field is required';
};

export const maxLengthTest = max => value => {
    if(max < value.length) return `max length value ${max} max limbols`;


    return undefined;
};