import React from 'react'
import {View,Text,SafeAreaView} from 'react-native'
//import {TestRealm} from '../data/StorageServices'
//import TodoService,{TodoModel} from '../data/Services'
//import { findAllCar } from '../data/StorageServices'
//import Realm from 'realm'
const Realm = require('realm');
// Define your models and their properties
const CarSchema = {
  name: 'Car',
  properties: {
    make:  'string',
    model: 'string',
    miles: {type: 'int', default: 0},
  }
};
function TestRealm(){
    Realm.open({schema: [CarSchema]})
  .then(realm => {
    console.log('Open')
    realm.write(() => {
      const myCar = realm.create('Car', {
        make: 'Test Honda',
        model: 'Civic',
        miles: 1000,
      });
      //console.log('My car: ',myCar)
      //myCar.miles += 20; // Update a property value
    });
    let dogs = realm.objects('Car');
    //console.log('Query',JSON.stringify(dogs))
    // Remember to close the realm when finished.
    realm.close();
  })
  .catch(error => {
    console.log('Lỗi: ',error);
  });
}
function  findAll(){
    console.log('Vo day')
  // var a = await findAllCar()
  let a = TestRealm()
  
   console.log('...', a )
   //return a
}
export default function Main(){
     
    return(
    <SafeAreaView>
        <View>
            
            <Text onPress={()=>{findAll()}} >Hello word</Text>
        </View>
    </SafeAreaView>
    )
}