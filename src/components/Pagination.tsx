import React from 'react';
import {
  Text, StyleSheet, TouchableOpacity, FlatList, ScrollView,
} from 'react-native';

const Pagination = (props) => {
  const setCurrentPage = (page, character) => props.onPress(page, character);
  const createPageIndex = () => {
    const pageIndex = [];
    const { totalPages, currentPage, character } = props;
    for (let index = 1; index <= totalPages; index++) {
      pageIndex.push(
        <TouchableOpacity
          onPress={() => setCurrentPage(index, character)}
          style={styles.page}
        >
          <Text style={
            index === currentPage
              ? styles.active_page
              : null
          }
          >
            {index}
          </Text>
        </TouchableOpacity>,
      );
    }
    return pageIndex;
  };

  return (
    <ScrollView contentContainerStyle={styles.pagination}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={createPageIndex()}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => item}
        removeClippedSubviews
      />
    </ScrollView>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  pagination: {
    flex: 1,
    paddingVertical: 5,
    height: 50,
    alignItems: 'center',
  },
  page: {
    flex: 1,
    padding: 2,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  active_page: {
    color: '#3be1c5',
    textShadowRadius: 2,
    textShadowColor: '#c91f37',
    transform: [{ scale: 1.4 }],
  },
});
