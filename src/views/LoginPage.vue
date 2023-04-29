<template>
    <div class="container">
        <form action="" class="container mb-3">
        <div class="row">
            <div class="col-md-8">
                <div class="mb-3">
                    <label for="" class="form-label">Username/Email: </label>
                    <input type="text" class="form-control" rows="5" v-model="username">
                </div>
                <div class="mb-3">
                    <label for="" class="form-label">Password: </label>
                    <input type="password" class="form-control" rows="5" v-model="password">
                </div>
            </div>
        </div>

        <div class="mb-3">
            <button class="btn btn-primary me-2" @click.prevent="login">
                Login
            </button>
        </div>
    </form>
    </div>
</template>

<script setup>
import {ref, inject, onMounted} from 'vue';
import { useRouter } from 'vue-router';

const users = inject('$users');
const router = useRouter();

let username = ref('');
let password = ref('');
let userInfo = [];

onMounted(() => {
    userInfo = users.getAllUsers();
});


function login() {
    let userIndex;

    if(!username.value || !password.value) {
        alert("All details need to be filled!");
    } else {
        const findUsername = userInfo.find(element => element.username === username.value);
        const findUseremail = userInfo.find(element => element.email === username.value);

        if(!findUsername) {
            if(!findUseremail) {
                alert("This user does not exist");
                return;
            } else {
                userIndex = userInfo.findIndex(element => element.email === username.value);
            }
        } else {
            userIndex = userInfo.findIndex(element => element.username === username.value);      
        }

        //check if the password tallies with the username/email
        if (userInfo[userIndex].password != password.value) {
            alert('This password is incorrect');
        } else {
            let accountno = userInfo[userIndex].accountno;
            //router.push({path: `dashboard/${accountno}`});
            router.push({name: 'dashboard', params: {accountno: `${accountno}`}});
        }
    }
    
}

</script>