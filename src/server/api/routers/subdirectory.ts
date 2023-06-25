import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const subdirectoriesRouter = createTRPCRouter({
  add: publicProcedure
    .input(
      z.object({
        title: z.string(),
        icon: z.string().emoji("Only emojis allowed").max(4),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.subdirectories.create({
        data: {
          title: input.title,
          icon: input.icon,
          address: "0x124",
        },
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.subdirectories.findMany();
  }),
});
