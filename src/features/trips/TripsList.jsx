import { useEffect } from 'react';
import { Button } from 'antd';

export function TripsList({ trips, onSettings }) {
  return (
    <div>
      <p>Trips list</p>
      <Button type="primary" onClick={() => onSettings('1')}>
        Edit Trip
      </Button>
    </div>
  );
}
