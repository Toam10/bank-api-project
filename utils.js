const { log, countReset } = require('console');
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
    console.log('hilascs');
    const wantedId = users.find((user) => {
      if (user.id === Number(id)) {
        console.log('hhh', wantedId);
        return wantedId;
      } else {
        throw Error('cant find id');
      }
    });
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
  // console.log('ggg', creditupdate);
  try {
    if (Number(creditupdate) > 0) {
      const userMap = users.map((user) => {
        if (user.id === id) {
          console.log('check', creditupdate);
          return {
            id: user.id,
            cash: user.cash,
            credit: Number(creditupdate),
          };
        }
        return user;
      });
      // console.log('ggg', userMap);
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

module.exports = {
  getAllUsers,
  addNewUsers,
  deposit,
  credit,
  withdraw,
  getOneUser,
};
