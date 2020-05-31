import ApiService from "@/common/api.service";

import { FETCH_USER, DELETE_USER_ITEM } from "../actions.type";
import { FETCH_START, FETCH_USER_END, SET_ERROR} from "../mutations.type";

const state = {
    errors: null,
    users: [],
    usersCnt: 0,
    roles: []
};

const getters = {
    userItems(state){
        return state.users;
    }
};

const actions = {
    [FETCH_USER](context){
        context.commit(FETCH_START)
        Promise.all([
            ApiService.query('/users').then((response) => response.data),
            ApiService.query('/roles').then((response) => response.data),
        ]).then(([users, roles]) => {
            context.commit(FETCH_USER_END, {users, roles});
        }).catch((error) =>
            context.commit(SET_ERROR, error));
    },

    [DELETE_USER_ITEM](context, userId){
        return new Promise(resolve => {
            ApiService.delete("/users/"+userId)
                .then(({ data }) => {
                    resolve(data)
                })
                .catch(({ response }) => {
                    context.commit(SET_ERROR, response.data.error)
                })
        });
    },
    //
    // [ADD_VM_ITEM](context, vmItem){
    //     return new Promise(resolve => {
    //         ApiService.post("/vm", vmItem)
    //             .then(({ data }) => {
    //                 resolve(data)
    //             })
    //             .catch(({ response }) => {
    //                 context.commit(SET_ERROR, response.data.error)
    //             })
    //     });
    // },
    //
    // [CHANGE_VM_ITEM](context,{vmItem, vmId}){
    //     return new Promise(resolve => {
    //         ApiService.update("/vm/"+vmId, vmItem)
    //             .then(({ data }) => {
    //                 resolve(data)
    //             })
    //             .catch(({ response }) => {
    //                 context.commit(SET_ERROR, response.data.error)
    //             })
    //     });
    // }

};

const mutations = {
    [FETCH_START](state){
        state.isLoading = true
    },
    [FETCH_USER_END](state, {users, roles}){
        state.users = users.data;
        state.roles = roles.data;
        state.usersCnt = users.count;
    },
};

export default {
    state,
    actions,
    mutations,
    getters
};
