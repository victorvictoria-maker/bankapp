let data =  JSON.parse(localStorage.getItem('bankUsers'));

function saveToStorage() {
    localStorage.setItem('bankUsers', JSON.stringify(data));
}

export default{
    getAllUsers() {
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
        return data[index];
    },
    updateMyBalance(newBalance, index) {
        data[index].balance = newBalance;

        saveToStorage();
    },

    updateTransferBalance(newBalance, index) {
        data[index].balance = newBalance;
        console.log(newBalance);

        saveToStorage();
    }
};