'use client';

import { LessonPlan } from '@prisma/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useState } from 'react';

const Dashboard = ({ lessonPlans }: { lessonPlans: LessonPlan[] }) => {
  const [subjectFilter, setSubjectFilter] = useState<string | null>(null);
  const [durationFilter, setDurationFilter] = useState<number | null>(null);

  const subjects = Array.from(new Set(lessonPlans.map((plan) => plan.subject)));
  const durations = Array.from(
    new Set(lessonPlans.map((plan) => plan.duration))
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Lesson Plan</h1>
      <div className="flex space-x-4 mb-6">
        <Select
          onValueChange={(value) =>
            setSubjectFilter(value === 'all' ? null : value)
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            {subjects.map((subject) => (
              <SelectItem key={subject} value={subject}>
                {subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) =>
            setDurationFilter(value === 'all' ? null : parseInt(value))
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Durations</SelectItem>
            {durations.map((duration) => (
              <SelectItem key={duration} value={duration.toString()}>
                {duration}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Dashboard;
