interface IComponentConstructor {
    tagName?: keyof HTMLElementTagNameMap | string;
    className: string;
    textContent?: string;
    attributes?: {
        [key: string]: string;
    };
    children?: Component[];
}

class Component {
    element: HTMLElement;

    children: Component[] = [];

    constructor(
        {
            tagName = 'div',
            className = '',
            textContent = '',
            attributes = {},
        }: IComponentConstructor,
        ...children: Component[]
    ) {
        const element = document.createElement(tagName);
        element.className = className;
        element.textContent = textContent;
        this.element = element;

        if (attributes) {
            this.setAttributes(attributes);
        }
        if (children) {
            this.appendChildren(children);
        }
    }

    setAttributes(attributes: { [x: string]: string | boolean }) {
        if (attributes && this.element) {
            Object.keys(attributes).forEach((key) => {
                const value = attributes[key];
                if (typeof value === 'boolean') {
                    this.element.setAttribute(key, '');
                } else {
                    this.element.setAttribute(key, value);
                }
            });
        }
    }

    private appendChildren(childrenArr: Component[]) {
        childrenArr.forEach((element: Component) => this.append(element));
    }

    append(element: Component) {
        this.children.push(element);
        this.element?.append(element.getElement());
    }

    getElement() {
        return this.element;
    }

    addListener(
        event: keyof HTMLElementEventMap,
        listener: EventListener,
        options = false
    ) {
        this.element.addEventListener(event, listener, options);
    }

    removeListener(
        event: keyof HTMLElementEventMap,
        listener: EventListener,
        options = false
    ) {
        this.element.removeEventListener(event, listener, options);
    }

    deleteChildren() {
        this.children.forEach((child) => {
            child.delete();
        });
        this.children.length = 0;
    }

    delete() {
        this.deleteChildren();
        this.element.remove();
    }
}

export default Component;
