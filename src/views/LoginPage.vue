<template>
    <div class="wrapper">
        <form action="" class="container mb-3">
            <img @click="$router.go(-1)" width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/circled-left-2.png" alt="circled-left-2"/>
            <h2>Ronda</h2>
            <div class="row">
                <div class="col-md-8">
                    <div class="mb-3">
                        <label for="username" class="form-label">Username/Email: </label>
                        <input type="text" class="form-control" id="username" rows="5" v-model="username">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password: </label>
                        <input type="password" class="form-control" id="password" rows="5" v-model="password">
                    </div>
                </div>
            </div>

            <div class="mb-3">
                <button class="btn btn-primary me-2" @click.prevent="login">Sign In Rondo</button>
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

<style scoped>
h2 {
    text-align: center;
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-weight: 600;
}

form {
    box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.75);
    border-radius: 20px;
    width: 90%;
    margin: 100px auto;
    padding: 40px;
}

.row {
    padding-top: 20px;
}


h2 {
    color: orange;
    margin-bottom: 20px;
}

label {
    font-weight: 600;
}

button {
    background-color: rgb(5, 77, 185);
    color: #ffffff;
    width: 100%;
    margin-top: 10px;
    border: 1px solid rgb(5, 77, 185);
    height: 40px;
    border-radius: 20px;
}
</style>