import * as z from "zod";

export const questionSchema = z.object({
  title: z.string().min(5).max(130, {
    message: "Username must be at least 5 characters",
  }),
  explantion: z.string().min(10),
  tags: z.array(z.string().min(2).max(50)).min(1).max(5),
});
