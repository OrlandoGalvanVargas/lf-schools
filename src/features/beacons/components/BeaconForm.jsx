import { useEffect } from "react";
import { Form, Switch, Card } from "antd";
import { SaveButton, CancelButton } from '@/features/shared/components/buttons';
import { Dropdown, PhoneInput, TextInput } from '@/features/shared/components/inputs';
import { SchoolsLookup, FacultiesLookup, DistrictLookup } from "@/features/shared/lookups";
import { DividerComponent } from '@/features/shared/components/divider';

export const BeaconForm = ( { beacon, beaconTypes = [], onSubmit, onCancel, isLoading, readOnly = false } ) => {

    const [form] = Form.useForm();

    useEffect(() => {
        if (beacon) {
            form.setFieldsValue(beacon);
        } else {
            form.resetFields();
        }
    }, [ beacon, form ]);
    
    const handleFinish = (values) => {
        const cleanedValues = Object.fromEntries(
            Object.entries(values).map(([key, value]) => [
                key,
                value === undefined ? null : value
            ])
        );

        if (onSubmit) onSubmit(cleanedValues);
    };

    const formItemLayout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 12 },
    };

    return (
        <div>
            <DividerComponent
                title = 'Beacon Data'
            />
            <Form
                form={form}
                layout="horizontal"
                onFinish={handleFinish}
                initialValues={{
                isAvailable: true
                }}
                requiredMark={!readOnly}
            >
                <TextInput  
                    {...formItemLayout}
                    labelText = 'Beacon name'
                    name = 'deviceName'
                    maxLength = '50'
                    required = { true }
                    rules={[{ required: true, message: "Beacon's name is required" }]}
                    readOnly = { readOnly }
                />
                <Dropdown  
                    {...formItemLayout}
                    labelText = 'Beacon type'
                    name = 'beaconType'
                    options = { beaconTypes.map(t => ({ value: t.id, label: t.name })) }
                    placeholder = 'Select Beacon Type'
                    required = {true}
                    rules={[{ required: true, message: "Beacon type is required" }]}
                    readOnly = { readOnly }
                />
                <PhoneInput
                    {...formItemLayout} 
                    labelText = 'Phone number'
                    name = 'phoneNumber'
                    required = {true}
                    maxLength = {15}
                    rules={[{ required: true, message: "Phone number is required" }]}
                    readOnly = { readOnly }
                />
                <DistrictLookup 
                    {...formItemLayout}      
                    name = 'districtId'
                    required = { false }
                    readOnly = { readOnly }
                    placeholder = { !readOnly ? 'Select a District...' : 'No District' }
                />
                <FacultiesLookup
                    {...formItemLayout}     
                    name = 'facultyId'
                    required = { false }
                    readOnly = { readOnly }
                    placeholder = { !readOnly ? 'Select a Faculty...' : 'No Faculty' }

                />
                <SchoolsLookup    
                    {...formItemLayout}
                    name = 'schoolId'
                    required = { false }
                    readOnly = { readOnly }
                    placeholder = { !readOnly ? 'Select a School...' : 'No School' }
                />
                <Form.Item
                    {...formItemLayout}
                    label="Available"
                    name="isAvailable"
                    valuePropName="checked"
                >
                    <Switch disabled={ readOnly } />
                </Form.Item>

                { !readOnly && (
                    <Form.Item >
                        <div
                            style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "16px",
                            marginTop: "20px",
                            }}
                        >
                            <CancelButton
                                onClick={() => {
                                    form.resetFields();
                                    if (onCancel) onCancel();
                                }}
                            />
                            <SaveButton 
                                htmlType = 'submit'
                                loading = { isLoading }
                            />
                        </div>
                    </Form.Item>
                )}
            </Form>
        </ div>
    );
}