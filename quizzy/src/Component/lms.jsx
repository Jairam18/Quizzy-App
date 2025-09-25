// LMS.jsx
import React, { useState } from "react";

export default function LMS() {
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "React for Beginners",
      description: "Learn React basics and build dynamic apps.",
      lessons: [
        { name: "JSX & Components", completed: false },
        { name: "State & Props", completed: false },
        { name: "Hooks Basics", completed: false },
      ],
      enrolled: false,
      expanded: false,
    },
    {
      id: 2,
      title: "Full Stack Development",
      description: "Learn both frontend and backend development.",
      lessons: [
        { name: "HTML, CSS, JS", completed: false },
        { name: "Node.js & Express", completed: false },
        { name: "MongoDB Basics", completed: false },
      ],
      enrolled: false,
      expanded: false,
    },
    {
      id: 3,
      title: "Data Structures & Algorithms",
      description: "Master DSA for interviews and problem-solving.",
      lessons: [
        { name: "Arrays & Strings", completed: false },
        { name: "Linked Lists", completed: false },
        { name: "Sorting & Searching", completed: false },
      ],
      enrolled: false,
      expanded: false,
    },
  ]);

  const toggleEnroll = (id) => {
    setCourses(
      courses.map((course) =>
        course.id === id ? { ...course, enrolled: !course.enrolled } : course
      )
    );
  };

  const toggleLessonComplete = (courseId, lessonIndex) => {
    setCourses(
      courses.map((course) => {
        if (course.id === courseId) {
          const updatedLessons = [...course.lessons];
          updatedLessons[lessonIndex].completed =
            !updatedLessons[lessonIndex].completed;
          return { ...course, lessons: updatedLessons };
        }
        return course;
      })
    );
  };

  const toggleExpand = (id) => {
    setCourses(
      courses.map((course) =>
        course.id === id ? { ...course, expanded: !course.expanded } : course
      )
    );
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <h2>Courses</h2>
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </aside>

      <main style={styles.mainContent}>
        {filteredCourses.length === 0 && <p>No courses found.</p>}
        <div style={styles.coursesGrid}>
          {filteredCourses.map((course) => (
            <div key={course.id} style={styles.card}>
              <h2>{course.title}</h2>
              <p>{course.description}</p>

              <button
                style={{
                  ...styles.enrollBtn,
                  backgroundColor: course.enrolled ? "#28a745" : "#007bff",
                  cursor: course.enrolled ? "default" : "pointer",
                }}
                onClick={() => toggleEnroll(course.id)}
                disabled={course.enrolled}
              >
                {course.enrolled ? "Enrolled" : "Enroll"}
              </button>

              <div>
                <button
                  style={styles.expandBtn}
                  onClick={() => toggleExpand(course.id)}
                >
                  {course.expanded ? "Hide Lessons ▲" : "Show Lessons ▼"}
                </button>

                {course.expanded && (
                  <ul style={styles.lessonList}>
                    {course.lessons.map((lesson, idx) => (
                      <li key={idx} style={styles.lessonItem}>
                        <input
                          type="checkbox"
                          checked={lesson.completed}
                          onChange={() =>
                            toggleLessonComplete(course.id, idx)
                          }
                        />{" "}
                        {lesson.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div style={styles.progressBarContainer}>
                <div
                  style={{
                    ...styles.progressBar,
                    width: `${
                      (course.lessons.filter((l) => l.completed).length /
                        course.lessons.length) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
              <p style={styles.progressText}>
                Progress:{" "}
                {Math.round(
                  (course.lessons.filter((l) => l.completed).length /
                    course.lessons.length) *
                    100
                )}
                %
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    fontFamily: "Arial, sans-serif",
    minHeight: "100vh",
    backgroundColor: "#f4f4f4",
  },
  sidebar: {
    width: "250px",
    padding: "2rem 1rem",
    backgroundColor: "#fff",
    borderRight: "1px solid #ddd",
  },
  searchInput: {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginTop: "1rem",
  },
  mainContent: {
    flex: 1,
    padding: "2rem",
  },
  coursesGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "2rem",
    justifyContent: "center",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "1.5rem",
    width: "300px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    textAlign: "left",
  },
  enrollBtn: {
    padding: "0.6rem 1.2rem",
    border: "none",
    borderRadius: "5px",
    color: "white",
    fontWeight: "bold",
    marginBottom: "1rem",
  },
  expandBtn: {
    background: "none",
    border: "none",
    color: "#007bff",
    cursor: "pointer",
    marginBottom: "0.5rem",
    fontWeight: "bold",
  },
  lessonList: {
    paddingLeft: "1.2rem",
    marginBottom: "1rem",
  },
  lessonItem: {
    marginBottom: "0.5rem",
  },
  progressBarContainer: {
    width: "100%",
    height: "10px",
    backgroundColor: "#ddd",
    borderRadius: "5px",
    marginTop: "0.5rem",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#28a745",
    borderRadius: "5px",
  },
  progressText: {
    fontSize: "0.9rem",
    fontWeight: "bold",
    marginTop: "0.3rem",
  },
};
