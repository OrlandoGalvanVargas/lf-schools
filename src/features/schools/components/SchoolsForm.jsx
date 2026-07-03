import { useEffect, useState } from "react";
import { Form, Card, Row, Col, Space } from "antd";
import { TextInput, PhoneInput } from "@/features/shared/components/inputs";
import { SaveButton, CancelButton, SecondaryButton } from "@/features/shared/components/buttons";
import { DividerComponent } from '@/features/shared/components/divider';
import { AddressList } from "@/features/addresses"
import { DistrictLookup, TimeZoneLookup } from "@/features/shared/lookups"
import { ContactForm } from "./ContactForm";


export function SchoolsForm({ onSubmit, onCancel, initialValues = {}, readOnly = false, loading }) {

    const [form] = Form.useForm();
    const [localAddresses, setLocalAddresses] = useState([]);

    const handleFinish = values => {
        !readOnly && onSubmit(values, localAddresses);
    };

    return (
        <div style={{ marginBottom: 24 }}>

            <Card style={{ margin: '0 auto' }}>
                <Form
                    form={form}
                    layout="horizontal"
                    onFinish={handleFinish}
                    initialValues={initialValues}
                    labelAlign="left"
                    loading={loading}
                >
                    <Row gutter={48}>
                        <Col xs={24} lg={12}>

                            <TextInput
                                labelText="School ID"
                                name="id"
                                placeholder="Auto-generated"
                                hidden
                            />
                            <TextInput
                                labelText="Monitoring Station ID"
                                name="monitoringStationId"
                                placeholder="Auto-generated"
                                hidden
                            />

                            <DividerComponent title="School Data" />

                            <DistrictLookup
                                readOnly={readOnly}
                                rules={[{ required: true, message: 'Please select a district' }]}
                            />

                            <Row gutter={16}>
                                <Col span={24}>
                                    <TextInput
                                        labelText="School name"
                                        name="name"
                                        readOnly={readOnly}
                                        rules={[{ required: true, message: 'Please enter a school name' }]}
                                    />
                                </Col>
                                <Col span={24}>
                                    <PhoneInput
                                        labelText="SOS number"
                                        name="soscallNumber"
                                        readOnly={readOnly}
                                        rules={[{ required: true, message: 'Please enter an SOS number' }]}
                                    />
                                </Col>
                                <Col span={24}>

                                    <TimeZoneLookup
                                        name="timeZone"
                                        readOnly={readOnly}
                                        rules={[{ required: true, message: 'Please select a time zone' }]}
                                    />

                                </Col>
                            </Row>

                            <DividerComponent title="Contact Info" />
                            <Row gutter={16}>
                                <ContactForm namePrefix="contact" readOnly={readOnly} />
                            </Row>

                        </Col>

                        <Col xs={24} lg={12}>
                            <DividerComponent title="Addresses" />
                            <AddressList
                                addresses={initialValues.addresses ? initialValues.addresses : []}
                                setAddresses={setLocalAddresses}
                                readOnly={readOnly}
                            />
                        </Col>
                    </Row>

                    <Form.Item style={{ textAlign: 'right', marginTop: 24 }}>
                        <Space>
                            {readOnly ? (
                                <SecondaryButton onClick={onCancel}>
                                    Close
                                </SecondaryButton>
                            ) : (
                                <>
                                    <CancelButton onClick={onCancel}>
                                        Cancel
                                    </CancelButton>
                                    <SaveButton onClick={() => form.submit()}>
                                        Submit
                                    </SaveButton>
                                </>
                            )}
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};