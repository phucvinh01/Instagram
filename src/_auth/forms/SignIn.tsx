import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { SignInValidation } from '@/lib/validation';
import { z } from 'zod';
import logo from '/assets/images/logo.svg';
import Loader from '@/components/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useSignInAccount } from '@/lib/react-query/queryAndMutation';
import { useUserContext } from '@/context/AuthContext';

const SignIn = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Queries
  const { mutateAsync: signInAccount } =
    useSignInAccount();

  // Handler
  const handleSignup = async (user: z.infer<typeof SignInValidation>) => {
    try {
      const session = await signInAccount({
        email: user.email,
        password: user.password,
      });

      if (!session) {
        toast({ title: 'Something went wrong. Please login your new account' });

        navigate('/sign-in');

        return;
      }

      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        form.reset();

        navigate('/');
      } else {
        toast({ title: 'Login failed. Please try again.' });

        return;
      }
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <div className='sm:w-420 flex-center flex-col'>
      <Form {...form}>
        <img
          src={logo}
          alt='logo'
        />
        <h2 className='h3-bold md:h2-blod pt-5 sm:pt-12'>Wellcome back!</h2>
        <p className='text-light-3 small-medium md:base-regular mt-2'>
          bla bla
        </p>
        <form
          onSubmit={form.handleSubmit(handleSignup)}
          className='flex flex-col gap-5 w-full mt-3'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
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
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    className='shad-input'
                    type='password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            className='shad-button_primary'>
            {isUserLoading ? (
              <div className='flex flex-center gap-2'>
                <Loader /> Loading
              </div>
            ) : (
              'Sign-In'
            )}
          </Button>
          <p className='text-small-regular text-light-2 text-center mt-2'>
            {' '}
            You don't have account?{' '}
            <Link
              className='text-primary-500 text-small-semibold ml-1'
              to={'/sign-up'}>
              Sign Up
            </Link>{' '}
          </p>
        </form>
      </Form>
    </div>
  );
};

export default SignIn;
