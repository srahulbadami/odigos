import React, { Component } from 'react';
import { AsyncStorage,Button, View, Text, TextInput, StyleSheet ,ActivityIndicator} from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import {Header,Left,Body} from 'native-base';
const Token='token'
const Uname='guest'
const UserImage=''
const user_token = ''
class LoginOrCreateForm extends Component {
 
  constructor(props){
    
    super(props)
    try{
        this.getToken().then(response =>{
         if(response!="False" || !response){
          console.log("RESPONSE IS " + response)
          Actions.main()
         }
         else{
           console.log("LOGOUT")
         }
        })
      

    
    }
    catch(error){
      console.log(error)
    }
    
  }
  static navigationOptions = {
    header: null,
  }

  state = {
    username: '',
    password: '',
    name: '',
    email: '',
    cpassword: '',
    gender: '',
    showMe:false,
    msg:'',
    title:'Login',
  };
  componentWillMount(){
    if (this.props.create) {
      console.log("HERE")
      this.setState({ title: "Odigós -  Signup" });
    }
    else{
      this.setState({ title: "Odigós -  Login" });
    }
  }
  
  
  async storeToken(token){
    try{
      await AsyncStorage.setItem(Token,token);
      console.log("token = " + token)
      console.log("TOKEN + " + Token)
      this.getToken();
    }
    catch(error){

    }
  }
  async getimage(){
    try{
  
      let data = await AsyncStorage.getItem(UserImage);
      console.log(data);
  
    }
    catch(error){
  
    }
  }
  async storeData(name,image){
    try{
      await AsyncStorage.setItem(Uname,name);
    }
    catch(error){

    }
  }
  async storeImage(image){
    try{
      await AsyncStorage.setItem(UserImage,image);
    }
    catch(error){

    }
  }
  async getData(){
    try{
  
      let data = await AsyncStorage.getItem(Uname);
  
    console.log(data)
    }
    catch(error){
  
    }
  }
  async getToken(token){
    try{
      console.log(user_token)
      let tokenn = await AsyncStorage.getItem(Token);

      if (tokenn != null){
        user_token = tokenn;
      }
      else{
        user_token = "False"
      }
      return(user_token)
    }
    catch(error){
      resolve("False")
    }
  }
  onRegnumChange(text) {
    this.setState({ username: text });
  }

  onPasswordChange(text) {
    this.setState({ password: text });
  }

  onEmailChange(text) {
    this.setState({ email: text });
  }

  onUnameChange(text) {
    this.setState({ name: text });
  }
  onGenderChange(text) {
    this.setState({ gender: text });
  }
  onCPasswordChange(text) {
    this.setState({ cpassword: text });
  }
  handleRequest() {
    this.setState({ showMe: true });
    const endpoint = this.props.create ? 'signup' : 'authenticate';
    const payload = { username: this.state.username, password: this.state.password } 
    if(endpoint=="authenticate"){
      if(this.state.username==""||this.state.password==""){
        this.setState({msg:"Please Fill Both of the Fields !"});

        this.setState({ showMe: false });
      }
      else{
      axios.post(`https://barks.herokuapp.com/authenticate/`, payload).then(response => {
        console.log(response.data)
        if(response.data.error=="not_found"){
          this.setState({msg:"User Not Found !"});
          this.setState({ showMe: false })
        }
        else if(response.data.error=="error"){
          this.setState({msg:"There was an error with the server. Please Try again later !"});
          this.setState({ showMe: false });
        }
        else if(response.data.error=="incorrect"){
          this.setState({msg:"Your credentials are incorrect !"});
          this.setState({ showMe: false });
        }
        else if(response.data.is_verified==false){
          this.setState({msg:"You have not yet verified your email !"});
          this.setState({ showMe: false });
        }
        else{
        const user_token = (response.data).token;
        // We set the returned token as the default authorization header
        axios.defaults.headers.common.Authorization = `Token ${user_token}`;

        // Navigate to the home screen
        let auth_token = (response.data).token;
        let uname = (response.data).name;
        let image = response.data.Image;
        this.storeData(uname,image);
        this.storeImage(image);
        this.storeToken(auth_token);
        this.getData();
        //save token
        Actions.main({token:auth_token,name:uname});
        }
      })
      .catch(error => {
        console.log(error)
        this.setState({msg:"There was an error with the server. Please Try again later !"});
        this.setState({ showMe: false });
      });
    }
  }
  else{
    console.log(this.state.password)
    console.log(this.state.cpassword)
    if(this.state.password==''||this.state.cpassword==''||this.state.gender==''||this.state.email==''||this.state.username==''||this.state.name==''){
      this.setState({ msg: "Please Enter all the Fields to continue !" });
    }
    else if(this.state.password!=this.state.cpassword){
      this.setState({ msg: "Password Dosen't Match" });
    }
    else{
    const payload_signup = { roll_number: this.state.username, password1: this.state.password,email: this.state.email, password2: this.state.cpassword,gender: this.state.gender, username: this.state.name } 
    this.setState({ showMe: true });
    axios.post(`https://barks.herokuapp.com/signup/`, payload_signup).then(response => {
        const user_token = (response.data).signal;
        if(user_token=="success"){
          console.log("SUCESS NOW TO AUTH")
          this.setState({ showMe: false });
          Actions.login({msg:"Check Your Email for a Verification Link "});
        }
        else{
          Actions.login({msg:"There was some error"});
        }
        this.setState({ showMe: false });
      })
      .catch(error => console.log(error));
  }
}
  }
  renderCreateForm() {
    const { fieldStyle, textInputStyle } = styles;
    if (this.props.create) {
      return (
        <View style={{ flex:1,alignSelf: 'stretch'}}>
        <View style={fieldStyle}>
            <TextInput
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Confirm Password"
              onChangeText={this.onCPasswordChange.bind(this)}
              style={textInputStyle}
            />
          </View>

        <View style={fieldStyle}>
            <TextInput
              placeholder="Email"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={this.onEmailChange.bind(this)}
              style={textInputStyle}
            />
          </View>
          <View style={fieldStyle}>
            <TextInput
              placeholder="Gender(M or F)"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={this.onGenderChange.bind(this)}
              style={textInputStyle}
            />
          </View>
          <View style={fieldStyle}>
            <TextInput
              placeholder="Username"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={this.onUnameChange.bind(this)}
              style={textInputStyle}
            />
          </View>
          
         </View> 
      );
    }
  }

  renderButton() {

    const buttonText = this.props.create ? 'Register' : 'Login';

    return (
      <Button title={buttonText} onPress={this.handleRequest.bind(this)}/>
    );
  }


  renderCreateLink() {
    if (!this.props.create) {
      const { accountCreateTextStyle } = styles;
      return (
        <View style={{flex:2, flexDirection:'column'}}>
        <Text style={accountCreateTextStyle}>
        <Text style={{ color: 'grey' }} onPress={() => Actions.register()}>
            {' Sign-up '}
          </Text>
          <Text style={{ color: 'grey' }} >
            {' / '}
          </Text>
          <Text style={{ color: 'grey' }} onPress={() => Actions.fpregno()}>
            {' Forget Password ?'}
          </Text>
         
        </Text>
        </View>
      );
  }
}

  render() {

    const {
      formContainerStyle,
      fieldStyle,
      textInputStyle,
      buttonContainerStyle,
      accountCreateContainerStyle
    } = styles;
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Header>
          <Body>
                    <Text style={{ marginLeft: 0,fontSize:20,color:"#fff"}}>{this.state.title}</Text>
                </Body>
            </Header>
        <View style={formContainerStyle}>
          <View style={fieldStyle}>
            <TextInput
              placeholder="Registration Number"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={this.onRegnumChange.bind(this)}
              style={textInputStyle}
            />
          </View>
          <View style={fieldStyle}>
            <TextInput
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Password"
              onChangeText={this.onPasswordChange.bind(this)}
              style={textInputStyle}
            />
          </View>
          {this.renderCreateForm()}
        </View>
        <View style={buttonContainerStyle}>
          {this.renderButton()}
          <View style={accountCreateContainerStyle}>
            {this.renderCreateLink()}
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
  formContainerStyle: {
    flex: 2,
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
    justifyContent: 'center'
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


export default LoginOrCreateForm;
