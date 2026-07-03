import dayjs from "dayjs";
import { CrudTable } from '@/features/shared/components/table';

 const eventColumns = [
    {
      title: "Date UTC",
      field: "createdOnUTC",
      render: (_, record) =>
        dayjs(record.createdOnUTC).format("DD/MM/YYYY HH:mm")
    },
    {
      title: "Emergency Type",
      field: "emergencyType",
    },
    {
      title: "Address",
      field: "address1",
    },
    {
      title: "Created By",
      field: "createdBy",
    },
  ];

export const BeaconEventList = (
  { beaconEvents = [], loading }
) => {
    return( 
        <CrudTable
            columns={eventColumns}
            dataSource={beaconEvents}
            loading={loading}
            rowKey="id"
        />
    );
}
