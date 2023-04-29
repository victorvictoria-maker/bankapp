<template>
    <div>
        The DashBoard
         <p>{{thisUser.lastName}}, You are welcome.</p>
         <p>Your account number is {{thisUser.accountno}}.</p>
         <p>Your balance is N{{thisUser.balance}}</p>

         <div class="wrapper">
            <div class="section">
                <label for="addMoney">Add money</label>
                <input type="text" name="addMoney" id="addMoney" v-model="moneyToAdd">
                <button class="btn btn-primary ms-2 me-2 mb-2" @click="addMoney('add')">Add Money</button>
            </div>

            <div class="section">
                <label for="withdrawMoney">Withdraw money</label>
                <input type="text" name="withdrawMoney" id="withdrawMoney" v-model="moneyToRemove">
                <button class="btn btn-danger mb-2" @click="withdrawMoney('withdraw')">Withdraw</button>
            </div>
            
            <div class="section">
                <label for="transferMoney">Transfer money</label>
                <input type="text" name="transferMoney" id="transferMoney" v-model="moneyToTransfer">
                <input type="text" name="transferAccount" id="transferAccount" v-model="whomToTransfer">
                <button class="btn btn-success me-2 mb-2" @click="transferMoney('transfer')">Transfer</button>
            </div>
            
            <div class="section">
                <label for="checkBalance">Check balance</label>
                <button class="btn btn-secondary me-2 mb-2" @click="checkBal">Balance</button>
                <span v-if="checkBalance">Your balance is N{{thisUser.balance}}</span>
            </div>
            
            <button class="btn btn-primary me-2 mb-2">Transaction History</button>
         </div>

        <button @click="$router.go(-1)">Log Out</button>
    </div>
</template>


<script>
import {useRoute} from 'vue-router';

export default {
    
    inject: ['$users'],
    created() {
        const route = useRoute();
        let allUsers = this.$users.getAllUsers();
        let userIndex = allUsers.findIndex(element => element.accountno === route.params.accountno);
        this.thisUser = this.$users.getOneUserInfo(userIndex);
        this.balance = this.thisUser.balance;
        this.userIndex = userIndex;
        //this.transactions = this.thisUser.transactions;
    },
    // mounted() {
    //     this.transactions = this.thisUser.transactions;
    //     console.log(this.transactions);
    // },
    data() {
        return {
            allUsers: [],
            transaction: '',
            thisUser: '',
            moneyToAdd: '',
            moneyToRemove: '',
            moneyToTransfer: '',
            whomToTransfer: '',
            balance: 0,
            userIndex: '',
            checkBalance: false
        }
    },
    methods: {
        addMoney(a) {
            // let val = typeof(this.moneyToAdd);
            // if(val != Number || a == "") {
            //     alert("Error occured, check your input");
            // } else {
            //     alert("Go on");
            // }
            //console.log(val);

            if(this.moneyToAdd != "") {
                this.balance = this.balance + parseInt(this.moneyToAdd);
                this.addTransaction(a, this.moneyToAdd, this.balance);

                this.moneyToAdd = '';
            } else {
                alert("Error occured, check your input");
            }
            
        },

        withdrawMoney(a) {
            if(this.moneyToRemove != "") {
                this.balance = this.balance - parseInt(this.moneyToRemove);
                this.addTransaction(a, this.moneyToRemove, this.balance);

                this.moneyToRemove = '';
            } else {
                alert("Error occured, check your input");
            }
            
        },

        transferMoney(a) {
            let allUsers = this.$users.getAllUsers();
            
            let findUser = allUsers.find(element => element.accountno === this.whomToTransfer);
            let receiverIndex = allUsers.findIndex(element => element.accountno === this.whomToTransfer);

            if(this.moneyToTransfer != "" && this.whomToTransfer != "") {
                if(!findUser) {
                    alert("This user cannot be found");
                } else {
                    this.balance = this.balance - parseInt(this.moneyToTransfer);
                
                    let users = this.$users.getAllUsers();
                    let receiverBalance = users[receiverIndex].balance;
                    receiverBalance = receiverBalance + parseInt(this.moneyToTransfer);
                
                    this.addTransaction(a, this.moneyToTransfer, this.balance, this.whomToTransfer);
                    this.$users.updateTransferBalance(receiverBalance, receiverIndex, this.transaction, this.thisUser.accountno);
                    //console.log(this.transaction);

                    this.moneyToTransfer = '';
                    this.whomToTransfer = '';
                }
            } else {
                alert("Error occured, check your input");
            }
            
        },

        checkBal() {
            this.checkBalance = true;
        },

        addTransaction(b, c, d, e) {
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
                //console.log(this.transactions);
                //console.log("add", transaction);
            } else if (b == "withdraw") {
                transaction.name = b;
                transaction.time = datetime;
                transaction.amount = c;
                transaction.currentBalance = d;


                this.transaction = transaction;
                //console.log("withdraw", transaction);
            } else if (b == "transfer") {
                let transfarTransaction = {
                    name: '',
                    time: '',
                    amount: '',
                    currentBalance: '',
                    whomTo: '',
                    status: "successful"
                };

                transfarTransaction.name = b;
                transfarTransaction.time = datetime;
                transfarTransaction.amount = c;
                transfarTransaction.currentBalance = d;
                transfarTransaction.whomTo = e;

                this.transaction = transfarTransaction;

                //console.log("transfer", transfarTransaction);
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
.wrapper {
    border: 2px solid red;
    /* height: 100px; */
}

.section {
   border: 1px solid green; 
}
</style>