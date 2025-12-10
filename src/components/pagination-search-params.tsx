'use client';
import {
  Fragment,
  type MouseEventHandler,
  useCallback,
  useMemo,
} from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import { usePagination } from '@/lib/search-params/hooks/use-pagination';
import { useIsHydrated } from '@/hooks/use-is-hydrated';

function PaginationSearchParams({
  totalPages,
  defaultLimit = 5,
  maxVisible = 5,
  size = 'icon',
  className,
}: {
  defaultLimit: number;
  totalPages: number;
  maxVisible?: number;
  size?: 'default' | 'sm' | 'lg' | 'icon' | null | undefined;
  className?: string;
}) {
  const isHydrated = useIsHydrated();
  const [{ page: currentPage }, setState] = usePagination({
    defaultLimit,
    scroll: false,
    shallow: true,
  });
  const handlePrev = useCallback<MouseEventHandler<HTMLAnchorElement>>(
    async (e) => {
      e.preventDefault();
      if (currentPage > 1) {
        await setState((prev) => ({
          ...prev,
          page: currentPage - 1,
        }));
      }
    },
    [
      currentPage,
      setState,
    ],
  );

  const handleNext = useCallback<MouseEventHandler<HTMLAnchorElement>>(
    async (e) => {
      e.preventDefault();
      if (currentPage < totalPages) {
        await setState((prev) => ({
          ...prev,
          page: currentPage + 1,
        }));
      }
    },
    [
      currentPage,
      totalPages,
      setState,
    ],
  );

  const handlePage = useCallback<
    (page: number) => MouseEventHandler<HTMLAnchorElement>
  >(
    (page) => async (e) => {
      e.preventDefault();
      await setState((prev) => ({
        ...prev,
        page,
      }));
    },
    [
      setState,
    ],
  );

  const pages = useMemo(() => {
    return Array.from(
      {
        length: totalPages,
      },
      (_, index) => index + 1,
    );
  }, [
    totalPages,
  ]);

  const visiblePages = useMemo(() => {
    const total = pages.length;
    if (total <= maxVisible) return pages;

    const first = pages[0];
    const last = pages[total - 1];

    const middleCount = Math.max(0, maxVisible - 2);
    const half = Math.floor(middleCount / 2);

    let start = currentPage - half;
    let end = start + middleCount - 1;

    if (start < 2) {
      start = 2;
      end = start + middleCount - 1;
    }

    if (end > totalPages - 1) {
      end = totalPages - 1;
      start = end - middleCount + 1;
    }

    start = Math.max(2, Math.min(start, totalPages - 1));
    end = Math.max(2, Math.min(end, totalPages - 1));
    if (start > end)
      [start, end] = [
        end,
        start,
      ];

    const middle = pages.slice(start - 1, end);

    return [
      first,
      ...middle,
      last,
    ];
  }, [
    pages,
    currentPage,
    totalPages,
    maxVisible,
  ]);

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            size={size === 'icon' ? 'default' : size}
            className={cn([
              currentPage <= 1 ? 'pointer-events-none opacity-40' : '',
            ])}
            aria-disabled={currentPage < 1 || !isHydrated}
            href={'#'}
            onClick={handlePrev}
          />
        </PaginationItem>
        {visiblePages.map((page, pageIndex) => {
          const isFirst = pageIndex === 0;
          const showDotsStart =
            pages.length > maxVisible && isFirst && currentPage > 3;

          const isLast = visiblePages.length === pageIndex + 1;
          const showDotsEnd =
            pages.length > maxVisible && isLast && page > currentPage + 2;

          return (
            <Fragment key={`page-${page}`}>
              {showDotsEnd && (
                <PaginationEllipsis className='text-muted-foreground' />
              )}
              <PaginationItem>
                <PaginationLink
                  aria-disabled={!isHydrated}
                  size={size}
                  isActive={currentPage === page}
                  aria-label={`Go to ${page} page`}
                  onClick={handlePage(page)}
                  href={'#'}>
                  {page}
                </PaginationLink>
              </PaginationItem>
              {showDotsStart && (
                <PaginationEllipsis className='text-muted-foreground' />
              )}
            </Fragment>
          );
        })}
        <PaginationItem>
          <PaginationNext
            size={size === 'icon' ? 'default' : size}
            className={cn([
              currentPage >= totalPages ? 'pointer-events-none opacity-40' : '',
            ])}
            aria-disabled={currentPage >= totalPages || !isHydrated}
            href={'#'}
            onClick={handleNext}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export { PaginationSearchParams, usePagination };
