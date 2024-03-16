import {
    IComponent,
    ILevelData,
    IWord,
    LevelInfo,
    PageMap,
} from '../../types/types';
import { button, div, h1, p } from '../../components/BaseComponents';
import './round.scss';

// import button from '../../components/button/button';

class Round {
    levelData: ILevelData; // The data for the current level.

    gameField: IComponent; // The container for the game.

    cardContainer: IComponent; // The container for placing cards.

    levelContainer: IComponent; // The container for placing collected cards.

    pageContentMap: PageMap; // Map containing page elements.

    levelWords: IWord[]; // All words for the current level.

    levelInfo: LevelInfo; // Information about the level.

    currentWord: IWord; // The current word for the level.

    /**
     * Array of word cards and click handlers.
     */
    wordCards: { card: IComponent; clickHandler?: () => void }[] = [];

    currentLevel: number = 0; // The current level number.

    resultCardText: string[] = []; // User-collected text.

    static round: Round; // Singleton instance of Round.

    constructor(level: ILevelData, gameField: IComponent) {
        // Initialize containers and data.
        this.cardContainer = div('level-cards');
        this.levelContainer = div('level-field');
        this.levelData = level;
        this.gameField = gameField;
        this.levelWords = level.words;
        this.levelInfo = level.levelData;
        this.currentWord = this.getLevelWords();

        // Perform initial setup.
        this.firstStart();
        // Append containers to the game field.
        this.gameField.append(this.levelContainer);
        this.gameField.append(this.cardContainer);
        // Create the 'Next' button.
        this.createNextButton();
        // Set the singleton instance.
        Round.round = this;
        this.pageContentMap = this.gameField.getAllChildrenMap();
        // console.log(' levelData', this.levelData);
        // console.log('levelWords ', this.levelWords);
        // console.log(' levelInfo', this.levelInfo);
        // console.log(' currentWord', this.currentWord);
        // console.log('wordCards', this.wordCards);
        // console.log(' MAP', this.pageContentMap);
    }

    /**
     * Retrieves the current word for the level.
     * @returns {IWord} - The current word object.
     * */
    getLevelWords() {
        return this.levelWords[this.currentLevel];
    }

    /**
     * Retrieves the singleton instance of Round.
     * @returns {Round} The current Round instance.
     */
    static getRound() {
        return Round.round;
    }

    /**
     * Retrieves information about the current round.
     * @returns {{ round: number, button: IComponent | undefined }} Information about the current round including the round number and the 'Next' button component, if available.
     */
    static getRoundInfo() {
        return {
            round: Round.getRound().currentLevel,
            button: Round.getRound().pageContentMap!.get('btn-next-game'),
        };
    }

    /**
     * Performs the initial setup for the round.
     * Draws round information, level information, and creates cards based on the current word.
     */
    firstStart() {
        this.drawRoundInfo();
        this.drawLevelInfo();
        this.createCards();
    }

    /**
     * Takes text from an object and splits it into an array of words
     * Randomly shuffles the resulting array
     * @returns {Array} - Array of words
     * @param currentWord {IWord} -The object from which to extract text
     * */
    static splitWord(currentWord: IWord) {
        const words = currentWord.textExample.split(' ');
        return words
            .map((word) => ({ word, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ word }) => word);
    }

    /**
     * Checks if the collected text matches the current word's text example.
     * If the collected text matches, enables the 'Next' button; otherwise, disables it.
     */
    checkCard() {
        const result = this.resultCardText.join(' ');
        console.log('TEST!111', this.currentWord.textExample);
        console.log('TEST222', result);
        if (this.currentWord.textExample === result) {
            this.pageContentMap!.get('btn-next-game')?.removeAttribute(
                'disabled'
            );
            console.log('DONE');
        } else {
            console.log('NONE');
        }
    }

    /**
     * Creates a 'Next' button for the game control panel.
     * The button is initially disabled.
     * When clicked, it triggers the level update process.
     */
    createNextButton() {
        const buttonNext = button(
            'btn-next-game btn btn-outline-success',
            'Continue',
            () => {}
        );
        const divControl = div('game-control-first', buttonNext);
        buttonNext.setAttributes({ disabled: true });
        buttonNext.addListener('click', () => this.levelUpdate());
        this.gameField.append(divControl);
    }

    levelUpdate() {
        this.cardContainer.deleteChildren();
        this.currentLevel += 1;
        if (this.currentLevel >= 9) {
            const event = new CustomEvent('levelComplete');
            document.dispatchEvent(event);
        } else {
            this.currentWord = this.getLevelWords();

            this.pageUpdate();
            this.createCards();
        }
    }

    /**
     * Updates the level by incrementing the current level count and initiating necessary actions.
     * If the current level is 9 or greater, dispatches a custom event 'levelComplete'.
     * Otherwise, updates the current word, updates the page, and recreates cards.
     */
    pageUpdate() {
        if (this.pageContentMap) {
            this.pageContentMap
                .get('btn-next-game')!
                .setAttributes({ disabled: true });
            this.pageContentMap
                .get('level-info__title')!
                .setTextContent(`${this.levelInfo.name}`);
            this.pageContentMap
                .get('level-info__transition')!
                .setTextContent(`${this.currentWord.textExampleTranslate}`);
        }
    }

    /**
     * Creates cards based on currentWord
     * The listener hangs events on cards
     * @see{wordCards} add cards Object to the wordCards array
     * Adds cards to cardContainer
     * @returns {void}
     * */
    createCards() {
        this.wordCards.length = 0;
        this.resultCardText.length = 0;
        const list: IComponent = div('card-list');
        const wordsArray: string[] = Round.splitWord(this.currentWord);
        console.log(this.currentWord, 'CURRENT WORD', wordsArray);
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

    /**
     * Card transfer Handler
     * @param {card: IComponent} - The card to transfer
     * @param {list:IComponent} - List where cards are transferred
     * The list is added to the levelContainer playfield
     * @see{moveBack} Rewrites the handler moveBack
     * @returns {void}
     * */
    moveCard(card: IComponent, list: IComponent) {
        this.cardContainer.deleteChild(card);
        list.append(card);
        this.addWord(card);
        this.levelContainer.append(list);
        // TODO! move to method
        const item = this.wordCards.find((elem) => elem.card === card);
        if (item && item.clickHandler) {
            card.removeListener('click', item.clickHandler);
            const clickHandler = () => this.moveBack(card, list);
            card.addListener('click', clickHandler);
        }
        this.checkCard();
    }

    /**
     * Card back transfer Handler
     * @param {card: IComponent} - The card to transfer
     * @param {list:IComponent} - List where cards are transferred
     * The list is added to the levelContainer playfield
     * @see{moveCard} Rewrites the handler moveCard
     * @returns {void}
     * */
    moveBack(card: IComponent, list: IComponent) {
        this.levelContainer.deleteChild(card);
        this.removeWord(card);
        this.cardContainer.append(card);
        // TODO! move to method
        const item = this.wordCards.find((elem) => elem.card === card);
        if (item && item.clickHandler) {
            card.removeListener('click', item.clickHandler);
            const clickHandler = () => this.moveCard(card, list);
            card.addListener('click', clickHandler);
        }
    }

    /**
     * Remove a word to the array containing the current sentence assembly
     * @used-by moveBack
     * @param card - Current pressed card
     */
    removeWord(card: IComponent) {
        if (this.resultCardText.includes(card.getTextContent())) {
            const index = this.resultCardText.indexOf(card.getTextContent());
            if (index !== -1) {
                this.resultCardText.splice(index, 1);
            }
        }
    }

    /**
     * Adds a word to the array containing the current sentence assembly
     * @used-by moveCard
     * @param card - Current pressed card
     */
    addWord(card: IComponent) {
        this.resultCardText.push(card.getTextContent());
    }

    // TODO can delete this methods
    drawRoundInfo() {
        const page = div(
            'round-info',
            p(
                'round-info__level',

                `${this.currentWord.textExampleTranslate}`
            )
        );
        this.gameField.deleteChild(page);
        this.gameField.append(page);
    }

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
        console.log(this.gameField.getChildren());
    }

    // viewCard() {
    //     const card = div('card', p('card-text', '211312'));
    //     return card;
    // }

    // eslint-disable-next-line class-methods-use-this
    // createWordsArr(words: Word[]): string[][] {
    //     return words.map((word) => {
    //         return word.textExample.split(' ');
    //     });
    // }

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
