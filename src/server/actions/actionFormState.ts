export type ContactFormState = { message: string | undefined; error?: boolean };

export const initialState: ContactFormState = {
  message: undefined
}