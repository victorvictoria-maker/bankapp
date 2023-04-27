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
                <button class="btn btn-primary ms-2 me-2 mb-2" @click="addMoney">Add Money</button>
            </div>

            <div class="section">
                <label for="withdrawMoney">Withdraw money</label>
                <input type="text" name="withdrawMoney" id="withdrawMoney" v-model="moneyToRemove">
                <button class="btn btn-danger mb-2" @click="withdrawMoney">Withdraw</button>
            </div>
            
            <div class="section">
                <label for="transferMoney">Transfer money</label>
                <input type="text" name="transferMoney" id="transferMoney" v-model="moneyToTransfer">
                <input type="text" name="transferAccount" id="transferAccount" v-model="whomToTransfer">
                <button class="btn btn-success me-2 mb-2" @click="transferMoney">Transfer</button>
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
    },
    data() {
        return {
            allUsers: [],
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
        addMoney() {
            this.balance = this.balance + parseInt(this.moneyToAdd);
            this.moneyToAdd = '';
        },

        withdrawMoney() {
            this.balance = this.balance - parseInt(this.moneyToRemove);
            this.moneyToRemove = '';
        },

        transferMoney() {
            let allUsers = this.$users.getAllUsers();
            
            let findUser = allUsers.find(element => element.accountno === this.whomToTransfer);
            let receiverIndex = allUsers.findIndex(element => element.accountno === this.whomToTransfer);

            if(!findUser) {
                alert("This user cannot be found");
            } else {
                this.balance = this.balance - parseInt(this.moneyToTransfer);
                
                let users = this.$users.getAllUsers();
                let receiverBalance = users[receiverIndex].balance;
                receiverBalance = receiverBalance + parseInt(this.moneyToTransfer);
                this.$users.updateTransferBalance(receiverBalance, receiverIndex);

                this.moneyToTransfer = '';
                this.whomToTransfer = '';
            }
        },

        checkBal() {
            this.checkBalance = true;
        }
    },
    watch: {
        balance(newBalance) {
            this.thisUser.balance = newBalance;
            this.$users.updateMyBalance(newBalance, this.userIndex);
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