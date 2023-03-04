const SECONDS_TO_EXPIRE_TOKEN = 60 * 60;

export function isAuthenticated()  {
    const user = JSON.parse(
        localStorage.getItem(
            localStorage.getItem('loggedUser')
        )
    )

    const navigationStart = new Date(user?.token);
    const timeElapsedInSeconds = Math.round((Date.now() - navigationStart) / 1000)
    if(timeElapsedInSeconds > (SECONDS_TO_EXPIRE_TOKEN)) {
        // TODO warn user that his login has expired
        localStorage.removeItem('loggedUser');
        return false
    }
    return true;
}
// TODO test if works with a clean local storage