const disponibiteData = require('./ElKindy-DB.disponibilites.json');
// import disponibite from './model/disponibilites';

// import schedule from './model/schedule'; // schedule from model
const schedules = [];
class ScheduleSlot {
  startTime;
  endTime;
  day;
  teacher;
  students;
  classroom;
  class;

  constructor(startTime, endTime, day, teacher, students, classroom, class_) {
    this.startTime = startTime;
    this.endTime = endTime;
    this.day = day;
    this.teacher = teacher;
    this.students = students;
    this.classroom = classroom;
    this.class = class_;
  }
}

function addScheduleSlot(inputData) {
  //1) we should verify if the teacher is available at this time(data.startTime, data.endTime, data.day)
  // 2) we must verify if all students are available at this time(data.startTime, data.endTime, data.day)

  const scheduleSlot = new ScheduleSlot(
    inputData.startTime,
    inputData.endTime,
    inputData.day,
    inputData.teacher,
    inputData.students,
    inputData.classroom,
    inputData.class
  );

  // const teacherDisponibilities = disponibite.find({
  //   utilisateur: scheduleSlot.teacher,
  //   jour: scheduleSlot.day,
  //   heureDebut: scheduleSlot.startTime,
  //   heureFin: scheduleSlot.endTime
  //})

  const teacherDisponibilities = disponibiteData.filter(
    availabitySlot =>
      availabitySlot.utilisateur === scheduleSlot.teacher &&
      availabitySlot.jour === scheduleSlot.day &&
      availabitySlot.heureDebut === scheduleSlot.startTime &&
      availabitySlot.heureFin === scheduleSlot.endTime
  );

  if (teacherDisponibilities.length === 0) {
    throw new Error(`Teacher ${scheduleSlot.teacher} is not available at this time`);
  }

  console.log('Teacher is available');
  scheduleSlot.students.forEach(student => {
    // const studentDisponibilities = disponibite.find({
    //   utilisateur: scheduleSlot.students,
    //   jour: scheduleSlot.day,
    //   heureDebut: scheduleSlot.startTime,
    //   heureFin: scheduleSlot.endTime
    //})
    const studentDisponibilities = disponibiteData.filter(
      availabitySlot =>
        availabitySlot.utilisateur === student &&
        availabitySlot.jour === scheduleSlot.day &&
        availabitySlot.heureDebut === scheduleSlot.startTime &&
        availabitySlot.heureFin === scheduleSlot.endTime
    );

    if (studentDisponibilities.length === 0) {
      throw new Error(`Student ${student} is not available at this time`);
    }

    console.log(`Student ${student} is available`);
  });

  console.log('All students are available');

  console.log('Schedule slot added successfully');
  schedules.push(scheduleSlot); // schedule.save()
}

function main() {
  const inputData = {
    startTime: '15:00',
    endTime: '15:30',
    day: 'vendredi',
    teacher: 'teacher1',
    students: ['student1'],
    classroom: 'classroom1',
    class: 'class1',
  };

  const inputData2 = {
    startTime: '15:00',
    endTime: '15:30',
    day: 'lundi',
    teacher: 'teacher1',
    students: ['student1'],
    classroom: 'classroom1',
    class: 'class1',
  };

  try {
    addScheduleSlot(inputData);
    addScheduleSlot(inputData2);
  } catch (error) {
    console.log(error.message);
  }

  console.log(schedules); // schedule.find({}) // you can filter shcules by className(4TWIN3)
}

main();
