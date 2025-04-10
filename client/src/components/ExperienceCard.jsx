import React from 'react';
import { Link } from 'react-router-dom';
import { Building, Briefcase, BookOpen, MessageSquare } from 'lucide-react';

const Card = ({ className, children }) => (
  <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ className = "", children }) => (
  <div className={`p-4 pb-2 ${className}`}>{children}</div>
);

const CardTitle = ({ className = "", children }) => (
  <h3 className={`text-lg font-medium text-gray-900 dark:text-gray-100 ${className}`}>{children}</h3>
);

const CardDescription = ({ className = "", children }) => (
  <div className={`text-gray-600 dark:text-gray-300 ${className}`}>{children}</div>
);

const CardContent = ({ className = "", children }) => (
  <div className={`px-4 pb-2 ${className}`}>{children}</div>
);

const CardFooter = ({ className = "", children }) => (
  <div className={`p-4 pt-2 border-t border-gray-200 dark:border-gray-700 ${className}`}>{children}</div>
);

const Badge = ({ variant = "outline", children }) => {
  const variants = {
    outline: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200",
    secondary: "bg-blue-100 dark:bg-blue-800/30 text-blue-800 dark:text-blue-200",
    default: "bg-purple-100 dark:bg-purple-800/30 text-purple-800 dark:text-purple-200",
    destructive: "bg-red-100 dark:bg-red-800/30 text-red-800 dark:text-red-200"
  };
  
  return (
    <span className={`px-2 py-1 text-xs rounded-full ${variants[variant]}`}>
      {children}
    </span>
  );
};

const Button = ({ variant = "default", size = "md", className = "", children, ...props }) => {
  const variants = {
    default: "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white",
    outline: "border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-4 py-3"
  };
  
  return (
    <button 
      className={`rounded-md transition-colors ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

/**
 * ExperienceCard component displays interview experience details
 * @param {Object} experience - The experience data
 * @param {boolean} isCompact - Whether to show compact version of the card
 */
const ExperienceCard = ({ experience, isCompact = false }) => {
  if (isCompact) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>{experience.name}</CardTitle>
          <CardDescription className="flex items-center gap-1">
            <Building className="h-4 w-4" />
            {experience.company}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300 mb-1">
            <Briefcase className="h-4 w-4" />
            {experience.role}
          </div>
          
          {/* Added Experience Preview */}
          <div className="mt-3">
            <h4 className="text-sm font-semibold mb-1 flex items-center gap-1 text-gray-800 dark:text-gray-200">
              <MessageSquare className="h-4 w-4" /> Experience Preview
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {experience.experience.substring(0, 80)}
              {experience.experience.length > 80 ? '...' : ''}
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Link to={`/experience/${experience.id}`} className="w-full">
            <Button variant="default" size="sm" className="w-full">
              View Details
            </Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{experience.name}</CardTitle>
        <CardDescription className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <Building className="h-4 w-4" />
            {experience.company}
          </div>
          <div className="flex items-center gap-1">
            <Briefcase className="h-4 w-4" />
            {experience.role}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline">{experience.company}</Badge>
          <Badge variant="secondary">{experience.role}</Badge>
        </div>
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-1 flex items-center gap-1 text-gray-800 dark:text-gray-200">
            <MessageSquare className="h-4 w-4" /> Experience Preview
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {experience.experience.substring(0, 150)}
            {experience.experience.length > 150 ? '...' : ''}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Link to={`/experience/${experience.id}`} className="w-full">
          <Button variant="default" size="sm" className="w-full">
            Read Full Experience
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ExperienceCard;