{{#if_eq build 'standalone'}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue';
import App from './App';
{{#router}}
import router from '@/router';
{{/router}}
{{#vuex}}
import store from '@/store';
{{/vuex}}
{{#if_eq uilib 'element'}}
{{#if_eq elementImport 'fully'}}
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
{{/if_eq}}
{{#if_eq elementImport 'demand'}}
import { MessageBox } from 'element-ui';
{{/if_eq}}
{{/if_eq}}
{{#topmobi}}
import { TopmobiPlugin } from 'topmobi';
{{/topmobi}}
{{#axios}}
import http from './utils/http';
{{/axios}}

{{#if_eq uilib 'element'}}
{{#if_eq elementImport 'fully'}}
Vue.use(ElementUI);
{{/if_eq}}
{{#if_eq elementImport 'demand'}}
Vue.prototype.$alert = MessageBox.alert;
{{/if_eq}}
{{/if_eq}}
{{#topmobi}}
Vue.use(TopmobiPlugin);
{{/topmobi}}
{{#axios}}
Vue.prototype.$http = http;
{{/axios}}
Vue.config.productionTip = false;
{{#fastclick}}
const FastClick = require('fastclick');
FastClick.attach(document.body);
{{/fastclick}}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  {{#vuex}}
  store,
  {{/vuex}}
  {{#if_eq build 'runtime'}}
  render: h => h(App)
  {{/if_eq}}
  {{#if_eq build 'standalone'}}
  template: '<App/>',
  components: { App }
  {{/if_eq}}
});
