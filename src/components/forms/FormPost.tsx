import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '../ui/textarea';
import FileUploader from '../shared/FileUploader';
import { PostValidation } from '@/lib/validation';
import { Models } from 'appwrite';
import {
  useCreatePost,
  useUpdatePost,
} from '@/lib/react-query/queryAndMutation';
import { useUserContext } from '@/context/AuthContext';
import { useToast } from '../ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';

type PostProps = {
  post?: Models.Document;
  action: 'create' | 'update';
};

const FormPost = ({ post, action }: PostProps) => {
  const { mutateAsync: createPost, isPending: isCreating } = useCreatePost();
  const { mutateAsync: updatePost, isPending: isUpdating } = useUpdatePost();
  const { user } = useUserContext();
  const { toast } = useToast();
  const naviagte = useNavigate();
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : '',
      file: [],
      location: post ? post?.location : '',
      tags: post ? post?.tags.join(',') : '',
    },
  });

  async function onSubmit(values: z.infer<typeof PostValidation>) {
    if (post && action === 'update') {
      const update = await updatePost({
        ...values,
        postId: post?.$id,
        imageId: post?.imageId,
        imageUrl: post?.imageUrl,
      });

      if (!update) {
        toast({
          title: 'Pls, try again',
        });
      }
      naviagte(`/post-detail/${post.$id}`);
    }else {
    const newPost = await createPost({ ...values, userId: user.id });

        if (!newPost) {
          toast({
            title: 'Pls, try again',
          });
        }
        naviagte('/');
    }
   
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full flex flex-col gap-4 max-w-lg'>
        <FormField
          control={form.control}
          name='caption'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Caption</FormLabel>
              <FormControl>
                <Textarea
                  className='shad-textarea'
                  placeholder='Something you think..'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='file'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='location'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input
                  className='shad-input'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='tags'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input
                  className='shad-input'
                  placeholder='React, NextJS, bla bla...'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex gap-3 justify-end'>
          <Button
            type='button'
            className='shad-button_dark_4'>
            Cancel
          </Button>
          <Button
            type='submit'
            disabled = {isCreating || isUpdating}
            className='shad-button_primary'>
            {isCreating || isUpdating ? (
              <>
                <Loader/>
              </>
            ) : (
              <p className='capitalize'>{action}</p>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormPost;
