import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

import { login } from '@/redux/reducers/auth/loginReducer';
import { register } from '@/redux/reducers/auth/registerReducer';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';

import { Button } from '@/components/ui/button';
import Spinner from '@/components/spinner';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

import {
	LoginFormShape,
	RegisterFormShape,
	LoginSchema,
	RegisterSchema,
} from '@/utils/types';
import { workflowStarted } from '@/utils/auth/workflow';

const AuthLayout = () => {
	const navigate = useNavigate();

	const { loading: loginLoading, error: loginError } = useAppSelector(
		(state) => state.auth.login
	);

	const {
		loading: registerLoading,
		error: registerError,
		isRegistered,
	} = useAppSelector((state) => state.auth.register);

	const dispatch = useAppDispatch();

	useEffect(() => {
		workflowStarted(dispatch);
	}, [dispatch]);

	useEffect(() => {
		if (registerError) {
			toast.error('An error occurred while registering', {
				description: registerError,
				action: {
					label: 'Ok',
					onClick: () => null,
				},
			});
		}

		if (loginError) {
			toast.error('An error occurred while logging in', {
				description: loginError,
				action: {
					label: 'Ok',
					onClick: () => null,
				},
			});
		}
	}, [registerError, loginError]);

	const [tab, setTab] = useState('login');

	useEffect(() => {
		if (isRegistered) {
			setTab('login');
			toast.success('User created. Please login', {
				action: {
					label: 'Ok',
					onClick: () => null,
				},
			});
		}
	}, [isRegistered]);

	const {
		register: loginRegister,
		handleSubmit: handleLoginSubmit,
		formState: { errors: loginErrors },
		reset: loginReset,
	} = useForm<LoginFormShape>({ resolver: zodResolver(LoginSchema) });

	const {
		register: registerRegister,
		handleSubmit: handleRegisterSubmit,
		formState: { errors: registerErrors },
		reset: registerReset,
	} = useForm<RegisterFormShape>({ resolver: zodResolver(RegisterSchema) });

	const onSubmitLogin: SubmitHandler<LoginFormShape> = async (data) => {
		await dispatch(login({ credentials: data, navigate }));
		loginReset();
	};

	const onSubmitRegister: SubmitHandler<RegisterFormShape> = async (data) => {
		await dispatch(register({ credentials: data }));
		registerReset();
	};

	return (
		<div className="h-screen flex flex-col items-center justify-center gap-5">
			<img className="h-44 w-44" src="/Logo-short.gif" alt="logo" />
			<Tabs defaultValue="login" className="w-[350px] md:w-[400px]" value={tab}>
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger
						value="login"
						onClick={() => setTab('login')}
						disabled={registerLoading}
					>
						Login
					</TabsTrigger>
					<TabsTrigger
						value="register"
						onClick={() => setTab('register')}
						disabled={loginLoading}
					>
						Register
					</TabsTrigger>
				</TabsList>

				<TabsContent value="login">
					<Card>
						<CardHeader>
							<CardDescription>
								Login to your existing PetPal account.
							</CardDescription>
						</CardHeader>
						<form onSubmit={handleLoginSubmit(onSubmitLogin)}>
							<CardContent className="space-y-2">
								<div className="space-y-1">
									<Label htmlFor="email">email</Label>
									<Input
										id="email"
										type="text"
										placeholder="john@doe.com"
										disabled={loginLoading}
										{...loginRegister('email')}
									/>
									<span className="text-red-500 text-[10px]">
										{loginErrors.email?.message}
									</span>
								</div>
								<div className="space-y-1">
									<Label htmlFor="password">Password</Label>
									<Input
										id="password"
										type="password"
										placeholder="password"
										disabled={loginLoading}
										{...loginRegister('password')}
									/>
									<span className="text-red-500 text-[10px]">
										{loginErrors.password?.message}
									</span>
								</div>
							</CardContent>
							<CardFooter>
								<Button type="submit" disabled={loginLoading}>
									{loginLoading ? <Spinner /> : 'Login'}
								</Button>
							</CardFooter>
						</form>
					</Card>
				</TabsContent>

				<TabsContent value="register">
					<Card>
						<CardHeader>
							<CardDescription>Register a new PetPal account.</CardDescription>
						</CardHeader>
						<form onSubmit={handleRegisterSubmit(onSubmitRegister)}>
							<CardContent className="space-y-2">
								<div className="space-y-1">
									<Label htmlFor="username">Username</Label>
									<Input
										id="username"
										type="text"
										placeholder="john Doe"
										disabled={registerLoading}
										{...registerRegister('username')}
									/>
									<span className="text-red-500 text-[10px]">
										{registerErrors.username?.message}
									</span>
								</div>
								<div className="space-y-1">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										placeholder="john@doe.com"
										disabled={registerLoading}
										{...registerRegister('email')}
									/>
									<span className="text-red-500 text-[10px]">
										{registerErrors.email?.message}
									</span>
								</div>
								<div className="space-y-1">
									<Label htmlFor="password">Password</Label>
									<Input
										id="password"
										type="password"
										placeholder="@johndoe"
										disabled={registerLoading}
										{...registerRegister('password')}
									/>
									<span className="text-red-500 text-[10px]">
										{registerErrors.password?.message}
									</span>
								</div>
							</CardContent>
							<CardFooter>
								<Button type="submit" disabled={registerLoading}>
									{registerLoading ? <Spinner /> : 'Register'}
								</Button>
							</CardFooter>
						</form>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default AuthLayout;
