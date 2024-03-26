import Element from '../Component';

interface IInputConstructor {
    className: string;
    id?: string;
    type?: string;
    placeholder?: string;
}

class Input extends Element {
    constructor({
        className,
        id = '',
        type = '',
        placeholder = '',
    }: IInputConstructor) {
        super({
            tagName: 'input',
            className: `input ${className}`,
            attributes: { id, type, placeholder },
        });
    }
}

export default Input;
