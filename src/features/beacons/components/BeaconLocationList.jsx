import dayjs from "dayjs";
import { CrudTable } from '@/features/shared/components/table';

const locationColumns = [
    {
      title: "Date UTC",
      field: "locationDateUTC",
      render: (_, record) =>
      dayjs(record.locationDateUTC).format("DD/MM/YYYY HH:mm")
    },
    {
      title: "Streets",
      field: "streets",
      render: (_, record) => (
        <>
          {record.street1} & {record.street2}
        </>
      ),
    },
    {
      title: "Locality",
      field: "locality",
    },
    {
      title: "State",
      field: "state",
    },
    {
      title: "Postal Code",
      field: "postalCode",
    },
  ];

export const BeaconLocationList = (
  { beaconLocations = [], loading }
) => {
    return( 
        <CrudTable
            columns={locationColumns}
            dataSource={beaconLocations}
            loading={loading}
            rowKey="id"
        />
    );
}

