const fs = require('fs');
// utils needs to be a pure functions not a complex functions and more then that dont replace it as the controller

const getAllUsers = () => {
  try {
    const dataBuffer = fs.readFileSync('./database/users.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};
// can be in one line
// good name

const getOneUser = (id) => {
  // const {id} = req.params;
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

// please use req,res
// nice use of getAllUsers

const addNewUsers = (body) => {
  try {
    const users = getAllUsers();
    users.find((user) => {
      if (user.id === body.id) {
        //check if id is exist in our data.
        // dont give a comments and this check could go to utils like isUserExist function 
        throw Error('The user is allready exist');
      }
    });
    users.push(body);
    const dataJSON = JSON.stringify(users);
    // you can do it inside the writeFileSync method
    //method converts a JavaScript object or value to a JSON string
    
    fs.writeFileSync('./database/users.json', dataJSON)
    // move to utils as a saveUsers function
    
    return dataJSON;
    // long function to much 
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
        // use that a bool but why ? this name doesn't give me any info about it
        
        console.log('hila', user.id); // remove console.log
        return {
          id: user.id,
          cash: +user.cash + +amount,
          credit: user.credit,
        };
        // return object that you give him a good name and the return it i dont need to guess what you want to build with this values
      }
      return user;
    });
    if (!bool) throw Error('wrong'); // one line
    
    console.log('ggg', userMap); // remove console.log
    
    const dataJSON = JSON.stringify(userMap);
    // userMap I dont think that U know what Map means please make the name clearer (Map more for cash some data) (Array.map array method)
    
    fs.writeFileSync('./database/users.json', dataJSON);
     // see above
    
    return dataJSON;
  } catch (error) {
    return error.message;
    // `Error:${error.message}`
  }
};

const credit = (id, creditupdate) => {
  const users = getAllUsers();
  try {
    if (+creditupdate > 0) {
      // really big if
      const userMap = users.map((user) => {
        if (user.id === id) {
          return {
            id: user.id,
            cash: user.cash,
            credit: +creditupdate,
              // return object that you give him a good name and the return it i dont need to guess what you want to build with this values
          };
        }
        
        return user;
      });
      
      // move to utils

      const dataJSON = JSON.stringify(userMap);
       // userMap I dont think that U know what Map means please make the name clearer (Map more for cash some data) (Array.map array method)
      
      fs.writeFileSync('./database/users.json', dataJSON);
      // see above
      
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
    // console.log('ggg', userMap);// remove console.log by the way "ggg" that not something that you want me to see (: maybe "userMap:"
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
        // good code but move to utils
        // and please pick a good name

    return newUsers;
  } catch (error) {
    console.log(error);
  }
};

//     console.log('findreciver', findreciver); // remove comments this is called zombe code meaningless maybe save some refrence in you PC but not here (:
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
