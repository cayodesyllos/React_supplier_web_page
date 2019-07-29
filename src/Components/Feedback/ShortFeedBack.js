import React from 'react';
import { Alert } from 'antd';
import '../style.css';
export const Error = (msg) => (
    <Alert className="alert" message={msg} type="error" showIcon />
)
export const Success = (msg) => (
<Alert className="alert" type="success" showIcon />
)