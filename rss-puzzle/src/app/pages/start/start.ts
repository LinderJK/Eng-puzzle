import { button, div, h1 } from '../../components/BaseComponents';
import './start.scss';

const StartPage = () => {
    const handleLogoutClick = () => {
        document.dispatchEvent(new Event('logoutClicked'));
    };
    const content = div(
        'container-fluid start-container',
        div(
            'start-content',
            h1('start-content__title', 'Start page'),

            button('btn btn-primary btn-start', 'Start', () =>
                console.log('start')
            ),
            button('btn btn-primary btn-start', 'Logout', handleLogoutClick)
        )
    );
    return content.getElement();
};
export default StartPage;
