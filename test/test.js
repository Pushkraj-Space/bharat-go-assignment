const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../index.js');
const pool = require('../models/db.js');
const User = require('../models/userModel.js')
const uuid = require('uuid');


async function getValidToken() {
    const loginCredentials = {
        email: "John@gmail.com",
        password: "John1",
    };

    const response = await request(app).post("/auth/login").send(loginCredentials).expect(200);
    return response.body.accessToken;
}

describe('GET /', () => {
  it('Home route of server', async () => {
    const response = await request(app).get('/');
    
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.equal('Welcome to Bharat Go');    
  });
});

describe('POST /auth/register', () => {
    before(async () => {
        await pool.query("TRUNCATE TABLE users;");
    });
    it('should register new user', async () => {
        let testUser = {
            name: 'John',
            email: 'John@gmail.com',
            password: 'John1'
        };
        await request(app).post('/auth/register').send(testUser)
        .expect(201)
    });
});

describe('POST /auth/login', () => { 
    it('should login user and return JWT token', async () => {
        let user = {
            email: 'John@gmail.com',
            password: 'John1'
        };
        const response = await request(app).post('/auth/login').send(user);
        expect(200);
        expect(response.body).to.have.property('accessToken');
        expect(response.body.accessToken).to.be.a("String");
    });
})

describe('GET /users', () => {
    let token;
    before(async () => {
        token = await getValidToken();
    });

    it('GET /users : should retrieve a list of all users', async () => {
        await request(app).get('/users')
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
    });
});

describe('GET /users/:id', () => {
    let token;
    before(async () => {
        token = await getValidToken();
    });

    it('should retrieve a specific user by their ID', async () => {
        const testId = uuid.v4();
        const testUser = {
            name: "testuser",
            email: "test@test.com",
            password: "testpass",
            id: testId,
        };
    
        User.getUserById = async (userId) => {
          if (userId === testId) return testUser;
          return null; 
        };
    
        await request(app).get(`/users/${testId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
    });
});

describe('POST /users', () => { 
    let token;
    before(async () => {
        token = await getValidToken();
    });

    it('should create new user.', async () => {
        const testUser = {
            name: "testuser",
            email: "test@test.com",
            password: "testpass",
        };
        
        await request(app).post(`/users/`).send(testUser)
        .set("Authorization", `Bearer ${token}`)
        .expect(201);
    });
})

describe('PUT /users/:id', () => { 
    let token;
    before(async () => {
        token = await getValidToken();
    });

    it('should update an existing user by their ID.', async () => {
        // retrive id from user we created using POST /users
        let {rows} = await pool.query("SELECT * FROM users WHERE email = 'test@test.com';");
        const testUser = {
            name: "new name",
        }
        let testId = rows[0].id;
        await request(app).put(`/users/${testId}`).send(testUser)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
    });
})

describe('DELETE /users/:id', () => { 
    let token;
    before(async () => {
        token = await getValidToken();
    });
    
    it('should update an existing user by their ID.', async () => {
        // retrive id from user we created using POST /users
        let {rows} = await pool.query("SELECT * FROM users WHERE email = 'test@test.com';");
        let testId = rows[0].id;
        await request(app).delete(`/users/${testId}`)
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
    });
 })
