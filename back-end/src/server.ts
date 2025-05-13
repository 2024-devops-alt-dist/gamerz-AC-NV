import {server} from "./app.ts";


server.listen(5024, () => {
    console.log("SOCKET IO:  Serveur démarré sur le port 5024");
});
 //const PORT = process.env.PORT || 5006;
// app.listen(PORT, () => {
//   console.log(`Server is running on port http://localhost:${PORT}`);
//   //listen api docs
// //  console.log(`Listening on port http://localhost:${PORT}/api-docs`);
// });
