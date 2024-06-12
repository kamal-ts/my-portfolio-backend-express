import supertest from "supertest";
import { createManyTestMyproject, createTestMyproject, createTestUser, getManyTestMyproject, getTestMyproject, removeAllTestMyproject, removeTestUser } from "./test-util.js";
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
                tag: "test",
                category: "test",
                description: "test",
                link_web: "test.web",
                link_git: "test.git",
                image: "test.jpg"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.title).toBe("test");
        expect(result.body.data.tag).toBe("test");
        expect(result.body.data.category).toBe("test");
        expect(result.body.data.description).toBe("test");
        expect(result.body.data.link_web).toBe("test.web");
        expect(result.body.data.link_git).toBe("test.git");
        expect(result.body.data.image).toBe("test.jpg");

    });

    it('Should reject if request is not valid', async () => {
        const result = await supertest(web)
            .post("/api/myprojects")
            .set('Authorization', 'test')
            .send({
                title: "test",
                tag: "",
                category: "test",
                description: "test",
                link_web: "test.web",
                link_git: "test.git",
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

});

describe('GET /api/myprojects/:myprojectId', function () {

    beforeEach(async () => {
        await createTestUser();
        await createTestMyproject();
    });

    afterEach(async () => {
        await removeAllTestMyproject();
        await removeTestUser();
    });

    it('Should able to create new myproject', async () => {
        const myproject = await getTestMyproject();
        const result = await supertest(web)
            .get(`/api/myprojects/${myproject.id}`)
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(myproject.id);
        expect(result.body.data.title).toBe(myproject.title);
        expect(result.body.data.tag).toBe(myproject.tag);
        expect(result.body.data.category).toBe(myproject.category);
        expect(result.body.data.description).toBe(myproject.description);
        expect(result.body.data.link_web).toBe(myproject.link_web);
        expect(result.body.data.link_git).toBe(myproject.link_git);
        expect(result.body.data.image).toBe(myproject.image);
    });

    it('Should return 404 if myprojectId is not found', async () => {
        const myproject = await getTestMyproject();
        const result = await supertest(web)
            .get(`/api/myprojects/${myproject.id + 1}`)
            .set('Authorization', 'test');

        expect(result.status).toBe(404);
    });

});

describe('PUT /api/myprojects/:myprojectId', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestMyproject();
    });

    afterEach(async () => {
        await removeAllTestMyproject();
        await removeTestUser();
    });

    it('Shoul able to update myproject', async () => {
        const testMyproject = await getTestMyproject();
        const result = await supertest(web)
            .put(`/api/myprojects/${testMyproject.id}`)
            .set('Authorization', 'test')
            .send({
                title: "test2",
                tag: "test,test2",
                category: "test,test2",
                description: "test2",
                link_web: "test2.web",
                link_git: "test2.git",
                image: "test2.jpg"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testMyproject.id);
        expect(result.body.data.title).toBe("test2");
        expect(result.body.data.tag).toBe("test,test2");
        expect(result.body.data.category).toBe("test,test2");
        expect(result.body.data.description).toBe("test2");
        expect(result.body.data.link_web).toBe("test2.web");
        expect(result.body.data.link_git).toBe("test2.git");
        expect(result.body.data.image).toBe("test2.jpg");
    });

    it('Shoul reject if request is invalid', async () => {
        const testMyproject = await getTestMyproject();
        const result = await supertest(web)
            .put(`/api/myprojects/${testMyproject.id}`)
            .set('Authorization', 'test')
            .send({
                title: "test2",
                tag: "",
                category: "",
                description: "test2",
                link_web: "test2.web",
                link_git: "test2.git",
                image: "test2.jpg"
            });

        expect(result.status).toBe(400);
    });

    it('if myproject is not found', async () => {
        const testMyproject = await getTestMyproject();
        const result = await supertest(web)
            .put(`/api/myprojects/${testMyproject.id + 1}`)
            .set('Authorization', 'test')
            .send({
                title: "test2",
                tag: "test,test2",
                category: "test,test2",
                description: "test2",
                link_web: "test2.web",
                link_git: "test2.git",
                image: "test2.jpg"
            });

        expect(result.status).toBe(404);
    })
});

describe('DELETE /api/myprojects/:myprojectId', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestMyproject();
    });

    afterEach(async () => {
        await removeAllTestMyproject();
        await removeTestUser();
    });

    it("Should able to remove myproject", async () => {
        let testMyproject = await getTestMyproject();
        const result = await supertest(web)
            .delete('/api/myprojects/' + testMyproject.id)
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK");

        testMyproject = await getTestMyproject();
        expect(testMyproject).toBeNull();
    });

    it("Should reject if myproject is not found", async () => {
        let testMyproject = await getTestMyproject();
        const result = await supertest(web)
            .delete('/api/myprojects/' + (testMyproject.id + 1))
            .set('Authorization', 'test');

        expect(result.status).toBe(404);
    });
});

describe('GET /api/myprojects', function () {
    beforeEach(async () => {
        await createTestUser();
        await createManyTestMyproject();
    });

    afterEach(async () => {
        await removeAllTestMyproject();
        await removeTestUser();
    });

    it('should able to search without parameter', async () => {
        const result = await supertest(web)
            .get('/api/myprojects/');

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(10);
        expect(result.body.paging.current_page).toBe(1);
        expect(result.body.paging.total_page).toBe(2);
        expect(result.body.paging.total_item).toBe(15);
    });

    it('should able to search page 2', async () => {
        const result = await supertest(web)
            .get('/api/myprojects/')
            .query({
                page: 2
            });

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(5);
        expect(result.body.paging.current_page).toBe(2);
        expect(result.body.paging.total_page).toBe(2);
        expect(result.body.paging.total_item).toBe(15);
    });

    it('should able to search base on title', async () => {
        const result = await supertest(web)
            .get('/api/myprojects/')
            .query({
                title: "test 1"
            });
        console.table(result.body.data)
        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(6);
        expect(result.body.paging.current_page).toBe(1);
        expect(result.body.paging.total_page).toBe(1);
        expect(result.body.paging.total_item).toBe(6);
    });

    it('should able to search base on tag', async () => {
        const result = await supertest(web)
            .get('/api/myprojects/')
            .query({
                tag: "test1"
            });
        console.table(result.body.data)
        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(6);
        expect(result.body.paging.current_page).toBe(1);
        expect(result.body.paging.total_page).toBe(1);
        expect(result.body.paging.total_item).toBe(6);
    });

    it('should able to search base on category', async () => {
        const result = await supertest(web)
            .get('/api/myprojects/')
            .query({
                category: "test1"
            });
        console.table(result.body.data)
        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(6);
        expect(result.body.paging.current_page).toBe(1);
        expect(result.body.paging.total_page).toBe(1);
        expect(result.body.paging.total_item).toBe(6);
    });

    it('should able to search base on category, tag, title', async () => {
        const result = await supertest(web)
            .get('/api/myprojects/')
            .query({
                title: "test 1",
                tag: "test1",
                category: "test1"
            });
        console.table(result.body.data)
        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(6);
        expect(result.body.paging.current_page).toBe(1);
        expect(result.body.paging.total_page).toBe(1);
        expect(result.body.paging.total_item).toBe(6);
    });

    
});

