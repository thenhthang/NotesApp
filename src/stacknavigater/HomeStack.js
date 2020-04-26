import React from 'react'
import {Button,View,Text} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import Tags from '../screens/Tags'
import Notes from '../screens/Notes'
import AddNote from '../screens/AddNote'

const Stack = createStackNavigator()
export function HomeStack(props){
    return(
      <Stack.Navigator initialRouteName="Notes" 
                         headerMode='none' >
          <Stack.Screen name="Notes" 
                  component={Notes}
                  initialParams={{note:{}}}/>
          <Stack.Screen name="AddNote" 
                        component={AddNote}
                        initialParams={{title:'New note'}}
                        options={{
            headerTitle: props => <View><Text>Add Note</Text></View>,
            headerRight: () => (
              <View style={{flexDirection:'row'}}>
                <Button
                onPress={() => alert('This is a button!')}
                title="Done"
                color="grey"
              />
              <Button
                onPress={() => alert('This is a button!')}
                title="Exit"
                color="grey"
              />
              </View>
            )
            ,}}/>
            <Stack.Screen name='Tags' component={Tags} />
        </Stack.Navigator> 
    )
}