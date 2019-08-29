import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { ICharacterInfo } from '../interface';
import { AppContext } from '../context/AppContext';
import Pagination from './Pagination';
import Character from './Character';

const Characters = () =>  {
  const [state] = useContext(AppContext);
  const [isLoading, fetching] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(undefined);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [allCharacterList, setCharacterList] = useState([]);

  useEffect(() => {
    getCharacters(currentPage, state.character);
  }, [currentPage, state.character]);

  const getCharacters = async (page? : number, character? : string) => {
    let fetchUrl;
    character
      ? fetchUrl = `https://rickandmortyapi.com/api/character/?page=${page}&name=${character}`
      : fetchUrl = `https://rickandmortyapi.com/api/character/?page=${page}`
    try {
      const response = await fetch(fetchUrl);
      const json = await response.json();
      const data: [ICharacterInfo] = json.results.map(({
        id, name, status, image,
      }) => ({
        id, name, status, image,
      }));
      fetching(false);
      setCurrentPage(page);
      setTotalPages(json.info.pages);
      setCharacterList(data);
    } catch (err) {
      console.error(err);
    }
  }

  if (!isLoading) {
    const { pageCount, character } = state;
    return (
      <View style={styles.wrapper}>
        <FlatList
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={allCharacterList}
          renderItem={({ item }) => <Character item={item} />}
          keyExtractor={(item, index) => `${item.id}_${index}`}
          initialNumToRender={8}
          removeClippedSubviews
          ListFooterComponent={(
            <Pagination
              data={allCharacterList}
              totalPages={ pageCount ? pageCount : totalPages}
              currentPage={currentPage ? currentPage: 1}
              onPress={(page) => getCharacters(page, character)}
              character={character}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    );
  }
  return (
    <View style={styles.loading}>
      <ActivityIndicator />
    </View>
  )
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
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
});
