import itemsJSON from '../Resources/items.json';

export default function GetItem(id, level) {
    const item = itemsJSON.find(item => item.ItemId === id);
    if(!item){
        return false;
    }

    const descriptionMatch = item.Description.match(/{([^;]*)}/);
    const descriptionScale = descriptionMatch ? +descriptionMatch[1].replace('scale=', '').split('|')[0] : 1;
    const scaleLevel = (descriptionScale * level).toPrecision(2);
    const description = item.Description.replace(/{([^;]*)}/, scaleLevel);

    return {
        src: item.itemIcon_URL,
        name: item.DeviceName,
        description
    }
}