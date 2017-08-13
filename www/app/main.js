import Vue from "vue";
import Vuex from "vuex";
import App from "./components/App.vue";

//全局的store
import store from "./store/index.js";


new Vue({
	el : "#app",
    store,
    components: {
        App
    }
});
