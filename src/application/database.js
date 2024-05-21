import { PrismaClient } from "@prisma/client";
import { logger } from "./logging.js";

// https://www.prisma.io/docs/orm/prisma-client/observability-and-logging/logging

export const prismaClient = new PrismaClient({
    log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'event',
          level: 'error',
        },
        {
          emit: 'event',
          level: 'info',
        },
        {
          emit: 'event',
          level: 'warn',
        },
      ],
});

prismaClient.$on('error', (e) => {
    logger.error(e);
});

prismaClient.$on('warn', (e) => {
    logger.warn(e);
});

prismaClient.$on('info', (e) => {
    logger.info(e);
})

prismaClient.$on('query', (e) => {
    logger.warn(e);
})

// // harusnya sekarang semua perintah sql dari prisma entah query, error, info, warn itu semuanya 
//  dikirim ke logger winston yang ada di file logging.//