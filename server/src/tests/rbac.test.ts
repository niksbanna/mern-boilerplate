import request from 'supertest';
import app from '../app';
import { User } from '../models';
import { UserRole } from '../types';
import { connectTestDB, closeTestDB, clearTestDB } from './testUtils';

describe('RBAC and Protected Routes', () => {
  let adminToken: string;
  let moderatorToken: string;
  let userToken: string;
  let userId: string;

  beforeAll(async () => {
    await connectTestDB();
  });

  afterAll(async () => {
    await closeTestDB();
  });

  beforeEach(async () => {
    await clearTestDB();

    // Create users with different roles
    const admin = await User.create({
      email: 'admin@example.com',
      password: 'password123',
      name: 'Admin User',
      role: UserRole.ADMIN,
    });

    const moderator = await User.create({
      email: 'moderator@example.com',
      password: 'password123',
      name: 'Moderator User',
      role: UserRole.MODERATOR,
    });

    const user = await User.create({
      email: 'user@example.com',
      password: 'password123',
      name: 'Regular User',
      role: UserRole.USER,
    });

    userId = user._id.toString();

    // Get tokens for each user
    const adminLogin = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@example.com', password: 'password123' });
    adminToken = adminLogin.body.data.accessToken;

    const moderatorLogin = await request(app)
      .post('/api/auth/login')
      .send({ email: 'moderator@example.com', password: 'password123' });
    moderatorToken = moderatorLogin.body.data.accessToken;

    const userLogin = await request(app)
      .post('/api/auth/login')
      .send({ email: 'user@example.com', password: 'password123' });
    userToken = userLogin.body.data.accessToken;
  });

  describe('GET /api/users - List all users', () => {
    it('should allow admin to access', async () => {
      const response = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.users).toBeDefined();
      expect(response.body.data.count).toBe(3);
    });

    it('should allow moderator to access', async () => {
      const response = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${moderatorToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.users).toBeDefined();
    });

    it('should not allow regular user to access', async () => {
      const response = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    it('should not allow unauthenticated access', async () => {
      const response = await request(app)
        .get('/api/users')
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('PATCH /api/users/:id/role - Update user role', () => {
    it('should allow admin to update user role', async () => {
      const response = await request(app)
        .patch(`/api/users/${userId}/role`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ role: UserRole.MODERATOR })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.user.role).toBe(UserRole.MODERATOR);
    });

    it('should not allow moderator to update user role', async () => {
      const response = await request(app)
        .patch(`/api/users/${userId}/role`)
        .set('Authorization', `Bearer ${moderatorToken}`)
        .send({ role: UserRole.MODERATOR })
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    it('should not allow regular user to update user role', async () => {
      const response = await request(app)
        .patch(`/api/users/${userId}/role`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ role: UserRole.MODERATOR })
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /api/users/:id - Update user', () => {
    it('should allow user to update their own profile', async () => {
      const response = await request(app)
        .put(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ name: 'Updated Name' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.user.name).toBe('Updated Name');
    });

    it('should allow admin to update any user', async () => {
      const response = await request(app)
        .put(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Admin Updated' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.user.name).toBe('Admin Updated');
    });

    it('should not allow user to update another user', async () => {
      const anotherUser = await User.create({
        email: 'another@example.com',
        password: 'password123',
        name: 'Another User',
      });

      const response = await request(app)
        .put(`/api/users/${anotherUser._id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ name: 'Hacked Name' })
        .expect(403);

      expect(response.body.success).toBe(false);
    });
  });

  describe('DELETE /api/users/:id - Delete user', () => {
    it('should allow user to delete their own account', async () => {
      const response = await request(app)
        .delete(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    it('should allow admin to delete any user', async () => {
      const response = await request(app)
        .delete(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    it('should not allow user to delete another user', async () => {
      const anotherUser = await User.create({
        email: 'another@example.com',
        password: 'password123',
        name: 'Another User',
      });

      const response = await request(app)
        .delete(`/api/users/${anotherUser._id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(403);

      expect(response.body.success).toBe(false);
    });
  });
});
