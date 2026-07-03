import { api } from '@/sdk';
import { env } from '@/config/env';

const endpoint = '/timezones';

const mockTimeZones = [
  { id: 1, label: 'America/New York', value: 'America/New York', utc: 'UTC-5' },
  { id: 2, label: 'America/Chicago', value: 'America/Chicago', utc: 'UTC-6' },
  { id: 3, label: 'America/Denver', value: 'America/Denver', utc: 'UTC-7' },
  { id: 4, label: 'America/Los Angeles', value: 'America/Los Angeles', utc: 'UTC-8' },
  { id: 5, label: 'America/Phoenix', value: 'America/Phoenix', utc: 'UTC-7' },
];

export const TimeZoneClient = {
  getTimeZones: () => (!env.useMock ? Promise.resolve({ data: mockTimeZones }) : api.get(endpoint)),
};
