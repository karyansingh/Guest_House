export const isLoadingReduser = (state, action) => {
    state.loading = action.payload
}