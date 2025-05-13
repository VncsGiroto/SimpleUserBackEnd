import vine from "@vinejs/vine";

export const checkInputValues = vine.compile(
    vine.object({
        nome: vine.string().regex(/^[a-zA-Z]/).minLength(1).maxLength(100),
        senha: vine.string().minLength(8).maxLength(150),
    }),
);