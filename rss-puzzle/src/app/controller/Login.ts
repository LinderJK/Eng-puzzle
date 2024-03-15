import { UserData } from '../types/types';

type Forms = Array<{
    input: HTMLInputElement;
    text: Element;
} | null>;

class Login {
    static currentUser: UserData | null = null;

    static setUser(user: UserData) {
        if (Login.currentUser) {
            console.log('user have');
            return;
        }
        Login.currentUser = user;
        console.log(Login.getUser());
        localStorage.setItem('user', JSON.stringify(Login.currentUser));
    }

    static getUser() {
        const userData = localStorage.getItem('user');
        if (userData) {
            return JSON.parse(userData);
        }
        return null;
    }

    static elementValidation(element: {
        input: HTMLInputElement;
        text: Element;
    }) {
        let message = '';
        let isValid = false;
        switch (true) {
            case element.input.value.length === 0:
                message = 'The field must not be empty';
                break;
            case !/^[a-zA-Z-]+$/.test(element.input.value):
                message =
                    'Only letters of the English alphabet and the hyphen symbol';
                break;
            case element.input.id === 'input-first-name' &&
                element.input.value.length < 3:
                message = 'Minimum length - 3 characters';
                break;
            case element.input.id === 'input-second-name' &&
                element.input.value.length < 4:
                message = 'Minimum length - 4 characters';
                break;
            case !/^[A-Z]/.test(element.input.value):
                message = 'The first letter must be in uppercase';
                break;
            case element.input.value.length > 15:
                message = 'Maximum length - 15 characters';
                break;
            default:
                isValid = true;
                break;
        }
        Login.setMessageContent(element.text, message);
        return isValid;
    }

    static setMessageContent(elem: Element, text: string) {
        const el = elem;
        el.textContent = text;
    }

    static findForms() {
        const forms = document.querySelectorAll('.form');
        if (forms) {
            return Array.from(forms).map((elem: Element) => {
                const formInput = elem.querySelector('input');
                const formText = elem.querySelector('.form-text');
                if (!formInput || !formText) {
                    console.error('no have input element');
                    return null;
                }
                return { input: formInput, text: formText };
            });
        }
        return [];
    }

    static isValid(forms: Forms) {
        return forms.every((elem) => {
            return elem ? Login.elementValidation(elem) : false;
        });
    }

    static extractFormData(forms: Forms): UserData {
        return forms.map((elem) => {
            console.log(elem);
            return { [elem!.input.id]: elem!.input.value };
        });
    }

    static validate() {
        const forms: Forms = Login.findForms();
        const valid: boolean = Login.isValid(forms);
        return valid;
    }

    static getFormsData() {
        const forms: Forms = Login.findForms();
        return Login.extractFormData(forms);
    }

    static login() {
        const valid = Login.validate();
        if (valid) {
            const data = Login.getFormsData();
            Login.setUser(data);
            return true;
        }
        console.error('no valid');
        return false;
    }

    static logout() {
        const user = Login.getUser();
        if (user) {
            localStorage.removeItem('user');
            Login.currentUser = null;
            return true;
        }
        return false;
    }
}

export default Login;
