import vine from "@vinejs/vine";

export const checkInputValues = vine.compile(
    vine.object({
        email: vine.string().email().minLength(1).maxLength(100),
        senha: vine.string().minLength(8).maxLength(30),
    }),
);