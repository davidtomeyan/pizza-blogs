'use client';
import { clsx } from 'clsx';

import {
  useCarousel,
  Carousel,
  CarouselNext,
  CarouselPrevious,
  CarouselItem,
  CarouselContent,
  CarouselApi,
} from '@/components/ui/carousel';

import {
  ComponentProps,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { cn } from '@/lib/utils';
import { useIsHydrated } from '@/hooks/use-is-hydrated';

type CarouselPaginationProps = {
  onSelectedIndex?: (index: number) => void;
  withMask?: boolean;
  classNameDots?: string;
  length?: number;
} & ComponentProps<typeof Carousel>;

function CarouselPagination({
  classNameDots,
  withMask = true,
  className,
  onSelectedIndex,
  length: lengthProps = 5,
  ...props
}: CarouselPaginationProps) {
  const [apiLocal, setApiLocal] = useState<CarouselApi>();
  const [length, setLength] = useState(lengthProps);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { api } = useCarousel();

  useEffect(() => {
    if (!api || !apiLocal) return;

    const onSelect = () => {
      const index = api.selectedScrollSnap();
      apiLocal.scrollTo(index);
      api.scrollTo(index);
      setSelectedIndex(index);
      onSelectedIndex?.(index);
    };

    const length = api.scrollSnapList().length;

    setLength(length);
    onSelect();

    api.on('select', onSelect);

    return () => {
      api.off('select', onSelect);
    };
  }, [
    api,
    onSelectedIndex,
    apiLocal,
  ]);

  const handlePageChange = useCallback(
    (v: number) => {
      api?.scrollTo?.(v);
    },
    [
      api,
    ],
  );

  const carouselItems = useMemo(
    () =>
      Array.from({
        length: length,
      }).map((_, index) => index),
    [
      length,
    ],
  );
  const hydrated = useIsHydrated();

  return (
    <Carousel
      setApi={setApiLocal}
      opts={{
        watchDrag: false,
        loop: true,
        dragFree: false,
        align: 'center',
        active: hydrated,
      }}
      {...props}
      className={cn(
        'max-w-32 w-32 flex justify-center',
        withMask
          && '[mask-image:linear-gradient(to_right,transparent_0%,white_20%,white_80%,transparent_100%)]',
        className,
      )}>
      <CarouselContent className='ml-0'>
        {carouselItems.map((item) => (
          <CarouselItem
            className={cn([
              'w-fit max-w-fit pl-0',
            ])}
            key={item}>
            <button
              aria-disabled={!hydrated}
              disabled={!hydrated}
              onClick={() => handlePageChange(item)}
              className={clsx([
                'disabled:opacity-90 block focus:outline-none w-4  hover:cursor-pointer',
                !hydrated && 'pointer-events-none',
              ])}>
              <span
                className={cn([
                  'block rounded-full bg-muted-foreground transition-all duration-300 m-auto size-2',
                  classNameDots,
                  item == selectedIndex && 'bg-primary',
                ])}
              />
            </button>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

function useSelectedIndex() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { api } = useCarousel();
  useEffect(() => {
    if (!api) return;
    const onSelect = (carousel: CarouselApi) => {
      setSelectedIndex(carousel!.selectedScrollSnap());
    };
    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [
    api,
  ]);
  return selectedIndex;
}

export {
  useSelectedIndex,
  useCarousel,
  CarouselPagination,
  CarouselPrevious,
  CarouselNext,
  Carousel,
  CarouselItem,
  CarouselContent,
  type CarouselApi,
};
