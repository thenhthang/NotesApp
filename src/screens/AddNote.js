import React, { Component, useState, useEffect } from 'react'
import { Text, View,StyleSheet,SafeAreaView, ScrollView,
     TextInput, KeyboardAvoidingView,TouchableOpacity,Alert,
    Platform } from 'react-native'
import Note from '../model/note'
import Header from './Header'
import ColorPalette from 'react-native-color-palette'
import TagsView from '../components/TagsView/TagsView'
//const selected = ['Swift', 'Kotlin']
const labels = ['Đọc báo', 'Karaoke', 'Nhật ký', 'Sổ nợ', 'Anh văn']
function AddNote({route,navigation}){
    //**
    //Get data from Parameters
    //console.log('Params: ',route.params)
    const note = route.params.note;
    //console.log("note label type: ",typeof note.label)
    const [selLabel,setselLabel] = useState([...note.label]) //useState(note.label)
    //console.log('sellabel Sau: ',selLabel)
    //console.log("sellabel type: ",typeof selLabel)
    //console.log("Note: ",note)
    //
    
    //route.params.selectedTags
    // console.log("Note: ",note)
    //console.log('Selected Tags: ',route.params.selectedTags)
   
    //Create State
    const[color,setColor] = useState(note.color)
    const[isVisibledColorCombo,setVisibledColorCombo] = useState(false)
    //
    const[txtTitle,settxtTitle] = useState(note.title)
    const[txtBody,settxtBody] = useState(note.body)
    //
    useEffect(()=>{
      
    })//Khong co dependecies: luon chay sua moit lan render
    const AddNew = ()=>{
       
        var newLabel = selLabel == undefined ?[]:selLabel
        if(route.params?.selectedTags){
            newLabel = route.params.selectedTags
        }
        let today = new Date();
        console.log('today: ',today)
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        console.log('Ngày: ',date)
        if(String(txtBody).length > 0 && txtBody != undefined){
            const newnote = new Note(
                note.id,
                txtTitle,
                newLabel,
                txtBody,
                date,
                color == undefined?"white":color)
               
                resetForm()
            return newnote
        }else{
            resetForm()
            return {}
        }
    }
    const selectedTags = () =>{
        let newTags 
        if(route.params?.selectedTags){
            newTags = [...route.params.selectedTags]
        }else{
            newTags = [...selLabel]
        }
        return newTags;
    }
    const resetForm = ()=>{
        settxtTitle("")
        settxtBody("")
    }
    // useEffect(()=>{
    //     if(route.params.selectedTags.length > 0){
    //         setLabel(route.params.selectedTags)
    //     }
    // })
    const behavior = Platform.OS ==='ios'?'padding':''
     return(
        <SafeAreaView style={{flex:1, flexDirection:'column'}}>
        <Header name = 'addnote'  navigation={navigation} transferdata = {AddNew}/>
        <KeyboardAvoidingView 
                    style={{flex:1,
                            justifyContent:'center',
                            backgroundColor:color}}
                    behavior={behavior} >
            <View style = {styles.container}>
                {/* <ScrollView  > */}
                    <View style = {styles.titlebox} >
                        <TextInput style ={styles.titletext}
                                    placeholder='Title'
                                    defaultValue={txtTitle}
                                    autoCorrect={false}
                                    onChangeText={(text)=>{
                                        settxtTitle(text)
                                    }}
                                    returnKeyType='next'  
                                    onTouchStart={()=>{setVisibledColorCombo(false)}}
                        />
                    </View>
                    <View style = {styles.bodybox}>
                        <TextInput style={styles.bodytext}
                                placeholder='Note'
                                defaultValue={txtBody}
                                multiline={true}
                                autoCorrect={false}
                               
                                onChangeText={(text)=>settxtBody(text)}
                                keyboardType='default'
                                onTouchStart={()=>{setVisibledColorCombo(false)}}
                        />
                    </View>
                {/* </ScrollView> */}
                <View style={styles.bottomBar}>
                {
                    isVisibledColorCombo === true?
                    <View >
                        <ColorPalette
                        onChange={color => setColor(color)}
                        colors={['#FFFFFF','#C0392B', '#E74C3C', '#9B59B6', '#8E44AD', '#2980B9']}
                        title={`Select color`}
                                />    
                    </View>:null
                }
                <View style={styles.bottomBarMenu}  >
                    <TouchableOpacity onPress={()=>{navigation.navigate('Tags',
                                {selected: selectedTags(),
                                tags:[...labels]})}}>
                        <Text style={styles.bottomBarText}>Label</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>setVisibledColorCombo(!isVisibledColorCombo)}>
                        <Text style={styles.bottomBarText} >Color</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
         </KeyboardAvoidingView>
         </SafeAreaView>
     )
 }
 const styles = StyleSheet.create({
     container:{
        // marginHorizontal:15,
         flex:1,
         justifyContent:'center',
       //  backgroundColor:'red'
        // position:'absolute'
     },
     toolbar:{
         marginBottom:15,
         borderBottomWidth:0.6,
         borderBottomColor:'rgb(179, 179, 179)',
         height:35,
         shadowColor:'rgb(115, 115, 115)',
         shadowOffset:{width:5,height:5},
         shadowOpacity:0.9,
         shadowRadius:5
     },
     titlebox:{
         height:50,
         paddingHorizontal:5
     },
     bodybox:{
        flex:1,
        // backgroundColor:'yellow',
         paddingHorizontal:5
     },
     titletext:{
         fontSize:22,
         fontWeight:'bold',
         color:'black'
     },
     bodytext:{
         fontSize:17,
         color:'black',
         marginBottom:40
     },
     bottomBar:{
         position:'absolute',
         bottom:0,
         padding:15,
         flexDirection:'column',
         backgroundColor:'rgb(221, 236, 239)',
         width:'100%'
     },
     bottomBarMenu:{
         flexDirection:'row',
         justifyContent:'space-between',
         alignItems:'center',
     },
     bottomBarText:{
         color:'mediumseagreen',
         fontSize:16,
         fontWeight:'bold'
     }
     
 })
 export default AddNote