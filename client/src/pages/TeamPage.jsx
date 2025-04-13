import TeamMember from "../components/TeamMember";
import Srayash from "../assets/Srayash.jpeg";
import Ayush from "../assets/ayush.jpg";
import Aryashi from "../assets/Aryashi.jpg";
import Ramdhan from "../assets/Ramdhan.jpg";
import Priyanshu from "../assets/Priyanshu.jpg";
import Dhruv from "../assets/Dhruv.jpg";
import Utkarsh from "../assets/Utkarsh.jpg";
import Aagam from "../assets/Aagam.jpg";
import Himank from "../assets/Himank.jpg";
import { motion } from "framer-motion";

const leads = [
  { name: "Aagam Mehta", image: Aagam },
  { name: "Himank Bohara", image: Himank },
];

const members = [
  { name: "Ayush Ranjan", image: Ayush },
  { name: "Srayash Singh", image: Srayash },
  { name: "Priyanshu Naik", image: Priyanshu },
  { name: "Dhruv Pansuriya", image: Dhruv },
  { name: "Aryashi Tripathi", image: Aryashi },
  { name: "Utkarsh Narayan Pandey", image: Utkarsh },
  { name: "Ramdhan Kumar", image: Ramdhan },
];

const topRow = members.slice(0, 4);
const bottomRow = members.slice(4);

const Section = ({ title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="w-full max-w-6xl px-4 text-center"
  >
    <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 bg-clip-text mb-6">
      {title}
    </h2>
    {children}
  </motion.div>
);

const TeamPage = () => {
  return (
    <div className="flex flex-col items-center space-y-16 py-16 bg-white dark:bg-[#1D1E20] text-gray-700 dark:text-gray-300 min-h-screen">
      <Section title="Lead Student Coordinators">
        <div className="grid grid-cols-2 sm:flex flex-wrap justify-center gap-x-10 gap-y-6">
          {leads.map((member, idx) => (
            <TeamMember key={idx} name={member.name} image={member.image} />
          ))}
        </div>
      </Section>

      <Section title="Student Coordinators">
        <div className="space-y-10">
          <div className="grid grid-cols-2 sm:flex flex-wrap justify-center gap-x-10 gap-y-6">
            {topRow.map((member, idx) => (
              <TeamMember key={idx} name={member.name} image={member.image} />
            ))}
          </div>
          <div className="grid grid-cols-2 sm:flex flex-wrap justify-center gap-x-10 gap-y-6">
            {bottomRow.map((member, idx) => (
              <TeamMember
                key={idx + 4}
                name={member.name}
                image={member.image}
              />
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
};

export default TeamPage;
