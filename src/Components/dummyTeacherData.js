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
    tuesday: [
      { time: "02:00 PM - 03:30 PM", department: "Computer Science", section: "C" },
      { time: "04:00 PM - 05:30 PM", department: "Information Technology", section: "A" }
    ],
    wednesday: [
      { time: "09:00 AM - 10:30 AM", department: "Software Engineering", section: "A" },
      { time: "11:00 AM - 12:30 PM", department: "Computer Science", section: "B" }
    ],
    thursday: [
      { time: "02:00 PM - 03:30 PM", department: "Information Technology", section: "B" },
      { time: "04:00 PM - 05:30 PM", department: "Computer Science", section: "D" }
    ],
    friday: [
      { time: "09:00 AM - 10:30 AM", department: "Software Engineering", section: "C" },
      { time: "11:00 AM - 12:30 PM", department: "Computer Science", section: "A" }
    ]
  },

  coursesAttendance: [
    {
      code: "CS301",
      name: "Data Structures",
      totalClasses: 45,
      classesTaken: 42,
      department: "Computer Science",
      section: "A"
    },
    {
      code: "SE201",
      name: "Software Engineering Fundamentals",
      totalClasses: 30,
      classesTaken: 28,
      department: "Software Engineering",
      section: "B"
    },
    {
      code: "IT401",
      name: "Database Management",
      totalClasses: 40,
      classesTaken: 35,
      department: "Information Technology",
      section: "A"
    }
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
    {
      course: {
        code: "SE201",
        name: "Software Engineering Fundamentals"
      },
      department: "Software Engineering",
      section: "B",
      rating: 4.7,
      teachingRating: 4.8,
      knowledgeRating: 4.9,
      communicationRating: 4.4
    },
    {
      course: {
        code: "IT401",
        name: "Database Management"
      },
      department: "Information Technology",
      section: "A",
      rating: 4.3,
      teachingRating: 4.4,
      knowledgeRating: 4.5,
      communicationRating: 4.0
    }
  ]
};