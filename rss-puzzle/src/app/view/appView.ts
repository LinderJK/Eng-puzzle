import LoginPage from '../pages/login/login';
import GamePage from '../pages/game/game';

export default class AppView {
    root: HTMLElement = document.querySelector('#root')!;

    // router: Router = new Router();

    elements = [];

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
                this.root.appendChild(LoginPage(this.buildPage.bind(this)));
                break;
            case 'main':
                this.root.appendChild(GamePage());
                break;
            default:
                break;
        }
    }

    // render(type: string = 'login'): void {
    //     this.buildPage(type);
    // }
}
