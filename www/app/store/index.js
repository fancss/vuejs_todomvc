import Vue from "vue";
import Vuex from "vuex";
import createLogger from "./logger/logger.js";
import todoActions from "./actions/todoActions.js";
import * as todoTypes from "./todo-types.js";

Vue.use(Vuex);
let store = new Vuex.Store({
    //store中的5个属性：state  mutations  getters  actions plugins
    state: {
        "todos":[]
    },
    mutations:{
        [todoTypes.INIT](state, todos){
            state.todos=todos;
        },
        [todoTypes.CHANGETITLE](state, payload){
            state.todos.forEach((item)=>{
                if(item.id == payload.id){
                    item.title = payload.title;
                }
            });
        },
        [todoTypes.CHANGEDONE](state, payload){
            state.todos.forEach((item)=>{
                if(item.id == payload.id){
                    item.done = payload.done;
                }
            });
        },
        [todoTypes.ADD](state, payload){
            state.todos.push({
                "id":payload.id,
                "title":payload.title,
                "done":payload.done
            });
        },
        [todoTypes.DEL](state, payload){
            state.todos= state.todos.filter((item)=>{
                return item.id != payload.id;
            })
        }
    },
    actions : {...todoActions},
    plugins: [createLogger()],
    getters : {
        yizuo(state){
            return state.todos.filter((item)=>{
                return item.done == true;
            })
        },
        weizuo(state){
            return state.todos.filter((item)=>{
                return item.done == false;
            })
        }
    }
});
export default store;