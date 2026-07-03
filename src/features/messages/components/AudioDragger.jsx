import { useState } from 'react';
import { Form, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const InnerAudioDragger = ({ disabled, fileList, onChange }) => {
    const [audioUrl, setAudioUrl] = useState(null);

    return (
        <Dragger
            accept=".mp3,.wav,.aac,.m4a"
            maxCount={1}
            fileList={fileList || []}
            openFileDialogOnClick={!disabled}
            style={disabled ? { cursor: 'default' } : undefined}
            beforeUpload={(file) => {
                if (disabled) {
                    return Upload.LIST_IGNORE;
                }
                const url = URL.createObjectURL(file);
                setAudioUrl(url);
                onChange?.([file]);
                return false;
            }}
            onRemove={() => {
                if (disabled) return false;
                setAudioUrl(null);
                onChange?.([]);
            }}
            itemRender={(originNode, file) => (
                <div style={{ marginTop: 15, padding: 10, border: '1px solid #d9d9d9', borderRadius: 8 }}>
                    <p><strong>Selected file:</strong> {file.name}</p>
                    
                    {audioUrl && (
                        <audio controls src={audioUrl} style={{ width: '100%', margin: '10px 0' }}>
                            Your browser does not support the audio element.
                        </audio>
                    )}
                </div>
            )}
        >
             <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag an audio file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single audio file upload.</p>
        </Dragger>
    );
};

export const AudioDragger = ({ disabled, style }) => {
    return (
        <Form.Item
            name="upload"
            valuePropName="fileList"
            getValueFromEvent={e => (Array.isArray(e) ? e : e?.fileList)}
            style={style}
        >
            <InnerAudioDragger disabled={disabled} />
        </Form.Item>
    );
};