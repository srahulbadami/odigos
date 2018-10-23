import React, { Component } from 'react';
import { View, Text ,StatusBar} from 'react-native';
import LoginOrCreateForm from './common/LoginOrCreateForm';


class Login extends Component {
  state = {
    msg: this.props.msg,
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
                <StatusBar backgroundColor="#0091ea" barStyle="light-content" hidden={true} />   

        <LoginOrCreateForm msg={this.state.msg} />
      </View>
    );
  }
}

export default Login;
