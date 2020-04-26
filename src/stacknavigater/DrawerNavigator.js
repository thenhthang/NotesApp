import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import Notes from '../screens/Notes';
import Tags from '../screens/Tags';
import Profile from '../screens/Profile';
import {ĐrawerContent} from './DrawerContent'
import { HomeStack } from './HomeStack';

const Drawer = createDrawerNavigator();

export function DrawerNavigator(){
    return(
        <Drawer.Navigator initialRouteName="HomeStack"
                          drawerContent={props=>ĐrawerContent(props)} >
            <Drawer.Screen initialParams={{note:{}}} name="HomeStack" 
                           component={HomeStack} />
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="Label" component={Tags} 
                           initialParams={{selected:[]}}/>
        </Drawer.Navigator>
    )
}