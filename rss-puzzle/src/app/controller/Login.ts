import { UserData } from '../types/types';

type Forms = Array<{
    input: HTMLInputElement;
    text: Element;
} | null>;

class Login {
    static currentUser: UserData | null = null; // The currently logged-in user data.

    /**
     * Sets the current user in localStorage.
     * @param {UserData} user The user data to set.
     * @static
     */
    static setUser(user: UserData) {
        if (Login.currentUser) {
            return;
        }
        Login.currentUser = user;
        localStorage.setItem('user', JSON.stringify(Login.currentUser));
    }

    /**
     * Retrieves the current user data from LocalStorage.
     * @returns {UserData | null} The current user data, or null if no user is logged in.
     * @static
     */
    static getUser() {
        const userData = localStorage.getItem('user');
        if (userData) {
            return JSON.parse(userData);
        }
        return null;
    }

    /**
     * Validates an input element.
     * @param {{ input: HTMLInputElement; text: Element; }} element The input element to validate.
     * @returns {boolean} True if the element is valid, false otherwise.
     * @static
     */
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

    /**
     * Sets the content of an HTML element.
     * @param {Element} elem The HTML element.
     * @param {string} text The text content to set.
     * @static
     */
    static setMessageContent(elem: Element, text: string) {
        const el = elem;
        el.textContent = text;
    }

    /**
     * Finds form elements in the document.
     * @returns { input: HTMLInputElement, text: Element } An array of form elements.
     * @static
     */
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

    /**
     * Checks if all form elements are valid.
     * @param { input: HTMLInputElement, text: Element } forms The array of form elements to validate.
     * @returns {boolean} True if all form elements are valid, false otherwise.
     * @static
     */
    static isValid(forms: Forms) {
        return forms.every((elem) => {
            return elem ? Login.elementValidation(elem) : false;
        });
    }

    /**
     * Extracts form data from form elements.
     * @param { input: HTMLInputElement, text: Element } forms The array of form elements.
     * @returns {UserData} The extracted user data.
     * @static
     */
    static extractFormData(forms: Forms): UserData {
        return forms.map((elem) => {
            return { [elem!.input.id]: elem!.input.value };
        });
    }

    /**
     * Validates all forms on the page.
     * @returns {boolean} True if all forms are valid, false otherwise.
     * @static
     */
    static validate() {
        const forms: Forms = Login.findForms();
        const valid: boolean = Login.isValid(forms);
        return valid;
    }

    /**
     * Gets form data from all forms on the page.
     * @returns {UserData} The extracted user data.
     * @static
     */
    static getFormsData() {
        const forms: Forms = Login.findForms();
        return Login.extractFormData(forms);
    }

    /**
     * Logs the user in.
     * @returns {boolean} True if login was successful, false otherwise.
     * @static
     */
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

    /**
     * Logs the user out.
     * @returns {boolean} True if logout was successful, false otherwise.
     * @static
     */
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
