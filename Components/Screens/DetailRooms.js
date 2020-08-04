import React, { useState,useEffect } from 'react';
import { View, Text,Button, TextInput,Modal,FlatList } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { firebaseApp } from '../Database/FirebaseConfig';
import moment from 'moment';

function DetailRooms({ route }) {
    const [electric, setElectric] = useState(0);
    const [water, setWater] = useState(0);
    const[total,setTotal] = useState(0);
    const[showModal,setShowModal] = useState(false);
    const[show,setShow] = useState(false);
    const [data,setData] = useState([]);
    const [own, setOwn] = useState('');
    const [count, setCount] = useState(0);
   

    // var d = new Date().getDate();
    // var m = new Date().getMonth() + 1;
    // var y = new Date().getFullYear();
    // const date = d +'/' + m + "/" +y;
    let date = moment().utcOffset('+07:00').format('DD/MM/YYYY hh:mm:ss a');
    useEffect(()=>{
      let items= [];
        firebaseApp.database().ref('tblCheckOut').on('value',function(snapshot){
        snapshot.forEach(function(childSnapshot){
          var childData = childSnapshot.val();
          items.push({
            nameRoom: childData.nameRoom,
            categoriesRoom: childData.categoriesRoom,
            nameOwner: childData.nameOwner,
            dateStart: childData.dateStart,
            dateEnd: childData.dateEnd,
            price: childData.price,
            electric:childData.electric,
            water: childData.water,
            totalMoney: childData.totalMoney
          });
          setData(items);
          
        });
      });
    },[]);
      return (
        <View style={{ flex: 1}}>

          {
            route.params.status == "Empty" 
            ? 
            (
              <View style ={{flex:1,alignItems: 'center', justifyContent: 'center' }}>
                <Text style ={{fontSize:18}}>Phòng {route.params.nameRoom} đang trống</Text>
                <Button title="Đặt phòng" onPress={()=>setShow(true)}/>
                <Modal
                  transparent = {true}
                  visible = {show}
                  animationType= 'fade'>
                    <View style ={{backgroundColor : '#000000aa', flex:1}}>
                      <View style = {{backgroundColor: '#FFFFFF',margin: 20,flex:1,borderRadius:10, padding:20}}>
                        <Text>Modal đặt phòng</Text>
                        <TextInput
                        placeholder= "Chủ hộ"
                        
                        style={{borderColor: '#000000aa', borderWidth: 1,borderRadius:5, height: 30,padding:5,width: '50%', backgroundColor: '#FFF', marginBottom:20}}
                        onChangeText={(o) => { setOwn(+o)}}
                        value={own}/>
                        <TextInput
                        placeholder= "Số người"
                        
                        style={{borderColor: '#000000aa', borderWidth: 1,borderRadius:5, height: 30,padding:5,width: '50%', backgroundColor: '#FFF', marginBottom:20}}
                        onChangeText={(c) => { setCount(+c)}}
                        value={count.toString()}/>


                        <View style={{margin: 20}}>
                          <Button title ='Đặt' onPress ={()=>{
                            firebaseApp.database().ref('tblRoom').child(route.params.nameRoom).update({
                              //set Data
                              // categoriesRoom: childData.categoriesRoom,
                              // nameRoom: childData.nameRoom,
                              // status: childData.status,
                              // owner: childData.owner,
                              // startdate: childData.startdate,
                              // price: childData.price,
                              // amountOfPeople: childData.amountOfPeople
                              nameRoom: route.params.nameRoom,
                              categoriesRoom: route.params.categoriesRoom,
                              startdate: route.params.startdate,
                              status: 'Busy',
                              owner: own,
                              price: route.params.price,
                              amountOfPeople: count
                            })
                          }}/>
                        </View>
                        <Button title="hide" onPress={()=>setShow(false)}/>
                      </View>
                    </View>
                  </Modal>
              </View>
            )


           : (
              <View style ={{flex:1}}>
                <View style={{flex:5,marginLeft:30}}>
                <Text style ={{color: 'red', opacity: 0.7, fontSize:30, marginTop: 20, marginBottom: 20}}>THÔNG TIN CHI TIẾT</Text>
                <Text style ={{fontSize:18}}>Phòng:                {route.params.nameRoom}</Text>
                <Text style ={{fontSize:18}}>Dãy:                     {route.params.categoriesRoom}</Text>
                <Text style ={{fontSize:18}}>Giá:                     {  route.params.price}</Text>
                <Text style ={{fontSize:18}}>Ngày thuê:         {route.params.startdate}</Text>
                <Text style ={{fontSize:18}}>Người thuê:       {route.params.owner}</Text>
                <Text style ={{fontSize:18}}>Số người:           {route.params.amountOfPeople}</Text>
                <View style = {{flexDirection:'row'}}>
                  <Text style ={{fontSize:18}}>Số điện:             </Text>
                    <TextInput
                    placeholder= "KWh"
                    keyboardType ="numeric"
                    style={{borderColor: '#000000aa', borderWidth: 1,borderRadius:5, height: 30,padding:5 ,width: '50%', backgroundColor: '#FFF', marginBottom:20}}
                    onChangeText={(e) => { setElectric(+e)}}
                    value={ electric.toString() } // value
                    />
                </View>
                <View style ={{flexDirection:'row'}}> 
                  <Text style ={{fontSize:18}}>Số nước:            </Text>
                    <TextInput
                    placeholder= "Số khối nước"
                    keyboardType ="numeric"
                    style={{borderColor: '#000000aa', borderWidth: 1,borderRadius:5, height: 30,padding:5,width: '50%', backgroundColor: '#FFF', marginBottom:20}}
                    onChangeText={(w) => { setWater(+w)}}
                    value={water.toString()} // value
                    />
                  </View>
                  <Text style ={{fontSize:18}}>Tổng tiền:          {total}</Text>
                </View>
                
                  
                    
                    <View style= {{flex:2, width: '80%',marginLeft:30}}>
                      <Button title= "Tính tiền" onPress ={()=> {
                    setTotal(Number(route.params.price)+Number(electric)*3000+Number(water)*5000);
                    
                    console.log(date);
                    firebaseApp.database().ref('tblCheckOut').push({
                      nameRoom: route.params.nameRoom,
                      categoriesRoom: route.params.categoriesRoom,
                      nameOwner: route.params.owner,
                      dateStart: route.params.startdate,
                      dateEnd: date,
                      price: route.params.price,
                      electric: electric,
                      water: water,
                      totalMoney: Number(route.params.price)+Number(electric)*3000+Number(water)*5000
                    });
                    }}/>
                    <View style= {{marginTop:20}}>
                      <Button title="Check Out History" onPress ={()=>{setShowModal(true)}}/>
                    </View>
                    </View>
                    <Modal
                  transparent = {true}
                  visible = {showModal}
                  animationType= 'fade'>
                    <View style ={{backgroundColor : '#000000aa', flex:1}}>
                      <View style = {{backgroundColor: '#FFFFFF',margin: 20,flex:1,borderRadius:10, padding:20}}>
                        <View>
                        <FlatList
                          numColumns= {1}
                          contentContainerStyle={{alignContent:'center'}}
                          data={data}
                          renderItem={({item,index})=>
                           
                            <View style={{marginTop:30,borderBottomWidth:1,alignContent:'center',padding:5}}>
                              <Text style={{fontSize:18}}>Phòng: {item.nameRoom}</Text>
                              <Text style={{fontSize:18}}>Dãy :{item.categoriesRoom}</Text>
                              <Text style={{fontSize:18}}>Chủ hộ: {item.nameOwner}</Text>
                              <Text style={{fontSize:18}}>Ngày thuê: {item.dateStart}</Text>
                              <Text style={{fontSize:18}}>Ngày thanh toán: {item.dateEnd}</Text>
                              <Text style={{fontSize:18}}>Giá phòng: {item.price}</Text>
                              <Text style={{fontSize:18}}>Số nước:{item.water}</Text>
                              <Text style={{fontSize:18}}>Số điện: {item.electric}</Text>
                              <Text style={{fontSize:18}}>Tổng tiền: {item.totalMoney}</Text>
                            </View>
                          }
                          />
                        </View>
                        <Button title= "Hide" onPress ={()=> setShowModal(false)}/>
                        
                      </View>
                    </View>
                  </Modal>
                  
              </View>
            )

          }
        </View>
      );
    
}

export default DetailRooms;