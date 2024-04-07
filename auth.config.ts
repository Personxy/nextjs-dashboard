import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    // authorized(params) {
    //   const {
    //     auth,
    //     request: { nextUrl },
    //   } = params;

    //   console.log('params', params, 'auth', auth, 'nexturl', nextUrl);
    //   const isLoggedIn = !!auth?.user;
    //   const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
    //   console.log('isLoggedIn', isLoggedIn);
    //   console.log('isOnDashboard', isOnDashboard);
    //   if (isOnDashboard) {
    //     if (isLoggedIn) return true;
    //     return false; // Redirect unauthenticated users to login page
    //   } else if (isLoggedIn) {
    //     return Response.redirect(new URL('/dashboard', nextUrl));
    //   }
    //   return true;
    // },
    async signIn({ user, account, profile, email, credentials }) {
      console.log('signIn', { user, account, profile, email, credentials });
      if (account?.provider === 'github') {
        return true;
      }
      if (account?.provider == 'credentials') {
        return true;
      }
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async redirect({ url, baseUrl }) {
      console.log('redirect', { url, baseUrl });
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async session({ session, token, user }) {
      console.log('session', { session, token, user });
      // Send properties to the client, like an access_token from a provider.
      // session.accessToken = token.accessToken
      return session;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
