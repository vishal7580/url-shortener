
export const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'Lax',
    maxAge: 1000 * 60 * 60 * 12 //12 hours
}