"use server"

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function loginAction(formData: FormData) {
    try {
        await signIn("credentials", formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials." };
                default:
                    return { error: "Something went wrong." };
            }
        }
        throw error;
    }
}

export async function registerAction(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    if (!email || !password || !name) {
        return { error: "Missing fields" };
    }

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        return { error: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Calculate waitlist position
    const userCount = await prisma.user.count();

    await prisma.user.create({
        data: {
            email,
            name,
            password: hashedPassword,
            waitlistPosition: userCount + 1, // basic auto-increment simulation
        },
    });

    try {
        await signIn("credentials", formData);
    } catch (err) {
        throw err;
    }
}
