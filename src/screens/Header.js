import React from 'react'
import { View,StyleSheet,Text,TouchableOpacity } from "react-native"
import ICON from 'react-native-vector-icons/MaterialCommunityIcons'
import { DrawerActions } from '@react-navigation/native';
export default function Header({name,navigation,title,transferdata}){
    const screenname = name
    console.log('HEADER......',screenname)
    const jumpToAction = DrawerActions.jumpTo('HomeStack');
    switch (screenname) {
        case 'addnote':
            return <View style={styles.barAddNote}>
                        <TouchableOpacity
                            onPress={()=>{
                                let note = transferdata()
                                navigation.navigate(
                                'Notes',{note})
                                console.log('Vo day')
                            }
                                }>
                            <ICON name='arrow-left-bold-outline' 
                            style={styles.buttonBack} />
                            {/* <Text style={styles.barAddNoteText} > Back</Text> */}
                        </TouchableOpacity>
                        
                    </View>
            break;
        case 'notes':
            return <View style={styles.container}>
                        <TouchableOpacity onPress={()=>{navigation.openDrawer()}}>
                            <ICON name='menu' style={styles.buttonBack}/>
                        </TouchableOpacity>
                        <View style={styles.titlebox} >
                            <Text  style={styles.toolBar} >NOTES</Text>
                        </View>
                    </View>
            break;
        case 'profile':
            return <View style={styles.container}>
                        <TouchableOpacity style={styles.backbox} onPress={()=>{navigation.dispatch(jumpToAction)}} >
                            <ICON name='arrow-left-bold-outline' style={styles.buttonBack} />
                        </TouchableOpacity>
                        <View style = {styles.titlebox}>
                            <Text style= {styles.titletext}>{title}</Text>
                        </View>
                    </View>
            break;
        case 'tags':
            return <View style={styles.barAddNote}>
            <TouchableOpacity
                onPress={()=>{navigation.navigate(
                    'AddNote',{selectedTags: transferdata()})}}>
                         <ICON name='arrow-left-bold-outline' 
                            style={styles.buttonBack} />
                {/* <Text style={styles.barAddNoteText} > Done </Text> */}
            </TouchableOpacity>
                 </View>
            break;
        default:
            break;
    }
}
const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        paddingHorizontal:5,
    },
    backbox:{
        flex:1
    },
    titlebox:{
        flex:9,
       // position:'absolute',
       // top: 0,
       // left: 0,
       // right: 0,
       // bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
       // backgroundColor:'green',
    },
    titletext:{
        color:'mediumseagreen',
        fontSize:16,
        fontWeight:'bold'
    },
    toolBar:{
        justifyContent:'center',
        alignItems:'center',
        fontSize:25,
        color:'mediumseagreen',
        fontWeight:'bold'
      },
      barAddNote:{
          marginHorizontal:10,
          height:35,
         // backgroundColor:'mediumseagreen',
          justifyContent:'center',
          shadowColor:'grey',
          shadowOpacity:1,
          shadowOffset:{width:2,height:2},
          shadowRadius:7
      },
      barAddNoteText:{
          fontSize:20,
          fontWeight:'bold',
          color:'mediumseagreen'
      },
      buttonBack:{
          fontSize:30,
          color:'mediumseagreen',
      }
    }
)