import './login.scss';
import {
    button,
    div,
    divText,
    h1,
    input,
    span,
} from '../../components/BaseComponents';

const LoginPage = () => {
    const handleLoginClick = () => {
        document.dispatchEvent(new Event('loginClicked'));
    };
    const content = div(
        'container-fluid login-container',
        div(
            'login-content',
            h1('login-content__title', 'GO in'),

            div(
                'form mb-3 col',
                div(
                    'input-group',
                    span('input-group-text', 'First Name', 'login-first-name'),
                    input(' form-control', 'text', '', 'input-first-name')
                ),
                divText('form-text', '')
            ),

            div(
                'form mb-3 col',
                div(
                    'input-group',
                    span(
                        'input-group-text',
                        'Second Name',
                        'login-second-name'
                    ),
                    input('form-control', 'text', '', 'input-second-name')
                ),
                divText('form-text', '')
            ),
            button('btn btn-primary btn-login', 'Login', () =>
                handleLoginClick()
            )
        )
    );
    return content.getElement();
};
export default LoginPage;
