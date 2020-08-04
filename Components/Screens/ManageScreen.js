import React from 'react';
import { View, Text,Button,Modal,FlatList,TouchableOpacity} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {firebaseApp} from '../Database/FirebaseConfig';
import { TextInput } from 'react-native-paper';
import moment from 'moment';

export default class ManageScreen extends React.Component {
  
  constructor (props) {
    super(props);
    this.itemRef = firebaseApp.database()
    this.state = {
      show: false,
      show1: false,
      show2: false,
      showAddCate: false,
      textCategories : '',
      textPrice: '',
      textnameroom: '',
      textnamecategory: '',
      texstatus: '',
      textpriceroom: '',
      owner: '',
      people: ''
    }
  }
  addRoom(){
    var d = new Date().getDate();
    var m = new Date().getMonth() + 1;
    var y = new Date().getFullYear();
    // let date = d +'/' + m + "/" +y;
    let date = moment().utcOffset('+07:00').format('DD/MM/YYYY hh:mm:ss a');
    this.itemRef.ref('tblRoom').push({
      categoriesRoom: this.state.textnamecategory,
          nameRoom: this.state.textnameroom,
          status: this.state.texstatus,
          price: this.state.textpriceroom,
          owner: this.state.owner,
          startdate: date,
          amountOfPeople: this.state.people
    });
  }
  loadFlatlishAccount(){
    var that=this;
    let items= [];
      this.itemRef.ref('tblUsers').on('value',function(snapshot){
      snapshot.forEach(function(childSnapshot){
        var childData = childSnapshot.val();
        items.push({
          fullName: childData.fullName,
          password: childData.password,
          userName: childData.userName,
          status: childData.status
        });
        that.setState({
          dataAccount: items,
        })
      });
    });
  }
  addCategories(){
    this.itemRef.ref('tblRoomCategories').push({
      nameCategories: this.state.textCategories,
      PriceCategories: this.state.textPrice,
    });
  }

  loadFlatlishCategoriesRoom(){
    var that=this;
    let items= [];
      this.itemRef.ref('tblRoomCategories').on('value',function(snapshot){
      snapshot.forEach(function(childSnapshot){
        var childData = childSnapshot.val();
        items.push({
          nameCategories: childData.nameCategories,
          priceCategories: childData.PriceCategories
        });
        that.setState({
          dataCategories: items,
        })
      });
    });
  }

  componentDidMount(){
    this.loadFlatlishAccount(),
    this.loadFlatlishCategoriesRoom()
  }



    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Button title ='Manage Accounts' onPress ={ () => {this.setState({show:true})}}/>
          <Modal
          transparent = {true}
          visible = {this.state.show}
          animationType= 'fade'>
            <View style ={{backgroundColor : '#000000aa', flex:1}}>
              <View style = {{backgroundColor: '#FFFFFF',margin: 30, padding: 20, borderRadius:10, flex:1}}>

              <FlatList
              style={{width:'100%',height:'100%'}}
              contentContainerStyle={{alignItems:'center',justifyContent:'center'}}
              data={this.state.dataAccount}
              renderItem={({item,index})=>
              <TouchableOpacity
              onPress= { () => {console.log('On Click in user : ' + item.fullName)}}
              >
                <View style= {{width:'100%',marginBottom: 20,borderBottomWidth: 1, padding: 10}}>
                    
                      <View style= {{flexDirection:'row',marginBottom:5}}>
                        <Text style ={{fontSize:15,}}>User Name :</Text>
                        <Text style ={{fontSize:15,}}>{item.userName}</Text>
                      </View>
                      <View style= {{flexDirection:'row',marginBottom:5}}>
                        <Text>Password :</Text>
                        <Text>{item.password}</Text>
                      </View>
                      <View style= {{flexDirection:'row',marginBottom:5}}>
                        <Text>Họ tên :</Text>
                        <Text>{item.fullName}</Text>
                      </View>
                      <View style= {{flexDirection:'row',marginBottom:5}}>
                        <Text>Trạng thái :</Text>
                        <Text>{item.status}</Text>
                      </View>
                      

                  </View>
              </TouchableOpacity>
                  
            }
          />
              <Button title ='Hide Modal Account' onPress ={ () => {this.setState({show:false})}}/>
              </View>
            </View>
          </Modal>


          <Button title ='Manage Rooms' onPress ={ () => {this.setState({show1:true})}}/>
          <Modal
          transparent = {true}
          visible = {this.state.show1}
          animationType= 'fade'>
            <View style ={{backgroundColor : '#000000aa', flex:1}}>
              <View style = {{backgroundColor: '#FFFFFF',margin: 20, padding: 10, borderRadius:10, flex:1}}>

              <View style ={{flex:1}}>
                  <TextInput
                  placeholder= "name room"  
                  style={{marginTop: 50,borderColor: '#000000aa', borderWidth: 1,borderRadius:5, height: 40, backgroundColor: '#FFF', marginBottom:20}}
                  onChangeText={(textnameroom) => this.setState({textnameroom})}
                  value={this.state.textnameroom}
                  />
                  <TextInput
                  placeholder= "name categories"  
                  style={{borderColor: '#000000aa', borderWidth: 1,borderRadius:5, height: 40, backgroundColor: '#FFF', marginBottom:20}}
                  onChangeText={(textnamecategory) => this.setState({textnamecategory})}
                  value={this.state.textnamecategory}
                  />
                  <TextInput
                  placeholder= "status"  
                  style={{borderColor: '#000000aa', borderWidth: 1,borderRadius:5, height: 40, backgroundColor: '#FFF', marginBottom:20}}
                  onChangeText={(texstatus) => this.setState({texstatus})}
                  value={this.state.texstatus}
                  />
                  <TextInput
                  placeholder= "priceRoom"  
                  style={{borderColor: '#000000aa', borderWidth: 1,borderRadius:5, height: 40, backgroundColor: '#FFF', marginBottom:20}}
                  onChangeText={(textpriceroom) => this.setState({textpriceroom})}
                  value={this.state.textpriceroom}
                  />
                  <TextInput
                  placeholder= "owner"  
                  style={{borderColor: '#000000aa', borderWidth: 1,borderRadius:5, height: 40, backgroundColor: '#FFF', marginBottom:20}}
                  onChangeText={(owner) => this.setState({owner})}
                  value={this.state.owner}
                  />
                  <TextInput
                  placeholder= "count people"  
                  style={{borderColor: '#000000aa', borderWidth: 1,borderRadius:5, height: 40, backgroundColor: '#FFF', marginBottom:20}}
                  onChangeText={(people) => this.setState({people})}
                  value={this.state.people}
                  />


                  <Button title= "ADD ROOM" onPress = { () =>{ this.addRoom()} }/>
              </View>
              <Button title ='Hide Modal Rooms' onPress ={ () => {this.setState({show1:false})}}/>
              </View>
            </View>
          </Modal>
          
            <Button title ='Manage Categories' onPress ={ () => {this.setState({show2:true})}}/>
          <Modal
          transparent = {true}
          visible = {this.state.show2}
          animationType= 'fade'>
            <View style ={{backgroundColor : '#000000aa', flex:1}}>
              <View style = {{backgroundColor: '#FFFFFF',margin: 50, padding: 40, borderRadius:10, flex:1}}>

              <FlatList
              style={{width:'100%',height:'100%'}}
              contentContainerStyle={{alignItems:'center',justifyContent:'center'}}
              data={this.state.dataCategories}
              renderItem={({item,index})=>
              <TouchableOpacity
              onPress= { () => {console.log('On Click ' + item.nameCategories)}}
              >
                <View style= {{width:'100%',marginBottom: 20,borderWidth: 1, padding: 10}}>
                    
                      <View style= {{flexDirection:'row',marginBottom:5}}>
                        <Text style ={{fontSize:15,}}>{item.nameCategories}</Text>
                      </View>
                      <View style= {{flexDirection:'row',marginBottom:5}}>
                        <Text> Giá: </Text>
                        <Text>{item.priceCategories}</Text>
                      </View>
                  </View>
              </TouchableOpacity>
                  
                }
              />
              <View>
                <View style = {{marginBottom:20}}>
                  <Button title ='open add categories' onPress ={ () => {this.setState({show2:false,showAddCate:true})}}/>
                </View>
                
                <View style = {{}}>
                  <Button title ='Hide Modal Categories' onPress ={ () => {this.setState({show2:false})}}/>
                </View>
                
              </View>
              
              </View>
            </View>
          </Modal>
          <Modal  transparent = {true}
          visible = {this.state.showAddCate}
          animationType= 'fade'>
            <View style ={{backgroundColor : '#000000aa', flex:1}}>
              <View style = {{backgroundColor: '#FFFFFF',margin: 20,flex:1,borderRadius:5}}>
              <TextInput
              placeholder= " name"  
              style={{marginTop: 50,marginLeft: 20,width:'80%', borderColor: 'gray', borderWidth: 1, height: 40, backgroundColor: '#FFF', marginBottom:20}}
              onChangeText={(textCategories) => this.setState({textCategories})}
              value={this.state.textCategories}
              />
              <TextInput
              placeholder= "price" 
              style={{marginLeft: 20,width:'80%', borderColor: 'gray', borderWidth: 1,marginBottom: 20, height: 40, backgroundColor: '#FFF'}}
              onChangeText={(textPrice) => this.setState({textPrice})}
              value={this.state.textPrice}
              />
              <View style ={{ width: '80%',marginLeft:25}}>
                <Button title = "Add Categories" onPress = { () =>{ this.addCategories()} }/>
              </View>

              <View style ={{marginTop:20, width: '80%',marginLeft:25}}>
                <Button title = "Hide"onPress ={ () => {this.setState({show2:true,showAddCate:false})}}/>
              </View>
              
            </View>
            </View>
          </Modal>
        </View>
      );
    }
  }
