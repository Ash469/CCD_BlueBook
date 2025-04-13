export default function TeamMember ({ name, image }) {
    return (
        <div className="flex flex-col items-center space-y-2">
        <img
          src={image}
          alt={name}
          className="w-32 h-32 rounded-full shadow-lg object-cover border-2 border-white dark:border-gray-800"
        />
        <span className="text-sm font-medium text-gray-800 dark:text-white">{name}</span>
      </div>
    )
  };
  