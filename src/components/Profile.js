import React, {Component} from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import { Header, Body, Title, Content, Left, Icon, Right } from 'native-base';

import { AsyncStorage, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
const Token='token'

export default class Profile extends Component <{}> {
    constructor()
{
  super()
  try{
    this.getToken();
  }
  catch(error){
    console.log(error)
    Actions.auth()
  }
}  
async getToken(token){
    try{
      let tokenn = await AsyncStorage.getItem(Token);
      console.log("AA GAYA TOKEN " + tokenn)
    }
    catch(error){

    }
  }
  async removeItemValue(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    }
    catch(exception) {
      return false;
    }
  }
  handleRequest() {
    // This request will only succeed if the Authorization header
    // contains the API token
    this.removeItemValue(Token);
    //local directory delete
    Actions.auth()
  }
    render() {
        return(
            <View style={styles.container}>
            <StatusBar backgroundColor="#0091ea" barStyle="light-content" />
            <Header>
                <Left><Icon name="menu" style={{ color: 'white'}} onPress={() => this.props.navigation.openDrawer()} /></Left>
                <Body>
                    <Title style={{ marginLeft: -20,fontSize:20}}>Profile</Title>
                </Body>
                <Right />
            </Header>
            <View style={styles.buttonContainerStyle}>
        <Button title="Logout" onPress={this.handleRequest.bind(this)}/>
        <Text>{this.props.token}</Text>
      </View>
            </View>
        )
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
    buttonContainerStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'white'
      }
  });
  