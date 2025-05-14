'use client';

import { durations, studentLevels, subtopics, topics } from '@/constants';
import { useToast } from '@/hooks/use-toast';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BookmarkIcon,
  BookOpen,
  Clock,
  GraduationCap,
  Sparkles,
  Target,
  X,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Button, buttonVariants } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

type FormData = {
  topic: string;
  subtopic: string;
  duration: string;
  studentLevels: string;
  objective: string;
};

const LessonPlanForm = ({ isSubscribed }: { isSubscribed: boolean }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    topic: '',
    subtopic: '',
    duration: '',
    studentLevels: '',
    objective: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [customTopic, setCustomTopic] = useState<string>('');
  const [customSubtopic, setCustomSubtopic] = useState<string>('');

  const handleNext = () => {
    if (isStepValid(step)) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'topic') {
      setCustomTopic('');
      setFormData({
        ...formData,
        topic: value,
        subtopic: '',
      });
    } else if (field === 'subtopic') {
      setCustomSubtopic('');
      setFormData({ ...formData, subtopic: value });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleCustomTopicChange = (value: string) => {
    setCustomTopic(value);
    setFormData({ ...formData, topic: '', subtopic: '' });
    setCustomSubtopic('');
  };

  const handleCustomSubtopicChange = (value: string) => {
    setCustomSubtopic(value);
    setFormData({ ...formData, subtopic: '' });
  };

  const clearTopic = () => {
    setFormData({ ...formData, topic: '', subtopic: '' });
    setCustomTopic('');
    setCustomSubtopic('');
  };

  const clearSubtopic = () => {
    setFormData({ ...formData, subtopic: '' });
    setCustomSubtopic('');
  };

  const isStepValid = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return isSubscribed
          ? customTopic !== '' || formData.topic !== ''
          : formData.topic !== '';
      case 2:
        return isSubscribed
          ? (customTopic !== '' && customSubtopic !== '') ||
              (formData.topic !== '' && formData.subtopic !== '')
          : formData.subtopic !== '';
      case 3:
        return formData.duration !== '';
      case 4:
        return formData.studentLevels !== '';
      case 5:
        return formData.objective !== '';
      default:
        return false;
    }
  };

  const isFormComplete = () => {
    const { topic, subtopic, duration, studentLevels, objective } = formData;
    if (isSubscribed) {
      return (
        ((customTopic !== '' && customSubtopic !== '') ||
          (topic !== '' && subtopic !== '')) &&
        duration !== '' &&
        studentLevels !== '' &&
        objective !== ''
      );
    } else {
      return (
        topic !== '' &&
        subtopic !== '' &&
        duration !== '' &&
        studentLevels !== '' &&
        objective !== ''
      );
    }
  };

  useEffect(() => {
    if (formData.topic && subtopics[formData.topic as keyof typeof subtopics]) {
      setFormData((prev) => ({
        ...prev,
        subtopic: '',
      }));
    }
  }, [formData.topic]);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div className="flex items-center mb-4">
              <BookOpen className="w-6 h-6 mr-2 text-blue-500" />
              <h2 className="text-2xl font-bold">Select Topic</h2>
            </motion.div>

            <motion.div>
              {isSubscribed && (
                <div className="space-y-4 mb-4">
                  <Input
                    placeholder="Enter custom topic"
                    value={customTopic}
                    onChange={(e) => handleCustomTopicChange(e.target.value)}
                    className="w-full"
                    disabled={formData.topic !== ''}
                  />
                  <p className="text-sm text-gray-500">
                    Or choose from predefined topic
                  </p>
                </div>
              )}

              {
                <div className="flex items-center space-x-2">
                  <Select
                    onValueChange={(value) => handleInputChange('topic', value)}
                    name="topic"
                    value={formData.topic}
                  >
                    <SelectTrigger
                      className="w-full"
                      disabled={customTopic !== ''}
                    >
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent>
                      {topics.map((topic) => (
                        <SelectItem key={topic} value={topic}>
                          {topic}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {isSubscribed && formData.topic && (
                    <Button onClick={clearTopic} variant="outline" size="icon">
                      {' '}
                      <X className="w-4 h-4" />{' '}
                    </Button>
                  )}
                </div>
              }
            </motion.div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key="step2"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div className="flex items-center mb-4">
              <BookmarkIcon className="w-6 h-6 mr-2 text-indigo-500" />
              <h2 className="text-2xl font-bold">Select Subtopic</h2>
            </motion.div>

            <motion.div>
              {isSubscribed && customTopic !== '' && (
                <div className="space-y-4 mb-4">
                  <Input
                    placeholder="Enter custom subtopic"
                    value={customSubtopic}
                    onChange={(e) => handleCustomSubtopicChange(e.target.value)}
                    className="w-full"
                  />
                </div>
              )}

              {(isSubscribed && customTopic === '') || !isSubscribed ? (
                <div className="flex items-center space-x-2">
                  <Select
                    onValueChange={(value) =>
                      handleInputChange('subtopic', value)
                    }
                    value={formData.subtopic}
                    name="subtopic"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subtopic" />
                    </SelectTrigger>
                    <SelectContent>
                      {subtopics[formData.topic as keyof typeof subtopics]?.map(
                        (subtopic) => (
                          <SelectItem key={subtopic} value={subtopic}>
                            {subtopic}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>

                  {isSubscribed && formData.subtopic && (
                    <Button
                      onClick={clearSubtopic}
                      variant="outline"
                      size="icon"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ) : null}
            </motion.div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            key="step3"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div className="flex items-center mb-4">
              <Clock className="w-4 h-4 mr-2 text-green-500" />
              <h2 className="text-2xl font-bold">Select Duration</h2>
            </motion.div>

            <motion.div>
              <Select
                onValueChange={(value) => handleInputChange('duration', value)}
                value={formData.duration}
                name="duration"
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a duration" />
                </SelectTrigger>
                <SelectContent>
                  {durations.map((duration) => (
                    <SelectItem key={duration} value={duration}>
                      {duration}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            key="step4"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div className="flex items-center mb-4">
              <GraduationCap className="w-6 h-6 mr-2 text-blue-500" />
              <h2 className="text-2xl font-bold">Select student level</h2>
            </motion.div>

            <motion.div>
              <Select
                onValueChange={(value) =>
                  handleInputChange('studentLevels', value)
                }
                value={formData.studentLevels}
                name="studentLevels"
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a student level" />
                </SelectTrigger>
                <SelectContent>
                  {studentLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>
          </motion.div>
        );
      case 5:
        return (
          <motion.div
            key="step5"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div className="flex items-center mb-4">
              <Target className="w-6 h-6 mr-2 text-blue-500" />
              <h2 className="text-2xl font-bold">Enter lesson objective</h2>
            </motion.div>

            <motion.div>
              <Input
                placeholder="Enter the lesson objective. (Max 100 characters)"
                max={100}
                value={formData.objective}
                onChange={(e) => handleInputChange('objective', e.target.value)}
                className="w-full"
                name="objective"
              />
            </motion.div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formDataToSubmit = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      formDataToSubmit.append(key, value);
    });

    if (isSubscribed) {
      if (customTopic) formDataToSubmit.set('topic', customTopic);
      if (customSubtopic) formDataToSubmit.set('subtopic', customSubtopic);
    }

    console.log('Form Data: ', Object.fromEntries(formDataToSubmit));

    setIsLoading(false);
  };

  return (
    <Card className="relative overflow-hidden">
      <form onSubmit={handleSubmit}>
        <div className="w-full h-2 absolute top-0 left-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
        <CardHeader>
          <CardTitle className="text-3xl text-center font-bold text-gray-900">
            Lesson Planner
          </CardTitle>

          <CardContent>
            <div className="flex justify-center mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`w-3 h-3 mx-1 rounded-full ${
                    i <= step ? 'bg-indigo-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>

            <motion.div
              className="mt-6 justify-between"
              initial="hidden"
              animate="visible"
            >
              {step > 1 && (
                <motion.div>
                  <Button onClick={handlePrev} variant="outline">
                    Previous
                  </Button>
                </motion.div>
              )}
              {step < 5 ? (
                <Button
                  onClick={handleNext}
                  disabled={!isStepValid(step)}
                  className={buttonVariants({
                    variant: 'default',
                    className: 'ml-auto',
                  })}
                  type="button"
                >
                  Next
                </Button>
              ) : (
                <motion.div className="ml-auto">
                  <Button
                    className="text-white bg-green-500 hover:bg-green-600"
                    disabled={!isFormComplete() || isLoading}
                    type="submit"
                  >
                    <Sparkles className="w-4 h-4 mr-2" /> Generate Lesson Plan
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </CardContent>
        </CardHeader>
      </form>
    </Card>
  );
};

export default LessonPlanForm;
