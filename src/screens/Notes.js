/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';

import DATA from '../storage/data';
import Header from './Header';
import Note from '../model/note';
import {DateFormat} from '../util/dateFormat';
import DBService from '../storage/services';
import Label from '../model/label';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import { useSelector,useDispatch } from 'react-redux';
import allActions from '../redux/action'
import {parseDate} from '../util/datehelper'
const Title = ({title}) => {
  if (String(title).length != 0) {
    return (
      <View>
        <Text style={styles.title}> {title}</Text>
      </View>
    );
  } else {
    return <></>;
  }
};
const Item = ({item, navigation}) => (
  <TouchableOpacity
    activeOpacity={1}
    onPress={() => {
      navigation.navigate('AddNote', {note: item});
    }}
    style={[
      styles.item,
      {
        backgroundColor: item.color,
      },
    ]}>
    <Title title={item.title} />
    <View>
      <Text numberOfLines={7} style={styles.body}>
        {' '}
        {item.body}
      </Text>
    </View>
    <View style={styles.footer}>
      <View style={styles.labelbox}>
        <Text style={styles.label}> {item.label}</Text>
      </View>
      <View>
        <Text style={styles.created}> {item.created}</Text>
      </View>
    </View>
  </TouchableOpacity>
);
function Notes({navigation, route}) {
  //const [data, setData] = useState(DATA);
  const data = useSelector(state => state.notes)
  const [count, setCount] = useState(0);
  var currentNote = route.params.note;
  const dispatch = useDispatch()
  useEffect(() => {
    console.log('A')
    dispatch(allActions.fetchNotes())
    /*
    let notes = DBService.objects('Note');
    let result = [];
    for (let item of notes) {
      let note = new Note(
        item.id,
        item.title,
        [],
        item.body,
        'Date',
        item.color,
      );
      if (item.label) {
        for (let label of item.label) {
          note.label.unshift(label.name);
        }
      }
      note.created = DateFormat.toddMMyyyy(item.created);
      result.unshift({...note});
    }
    setData(result);
    console.log('Result: ', result);
    */
  }, []); //Dấu [] để useEffect này chỉ chạy 1 lần đầu lúc start component
  
  useEffect(() => {
    if (Object.keys(route.params.note).length != 0){
      //let newlabel = currentNote.label.map((value, index) => {
      //  return {...new Label(value)};
      //});
      let addNew = false;
      if (currentNote.id == "") {
        addNew = true;
        currentNote.id = DBService.nextid('Note');
      }
      console.log('curentNoteDate: ',currentNote.created)
      const ngay = parseDate(currentNote.created,'yyyy-mm-dd')
      console.log('curentNoteDate Parse: ',ngay)
      let note = new Note(
          currentNote.id,
          currentNote.title,
          currentNote.label,
          currentNote.body,
          ngay,
          currentNote.color,
        )
      //Update
      console.log('Note tra ve:',note)
      if (addNew == false) 
      {
        dispatch(allActions.updateNote(note))
        /*
        const newNotes = data.map((note, index) => {
          if (note.id === currentNote.id) {
            return {
              ...note,
              body: currentNote.body,
              title: currentNote.title,
              label: currentNote.label,
              color: currentNote.color,
            };
          } else {
            return note;
          }
        });
        setData(newNotes);
        */
      }
      else
      {
        dispatch(allActions.addNote(note))
        //setData([currentNote, ...data]);
      }
    }
  }, [currentNote]);
  const deleteNote = (item) => {
    Alert.alert(
      'Do you want to remove this note?',
      'Choose yes or no',
      [
        {
          text: 'Yes',
          onPress: () => {
            dispatch(allActions.deleteNote(item))
            /*
            DBService.delete('Note', item);
            let newData = data.filter((note, index) => {
              if (note.id == item.id) {
                return false;
              } else {
                return true;
              }
            });
            setData(newData);
            */
          },
        },
        {text: 'No', style: 'cancel'},
      ],
      {cancelable: false},
    );
  };
  return (
    <>
      <StatusBar barStyle='light-content' />
      <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
        <View style={{backgroundColor: 'white', flex: 1}}>
          {/* <ScrollView> */}
          <Header name="notes" navigation={navigation} />
          <SwipeListView 
            useFlatList={true}
            data={data}
            horizontal={false}
            keyExtractor={(item, index) => item.id.toString()}
            extraData={data}
            renderItem={({item}) => (
              <Item item={item} navigation={navigation} />
            )}
            renderHiddenItem={(rowData, rowMap) => (
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => {
                  rowMap[rowData.item.id].closeRow()
                  deleteNote(rowData.item);
                }}>
                <View>
                  <Text>Delete</Text>
                </View>
              </TouchableOpacity>
            )}
            //leftOpenValue={75}
            rightOpenValue={-75}
            closeOnRowBeginSwipe={true}
            disableRightSwipe={true}
            recalculateHiddenLayout
          />
          {/* </ScrollView> */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AddNote', {note: new Note('', '', [], '')});
            }}
            style={styles.fab}>
            <Text style={styles.fabtext}>+</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'blue',
    height: 150,
  },
  deleteButton: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    padding: 10,
    margin: 5,
    flex: 1,
    backgroundColor: 'tomato',
    //marginVertical: 8,
    borderRadius: 10,
    borderWidth: 0.3,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  item: {
    //backgroundColor: "#f9c2ff",
    padding: 10,
    margin: 5,
    //marginVertical: 8,
    borderRadius: 10,
    borderWidth: 0.3,
    borderColor: 'gray',
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  footerleft: {},
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  body: {
    fontSize: 17,
    lineHeight: 25,
    paddingVertical: 5,
  },
  label: {
    fontSize: 15,
    fontStyle: 'italic',
  },
  labelbox: {
    borderRadius: 17,
    borderWidth: 0.3,
    borderColor: 'rgb(204, 204, 204)',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  created: {},
  fab: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: 'mediumseagreen',
    width: 65,
    height: 65,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    margin: 16,
    shadowColor: 'gray',
    shadowRadius: 5,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.9,
  },
  fabtext: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
  },
  toolBar: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 40,
    color: 'mediumseagreen',
    fontWeight: 'bold',
  },
});

export default Notes;
