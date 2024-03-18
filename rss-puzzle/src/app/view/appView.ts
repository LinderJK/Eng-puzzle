import LoginPage from '../pages/login/login';
import StartPage from '../pages/start/start';
import GamePage from '../pages/game/game';
import Game from '../game/Game';
import Login from '../controller/Login';

export default class AppView {
    root: HTMLElement = document.querySelector('#root')!; // The root element of the application

    startPageObj = StartPage(); // The object representing the start page

    loginPageObj = LoginPage(); // The object representing the login page.

    gamePageObj = GamePage(); // The object representing the game page

    /**
     * Event handler for logout action.
     */
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

    /**
     * Event handler for start action.
     */
    startHandler() {
        const startEventListener = () => {
            this.buildPage('game');
            document.removeEventListener('startClicked', startEventListener);
        };
        document.addEventListener('startClicked', startEventListener);
    }

    /**
     * Event handler for login action.
     */
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

    /**
     * Clears the content of the root element.
     */
    clearPage(): void {
        if (!this.root) {
            console.error('dont find root');
            return;
        }
        while (this.root.firstChild) {
            this.root.removeChild(this.root.firstChild);
        }
    }

    /**
     * Initializes the game view and starts the game.
     */
    startGameView() {
        const gamePageElement = this.gamePageObj.element;
        const gamePageContent = this.gamePageObj.content;
        this.root.append(gamePageElement);
        Game.start(gamePageContent);
    }

    /**
     * Builds the specified page of the application.
     * @param {string} name The name of the page to build.
     */
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

    /**
     * Updates the content of the pages based on the current user data.
     */
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
