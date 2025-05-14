import AnimatedTitle from '@/components/AnimatedTitle';
import LessonPlanForm from '@/components/LessonPlanForm';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';

const Page = async () => {
  const { isAuthenticated } = await getKindeServerSession();

  if (!isAuthenticated) {
    redirect('/');
  }
  return (
    <div className="min-h-screen px-4 py-12 sm:px-4 lg:px-8 bg-gradient-to-br from-purple-50 to-blue-50 ">
      <div className="max-w-3xl mx-auto">
        <AnimatedTitle title="Create Your" subtitle="Lesson Plan" />
        <LessonPlanForm isSubscribed={true} />
      </div>
    </div>
  );
};

export default Page;
