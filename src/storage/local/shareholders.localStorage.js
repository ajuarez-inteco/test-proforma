import { shareholders } from '../../utils/constants';

function getData() {
  const data = JSON.parse(localStorage.getItem(shareholders));
  return data || {};
}

function setData(data) {
  localStorage.setItem(shareholders, JSON.stringify(data));
}

function getAll(uuid) {
  const data = getData();
  return !data[uuid] ? [] : data[uuid];
}

function getById(id) {
  const data = getData();
  return data.find((x) => x.id === id);
}

function create(uuid, params) {
  const data = getData();
  if (!data[uuid]) {
    data[uuid] = [];
  }
  data[uuid].push(params);
  setData(data);
}

function update(id, params) {
  const data = getData();
  const i = data[id].findIndex((x) => x.uuid === params.uuid);
  data[id][i] = params;
  setData(data);
}

function deleteData(modelId, paramId) {
  const data = getData();
  const i = data[modelId].findIndex((x) => x.uuid === paramId);
  data[modelId].splice(i, 1);
  setData(data);
}

export const shareholdersLocalStorage = {
  getAll,
  getById,
  create,
  update,
  delete: deleteData,
};
