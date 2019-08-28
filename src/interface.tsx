interface ICharacterInfo {
  id: number,
  name: string,
  status: string,
  image: string
}

interface ICharacterListState {
  isLoading: boolean,
  currentPage: number,
  totalPages: number,
  allCharacterList: Array<ICharacterInfo>
}

export {
  ICharacterInfo,
  ICharacterListState,
}