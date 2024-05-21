import supertest from "supertest";
import { web } from "../src/application/web.js";
import { prismaClient } from "../src/application/database.js";
import { logger } from "../src/application/logging.js";


describe('POST /api/users', function () {

    afterEach(async () => {
        await prismaClient.user.deleteMany({
            where: {
                username: "kamaluddin",
            }
        })
    });

    it('Sould able to register new user', async () => {
        const result = await supertest(web)
            .post('/api/users')
            .send({
                username: "kamaluddin",
                password: "rahasia",
                name: "La Ode Kamaluddin",

            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("kamaluddin");
        expect(result.body.data.name).toBe("La Ode Kamaluddin");
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
                username: "kamaluddin",
                password: "rahasia",
                name: "La Ode Kamaluddin",

            });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("kamaluddin");
        expect(result.body.data.name).toBe("La Ode Kamaluddin");
        expect(result.body.data.password).toBeUndefined;

        result = await supertest(web)
            .post('/api/users')
            .send({
                username: "kamaluddin",
                password: "rahasia",
                name: "La Ode Kamaluddin",

            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

})