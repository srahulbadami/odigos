import React from 'react';
import { Scene, Stack, Router, Actions } from 'react-native-router-flux';
import { StyleSheet, StatusBar } from 'react-native';
import Login from './components/Login';
import Register from './components/Register';
import forget_regno from './components/ForgetPassword_regno';
import forget_otp from './components/ForgetPassword_otp';
import Home from './components/Home';
import Events from './components/Main';
import DetailScreen from './components/EventDetails';


const RouterComponent = () => {
  return (
    <Router>
      <Stack hideNavBar key="root">
        <Stack
          key="auth"
          type="reset"
          navigationBarStyle={style.navBarStyle}
          titleStyle={style.titleStyle}
        >
          <Scene
            title="Sign In"
            key="login"
            component={Login}
            hideNavBar={true}
            initial
          />
          <Scene
            title="Register"
            key="register"
            headerMode= "none"
            hideNavBar={true}
            component={Register}
          />  
          <Scene
            title="Forget Password"
            key="fpregno"
            headerMode= "none"
            hideNavBar={true}
            component={forget_regno}
          />  
          <Scene
            title="Forget Password"
            key="fpotp"
            headerMode= "none"
            hideNavBar={true}
            component={forget_otp}
          />  
        </Stack>
        <Stack
          key="main"
          type="reset"
          navigationBarStyle={style.navBarStyle}
          hideNavBar={true}
          titleStyle={style.titleStyle}
        >
          <Scene
            title="Home"
            key="home"
            component={Home}
            hideNavBar={true}
            initial
          />
          <Scene
           title="EventsDetails"
           key="event_details"
           component={DetailScreen}
           hideNavBar={true}
         />
         <Scene
          title="Events"
          key="events"
          component={Events}
          hideNavBar={true}
        />
        </Stack>
      </Stack>
    </Router>
  );
};


const style = StyleSheet.create({
  navBarStyle: {
    top: StatusBar.currentHeight
  },
  titleStyle: {
    flexDirection: 'row',
    width: 200
  }
});

export default RouterComponent;
