import {Modal, Table} from "antd";
import React, {useState} from "react";
import {columnsOpt} from "./options";

function Warehousing(props) {
    const {title, visible, setVisible, width, data} = props;
    const [columns, setColumns] = useState([
        ...columnsOpt
    ])
    const [contractData, setContract] = useState([...data]);
    const closeModal = (flag) => {
        setVisible(flag);
    }
    return (
        <Modal
            visible={visible}
            title={title}
            footer={null}
            wrapClassName="blue-modal"
            bodyStyle={{
                height: "600px",
                overflow: "hidden",
                overflowY: "scroll"
            }}
            centered={true}
            width={width}
            onCancel={() => closeModal(false)}
            destroyOnClose={true}
        >
            <div className="contract-table">
                <Table columns={columns} dataSource={contractData} pagination={false}/>
            </div>
        </Modal>
    )
}

export default Warehousing;
