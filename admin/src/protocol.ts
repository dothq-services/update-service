export const apiURLProtocol = () => {
    const environment = process.env.NODE_ENV

    if (environment === 'production') {
        return 'https'
    } else if (environment === 'development' || environment === 'test') {
        return 'http'
    } else {
        return 'http'
    }
}