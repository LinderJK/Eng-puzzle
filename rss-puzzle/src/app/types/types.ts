export type HandlerFn = (evt: Event) => void;

export type UserData = Array<{ [key: string]: string }>;

export interface IComponent {
    element: HTMLElement;
    children: IComponent[];

    getElement(): HTMLElement;

    getChildren(): IComponent[];

    delete(): void;

    deleteChildren(): void;

    deleteChild(child: IComponent): void;

    setAttributes(attributes: { [x: string]: string | boolean }): void;

    append(element: IComponent): void;

    removeAttribute(attribute: string): void;

    getTextContent(): string;

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

export type PageMap = Map<string, IComponent | undefined> | undefined;

export interface IWord {
    audioExample: string;
    id: number;
    textExample: string;
    textExampleTranslate: string;
    word: string;
    wordTranslate: string;
}

export interface ILevelData {
    levelData: LevelInfo;
    words: IWord[];
}

export type LevelInfo = {
    author: string;
    cutSrc: string;
    id: string;
    imageSrc: string;
    name: string;
    year: string;
};

export interface IRoundData {
    rounds: ILevelData[];
    roundsCount: number;
}
