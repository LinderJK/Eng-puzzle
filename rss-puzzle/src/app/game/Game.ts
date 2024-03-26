import { IComponent, IRoundData, PageMap } from '../types/types';
import Round from './components/round';
import { div, h1 } from '../components/BaseComponents';

type PageComponent = IComponent | undefined;

class Game {
    static isPlaying: boolean = false; // Indicates whether the game is currently being played.

    static pageContentMap: PageMap; // The map of page content.

    static round: Round; // The current round object.

    static data: IRoundData; // The data for the current round.

    static roundNumber: number = 0; // The number of the current round.

    static level: number = 1; // The level of the game.

    /**
     * Starts the game.
     * @param {PageComponent} page The component representing the game page.
     * @static
     */
    static start(page: PageComponent): void {
        document.addEventListener('levelComplete', () => {
            Game.nextRound();
        });
        Game.getPageMap(page);
        Game.getWords().then(() => {
            Game.round = new Round(
                Game.data.rounds[Game.roundNumber],
                Game.getElem('game-deck')!
            );
        });
    }

    /**
     * Ends the game.
     * @static
     */
    static gameEnd() {
        const field = Game.getElem('game-deck');
        if (field) {
            field?.deleteChildren();
            const endGamePage = div(
                'end-game',
                h1('end-game', 'OMG! YOU WIN THIS GAME')
            );
            field.append(endGamePage);
        }
    }

    /**
     * Moves to the next round of the game.
     * @static
     */
    static nextRound() {
        if (
            Game.level === 6 &&
            Game.roundNumber === Game.data.roundsCount - 1
        ) {
            Game.gameEnd();
        } else if (Game.roundNumber === Game.data.roundsCount - 1) {
            Game.roundNumber = 0;
            Game.getWords().then(() => {
                Game.round = new Round(
                    Game.data.rounds[Game.roundNumber],
                    Game.getElem('game-deck')!
                );
            });
        } else {
            Game.roundNumber += 1;
            Game.round = new Round(
                Game.data.rounds[Game.roundNumber],
                Game.getElem('game-deck')!
            );
        }
    }

    /**
     * Retrieves the page map.
     * @param {PageComponent} page The page.
     * @static
     */
    static getPageMap(page: PageComponent) {
        if (page) {
            Game.pageContentMap = page.getAllChildrenMap();
        } else {
            console.error('Page content map is undefined.');
        }
    }

    /**
     * Retrieves a component from the page content map.
     * @param {string} name The name of the component to retrieve.
     * @returns {PageComponent} The retrieved component.
     * @static
     */
    static getElem(name: string): PageComponent {
        const component = Game.pageContentMap?.get(name);
        if (!component) {
            console.error(`Component with name '${name}' not found.`);
        }
        return component;
    }

    /**
     * Retrieves the playing status of the game.
     * @returns {boolean} True if the game is being played, false otherwise.
     * @static
     */
    static getPlayingStatus() {
        return Game.isPlaying;
    }

    /**
     * Retrieves the words for the current level of the game.
     * @returns {Promise<void>} A promise that resolves when the words are retrieved.
     * @static
     */
    static async getWords() {
        try {
            const response = await fetch(
                `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data//main/data/wordCollectionLevel${Game.level}.json`
            );
            Game.data = await response.json();
        } catch (err) {
            console.error(err);
        }
    }
}

export default Game;
