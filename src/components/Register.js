import React, { Component } from 'react';
import { View, Text,StatusBar } from 'react-native';
import LoginOrCreateForm from './common/LoginOrCreateForm';

class Register extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
                <StatusBar backgroundColor="#0091ea" barStyle="light-content" hidden={true} />   

        <LoginOrCreateForm create/>
      </View>
    );
  }
}

export default Register;
