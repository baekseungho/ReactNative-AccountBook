export const ADD_HOUSE = "ADD_HOUSE";
export const REMOVE_HOUSE = "REMOVE_HOUSE";
export const UPDATE_HOUSE = "UPDATE_HOUSE";
export const SELECT_HOUSE = "SELECT_HOUES";

import uuid from "react-native-uuid";

export function selectHouse(house) {
  return {
    type: SELECT_HOUSE,
    house,
  };
}

export function addHouse(house) {
  return {
    type: ADD_HOUSE,
    house: { ...house, id: uuid.v4() },
  };
}

export function removeHouse(house) {
  return {
    type: REMOVE_HOUSE,
    house,
  };
}

export function updateHouse(house) {
  return {
    type: UPDATE_HOUSE,
    house: { ...house, id: uuid.v4() },
  };
}
