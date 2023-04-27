<template>
  <div class="home">
    <p>Home page</p>
    <button class="btn btn-primary me-3" @click="toToLogin">Login</button>
    <button class="btn btn-success" @click="goToSignUp">Sign Up</button>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router';
import { onMounted } from 'vue';

onMounted(() => {
  if(localStorage.getItem('bankUsers') == null) {
    localStorage.setItem('bankUsers', JSON.stringify([
    {
      lastName: "Victor",
      firstName: "Victoria",
      email: "victorvictoria0001@gmail.com", 
      username: "vicky",
      password: "vik123vik",
      accountno: "1234567654",
      balance: 0,
      transactions: []
    }
    ]));
  }   
});

let router = useRouter();
function toToLogin() {
  router.push('/login');
}
function goToSignUp() {
  router.push('/signup');
}
</script>
