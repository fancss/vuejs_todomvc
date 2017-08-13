<template>
    <div>
        {{todos}}
        <hr>
        增加一个TODO:
        <input type="text" v-model="txt" @keyup.enter="add">
        <input type="button" value="增加" @click="add">
        <hr>
        现有的TODO:
        <ul>
            <li is="todo-li" v-for="(item,index) in todos" :item="item"></li>
        </ul>
        <hr>
        总共：{{this.$store.state.todos.length}}条 已做：{{this.$store.getters.yizuo.length}}条 未做：{{this.$store.getters.weizuo.length}}条
        <input type="button" value="全部" @click="setstate('all')"      :class="{'cur':this.state=='all'}">
        <input type="button" value="仅看已做" @click="setstate('jkyz')" :class="{'cur':this.state=='jkyz'}">
        <input type="button" value="仅看未做" @click="setstate('jkwz')" :class="{'cur':this.state=='jkwz'}">
    </div>
</template>

<script>
    import TodoLi from "./TodoLi.vue";
    import * as todoTypes from "../store/todo-types.js";

    export default {
        components : {
            TodoLi
        },
        data(){
            return {
                "txt": "",
                //查看状态，all 全部 ，jkyz 仅看已做 ，jkwz 仅看未做
                "state": "all"
            }
        },
        computed : {
            todos(){
                if(this.state == "all"){
                    return this.$store.state.todos;
                }else if(this.state == "jkyz"){
                    return this.$store.getters.yizuo;
                }else if(this.state == "jkwz"){
                    return this.$store.getters.weizuo;
                }
            }
        },
        //组件被创建之后，生命周期函数
        created(){
            this.$store.dispatch(todoTypes.INIT);
        },
        methods: {
            add(){
                if(this.txt){
                    this.$store.dispatch(todoTypes.ADD , {
                        title : this.txt,
                        done : false
                    });
                };
                this.txt = "";
            },
            setstate(word){
                this.state= word;
            }
        }
    };
</script>

<style lang="css">
    .cur{
        background-color: skyblue;
    }
</style>

