import { test } from '@playwright/test';
import { getUser, registerUser, updateUser, deleteUser } from '../function/week_2_API';

test.describe('Week 2 API Testing', () => {
  test('GET /api/users/2', async ({ request }) => {
    await getUser(request);
  });

  test('POST /api/users', async ({ request }) => {
    await registerUser(request);
  });

  test('PUT /api/users/2', async ({ request }) => {
    await updateUser(request);
  });

  test('DELETE /api/users/2', async ({ request }) => {
    await deleteUser(request);
  });
});
