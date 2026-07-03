import { useEffect, useState } from 'react';
import { Form, Row, Col, Card, Tabs } from 'antd';
import { AudioDragger } from '@/features/messages/components/AudioDragger';
import { TextInput, Dropdown, Checkbox } from '@/features/shared/components/inputs';
import { SaveButton, CancelButton, SecondaryButton } from '@/features/shared/components/buttons';
import { DividerComponent } from '@/features/shared/components/divider';
import { SchoolsLookup } from '@/features/shared/lookups/SchoolsLookup';

const priorityColorMap = {
    High: '#FF0000',
    Medium: '#0066CC',
    Low: '#00AA00',
};

const requiredFields = [
    { name: 'schoolId', label: 'School' },
    { name: 'description', label: 'Description' },
    { name: 'broadcastMessageTypeId', label: 'Type' },
    { name: 'broadcastMessagePriorityId', label: 'Priority' },
    { name: 'broadcastMessageEnvironmentTypeId', label: 'Environment' },
];

export const MessagesForm = ({
    types = [],
    priorities = [],
    environmentTypes = [],
    initialValues,
    loading = false,
    disabled = false,
    onSubmit,
    onCancel,
}) => {
    const [form] = Form.useForm();
    const [errors, setErrors] = useState({});
    const [isRecord, setIsRecord] = useState(false);

    useEffect(() => {
        if (initialValues) {
            const formattedValues = {
                ...initialValues,
                schoolId: initialValues.school?.id || initialValues.schoolId,
                broadcastMessageTypeId: initialValues.broadcastMessageType?.id || initialValues.broadcastMessageTypeId,
                broadcastMessagePriorityId: initialValues.broadcastMessagePriority?.id || initialValues.broadcastMessagePriorityId,
                broadcastMessageEnvironmentTypeId: initialValues.broadcastMessageEnvironmentType?.id || initialValues.broadcastMessageEnvironmentTypeId,
            };

            form.setFieldsValue(formattedValues);
            setIsRecord(formattedValues.isRecordBroadcast ?? false);
        }
    }, [initialValues, form]);

    const validate = (values) => {
        const newErrors = {};
        requiredFields.forEach(({ name, label }) => {
            if (values[name] === undefined || values[name] === null || values[name] === '') {
                newErrors[name] = `${label} is required`;
            }
        });
        return newErrors;
    };

    const handleFinish = values => {
        const validationErrors = validate(values);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});

        if (values.isRecordBroadcast) {
            values.textToVoice = null;
            values.textToVoiceGender = null;
        } else {
            values.recordingUrl = null;
            values.recordingId = null;
        }

        if (onSubmit) {
            onSubmit(values);
        }
    };

    const handleValuesChange = (changedValues, allValues) => {
        if (changedValues.hasOwnProperty('isRecordBroadcast')) {
            setIsRecord(changedValues.isRecordBroadcast);
            if (changedValues.isRecordBroadcast) {
                form.setFieldsValue({ textToVoice: null, textToVoiceGender: null });
            } else {
                form.setFieldsValue({ recordingUrl: null, upload: null });
            }
        }

        const changedKey = Object.keys(changedValues)[0];
        if (errors[changedKey]) {
            setErrors(prev => {
                const next = { ...prev };
                delete next[changedKey];
                return next;
            });
        }
    };

    return (
        <div>
            <Card>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleFinish}
                    onValuesChange={handleValuesChange}
                    autoComplete="off"
                >
                    <SchoolsLookup
                        name="schoolId"
                        labelText="School"
                        placeholder="Select a school"
                        required
                        error={errors.schoolId}
                        status={errors.schoolId ? 'error' : undefined}
                        readOnly={disabled}
                    />

                    <Row gutter={32}>
                        <Col xs={24} md={12}>
                            <fieldset>
                                <DividerComponent
                                    title="Message"
                                    plain
                                />

                                <TextInput
                                    labelText="Description"
                                    name="description"
                                    required
                                    error={errors.description}
                                    status={errors.description ? 'error' : undefined}
                                    readOnly={disabled}
                                />

                                <TextInput
                                    labelText="SMS text"
                                    name="smsNotificationText"
                                    required={false}
                                    readOnly={disabled}
                                />

                                <TextInput
                                    labelText="Email text"
                                    name="emailNotificationText"
                                    required={false}
                                    readOnly={disabled}
                                />

                                <Dropdown
                                    labelText="Type"
                                    name="broadcastMessageTypeId"
                                    required
                                    error={errors.broadcastMessageTypeId}
                                    status={errors.broadcastMessageTypeId ? 'error' : undefined}
                                    readOnly={disabled}
                                    options={types.map(t => ({
                                        value: t.id,
                                        label: t.name,
                                    }))}
                                />

                                <Dropdown
                                    labelText="Priority"
                                    name="broadcastMessagePriorityId"
                                    required
                                    error={errors.broadcastMessagePriorityId}
                                    status={errors.broadcastMessagePriorityId ? 'error' : undefined}
                                    readOnly={disabled}
                                    options={priorities.map(p => ({
                                        value: p.id,
                                        label: p.name,
                                    }))}
                                    onChange={(value) => {
                                        const selected = priorities.find(p => p.id === value);
                                        const color = priorityColorMap[selected?.name] || null;
                                        form.setFieldsValue({ color });
                                    }}
                                />

                                <Dropdown
                                    labelText="Environment"
                                    name="broadcastMessageEnvironmentTypeId"
                                    required
                                    error={errors.broadcastMessageEnvironmentTypeId}
                                    status={errors.broadcastMessageEnvironmentTypeId ? 'error' : undefined}
                                    readOnly={disabled}
                                    options={environmentTypes.map(e => ({
                                        value: e.id,
                                        label: e.name,
                                    }))}
                                />

                                <Form.Item name="color" hidden>
                                    <TextInput />
                                </Form.Item>

                                <Row gutter={16}>
                                    <Col>
                                        <Checkbox name="isFavorite" labelText="" readOnly={disabled}>
                                            Favorite
                                        </Checkbox>
                                    </Col>
                                    <Col>
                                        <Checkbox name="isDefault" labelText="" readOnly={disabled}>
                                            Default
                                        </Checkbox>
                                    </Col>
                                </Row>
                            </fieldset>
                        </Col>

                        <Col xs={24} md={12}>
                            <fieldset>
                                <DividerComponent
                                    title="Audio Configuration"
                                    plain
                                />

                                <Form.Item name="isRecordBroadcast" hidden>
                                    <TextInput />
                                </Form.Item>

                                <Tabs
                                    activeKey={isRecord ? 'true' : 'false'}
                                    onChange={(key) => {
                                        const isRecordValue = key === 'true';
                                        form.setFieldsValue({ isRecordBroadcast: isRecordValue });
                                        setIsRecord(isRecordValue);
                                        if (isRecordValue) {
                                            form.setFieldsValue({ textToVoice: null, textToVoiceGender: null });
                                        } else {
                                            form.setFieldsValue({ recordingUrl: null, upload: null });
                                        }
                                    }}
                                    items={[
                                        {
                                            key: 'false',
                                            label: 'Text to Speech',
                                            disabled: disabled,
                                            children: (
                                                <div style={{ paddingTop: 8 }}>
                                                    <Dropdown
                                                        labelText="Voice gender"
                                                        name="textToVoiceGender"
                                                        required={false}
                                                        readOnly={disabled}
                                                        options={[
                                                            { value: 'Male', label: 'Male' },
                                                            { value: 'Female', label: 'Female' },
                                                        ]}
                                                    />

                                                    <TextInput
                                                        labelText="Text to voice"
                                                        name="textToVoice"
                                                        required={false}
                                                        readOnly={disabled}
                                                    />
                                                </div>
                                            )
                                        },
                                        {
                                            key: 'true',
                                            label: 'Record / Upload',
                                            disabled: disabled,
                                            children: (
                                                <div style={{ paddingTop: 8 }}>
                                                    {initialValues?.recordingUrl && (
                                                        <div style={{ marginBottom: 16 }}>
                                                            <div style={{ marginBottom: 8, color: '#000000d9', fontWeight: 500 }}>
                                                                Current voice file:
                                                            </div>
                                                            <audio
                                                                controls
                                                                src={initialValues.recordingUrl}
                                                                style={{ width: '100%' }}
                                                            >
                                                                Your browser does not support the audio element.
                                                            </audio>
                                                        </div>
                                                    )}

                                                    <AudioDragger
                                                        disabled={disabled}
                                                        style={{ marginTop: initialValues?.recordingUrl ? 8 : 0 }}
                                                    />
                                                </div>
                                            )
                                        }
                                    ]}
                                />
                            </fieldset>
                        </Col>
                    </Row>

                    {!disabled ? (
                        <Row justify="end" gutter={16} style={{ marginTop: 32 }}>
                            <Col>
                                <CancelButton onClick={onCancel} />
                            </Col>
                            <Col>
                                <SaveButton htmlType="submit" loading={loading} />
                            </Col>
                        </Row>
                    ) : (
                        <Row justify="end" gutter={16} style={{ marginTop: 32 }}>
                            <Col>
                                <SecondaryButton onClick={onCancel}>Close</SecondaryButton>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Card>
        </div>
    );
};
