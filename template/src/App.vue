<template>
    <div id="app">
        <img src="./assets/logo.png">
        {{#router}}
        <router-view/>
        {{else}}
        <HelloWorld/>
        {{/router}}
    </div>
</template>
{{#typescript}}
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue";

@Component({
    components: {
        HelloWorld
    }
})
export default class App extends Vue {

}
</script>
{{/typescript}}
{{#unless typescript}}
<script>
{{#unless router}}
import HelloWorld from "@/components/HelloWorld";
{{/unless}}
export default {
    name: "App"{{#router}}{{else}},
    components: {
        HelloWorld
    }{{/router}}
};
</script>
{{/unless}}
<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>