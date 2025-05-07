import MaxWidthWrapper from '@/components/common/MaxWidthWrapper';
import Dashboard from '@/components/Dashboard';
import prisma from '@/lib/prisma';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';

const Page = async () => {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect('/');
  }

  const userData = await prisma.user.findFirst({
    where: {
      id: user?.id,
    },
    select: {
      lessonPlans: true,
    },
  });

  if (!userData) {
    redirect('/');
  }

  return (
    <MaxWidthWrapper className="py-8 md:py-20">
      <Dashboard lessonPlans={userData.lessonPlans} />
    </MaxWidthWrapper>
  );
};

export default Page;
