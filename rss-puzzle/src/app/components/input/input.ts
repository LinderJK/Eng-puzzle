import './input.scss';

interface InputProps {
    labelText: string;
    className: string;
    id: string;
    attributes?: {
        [key: string]: string | boolean;
    };
}

const createInput = ({ labelText, className = '', id = '', attributes }: InputProps): HTMLElement => {
    const label = document.createElement('label');
    label.className = 'input-label';
    label.setAttribute('for', id);
    const span = document.createElement('span');
    span.textContent = labelText;
    span.className = 'input-title';
    const input = document.createElement('input');
    input.className = `input input__${className}`;
    input.setAttribute('id', id);
    if (attributes) {
        Object.keys(attributes).forEach((key) => {
            const value = attributes[key];
            if (typeof value === 'boolean') {
                input.setAttribute(key, '');
            } else {
                input.setAttribute(key, value);
            }
        });
    }
    label.append(span, input);
    return label;
};
export default createInput;
