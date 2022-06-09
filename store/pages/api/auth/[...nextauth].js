import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

const options = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'me@mail.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`,
            {
              identifier: credentials.email,
              password: credentials.password,
            }
          );
          if (data) {
            return data;
          } else {
            return null;
          }
        } catch (e) {
          console.log(e.response.data.message);
        }
      },
    }),
  ],
  session: {
    jwt: true,
  },

  callbacks: {
    //   get jwt token from api response
    jwt: async (token, user) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.jwt = user.jwt;
        token.id = user.user.id;
        token.name = user.user.username;
        token.email = user.user.email;
      }
      return Promise.resolve(token);
    },

    session: async (session, user) => {
      session.jwt = user.jwt;
      session.id = user.id;
      return Promise.resolve(session);
    },
  },
};

const Auth = (req, res) => NextAuth(req, res, options);

export default Auth;
