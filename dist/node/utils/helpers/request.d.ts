export default function request({ method, url, data, headers, params }: {
    method: string;
    url?: string;
    data?: any;
    headers?: object;
    params?: object;
}): Promise<{
    status: number;
    body: any;
}>;
//# sourceMappingURL=request.d.ts.map