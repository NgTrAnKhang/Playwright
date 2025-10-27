import { APIRequestContext, expect } from '@playwright/test';
import { selector } from '../selector/week_2_API';

const BASE_URL = 'https://reqres.in';
const API_KEY = 'reqres-free-v1';

const registerPayload = {
  username: 'Raghav',
  email: 'Raghav@reqres.in',
  password: '123456'
};

export async function registerUser(request: APIRequestContext) {
  const payload = {
    username: 'Raghav',
    email: 'Raghav@reqres.in',
    password: '123456'
  };

  const response = await request.post(`${BASE_URL}${selector.api.registerUser}`, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY
    },
    data: payload
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body).toHaveProperty('id');
  expect(body).toHaveProperty('token');

  return body;
}


// --- GET USER ---
export async function getUser(request: APIRequestContext) {
  const response = await request.get(`${BASE_URL}${selector.api.getUser}`, {
    headers: { 'x-api-key': API_KEY }
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.data.first_name).toBe('Janet');
  return body;
}

// --- UPDATE USER ---
export async function updateUser(request: APIRequestContext) {
  const payload = { name: 'Raghav', job: 'Instructor' };

  const response = await request.put(`${BASE_URL}${selector.api.updateUser}`, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY
    },
    data: payload
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.name).toBe('Raghav');
  expect(body.job).toBe('Instructor');
  expect(body).toHaveProperty('updatedAt');
  return body;
}

// --- DELETE USER ---
export async function deleteUser(request: APIRequestContext) {
  const response = await request.delete(`${BASE_URL}${selector.api.deleteUser}`, {
    headers: { 'x-api-key': API_KEY }
  });

  expect(response.status()).toBe(204);
}
