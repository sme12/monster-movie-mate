import { ReadonlyURLSearchParams } from 'next/navigation';

const createQueryString = (
    paramsObject: Record<string, any>,
    searchParams: ReadonlyURLSearchParams,
) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(paramsObject).forEach(([key, value]) => {
        if (!value) {
            params.delete(key);
            return;
        }
        params.set(key, value.toString());
    });

    return params.toString();
};

export default createQueryString;
