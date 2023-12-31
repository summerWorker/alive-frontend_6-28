// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
  IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: '账户',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: '账户',
      type: 'collapse',
      icon: icons.IconKey,

      children: [
        {
          id: 'login3',
          title: '退出登录',
          type: 'item',
          url: '/pages/login/login3',
          // target: true,
          onClick: () => {
            localStorage.removeItem('token');
          }
        },
        {
          id: 'register3',
          title: '注册',
          type: 'item',
          url: '/pages/register/register3',
          // target: true,
          onClick: () => {
            localStorage.removeItem('token');
          }
        }
      ]
    }
  ]
};

export default pages;
