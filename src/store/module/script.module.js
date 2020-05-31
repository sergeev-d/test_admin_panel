import ApiService from "@/common/api.service";

import { FETCH_SCRIPT, DELETE_SCRIPT_ITEM, ADD_SCRIPT_ITEM, CHANGE_SCRIPT_ITEM } from "../actions.type";
import { FETCH_END, FETCH_START, SET_ERROR } from "../mutations.type";

const state = {
    errors: null,
    scripts: [],
    scriptsCnt: 0
};

const getters = {
    scriptItems(state){
        return state.scripts;
    }
};

const actions = {
    [FETCH_SCRIPT](context){
        context.commit(FETCH_START)
        return new Promise(resolve => {
            ApiService.query("/scripts")
                .then(({ data }) => {
                    context.commit(FETCH_END, data);
                    resolve(data);
                })
                .catch(({ response }) => {
                    context.commit(SET_ERROR, response.data.errors);
                });
        });
    },

    [DELETE_SCRIPT_ITEM](context, scriptId){
        return new Promise(resolve => {
            ApiService.delete("/scripts/"+scriptId)
                .then(({ data }) => {
                    resolve(data)
                })
                .catch(({ response }) => {
                    context.commit(SET_ERROR, response.data.error)
                })
        });
    },

    [ADD_SCRIPT_ITEM](context, scriptItem){
        return new Promise(resolve => {
            ApiService.post("/scripts", scriptItem)
                .then(({ data }) => {
                    resolve(data)
                })
                .catch(({ response }) => {
                    context.commit(SET_ERROR, response.data.error)
                })
        });
    },

    [CHANGE_SCRIPT_ITEM](context,{scriptItem, scriptId}){
        return new Promise(resolve => {
            ApiService.update("/scripts/"+scriptId, scriptItem)
                .then(({ data }) => {
                    resolve(data)
                })
                .catch(({ response }) => {
                    context.commit(SET_ERROR, response.data.error)
                })
        });
    }

};

const mutations = {
    [FETCH_START](state){
        state.isLoading = true
    },
    [FETCH_END](state, scripts){
        state.scripts = scripts.monitoringScripts;
        state.scriptsCnt = scripts.count;
        state.isLoading = false
    },
};

export default {
    state,
    actions,
    mutations,
    getters
};
