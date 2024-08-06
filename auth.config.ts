//auth.config.ts
import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from './lib/db';
import bcrypt from 'bcryptjs';
import { createUser } from './lib/actions';

const authConfig = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? ''
    }),
    CredentialProvider({
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'you@example.com'
        },
        password: {
          label: 'Password',
          type: 'password'
        }
      },
      async authorize(credentials: any, req: any) {
        // Check if credentials are provided
        if (!credentials.email || !credentials.password) {
          return null; // Return null if email or password is missing
        }

        // Find the user by email
        let user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });
        console.log(user);
        // If user is not found, create a new user
        if (!user) {
          user = await createUser(credentials);
        }

        // Check if the user exists and verify the password
        if (
          user &&
          (await bcrypt.compare(credentials.password, user.password))
        ) {
          console.log('authenticated');
          return user; // Return the user object if authentication is successful
        } else {
          return null; // Return null if authentication fails
        }
      }
    })
  ],
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/' //sigin page
  }
} satisfies NextAuthConfig;

export default authConfig;
