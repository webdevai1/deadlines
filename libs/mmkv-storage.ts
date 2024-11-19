import { Storage } from "redux-persist";
import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

const MMKVStorage: Storage = {
  getItem: (key: string) => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key: string) => {
    storage.delete(key);
    return Promise.resolve();
  },
  setItem: (key: string, value: boolean | number | string | Uint8Array) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
};
export default MMKVStorage;
