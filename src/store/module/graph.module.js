import ApiService from "@/common/api.service";

import { FETCH_GRAPH } from "../actions.type";
import { FETCH_END, FETCH_START, SET_ERROR } from "../mutations.type";

const state = {
    errors: null,
    graph: [],
    graphCnt: 0,
    isLoading: true,
};

const getters = {
    graphItems(state){
        return state.graph;
    }
};

const actions = {
    [FETCH_GRAPH](context, {vmId, scriptId}){
        context.commit(FETCH_START)
        return new Promise(resolve => {
            ApiService.query("/graph?vm_id="+vmId+"&script_id="+scriptId)
                .then(({ data }) => {
                    context.commit(FETCH_END, data);
                    resolve(data);
                })
                .catch(({ response }) => {
                    context.commit(SET_ERROR, response.data.errors);
                });
        });
    }
};

const mutations = {
    [FETCH_START](state){
        state.isLoading = true
    },
    [FETCH_END](state, graph){
        state.graph = graph.data;
        state.graphCnt = graph.count;
    },
};

export default {
    state,
    actions,
    mutations,
    getters
};
