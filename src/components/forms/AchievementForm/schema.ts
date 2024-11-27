import { z } from "zod";

// Create the Zod schema based on the new attributes
export const achievementSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  detail: z.string().nonempty({ message: "Detail is required" }),
  organizer: z.string().nonempty({ message: "Organizer is required" }),
  image: z.string().nullable(),
  date: z.string().nonempty({ message: "Date is required" }),
});