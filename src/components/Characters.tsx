import React, { Component } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { ICharacterInfo, ICharacterListState } from '../interface';
import { AppContext } from '../context/AppContext';
import Pagination from './Pagination';
import Character from './Character';

export default class Characters extends Component<{}, ICharacterListState> {
  state = {
    isLoading: true,
    currentPage: 1,
    totalPages: 25,
    allCharacterList: []
  }

  componentDidMount() {
    this.getCharacters(0);
  }

  getCharacters = async (page) => {
    let fetchUrl;
    page === 0
      ? fetchUrl = 'https://rickandmortyapi.com/api/character'
      : fetchUrl = `https://rickandmortyapi.com/api/character/?page=${page}`
    try {
      const response = await fetch(fetchUrl);
      const json = await response.json();
      const data: [ICharacterInfo] = json.results.map(({
        id, name, status, image,
      }) => ({
        id, name, status, image,
      }));
      this.setState({
        isLoading: false,
        allCharacterList: data,
        currentPage: page,
        totalPages: json.info.pages
      });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { isLoading, totalPages, currentPage, allCharacterList } = this.state;
    if (!isLoading) {
      return (
        <AppContext.Consumer>
          {
            ([value]) => {
              const { filteredList, pageCount } = value;
              return (
                <View style={styles.wrapper}>
                  <FlatList
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    data={filteredList.length ? filteredList : allCharacterList}
                    renderItem={({ item }) => <Character item={item} />}
                    keyExtractor={(item, index) => `${item['id']}_${index}`}
                    initialNumToRender={8}
                    removeClippedSubviews
                    ListFooterComponent={(
                      <Pagination
                        data={filteredList.length ? filteredList : allCharacterList}
                        totalPages={filteredList.length ? pageCount : totalPages}
                        currentPage={filteredList.length ? 1 : currentPage} // TODO: filtered list paging is different than normal
                        onPress={(page) => this.getCharacters(page)}
                      />
                    )}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                  />
                </View>
              )
            }
          }
        </AppContext.Consumer>
      );
    }
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    )
  }
};

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
