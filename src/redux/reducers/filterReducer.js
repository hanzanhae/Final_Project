const filterInitialState = {
  selectedOption: null,
  selectedDistance: null,
  selectedCategory: []
};

const FilterReducer = (state = filterInitialState, action) => {
  switch (action.type) {
    case 'SELECTED_OPTION':
      return { ...state, selectedOption: action.payload };
    case 'SELECTED_DISTANCE':
      return { ...state, selectedDistance: action.payload };
    case 'SELECTED_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    default:
      return state;
  }
};

export default FilterReducer;
