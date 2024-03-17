import LoginPage from '../pages/login/login';
import StartPage from '../pages/start/start';
import GamePage from '../pages/game/game';
import Game from '../game/Game';
import Login from '../controller/Login';

export default class AppView {
    root: HTMLElement = document.querySelector('#root')!;

    startPageObj = StartPage();

    loginPageObj = LoginPage();

    gamePageObj = GamePage();

    logoutHandler() {
        const logoutEventListener = () => {
            const logout = Login.logout();
            if (logout) {
                this.buildPage('login');
                document.removeEventListener(
                    'logoutClicked',
                    logoutEventListener
                );
            }
        };
        document.addEventListener('logoutClicked', logoutEventListener);
    }

    startHandler() {
        const startEventListener = () => {
            this.buildPage('game');
            document.removeEventListener('startClicked', startEventListener);
        };
        document.addEventListener('startClicked', startEventListener);
    }

    loginHandler() {
        const logoutEventListener = () => {
            const login = Login.login();
            if (login) {
                this.buildPage('start');
                document.removeEventListener(
                    'loginClicked',
                    logoutEventListener
                );
            }
        };
        document.addEventListener('loginClicked', logoutEventListener);
    }

    clearPage(): void {
        if (!this.root) {
            console.error('dont find root');
            return;
        }
        while (this.root.firstChild) {
            this.root.removeChild(this.root.firstChild);
        }
    }

    startGameView() {
        const gamePageElement = this.gamePageObj.element;
        const gamePageContent = this.gamePageObj.content;
        this.root.append(gamePageElement);
        Game.start(gamePageContent);
    }

    public buildPage(name: string = 'login'): void {
        this.clearPage();
        this.updatePages();
        switch (name) {
            case 'login':
                this.root.append(this.loginPageObj.element);
                this.loginHandler();
                break;
            case 'game':
                this.startGameView();
                this.logoutHandler();
                break;
            case 'start':
                this.root.append(this.startPageObj.element);
                this.logoutHandler();
                this.startHandler();
                break;
            default:
                break;
        }
    }

    updatePages() {
        const startPageMap = this.startPageObj.map;
        const gamePageMap = this.gamePageObj.map;
        const user = Login.getUser();
        if (user) {
            const firstName = user[0]['input-first-name'];
            const secondName = user[1]['input-second-name'];
            const userTextLogin = startPageMap.get('start-content__username');
            userTextLogin?.setTextContent(`${firstName} ${secondName}`);
            const userTextGame = gamePageMap.get('game-user-panel__user');
            userTextGame?.setTextContent(`${firstName} ${secondName}`);
        }
    }
}
