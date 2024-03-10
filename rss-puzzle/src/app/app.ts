import AppView from './view/appView';

class App {
    public view;

    constructor() {
        this.view = new AppView();
    }

    start() {
        this.view.buildPage();
    }
}

export default App;
