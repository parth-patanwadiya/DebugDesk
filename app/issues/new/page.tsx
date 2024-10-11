'use client'

import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import "easymde/dist/easymde.min.css";
import dynamic from 'next/dynamic';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios'; 
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import ErrorMessages from '@/app/components/ErrorMessages';

type IssueForm = z.infer<typeof createIssueSchema>;

// Dynamically import react-simplemde-editor with no SSR
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

const NewIssuePage = () => {

  const router = useRouter();
  const {register, control, handleSubmit, formState: { errors }} = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });

  const [error, setError] = useState('');

  return (
    <div className='max-w-xl'>
      {error && (
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form 
        className='space-y-3' 
        onSubmit={handleSubmit( async (data) => {
          try {
            await axios.post('/api/issues', data);
            router.push('/issues');
          } catch (error) {
            setError('An unexpected error occured.');
          }
        })}>
        <TextField.Root>
          <TextField.Input placeholder='Title' {...register('title')}/>
        </TextField.Root>
        <ErrorMessages>
          {errors.title?.message}
          </ErrorMessages>
        <Controller 
          name="description"
          control={control}
          render={({ field }) =>
            <SimpleMDE placeholder='Description' {...field}/>
          }
        />
        <ErrorMessages>
          {errors.description?.message}
          </ErrorMessages>
        <Button>Submit New Issue</Button>
      </form>
    </div>
  )
}

export default NewIssuePage