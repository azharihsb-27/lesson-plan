'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { buttonVariants } from '../ui/button';
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/components';
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types';

const MobileMenu = ({ user }: { user: KindeUser<object> | null }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Menu
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="hover:cursor-pointer"
      />

      {isMenuOpen && (
        <nav className="absolute left-0 right-0 top-16 border-b border-gray-200 shadow-lg bg-white">
          <div className="flex flex-col p-4 space-y-2">
            <Link
              href="/pricing"
              className={buttonVariants({ variant: 'ghost' })}
            >
              Pricing
            </Link>
            {!user ? (
              <>
                <LoginLink className={buttonVariants({ variant: 'secondary' })}>
                  Login
                </LoginLink>
                <RegisterLink className={buttonVariants()}>
                  Sign Up
                </RegisterLink>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    variant: 'secondary',
                  })}
                >
                  Dashboard
                </Link>
                <Link href="/create" className={buttonVariants()}>
                  Create
                </Link>
                <LogoutLink
                  className={buttonVariants({ variant: 'destructive' })}
                >
                  Signout
                </LogoutLink>
              </div>
            )}
          </div>
        </nav>
      )}
    </div>
  );
};

export default MobileMenu;
