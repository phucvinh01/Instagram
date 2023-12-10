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
import { SignUpValidation } from '@/lib/validation';
import { z } from 'zod';
import logo from '/assets/images/logo.svg';
import Loader from '@/components/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast"
import { useCreateUserAccountMutation, useSignInAccount } from '@/lib/react-query/queryAndMutation';
import { useUserContext } from '@/context/AuthContext';

const SignUp = () => {
   const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // Queries
  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccountMutation();
  const { mutateAsync: signInAccount, isPending: isSigningInUser } = useSignInAccount();

  // Handler
  const handleSignup = async (user: z.infer<typeof SignUpValidation>) => {
    try {
      const newUser = await createUserAccount(user);

      if (!newUser) {
        toast({ title: "Sign up failed. Please try again.", });
        
        return;
      }

      const session = await signInAccount({
        email: user.email,
        password: user.password,
      });

      if (!session) {
        toast({ title: "Something went wrong. Please login your new account", });
        
        navigate("/sign-in");
        
        return;
      }

      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        form.reset();

        navigate("/");
      } else {
        toast({ title: "Login failed. Please try again.", });
        
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
        <h2 className='h3-bold md:h2-blod pt-5 sm:pt-12'>Create new account</h2>
        <p className='text-light-3 small-medium md:base-regular mt-2'>
          bla bla
        </p>
        <form
          onSubmit={form.handleSubmit(handleSignup)}
          className='flex flex-col gap-5 w-full mt-3'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
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
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
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
                   
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='shad-button_primary'>
            {isCreatingAccount ? (
              <div className='flex flex-center gap-2'>
                <Loader /> Loading
              </div>
            ) : (
              'Sign-up'
            )}
          </Button>
           <p className='text-small-regular text-light-2 text-center mt-2'> Already have an account?  <Link className='text-primary-500 text-small-semibold ml-1' to={'/sign-in'}>Sign In</Link> </p>
          
        </form>
      </Form>
    </div>
  );
};

export default SignUp;
