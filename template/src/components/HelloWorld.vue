<template>
    <div class="hello">
        <h1 @click="onTitleClick">
            <u>\{{ msg }}</u>
        </h1>
        <h2>Essential Links</h2>
        <ul>
            <li>
                <a href="https://vuejs.org" target="_blank">Core Docs</a>
            </li>
            <li>
                <a href="https://forum.vuejs.org" target="_blank">Forum</a>
            </li>
            <li>
                <a href="https://chat.vuejs.org" target="_blank">Community Chat</a>
            </li>
            <li>
                <a href="https://twitter.com/vuejs" target="_blank">Twitter</a>
            </li>
            <br>
            <li>
                <a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a>
            </li>
        </ul>
        <h2>Ecosystem</h2>
        <ul>
            <li>
                <a href="http://router.vuejs.org/" target="_blank">vue-router</a>
            </li>
            <li>
                <a href="http://vuex.vuejs.org/" target="_blank">vuex</a>
            </li>
            <li>
                <a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a>
            </li>
            <li>
                <a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a>
            </li>
        </ul>
        <alert v-model="showAlert" title="恭喜"> \{{ msg }}</alert>
    </div>
</template>
{{#typescript}}
<script lang="ts">
import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from "vue-property-decorator";
{{#vux}}import { Alert } from "vux";{{/vux}}
@Component({
    components: {
        Alert
    }
})
export default class HellowWord extends Vue {
    msg = "Welcome to Your Vue.js App";
    showAlert = false;

    onTitleClick() {
        {{#topmobi}}
            this.msg = `Welcome to Your Vue.js App! topmobi: ${window.topmobi.native}`;
            {{else}}
            this.msg = "Welcome to Your Vue.js App!";
            {{/topmobi}}
            this.showAlert = true;
    }
}
</script>
{{/typescript}}
{{#unless typescript}}
<script>
import { Alert } from "vux";

export default {
    name: "HelloWorld",
    data() {
        return {
            msg: "Welcome to Your Vue.js App",
            showAlert: false
        };
    },
    components: {
        Alert
    },
    methods: {
        onTitleClick() {
            {{#topmobi}}
            this.msg = `Welcome to Your Vue.js App! topmobi: ${window.topmobi.native}`;
            {{else}}
            this.msg = "Welcome to Your Vue.js App!";
            {{/topmobi}}
            this.showAlert = true;
        }
    }
};
</script>
{{/unless}}
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
h1, h2 {
    font-weight: normal;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
</style>
