import { PrismaClient } from "@prisma/client";

// Prisma ClientはインスタンスごとにDB接続を生成するため、毎回new PrismaClientすると無駄な接続が増える。
// シングルトンパターンで1インスタンスだけを使い回すようにする。

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// 開発時はホットリロード対策としてglobalにキャッシュしておく。
if (process.env.NODE_ENV! == "production") {
  globalForPrisma.prisma = prisma;
}
