import React, {Component, createContext, useState} from 'react';

// 创建弹窗 Context
const PopupContext = createContext();

// 创建弹窗提供者组件
export const PopupProvider = ({ children }) => {
    const [popupData, setPopupData] = useState({ isOpen: false, message: '' });

    return (
        <PopupContext.Provider value={{ popupData, setPopupData }}>
            {children}
        </PopupContext.Provider>
    );
};

// 使用自定义Hook来访问弹窗 Context
export const usePopup = () => {
    return useContext(PopupContext);
};
class Noticebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        };
        this.websocket = null;
    }

    componentDidMount() {
        // 创建 WebSocket 连接
        this.websocket = new WebSocket('ws://localhost:8081/websocket/2'); // 替换为你的 WebSocket 地址

        // 监听 WebSocket 事件
        this.websocket.onopen = () => {
            console.log('WebSocket connection opened');
        };

        this.websocket.onmessage = (event) => {
            const receivedMessage = event.data;
            // 处理接收到的消息并触发弹窗显示
            this.showPopup(receivedMessage);
        };

        this.websocket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        this.websocket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }

    componentWillUnmount() {
        // 关闭 WebSocket 连接
        if (this.websocket) {
            this.websocket.close();
        }
    }
    showPopup(message) {
        // 使用上下文或Redux来更新弹窗状态
        // 你可以根据需要自行实现状态更新逻辑
        // const { setPopupData } = usePopup();
        // setPopupData({ isOpen: true, message });
        console.log(message);
    }

    render() {
        return null; // 这个组件不需要渲染任何内容
    }
}

export default Noticebar;
