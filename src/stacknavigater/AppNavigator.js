// In App.js in a new project

import * as React from 'react';
import { View, Text,Button,TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Notes from '../screens/Notes';
import AddNote from '../screens/AddNote';
import Tags from '../screens/Tags';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Notes" 
                       headerMode='none' 
                       >
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
    </NavigationContainer>
  );
}

export default AppNavigator;