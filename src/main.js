import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import $users from './data';
import $bus from './Utilities/Event';

const app = createApp(App);
app.use(router);

app.provide('$users', $users);
app.provide('$bus', $bus);

app.mount('#app');
