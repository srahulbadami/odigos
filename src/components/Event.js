import React from 'react';
import { StyleSheet, Text, FlatList, ActivityIndicator, View, Image } from 'react-native';
import { List, ListItem, SearchBar, Avatar } from "react-native-elements";
import { StackNavigator } from 'react-navigation';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
    
        this.state  = {
          loading: false,
          data: [],
          error: null,
          refreshing: false,
          base_url: "http://192.168.43.125:8000/"
        }
      }
    
    componentDidMount() {
    this.fetchDataFromApi();
    
    }
    
    fetchDataFromApi = ()  => {
    const url = "http://192.168.43.125:8000/api/v1/events/";
    
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
           
            <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              onPress={() => this.props.navigation.navigate('Detail',
              {name: `${item.Name}`, menu: `${item.menu}`,
              img: `${this.state.base_url}${item.photo}`,
              address: `${item.address}`})}
              avatar={<Avatar
                      source={{uri: `${item.image}`}}
                      onPress={() => console.log("Works!")}
                      containerStyle={{marginBottom: 2}}
                      avatarStyle={{resizeMode: "cover"}}
                      width={128}
                      height={128}
                />}
              title={`${item.Name}`}
              titleStyle={{ fontSize: 16}}
              titleContainerStyle = {{ marginLeft: 120 }}
              subtitle={<View style={styles.subtitleView}>
            <Text style={styles.menuText}>{item.event_date}</Text>
            <Text style={styles.locText}>Posted by -:{item.user.username}</Text>
            </View>}
              containerStyle={{ borderBottomWidth: 0, marginBottom: 20 }}
            />
          )}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
    
        />
      </List>
            </View>
        );
    }
}

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
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      dContainer: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 30
      },
       subtitleView: {
        flexDirection: 'column',
        paddingLeft: 10,
        paddingTop: 20,
      },
      dTitleText: {
        fontSize: 28,
        color: 'black',
        marginTop: 12,
        textAlign: 'center'
      },
      menuText: {
        paddingLeft: 10,
        color: 'grey'
      },
      dMenuText: {
        fontSize: 16,
        paddingLeft: 10,
        color: 'grey',
        marginTop: 12
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
      },
      detailViewContainer: {
        paddingLeft: 20,
      }
  });