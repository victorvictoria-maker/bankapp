let data =  JSON.parse(localStorage.getItem('bankUsers'));

function saveToStorage() {
    localStorage.setItem('bankUsers', JSON.stringify(data));
}

export default{
    getAllUsers() {
        // alert("get all users function");
        if(data == null) {
            localStorage.setItem('bankUsers', JSON.stringify([
                {
                  lastName: "Victor",
                  firstName: "Victoria",
                  email: "victorvictoria0001@gmail.com", 
                  username: "vicky",
                  password: "vik123vik",
                  accountno: "1234567654",
                  balance: 0,
                  transactions: []
                }
                ]));
        }
        return data;
    },
    addUser(thisUser) {
        // alert("Add user function");
        //console.log(thisUser);
        const found = data.find(element => element.email === thisUser.email);
        if(!found) {
            data.push(thisUser);
            saveToStorage();
        } else {
            console.log("This user already exists");    
        }   
    },
    getOneUserInfo(index) {
        // alert("Get one user info function");
        return data[index];
    },
    updateMyBalance(newBalance, index, transaction) {
        // alert("Update my balance funtion");
        data[index].balance = newBalance;
        data[index].transactions.push(transaction);

        //console.log(transaction.whomTo);
        //console.log(transaction);
        saveToStorage();
    },

    updateTransferBalance(newBalance, index, transaction, senderAccountNo, details) {
        // alert("Update transfer balanace function");
        data[index].balance = newBalance;
        let transferFromDetails = {
            name: 'received',
            time: transaction.time,
            amount: transaction.amount,
            currentBalance: data[index].balance,
            from: senderAccountNo,
            details,
            status: "successful"
        };
        //console.log(transferFromDetails);
        data[index].transactions.push(transferFromDetails);

        saveToStorage();
    }
};