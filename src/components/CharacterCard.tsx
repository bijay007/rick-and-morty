import React from 'react';
import {
  Text, Image, StyleSheet,
} from 'react-native';
import {
  Card, Grid, Row, Col,
} from 'native-base';

const CharacterCard = (prop) => {
  const { item, index } = prop;
  return (
    <Grid style={[
      styles.wrapper,
      index % 2 && styles.separator,
    ]}
    >
      <Card transparent>
        <Col size={1}>
          <Row size={2} style={styles.row}>
            <Text style={styles.text}>{item.name}</Text>
          </Row>
          <Row size={5}>
            <Image
              style={styles.image}
              source={{ uri: item.image }}
              resizeMode="contain"
            />
          </Row>
          <Row size={1} style={styles.row}>
            <Text style={styles.text}>
              Status:&nbsp;
              {item.status}
            </Text>
          </Row>
        </Col>
      </Card>
    </Grid>
  );
};

export default CharacterCard;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  separator: {
    borderRightWidth: 1.5,
    borderColor: '#acacac',
  },
  row: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
    paddingHorizontal: 3,
  },
  image: {
    flex: 1,
    alignSelf: 'flex-end',
    height: 80,
    width: 'auto',
    borderRadius: 5,
    padding: 4,
  },
  text: {
    textAlign: 'center',
  },
});
