import AppView from './view/appView';
import Login from './controller/Login';
import Game from './game/Game';

class App {
    public view: AppView;

    static app: App;

    constructor() {
        this.view = new AppView();
        App.app = this;
    }

    start() {
        const isLogin = Login.getUser();

        const isPlaying = Game.getPlayingStatus();
        console.log('TEST', isPlaying);
        if (isLogin) {
            if (isPlaying) {
                this.view.buildPage('game');
                // Game.start();
            } else {
                this.view.buildPage('start');
            }
        } else {
            this.view.buildPage('login');
        }
    }

    static getApplication() {
        return App.app;
    }
}

export default App;
