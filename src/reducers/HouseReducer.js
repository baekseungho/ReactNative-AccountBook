import { ADD_HOUSE, REMOVE_HOUSE, SELECT_HOUSE } from "../Action";
import uuid from "react-native-uuid";

const initialState = {
  update: false,
  idx: -1,
  houses: [
    {
      division: "지출",
      money: 1700,
      detail: "맛동산",
      kind: "간식",
      regDate: "23-05-01",
      id: uuid.v4(),
    },
  ],
};

const HouseReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_HOUSE: {
      state.idx = state.houses.findIndex(
        (house) => house.id === action.house.id
      );
      state.update = true;
      return state;
    }
    case ADD_HOUSE:
      state.update = false;
      state.idx = -1;
      return {
        houses: [...state.houses, action.house],
      };
    case REMOVE_HOUSE:
      const index = state.houses.findIndex(
        (house) => house.id === action.house.id
      );
      return {
        houses: [
          ...state.houses.slice(0, index),
          ...state.houses.slice(index + 1),
        ],
      };
    default:
      return state;
  }
};

export default HouseReducer;
