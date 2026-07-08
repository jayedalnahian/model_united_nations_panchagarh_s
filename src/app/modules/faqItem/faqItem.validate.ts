import z from "zod";

export const createFaqItemValidate = z.object({
    question: z.string().min(1, "Question is required"),
    answer: z.string().min(1, "Answer is required"),
});

export const updateFaqItemValidate = z.object({
    question: z.string().min(1, "Question is required").optional(),
    answer: z.string().min(1, "Answer is required").optional(),
    isActive: z.boolean().optional(),
    order: z.number().optional(),
});