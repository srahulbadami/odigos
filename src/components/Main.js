import React, {Component} from 'react';
import { Actions } from 'react-native-router-flux';
import {StyleSheet, Text, View, StatusBar, FlatList, ActivityIndicator, Image } from 'react-native';
import { Header, Body, Title, Content, Left, Icon, Right } from 'native-base';
import {createBottomTabNavigator} from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';
import { List, ListItem, SearchBar, Avatar } from "react-native-elements";
import { MapView } from 'expo';
import { StackNavigator } from 'react-navigation';
import ImagePicker from 'react-native-image-picker';

export class News extends Component <{}> {
    static navigationOptions = {
        header: null,
        tabBarIcon:(
            <FontAwesome name="home" size={24} style={{ color: '#0064b7' , justifyContent:'center'}} />
        )
    }   
    
    render() {
        return (
            <View style={styles.container}>
          <StatusBar backgroundColor="#0091ea" barStyle="light-content" hidden={true} />   
            <Header>
                <Left><Icon name="menu" style={{ color: 'white'}} onPress={() => this.props.navigation.openDrawer()} /></Left>
                <Body>
                    <Title style={{ marginLeft: -20,fontSize:20}}>Home</Title>
                </Body>
                <Right />
            </Header>
            <Text style={styles.logo}>
            id youtube</Text>
            </View>
        );
    }
}
export class Events extends Component <{}> {
    constructor(props) {
        super(props);
    
        this.state  = {
          loading: false,
          data: [],
          error: null,
          refreshing: false,
          base_url: "http://barks.herokuapp.com/"
        }
      }

  componentDidMount() {
    this.fetchDataFromApi();

  }

  fetchDataFromApi = ()  => {
    const url = "http://barks.herokuapp.com/api/v1/events/";
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res.results,
          error: null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading : false });
      })
  };

  handleRefresh = () => {
    this.setState(
      {
        refreshing: true
      },
      () => {
        this.fetchDataFromApi();
      }
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%",
          marginTop: "3%"
        }}
      />
    );
  };

    static navigationOptions = {
        header: null,
        tabBarIcon:(
            <FontAwesome name="home" size={24} style={{ color: '#0064b7' , justifyContent:'center'}} />
        )
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
          <StatusBar backgroundColor="#0091ea" barStyle="light-content" hidden={true} />   
            <Header>
                <Left><Icon name="menu" style={{ color: 'white'}} onPress={() => this.props.navigation.openDrawer()} /></Left>
                <Body>
                    <Title style={{ marginLeft: -20,fontSize:20}}>Events</Title>
                </Body>
                <Right />
            </Header>
            {
        this.state.data==""?  <View style={{flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 30}}> 
            <Text style={{fontSize: 28,
        color: 'black',
        marginTop: 12,
        textAlign: 'center'}}>{this.state.data } No Events Found . Care to add an Event ?</Text>
            </View>
        :
          <View>
            <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              onPress={() => this.props.navigation.navigate('DetailScreen',
              {name: `${item.Name}`, menu: `${item.Description}`,
              img: `${item.image}`,
              address: `${item.pub_date}`})}
              avatar={<Avatar
                      source={{uri: `${item.image}`}}
                      onPress={() => console.log("Works!")}
                      containerStyle={{marginBottom: 2}}
                      avatarStyle={{resizeMode: "cover"}}
                      width={128}
                      height={128}
                />}
              title={`${item.Name}`}
              titleStyle={{ fontSize: 20}}
              titleContainerStyle = {{ marginLeft: 80 }}
              subtitle={<View style={styles.subtitleView}>
            <Text style={styles.menuText}>{item.event_date}</Text>
            <Text style={styles.locText}>Posted by -:{item.user.username}</Text>
            </View>}
              containerStyle={{ borderBottomWidth: 0, marginBottom: 20 }}
            />
          )}
          keyExtractor={item => item.Name}
          ItemSeparatorComponent={this.renderSeparator}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}

        />
      </List>
          </View>
          }
            </View>
        );
    }
}
export class Chat extends Component <{}> {
    static navigationOptions = {
        header: null,
        tabBarIcon:(
            <FontAwesome name="home" size={24} style={{ color: '#0064b7' , justifyContent:'center'}} />
        )
    }
    render() {
        return (
            <View style={styles.container}>
          <StatusBar backgroundColor="#0091ea" barStyle="light-content" hidden={true} />   
            <Header>
                <Left><Icon name="menu" style={{ color: 'white'}} onPress={() => this.props.navigation.openDrawer()} /></Left>
                <Body>
                    <Title style={{ marginLeft: -20,fontSize:20}}>Chat</Title>
                </Body>
                <Right />
            </Header>
            <Text style={styles.logo}>
            id youtube</Text>
            </View>
        );
    }
}
export class Confession extends Component <{}> {
    static navigationOptions = {
        header: null,
        tabBarIcon:(
            <FontAwesome name="home" size={24} style={{ color: '#0064b7' , justifyContent:'center'}} />
        )
    }
    render() {
        return (
            <View style={styles.container}>
          <StatusBar backgroundColor="#0091ea" barStyle="light-content" hidden={true} />   
            <Header>
                <Left><Icon name="menu" style={{ color: 'white'}} onPress={() => this.props.navigation.openDrawer()} /></Left>
                <Body>
                    <Title style={{ marginLeft: -20,fontSize:20}}>Confession</Title>
                </Body>
                <Right />
            </Header>
            <Text style={styles.logo}>
            id Confession</Text>
            </View>
        );
    }
}
export class Updates extends Component <{}> {
    static navigationOptions = {
        header: null,
        tabBarIcon:(
            <FontAwesome name="home" size={24} style={{ color: '#0064b7' , justifyContent:'center'}} />
        )
    }
    render() {
        return (
            <View style={styles.container}>
          <StatusBar backgroundColor="#0091ea" barStyle="light-content" hidden={true} />   
            <Header>
                <Left><Icon name="menu" style={{ color: 'white'}} onPress={() => this.props.navigation.openDrawer()} /></Left>
                <Body>
                    <Title style={{ marginLeft: -20,fontSize:20}}>Updates</Title>
                </Body>
                <Right />
            </Header>
            <Text style={styles.logo}>
            id Updates</Text>
            </View>
        );
    }
}
export default createBottomTabNavigator({
    News: {
        screen:News,navigationOptions:{
            tabBarIcon: ({ tintColor }) => (
                <FontAwesome name="home" size={32} color={tintColor}/>           
                )}
    },
    Events: {
        screen:Events,navigationOptions:{
            tabBarIcon: ({ tintColor }) => (
                <FontAwesome name="calendar" size={24} color={tintColor}/>    
            )
        }
    },
    Chat: {
        screen:Chat,navigationOptions:{
            tabBarIcon: ({ tintColor }) => (
                <FontAwesome name="comments" size={32} color={tintColor}/>    
            )
        }
    },
    Confession: {
        screen:Confession,navigationOptions:{
            tabBarIcon: ({ tintColor }) => (
                <FontAwesome name="home" size={24} color={tintColor}/>    
            )
        }
    },
    Updates: {
        screen:Updates,navigationOptions:{
            tabBarIcon: ({ tintColor }) => (
                <FontAwesome name="info-circle" size={28} color={tintColor}/>    
            )
        }
    } 
},{ 
    initialRouteName: 'News',
    navigationOptions: {
        tabBarVisible:true
    },
        tabBarOptions:{
            activeTintColor:'#0064b7',
            inactiveTintColor:'#2962ff'
        }
}); 

  
  const styles = StyleSheet.create({
    logo: {
        flex: 3,
        flexDirection:'column',
        color:'#0000ff', 
        fontSize:45,
        margin: (0,0,0,10),
        marginLeft: 80,
        textAlign:'left',
        justifyContent:'center'
        
      },
      container: {
        backgroundColor:'#fff',
        flex: 1
      },
      Navbar:{
        height:65,
        backgroundColor:'#0064b7',
        elevation: 5
      },
     subtitleView: {
      flexDirection: 'column',
      paddingLeft: 10,
      paddingTop: 5,
      marginLeft: 80
    },
    menuText: {
      paddingLeft: 10,
      color: 'grey'
    },
    locText: {
      paddingLeft: 10,
      color: 'grey',
      marginTop: 6,
      fontSize: 12
    },
    titleText: {
      fontWeight: 'bold'
    },
    restaurantImage: {
      width: 600,
      height: 800
    }
  });