import z from "zod";

export const ColorPickerSchema = z.object({
  color: z
    .string()
    .regex(
      /^#[a-f\d]{3}(?:[a-f\d]?|(?:[a-f\d]{3}(?:[a-f\d]{2})?)?)$/gim,
      "Invalid color",
    ),
});

export type ColorPickerSchemaType = z.infer<typeof ColorPickerSchema>;
