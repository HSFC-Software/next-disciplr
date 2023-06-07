import { createModel } from "@rematch/core";
import { Models } from "@rematch/core";
import { init, RematchDispatch, RematchRootState } from "@rematch/core";
import persistPlugin from "@rematch/persist";
import storage from "redux-persist/lib/storage";
import { createMigrate } from "redux-persist";
import { uuidv4 } from "./utils";

export interface RootModel extends Models<RootModel> {
  NetworkUpdates: typeof NetworkUpdates;
  Networks: typeof Networks;
  Profile: typeof Profile;
  BreadCrumbs: typeof BreadCrumbs;
  App: typeof App;
}

type NetworkUpdateState = {};

export const NetworkUpdates = createModel<RootModel>()({
  state: {} as NetworkUpdateState,
  reducers: {},
  effects: (dispatch) => ({}),
});

export const Networks = createModel<RootModel>()({
  state: {},
  reducers: {},
  effects: (dispatch) => ({}),
});

export const Profile = createModel<RootModel>()({
  state: {
    updateReference: "",
  },
  reducers: {
    setUpdateReference(state, payload: string) {
      return {
        ...state,
        updateReference: payload,
      };
    },
  },
  effects: (dispatch) => ({}),
});

const BreadCrumbs = createModel<RootModel>()({
  state: {
    icon: "",
    pages: [] as { url: string; title: string; id: string }[],
  },
  reducers: {
    setIcon: (_, icon: string) => ({ ..._, icon }),
    addPage: (
      state,
      { url, title, id }: { url: string; title: string; id?: string }
    ) => {
      const pages = state.pages;
      const pageExist = !!pages.find((page) => page.id === id);

      if (pageExist) return state;

      return {
        ...state,
        pages: [...state.pages, { url, title, id: id ?? uuidv4() }],
      };
    },
    goBack: (state) => ({
      ...state,
      pages: state.pages.slice(0, state.pages.length - 1),
    }),
    setPages: (state, pages) => ({ ...state, pages }),
  },
  effects: () => ({}),
});

type AppState = {
  selectedEventDate: "";
};

export const App = createModel<RootModel>()({
  state: {
    selectedEventDate: "",
  } as AppState,
  reducers: {
    setSelectedEventDate: (state, selectedEventDate) => ({
      ...state,
      selectedEventDate,
    }),
  },
  effects: (dispatch) => ({}),
});

export const models: RootModel = {
  NetworkUpdates,
  Networks,
  Profile,
  BreadCrumbs,
  App,
};

const migrations = {
  0: (state: any) => ({
    ...state,
    Profile: {
      ...state.Profile,
    },
  }),
  1: (state: any) => ({
    ...state,
    BreadCrumbs: { icon: null, pages: [] },
  }),
  2: (state: any) => ({
    ...state,
    App: { selectedEventDate: "" },
  }),
};

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["App"],
  version: 2,
  migrate: createMigrate(migrations, { debug: true }),
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

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type State = RematchRootState<RootModel>;
