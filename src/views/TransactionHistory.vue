<template>
    <div class="wrapper">
        <img @click="$router.go(-1)" width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/circled-left-2.png" alt="circled-left-2"/>
        <div class="header">
            <div>
                <button class="btn1">Month</button>
                <button class="btn2">Year</button>
            </div>
            <div class="text">
                <p class="total">Total spending</p>
                <p class="amount1">	&#8358;XXXXX</p>
                <p class="total">Total Money Received</p>
                <p class="amount2">	&#8358;XXXXXXX</p>
            </div>
        </div>
        <div v-if="this.transactions.length <= 0" class="notransaction">
            <p>You have no transactions</p>
        </div>
        <div v-else class="transactionwrapper">
            <div v-for="(transaction, index) in transactionToShow" :key="index" class="transaction">
            <!-- {{ transaction }} -->
                <p>{{transaction.time}}</p>
                <div class="down">
                    <p class="details">{{transaction.details}}</p>
                    <p :class="[transaction.name == 'withdraw' ? 'red' : 'green']">{{transaction.amount}}</p>
                </div>
                <hr>
            </div>
        </div>
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

        this.transactions = this.thisUser.transactions; 


        this.transactionToShow = this.transactions.reverse();
    },
    data() {
        return {
            allUsers: [],
            thisUser: '',
            transactions: [],
            transactionToShow: []
        }
    },
}
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    height: 140px;
    margin-bottom: 20px;
}

.header button {
    display: block;
    background-color: rgb(5, 77, 185);
    color: #ffffff;
    width: 85px;
    border: 1px solid rgb(5, 77, 185);
    height: 30px;
    border-radius: 20px;
    box-shadow: 1px 2px 3px 0px rgba(0,0,0,0.75);
}

.header .btn1 {
    margin-top: 20px;
}

.header .btn2 {
    position: relative;
    top: 10px;
}

.header .text {
    margin-top: 10px;
}

.header .text p {
    line-height: 5px;
}

.header .total {
    font-weight: 600;
}

.header .amount1 {
    margin-bottom: 30px;
}

.header .amount1,
.header .amount2 {
    font-weight: 800;
    font-size: 1.4em;
    padding-right: 60px;
    letter-spacing: -1px;
    color: rgb(5, 77, 185);;
}
.wrapper {
    padding: 40px 20px;
}

.notransaction {
    font-weight: 600;
    font-size: 1.8em;
    text-align: center;
    position: relative;
    top: 50px;
    text-transform: uppercase;
}
.transactionwrapper {
    padding: 10px;
    height: 600px;
    overflow: scroll;
}

.transaction {
    padding: 15px 0 0;
    font-size: 0.8em;
    margin-bottom: 10px;
}

.transaction p {
    line-height: 5px;
}

.transaction .down {
    display: flex;
    justify-content: space-between;
    font-weight: 500;
}


hr {
    margin-top: -6px;
}

.red {
    color: red;
}

.green {
    color: green;
}

.all {
    background-color: rgb(5, 77, 185);
    color: #ffffff;
    width: 85%;
    border: 1px solid rgb(5, 77, 185);
    height: 40px;
    border-radius: 20px;
}
</style>