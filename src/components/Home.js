import React, { Component } from 'react';
import { AsyncStorage,Text,View, Button, StyleSheet,StatusBar,Image,TouchableHighlight,ImageEditor,Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Settings from './Settings';
import Main from './Main';
import Profile from './Profile';
import {createDrawerNavigator, DrawerItems} from 'react-navigation'
import {Container,Header,Content,Body} from 'native-base';
import axios from 'axios';
const Token='token'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons'
import DetailScreen from './EventDetails';
import ImgToBase64 from 'react-native-image-base64';

import {ImagePicker} from 'expo';
token = ''
const Uname='guest'
const UserImage = ''
UserName = ''
img = ''
uri: ''

async function uploadImageAsync(uri,token) {
  let apiUrl = 'https://barks.herokuapp.com/add_avatar/';

  // Note:
  // Uncomment this if you want to experiment with local server
  //
  // if (Constants.isDevice) {
  //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
  // } else {
  //   apiUrl = `http://localhost:3000/upload`
  // }

  let uriParts = uri.split('.');
  let fileType = uriParts[uriParts.length - 1];

  let formData = new FormData();
  formData.append('photo', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });
  formData.append('token',token)
  let options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };

  return fetch(apiUrl, options);
}
_pickImage = async () => {
  
  let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [4, 3],
  });
  console.log("IMAGE IS = "+JSON.stringify(result))
  if (result.cancelled) {
    console.log('got here');
    return;
  }

  let resizedUri = await new Promise((resolve, reject) => {
    ImageEditor.cropImage(result.uri,
      {
        offset: { x: 0, y: 0 },
        size: { width: result.width, height: result.height },
        resizeMode: 'contain',
      },
      (uri) => resolve(uri),
      () => reject(),
    );
  });
  let tokenn = await AsyncStorage.getItem(Token);
  console.log(tokenn)
  Alert.alert(
    'Updating Profile Image !',
    '',
    [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ],
    { cancelable: false }
  )
  uploadResponse = await uploadImageAsync(resizedUri,tokenn);
  uploadResult = await uploadResponse.json();
  console.log(uploadResult)
  if(uploadResult.signal!='failed'){
    img=uploadResult.signal

    await AsyncStorage.setItem(UserImage,uploadResult.signal);
    Actions.main()
  }
  
  
  // this gives you a rct-image-store URI or a base64 image tag that
  // you can use from ImageStore
  
};

class Home extends Component {

state = {
    fontLoaded: false,
    name:'',
    data:'',
    image:'',
  }
  

  async componentWillMount() {
    await Expo.Font.loadAsync({
        'cabin-font': require('./../../assets/fonts/CabinSketch-Bold.ttf'),
        'Roboto_medium': require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ fontLoaded: true });
  }
  constructor()
{
  super();
  this.getToken();
  this.getData();
  this.getimage();
  
}  
static navigationOptions = {
  header: null,
}
async getData(){
  try{

    let data = await AsyncStorage.getItem(Uname);
    UserName = data;

    this.setState({ name: data });

  }
  catch(error){

  }
}async getimage(){
  try{
    let data = await AsyncStorage.getItem(UserImage);
    img = data;

    this.setState({ image: data });
  }
  catch(error){
  }
}
async getToken(token){
    try{
      let tokenn = await AsyncStorage.getItem(Token);
      token = tokenn
    }
    catch(error){

    }
  }

  render() {
    const { buttonContainerStyle } = styles;
    if (this.state.fontLoaded==false) {
      return <Expo.AppLoading />;
    }
    return (
      <View style={buttonContainerStyle}>         
       <StatusBar backgroundColor="#0091ea" barStyle="light-content" hidden={true} />   

       <MyApp />
      </View>
    );
  }
}
const CustomDrawerContentComponent = (props) =>(
  <Container>
      <Header style={{height:200}}>
          <Body style={{ alignItems: 'center'}} >
          {
        img==null ?  <FontAwesome name="user-circle" size={120} style={{ color: 'white' , justifyContent:'center'}} />
        :   <View>
          <TouchableHighlight style={ styles.imageContainer }>
            <Image style={ styles.image } source={{ uri: img }} />
       </TouchableHighlight> 
       <FontAwesome name="camera" size={25} style={{ color: 'white' , justifyContent:'center',marginLeft: 100,marginTop:100, position:'absolute' }} onPress={_pickImage} />
       </View>
          }
         
          <Text style={{ color: 'white' , justifyContent:'center',fontFamily: 'cabin-font', fontSize:30,marginTop: 10}} >
          {UserName}
          </Text>
          </Body>
      </Header>
      <Content>
          <DrawerItems {...props} />
      </Content>
  </Container>
)
const MyApp = createDrawerNavigator({
  Home: {
      screen: Main,navigationOptions:{
          drawerIcon: ({ tintColor }) => (
              <Icon name="ios-home" size={32} style={{ color: '#0064b7'}} />
          )
      }
  },
  Profile: {
    screen: Profile,navigationOptions:{
      drawerIcon: ({ tintColor }) => (
          <Icon name="ios-person" size={32} style={{ color: '#0064b7'}} />
      )
  }
},
DetailScreen: { screen: DetailScreen },
  Settings: {
      screen: Settings,navigationOptions:{
        drawerIcon: ({ tintColor }) => (
            <Icon name="ios-settings" size={32} style={{ color: '#0064b7'}} />
        )
    }
  }
},
{
  initialRouteName:'Home',
  contentComponent:CustomDrawerContentComponent,
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle'
})


const styles = StyleSheet.create({
  buttonContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white'
  },

  imageContainer: {
    height:128,
    width: 128,
    borderRadius: 64
  },
  image: {
    height:128,
    width: 128,
    borderRadius: 64
  },
    loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Home;
