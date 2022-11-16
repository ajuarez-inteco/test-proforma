import { models } from '../../utils/constants';

function getData() {
  const data = JSON.parse(localStorage.getItem(models));
  return !data ? [] : Object.values(data);
}

function setData(data) {
  localStorage.setItem(models, JSON.stringify({ ...data }));
}

function getAll() {
  const data = getData();
  return !data ? [] : data;
}

function getById(id) {
  const data = getData();
  return data.find((x) => x.id === id);
}

function create(params) {
  const data = getData();
  data.push(params);
  setData(data);
}

function update(uuidModel, params) {
  const data = getData();
  const updateModels = data.map((item) => {
    let copyItem = item;
    if (item.uuid === uuidModel) {
      copyItem = { ...item, ...params };
    }
    return copyItem;
  });
  setData(updateModels);
}

function deleteData(uuidModel) {
  const data = getData();
  const newData = data.filter((item) => item.uuid !== uuidModel);
  setData(newData);
}

export const modelsLocalStorage = {
  getAll,
  getById,
  create,
  update,
  delete: deleteData,
};
