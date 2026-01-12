'use client';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldError,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React, {useActionState, useEffect} from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Form from 'next/form';
import { contactUsAction } from '@/actions/contact-us';
import { Spinner } from '@/components/ui/spinner';
import {useIsClient} from "usehooks-ts";
import {toast} from "sonner";

export function ContactUsForm({
  title,
  label,
  description,
}: {
  label?: string | null;
  title?: string | null;
  description?: string | null;
}) {
  const isClient = useIsClient()
  const [state, action, isPending] = useActionState(contactUsAction, null);
  useEffect(()=>{
    if (state?.successMessage && !isPending) {
      toast.success(state.successMessage)
    }
  },[state?.successMessage,isPending])

  return (
    <Form action={action}>
      <FieldSet>
        {label && (
          <FieldLegend className='text-muted-foreground font-normal text-sm!'>
            {' '}
            {label}
          </FieldLegend>
        )}
        {title && (
          <FieldLabel className='text-3xl! font-bold'> {title}</FieldLabel>
        )}
        {description && <FieldDescription>{description}</FieldDescription>}
        <FieldGroup>
          <Field data-invalid={!!state?.error?.name}>
            <FieldLabel htmlFor='name'>
              Name <span className='text-red-600'>*</span>
              <span className='sr-only'>Required</span>
            </FieldLabel>
            <Input
              defaultValue={state?.values?.name}
              aria-invalid={!!state?.error?.name}
              name='name'
              id='name'
              type='text'
              placeholder='Name'
            />
            <FieldError>{state?.error?.name}</FieldError>
          </Field>
          <Field data-invalid={!!state?.error?.email}>
            <FieldLabel htmlFor='email'>
              Email <span className='text-red-600'>*</span>
              <span className='sr-only'>Required</span>
            </FieldLabel>
            <Input
              defaultValue={state?.values?.email}
              aria-invalid={!!state?.error?.email}
              id='email'
              name='email'
              type='text'
              placeholder='Email'
            />
            <FieldError>{state?.error?.email}</FieldError>
          </Field>
          <Field data-invalid={!!state?.error?.message}>
            <FieldLabel htmlFor='message'>Message</FieldLabel>
            <Textarea
              defaultValue={state?.values?.message}
              aria-invalid={!!state?.error?.message}
              name='message'
              id='message'
              placeholder='Type your message'
            />
            <FieldError>{state?.error?.message}</FieldError>
          </Field>
          <Field
            data-invalid={!!state?.error?.confirm}
            orientation='horizontal'>
            <Checkbox
              name='confirm'
              id='confirm'
              defaultChecked={state?.values?.confirm === 'on'}
            />
            <FieldContent>
              <FieldLabel htmlFor='confirm'>
                <FieldDescription>
                  By selecting this you agree to our{' '}
                  <Link href={'/privacy-policy'}>Privacy Policy</Link>
                </FieldDescription>
              </FieldLabel>
              <FieldError>{state?.error?.confirm}</FieldError>
            </FieldContent>
          </Field>
          <Field>
            <Button type="submit" disabled={!isClient || isPending}>
              {(!isClient || isPending) && <Spinner />} Send message
            </Button>
          </Field>
        </FieldGroup>
      </FieldSet>
    </Form>
  );
}
