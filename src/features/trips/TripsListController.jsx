import { TripsList } from './TripsList';
import { useState } from 'react';

export const TripsListController = ({ onSettings }) => {

    const trips = [
        {
            id: 1,
            tripName: ""
        }
    ];
    return <TripsList data={trips} onSettings={id => onSettings && onSettings(id)} />
     
};