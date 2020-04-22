import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  ScrollView,
  Button,
} from 'react-native';
import TagsView from '../components/TagsView/TagsView';
import Header from './Header';
import add0rRemove from '../util/add0rRemove';
import addIfNotExits from '../util/addIfNotExits';
import allActions from '../redux/action';
import Label from '../model/label';

export default function Tags({navigation, route}) {
  //const selected = route.params.selected //['Swift', 'Kotlin']
  //const tags = route.params.tags //['Swift', 'Kotlin', 'C#', 'Haskell', 'Java']
  //const selTag = route.params.selected
  const [selTag, setselTag] = useState(route.params.selected);
  const [txtLabel, settxtLabel] = useState('');
  const [tags, setTags] = useState([]);
  const [count, setCount] = useState({count: 1, ba: 'ma'});
  useEffect(
    () => {
      //A
      //Chạy lần render thứ 1 và những lần render tiếp theo
      //allActions.deleteAll()
      let tags = allActions.fetchLabel();
      console.log('TAGS: ',tags)
      setTags([...tags]);
      return () => {
        //B
        //Chạy từ lần render thứ 2 và những lần render tiếp theo
        //Từ lần render thứ 2 sẽ chạy B rồi đến A
        //hoặc khi component bị unmount (đóng component lại, chuyển qua giao diện khác)
        setselTag([]);
      };
    },
    [], //[]Chay nhat nhat 1 lan
  );
  function getSelected() {
    //console.log('Label Respone', selTag);
    return selTag;
  }
  useEffect(()=>{
    console.log('RUN')
    console.log('SELECTED TAGS: ',selTag)
    console.log('ALLTAGS: ',tags)
  })
  const addTag = (tagName) => {
    if (tagName != undefined && tagName != '') {
     let label = new Label(tagName);
      allActions.addlabel(label);
      //console.warn(tagName)
      setTags(addIfNotExits(tags, tagName));
      //console.warn(tags)
      const sel = add0rRemove(selTag, tagName)
      console.log('Sel: ',sel)
      setselTag(sel);
      //console.log('LABLE: ',label)
      //Cap nhat state de tu render lai giao dien
      console.log('Voooooo.....................')
      setCount({count: count+1, ba: 'ba'});
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header name="tags" navigation={navigation} transferdata={getSelected} />
      <ScrollView style={styles.container}>
        <View style={styles.inputbox}>
          <TextInput
            placeholder="Enter lable name"
            returnKeyType="done"
            autoFocus={false}
            autoCorrect = {false}
            style={styles.input}
            //    ref = {(el)=>{this.txtInput = el}}
            onChangeText={(text) => settxtLabel(text)}
            onSubmitEditing={() => {
              addTag(txtLabel);
            }}
          />
          <Button
            onPress={() => {
              addTag(txtLabel);
            }}
            title="Add"
            testID="btnok"
          />
        </View>

        <TagsView
          allTags={tags}
          selectedTag={selTag}
          isExclusive={false}
          onChangeTags={(tagselected) => {
            setselTag([...tagselected]);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'whitesmoke',
  },
  inputbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingTop: 5,
  },
  input: {
    fontSize: 20,
    borderBottomWidth: 0.7,
    borderBottomColor: 'grey',
    borderBottomEndRadius: 20,
    paddingBottom: 5,
    flex: 1,
  },
});
