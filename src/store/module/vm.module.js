import ApiService from "@/common/api.service";

import { FETCH_VM, DELETE_VM_ITEM, ADD_VM_ITEM, CHANGE_VM_ITEM } from "../actions.type";
import { FETCH_END, FETCH_START, SET_ERROR } from "../mutations.type";

const state = {
    errors: null,
    vm: [],
    vmCnt: 0
};

const getters = {
    vmItems(state){
        return state.vm;
    }
};

const actions = {
    [FETCH_VM](context){
        context.commit(FETCH_START)
        return new Promise(resolve => {
            ApiService.query("vm")
                .then(({ data }) => {
                    context.commit(FETCH_END, data);
                    resolve(data);
                })
                .catch(({ response }) => {
                    context.commit(SET_ERROR, response.data.errors);
                });
        });
    },

    [DELETE_VM_ITEM](context, vmId){
        return new Promise(resolve => {
            ApiService.delete("/vm/"+vmId)
                .then(({ data }) => {
                    resolve(data)
                })
                .catch(({ response }) => {
                    context.commit(SET_ERROR, response.data.error)
                })
        });
    },

    [ADD_VM_ITEM](context, vmItem){
        return new Promise(resolve => {
            ApiService.post("/vm", vmItem)
                .then(({ data }) => {
                    resolve(data)
                })
                .catch(({ response }) => {
                    context.commit(SET_ERROR, response.data.error)
                })
        });
    },

    [CHANGE_VM_ITEM](context,{vmItem, vmId}){
        return new Promise(resolve => {
            ApiService.update("/vm/"+vmId, vmItem)
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
    [FETCH_END](state, vm){
        state.vm = vm.data;
        state.vmCnt = vm.count;
    },
};

export default {
    state,
    actions,
    mutations,
    getters
};
