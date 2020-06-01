import api from "../../api";
// import router from "../../router";

const state = {
  homeCate: 1,
  model: {
    id: 0,
    images: "",
    name: "",
    num_part: 0,
    description: "",
    tags: "",
    references: "",
    theme_id: 0,
    user_id: 0,
    created_at: "",
    updated_at: ""
  },
  modelList: [],
  modelPage: "1",
  likeModelPage: "1",
  recommendModelPage: "1"
};

const actions = {
  async getModels({ commit }, params) {
    const append = params.append;
    const resp = await api.getModels(params).then(res => res.data);
    const models = resp.results.map(e => e);
    if (append) {
      commit("addModelList", models);
    } else {
      commit("setModels", models);
    }
    commit("setModelPage", resp.next);
  },
  async onLike({ commit }, params) {
    commit;
    const resp = await api
      .setLike(params)
      .then(res => res.data)
      .catch(err => err);
    return resp;
  },
  async getLikeModels({ commit }, params) {
    const append = params.append;
    const resp = await api.getLikeModels(params).then(res => res.data);
    const models = resp.results.map(e => e);
    if (append) {
      commit("addModelList", models);
    } else {
      commit("setModels", models);
    }
    commit("setLikeModelPage", resp.next);
  },
  async getRecommendModels({ commit }, params) {
    const append = params.append;
    // 아래 api 바꾸기
    const resp = await api.getLikeModels(params).then(res => res.data);
    const models = resp.results.map(e => e);
    if (append) {
      commit("addModelList", models);
    } else {
      commit("setModels", models);
    }
    commit("setRecommendModelPage", resp.next);
  }
};

const mutations = {
  setHomeCate(state, value) {
    state.homeCate = value;
  },
  setModels(state, model) {
    state.modelList = model.map(e => e);
  },
  addModelList(state, model) {
    state.modelList = state.modelList.concat(model);
  },
  setModelPage(state, url) {
    state.modelPage = new URL(url).searchParams.get("page");
  },
  setLikeModelPage(state, url) {
    state.likeModelPage = new URL(url).searchParams.get("page");
  },
  resetModels(state) {
    state.modelList = [];
    state.modelPage = "1";
    state.likeModelPage = "1";
  },
  setRecommendModelPage(state, url) {
    state.recommendModelPage = new URL(url).searchParams.get("page");
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
