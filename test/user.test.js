import supertest from "supertest";
import { web } from "../src/application/web.js";
import { prismaClient } from "../src/application/database.js";


describe('POST /api/users', function () {

    afterEach(async () => {
        await prismaClient.user.deleteMany({
            where: {
                username: "kamaluddin",
            }
        })
    });

    it('Sould able register new user', async () => {
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

    it('Soudd able register new user', async () => {
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


})