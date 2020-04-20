import 'react-native-gesture-handler';
import React from 'react'
import AppNavigator from "./src/stacknavigater/AppNavigator";
import TagsView from './src/components/TagsView/TagsView';
import {SafeAreaView, View, Alert} from 'react-native'
import {Provider} from 'react-redux'
import store from './src/redux/store';

//import Main from './src/screens/Demo';

const App = ()=>{
 // return (<Main/>)
  
  return (
    <Provider store = {store} >
      <AppNavigator/>
    </Provider>
  )
  
  // const selected = ['Swift', 'Kotlin']
  // const tags = ['Swift', 'Kotlin', 'C#', 'Haskell', 'Java']
  // return (
  //   <SafeAreaView style={{flex:1}}>
  //     <View style={{flex:1}} >
  //       <TagsView
  //           allTags={tags}
  //           selectedTag={selected}
  //           isExclusive={false}
  //           onChangeTags = {(tagselected)=>{Alert.alert(JSON.stringify(tagselected))}}
  //         />
  //     </View>
  //   </SafeAreaView>
  // )
}

export default App