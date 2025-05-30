import vine, { SimpleMessagesProvider } from "@vinejs/vine";
    const messages = {
        string: 'O campo {{ field }} deve ser uma string',
        email: 'O campo {{ field }} deve ser um endereço de e-mail válido',
        minLength: 'O campo {{ field }} deve ter pelo menos {{ min }} caracteres',
        maxLength: 'O campo {{ field }} não deve ter mais que {{ max }} caracteres',
    }
    vine.messagesProvider = new SimpleMessagesProvider(messages)
export const checkInputValues = vine.compile(

    vine.object({
        email: vine.string().email().minLength(1).maxLength(100),
        senha: vine.string().minLength(5).maxLength(30),
    }),
);