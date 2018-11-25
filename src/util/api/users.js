import users from "./data/users";

export const fetchUsers = ({
  request = {},
  mockProps = [],
  shouldFail = false
}) => {
  return new Promise((res, rej) => {
    window.setTimeout(() => {
      if (shouldFail) {
        rej();
      } else {
        if (request.client.username && request.client.password) {
          const userList = users;
          [...Object.keys(userList.users)].forEach(userId => {
            let user = userList.users[userId];
            if (
              user.username === request.client.username &&
              user.password === request.client.password
            ) {
              return res({
                data: user,
                mockRequest: request
              });
            }
          });
          return rej("no use found");
        }
        return rej("no username");
      }
    }, 1500);
  });
};

export const registerUser = ({
  request = {},
  mockProps = [],
  shouldFail = false
}) => {
  return new Promise((res, rej) => {
    window.setTimeout(() => {
      if (shouldFail) {
        rej();
      } else {
        const userList = users.users;
        let   userNameFound = false,
              lastId = 0;
        for(let user in userList){
          if(lastId < Number(userList[user].id)) {
            lastId = Number(userList[user].id);
          }
          if(userList[user].username === request.client.username){
              userNameFound = true;
          }
        }
        if(userNameFound){
          return rej("username already registered");
        }
        return res({
          data: {
            username:request.client.username,
            first_name:request.client.first_name,
            last_name:request.client.last_name,
            email: request.client.email,
            userId: `${lastId+1}`
          },
          mockRequest: request
        });
      }
    }, 1500);
  });
};