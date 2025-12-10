import { JSXConverters } from '@payloadcms/richtext-lexical/react'
import { SerializedHorizontalRuleNode } from '@payloadcms/richtext-lexical'

export const horizontalRuleJSXConverter: JSXConverters<SerializedHorizontalRuleNode> = {
  horizontalrule: <hr  className="border-border border-[0.5px]"/>,
}