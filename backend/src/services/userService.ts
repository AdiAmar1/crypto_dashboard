import { randomUUID } from 'node:crypto'
import { UserError } from '../errors/userError.js'
import * as userModel from '../models/userModel.js'
import type {
  LoginRequest,
  RegisterRequest,
  User,
  UserPreferences,
} from '../types/user.js'
import { toPublicUser } from '../types/user.js'
import { hashPassword, verifyPassword } from '../utils/password.js'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_PASSWORD_LENGTH = 8

function parseRegisterInput(input: RegisterRequest): RegisterRequest {
  const name = typeof input.name === 'string' ? input.name.trim() : ''
  const email =
    typeof input.email === 'string' ? input.email.trim().toLowerCase() : ''
  const password = typeof input.password === 'string' ? input.password : ''

  return { name, email, password }
}

export async function register(input: RegisterRequest): Promise<User> {
  const { name, email, password } = parseRegisterInput(input)

  if (!name || !email || !password) {
    throw new UserError('Name, email, and password are required', 400)
  }

  if (!EMAIL_PATTERN.test(email)) {
    throw new UserError('Invalid email address', 400)
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new UserError(
      `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
      400,
    )
  }

  if (await userModel.findByEmail(email)) {
    throw new UserError('An account with this email already exists', 409)
  }

  const user = {
    id: randomUUID(),
    name,
    email,
    passwordHash: hashPassword(password),
    preferences: null,
  }

  await userModel.create(user)

  return toPublicUser(user)
}

function parseLoginInput(input: LoginRequest): LoginRequest {
  const email =
    typeof input.email === 'string' ? input.email.trim().toLowerCase() : ''
  const password = typeof input.password === 'string' ? input.password : ''

  return { email, password }
}

export async function login(input: LoginRequest): Promise<User> {
  const { email, password } = parseLoginInput(input)

  if (!email || !password) {
    throw new UserError('Email and password are required', 400)
  }

  const stored = await userModel.findByEmail(email)
  if (!stored || !verifyPassword(password, stored.passwordHash)) {
    throw new UserError('Invalid email or password', 401)
  }

  return toPublicUser(stored)
}

export async function getUserData(userId: string): Promise<User> {
  const stored = await userModel.findById(userId)
  if (!stored) {
    throw new UserError('User not found', 404)
  }

  return toPublicUser(stored)
}

export async function savePreferences(
  userId: string,
  preferences: UserPreferences,
): Promise<User> {
  const updated = await userModel.updatePreferences(userId, preferences)

  if (!updated) {
    throw new UserError('User not found', 404)
  }

  return toPublicUser(updated)
}
