// @flow
const axios = jest.genMockFromModule('axios');

let callback;

axios.__setGetImplementation = (cb: Function) => {
  callback = cb;
};

axios.get = jest.fn(() => callback());

axios.create = jest.fn(() => ({ get: axios.get }));

export default axios;
