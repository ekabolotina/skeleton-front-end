export default function asset(path: string): string {
    return `/${path}?v=${process.env.NEXT_STATIC_ASSETS_VERSION}`;
}
