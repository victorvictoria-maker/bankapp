<template>
    <div class="wrapper">
        <form action="" class="container mb-3">
            <img @click="$router.go(-1)" width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/circled-left-2.png" alt="circled-left-2"/>
            <h2>Create Your Account</h2>
            <div class="row">
                <div class="col-md-8">
                    <div class="mb-3">
                        <label for="lastname" class="form-label"> Last Name: </label>
                        <input type="text" class="form-control" id="lastname" v-model="lastName">
                    </div>
                    <div class="mb-3">
                        <label for="firstname" class="form-label"> First Name: </label>
                        <input type="text" class="form-control" id="firstname" rows="5" v-model="firstName">
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email: </label>
                        <input type="email" class="form-control" id="email" rows="5" v-model="email">
                    </div>
                    <div class="mb-3">
                        <label for="username" class="form-label">Username: </label>
                        <input type="text" class="form-control" id="username" rows="5" v-model="username">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password: </label>
                        <input type="password" class="form-control" id="password" rows="5" v-model="password">
                    </div>
                    <div class="mb-3">
                        <label for="cpassword" class="form-label">Confirm Password: </label>
                        <input type="password" class="form-control" id="cpassword" rows="5" v-model="confirmPassword">
                    </div>
                </div>
            </div>

            <div class="mb-3">
                <button @click.prevent="signUp">Create Account</button>
            </div>
        </form>
    </div>
</template>


<script setup>
import {ref, inject, onMounted} from 'vue';
import {useRouter} from 'vue-router';

const users = inject('$users');
const router = useRouter();


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



<style scoped>

h2 {
    margin-top: 25px;
    text-align: center;
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-weight: 600;
}

form {
    box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.75);
    border-radius: 20px;
    width: 90%;
    margin: 20px auto;
    padding: 40px;
}

.row {
    padding-top: 20px;
}

label {
    font-weight: 600;
}

button {
    background-color: orange;
    color: #000000;
    width: 100%;
    margin-top: 10px;
    border: 1px solid orange;
    height: 40px;
    border-radius: 20px;
}
</style>