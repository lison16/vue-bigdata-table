import Vue from 'vue';
import App from './App.vue';
import bigdataTable from './vue-bigdata-table';

Vue.use(bigdataTable);

new Vue({
  el: '#app',
  render: h => h(App)
});
