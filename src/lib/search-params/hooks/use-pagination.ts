import { useQueryStates } from 'nuqs';
import { paginationUrlKeys, paginationParsers } from '../parsers/pagination';
import { useMemo } from 'react';

function usePagination(props?: {
  totalPages?: number;
  defaultLimit?: number;
  shallow?: boolean;
  scroll?: boolean;
}) {
  const parser = useMemo(
    () => paginationParsers(props ?? {}),
    [
      props,
    ],
  );

  return useQueryStates(parser, {
    scroll: !!props?.scroll,
    urlKeys: paginationUrlKeys,
    history: 'replace',
    clearOnDefault: true,
    shallow: !!props?.shallow,
  });
}

export { usePagination };
