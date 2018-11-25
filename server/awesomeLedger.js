#! /usr/local/bin/node
const   fs = require('fs'),
        path = require('path');
        commandLineArgs  = require('command-line-args'),
        readline = require('readline'),
        LedgerItem = require('./service/ledgerItem'),
        LedgerList = require('./service/ledgerList'),
        User = require('./service/user'),
        ledgersJson = path.join(__dirname+'/../src/util/api/data/ledger.json'),
        userJson = path.join(__dirname+'/../src/util/api/data/users.json'),
        stdin = process.stdin,
        stdout = process.stdout,
        optionDefinitions = [
            { name: 'username', alias: 'u', type: String },
            { name: 'password', alias: 'p', type: String},
            { name: 'creatNewUser', alias: 'c', type: Boolean}
        ],
        options = commandLineArgs(optionDefinitions);

let ledger = new LedgerList,
    currentUser = new User();

const rdl = readline.createInterface({
    input: stdin,
    output: stdout
});

const write = (output) => {
    rdl.write(output);
}
const promptUser = (question,cb) => {
    rdl.question(question, (data)=>{
        cb(data);
    })
};
const getUser = (user) => {
    const userList = JSON.parse(fs.readFileSync(userJson, 'utf8')),
          reqUser = user.username,
          reqPass = user.password;
    [...Object.keys(userList.users)].forEach(userId => {
        let loopUser = userList.users[userId];
    if (
        loopUser.username === reqUser &&
        loopUser.password === reqPass
    ) {
        currentUser.setAllUserInfo = {
            userId: loopUser.id,
            uname: loopUser.username,
            fname: loopUser.first_name,
            lname: loopUser.last_name,
            email: loopUser.email,
        };
        write('Logged in! \r\n');
        updateUserLedger();
        beginbanking();
    }
    });
    if(!currentUser.getUserId){write('couldn\'t find user, lets try again \r\n');init()};   
}


//Ledger Actions
const getAllLedger = (formatted) => {
    ledger.setAllLedgerList = formatted;
    return ledger.getAllLedgerList;
}
const updateUserLedger = () => {
    ledger.setUserLedgerList = currentUser.getUserId;
}
const getNextId = ()=> {
    return ledger.handleGetNextLedgerId();
}

const beginbanking = () => {
    promptUser('What would you like to do? (withdraw, deposit, check balance, logout, check transation) ',(data)=>{
        const userRequest = data.toLowerCase();
        if(userRequest === 'withdraw') {
            beginWithdrawal(); 
        } else if(userRequest === 'deposit') {
            beginDeposit();
        } else if (userRequest === 'check balance') {
            checkBalance();
        } else if (userRequest === 'logout') {
            logOut();
        } else if (userRequest === 'check transaction') {
            checkTransactions();
        } else {
            write('hmm doesn\'t seem like we have that option, lets try again... \r\n');
            beginbanking();
        }
    })
}

const checkBalance = () => {
    write(`Getting current balance...\r\n`);
    updateUserLedger();
    setTimeout(()=>{
        write(`Current balance is ${ledger.getBalance} \r\n`);
        beginbanking();
    }, 700);
}

const beginWithdrawal = () => {
    promptUser('How much would you like to withdraw? ', (amount)=>{
        if(isNaN(parseFloat(amount.replace(/[^0-9.]/g, "")).toFixed(2))){
            write(`Whoops, looks like that wasn't a number, lets try again... \r\n`);
            beginWithdrawal();
        } else {
            promptUser(`Are you sure you'd like to withdraw ${amount}? (Y || N) `, (confirm)=>{
                if(confirm.toLowerCase() === 'y') { 
                    addDebit(amount)
                } else if(confirm.toLowerCase() === 'n') { 
                    write(`Cancelling withdrawal...\r\n`); setTimeout(()=>beginbanking(), 1500);
                } else {
                    write(`Hmm I didn't quite get that... \r\n`);
                    beginWithdrawal();
                }
            })
        }
    })
}

const addDebit = (amount)=> {
    promptUser('Description for withdrawal? ', (desc)=>{
        write(`withdrawing ${amount}...\r\n`);
        setTimeout(()=>{
            const   itemId = getNextId(),
                    newItem = new LedgerItem(currentUser.getUserId,desc,1,amount,itemId.toString()).formatForDB(),
                    allLedgerList = getAllLedger(true);
                    allLedgerList[itemId.toString()] = newItem;
                    newAllLedger = JSON.stringify({
                        mock: allLedgerList
                    });
                    fs.writeFile(ledgersJson,newAllLedger, (err)=>{
                        if (err) throw err;
                        write('successful withraw! \r\n');
                        beginbanking();
                    })
        }, 1500);        
    })
}

const beginDeposit = () => {
    promptUser('How much would you like to deposit? ', (amount)=>{
        if(isNaN(parseFloat(amount.replace(/[^0-9.]/g, "")).toFixed(2))){
            write(`Whoops, looks like that wasn't a number, lets try again... \r\n`);
            beginDeposit();
        } else {
            promptUser(`Are you sure you'd like to deposit ${amount}? (Y || N) `, (confirm)=>{
                if(confirm.toLowerCase() === 'y') { 
                    addCredit(amount)
                } else if(confirm.toLowerCase() === 'n') { 
                    write(`Cancelling deposit...\r\n`); setTimeout(()=>beginbanking(), 1500);
                } else {
                    write(`Hmm I didn't quite get that... \r\n`);
                    beginDeposit();
                }
            })
        }
    })
}

const addCredit = (amount)=> {
    promptUser('Description for Deposit? ', (desc)=>{
        write(`despositing ${amount}... \r\n`);
        setTimeout(()=>{
            const   itemId = getNextId(),
                    newItem = new LedgerItem(currentUser.getUserId,desc,0,amount,itemId.toString()).formatForDB(),
                    allLedgerList = getAllLedger(true);
                    allLedgerList[itemId.toString()] = newItem;
                    newAllLedger = JSON.stringify({
                        mock: allLedgerList
                    });
                    fs.writeFile(ledgersJson,newAllLedger, (err)=>{
                        if (err) throw err;
                        write('successful deposit! \r\n');
                        beginbanking();
                    })
        }, 1500);        
    })
}

const checkTransactions = () => {
    write(`Getting most recent transactions... \r\n`);
    updateUserLedger();
    setTimeout(()=>{
        [...ledger.getUserLedgerList.reverse()].forEach((item,index)=>{
            if(index < 5){
                write(`Transaction:  ${item.getDescription}, ${item.getAmount}, ${new Date(item.getDate)
                        .toUTCString()
                        .split(" ")
                        .slice(0, 4)
                        .join(" ")} ${new Date(item.getDate).toLocaleString(
                        "en-US",
                        { hour: "numeric", minute: "numeric", hour12: true })} \r\n`);    
            }
        });
        beginbanking();
    },1000);
}

const logOut = () => {
    currentUser = new User();
    ledger = new LedgerList();
    write(`Logged out \r\n`);
    rdl.question('Username? (a1Test): ', (usernameData) => {
        rdl.question('Password? (123): ', (passwordData)=>{
            let user = {};
            user.username = usernameData;
            user.password = passwordData;
            getUser(user);
        })
    }); 
}

const createUser = () => {
    const   userList = JSON.parse(fs.readFileSync(userJson,'utf8')),
            userNameFound = false;
    let lastId = 0;
    [...Object.keys(userList.users)].forEach((item)=>{
        if(lastId < Number(userList.users[item].id)){
            lastId =  Number(userList.users[item].id);
        };
    });
    if(!options.username || !options.password){
        promptUser('Select a username: ', (usernameReq)=>{
            for(let user in userList.users){
                if(userList.users[user].username === usernameReq){
                    userNameFound = true;
                }
            }
            if(userNameFound){
                write(`Looks like that's already taken, let's try another? \r\n`);
                createUser();
            } else {
                promptUser(`Enter your password: `, (passwordReq)=>{
                    promptUser(`Enter your first name: `, (firstName)=>{
                        promptUser(`Enter your last name: `, (lastname)=>{
                            promptUser(`Enter your email: `, (email)=>{
                                const   userId = Number(lastId+1).toString(),
                                        newUserList = Object.assign({},userList.users,{
                                            [userId]: {
                                                "username": usernameReq,
                                                "password": passwordReq,
                                                "first_name": firstName,
                                                "last_name": lastname,
                                                "email": email,
                                                "id": userId
                                            }
                                        });
                                fs.writeFile(userJson,JSON.stringify({users:newUserList}), (err)=>{
                                    if (err) throw err;
                                    write('successfully Added! \r\n');
                                    currentUser = new User(userId,usernameReq,firstName,lastname,email);
                                    beginbanking();
                                })
                            })
                        })
                    })
                });
            }
        });
    } else {
        promptUser(`Enter your password: `, (passwordReq)=>{
            promptUser(`Enter your first name: `, (firstName)=>{
                promptUser(`Enter your last name: `, (lastname)=>{
                    promptUser(`Enter your email: `, (email)=>{
                        const   userId = Number(lastId+1).toString(),
                                newUserList = Object.assign({},userList.users,{
                                    [userId]: {
                                        "username": usernameReq,
                                        "password": passwordReq,
                                        "first_name": firstName,
                                        "last_name": lastname,
                                        "email": email,
                                        "id": userId
                                    }
                                });
                        fs.writeFile(userJson,JSON.stringify({users:newUserList}), (err)=>{
                            if (err) throw err;
                            write('successfully Added! \r\n');
                            currentUser = new User(userId,usernameReq,firstName,lastname,email);
                            beginbanking();
                        })
                    })
                })
            })
        });
    }
}

const init = () => {
    let user = {};
    if(options.creatNewUser){
        createUser();
    } else {
        if(!options.username || !options.password){
            rdl.question('Username? (a1Test): ', (usernameData) => {
                rdl.question('Password? (123): ', (passwordData)=>{
                    user.username = usernameData;
                    user.password = passwordData;
                    getUser(user);
                })
            });    
        } else {
            user.username = options.username;
            user.password = options.password;
            getUser(user);
        }
    }
}

const exitProg = () => {
    promptUser(`\r\n Would you like to exit? (Y || N) `, (confirm)=>{
        if(confirm.toLowerCase().trim() === 'y'){
            write('See ya!\r\n');
            process.exit();
        } else {
            write('lets keep going\r\n');
            beginbanking();
        }
    })
}

process.on('SIGINT', ()=>{
    exitProg();
});

init();