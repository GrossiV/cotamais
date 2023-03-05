const SECONDS_TO_EXPIRE_TOKEN = 60 * 60;

export function isAuthenticated()  {
    const user = JSON.parse(
        localStorage.getItem(
            localStorage.getItem('loggedUser')
        )
    )
    if(!user) {
        localStorage.removeItem('loggedUser');
        return false
    }
    const navigationStart = new Date(user?.token);
    const timeElapsedInSeconds = Math.round((Date.now() - navigationStart) / 1000)
    if(timeElapsedInSeconds > (SECONDS_TO_EXPIRE_TOKEN)) {
        localStorage.removeItem('loggedUser');
        return false
    }
    return true;
}
