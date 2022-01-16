const fs = require('fs');

const getAllUsers = () => {
  try {
    const dataBuffer = fs.readFileSync('./database/users.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const getOneUser = (id) => {
  try {
    const users = getAllUsers();
    const wantedId = users.find((user) => {
      return user.id == id;
    });
    if (wantedId === undefined) {
      //after the find we wantedto check the error
      throw Error('wrong');
    } else {
      return wantedId;
    }
  } catch (error) {
    return error.message;
  }
};

const addNewUsers = (body) => {
  try {
    const users = getAllUsers();
    users.find((user) => {
      if (user.id === body.id) {
        //check if id is exist in our data.
        throw Error('The user is allready exist');
      }
    });
    users.push(body);
    const dataJSON = JSON.stringify(users);
    //method converts a JavaScript object or value to a JSON string
    fs.writeFileSync('./database/users.json', dataJSON);
    return dataJSON;
  } catch (error) {
    return error.message;
  }
};

const deposit = (id, amount) => {
  let bool = false;
  const users = getAllUsers();
  try {
    const userMap = users.map((user) => {
      if (user.id === id) {
        bool = true;
        console.log('hila', user.id);
        return {
          id: user.id,
          cash: Number(user.cash) + Number(amount),
          credit: user.credit,
        };
      }
      return user;
    });
    if (!bool) {
      throw Error('wrong');
    }
    console.log('ggg', userMap);
    const dataJSON = JSON.stringify(userMap);
    fs.writeFileSync('./database/users.json', dataJSON);
    return dataJSON;
  } catch (error) {
    return error.message;
  }
};

const credit = (id, creditupdate) => {
  const users = getAllUsers();
  try {
    if (Number(creditupdate) > 0) {
      const userMap = users.map((user) => {
        if (user.id === id) {
          return {
            id: user.id,
            cash: user.cash,
            credit: Number(creditupdate),
          };
        }
        return user;
      });

      const dataJSON = JSON.stringify(userMap);
      fs.writeFileSync('./database/users.json', dataJSON);
      return dataJSON;
    } else {
      throw Error('Eric dont like this number');
    }
  } catch (error) {
    return error.message;
  }
};

const withdraw = (id, money) => {
  const users = getAllUsers();
  try {
    const userMap = users.map((user) => {
      if (user.id === id) {
        if (user.cash + user.credit >= money) {
          // console.log('hila', user.id);
          return {
            id: user.id,
            cash: Number(user.cash) - Number(money),
            credit: user.credit,
          };
        } else {
          throw Error('the credit is low than the cash');
        }
      }
      return user;
    });
    // console.log('ggg', userMap);
    const dataJSON = JSON.stringify(userMap);
    fs.writeFileSync('./database/users.json', dataJSON);
    return dataJSON;
  } catch (error) {
    return error.message;
  }
};

const transfer = (id, reciver, money) => {
  try {
    const users = getAllUsers();
    const newUsers = users.map((user) => {
      if (user.id === +reciver) {
        user.id = +reciver;
        user.cash = +user.cash + +money;
        return user;
      }

      if (user.id === id) {
        user.id = +id;
        user.cash = +user.cash - +money;
        return user;
      }

      return user;
    });

    return newUsers;
  } catch (error) {
    console.log(error);
  }
};

//     console.log('findreciver', findreciver);
//     const findUser = users.map((user) => {
//       if (user.id === parseInt(id)) {
//         console.log(user.id);
//         if (user.cash + user.credit >= money) {
//           return (
//             {
//               id: findreciver.id,
//               cash: Number(findreciver.cash) + Number(money),
//               credit: findreciver.credit,
//             },
//             {
//               id: user.id,
//               cash: Number(user.cash) - Number(money),
//               credit: user.credit,
//             }
//           );
//         }
//         return user;
//       } else {
//         throw Error('wrong');
//       }
//     });
//     const dataJSON = JSON.stringify(findUser);
//     fs.writeFileSync('./database/users.json', dataJSON);
//     return dataJSON;
//   } catch (error) {
//     return error.message;
//   }
// };

module.exports = {
  getAllUsers,
  addNewUsers,
  deposit,
  credit,
  withdraw,
  getOneUser,
  transfer,
};
