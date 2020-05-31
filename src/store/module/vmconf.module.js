import ApiService from "@/common/api.service";

import { FETCH_VMCONF, DELETE_VMCONF_ITEM, ADD_VMCONF_ITEM, CHANGE_VMCONF_ITEM } from "../actions.type";
import { FETCH_START, SET_ERROR, FETCH_VM_CONF_END } from "../mutations.type";

const state = {
    errors: null,
    vmConf: [],
    vmConfCnt: 0,
    vmDict: [],
    vmCnt: 0,
    scriptDict: [],
    scriptsCnt: 0
};

const getters = {
    vmConf(state){
        return state.vmConf;
    },
    vmDict(state){
        return state.vmDict;
    },
    scriptsDict(state){
        return state.scriptDict;
    }
};

const actions = {
    [FETCH_VMCONF](context){
        context.commit(FETCH_START);
        Promise.all([
            ApiService.query('/vmconf').then((response) => response.data),
            ApiService.query('/vm').then((response) => response.data),
            ApiService.query('/scripts').then((response) => response.data),
        ]).then(([conf, vm, scripts]) => {
            context.commit(FETCH_VM_CONF_END, {conf, vm, scripts});
        }).catch((error) =>
            context.commit(SET_ERROR, error));
    },

    [DELETE_VMCONF_ITEM](context, id){
        return new Promise(resolve => {
            ApiService.delete("/vmconf/"+id)
                .then(({ data }) => {
                    resolve(data)
                })
                .catch(({ response }) => {
                    context.commit(SET_ERROR, response.data.error)
                })
        });
    },

    [ADD_VMCONF_ITEM](context, item){
        return new Promise(resolve => {
            ApiService.post("/vmconf", item)
                .then(({ data }) => {
                    resolve(data)
                })
                .catch(({ response }) => {
                    context.commit(SET_ERROR, response.data.error)
                })
        });
    },

    [CHANGE_VMCONF_ITEM](context,{vmItem, vmId}){
        return new Promise(resolve => {
            ApiService.update("/vmconf/"+vmId, vmItem)
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
    [FETCH_VM_CONF_END](state, {conf, vm, scripts}){
        state.vmConf = conf.confs;
        state.vmDict = vm.data;
        state.scriptDict = scripts.monitoringScripts
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
