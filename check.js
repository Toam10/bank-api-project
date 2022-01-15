// const transfer = (id, reciver, money) => {
//   const users = getAllUsers();
//   // console.log(users[0].id);
//   try {
//     const findUser = users.map((user) => {
//       if (user.id === id) {
//         //2
//         console.log(user.id); //2
//         if (user.cash + user.credit >= money) {
//           const findreciver = users.find((user1) => {
//             user1.id === reciver;
//           });
//           console.log('check', users);
//           console.log('checkreciver', findreciver);
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
//         throw Error('rotem');
//       }
//     });
//     const dataJSON = JSON.stringify(findUser);
//     fs.writeFileSync('./database/users.json', dataJSON);
//     return dataJSON;
//   } catch (error) {
//     return error.message;
//   }
// };
