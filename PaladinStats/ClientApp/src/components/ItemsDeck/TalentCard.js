import React from 'react'
import HandleErrorImg from '../../Utils/HandleErrorImg';
import items from '../../Resources/items.json';

export default function TalentCard({ talent }) {
  const talentItem = items.find(item => item.ItemId === talent);
  if (!talentItem) {
    return <span>-</span>;
  }
  const link = talentItem.itemIcon_URL.replace('champion-cards', 'champion-legendaries-badge').replace('.jpg', '.png');
  return <img onError={HandleErrorImg} src={link} alt={talentItem.DeviceName} title={`${talentItem.DeviceName}: ${talentItem.Description}`} />
}