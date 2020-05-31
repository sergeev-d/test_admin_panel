import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import { API_URL } from "@/common/config";
import JwtService from "./jwt.service";

const ApiService = {
    init() {
        Vue.use(VueAxios, axios);
        Vue.axios.defaults.baseURL = API_URL;
    },

    setHeader() {
        Vue.axios.defaults.headers.common["Authorization"] = `Bearer ${JwtService.getToken()}`;
        Vue.axios.defaults.headers.common['Accept'] = 'application/json';
        Vue.axios.defaults.headers.common['Content-Type'] = 'application/json';
        // Vue.axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    },

    setAuthHeader(auth) {
        Vue.axios.defaults.headers.common["Authorization"] = `Basic ${auth}`;
        Vue.axios.defaults.headers.common['Accept'] = 'application/json';
        Vue.axios.defaults.headers.common['Content-Type'] = 'application/json';
        // Vue.axios.defaults.headers.common['Access-Control-Request-Headers'] = 'X-PINGOTHER, Content-Type';
        // Vue.axios.defaults.headers.common['Access-Control-Request-Method'] = '*';
        Vue.axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        // Vue.axios.defaults.headers.common['Access-Control-Allow-Credentials'] = 'true';
    },

    query(resource, params) {
        ApiService.setHeader();
        return Vue.axios.get(resource, params)
            .catch(error => {
                throw new Error(`ApiService ${error}`);
        });
    },

    auth(resource, params){
        const auth = btoa(params.user + ':' + params.password);
        ApiService.setAuthHeader(auth);
        return Vue.axios.post(resource)
            .catch(error => {
                console.log(error);
                throw new Error(`ApiService ${error}`);
            });
    },

    post(resource, params) {
        ApiService.setHeader();
        return Vue.axios.post(resource, params)
            .catch(error => {
                    throw new Error(`ApiService ${error}`);
        });
    },

    delete(resource, param){
        ApiService.setHeader();
        return Vue.axios.delete(resource, param)
            .catch(error => {
                throw new Error(`ApiService ${error}`);
        });
    },

    update(resource, params) {
        ApiService.setHeader();
        return Vue.axios.patch(resource, params)
            .catch(error => {
                throw new Error(`ApiService ${error}`);
            });
    },
};

export default ApiService;

export const AssessmentService = {
    query(params) {
        return ApiService.query(("assessments"), {
            params: params
        })
    }

};

export const DownloadService = {
    get(params) {
        return ApiService.query(("download_document"), {
            params: {
                doc_id:params
            }
        })
    }

};
