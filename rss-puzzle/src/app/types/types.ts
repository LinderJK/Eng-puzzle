export type HandlerFn = (evt: Event) => void;

export type UserData = Array<{ [key: string]: string }>;

export interface IComponent {
    element: HTMLElement;
    children: IComponent[];

    getElement(): HTMLElement;

    delete(): void;

    deleteChildren(): void;

    deleteChild(child: IComponent): void;

    setAttributes(attributes: { [x: string]: string | boolean }): void;

    append(element: IComponent): void;

    getAllChildrenMap(): Map<string, IComponent>;

    appendChildren(children: IComponent[]): void;

    addListener(
        event: keyof HTMLElementEventMap,
        listener: EventListener,
        options?: boolean
    ): void;

    removeListener(
        event: keyof HTMLElementEventMap,
        listener: EventListener,
        options?: boolean
    ): void;

    setTextContent(textContent: string): void;
}

export interface Word {
    audioExample: string;
    id: number;
    textExample: string;
    textExampleTranslate: string;
    word: string;
    wordTranslate: string;
}

export interface LevelData {
    levelData: LevelInfo;
    words: Word[];
}

export type LevelInfo = {
    author: string;
    cutSrc: string;
    id: string;
    imageSrc: string;
    name: string;
    year: string;
};

export interface RoundData {
    rounds: LevelData[];
    roundsCount: number;
}

export type Div = {
    className: string;
    children?: IComponent[];
};
