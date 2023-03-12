import { createModel } from "@rematch/core";
import { Models } from "@rematch/core";
import { init } from "@rematch/core";
import persistPlugin from "@rematch/persist";
import storage from "redux-persist/lib/storage";

export interface RootModel extends Models<RootModel> {
  NetworkUpdates: typeof NetworkUpdates;
}

type NetworkUpdateState = {};

export const NetworkUpdates = createModel<RootModel>()({
  state: {} as NetworkUpdateState,
  reducers: {},
  effects: (dispatch) => ({}),
});

export const models: RootModel = { NetworkUpdates };

const persistConfig = {
  key: "root",
  storage,
  blacklist: [],
};

export const store = init({
  models,
  // @ts-ignore
  plugins: [persistPlugin(persistConfig)],
  redux: {
    devtoolOptions: {
      maxAge: 900000,
      trace: true,
    },
    rootReducers: { "Authentication/signout": () => undefined },
  },
});
