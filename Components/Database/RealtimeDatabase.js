import React from 'react';
import { View, Text,Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { firebaseApp } from './FirebaseConfig';
import { TextInput } from 'react-native-gesture-handler';

export default class RealtimeDatabase extends React.Component {
    constructor (props){
        super(props);
        this.itemRef = firebaseApp.database()
        this.state = {
            textName: '',
            textPrice: '',
            Status: ''        }
    }
    

    //add Value to Database
    setDB(){
        this.itemRef.ref('tblRoom').push({
          categoriesRoom: this.state.textName,
          nameRoom: this.state.textPrice,
          status: this.state.textStatus
        });
        this.setState({
            // textName: '',
            // textPrice: ''
        })

    }
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Hello</Text>
        <TextInput
      style={{  padding:10,width:'80%', borderColor: 'gray', borderWidth: 1}}
      onChangeText={(textName) => this.setState({textName})}
      value={this.state.textName}
        />

        <TextInput
      style={{ padding:10,width:'80%', borderColor: 'gray', borderWidth: 1 }}
      onChangeText={(textPrice) => this.setState({textPrice})}
      value={this.state.textPrice}
        />
        <TextInput
      style={{ padding:10,width:'80%', borderColor: 'gray', borderWidth: 1 }}
      onChangeText={(textStatus) => this.setState({textStatus})}
      value={this.state.textStatus}
        />
        <Button
        title= 'Upload data'
        onPress= { () =>{ this.setDB()} }  />
        </View>
      );
    }
  }
