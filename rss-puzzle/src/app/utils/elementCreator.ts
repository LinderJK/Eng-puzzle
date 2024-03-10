interface ElementProps {
    tag?: keyof HTMLElementTagNameMap;
    textContent?: string;
    className: string;
    attributes?: {
        [key: string]: string;
    };
    children?: HTMLElement[];
}

const elementCreator = ({
    tag,
    className,
    textContent = '',
    attributes = {},
    children = [],
}: ElementProps): HTMLElement => {
    const element = document.createElement(tag ?? 'div');
    element.className = className;
    element.textContent = textContent;
    Object.keys(attributes).forEach((key) => element.setAttribute(key, attributes[key]));
    children.forEach((child) => element.appendChild(child));
    return element;
};

export default elementCreator;
