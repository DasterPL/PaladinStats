export default function GetElement(id) {
    const domElement = document.getElementById(id);
    if (!domElement) {
        const newElement = document.createElement('div');
        newElement.setAttribute('id', id);
        document.body.appendChild(newElement);
        return newElement;
    } else {
        return domElement;
    }
}