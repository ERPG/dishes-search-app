import React, { FunctionComponent } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";

interface IImageErasableSquaredProps {
  source: string;
  deleteImage: (event: any) => void;
}

export const ImageErasableSquared: FunctionComponent<IImageErasableSquaredProps> = props => {
  return (
    <View>
      <Image
        source={{ uri: props.source }}
        style={styles.image}
      />
      <TouchableOpacity
        style={styles.deleteWrapper}
        onPress={props.deleteImage}
      >
        <Text style={styles.delete}>x</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  image: {
    backgroundColor: '#ededed',
    width: 120,
    height: 120,
    resizeMode: 'cover',
    marginHorizontal: 10,
  },
  deleteWrapper: {
    position: 'absolute',
    top: 0,
    right: 15,
    padding: 5
  },
  delete: {
    color: '#ededed',
    fontSize: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 3
  }
});

export default ImageErasableSquared;
