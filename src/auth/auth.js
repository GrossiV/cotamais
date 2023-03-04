const EXPIRATION_IN_MINUTES = 5;

export function isAuthenticated()  {
    const user = JSON.parse(
        localStorage.getItem(
            localStorage.getItem('loggedUser')
        )
    )

    const navigationStart = new Date(user?.token);
    const timeElapsed = Math.round((Date.now() - navigationStart) / 1000)
    if(timeElapsed > (EXPIRATION_IN_MINUTES * 60)) {
        // TODO warn user that his login has expired
        localStorage.removeItem('loggedUser');
        return false
    }
    return true;
}
