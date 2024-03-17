import { button, div, h1, p } from '../../components/BaseComponents';
import './start.scss';

const StartPage = () => {
    const handleLogoutClick = () => {
        document.dispatchEvent(new Event('logoutClicked'));
    };
    const handleStartClick = () => {
        document.dispatchEvent(new Event('startClicked'));
    };
    const content = div(
        'container-fluid start-container',
        div(
            'start-content',
            h1('start-content__title', 'You are welcome!'),
            p('start-content__username', ''),
            p(
                'start-content__description',
                'RSS Puzzle is an interactive mini-game aimed at improving English language skills. Players create sentences from scrambled words, inspired by the Lingualeo Phrase Constructor tutorial.'
            ),
            div(
                'start-content__button',

                button(
                    'btn btn-primary btn-start',
                    'Start Game',
                    handleStartClick
                ),
                button('btn btn-primary btn-start', 'Logout', handleLogoutClick)
            )
        )
    );

    return { element: content.getElement(), map: content.getAllChildrenMap() };
};
export default StartPage;
