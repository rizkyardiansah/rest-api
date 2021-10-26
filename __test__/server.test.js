const request = require('supertest')
const app = require('../app')
let token;
let lastPostId;
let someonePostId;

describe('Endpoint POST /register', () => {
    test('Not send property "name" when register', (done) => {
        request(app)
            .post('/register')
            .send({username: "user_test", password: "123test"})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err, res) => {
                if (err) return done(err)

                expect(res.body).toHaveProperty('success')
                expect(res.body.success).toBe(false)

                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toBe('Data is not complete')

                return done()
            })
    })

    test('Not send property "username" when register', (done) => {
        request(app)
            .post('/register')
            .send({name: "User Test", password: "123test"})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err, res) => {
                if (err) return done(err)

                expect(res.body).toHaveProperty('success')
                expect(res.body.success).toBe(false)

                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toBe('Data is not complete')

                return done()
            })
    })
    
    test('Not send property "password" when register', (done) => {
        request(app)
            .post('/register')
            .send({username: "user_test", name: "User Test"})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err, res) => {
                if (err) return done(err)

                expect(res.body).toHaveProperty('success')
                expect(res.body.success).toBe(false)

                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toBe('Data is not complete')

                return done()
            })
    })

    test('Send complete data (username, name, password) when register', (done) => {
        request(app)
            .post('/register')
            .send({name: "User Test", username: "user_test", password: "123test"})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err)

                expect(res.body).toHaveProperty('success')
                expect(res.body.success).toBe(true)

                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toBe('User succesfully added')

                return done()
            })
    })
})

//################################################################################

describe('Endpoint POST /login', () => {
    test('Not send property "username" when login', (done) => {
        request(app)
            .post('/login')
            .send({password: "123test"})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err, res) => {
                if (err) return done(err)

                expect(res.body).toHaveProperty('success')
                expect(res.body.success).toBe(false)

                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toBe('Data is not complete')

                return done()
            })
    })
    
    test('Not send property "password" when login', (done) => {
        request(app)
            .post('/login')
            .send({username: "user_test"})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err, res) => {
                if (err) return done(err)

                expect(res.body).toHaveProperty('success')
                expect(res.body.success).toBe(false)

                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toBe('Data is not complete')

                return done()
            })
    })

    test('Input wrong username when login', (done) => {
        request(app)
            .post('/login')
            .send({username: 'wrong_username', password: '123test'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(401)
            .end((err, res) => {
                if (err) return done(err)

                expect(res.body).toHaveProperty('success')
                expect(res.body.success).toBe(false)

                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toBe('Username or Password is wrong')
            
                return done()
            })
    })
    
    test('Input wrong password when login', (done) => {
        request(app)
            .post('/login')
            .send({username: 'user_test', password: 'wrong_password'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(401)
            .end((err, res) => {
                if (err) return done(err)

                expect(res.body).toHaveProperty('success')
                expect(res.body.success).toBe(false)

                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toBe('Username or Password is wrong')

                return done()
            })
    })

    test('Input complete and correct data', (done) => {
        request(app)
            .post('/login')
            .send({username: "user_test", password: "123test"})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)

                expect(res.body).toHaveProperty('success')
                expect(res.body.success).toBe(true)

                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toBe('Login succeded')

                expect(res.body).toHaveProperty('token')
                token = res.body.token
                            
                return done()
            })
    })
})

//################################################################################

describe('Endpoint POST /posts for creating post', () => {
    test('Not send "title" when creating post', (done) => {
        request(app)
            .post('/posts')
            .set('Authorization', token)
            .send({category: "Coba Post", body: "coba body post"})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err, res) => {
                if (err) return done(err)

                expect(res.body).toHaveProperty('success')
                expect(res.body.success).toBe(false)

                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toBe('Data is not complete')

                return done()
            })
    })
    
    test('Not send "category" when creating post', (done) => {
        request(app)
            .post('/posts')
            .set('Authorization', token)
            .send({title: "Judul Coba Post", body: "coba body post"})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err, res) => {
                if (err) return done(err)

                expect(res.body).toHaveProperty('success')
                expect(res.body.success).toBe(false)

                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toBe('Data is not complete')

                return done()
            })
    })
    
    test('Not send "body" when creating post', (done) => {
        request(app)
            .post('/posts')
            .set('Authorization', token)
            .send({title: 'Judul Coba Post', category: "Coba Post"})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err, res) => {
                if (err) return done(err)

                expect(res.body).toHaveProperty('success')
                expect(res.body.success).toBe(false)

                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toBe('Data is not complete')

                return done()
            })
    })
    
    it('Create post with complete data', (done) => {
        request(app)
            .post('/posts')
            .set('Authorization', token)
            .send({title: "Judul Coba Post", category: "Coba Post", body: "coba body post"})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err)
                
                expect(res.body).toHaveProperty('success')
                expect(res.body.success).toBe(true)
                
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toBe('Post has been added')

                return done()
            })
    })
})

//################################################################################

describe('Endpoint GET /posts for getting all the posts', () => {
    test('GET all posts', (done) => {
        request(app)
            .get('/posts')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)

                expect(res.body).toHaveProperty('success')
                expect(res.body.success).toBe(true)

                expect(res.body).toHaveProperty('data')
                expect(typeof res.body.data).toBe('object')
                lastPostId = res.body.data[res.body.data.length-1].id
                someonePostId = res.body.data[0].id
  
                return done()
            })
    })
})

//################################################################################

describe('Endpoint POST /posts/:id/edit for editing specifed post', () => {
    test('Input wrong id', (done) => {
        const wrongId = '123123'
        request(app)
            .post(`/posts/${wrongId}/edit`)
            .set('Authorization', token)
            .set('Accept', 'application/json')
            .expect(404)
            .end((err, res) => {
                if (err) return done(err)

                expect(res.body).toHaveProperty('success')
                expect(res.body.success).toBe(false)

                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toBe('Post not found')

                return done()
            })

    })

    test('Edit post that not yours', (done) => {
        request(app)
            .post(`/posts/${someonePostId}/edit`)
            .set('Authorization', token)
            .set('Accept', 'application/json')
            .expect(403)
            .end((err, res) => {
                if (err) return done(err)

                expect(res.body).toHaveProperty('success')
                expect(res.body.success).toBe(false)

                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toBe('You are not Authorized to update this post')
                
                return done()
            })
            
    })
        
    test('Edit post with correct id', (done) => {
        request(app)
            .post(`/posts/${lastPostId}/edit`)
            .set('Authorization', token)
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                
                expect(res.body).toHaveProperty('success')
                expect(res.body.success).toBe(true)
                
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toBe('Post has been updated')

                return done()
            })
    })
})

//################################################################################

describe('Endpoint POST /posts/:id/delete for deleting post', () => {
    test('Wrong post id', (done) => {
        let wrongPostId= 'asdasdf'
        request(app)
            .post(`/posts/${wrongPostId}/delete`)
            .set('Authorization', token)
            .set('Accept', 'application/json')
            .expect(404)
            .end((err, res) => {
                if (err) return done(err)

                expect(res.body).toHaveProperty('success')
                expect(res.body.success).toBe(false)

                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toBe('Post not found')

                return done()
            })
    })

    test('Delete post that not yours', (done) => {
        request(app)
            .post(`/posts/${someonePostId}/delete`)
            .set('Authorization', token)
            .set('Accept', 'application/json')
            .expect(403)
            .end((err, res) => {
                if (err) return done(err)

                expect(res.body).toHaveProperty('success')
                expect(res.body.success).toBe(false)

                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toBe('You are not Authorized to delete this post')
                
                return done()
            })
            
    })

    test('delete post', (done) => {
        request(app)
            .post(`/posts/${lastPostId}/delete`)
            .set('Authorization', token)
            .set('Accept', 'application/json')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)

                expect(res.body).toHaveProperty('success')
                expect(res.body.success).toBe(true)

                return done()
            })
    })   
})
