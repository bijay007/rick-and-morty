import React from 'react';
import {
  View, Text, Image, StyleSheet,
} from 'react-native';
import { Card, CardItem } from 'native-base';

const Character = (prop) => {
  const {
    name, image, status, id,
  } = prop.item;
  return (
    <View style={[
      styles.wrapper,
      id % 2 && styles.separator,
    ]}
    >
      <Card transparent>
        <Text style={styles.text}>{name}</Text>
        <CardItem>
          <Image
            style={styles.image}
            source={{ uri: image }}
            resizeMode="cover"
          />
        </CardItem>
        <Text style={styles.text}>
          Status:
          {status}
        </Text>
      </Card>
    </View>
  );
};

export default Character;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
  },
  separator: {
    borderRightWidth: 1.5,
    borderColor: '#acacac',
  },
  image: {
    height: 80,
    width: 100,
    borderRadius: 5,
  },
  text: {
    textAlign: 'center',
    padding: 2,
  },
});
