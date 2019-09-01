import React, { useContext } from 'react';
import {
  Container, Header, Item, Input, Icon, Button, Text,
} from 'native-base';
import { AppContext } from '../context/AppContext';
import { debounce } from '../common/utils';

const SearchBar = () => {
  const [_, dispatch] = useContext(AppContext);
  const searchCharacter = async (character) => {
    if (character) {
      const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${character}`);
      const json = await response.json();
      const { pages } = json.info || 0;
      dispatch({
        type: 'UPDATE_LIST',
        payload: {
          pageCount: pages,
          initialPage: 1,
          character,
        },
      });
    } else {
      dispatch({
        type: 'UPDATE_LIST',
        payload: {
          pageCount: '',
          initialPage: '',
          character: '',
        },
      });
    }
  };
  const filterCharacter = debounce(searchCharacter, 1000);

  return (
    <Container>
      <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="Search" onChangeText={(text) => filterCharacter(text)} />
          <Icon name="ios-people" />
        </Item>
        <Button transparent onPress={() => {}}>
          <Text>Search</Text>
        </Button>
      </Header>
    </Container>
  );
};

export default SearchBar;
