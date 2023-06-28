// assets
import { IconScaleOutline } from '@tabler/icons';

// constant
const icons = { IconScaleOutline };

const data = {
  id: 'data',
  title: '健康数据',
  type: 'group',
  children: [
    {
      id: 'height',
      title: '身高',
      type: 'item',
      url: '/data/height',
      icon: icons.IconScaleOutline,
      breadcrumbs: false
    },
    {
      id: 'weight',
      title: '体重',
      type: 'item',
      url: '/data/weight',
      icon: icons.IconScaleOutline,
      breadcrumbs: false
    },
    {
      id: 'steps',
      title: '运动步数',
      type: 'item',
      url: '/data/steps',
      icon: icons.IconScaleOutline,
      breadcrumbs: false
    },
    {
      id: 'sleepTime',
      title: '睡眠时间',
      type: 'item',
      url: '/data/sleepTime',
      icon: icons.IconScaleOutline,
      breadcrumbs: false
    },
    {
      id: 'heartRate',
      title: '心率',
      type: 'item',
      url: '/data/heartRate',
      icon: icons.IconScaleOutline,
      breadcrumbs: false
    },
    {
      id: 'bloodPressure',
      title: '血压',
      type: 'item',
      url: '/data/bloodPressure',
      icon: icons.IconScaleOutline,
      breadcrumbs: false
    },
    {
      id: 'bloodSugar',
      title: '血糖',
      type: 'item',
      url: '/data/bloodSugar',
      icon: icons.IconScaleOutline,
      breadcrumbs: false
    },
    {
      id: 'cholesterol',
      title: '胆固醇',
      type: 'item',
      url: '/data/cholesterol',
      icon: icons.IconScaleOutline,
      breadcrumbs: false
    },
    {
      id: 'calories',
      title: '饮食',
      type: 'item',
      url: '/data/calories',
      icon: icons.IconScaleOutline,
      breadcrumbs: false
    }
  ]
};

export default data;
