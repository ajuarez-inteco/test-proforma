import { revenue } from '../../utils/constants';

function getData() {
  const data = JSON.parse(localStorage.getItem(revenue));
  return data || {};
}

function setData(data) {
  localStorage.setItem(revenue, JSON.stringify(data));
}

function getAll(uuid) {
  const data = getData();
  return !data[uuid] ? [] : data[uuid];
}

function getToIndex(uuid, index) {
  const data = getAll(uuid);
  return data.filter((x, i) => i < index);
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

function getByType(uuid, type) {
  const data = getAll(uuid);
  return data.filter((x) => x.type === type);
}

function countAll(uuid) {
  const data = getAll(uuid);
  return data.length;
}

function update(uuid, params) {
  const data = getData();
  if (!data[uuid]) {
    data[uuid] = [];
  }
  data[uuid] = data[uuid].map((item) => {
    let newItem = item;
    if (item.uuid === params.uuid) {
      newItem = { ...item, ...params.data };
    }
    return newItem;
  });
  setData(data);
}

function deleteData(uuid, uuidItem) {
  const data = getData();
  if (!data[uuid]) {
    data[uuid] = [];
  }
  data[uuid] = data[uuid].filter((x) => x.uuid !== uuidItem);
  setData(data);
}

export const revenueLocalStorage = {
  getAll,
  getById,
  create,
  update,
  getByType,
  countAll,
  getToIndex,
  delete: deleteData,
};
