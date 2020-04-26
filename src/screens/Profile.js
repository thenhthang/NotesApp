import React,{useState, useEffect} from 'react'
import {View,Text,SafeAreaView,StyleSheet, Image,Dimensions} from 'react-native'
import Header from './Header'
import ICON from 'react-native-vector-icons/MaterialCommunityIcons'
import IMAGE from '../constants/IMAGE'
import Animated from 'react-native-reanimated';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'

const Tab = createMaterialTopTabNavigator()
function TabOne({navigation,route}) {
    //Destructing
    const {title} = route.params
    
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Page 1</Text>
        <Text>{title}</Text>
      </View>
    );
  }
  function TabTwo() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Page 2</Text>
      </View>
    );
  }
export function MyTabs() {
    return (
      <Tab.Navigator
        initialLayout={{ width: Dimensions.get('window').width }}
        initialRouteName="TabOne"
        tabBarOptions={{
          activeTintColor: 'grey',
          labelStyle: { fontSize: 12 },
          //style: { backgroundColor: 'powderblue' },
        }}
      >
        <Tab.Screen
          name="TabOne"
          component={TabOne}
          options={{ tabBarLabel: 'Tab 1' }}
          initialParams={{title:'sd 2'}}
        />
        <Tab.Screen
          name="TabTwo"
          component={TabTwo}
          options={{ tabBarLabel: 'Tab 2' }}
        />
      </Tab.Navigator>
    );
}
export default function Profile({navigation, route}){
    return(
        <SafeAreaView style={{flex:1}}>
             <Header name='profile' title='Account Infomation' navigation = {navigation}/>
             <View style={styles.profileimage}>
                 <Image source= {IMAGE.account} style={{width:100,height:100}} />
             </View>
             <MyTabs/>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    profileimage:{
        justifyContent:'center',
        alignItems:'center',
        marginVertical:20
    },
})