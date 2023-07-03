<template>
    <div class="wrapper">
        <!-- the header of the dahsboard -->
        <div class="header position-relative">
            <img src="../assets/profilepicture.jpg" alt="profile picture" class="me-2">
            <p>Hello! <span>{{thisUser.lastName}}</span></p>
            <button class="position-absolute end-0" @click="$router.push('/login')">Logout</button>
        </div>

        <!-- Balance card -->
        <div class="card">
            <div>
                <p class="p1">Available balance</p>
                <p class="p2">Savings account</p>
                <p class="p3">{{thisUser.accountno}}</p>
                <p class="p4">N{{thisUser.balance}}</p>
            </div>
            <div>
                <p class="p5">{ Acc 1 of 1 }</p>
            </div>
        </div>

        <!-- Other actions card -->
        <div class="actions">
            <div @click="$router.push({name: 'add', params: {accountno: `${thisUser.accountno}`}});">
                <img width="28" height="28" src="https://img.icons8.com/external-smashingstocks-mixed-smashing-stocks/68/000000/external-money-growth-finance-trading-and-banking-smashingstocks-mixed-smashing-stocks-2.png" alt="external-money-growth-finance-trading-and-banking-smashingstocks-mixed-smashing-stocks-2"/>
                <p>Add</p>
            </div>
            <div @click="$router.push({name: 'send', params: {accountno: `${thisUser.accountno}`}});">
                <img width="28" height="28" src="https://img.icons8.com/ios/50/money-transfer.png" alt="money-transfer"/>
                <p>Send</p>
            </div>
            <div @click="$router.push({name: 'withdraw', params: {accountno: `${thisUser.accountno}`}});">
                <img width="28" height="28" src="https://img.icons8.com/external-smashingstocks-detailed-outline-smashing-stocks/66/external-money-withdrawal-shopping-and-ecommerce-smashingstocks-detailed-outline-smashing-stocks.png" alt="external-money-withdrawal-shopping-and-ecommerce-smashingstocks-detailed-outline-smashing-stocks"/>
                <p>Withdraw</p>
            </div>
            <div @click="$router.push({name: 'transactions', params: {accountno: `${thisUser.accountno}`}});">
                <img width="28" height="28" src="https://img.icons8.com/external-glyph-wichaiwi/64/external-transactions-gamefi-glyph-wichaiwi.png" alt="external-transactions-gamefi-glyph-wichaiwi"/>
                <p>Transactions</p>
            </div>
            <!-- <div>
                <img src="" alt="">
                <p>See others using Rido</p>
            </div> -->
        </div>

        <!-- Trasactions -->
        <div class="row search">
                <div class="col-md-8">
                    <div class="mb-3">
                        <input type="text" class="form-control" rows="5" id="search" placeholder="Search recent transaction">
                    </div>
                </div>
        </div>

        <div class="transactionwrapper">
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

        <button class="all" @click="$router.push({name: 'transactions', params: {accountno: `${thisUser.accountno}`}});">See all transactions</button>
    </div>


<!-- 
        <div>
            <div>
                <p>Day and time</p>
                <p>Transaction type</p>
                <p>Amount by the right</p>
            </div>
        </div> -->
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

        this.transactions = this.thisUser.transactions; 


        this.transactionToShow = this.transactions.slice(-5).reverse();
        // console.log(this.transactions);
        // console.log(this.transactions);
    },
    data() {
        return {
            allUsers: [],
            thisUser: '',
            balance: 0,
            userIndex: '',
            transactions: [],
            transactionToShow: []
        }
    },
    // computed: {
    //     addSymbol() {
    //         let symbol = '+';
    //         let transactionName = transaction.name;
    //         if(transactionName == 'withdraw') {
    //             symbol = '-';
    //         } 

    //         return symbol;
    //     }
    // }
}
</script>


<style scoped>
.wrapper {
    /* border: 2px solid red; */
    margin: 20px;
    padding: 15px;
    /* height: 100px; */
}

.header {
   /* border: 3px solid green;  */
   display: flex;
   /* margin: auto; */
   justify-items: center;
   align-items: center;
}

.header img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    /* margin-right: 5px; */
}

.header p {
    position: relative;
    top: 7px;
}

.header p span {
    color: orange;
}

.header button {
    outline: none;
    border: 1px solid rgb(5, 77, 185);
    background-color: rgb(5, 77, 185);
    color: #ffffff;
    padding: 5px 15px;
    border-radius: 30px;
}

.card {
    border: 1px solid rgb(5, 77, 185);
    background-color: rgb(5, 77, 185);
    border-radius: 15px;
    margin-top: 20px;
    padding: 15px;
    height: 190px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    /* text-align: center; */
}

.card .p1 {
    color: #ffffff;
    font-weight: 200;
}

.card .p2 {
    color: orange;
    font-weight: 200;
}

.card .p3 {
    position: relative;
    top: -20px;
    color: orange;
    font-weight: 700;
    font-size: 1.3em;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.card .p4 {
    position: relative;
    top: -20px;
    color: #ffffff;
    font-weight: 700;
    font-size: 2.3em;
    /* letter-spacing: -1px; */
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.card .p5 {
    color: #ffffff;
    background-color: orange;
    padding: 1px 13px;
    border: 1px solid orange;
    border-radius: 15px;
}

.actions {
    display: flex;
    justify-content: space-around;
    box-shadow: 2px 5px 10px -5px rgba(0,0,0,0.45);
    margin-top: 20px;
    border-radius: 15px;
    height: 80px;
    padding-right: 15px;
}

.actions div {
    /* background-color: blue; */
    width: 23%;
    padding-top: 15px;
    text-align: center;
}
.actions p {
    font-weight: 500;
    font-size: 0.8em;
}

.actions img {
    /* align-items: center; */
    /* text-align: center; */
    /* margin: 0 30%; */
    /* background: red; */
    
}

.search {
    margin-top: 15px;
}

.search input {
    border-radius: 20px;
}

.transactionwrapper {
    /* border: 1px solid red; */
    padding: 10px;
}

.transaction {
    /* box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.75); */
    /* border-radius: 20px; */
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