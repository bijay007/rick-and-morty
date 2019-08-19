import React, { useState, useEffect } from 'react';
import {
  View, Text, Image, FlatList, StyleSheet,
} from 'react-native';
import { Card, CardItem, Left, Right, Separator } from 'native-base';

interface CharacterInfo {
  name: string,
  status: string,
  image: string
}

function Home() {
  const [isLoading, fetching] = useState(true);
  const [characterList, getList] = useState([]);
  useEffect(() => {
    getCharacters()
  }, [characterList]);

  const getCharacters = async () => {
    try {
      const response = await fetch('https://rickandmortyapi.com/api/character/');
      const json = await response.json();
      const data: [CharacterInfo] = json.results.map(({ name, status, image }) => ({ name, status, image }));
      fetching(false);
      getList(data);
    } catch (err) {
      console.error(err);
    }
  };

  return !isLoading && (
     <View style={styles.wrapper}>
      <FlatList
        data={characterList}
        renderItem={({ item }) => (
          <Card transparent>
            <CardItem>
              <Left style={{flex: 2}}>
                <Image
                  style={styles.image}
                  source={{uri: item.image}}
                  resizeMode={'cover'}
                />
              </Left>
              <Right style={styles.right}>
                <Text>{item.name}</Text>
                <Text>Status: {item.status}</Text>
              </Right>
            </CardItem>
          </Card>
        )}
        keyExtractor={(item, index) => `${item.name}_${index}`}
        removeClippedSubviews={true}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={19}
        ItemSeparatorComponent={() => <Separator style={{height: 4}} />}
      />
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
  },
  right: {
   flex: 1,
   alignItems: 'flex-start',
   justifyContent: 'space-around',
  },
  image: {
    height: 150,
    width: 180,
  },
});
