import './game.scss';
import elementCreator from '../../utils/elementCreator';

const GamePage = () => {
    const title = elementCreator({
        tag: 'h1',
        className: '1',
        textContent: 'GAME',
    });
    const content = elementCreator({
        tag: 'div',
        className: '2',
        children: [title],
    });
    const container = elementCreator({
        tag: 'div',
        className: '3',
        children: [content],
    });

    return container;
};

export default GamePage;
