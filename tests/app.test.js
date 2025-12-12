const request = require('supertest');
const app = require('../app'); // ton app Express

describe('Users API', () => {

  it('GET /users - doit récupérer tous les utilisateurs', async () => {
    const res = await request(app).get('/users');
    
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    // Si tu veux vérifier les champs :
    if(res.body.length > 0){
      expect(res.body[0]).toHaveProperty('id');
      expect(res.body[0]).toHaveProperty('firstname');
      expect(res.body[0]).toHaveProperty('lastname');
      expect(res.body[0]).toHaveProperty('createdAt');
      expect(res.body[0]).toHaveProperty('updatedAt');
    }
  });

  it('POST /users - doit créer un utilisateur', async () => {
    const userData = { firstname: 'Jacques', lastname: 'Vollet' };

    const res = await request(app)
      .post('/users')
      .send(userData);

    expect(res.status).toBe(201);
    expect(res.body.firstname).toBe('Jacques');
    expect(res.body.lastname).toBe('Vollet');
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('createdAt');
    expect(res.body).toHaveProperty('updatedAt');
  });

  it('GET /users/:id - doit récupérer un utilisateur par id', async () => {
    // Créer un utilisateur avant le test
    const newUser = await request(app)
      .post('/users')
      .send({ firstname: 'Jean', lastname: 'Papin' });

    const res = await request(app).get(`/users/${newUser.body.id}`);
    
    expect(res.status).toBe(200);
    expect(res.body.firstname).toBe('Jean');
    expect(res.body.lastname).toBe('Papin');
  });

  it('PATCH /users/:id - doit modifier un utilisateur', async () => {
  // Créer un utilisateur
  const newUser = await request(app)
    .post('/users')
    .send({ firstname: 'Bob', lastname: 'Martin' });

  const userId = newUser.body.id;

  // Modifier avec PATCH
  const res = await request(app)
    .patch(`/users/${userId}`)
    .send({ firstname: 'Bobby' });

  expect(res.status).toBe(200);
  expect(res.body.firstname).toBe('Bobby');
});


  it('DELETE /users/:id - doit supprimer un utilisateur', async () => {
    const newUser = await request(app)
      .post('/users')
      .send({ firstname: 'Charlie', lastname: 'Dupont' });

    const res = await request(app).delete(`/users/${newUser.body.id}`);
    
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('utilisateur supprimé');
  });

});
