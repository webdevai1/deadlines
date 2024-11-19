import z from "zod";

export const AddGroupSchema = z.object({
  color: z.string(),
  name: z
    .string()
    .min(1, "name must be at least 1 characters long")
    .max(30, "name must be at most 30 characters long"),
});

export type AddGroupSchemaType = z.infer<typeof AddGroupSchema>;
