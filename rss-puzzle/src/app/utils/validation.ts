const setTextContent = (elem: Element, text: string) => {
    const el = elem;
    el.textContent = text;
};

function validation(element: {
    input: HTMLInputElement;
    text: Element;
}): boolean {
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
    setTextContent(element.text, message);
    return isValid;
}

const findForms = () => {
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
};

type FormsData = Array<{
    input: HTMLInputElement;
    text: Element;
} | null>;

const isValid = (forms: FormsData) => {
    return forms.every((elem) => {
        return elem ? validation(elem) : false;
    });
};

const handleButtonLogin = () => {
    const forms = findForms();
    const allValid = isValid(forms);
    if (allValid) {
    } else {
    }
};
export default handleButtonLogin;
