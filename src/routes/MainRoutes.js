import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import DataHeartRate from '../views/data/heartRate';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const Analytics = Loadable(lazy(() => import('views/analytics')));
const DataWeight = Loadable(lazy(() => import('views/data/weight')));
const DataSleepTime = Loadable(lazy(() => import('views/data/sleepTime')));
const DataCalories = Loadable(lazy(() => import('views/data/calories')));
const DataBlood = Loadable(lazy(() => import('views/data/blood')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'analytics',
      children: [
        {
          path: 'default',
          element: <Analytics />
        }
      ]
    },
    {
      path: 'data',
      children: [
        {
          path: 'weight',
          element: <DataWeight />
        },
        {
          path: 'calories',
          element: <DataCalories />
        },
        {
          path: 'sleepTime',
          element: <DataSleepTime />
        },
        {
          path: 'heartRate',
          element: <DataHeartRate />
        },
        {
          path: 'blood',
          element: <DataBlood />
        }
      ]
    }
  ]
};

export default MainRoutes;
