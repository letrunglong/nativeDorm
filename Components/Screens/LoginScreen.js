import React from 'react';
import { View, Text, Alert,StyleSheet, ImageBackground, Button,Modal, TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { TextInput} from 'react-native-gesture-handler';
import { firebaseApp } from '../Database/FirebaseConfig';

const image = { uri: "https://thumbs.dreamstime.com/b/modern-instagram-stories-template-blog-sales-pink-background-light-watercolor-hand-drawn-copy-space-text-online-177860362.jpg" };
export default class LoginScreen extends React.Component {
  constructor (props){
    super(props);
    this.itemRef = firebaseApp.database()
    this.state = {
      email: '',
      password: '',
      fullName: '',
      show:false
    }
  }
  setDb(){
    this.itemRef.ref('tblUsers').push({
      userName: this.state.email,
      password: this.state.password,
      fullName: this.state.fullName,
      status: "user"
  });
  }
  Signin(){
    firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then( () => {
      Alert.alert(
        "Alert Title",
        "Sign In Success" + this.state.email,
        [
          {
            text: "Cancel", onPress: () => console.log("Cancel Pressed"),style: "cancel" },
          { text: "OK", onPress: () => this.props.navigation.navigate('Home') }
        ],
        { cancelable: false }
      )
        this.setState({
          email: '',
          password: ''
        })
    })
    
    
    .catch(function(error) {
      Alert.alert(
        "Alert Title",
        "Sign In Fail",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      )
    })
  }
  regis(){

    firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then( () => {
      Alert.alert(
        "Alert Title",
        "Regis Success \n" + this.state.email,
        [
          { text: "OK", onPress: () => this.setDb(this.state.email, this.state.password, this.state.fullName)}
        ],
        { cancelable: false }
      )
      // this.setState({
      //   email: '',
      //   password: '',
      //   fullName: ''
      // })
    })
    .catch(function(error) {
      Alert.alert(
        "Alert Title",
        "Fail",
        [

          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      )
    })
  }


  render() {
    return (
      <View style={styles.container}>
      <View style = {{flex: 1}}>
            <Text style= {{fontWeight: 'bold',fontSize: 30, marginLeft: 100,color:'black', opacity: 0.7,marginTop: 50}}>Login Screen</Text>
            <TextInput
            placeholder = "input your email"
            placeholderTextColor = '#b3b3b3'
            style={styles.textInput1}
            onChangeText={email => this.setState({email})}
            value={this.state.email}
            />
            <TextInput
            placeholder = "password"
            placeholderTextColor = '#b3b3b3'
            style={styles.textInput2}
            onChangeText={password => this.setState({password})}
            value={this.state.password}
            secureTextEntry= {true}
            />
            </View>
        <View style = {styles.viewBut}>
          <View style = {styles.but1}>
            <Button
          onPress ={ () => this.Signin()}
          title= 'Login'/>
          </View>
          <View style= {{flexDirection: 'row', alignItems: 'center', alignContent: 'center', marginLeft: 45,marginTop: 20, marginBottom: 30}}>
            <View style = {styles.ke}/>
            <Text style = {styles.or}>OR</Text>
            <View style = {[styles.ke,{}]}/>
            <Modal
          transparent = {true}
          visible = {this.state.show}
          animationType= 'slide'>
            <View style ={{backgroundColor : '#000000aa', flex:1}}>
              <View style = {{backgroundColor: '#FFFFFF',margin: 30, padding: 10, borderRadius:5, flex:1}}>
                <View style ={{flex:1}}>
                  <TextInput
                  placeholder = "input your email"
                placeholderTextColor = '#b3b3b3'
                style={styles.textInput1}
                onChangeText={email => this.setState({email})}
                  value={this.state.email}
                  />
                  <TextInput
                  placeholder = "password"
                  placeholderTextColor = '#b3b3b3'
                  style={styles.textInput2}
                  onChangeText={password => this.setState({password})}
                  value={this.state.password}
                  secureTextEntry= {true}
                  />
                  <TextInput
                  placeholder = "your full name"
                placeholderTextColor = '#b3b3b3'
                style={styles.textInput3}
                onChangeText={fullName => this.setState({fullName})}
                  value={this.state.fullName}
                  />
                      <View style = {{marginTop:30}}>
                        <View style ={{marginBottom:10}}>
                          <Button title = 'Register'  onPress={() => this.regis()}/>
                        </View>
                        
                        <Button title ='Hide Modal' onPress ={ () => {this.setState({show:false})}}/>            
                      </View>
              </View>
                  
              
                
            </View>

            </View>
          </Modal>
          </View>
          <View style = {styles.but1}><Button
          //  onPress={() => this.props.navigation.navigate('Register')}
          onPress ={ () => {this.setState({show:true})}}
           title= 'Register'/></View>
          
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF'
  },
  headTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 50
  },
  textInput1: {
    borderWidth: 1,
    borderColor: 'gray',
    color: 'red',
    marginTop: 50,
    padding: 5,
    width: '80%',
    backgroundColor: '#FAFAFA',
    borderRadius: 4,
    marginLeft: 30
  },
  textInput2: {
    borderWidth: 1,
    color: 'red',
    marginTop: 20,
    padding: 5,
    backgroundColor: '#FAFAFA',
    borderRadius: 4,
    width: '80%',
    marginLeft: 30,
    borderColor: 'gray',
  },
  textInput3: {
    borderWidth: 1,
    borderColor: 'gray',
    color: 'red',
    marginTop: 20,
    padding: 5,
    width: '80%',
    backgroundColor: '#FAFAFA',
    borderRadius: 4,
    marginLeft: 30
  },
  viewBut: { 
    flex:1,
    marginTop: 50
  },
  but1: {
    width: '80%',
    marginLeft: 30,
    marginBottom: 10,
    padding: 5
  },
  but2:{

  },
  ke: {
    width: "35%",
    height: 0,
    borderTopWidth: 1,
    borderColor: '#888888'
  },
  or:{
    marginLeft: 10,
    marginRight: 10,
    opacity: 0.8
  }
});
