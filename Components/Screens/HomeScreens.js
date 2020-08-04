import React from 'react';
import { View, Text,Button,Modal, ListView ,StyleSheet,StatusBar} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { functions } from 'firebase';
import {firebaseApp} from '../Database/FirebaseConfig';
import Icon from 'react-native-ionicons';

export default class HomeScreen extends React.Component{
  constructor (props) {
    super(props);
    this.itemRef = firebaseApp.database();
    this.state = {
      show: false,
      data:null,
      rooms: null,
      cate: null,
      background: "white"
    }
  }
  loadFlatlish(){
    var that=this;
    let items= [];
      this.itemRef.ref('tblRoom').on('value',function(snapshot){
      snapshot.forEach(function(childSnapshot){
        var childData = childSnapshot.val();
        items.push({
          categoriesRoom: childData.categoriesRoom,
          nameRoom: childData.nameRoom,
          status: childData.status,
          owner: childData.owner,
          startdate: childData.startdate,
          price: childData.price,
          amountOfPeople: childData.amountOfPeople
        });
        that.setState({
          data: items,
        })
      });
    });
  }
  navRoom(item){
    this.props.navigation.jumpTo('Details',{...item});
  }
  componentDidMount(){
    this.loadFlatlish()
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 }}>
        <StatusBar backgroundColor ='#3C7385'/>
        <Text style= {{marginBottom:20,marginTop:60,fontSize:18, fontWeight:'bold',color:'red',opacity:0.7}}>DANH SÁCH PHÒNG</Text>
        <View style ={{width:'100%',height:'100%'}}>
          <FlatList
          numColumns= {2}
            style={{width:'100%',height:'100%'}}
            contentContainerStyle={{alignItems:'center',justifyContent:'space-around'}}
            data={this.state.data}
            renderItem={({item,index})=>
            <TouchableOpacity
            onPress = {()=>{ this.navRoom({...item})}}>
              
              <View style ={{margin: 10,borderWidth: 1,padding:10,}}>
                      <View style= {{flexDirection:'row',marginBottom:5}}>
                        <Text style ={{fontSize:15,}}>Phòng: {item.nameRoom}</Text>
                      </View>
                      <View style= {{flexDirection:'row',marginBottom:5}}>
                        <Text style ={{fontSize:15,}}>Dãy: {item.categoriesRoom}</Text>
                      </View>
                      <View style= {{flexDirection:'row'}}>
                        <Text style ={{fontSize:15,}}>TT: {item.status}</Text>
                      </View>
              </View>
            </TouchableOpacity>
              
            }
          />
          {/* <Button onPress= {() => {
            // this.props.navigation.navigate("Taolao")
            }}/> */}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
});
