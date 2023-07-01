<template>
  <div class="home">
    <div class="wrapper">
      <h2>Ronda</h2>
      <button class="btn signup" @click="goToSignUp">Open an account</button>
      <button class="btn  signin" @click="toToLogin">Already and existing user</button>
    </div>
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


<style scoped>
.wrapper {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.wrapper h2 {
  margin-bottom: 110px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 3em;
  font-weight: 700;
  color: orange;
}

button {
  width: 80%;
  margin: 0 auto;
  border-radius: 20px;
  box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.75);
}

.signup {
  background-color: orange;
  color: #000000;
  margin-bottom: 20px;
}

.signin {
  background-color: rgb(5, 77, 185);
  color: #ffffff;
}
</style>
