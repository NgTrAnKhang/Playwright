import { test } from '@playwright/test';
import { getUser, createUser, updateUser, deleteUser } from '../function/week_2_API';

test.describe('API Testing - Week 2', () => {
  test('GET /api/users/2', async ({ request }) => {
    await getUser(request);
  });

  test('POST /api/users', async ({ request }) => {
    await createUser(request);
  });

  test('PUT /api/users/2', async ({ request }) => {
    await updateUser(request);
  });

  test('DELETE /api/users/2', async ({ request }) => {
    await deleteUser(request);
  });
});
