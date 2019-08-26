import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Pagination from './Pagination';
import Character from './Character';

interface ICharacterInfo {
  id: number,
  name: string,
  status: string,
  image: string
}

const Characters = () => {
  const [isLoading, fetching] = useState<boolean>(true);
  const [currentPage, goToPage] = useState<number>(1);
  const [allCharacterList, setCharacterList] = useState([]);
  const [filteredList, filterCharacter] = useState([]);

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
      setCharacterList(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!isLoading) {
    const dataList = filteredList.length > 0 ? filteredList : allCharacterList;
    return (
      <View style={styles.wrapper}>
        <FlatList
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={dataList}
          renderItem={({ item }) => <Character item={item} />}
          keyExtractor={(item, index) => `${item.id}_${index}`}
          initialNumToRender={6}
          removeClippedSubviews
          ListFooterComponent={(
            <Pagination
              data={dataList}
              totalItems={dataList.length}
              currentPage={currentPage}
              onPress={(page) => goToPage(page)}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    );
  }
};

export default Characters;

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
