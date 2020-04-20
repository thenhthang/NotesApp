import React from 'react'
import { View,StyleSheet,Text,TouchableOpacity } from "react-native"
import ICON from 'react-native-vector-icons/MaterialCommunityIcons'
export default function Header({name,navigation,transferdata}){
    const screenname = name
    console.log('HEADER......',screenname)
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
            return <View style={styles.toolBar}>
                        <Text style={styles.toolBar} >NOTES</Text>
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
    toolBar:{
        justifyContent:'center',
        alignItems:'center',
        fontSize:40,
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