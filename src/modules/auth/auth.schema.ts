import {z} from 'zod'

export const createUserSchema=z.object({
    fullName:z.string(),
    email:z.email(),
    role:z.enum(['Production Manager','Sales Rep','Admin']),
    password:z.string()
})

export const loginUserSchema=z.object({
    email:z.email(),
    password:z.string()
})

export const changePasswordSchema = z.object({
    currentPassword: z.string().min(1),
    newPassword: z.string().min(1),
    confirmPassword: z.string().min(1),
});

