import React, { Component } from 'react';
import { notification } from 'antd';
import { useMessage } from './MessageContext'; // 导入useMessage钩子

class Noticebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
    this.websocket = null;
  }

  componentDidMount() {
    if (localStorage.getItem('token') === null) {
      return;
    }
    // 创建 WebSocket 连接
    this.websocket = new WebSocket(`ws://localhost:8081/websocket/${localStorage.getItem('token')}`); // 替换为你的 WebSocket 地址

    // 监听 WebSocket 事件
    this.websocket.onopen = () => {
      console.log('WebSocket connection opened');
    };

    // 监听 WebSocket 事件
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
    // 弹窗提示
    const api = notification;
    api.info({
      message: '目标提醒',
      description: message
    });
    // 使用 useMessage 钩子来调用 addMessage
    const { addMessage } = useMessage();
    addMessage(message);

    // console.log(message);
  }

  render() {
    return null; // 这个组件不需要渲染任何内容
  }
}

export default Noticebar;
