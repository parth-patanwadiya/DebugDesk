'use client'

import ErrorMessages from '@/app/components/ErrorMessages';
import Spinner from '@/app/components/Spinner';
import { issueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

type IssueFormData = z.infer<typeof issueSchema>;

// Dynamically import react-simplemde-editor with no SSR
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

const IssueForm = async ({ issue } : { issue? : Issue }) => {

  const router = useRouter();
  const {register, control, handleSubmit, formState: { errors }} = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema)
  });

  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit( async (data) => {
    try {
      setSubmitting(true);
      if(issue)
        await axios.patch('/api/issues/' + issue.id, data);
      else
        await axios.post('/api/issues', data);
      router.push('/issues');
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError('An unexpected error occured.');
    }
  });

  return (
    <div className='max-w-xl'>
      {error && (
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form 
        className='space-y-3' 
        onSubmit={onSubmit}
      >
        <TextField.Root>
          <TextField.Input defaultValue={issue?.title} placeholder='Title' {...register('title')}/>
        </TextField.Root>
        <ErrorMessages>
          {errors.title?.message}
          </ErrorMessages>
        <Controller 
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) =>
            <SimpleMDE placeholder='Description' {...field}/>
          }
        />  
        <ErrorMessages>
          {errors.description?.message}
          </ErrorMessages>
        <Button disabled={isSubmitting}>
          { issue? 'Update Issue' : 'Submit New Issue' }{' '}{ isSubmitting && <Spinner/>}
        </Button>
      </form>
    </div>
  )
}

export default IssueForm