import supertest from "supertest";
import { createTestUser, removeAllTestMyproject, removeTestUser } from "./test-util.js";
import { web } from "../src/application/web.js";

describe('POST /api/myprojects', function () {

    beforeEach(async () => {
        await createTestUser();
    });

    afterEach(async () => {
        await removeAllTestMyproject();
        await removeTestUser();
    });

    it('Should able to create new myproject', async () => {
        const result = await supertest(web)
            .post("/api/myprojects")
            .set('Authorization', 'test')
            .send({
                title: "test",
                tag: ["test"],
                category: ["test"],
                description: "test",
                link_web: "test.web",
                link_git: "test.git",
                image: "test.jpg"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.title).toBe("test");
        expect(result.body.data.tag).toEqual(["test"]);
        expect(result.body.data.category).toEqual(["test"]);
        expect(result.body.data.description).toBe("test");
        expect(result.body.data.link_web).toBe("test.web");
        expect(result.body.data.link_git).toBe("test.git");
        expect(result.body.data.image).toBe("test.jpg");
        expect(result.body.data.createdAt).toBeDefined();

    });

    it('Should reject if request is not valid', async () => {
        const result = await supertest(web)
            .post("/api/myprojects")
            .set('Authorization', 'test')
            .send({
                title: "",
                tag: "",
                category: "",
                description: "test",
                link_web: "test.web",
                link_git: "",
                image: "test.jpg"
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it('Should reject if token is not valid', async () => {
        const result = await supertest(web)
            .post("/api/myprojects")
            .set('Authorization', 'salah')
            .send({});

        expect(result.status).toBe(401);
    });

})