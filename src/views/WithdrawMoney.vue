<template>
    <div class="wrapper">
        <form action="" class="container mb-3">
            <img @click="$router.go(-1)" width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/circled-left-2.png" alt="circled-left-2"/>
            <h2>Withdraw Money</h2>
            <div class="row">
                <div class="col-md-8">
                    <div class="mb-3">
                        <input type="text" class="form-control" rows="5" id="moneyWithdrawn" v-model="moneyWithdrawn" placeholder="How much do you want to withdraw?">
                    </div>
                </div>
            </div>

            <div class="mb-3">
                <button class="btn btn-primary me-2" @click.prevent="withdrawMoney('withdraw')">Withdraw from Balance</button>
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
    },
    data() {
        return {
            allUsers: [],
            transaction:'', 
            thisUser: '',
            moneyWithdrawn: '',
            userIndex: '',
            balance: 0,
            router: ''
        }
    },
    methods: {
        withdrawMoney(a) {
            if(this.moneyWithdrawn != "") {
                if(this.balance < this.moneyWithdrawn) {
                    alert("Insufficient balance");
                    return;
                } else {
                    this.balance = this.balance - parseInt(this.moneyWithdrawn);
                    this.addTransaction(a, this.moneyWithdrawn, this.balance);

                    alert("Money withdrawn successfully!");

                    this.moneyWithdrawn = '';
                    let accountno = this.thisUser.accountno;
                    this.router.push({name: 'dashboard', params: {accountno: `${accountno}`}});
                }
            } else {
                alert("Error occured, check your input");
            }
           
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
                details: 'You withdrew money',
                status: "successful"
            };

            if (b == "withdraw") {
                transaction.name = b;
                transaction.time = datetime;
                transaction.amount = c;
                transaction.currentBalance = d;


                this.transaction = transaction;

                this.$users.updateMyBalance(this.balance, this.userIndex, this.transaction);
            } else {
                alert("This transaction does not exist");
            }
        }
    },
    // watch: {
    //     balance(newBalance) {
    //         this.thisUser.balance = newBalance;
    //         this.$users.updateMyBalance(newBalance, this.userIndex, this.transaction);
    //     }
    // }
    
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