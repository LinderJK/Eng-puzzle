import { IComponent, RoundData } from '../types/types';
import Round from './components/round';

type PageComponent = IComponent | undefined;
type PageMap = Map<string, IComponent | undefined> | undefined;

class Game {
    static isPlaying: boolean = true;

    static pageContentMap: PageMap;

    static round: Round;

    static data: RoundData;

    static roundNumber: number = 0;

    static start(page: PageComponent): void {
        Game.getPageMap(page);
        console.log(Game.pageContentMap);
        Game.configPageContent();
    }

    static getPageMap(page: PageComponent) {
        if (page) {
            Game.pageContentMap = page.getAllChildrenMap();
        } else {
            console.error('Page content map is undefined.');
        }
    }

    static configPageContent() {
        Game.getElem('game-title')!.setTextContent('Game Title');
        Game.getElem('btn-data')!.addListener('click', () => {
            Game.getWords().then(() => {
                Game.round = new Round(
                    Game.data.rounds[Game.roundNumber],
                    Game.getElem('game-deck')!
                );
            });
        });
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
                'https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data//main/data/wordCollectionLevel1.json'
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
