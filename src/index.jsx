import React, {Component} from 'react';

// Navigation here
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {NavService} from './config';
import {connect} from 'react-redux';

//Screens
import {AuthStack, AppStack} from './containers';
import SplashScreen from 'react-native-splash-screen';

const Stack = createNativeStackNavigator();

class Navigation extends Component {
  state = {
    ready: false,
    initialRouteName: 'AuthStack',
  };

  componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
    setTimeout(() => {
      const {userData} = this.props;
      if (userData) {
        this.setState({initialRouteName: 'AppStack'});
      }
      this.setState({ready: true});
    }, 2000);
  }

  render() {
    const {initialRouteName, ready} = this.state;
    if (!ready) return null;
    return (
      <NavigationContainer
        ref={ref => NavService.setTopLevelNavigator(ref)}
        screenOptions={{animation: 'simple_push'}}>
        <Stack.Navigator
          screenOptions={{
            contentStyle: {backgroundColor: 'transparent'},
            animation: 'simple_push',
            headerShown: false,
          }}
          initialRouteName={initialRouteName}>
          <Stack.Screen name="AuthStack" component={AuthStack} />
          <Stack.Screen name="AppStack" component={AppStack} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

function mapStateToProps({user: {userData}}) {
  return {
    userData,
  };
}

export default connect(mapStateToProps)(Navigation);
