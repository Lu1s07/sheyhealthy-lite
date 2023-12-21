import React from "react";
import { Spin } from 'antd';

function Spinner() {
    return (

        <div className="spinner-parent">
            <Spin size="large"></Spin>
        </div>
    )
}

export default Spinner