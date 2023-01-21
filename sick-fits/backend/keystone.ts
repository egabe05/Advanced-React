import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import {
  statelessSessions,
  withItemData,
} from '@keystone-next/keystone/session';
import 'dotenv/config';

import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { User } from './schemas/User';
import { insertSeedData } from './seed-data/index';

const databaseURL = process.env.DATABASE_URL;

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360,
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  passwordResetLink: {
    sendToken: async (args) => {
      console.log(args);
    },
    tokensValidForMins: 10,
  },
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // TODO: add in initial roles
  },
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseURL,
      async onConnect(keystone) {
        if (process.argv.includes('--seed-data')) {
          await insertSeedData(keystone);
        }
      },
    },
    lists: createSchema({
      // Schema items go in here
      User,
      Product,
      ProductImage,
    }),
    ui: {
      // TODO: change this for roles
      isAccessAllowed: ({ session }) => !!session?.data,
    },
    // TODO: add session values here
    session: withItemData(statelessSessions(sessionConfig), { User: 'id' }),
  })
);
