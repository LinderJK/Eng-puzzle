import AppView from './view/appView';
import Login from './controller/Login';

class App {
    public view: AppView;

    static app: App;

    constructor() {
        this.view = new AppView();
        App.app = this;
    }

    start() {
        const isLogin = Login.getUser();
        if (isLogin) {
            this.view.buildPage('start');
        } else {
            this.view.buildPage('login');
        }
    }

    static getApplication() {
        return App.app;
    }
}

export default App;
