import { IComponent, IRoundData, PageMap } from '../types/types';
import Round from './components/round';
import { div, h1 } from '../components/BaseComponents';

type PageComponent = IComponent | undefined;

class Game {
    static isPlaying: boolean = true;

    static pageContentMap: PageMap;

    static round: Round;

    static data: IRoundData;

    static roundNumber: number = 0;

    static level: number = 1;

    static start(page: PageComponent): void {
        document.addEventListener('levelComplete', () => {
            Game.nextRound();
        });

        Game.getPageMap(page);

        console.log(Game.pageContentMap);

        Game.configPageContent();
        Game.getWords().then(() => {
            Game.round = new Round(
                Game.data.rounds[Game.roundNumber],
                Game.getElem('game-deck')!
            );
        });
    }

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

    static nextRound() {
        console.log(Game.data.roundsCount);
        if (
            Game.level === 6 &&
            Game.roundNumber === Game.data.roundsCount - 1
        ) {
            console.log('GAME FINISH');
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

    static getPageMap(page: PageComponent) {
        if (page) {
            Game.pageContentMap = page.getAllChildrenMap();
        } else {
            console.error('Page content map is undefined.');
        }
    }

    static configPageContent() {
        Game.getElem('game-title')!.setTextContent('RSS-PUZZLE GAME');
        // Game.getElem('btn-data')!.addListener('click', () => {
        //     console.log('work data clicked');
        // });
        // Game.getElem('btn-next-round')!.addListener('click', () => {
        //     Game.nextWord();
        // });
    }

    static nextWord() {
        this.roundNumber += 1;
        Game.round = new Round(
            Game.data.rounds[Game.roundNumber],
            Game.getElem('game-deck')!
        );
    }

    static getElem(name: string): PageComponent {
        const component = Game.pageContentMap?.get(name);
        if (!component) {
            console.error(`Component with name '${name}' not found.`);
        }
        return component;
    }

    static getPlayingStatus() {
        return Game.isPlaying;
    }

    static async getWords() {
        try {
            // console.log('words loaded');
            const response = await fetch(
                `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data//main/data/wordCollectionLevel${Game.level}.json`
            );
            const data = await response.json();
            Game.data = data;
            console.log('all game data', data);
        } catch (err) {
            console.error(err);
        }
    }
}

export default Game;
