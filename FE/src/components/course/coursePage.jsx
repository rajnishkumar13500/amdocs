import Card from "../card";

const Courses = () => {
  
    const courses = [
        {
          img: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
          topic: "Advanced React Development",
          description: "Learn the core concepts of React including components, props, state, and more...",
          link: "react-fundamentals"
        },
        {
          img: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
          topic: "Node.js Backend Development",
          description: "Master Node.js and build scalable backend applications...",
          link: "node-backend"
        },
        // Add more courses as needed
      ];
    
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <Card key={index} {...course} />
          ))}
        </div>
      );
};

export default Courses;