export function tokenGetter() {
    const token = localStorage.getItem('token');

    console.log('tokenGetter', token);

    return token;
}
