"use client"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function ContactUsForm({
  title,
  label,
  description,
}: {
  label?: string | null;
  title?: string | null;
  description?: string | null;
}) {
  return (
    <form className="">
      <FieldSet>
          {label && <FieldLegend className='text-muted-foreground font-normal text-sm!'> {label}</FieldLegend>}
          {title && <FieldLabel className='text-3xl! font-bold'> {title}</FieldLabel>}
          {description && <FieldDescription>{description}</FieldDescription>}
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor='name'>Name</FieldLabel>
            <Input
              name={'name'}
              id='name'
              type='text'
              placeholder='Name'
            />
          </Field>
          <Field>
            <FieldLabel htmlFor='email'>Email</FieldLabel>
            <Input
              id='email'
              type='text'
              placeholder='Email'
            />
          </Field>
          <Field>
            <FieldLabel htmlFor='message'>Message</FieldLabel>
            <Textarea
              name='message'
              id='message'
              placeholder='Type your message'
            />
          </Field>
          <Field orientation='horizontal'>
            <Checkbox
              name='confirm'
              id='confirm'
              defaultChecked
            />
            <FieldContent>
              <FieldLabel htmlFor='confirm'>
                <FieldDescription>
                  By selecting this you agree to our{' '}
                  <Link href={'/'}>Privacy Policy</Link>
                </FieldDescription>
              </FieldLabel>
            </FieldContent>
          </Field>
          <Field>
            <Button>Send message</Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
