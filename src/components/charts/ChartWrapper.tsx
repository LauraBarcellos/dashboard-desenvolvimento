import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ChartWrapperProps {
  title: string;
  children: ReactNode;
  legend?: ReactNode;
}

export const ChartWrapper = ({ title, children, legend }: ChartWrapperProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="section-title">{title}</CardTitle>
          {legend}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {children}
      </CardContent>
    </Card>
  );
};
