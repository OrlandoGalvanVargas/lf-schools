import { AuthService } from './AuthService';
import { StudentsService } from './StudentsService';
import { DistrictService } from './DistrictService';
import { BroadcastMessageService } from './BroadcastMessageService';
import { BeaconService } from './BeaconService';
import { FacultiesService } from './FacultiesService';
import { SchoolService } from './SchoolService';
import { AddressService } from './AddressService';
import { TimeZoneService } from './TimeZoneService';
import { RelationshipTypesService } from './RelationshipTypesService';
import { BeaconEventService } from './BeaconEventService';

export default {
  auth: AuthService,
  students: StudentsService,
  districts: DistrictService,
  broadcastMessages: BroadcastMessageService,
  beacons: BeaconService,
  faculties: FacultiesService,
  schools: SchoolService,
  addresses: AddressService,
  timeZones: TimeZoneService,
  relationshipTypes: RelationshipTypesService,
  beaconEvent: BeaconEventService,
};
