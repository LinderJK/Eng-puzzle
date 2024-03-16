import LoginPage from '../pages/login/login';
import StartPage from '../pages/start/start';
import GamePage from '../pages/game/game';
import Game from '../game/Game';
import Login from '../controller/Login';

export default class AppView {
    root: HTMLElement = document.querySelector('#root')!;

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
        const gamePageObj = GamePage();
        const gamePageElement = gamePageObj.element as Node;
        const gamePageContent = gamePageObj.content;
        this.root.append(gamePageElement);
        Game.start(gamePageContent);
    }

    public buildPage(name: string = 'login'): void {
        this.clearPage();
        switch (name) {
            case 'login':
                this.root.append(LoginPage());
                this.loginHandler();
                break;
            case 'game':
                this.startGameView();
                break;
            case 'start':
                this.root.append(StartPage());
                this.logoutHandler();
                this.startHandler();
                break;
            default:
                break;
        }
    }

    static getView() {
        return this;
    }
}
