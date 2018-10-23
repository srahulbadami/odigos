import React, {Component} from 'react';
import { AsyncStorage,Button, View, Text, TextInput, StyleSheet ,ActivityIndicator,StatusBar} from 'react-native';
import { Header, Body, Content, Left, Icon, Right } from 'native-base';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';

class forget_regno extends Component {


  state = {
    regno: '',
    msg:'',
    showMe:false
  }
  onRegnumChange(text) {
    this.setState({ regno: text });
  }
  
  handleRequest() {
    const payload = { roll_number: this.state.regno} 
      if(this.state.regno==""){
        this.setState({msg:"Please Fill the Registration Number !"});
        this.setState({ showMe: false });

      }
      else{
      this.setState({ showMe: true });
      axios.post(`https://barks.herokuapp.com/password/`, payload).then(response => {
      if(response.data.signal=="error"){
        this.setState({msg:"Registration Number not found. Please try to Signup !"});
      }
      else{
        console.log(response.data.signal)
        Actions.fpotp({otp:response.data.signal,regno:this.state.regno})
      }
        this.setState({ showMe: false });
      })
      .catch(error =>{
        console.log(error)
      
        this.setState({msg:"There was an error with the server. Please Try again later !"});
        this.setState({ showMe: false });
      });
    }
  }
  render() {
    return (
      <View style={styles.container}>
            <StatusBar backgroundColor="#0091ea" barStyle="light-content" />
            <Header>
                <Body>
                <Text style={{ marginLeft: 0,fontSize:20,color:"#fff"}}>Forget Password</Text>
                </Body>
                <Right />
                </Header>
                <Text>Locked out of your Account ?</Text>
                <View style={styles.formContainerStyle}>
          <View style={styles.fieldStyle}>
            <TextInput
              placeholder="Registration Number"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={this.onRegnumChange.bind(this)}
              style={styles.textInputStyle}
            />
          </View>
          <View style={styles.buttonContainerStyle}>
          <Button title="Submit Registration" onPress={this.handleRequest.bind(this)}/>
          </View>
          <Text style={{ color: 'red',justifyContent:'center',flex: 1,
    flexDirection: 'column' }} >
            {this.state.msg}{this.props.msg}
          </Text>
          </View>
          {
        this.state.showMe ? <ActivityIndicator size="large" color="#0000ff" style={{flex:1,justifyContent:'center'}}/>
        :
          <View>
          </View>
          }
            </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#fff',
    
    flex:1
  },
  welcome: {
      textAlign: 'center',
  },
  formContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputStyle: {
    flex: 1,
    padding: 15
  },
  fieldStyle: {
    flexDirection: 'row',

    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    padding: 25
  },
  accountCreateTextStyle: {
    color: 'black'
  },
  accountCreateContainerStyle: {
    padding: 25,
    alignItems: 'center'
  }
});

export default forget_regno;
