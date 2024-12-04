import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { z, ZodType } from 'zod';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';
import { checkCredentials } from '@/redux/reducers/auth/checkCredentialsReducer.ts';
import Spinner from '@/components/spinner.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { activateUser } from '@/redux/reducers/auth/activateUserReducer.ts';
import { ROUTES } from '@/constants/routes.ts';

const Schema: ZodType<{ password: string; confirmPassword: string }> = z
	.object({
		password: z
			.string()
			.min(4, { message: 'Password must be at least 4 characters long' })
			.max(12, { message: 'Password must not exceed 12 characters' }),
		confirmPassword: z
			.string()
			.min(4, { message: 'Password must be at least 4 characters long' })
			.max(12, { message: 'Password must not exceed 12 characters' }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Password dont match',
		path: ['confirmPassword'],
	});

type formShape = z.infer<typeof Schema>;

const Workflow = () => {
	const location = useLocation();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<formShape>({ resolver: zodResolver(Schema) });

	const { key, user } = queryString.parse(location.search) as {
		key: string;
		user: string;
	};
	const { isValid, loading, error } = useAppSelector(
		(state) => state.auth.check
	);

	const onSubmit = (values: formShape) => {
		dispatch(
			activateUser({
				credentials: {
					key,
					id: user,
					password: values.password,
				},
				navigate,
			})
		);
	};

	useEffect(() => {
		if (key && user)
			dispatch(checkCredentials({ credentials: { key, id: user } }));
	}, [dispatch, key, user]);

	useEffect(() => {
		if (!key || !user) navigate(ROUTES.AUTH, { replace: true });
	}, [key, navigate, user]);

	return (
		<div className="h-screen flex items-center justify-center w-full">
			{loading && <Spinner />}
			{!loading && !isValid && error && (
				<span className="text-red-600">{error}</span>
			)}
			{!loading && !error && isValid && (
				<div className="flex flex-col gap-5 items-center justify-center md:w-[500px] p-6 border-2 rounded-2xl">
					Activate your account
					<div className="w-full">
						<Label>Setup your password</Label>
						<Input
							id="password"
							type="password"
							disabled={loading}
							{...register('password')}
						/>
						<span className="text-red-500 text-[10px]">
							{errors.password?.message as string}
						</span>
					</div>
					<div className="w-full">
						<Label>Confirm password</Label>
						<Input
							id="confirmPassword"
							type="password"
							disabled={loading}
							{...register('confirmPassword')}
						/>
						<span className="text-red-500 text-[10px]">
							{errors.confirmPassword?.message as string}
						</span>
					</div>
					<Button disabled={loading} onClick={handleSubmit(onSubmit)}>
						{loading ? <Spinner /> : 'Submit'}
					</Button>
				</div>
			)}
		</div>
	);
};

export default Workflow;
