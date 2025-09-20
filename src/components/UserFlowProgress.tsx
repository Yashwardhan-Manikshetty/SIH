import { useLocation } from 'react-router-dom';
import { CheckCircle, Circle } from 'lucide-react';

const UserFlowProgress = () => {
  const location = useLocation();
  
  const steps = [
    { path: '/auth', label: 'Register', completed: false },
    { path: '/region-selection', label: 'Select Region', completed: false },
    { path: '/crop-selection', label: 'Select Crops', completed: false },
    { path: '/dashboard', label: 'Dashboard', completed: false },
  ];

  const currentStepIndex = steps.findIndex(step => step.path === location.pathname);
  
  // Mark previous steps as completed
  const updatedSteps = steps.map((step, index) => ({
    ...step,
    completed: index < currentStepIndex
  }));

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {updatedSteps.map((step, index) => (
            <div key={step.path} className="flex items-center">
              <div className="flex items-center">
                {step.completed ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <Circle className={`h-5 w-5 ${
                    index === currentStepIndex ? 'text-green-600' : 'text-gray-400'
                  }`} />
                )}
                <span className={`ml-2 text-sm font-medium ${
                  index === currentStepIndex 
                    ? 'text-green-600' 
                    : step.completed 
                      ? 'text-green-600' 
                      : 'text-gray-500'
                }`}>
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4 h-px bg-gray-300"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserFlowProgress;
