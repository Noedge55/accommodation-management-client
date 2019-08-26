export default {
  setUser (state,user) {
    state.user = user
    try {
      sessionStorage.setItem("user",JSON.stringify(user))
    } catch (e) {
      console.info(e)
    }
  },
  clearUser(state){
    state.user = null
    try {
      sessionStorage.removeItem("user")
    } catch (e) {
      console.info(e)
    }
  }
}
