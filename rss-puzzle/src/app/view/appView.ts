import LoginPage from '../pages/login/login';
import StartPage from '../pages/start/start';
import GamePage from '../pages/game/game';

export default class AppView {
    root: HTMLElement = document.querySelector('#root')!;

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
                break;
            case 'game':
                this.root.append(GamePage());
                break;
            case 'start':
                this.root.append(StartPage());
                break;
            default:
                break;
        }
    }

    static getView() {
        return this;
    }
}
