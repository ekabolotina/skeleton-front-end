export default function asset(path: string): string {
    return `/${path}?v=${process.env.NEXT_PUBLIC_ASSETS_VERSION}`;
}
