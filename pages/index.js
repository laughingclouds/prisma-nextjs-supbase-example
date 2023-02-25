import ClassCard from "@/components/ClassCard";
import ClassTable from "@/components/ClassTable";
import Head from "next/head";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function Home({ data }) {
  return (
    <>
      <Head>
        <title>CollegeDB</title>
      </Head>

      <header className="text-center mt-10 mb-8">
        <h1 className="text-3xl font-bold"><span className="text-primary hover:text-primary-focus">College</span>DB</h1>
      </header>

      <main className="flex flex-col items-center justify-between gap-8">
        {data.length ?
          data.map(classData => {
            const toolTipText = `Taught by ${classData.mentor.name}. Supported by ${classData.classRep.name}.`;
            return (
              <>
                <div key={classData.name} className="tooltip tooltip-top w-fit flex justify-center" data-tip={toolTipText}>
                  <div tabIndex={0} className="collapse gap-y-6">
                    <div className="justify-self-center">
                      <ClassCard>{classData.name}</ClassCard>
                    </div>

                    <div className="collapse-content md:row-start-1 md:col-start-2">
                      <ClassTable students={classData.students} />
                    </div>
                  </div>
                </div>
              </>
            );
          })
          :
          <h2 className="text-error">No Records Found!</h2>
        }
      </main>

      <footer className="bottom-0 fixed footer footer-center p-4 bg-base-300 text-base-content">
        <div>
          <p className="whitespace-normal">Made with ❤, for
            &nbsp;<a className="link link-primary" target="_blank" href="https://codeforgeek.com/">codeforgeek.com</a>
            &nbsp;| <a className="link link-hover link-secondary" href="https://github.com/laughingclouds/prisma-nextjs-supbase-example" target="_blank">Source Code</a></p>
        </div>
      </footer>
    </>
  )
}


export async function getServerSideProps() {
  const students = await prisma.student.findMany();
  const teachers = await prisma.teacherAssignedClass.findMany();
  const classes = await prisma.class.findMany();
  const studentAssignedClasses = await prisma.studentAssignedClass.findMany();

  prisma.$disconnect();
  /*
  const students = [
    { id: '1', name: 'Hemant', email: 'ex1@example.com', age: 20 },
    { id: '2', name: 'John', email: 'ex2@example.com', age: 21 },
    { id: '3', name: 'Dan', email: 'ex3@example.com', age: 19 },
    { id: '4', name: 'Carla', email: 'ex4@example.com', age: 20 },
    { id: '5', name: 'Shaun', email: 'ex5@example.com', age: 17 },
    { id: '6', name: 'Ishita', email: 'ex6@example.com', age: 19 }
  ];

  const teachers = [
    { id: '1', name: 'Aaron', email: 'aaron@uni.com', age: 30 },
    { id: '2', name: 'Kenneth', email: 'kenneth@uni.com', age: 28 },
    { id: '3', name: 'Samira', email: 'sam@uni.com', age: 35 }
  ];

  const classes = [
    { id: '1', name: '610', mentorId: '2', studentId: '1' },
    { id: '2', name: '611', mentorId: '1', studentId: '2' },
    { id: '3', name: '707', mentorId: '3', studentId: '3' }
  ];

  const studentAssignedClasses = [
    { id: 1, studentId: '5', classId: '2' },
    { id: 2, studentId: '4', classId: '1' },
    { id: 3, studentId: '1', classId: '3' },
    { id: 4, studentId: '3', classId: '2' },
    { id: 5, studentId: '2', classId: '1' },
    { id: 6, studentId: '6', classId: '3' }
  ];

  const teacherAssignedClasses = [
    { id: 1, teacherId: '3', classId: '3' },
    { id: 2, teacherId: '1', classId: '1' },
    { id: 3, teacherId: '2', classId: '2' }
  ];
  */
  let data = [];

  for (let classInfo of classes) {
    const teacher = teachers.find(teacher => teacher.id == classInfo.mentorId);
    const classRep = students.find(student => student.id == classInfo.id);

    const assignedStudents = studentAssignedClasses.filter(stud => stud.classId == classInfo.id);

    const classStudents = students.filter(student => {
      return Boolean(assignedStudents.find(assignedStud => assignedStud.studentId == student.id));
    });

    data.push({
      id: classInfo.id,
      name: classInfo.name,
      mentor: teacher,
      classRep: classRep,
      students: classStudents
    });
  }

  return { props: { data } };
}
