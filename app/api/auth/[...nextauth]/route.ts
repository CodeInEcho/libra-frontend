import NextAuth, { NextAuthOptions } from "next-auth"
import DiscordProvider from "next-auth/providers/discord"
import TwitterProvider from "next-auth/providers/twitter"

export const authOptions: NextAuthOptions = {
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET
        }),
        TwitterProvider({
            clientId: process.env.TWITTER_ID,
            clientSecret: process.env.TWITTER_SECRET,
            version: "2.0",
        }),
    ],
    callbacks: {
        async redirect({ url, baseUrl }) {
            const regex = /[?&]auth(=([^&#]*)|&|#|$)/;
            const matches = regex.exec(url);
            const auth = matches && decodeURIComponent(matches[2].replace(/\+/g, ' '));
            return auth ? url : `${url}?auth=success`
        },
        session({ session, token }: { session: any, token: any }) {
            session.user.name = token.name;
            session.user.picture = token.picture;
            session.user.provider = token.provider;
            session.user.expires_at = token.expires_at;
            session.user.access_token = token.access_token;
            session.user.refresh_token = token.refresh_token;
            session.user.providerAccountId = token.providerAccountId;
            return session;
        },
        async jwt({ token, user, account }) {
            if (account && (account.provider === 'twitter' || account.provider === 'discord')) {
                token.name = (user as any).name;
                token.picture = (user as any).image;
                token.provider = (account as any).provider;
                token.expires_at = (account as any).expires_at;
                token.access_token = (account as any).access_token;
                token.refresh_token = (account as any).refresh_token;
                token.providerAccountId = (account as any).providerAccountId;
            }
            return token
        },
    },
    secret: process.env.JWT_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }