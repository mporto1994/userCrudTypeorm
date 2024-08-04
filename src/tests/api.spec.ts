import chai from 'chai';
import supertest from 'supertest';
import { appRoutes } from '../routes';
import app from '../api';
import { AppDataSource, DataSourceInitialize } from '../data-source';
import { User } from '../entities/user.entity';
import bcrypt from "bcrypt";

const expect = chai.expect;
const agent = supertest.agent(app);

appRoutes(app);

// Rotas
/*
    /users/create
    /users/login
    /users/
    /users/:id
    /users/:id/delete
    /users/:id/update
*/

describe('CRUD User Test', () => {
    // user 1
    const user1Name: String = "José da Silva";
    const user1Email: String = "js1@jose.com";
    const user1Password: String = "12346";
    let user1Id: String;
    let user1Token: String;
    // user 2
    const user2Name: String = "José da Silva2";
    const user2Email: String = "js2@jose.com";
    const user2Password: String = "1234";
    let user2Id: String;
    let user2Token: String;

    before(async () => {
        await DataSourceInitialize();

        const res = await agent.post('/users/').send({ name: user2Name, email: user2Email, password: user2Password });
        expect(res.statusCode).to.be.equals(201);
        expect(res.body.name).to.be.equals(user2Name);
        expect(res.body.email).to.be.equals(user2Email);
        expect(res.body.password).to.not.be.equals(user2Password);
        expect(res.body.password.length).to.be.equals(60);
        expect(await bcrypt.compare("1234", res.body.password)).to.be.true;

        user2Id = res.body.id;

    });

    it('test create user', async () => {
        let res = await agent.post('/users/').send({ name: user1Name, email: user1Email, password: user1Password });
        expect(res.statusCode).to.be.equals(201);
        expect(res.body.name).to.be.equals(user1Name);
        expect(res.body.email).to.be.equals(user1Email);
        expect(res.body.password).to.not.be.equals(user1Password);
        expect(res.body.password.length).to.be.equals(60);
        expect(await bcrypt.compare("12346", res.body.password)).to.be.true;

        user1Id = res.body.id;
    });

    it('test user login', async () => {
        const res = await agent.post('/users/login').send({ email: user1Email, password: user1Password });
        expect(res.statusCode).to.be.equals(200);

        user1Token = res.body.token;
    });

    it('test get user by id', async () => {
        const res = await agent.get('/users/' + user1Id).set('Authorization', `Bearer ${user1Token}`);
        expect(res.statusCode).to.be.equals(200);
        expect(res.body.id).to.be.equals(user1Id);
        expect(res.body.name).to.be.equals(user1Name);
        expect(res.body.email).to.be.equals(user1Email);
    });

    it('test get user by token', async () => {
        const res = await agent.get('/users/me').set('Authorization', `Bearer ${user1Token}`);
        expect(res.statusCode).to.be.equals(200);
        expect(res.body.id).to.be.equals(user1Id);
        expect(res.body.name).to.be.equals(user1Name);
        expect(res.body.email).to.be.equals(user1Email);
    });

    it('test get user by id to another user', async () => {
        const res = await agent.get('/users/' + user2Id).set('Authorization', `Bearer ${user1Token}`);
        expect(res.statusCode).to.be.equals(200);
        expect(res.body.id).to.be.equals(user2Id);
        expect(res.body.name).to.be.equals(user2Name);
        expect(res.body.email).to.be.equals(user2Email);
    });

    it('test update', async () => {
        const res = await agent.patch('/users/' + user2Id).set('Authorization', `Bearer ${user1Token}`).send({ name: "José alterado", password: "NovaSenha" });
        expect(res.statusCode).to.be.equals(200);
        expect(res.body.user.id).to.be.equals(user2Id);
        expect(res.body.user.name).to.be.equals("José alterado");
        expect(res.body.user.email).to.be.equals(user2Email);
        expect(await bcrypt.compare("NovaSenha", res.body.user.password)).to.be.true;
    });

    it('test delete', async () => {
        const res = await agent.delete('/users/' + user2Id).set('Authorization', `Bearer ${user1Token}`);
        expect(res.statusCode).to.be.equals(203);
    });

    after(async () => {
        after(async () => {
            const userRepository = AppDataSource.getRepository(User);
            await userRepository.clear();
        });
    });
});
