import { useState, useEffect } from 'react';
import { Form, Row, Col } from 'antd';
import { SaveButton, CancelButton } from '@/features/shared/components/buttons';
import { CrudTable } from '@/features/shared/components/table';
import { TextInput, Dropdown, PhoneInput, Checkbox } from '@/features/shared/components/inputs';
import { DividerComponent } from '@/features/shared/components/divider';
import { SchoolsLookup, DistrictLookup } from '@/features/shared/lookups';

export const FacultiesForm = ({ onSave, onCancel, initialData, beacons = [], beaconTypes = [], facultyRoleTypes = [], isLoading = false, disabled = false
}) => {

    const [form] = Form.useForm();

    const beaconTypesMap = Object.fromEntries(
        beaconTypes.map(d => [d.id, d.name])
    );
    const [selectedRowKeys, setSelectedRowKeys] = useState(
        initialData?.selectedBeacons?.map(b => b.id) || []
    );
    const [selectedRows, setSelectedRows] = useState(initialData?.selectedBeacons || []);

    useEffect(() => {
        if (initialData?.selectedBeacons) {
            setSelectedRowKeys(initialData.selectedBeacons.map(b => b.id));
            setSelectedRows(initialData.selectedBeacons);
        }
    }, [initialData?.selectedBeacons]);

    const selectedSchool = Form.useWatch('organization', form);
    const selectedDistrict = Form.useWatch('districtId', form);

    const beaconColumns = [
        {
            field: 'deviceName',
            title: 'Beacons',
        },
        {
            field: 'phoneNumber',
            title: 'Phone Number',
        },
        {
            field: 'beaconType',
            title: 'Type',
            render: (value) => value ? (beaconTypesMap[value] || value) : '----'
        },
    ];

    const handleFinish = (values) => {
        onSave({
            ...values,
            selectedBeacons: selectedRows
        });
    };

    return (
        <div
            style={{
                padding: '24px',
                background: '#fff',
                borderRadius: '8px'
            }}
        >
            <Form
                form={form}
                layout="horizontal"
                onFinish={handleFinish}
                initialValues={initialData}
                colon={false}
            >

                <Row gutter={48}>

                    {/* CONTACT */}
                    <Col span={12}>
                        <DividerComponent
                            title="Contact Info"
                            plain
                            style={{ marginTop: 0 }}
                        />

                        <TextInput
                            name="name"
                            labelText="Name"
                            required={true}
                            rules={[{ required: true, message: 'Name is required' }]}
                            readOnly={disabled}
                        />

                        <TextInput
                            name="firstName"
                            labelText="First name"
                            required={true}
                            rules={[{ required: true, message: 'First name is required' }]}
                            readOnly={disabled}
                        />

                        <TextInput
                            name="lastName"
                            labelText="Last name"
                            required={true}
                            rules={[{ required: true, message: 'Last name is required' }]}
                            readOnly={disabled}
                        />

                        <TextInput
                            name="email"
                            labelText="Email"
                            required={true}
                            rules={[{ required: true, message: 'Email is required' }]}
                            readOnly={disabled}
                        />

                        <PhoneInput
                            name="phoneNumber"
                            labelText="Phone number"
                            required={true}
                            rules={[{ required: true, message: 'Phone number is required' }]}
                            readOnly={disabled}
                        />

                        <PhoneInput
                            name="mobilePhone"
                            labelText="Mobile phone"
                            required={true}
                            rules={[{ required: true, message: 'Mobile phone is required' }]}
                            readOnly={disabled}
                        />
                    </Col>

                    {/* ORGANIZATION */}
                    <Col span={12}>

                        <DividerComponent
                            title="Organization"
                            plain
                            style={{ marginTop: 0 }}
                        />

                        <SchoolsLookup
                            name="organization"
                            labelText="School"
                            required={!selectedDistrict}
                            readOnly={disabled}
                            disabled={!!selectedDistrict && !disabled}
                            rules={[{ validator: (_, value) => value || form.getFieldValue('districtId') ? Promise.resolve() : Promise.reject(new Error('Either School or District is required')) }]}
                        />

                        <DistrictLookup
                            name="districtId"
                            labelText="District"
                            required={!selectedSchool}
                            readOnly={disabled}
                            disabled={!!selectedSchool && !disabled}
                            rules={[{ validator: (_, value) => value || form.getFieldValue('organization') ? Promise.resolve() : Promise.reject(new Error('Either School or District is required')) }]}
                        />

                        <Dropdown
                            name="role"
                            labelText="Role"
                            required={true}
                            rules={[{ required: true, message: 'Role is required' }]}
                            options={facultyRoleTypes.map(r => ({ value: r.id, label: r.facultyRoleType }))}
                            readOnly={disabled}
                        />

                        {/* NOTIFICATIONS */}

                        <DividerComponent title="Notification" plain />

                        <Row gutter={16}>

                            <Col span={8}>
                                <Checkbox
                                    name={['notifications', 'email']}
                                    labelText=""
                                    readOnly={disabled}
                                >
                                    Email
                                </Checkbox>
                            </Col>

                            <Col span={8}>
                                <Checkbox
                                    name={['notifications', 'sms']}
                                    labelText=""
                                    readOnly={disabled}
                                >
                                    SMS
                                </Checkbox>
                            </Col>

                            <Col span={8}>
                                <Checkbox
                                    name={['notifications', 'voice']}
                                    labelText=""
                                    readOnly={disabled}
                                >
                                    Voice
                                </Checkbox>
                            </Col>

                        </Row>

                    </Col>

                </Row>

                {/* BEACONS TABLE */}

                <div style={{ marginTop: '24px' }}>

                    <DividerComponent
                        title="Assigned Beacons"
                        plain
                    />

                    <CrudTable
                        columns={beaconColumns}
                        dataSource={disabled ? (initialData?.selectedBeacons || []) : (beacons || [])}
                        rowKey="id"
                        rowSelection={disabled ? undefined : {
                            type: "checkbox",
                            selectedRowKeys: selectedRowKeys,
                            onChange: (keys, rows) => {
                                setSelectedRowKeys(keys);
                                setSelectedRows(rows);
                            }
                        }}
                    />

                </div>

                {/* BUTTONS */}

                {!disabled && (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginTop: '24px',
                            gap: '16px'
                        }}
                    >

                        <CancelButton
                            onClick={() => {
                                form.resetFields();
                                if (onCancel) onCancel();
                            }}
                        />

                        <SaveButton
                            htmlType="submit"
                            loading={isLoading}
                        />

                    </div>
                )}

            </Form>
        </div>
    );
};