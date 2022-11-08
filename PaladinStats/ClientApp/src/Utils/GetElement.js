export default function GetElement(id) {
    const playerloadoutsDOM = document.getElementById(id);
    if (!playerloadoutsDOM) {
        const newElement = document.createElement('div');
        newElement.setAttribute('id', id);
        document.body.appendChild(newElement);
        return newElement;
    } else {
        return playerloadoutsDOM;
    }
}