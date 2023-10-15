import { Filters } from '@/models/FiltersModel';
import { MovieModel } from '@/models/MovieModel';
import createQueryString from '@/utils/createQueryString';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback, useEffect } from 'react';

export default function useUpdateQuery(filters: Filters, data?: MovieModel) {
    const searchParams = useSearchParams();
    const createQueryStringMemoed = useCallback(createQueryString, []);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!data) return;
        router.push(
            pathname +
                '?' +
                createQueryStringMemoed(
                    { ...filters, id: data?.id },
                    searchParams,
                ),
        );
    }, [
        filters,
        data,
        router,
        pathname,
        searchParams,
        createQueryStringMemoed,
    ]);
}
