import React, { useContext } from 'react';
import {
  Container, Header, Item, Input, Icon, Button, Text,
} from 'native-base';
import { AppContext } from '../context/AppContext';
import { debounce } from '../common/utils/helpers';

const SearchBar = () => {
  const [state, setState] = useContext(AppContext);
  const searchCharacter = async (text) => {
    if (text) {
      const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${text}`);
      const json = await response.json();
      if (json.results) {
        const data = json.results.map(({
          id, name, status, image,
        }) => ({
          id, name, status, image,
        }));
        const newState = {
          filteredList: data,
          pages: json.info.pages
        }
        setState((state) => ({ ...state, ...newState }));
      }
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
