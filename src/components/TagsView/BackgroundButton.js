import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import IMAGE from '../../constants/IMAGE'
import ICO from 'react-native-vector-icons/MaterialCommunityIcons'
export default function BackgroundButton({title,onPress,
    showImage,borderColor,backgroundColor,textColor}) {
  const makeImageIfAny = (styles) => {
    if (showImage) {
      return <ICO name='check-box-outline' style={{fontSize:25,color:'grey'}} />;
    }else{
      return <ICO name='checkbox-blank-outline' style={{fontSize:25,color:'grey'}}/>;
    }
  };
  const makeStyles = () => {
    return StyleSheet.create({
      view: {
        flexDirection: 'row',
        borderRadius: 23,
        borderColor: borderColor,
        borderWidth: 0.5,
        backgroundColor: backgroundColor,
        height: 46,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 16,
        paddingRight: 16,
      },
      touchable: {
        marginLeft: 4,
        marginRight: 4,
        marginBottom: 8,
      },
      image: {
        marginRight: 8
      },
      text: {
        fontSize: 18,
        textAlign: 'center',
        color: textColor,
        fontSize: 16,
      },
    });
  };
  const styles = makeStyles()
  return (
      <TouchableOpacity style={styles.touchable} onPress={onPress}>
        <View style={styles.view}>
          {makeImageIfAny(styles)}
          <Text style={styles.text}> {title} </Text>
        </View>
      </TouchableOpacity>
  );
}
