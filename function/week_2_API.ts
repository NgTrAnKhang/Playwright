import { APIRequestContext, expect } from '@playwright/test';
import { selector } from '../selector/week_2_API';

const BASE_URL = 'https://reqres.in';

export async function getUser(request: APIRequestContext) {
  const response = await request.get(`${BASE_URL}${selector.api.getUser}`);
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.data.first_name).toBe('Janet');
  return body;
}

export async function createUser(request: APIRequestContext) {
  const payload = { name: 'Raghav', job: 'Teacher' };
  const response = await request.post(`${BASE_URL}${selector.api.createUser}`, { data: payload });
  expect(response.status()).toBe(201);
  const body = await response.json();
  expect(body.name).toBe('Raghav');
  expect(body.job).toBe('Teacher');
  expect(body).toHaveProperty('id');
  expect(body).toHaveProperty('createdAt');
  return body;
}

export async function updateUser(request: APIRequestContext) {
  const payload = { name: 'Raghav', job: 'Instructor' };
  const response = await request.put(`${BASE_URL}${selector.api.updateUser}`, { data: payload });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.name).toBe('Raghav');
  expect(body.job).toBe('Instructor');
  expect(body).toHaveProperty('updatedAt');
  return body;
}

export async function deleteUser(request: APIRequestContext) {
  const response = await request.delete(`${BASE_URL}${selector.api.deleteUser}`);
  expect(response.status()).toBe(204);
}
