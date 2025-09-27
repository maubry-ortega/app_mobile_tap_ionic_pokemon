import React from 'react';
import { Badge } from '../models/Badge.models';
import './BadgeItem.css';

interface BadgeItemProps {
  badge: Badge;
}

const BadgeItem: React.FC<BadgeItemProps> = ({ badge }) => {
  return (
    <div className="badge-item ion-text-center">
      <div className="badge-icon-wrapper">
        <img src={badge.image} alt={badge.name} className="badge-image" />
      </div>
      <p className="badge-name">{badge.name}</p>
    </div>
  );
};

export default BadgeItem;
