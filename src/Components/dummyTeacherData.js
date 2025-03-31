export const 
dummyTeacherData = {
  name: "Dr. Sarah Johnson",
  registrationNo: "T2024-001",
  designation: "Associate Professor",
  status: "Active",
  gender: "Female",
  profilePhoto: "C:\Users\mudda\FypClone\src\Assets\profileicon.png",

  schedule: {
    monday: [
      { time: "09:00 AM - 10:30 AM",
         department: "Computer Science", section: "A" },

      { time: "11:00 AM - 12:30 PM", department: "Software Engineering", section: "B" }
    ],

  },

  coursesAttendance: [


  ],

  feedback: [
    {
      course: {
        code: "CS301",
        name: "Data Structures"
      },
      department: "Computer Science",
      section: "A",
      rating: 4.5,
      teachingRating: 4.6,
      knowledgeRating: 4.8,
      communicationRating: 4.1
    },

  ]
};