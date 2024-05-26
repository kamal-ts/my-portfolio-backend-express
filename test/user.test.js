import supertest from "supertest";
import { web } from "../src/application/web.js";
import { createTestUser, getTestUser, removeTestUser } from "./test-util.js";
import { logger } from "../src/application/logging.js";
import bcrypt from 'bcrypt';

describe('POST /api/users', function () {

    afterEach(async () => {
        await removeTestUser();
    });

    it('Sould able to register new user', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: "test",
                password: "rahasia",
                name: "test",

            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");
        expect(result.body.data.password).toBeUndefined;
    });

    it('Sould reject if request is invalid', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: "",
                password: "",
                name: "",

            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Sould reject if username already registered', async () => {
        let result = await supertest(web)
            .post('/api/users')
            .send({
                username: "test",
                password: "rahasia",
                name: "test",

            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");
        expect(result.body.data.password).toBeUndefined;

        result = await supertest(web)
            .post('/api/users')
            .send({
                username: "test",
                password: "rahasia",
                name: "test",

            });
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});

describe('POST /api/users/login', function () {
    beforeEach(async () => {
        await createTestUser();
    });
    afterEach(async () => {
        await removeTestUser();
    })

    it('Should able to login', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "test",
                password: "rahasia"
            });
        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data.token).toBeDefined();
        expect(result.body.data.token).not.toBe("test");
    });

    it('Should reject login if request is invalid', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "",
                password: ""
            });
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Should reject login if password is wrong', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "test",
                password: "salah"
            });
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it('Should reject login if username is wrong', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                username: "salah",
                password: "salah"
            });
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });
});

describe('GET /api/users/current', function () {
    beforeEach(async () => {
        await createTestUser();
    });
    afterEach(async () => {
        await removeTestUser();
    })

    it('Should get current user', async function () {
        const result = await supertest(web)
            .get('/api/users/current')
            .set('Authorization', 'test');
        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('test');
        expect(result.body.data.name).toBe('test');
    });

    it('Should reject if token is invalid', async function () {
        const result = await supertest(web)
            .get('/api/users/current')
            .set('Authorization', 'wrong');
        expect(result.status).toBe(401);
        expect(result.body.data).toBeUndefined();
        expect(result.body.errors).toBeDefined();
    });
});

describe('UPDATE /api/users/current', function () {
    beforeEach(async () => {
        await createTestUser();
    });
    afterEach(async () => {
        await removeTestUser();
    })

    it('Should able to update user', async () => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'test')
            .send({
                name: "kamal",
                password: "rahasialagi"
            });
        expect(result.status).toBe(200);
        // username harus "test" sesuai dengan yang diinput pada test-utils
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("kamal");

        const user = await getTestUser();
        expect(await bcrypt.compare("rahasialagi", user.password)).toBe(true);
    });

    it('Should able to update user name', async () => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'test')
            .send({
                name: "kamal",
            });
        expect(result.status).toBe(200);
        // username harus "test" sesuai dengan yang diinput pada test-utils
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("kamal");
    });

    it('Should able to update user password', async () => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'test')
            .send({
                password: "rahasialagi"
            });
        expect(result.status).toBe(200);
        // username harus "test" sesuai dengan yang diinput pada test-utils
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");

        const user = await getTestUser();
        expect(await bcrypt.compare("rahasialagi", user.password)).toBe(true);
    });

    it('Should reject if token is not valid', async () => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'salah')
            .send({});
        expect(result.status).toBe(401);
    });

    it('Should reject if request is not valid', async () => {
        const result = await supertest(web)
            .patch('/api/users/current')
            .set('Authorization', 'test')
            .send({
                name: 342131,
                password: "rahasialagi"
            });
        expect(result.status).toBe(400);
        // username harus "test" sesuai dengan yang diinput pada test-utils
        expect(result.body.errors).toBeDefined();
    });

});

describe('DELETE /api/users/logout', function () {
    beforeEach(async () => {
        await createTestUser();
    });
    afterEach(async () => {
        await removeTestUser();
    })

    it('Should able to logout', async () => {
        const result = await supertest(web)
            .delete('/api/users/logout')
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK");

        const user = await getTestUser();
        expect(user.token).toBeNull();
    })
})