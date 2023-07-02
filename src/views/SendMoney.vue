<template>
    <div class="wrapper">
        <form action="" class="container mb-3">
            <img @click="$router.go(-1)" width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/circled-left-2.png" alt="circled-left-2"/>
            <h2>Send Money</h2>
            <div class="row">
                <div class="col-md-8">
                    <div class="mb-3">
                        <input type="text" class="form-control" rows="5" id="whomToTransfar" placeholder="Receiver's Account Number" v-model="whomToTransfer">
                    </div>
                    <div class="mb-3">
                        <input type="text" class="form-control" rows="5" id="amountToTransfer" placeholder="Amount To Transfer" v-model="amountToTransfer">
                    </div>
                </div>
            </div>

            <div class="mb-3">
                <button class="btn btn-primary me-2" @click.prevent="sendMoney('transfer')">Make Transfer</button>
            </div>
        </form>
    </div>
</template>


<script>
import {useRoute, useRouter} from 'vue-router';

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
            userIndex: '',
            balance: 0,
            router: '',
            amountToTransfer: '',
            whomToTransfer: '',
        }
    },

    methods: {
        // sendMoney(a) {
        //     console.log(a, this.amountToTransfer, this.whomToTransfer);
        // }
        sendMoney(a) {
            let allUsers = this.$users.getAllUsers();
            
            let findUser = allUsers.find(element => element.accountno === this.whomToTransfer);
            let receiverIndex = allUsers.findIndex(element => element.accountno === this.whomToTransfer);

            if(this.amountToTransfer != "" && this.whomToTransfer != "") {
                if(!findUser) {
                    alert("This user cannot be found. Be sure to input the write account number!");
                } else {
                    this.balance = this.balance - parseInt(this.amountToTransfer);
                
                    let users = this.$users.getAllUsers();
                    let receiverBalance = users[receiverIndex].balance;
                    receiverBalance = receiverBalance + parseInt(this.amountToTransfer);
                
                    this.addTransaction(a, this.amountToTransfer, this.balance, this.whomToTransfer);
                    this.$users.updateTransferBalance(receiverBalance, receiverIndex, this.transaction, this.thisUser.accountno);

                    alert("Money sent successfully!");

                    this.amountToTransfer = '';
                    this.whomToTransfer = '';
                    let accountno = this.thisUser.accountno;
                    this.router.push({name: 'dashboard', params: {accountno: `${accountno}`}});

                }
            } else {
                alert("Error occured, check your input");
            }
            
        },

        addTransaction(b, c, d, e) {
            let currentdate = new Date();   
            let datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

            if (b == "transfer") {
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