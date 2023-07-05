import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import DataHeartRate from '../views/data/heartRate';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const Analytics = Loadable(lazy(() => import('views/analytics')));
const DataWeightAndHeight = Loadable(lazy(() => import('views/data/weight')));
const DataSleepTime = Loadable(lazy(() => import('views/data/sleepTime')));
const DataCalories = Loadable(lazy(() => import('views/data/calories')));
const DataSteps = Loadable(lazy(() => import('views/data/steps')));
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
          element: <DataWeightAndHeight />
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
<<<<<<< HEAD
=======
          path: 'steps',
          element: <DataSteps />
        },
        {
>>>>>>> c748133d2d1d7da3c29f8ea0acb480ccb9447181
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
