import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  Linking,
  TouchableOpacity,
  Image,
} from 'react-native';
import {ImageConfig} from '../constants';
export interface AlbumCardComponentProps {
  title?: string;
  onPress?: () => void;
  isHorizontal?: boolean;
  isVertical?: boolean;
}

const AlbumCardComponent = (props: AlbumCardComponentProps) => {
  const {title, onPress, isHorizontal, isVertical} = props;

  return (
    <>
      {isHorizontal && (
        <TouchableOpacity
          onPress={() => {
            if (onPress) {
              onPress();
            }
          }}
          style={styles.container1}>
          <View>
            <Image
              source={ImageConfig.Placeholder}
              resizeMethod="scale"
              resizeMode="contain"
              style={styles.imageStyle}
            />
          </View>
          <View style={styles.titleTextContainer}>
            <Text numberOfLines={2} style={styles.titleTextStyle}>
              {title}
            </Text>
          </View>
        </TouchableOpacity>
      )}
      {isVertical && (
        <TouchableOpacity
          onPress={() => {
            if (onPress) {
              onPress();
            }
          }}
          style={styles.container2}>
          <Image source={ImageConfig.Placeholder} style={styles.imageStyle2} />
          <Text
            style={[
              styles.titleTextStyle,
              {
                width: 100,
                textAlign: 'center',
                marginTop: 2,
                // backgroundColor: 'red',
              },
            ]}>
            {title}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container1: {
    height: 180,
    maxWidth: 200,
    overflow: 'hidden',
    marginTop: 20,
    width: '48%',
    marginRight: 0,
  },
  imageStyle: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  titleTextContainer: {
    height: '100%',
    overflow: 'hidden',
  },
  titleTextStyle: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
  },
  // ---------------------------------------------
  container2: {
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 20,
  },
  imageStyle2: {
    height: 100,
    width: 100,
    borderRadius: 20,
  },
});

export default AlbumCardComponent;
