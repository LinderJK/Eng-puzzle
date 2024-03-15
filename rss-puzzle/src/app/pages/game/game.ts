import './game.scss';
import { div, h1 } from '../../components/BaseComponents';

const GamePage = () => {
    const content = div(
        'container-fluid start-container',
        div('start-content', h1('start-content__title', 'Game'))
    );
    return content.getElement();
};

export default GamePage;
