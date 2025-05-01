import Link from 'next/link';
import MaxWidthWrapper from './MaxWidthWrapper';
import { Sparkles } from 'lucide-react';
import { buttonVariants } from '../button';
import MobileMenu from './MobileMenu';

const Navbar = () => {
  const user = false;

  return (
    <header>
      <MaxWidthWrapper>
        <div className="h-16 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Sparkles className="w-8 h-8 text-primary" />
            <span className="text-xl text-primary font-bold">
              Generate Lesson Plans
            </span>
          </Link>

          <MobileMenu user={user} />
          <nav className="hidden md:flex items-center space-x-4">
            <Link
              href="/pricing"
              className={buttonVariants({ variant: 'ghost' })}
            >
              Pricing
            </Link>
            {!user ? (
              <>
                <Link
                  href="/login"
                  className={buttonVariants({ variant: 'secondary' })}
                >
                  Login
                </Link>
                <Link href="/register" className={buttonVariants()}>
                  Sign Up
                </Link>
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
                <Link
                  href="/signout"
                  className={buttonVariants({ variant: 'destructive' })}
                >
                  Signout
                </Link>
              </div>
            )}
          </nav>
        </div>
      </MaxWidthWrapper>
    </header>
  );
};

export default Navbar;
