import { CheckIcon } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';

const PricingCard = ({
  tier,
  index,
}: {
  tier: {
    name: string;
    price: string;
    features: string[];
  };
  index: number;
}) => {
  return (
    <Card className={index === 1 ? 'border-primary' : ''}>
      <CardHeader>
        <CardTitle className="text-2xl">{tier.name}</CardTitle>
        <CardDescription className="text-3xl font-bold">
          {tier.price}
          <span className="text-base font-normal">/month</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {tier.features.map((feature, fIndex) => (
            <li key={fIndex} className="flex items-center">
              <CheckIcon className="size-5 text-primary mr-2" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          variant={index === 1 ? 'default' : 'outline'}
        >
          {index === 1 ? 'Upgrade  To Pro' : 'Get Started'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;
