import axios from "axios";
import Input from '@/components/Input';
import { useCallback, useState } from 'react';
import {signIn} from 'next-auth/react';
import {FcGoogle} from 'react-icons/fc';
import {FaGithub} from 'react-icons/fa';

const Auth = () => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    
    const [variant, setVariant] = useState('login');
    
    const toggleVariant = useCallback(() => {
        setVariant(currentVariant => currentVariant === 'login' ? 'register' : 'login');
    },[])


    const login = useCallback(async () => {
        try {
            await signIn('credentials', {
                email,
                password,
                callbackUrl:'/profiles'
            });

        } catch (error) {
            console.log(error);
        }
        
    },[email,password])

    const register = useCallback(async () => {
        try {
            await axios.post('/api/register', {
                email,
                name,
                password
            })

            login();
        } catch (error) {
            console.log(error);
        }
    },[email, name, password,login])



    
    return(
       <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
        <div className="bg-black w-full h-full lg:bg-opacity-50">
            <nav className="px-12 py-5">
                <img src='/images/logo.png' alt="logo" className="h-8"/>
            </nav>
            <div className="flex justify-center">
                <div className="bg-black bg-opacity-70 px-12 py-8 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                    <h2 className="text-3xl text-white mb-8 font-semibold">
                        {variant === 'login' ? 'Login' : 'Register'}
                    </h2>
                    <div className="flex flex-col gap-4">
                        {variant === 'register' && (
                           <Input
                            label='Username'
                            onChange={(e:any) => setName(e.target.value)}
                            id='name'
                            type='name'
                            value={name}
                            /> 
                        )}
                        
                        <Input
                            label='Email'
                            onChange={(e:any) => setEmail(e.target.value)}
                            id='email'
                            type='email'
                            value={email}
                        />
                        <Input
                            label='Password'
                            onChange={(e:any) => setPassword(e.target.value)}
                            id='password'
                            type='password'
                            value={password}
                        />
                    </div>
                    <button onClick={variant === 'register' ? register : login} className="bg-red-600 py-3 text-white w-full mt-8 rounded-md hover:bg-red-700 transition">
                        {variant === 'login' ? 'Login' : 'Sign up'}
                    </button>
                    <div className="flex justify-center flex-row gap-4 mt-8 items-center">
                        <div 
                            onClick={() => signIn('google', {callbackUrl:'/profiles'})}
                            className="
                                w-10 
                                h-10 
                                bg-white 
                                rounded-full 
                                flex 
                                items-center 
                                justify-center 
                                cursor-pointer 
                                hover:opacity-80 
                                transition
                                "
                        >
                            <FcGoogle size={30} />
                        </div>
                        <div 
                            onClick={() => signIn('github', {callbackUrl:'/profiles'})}
                            className="
                                w-10 
                                h-10 
                                bg-white 
                                rounded-full 
                                flex 
                                items-center 
                                justify-center 
                                cursor-pointer 
                                hover:opacity-80 
                                transition
                                "
                        >
                            <FaGithub size={30} />
                        </div>
                    </div>
                    <p className='text-neutral-500 mt-6'>
                        {variant === 'login' ? 'First time using Netflix?': 'Already have an account?'}
                        <span onClick={toggleVariant} className='text-white ml-1 hover:underline cursor-pointer text-sm'>
                            {variant === 'login' ? 'Create an account' : 'Login'}
                        </span>
                    </p>

                </div>

            </div>

        </div>
            
       </div> 
    )
}

export default Auth;