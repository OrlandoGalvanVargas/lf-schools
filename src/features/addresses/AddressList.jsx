import { Flex, Tag } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { HandleInternalCrud } from '@/features/shared/components/handleInternalCrud';
import { AddressesForm } from './AddressesForm';

const AddressItem = ({ item }) => (
  <Flex align="center" gap={16} style={{ width: '100%' }}>
    <Flex vertical gap={2} style={{ flex: 2, minWidth: 0, maxWidth: 260 }}>
      <Flex align="flex-start" gap={8}>
        <EnvironmentOutlined style={{ color: '#bfbfbf', flexShrink: 0, marginTop: 3 }} />
        <Flex vertical gap={0}>
          <span style={{ fontWeight: 500, wordBreak: 'break-word' }}>{item.street1}</span>
          {item.street2 && (
            <span style={{ fontSize: '13px', color: '#595959', wordBreak: 'break-word' }}>
              {item.street2}
            </span>
          )}
        </Flex>
      </Flex>
      <div style={{ color: '#8c8c8c', paddingLeft: 22, fontSize: '12px' }}>
        {item.locality}
        {item.state && `, ${item.state}`}
      </div>
    </Flex>

    <Flex vertical gap={4} style={{ flex: 1, minWidth: 0 }}>
      <Flex align="center" gap={6}>
        <span style={{ fontSize: '12px', color: '#8c8c8c' }}>ZIP</span>
        <span style={{ fontSize: '13px', fontWeight: 500 }}>
          {item.postalCode}
          {item.postalCodeExt && `-${item.postalCodeExt}`}
        </span>
      </Flex>
      <div style={{ fontSize: '12px', color: '#8c8c8c' }}>
        {item.countryName || item.countryCode || '—'}
      </div>
    </Flex>

    <Flex justify="center" style={{ flex: 0, minWidth: 80 }}>
      {item.type ? <Tag color="blue">{item.type}</Tag> : <Tag color="default">—</Tag>}
    </Flex>
  </Flex>
);

export const AddressList = ({ addresses = [], setAddresses, readOnly = false }) => (
  <HandleInternalCrud
    initListData={addresses}
    setData={setAddresses}
    readOnly={readOnly}
    dataForm={({ closeDrawer, addData, form, isReadOnly }) => (
      <AddressesForm
        initialValues={form}
        onSubmit={data => {
          addData(data);
          closeDrawer();
        }}
        onCancel={closeDrawer}
        readOnly={isReadOnly}
      />
    )}
    showInfo={({ item }) => <AddressItem item={item} />}
  />
);
