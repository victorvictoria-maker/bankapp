<template>
    <div>
    <h4>SignUp Page</h4>
    <form action="" class="container mb-3">
        <div class="row">
            <div class="col-md-8">
                <div class="mb-3">
                    <label for="" class="form-label"> Last Name: </label>
                    <input type="text" class="form-control" v-model="lastName">
                </div>
                <div class="mb-3">
                    <label for="" class="form-label"> First Name: </label>
                    <input type="text" class="form-control" rows="5" v-model="firstName">
                </div>
                <div class="mb-3">
                    <label for="" class="form-label">Email: </label>
                    <input type="email" class="form-control" rows="5" v-model="email">
                </div>
                <div class="mb-3">
                    <label for="" class="form-label">Username: </label>
                    <input type="text" class="form-control" rows="5" v-model="username">
                </div>
                <div class="mb-3">
                    <label for="" class="form-label">Password: </label>
                    <input type="password" class="form-control" rows="5" v-model="password">
                </div>
                <div class="mb-3">
                    <label for="" class="form-label">Confirm Password: </label>
                    <input type="password" class="form-control" rows="5" v-model="confirmPassword">
                </div>
            </div>
        </div>

        <div class="mb-3">
            <button class="btn btn-primary me-2" @click.prevent="signUp">
                Sign Up
            </button>
        </div>
    </form>
    </div>
</template>


<script setup>
import {ref, inject, onMounted} from 'vue';
import {useRouter} from 'vue-router';

const users = inject('$users');
const router = useRouter();
//const bus = inject('$bus');

let lastName = ref('');
let firstName = ref('');
let email =  ref('');
let username =  ref('');
let password = ref('');
let confirmPassword = ref('');
let error = ref('');
let userInfo = ref([]);

onMounted(() => {
    userInfo = users.getAllUsers();
    console.log(userInfo);
});


function signUp() {
    let accountno = "12";
    
    for (let index = 0; index < 8; index++) {
        let random = Math.floor(Math.random() * 10);    
        accountno =  accountno + random;
    }
    
    let thisUser = {
        lastName : lastName.value,
        firstName : firstName.value,
        email : email.value,
        username : username.value,
        password : password.value,
        accountno: accountno,
        balance: 0,
        transactions: []
    };

    if(!lastName.value || !firstName.value || !email.value || !username.value || !password.value || !confirmPassword.value) {
        error.value = "All details need to be filled!";
        alert(error.value);
    } else {
        if(confirmPassword.value !== thisUser.password) {
            error.value = "Password does not match";
            alert(error.value);
        } else {
            users.addUser(thisUser);  
            router.push('/login'); 

            lastName.value = "";
            firstName.value = "";
            email.value = "";
            username.value = "";
            password.value = "";
            confirmPassword.value = "";
        }
    }   

}

</script> 