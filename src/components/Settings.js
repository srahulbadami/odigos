import React, {Component} from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import { Header, Body, Title, Content, Left, Icon, Right } from 'native-base';


export default class Settings extends Component <{}> {
    render() {
        return(
            <View style={styles.container}>
            <StatusBar backgroundColor="#0091ea" barStyle="light-content" />
            <Header>
                <Left><Icon name="menu" style={{ color: 'white'}} onPress={() => this.props.navigation.openDrawer()} /></Left>
                <Body>
                    <Title style={{ marginLeft: -20,fontSize:20}}>Settings</Title>
                </Body>
                <Right />
            </Header>
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
  });
  