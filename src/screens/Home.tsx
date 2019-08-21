import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Pagination from '../components/Pagination';
import Character from '../components/Character';

interface ICharacterInfo {
  id: number,
  name: string,
  status: string,
  image: string
}

function Home() {
  const [isLoading, fetching] = useState<boolean>(true);
  const [currentPage, goToPage] = useState<number>(1);
  const [characterList, getList] = useState([]);
  useEffect(() => {
    getCharacters(currentPage);
  }, [currentPage]);

  const getCharacters = async (page) => {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
      const json = await response.json();
      const data: [ICharacterInfo] = json.results.map(({
        id, name, status, image,
      }) => ({
        id, name, status, image,
      }));
      fetching(false);
      getList(data);
    } catch (err) {
      console.error(err);
    }
  };

  return !isLoading && (
  <View style={styles.wrapper}>
    <FlatList
      numColumns={2}
      showsVerticalScrollIndicator={false}
      data={characterList}
      renderItem={({ item }) => <Character item={item} />}
      keyExtractor={(item, index) => `${item.id}_${index}`}
      initialNumToRender={6}
      removeClippedSubviews
      ListFooterComponent={(
        <Pagination
          data={characterList}
          currentPage={currentPage}
          onPress={(page) => goToPage(page)}
        />
)}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
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
  separator: {
    borderBottomWidth: 1.5,
    borderColor: '#acacac',
  },
});
