import React from 'react'
import {SafeAreaView,View,Text,Image,TouchableOpacity,
    ScrollView,StyleSheet} from 'react-native'
import IMAGE from '../constants/IMAGE';
export function ĐrawerContent(props){
    return(
    <SafeAreaView style={{flex:1}}>
        <View style={{justifyContent:'center',alignItems:'center'}}>
            <Image source={IMAGE.account} style={{width:128,height:128}}/>
            <TouchableOpacity onPress={()=>props.navigation.navigate('Profile')}>
                <Text style={{marginTop:10,fontSize:15,color:'blue'}}>Edit profile</Text>
            </TouchableOpacity>
        </View>
        <ScrollView style={{marginTop:20,marginLeft:10}}>
            <TouchableOpacity onPress={()=>props.navigation.navigate('HomeStack')}>
                <Text style={styles.link}>Notes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>props.navigation.navigate('Label')}>
                <Text style={styles.link}>All Label</Text>
            </TouchableOpacity>
        </ScrollView>
        <View style={{marginTop:20,marginLeft:10}}>
            <Text style={{marginTop:10,fontSize:15,color:'blue'}}>Sign out</Text>
        </View>
    </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    link:{
        fontSize:20,
        paddingTop:10,
        fontWeight:'normal',
        
    }
})