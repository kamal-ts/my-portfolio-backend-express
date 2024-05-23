import supertest from "supertest";
import { web } from "../src/application/web.js";
import { createTestUser, removeTestUser } from "./test-util.js";
import { logger } from "../src/application/logging.js";


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
            .set('Authorization', 'false');
        expect(result.status).toBe(401);
        expect(result.body.data).toBeUndefined();
        expect(result.body.errors).toBeDefined();
    });
})