import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import BackgroundButton from './BackgroundButton';
import PropTypes from 'prop-types';
export default function TagsView({
  selectedTag,
  allTags,
  isExclusive,
  onChangeTags,
}) {
  //
  const [selected, setSelected] = useState(selectedTag);
  const [count, setCount] = useState(0);
  useEffect(() => {
    //console.warn(selectedTag)
    setSelected(selectedTag)
  }, [count,selectedTag]);
  //


  //
  onPress = (tag) => {
    let tagselected;
    if (isExclusive) {
      tagselected = [tag];
    } else {
      tagselected = addOrRemove(selected, tag);
    }
    setCount(count + 1);
    //console.warn('Chon: ',tagselected)
    setSelected(tagselected);
    //console.warn('Type: ',typeof onChangeTags)
    if (typeof onChangeTags === 'function') {
      onChangeTags(tagselected);
    }
  };

  //
  const makeButtons = () => {
    
   // console.warn(selectedTag)
    return allTags.map((tag, i) => {
      const on = selected.includes(tag);
      //on; off
      const backgroundColor = on ? 'white' : 'white';
      const textColor = on ? 'black' : 'black';
      const borderColor = on ? 'gray' : 'grey';
      // console.warn(backgroundColor,textColor,borderColor)
      return (
        <BackgroundButton
          backgroundColor={backgroundColor}
          textColor={textColor}
          borderColor={borderColor}
          onPress={() => onPress(tag)}
          key={i}
          showImage={on}
          title={tag}
        />
      );
    });
  };

  return <View style={styles.container}>{makeButtons()}</View>;
}
TagsView.propTypes = {
  onChangeTags: PropTypes.func.isRequired,
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
  },
});
