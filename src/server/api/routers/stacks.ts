import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const stacksRouter = createTRPCRouter({
  add: publicProcedure
    .input(
      z.object({
        title: z.string(),
        icon: z.string().emoji("Only emojis allowed").max(4),
        address: z.string(),
        eoa: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.stacks.create({
        data: {
          title: input.title,
          icon: input.icon,
          address: input.address,
          isRoot: false,
          eoa: input.eoa,
        },
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.stacks.findMany();
  }),
  getAllForUser: publicProcedure
    .input(z.object({ eoa: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.stacks.findFirst({ where: { eoa: input.eoa } });
    }),
});
