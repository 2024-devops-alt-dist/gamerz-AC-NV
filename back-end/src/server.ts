import {server} from "./app.ts";


server.listen(5024, () => {
    console.log("SOCKET IO:  Serveur démarré sur le port 5024");
});
