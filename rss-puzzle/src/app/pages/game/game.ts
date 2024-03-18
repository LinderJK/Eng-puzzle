import './game.scss';
import { button, div, h1, nav, p } from '../../components/BaseComponents';

const GamePage = () => {
    const handleLogoutClick = () => {
        document.dispatchEvent(new Event('logoutClicked'));
    };
    const content = div(
        'container-fluid game-container p-0',
        div(
            'game-content',
            nav(
                'game-nav navbar navbar-expand-lg bg-body-tertiary',
                h1('game-title start-content__title', 'RSS-PUZZLE GAME'),
                div('game-level'),
                div(
                    'game-user-panel',
                    p('game-user-panel__user', '123'),

                    button(
                        'game-user-panel__btn btn btn-primary',
                        'Logout',
                        handleLogoutClick
                    )
                )
            ),
            div('game-deck')
        )
    );
    return {
        element: content.getElement(),
        map: content.getAllChildrenMap(),
        content,
    };
};

export default GamePage;
