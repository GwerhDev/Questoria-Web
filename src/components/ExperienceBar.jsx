import { useSelector } from 'react-redux';

export const ExperienceBar = () => {
  const accountData = useSelector(state => state.account.data);
  const experience = accountData?.userData.experience || 0;
  const level = accountData?.userData.level || 1;
  const isAdmin = accountData?.userData.role === "admin";
  const isTeacher = accountData?.userData.role === "teacher";
  const isStudent = accountData?.userData.role === "student";
  const maxExperienceForLevel = 100;

  const progress = (experience / maxExperienceForLevel) * 100;

  const barFillClasses = {
    teacher: 'bg-gradient-to-r from-yellow-500 to-orange-500 shadow-[0_0_4px_1px_rgba(255,215,0,0.5)]',
    admin: 'bg-gradient-to-r from-yellow-500 to-orange-500 shadow-[0_0_4px_1px_rgba(255,215,0,0.5)]',
    student: 'bg-gradient-to-r from-green-500 to-green-700 animate-radioactiveGlow',
  };

  const role = isAdmin ? 'admin' : isTeacher ? 'teacher' : 'student';

  return (
    <div className="w-full bg-gray-800 shadow-[0_-2px_5px_rgba(0,0,0,0.2)] flex flex-col items-center z-10">
      <div className="w-full h-3 overflow-hidden relative">
        <div 
          className={`h-full transition-width duration-500 ease-in-out ${barFillClasses[role]}`}
          style={{ width: `${(isTeacher || isAdmin) ? 100 : progress}%` }}
        ></div>
        {isAdmin && <span className="absolute w-full h-full top-0 left-0 flex justify-center items-center text-xs text-white text-shadow-[0_0_2px_#000]">Admin</span>}
        {isTeacher && <span className="absolute w-full h-full top-0 left-0 flex justify-center items-center text-xs text-white text-shadow-[0_0_2px_#000]">Master</span>}
        {isStudent && <span className="absolute w-full h-full top-0 left-0 flex justify-center items-center text-xs text-white text-shadow-[0_0_2px_#000]">Level {level} - Exp: {experience}/{maxExperienceForLevel}</span>}
      </div>
    </div>
  );
};