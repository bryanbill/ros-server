import { GeofenceClient } from "../../packages/geofence/index.js";
import test from 'ava';

const client = new GeofenceClient();

test("Geofence: Get Roles", async (t) => {
    const roles = await client.getRoles("admin");
    t.is(roles.length, 1);
});

test("Geofence: Get User", async (t) => {
    const user = await client.getUser({ field: "name", value: 'bb0721899@gmail.com' });
    t.is(user.id[0], '2133');
});

test("Geofence: Create User", async (t) => {
    const user = await client.createUser({
        username: "test",
        email: "emobrya@gmail.com",
        password: "123456",
    });

    console.log(user);

    t.is(user.name[0], 'test');

});

