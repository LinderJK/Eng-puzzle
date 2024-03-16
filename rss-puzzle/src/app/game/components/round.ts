import { IComponent, LevelData, LevelInfo, Word } from '../../types/types';
import { div, h1, p } from '../../components/BaseComponents';
import './round.scss';

class Round {
    // one level data
    levelData: LevelData;

    // game container
    gameField: IComponent;

    // all words by level
    levelWords: Word[];

    // level information
    levelInfo: LevelInfo;

    // current word by level
    currentWord: Word;

    /**
     * Array of word cards and card handler
     */
    wordCards: { card: IComponent; clickHandler?: () => void }[] = [];

    // field for placing cards
    cardContainer: IComponent;

    // field for placing collected cards
    levelContainer: IComponent;

    constructor(level: LevelData, field: IComponent) {
        this.cardContainer = div('level-cards');
        this.levelContainer = div('level-field');
        this.levelData = level;
        console.log(this.levelData);
        this.gameField = field;
        this.levelWords = level.words;
        this.levelInfo = level.levelData;
        this.currentWord = { ...this.levelWords[0] };
        this.levelStart();
    }

    levelStart() {
        this.drawLevelInfo();
        this.gameField.append(this.levelContainer);
        this.gameField.append(this.cardContainer);
        this.createCards();
    }

    static splitWord(currentWord: Word) {
        const words = currentWord.textExample.split(' ');

        return words
            .map((word) => ({ word, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ word }) => word);
    }

    createCards() {
        const list = div('card-list');
        const wordsArray = Round.splitWord(this.currentWord);
        wordsArray.forEach((word) => {
            const card: IComponent = div('card', p('card__text', word));
            const clickHandler = () => this.moveCard(card, list);
            card.addListener('click', clickHandler);
            this.wordCards.push({ card, clickHandler });
        });

        this.cardContainer.appendChildren(
            this.wordCards.map(({ card }) => card)
        );
    }

    moveCard(card: IComponent, list: IComponent) {
        this.cardContainer.deleteChild(card);
        list.append(card);

        this.levelContainer.append(list);
        const item = this.wordCards.find((elem) => elem.card === card);
        if (item && item.clickHandler) {
            card.removeListener('click', item.clickHandler);
            const clickHandler = () => this.moveBack(card, list);
            card.addListener('click', clickHandler);
        }
    }

    moveBack(card: IComponent, list: IComponent) {
        this.levelContainer.deleteChild(card);
        this.cardContainer.append(card);
        const item = this.wordCards.find((elem) => elem.card === card);
        if (item && item.clickHandler) {
            card.removeListener('click', item.clickHandler);
            const clickHandler = () => this.moveCard(card, list);
            card.addListener('click', clickHandler);
        }
    }

    // viewCard() {
    //     const card = div('card', p('card-text', '211312'));
    //     return card;
    // }

    drawLevelInfo() {
        const page = div(
            'level-info',
            h1('level-info__title', `${this.levelInfo.name}`),
            p(
                'level-info__transition',

                `${this.currentWord.textExampleTranslate}`
            )
        );

        this.gameField.deleteChildren();
        this.gameField.append(page);
    }

    // eslint-disable-next-line class-methods-use-this
    createWordsArr(words: Word[]): string[][] {
        return words.map((word) => {
            return word.textExample.split(' ');
        });
    }

    // createLevel() {
    //     // this.level = new Level();
    // }

    // createRoundField() {
    //     const field = div('round');
    // }

    // wordSplit(text: string): string[] {
    //     return text.split(' ');
    // }
}

export default Round;
