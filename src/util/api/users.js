import users from "./data/users";

export const fetchUser = ({
  request = {},
  mockProps = [],
  shouldFail = false
}) => {
  return new Promise((res, rej) => {
    window.setTimeout(() => {
      if (shouldFail) {
        rej();
      } else {
        const userList = users;
        if(userList.users[request.userId]){
        return res({
                  data: userList.users[request.userId],
                  mockRequest: request
                });
        } else {
          return rej("no use found");
        }
      }
    }, 1500);
  });
};
