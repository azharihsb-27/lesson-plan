import { buttonVariants } from '@/components/ui/button';
import MaxWidthWrapper from '@/components/ui/common/MaxWidthWrapper';
import Link from 'next/link';

export default function Home() {
  return (
    <MaxWidthWrapper>
      <HeroSection />
    </MaxWidthWrapper>
  );
}

function HeroSection() {
  return (
    <div className="pt-20 md:py-28 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
        Create Engagin Lesson Plan In Seconds
      </h1>
      <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
        Empower your teaching with AI-generated lesson plans tailored to your
        needs. Save time and inspire your students with creative, engagin
        content.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/" className={buttonVariants()}>
          Get Started For Free
        </Link>
        <Link
          href="/pricing"
          className={buttonVariants({
            variant: 'secondary',
          })}
        >
          Pricing
        </Link>
      </div>
    </div>
  );
}
