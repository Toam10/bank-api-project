const { log } = require('console');
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
const addNewUsers = (body) => {
  try {
    // console.log(body);
    const users = getAllUsers();
    // res.send(users);
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
  // console.log(amount);
  // console.log(id);
  const users = getAllUsers();
  // console.log('eric', users);
  try {
    const userMap = users.map((user) => {
      if (user.id === id) {
        console.log('hila', user.id);
        return {
          id: user.id,
          cash: Number(user.cash) + Number(amount),
          credit: user.credit,
        };
      }
      return user;
    });
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
  console.log('ggg', creditupdate);
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

module.exports = {
  getAllUsers,
  addNewUsers,
  deposit,
  credit,
};
