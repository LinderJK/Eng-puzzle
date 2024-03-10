import './button.scss';

interface ButtonProps {
    className: string;
    text: string;
    callback: (evt: MouseEvent) => void;
}

const createButton = ({ text, className = '', callback }: ButtonProps): HTMLButtonElement => {
    const button = document.createElement('button');
    button.textContent = `${text}`;
    button.addEventListener('click', callback);
    button.className = `button button-${className}`;
    return button;
};
export default createButton;
