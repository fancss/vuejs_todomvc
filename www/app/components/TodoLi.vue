<template>
    <li>
        <input ref="changebox" type="checkbox" :checked="item.done" @click="changedone">
        <span v-show="!onEdit" @dblclick="startEdit(true)" :class="{'done':item.done}">{{item.title}}</span>
        <input ref="txt" v-show="onEdit" type="text" @keyup.enter="startEdit(false)" :value="item.title"/>
        <input type="button" value="x" @click="del"/>
    </li>
</template>

<script>
    import * as todoTypes from "../store/todo-types.js";
    export default {
        props:["item"],
        data () {
            return {
                onEdit :false
            };
        },
        methods : {
           startEdit(truefalse){
                this.onEdit=truefalse;
                //当结束编辑的时候，发送请求
                if(truefalse == false){
                    this.$store.dispatch(todoTypes.CHANGETITLE,{
                        "id" : this.item.id,
                        "title" : this.$refs.txt.value
                    });
                };
           },
           changedone(){
                this.$store.dispatch(todoTypes.CHANGEDONE,{
                    "id" : this.item.id,
                    "done" : event.target.checked
                });
           },
           del(){
                this.$store.dispatch(todoTypes.DEL,{
                    "id" : this.item.id
                });
           }
        }
    };
</script>

<style lang="css">
    .done{
        text-decoration:line-through;
    }
</style>