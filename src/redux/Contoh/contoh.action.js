import {
  CREATE_CONTOH,
  RETRIEVE_CONTOH,
  UPDATE_CONTOH,
  DELETE_CONTOH,
  DELETE_ALL_CONTOH,
} from "./contoh.types";

import ContohDataService from "../../services/contoh/contoh.service";

export const createContoh = (judul, img) => async (dispatch) => {
  try {
    const res = await ContohDataService.create({ judul, img });

    dispatch({
      type: CREATE_CONTOH,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveContoh = () => async (dispatch) => {
  try {
    const res = await ContohDataService.getAll();

    dispatch({
      type: RETRIEVE_CONTOH,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateContoh = (id, data) => async (dispatch) => {
  try {
    const res = await ContohDataService.update(id, data);

    dispatch({
      type: UPDATE_CONTOH,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteContoh = (id) => async (dispatch) => {
  try {
    await ContohDataService.remove(id);

    dispatch({
      type: DELETE_CONTOH,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteAllContoh = () => async (dispatch) => {
  try {
    const res = await ContohDataService.removeAll();

    dispatch({
      type: DELETE_ALL_CONTOH,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const findContohByTitle = (judul) => async (dispatch) => {
  try {
    const res = await ContohDataService.findByTitle(judul);

    dispatch({
      type: RETRIEVE_CONTOH,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
