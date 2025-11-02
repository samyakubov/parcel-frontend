

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function isHTTPError(data: any): data is HTTPError {
    return data.message
}
