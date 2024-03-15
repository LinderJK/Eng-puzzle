import { button, div, h1 } from '../../components/BaseComponents';
import './start.scss';

const StartPage = () => {
    const content = div(
        'container-fluid start-container',
        div(
            'start-content',
            h1('start-content__title', 'Start page'),

            button('btn btn-primary btn-start', 'Start', () =>
                console.log('start')
            ),
            button('btn btn-primary btn-start', 'Logout', () =>
                console.log('start')
            )
        )
    );
    return content.getElement();
};
export default StartPage;
