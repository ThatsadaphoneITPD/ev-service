'use client';
import AnalyticsDashboard from '@/app/shared/analytics-dashboard';
import { metaObject } from '@/config/site.config';
import handleUsers from '@/plugins/testUser';
import useStore from '@/store/testStore';
import axios from 'axios';
import { User } from 'next-auth';
import { any } from 'prop-types';
import { useState, useEffect } from 'react';


export default function TestPage() {
	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
		getAllUsers();
		console.log(process.env.NEXT_PUBLIC_URL);

	}, []);

	const getAllUsers = async () => {
		const api = `/users`;
		try {
			const res: any = await handleUsers.getUsers(api);
			console.log("re-->", res);
			if (res) {
				setUsers(res);
			} else {
				console.log('user not found');
			}
		} catch (error) {
			console.log(error);
		}
	};
	const { count, inc } = useStore()
	return (
		<div>
			<span className='text-4xl'>{count}</span> <br />
			<button onClick={inc}>Count</button>
		</div>
	)
}