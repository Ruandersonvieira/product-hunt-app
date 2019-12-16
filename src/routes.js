import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Main from './pages/Main';

export default createAppContainer(
  createStackNavigator(
    {
      Main: Main,
    },
    {
      initialRouteKey: 'Home',
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#da552f',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
  ),
);
