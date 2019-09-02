import React, {
  useState, useEffect, useContext,
} from 'react';
import {
  View, FlatList, StyleSheet, ActivityIndicator,
} from 'react-native';
import { ICharacterInfo } from '../interfaces';
import { AppContext } from '../context/AppContext';
import fetchCharacters from '../common/api';
import Pagination from './Pagination';
import CharacterCard from './CharacterCard';

const CharacterList = () => {
  const [state] = useContext(AppContext);
  const [isLoading, fetching] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [allCharacterList, setCharacterList] = useState([]);

  useEffect(() => { // On Component Mount
    getCharacters();
  }, []);

  useEffect(() => { // On Component Updates
    const { character } = state;
    getCharacters(currentPage, character);
  }, [currentPage, state.character]);

  const getCharacters = async (page?: number, character?: string) => {
    const { filteredPages, initialFilterPage } = state;
    const filterParams = { filteredPages, initialFilterPage };
    const response = await fetchCharacters(page, character, filterParams);
    if (response.results) {
      const data: [ICharacterInfo] = response.results.map(({
        id, name, status, image,
      }) => ({
        id, name, status, image,
      }));
      fetching(false);
      setCurrentPage(page || 1);
      setTotalPages(response.info.pages);
      setCharacterList(data);
      return;
    }
    setCharacterList([
      {
        name: 'No character found.',
        status: 404,
      },
    ]);
    setTotalPages(0);
  };

  if (!isLoading) {
    const { filteredPages, character } = state;
    return (
      <View style={styles.wrapper}>
        <FlatList
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={allCharacterList}
          renderItem={({ item, index }) => <CharacterCard item={item} index={index + 1} />}
          keyExtractor={(item, index) => `${item.id}_${index}`}
          windowSize={17}
          initialNumToRender={8}
          removeClippedSubviews
          ListFooterComponent={(
            <Pagination
              data={allCharacterList}
              totalPages={filteredPages || totalPages}
              currentPage={currentPage}
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
  );
};

export default CharacterList;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
    height: '100%',
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
