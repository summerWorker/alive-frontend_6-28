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
      id: 'healthData',
      title: '健康数据',
      type: 'collapse',
      icon: icons.IconScaleOutline,

      children: [
        {
          id: 'weight',
          title: '身高体重',
          type: 'item',
          url: '/data/weight',
          breadcrumbs: false
        },
        {
          id: 'steps',
          title: '运动步数',
          type: 'item',
          url: '/data/steps',
          breadcrumbs: false
        },
        {
          id: 'sleepTime',
          title: '睡眠时间',
          type: 'item',
          url: '/data/sleepTime',
          breadcrumbs: false
        },
        {
          id: 'heartRate',
          title: '心率',
          type: 'item',
          url: '/data/heartRate',
          breadcrumbs: false
        },
        {
          id: 'blood',
          title: '血压血糖',
          type: 'item',
          url: '/data/blood',
          breadcrumbs: false
        },
        {
          id: 'calories',
          title: '饮食',
          type: 'item',
          url: '/data/calories',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default data;
