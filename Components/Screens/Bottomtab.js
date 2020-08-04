import React, { useState} from 'react';
import {
View,Text,TouchableOpacity,
} from 'react-native';
// import StylesBottomtab from '../style/style_bottomtab';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function MyTabBar({ state, descriptors, navigation }) {
    var nameicon='';
    return (
      <View style={StylesBottomtab.khungbaoboc}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
  
          if(label=='Trang chủ')
          {
            nameicon='home';
            
          }
          else if(label=='Bài tập')
          {
            nameicon='book-open-page-variant';
          }
          else if(label=='Kiểm tra')
          {
            nameicon='book';
          }
          else if(label=='Khác')
          {
            nameicon='dots-horizontal';
          }
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
  
          return (
            <View style={StylesBottomtab.khungbuttontab}>
                      <TouchableOpacity 
                        // style={StylesBottomtab.khungtab} 
                        activeOpacity={0.8} 
                        accessibilityRole="button"
                        accessibilityStates={isFocused ? ['selected'] : []}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                      >
                              <View 
                            //   style={StylesBottomtab.buttontab}
                              >
                                  <MaterialCommunityIcons name={nameicon} size={23} style={{color: isFocused ? '#FFA801' : '#b7b7b7'}} />
                                  <Text 
                                  style={[
                                    //   StylesBottomtab.chubottomtab,
                                  {color: isFocused ? '#FFA801' : '#b7b7b7'}]}>{label}</Text>
                              </View>
                      </TouchableOpacity>   
                  </View>
          );
        })}
      </View>
    );
  }