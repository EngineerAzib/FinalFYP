
export const studentData = {
  basicInfo: {
    name: "John Doe",
    profilePhoto: "https://example.com/placeholder.jpg", // Add profile photo URL
    enrollmentNo: "2021-SE-01",
    rollNo: "21SW01",
    department: "Software Engineering",
    semester: 4,
    section: "A"
  },
  academics: {
    currentCGPA: 3.75,
    semesterGPAs: [
      {
        semester: 1,
        gpa: 3.80,
        courses: [
          { code: "CS101", name: "Programming Fundamentals", creditHours: 3, grade: "A" },
          { code: "MT101", name: "Calculus", creditHours: 3, grade: "A-" },
          { code: "ENG101", name: "English Composition", creditHours: 3, grade: "A" }
        ]
      },

    ]
  },
  attendance: {
    currentSemester: {
      overallAttendance: 90.5,
      courses: [
        {
          code: "SE301",
          name: "Software Design & Architecture",
          creditHours: 3,
          totalClasses: 44,
          attendedClasses: 40,
          percentage: 90.91, 
        },

      ]
    }
  }
};