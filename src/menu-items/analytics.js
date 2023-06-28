// assets
import { IconReportAnalytics } from '@tabler/icons';

//constant
const icons = { IconReportAnalytics };

const analytics = {
  id: 'analytics',
  title: '数据分析',
  type: 'group',
  children: [
    {
      id: 'analytics',
      title: '数据分析',
      type: 'item',
      url: '/analytics/default',
      icon: icons.IconReportAnalytics,
      breadcrumbs: false
    }
  ]
};

export default analytics;
