import supertest from "supertest";
import { web } from "../src/application/web.js";
import { removeTestUser } from "./test-util.js";


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

