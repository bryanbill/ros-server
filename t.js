import { GeofenceClient } from "./packages/index.js";

const createUser = async () => {
    const client = new GeofenceClient();
    const user = await client.createUser({
        name: "test",
        full: "test",
        email: "test@gmail.com",
        password: "123456",
    });

    console.log(user);
}

await createUser();