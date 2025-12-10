"use client"
import { Currency, getFormatedPrice } from '@/lib/utils/get-formated-price'

export function CurrencyFormat(
  {
    children,
    currency,
    ...rest
  }: {
    children?: number | string | null,
    currency?:Currency | null ,
  } & Omit<React.ComponentProps<'span'>, 'children'>) {

  return (
    <span {...rest}>
      {getFormatedPrice(children,currency)}
    </span>
  )
}