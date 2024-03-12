import './button.scss';
import Element from '../Component';

export interface IButtonConstructor {
    className: string;
    textContent: string;
    clickHandler?: ((evt: Event) => void) | undefined;
}

class Button extends Element {
    private readonly clickHandler: (evt: Event) => void;

    constructor({ className, textContent, clickHandler }: IButtonConstructor) {
        super({
            tagName: 'button',
            className: `button ${className}`,
            textContent,
        });
        this.clickHandler = clickHandler ?? (() => {});
        this.addListener('click', this.clickHandler);
    }

    delete() {
        if (this.clickHandler) {
            this.removeListener('click', this.clickHandler);
        }
        super.delete();
    }

    getHandler() {
        return this.clickHandler;
    }
}

export default Button;
