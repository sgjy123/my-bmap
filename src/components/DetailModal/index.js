import {useState} from "react";
import {Modal} from "antd";
import './index.less';

function DetailModal(props) {
  const {title, width, visible, setVisible, children} = props;
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
        {children}
      </Modal>
  )
}

export default DetailModal;
