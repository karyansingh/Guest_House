export const addResetCase = (builder, initialState) => {
  builder.addCase("LOGOUT", () => initialState);
}