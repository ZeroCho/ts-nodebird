import 'core-js/stable';

export async function get(url: string): Promise<Output>
{
    let response: Response = await fetch(url, { method: "GET" });
    return {
        status: response.status,
        data: await response.text()
    };
}

interface Output
{
    status: number;
    data: string;
}
