import LoginPage from '../pages/login/login';
import StartPage from '../pages/start/start';
import GamePage from '../pages/game/game';
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

    public buildPage(name: string = 'login'): void {
        this.clearPage();
        switch (name) {
            case 'login':
                this.root.append(LoginPage());
                this.loginHandler();
                break;
            case 'game':
                this.root.append(GamePage());
                break;
            case 'start':
                this.root.append(StartPage());
                this.logoutHandler();
                break;
            default:
                break;
        }
    }

    static getView() {
        return this;
    }
}
