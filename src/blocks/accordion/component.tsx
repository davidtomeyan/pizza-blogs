import { IAccordion } from '@/payload-types';
import { RichText } from '@/components/rich-text';
import { cn } from '@/lib/utils';
import { CMSLink } from '@/components/cms-link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Section } from '@/components/section';

export function AccordionSection(props: IAccordion) {
  return (
    <Section
      id={props.slug ?? undefined}
      className={cn([
        props.bgVariant,
      ])}>
      <div className='max-w-6xl mx-auto space-y-8 lg:space-y-12 px-6 lg:px-12 py-8 md:py-16'>
        {props.content && (
          <RichText
            className='mx-auto'
            data={props.content}
          />
        )}
        <Accordion
          className='w-full'
          collapsible
          type={'single'}>
          {props.items?.map((item, i) => (
            <AccordionItem
              className='animate-from-r'
              key={`accordion-item-${i}`}
              value={`accordion-item-${i}`}>
              <AccordionTrigger className='text-lg'>
                {item.title}
              </AccordionTrigger>
              <AccordionContent>
                {item.content && (
                  <RichText
                    className='prose-base lg:prose-base max-w-full'
                    data={item.content}
                  />
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        {(props.links?.length ?? 0) > 0 && (
          <div className='flex flex-wrap w-full gap-y-6 gap-x-4 justify-center animate-from-l'>
            {props.links?.map((item, i) => (
              <CMSLink
                {...item.link}
                size='lg'
                className={cn([
                  'grow md:max-w-sm',
                ])}
                key={`link-${i}`}
              />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
