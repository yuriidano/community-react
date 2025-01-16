export type ValidatorsType = (value: string) => undefined | string;

export const required:ValidatorsType = (value) => {
    if(value) return undefined;

    return 'field is required'
};


export const maxLength = (max: number):ValidatorsType => (value) => {
    if(value && value.length > max) return `max length value ${max} simbols`;

    return undefined;
};