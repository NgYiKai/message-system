"use client";

import { useEffect, ReactNode, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface AuthProps {
    children: ReactNode;
    publicRoutes?: string[];
}

const Auth: React.FC<AuthProps> = ({ children, publicRoutes = ['/login', '/register'] }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('user_token');
            const storedData = localStorage.getItem('user_data');
            const userData = storedData ? JSON.parse(storedData) : null;

            if (!token && !publicRoutes.includes(pathname)) {
                router.replace('/login');
            } else if (userData) {
                if (userData.role === "admin" && pathname !== '/admin') {
                    router.replace('/admin');
                } else if (userData.role !== "admin" && pathname !== '/message') {
                    router.replace('/message');
                } else {
                    setAuthChecked(true);
                }
            } else {
                setAuthChecked(true);
            }
        };

        checkAuth();
    }, [router, pathname, publicRoutes]);

    if (!authChecked) {
        return null; 
    }

    return <>{children}</>;
};

export default Auth;