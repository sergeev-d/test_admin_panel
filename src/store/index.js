import Vue from "vue";
import Vuex from "vuex";

import auth from "./module/auth.module"
import vm from "./module/vm.module"
import script from "./module/script.module"
import vmconf from "./module/vmconf.module"
import graph from "./module/graph.module"

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        vm,
        script,
        vmconf,
        graph
    }
});
