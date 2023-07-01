<template>
    <div class="wrapper">
        <form action="" class="container mb-3">
            <img @click="$router.go(-1)" width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/circled-left-2.png" alt="circled-left-2"/>
            <h2>Add Money</h2>
            <div class="row">
                <div class="col-md-8">
                    <div class="mb-3">
                        <input type="text" class="form-control" rows="5" id="moneyAdded" v-model="moneyAdded" placeholder="How much do you want to add?">
                    </div>
                </div>
            </div>

            <div class="mb-3">
                <button class="btn btn-primary me-2" @click.prevent="addMoney('add')">Add to balance</button>
            </div>
        </form>
    </div>
</template>



<script>
import {useRoute, useRouter} from 'vue-router';
// import { inject } from 'vue';

export default {
    inject: ['$users'],
    created() {
        let router = useRouter();
        const route = useRoute();
        let allUsers = this.$users.getAllUsers();
        let userIndex = allUsers.findIndex(element => element.accountno === route.params.accountno);
        this.thisUser = this.$users.getOneUserInfo(userIndex);
        this.balance = this.thisUser.balance;
        this.userIndex = userIndex;
        this.router = router;
        // console.log(allUsers);
        // console.log('end');
        // console.log(userIndex);
    },
    data() {
        return {
            allUsers: [],
            transaction:'', 
            thisUser: '',
            moneyAdded: '',
            userIndex: '',
            balance: 0,
            router: ''
        }
    },
    methods: {
        addMoney(a) {
            // console.log(this.moneyAdded);
            // console.log(this.userIndex, a);

            if(this.moneyAdded != "") {
                this.balance = this.balance + parseInt(this.moneyAdded);
                this.addTransaction(a, this.moneyAdded, this.balance);
                alert("Money added successfully!");

                this.moneyAdded = '';
                let accountno = this.thisUser.accountno;
                this.router.push({name: 'dashboard', params: {accountno: `${accountno}`}});

            } else {
                alert("You need to add an amount for a successful transaction");
            }

            console.log(this.transaction);
        },
        addTransaction(b, c, d) {
            let currentdate = new Date();   
            let datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

            let transaction = {
                name: '',
                time: '',
                amount: '',
                currentBalance: '',
                status: "successful"
            };

            if(b == "add") {
                transaction.name = b;
                transaction.time = datetime;
                transaction.amount = c;
                transaction.currentBalance = d;

                this.transaction = transaction;
            } else {
                alert("This transaction does not exist");
            }
        }
    },
    watch: {
        balance(newBalance) {
            this.thisUser.balance = newBalance;
            this.$users.updateMyBalance(newBalance, this.userIndex, this.transaction);
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