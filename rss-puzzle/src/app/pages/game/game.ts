import './game.scss';
import { button, div, h1, nav } from '../../components/BaseComponents';

const GamePage = () => {
    const content = div(
        'container-fluid game-container',

        div(
            'game-content',
            h1('game-title start-content__title', 'Game'),
            nav(
                'game-nav navbar navbar-expand-lg bg-body-tertiary',

                div(
                    'btn-group',

                    button(
                        'btn-data btn btn-outline-success',
                        'GetData',
                        () => {}
                    ),
                    button('btn-play btn btn-outline-success', 'Play', () => {})
                )
            ),
            div('game-deck')
        )
    );
    const element = content.getElement();
    return { element, content };
};

export default GamePage;
