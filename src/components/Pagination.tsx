import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, FlatList,
} from 'react-native';

const Pagination = (props) => {
  const setCurrentPage = (page) => props.onPress(page);
  const createPageIndex = () => {
    const pageIndex = [];
    const { totalPages } = props;
    const { currentPage } = props;
    for (let index = 1; index <= totalPages; index++) {
      pageIndex.push(
        <TouchableOpacity onPress={() => setCurrentPage(index)}>
          <View style={styles.page_number}>
            <Text style={
              index === currentPage
                ? styles.active_page
                : null
            }
            >
              {index}
            </Text>
          </View>
        </TouchableOpacity>,
      );
    }
    return pageIndex;
  };

  return (
    <View style={styles.pagination}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={createPageIndex()}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => item}
        removeClippedSubviews
      />
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  pagination: {
    flex: 1,
    padding: 2,
    height: 50,
  },
  page_number: {
    flex: 1,
    width: 50,
    paddingTop: 5,
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
