import './login.scss';
import createButton from '../../components/button/button';
import elementCreator from '../../utils/elementCreator';
import createInput from '../../components/input/input';

const LoginPage = (callback: (name: string) => void) => {
    const loginButton = createButton({
        className: 'login',
        text: 'ENTER',
        callback: (evt) => {
            evt.preventDefault();
            callback('main');
            // console.log('dsadsa123');
            // console.log('123213');
        },
    });
    const title = elementCreator({
        tag: 'h1',
        className: 'login-content__title',
        textContent: 'RSS PUZZLE GAME',
    });

    const inputFirstName = createInput({
        labelText: 'First Name',
        className: 'login-first-name',
        id: 'login-first-name',
        attributes: {
            type: 'text',
            required: true,
        },
    });
    const inputLastName = createInput({
        labelText: 'Last Name',
        className: 'login-last-name',
        id: 'login-last-name',
        attributes: {
            type: 'text',
            required: true,
        },
    });
    const content = elementCreator({
        tag: 'div',
        className: 'login-content',
        children: [title, inputFirstName, inputLastName, loginButton],
    });
    const container = elementCreator({
        tag: 'div',
        className: 'login-container',
        children: [content],
    });

    return container;
};

export default LoginPage;
