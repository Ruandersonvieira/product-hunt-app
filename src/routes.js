import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Main from './pages/Main';
import Product from './pages/Product';

export default createAppContainer(
  createStackNavigator(
    {
      Main: Main,
      Product: Product,
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
