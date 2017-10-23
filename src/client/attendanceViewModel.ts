const j = new Jinaga();
const jko = new JinagaKnockout(j, ko);
const distributor = new JinagaDistributor(distributorUrl);

j.sync(distributor);

class AttendanceViewModel extends StatusViewModel {
}

class StudentViewModel {}

const AttendanceViewModelSpec = jko.root(AttendanceViewModel, {
    identifier: jko.fact(),
    title: jko.property([attendanceSheetsForIdentifier, courseForAttendanceSheet, titlesForCourse], "<title>", "value"),
    instructor: jko.property([attendanceSheetsForIdentifier, courseForAttendanceSheet, instructorsForCourse], "<instructor>", "value"),
    time: jko.property([attendanceSheetsForIdentifier, sessionForAttendanceSheet], "<time>", "time"),
    catalogDate: jko.property([attendanceSheetsForIdentifier, sessionForAttendanceSheet], "<date>", "catalogDate"),
    students: jko.collection([attendanceSheetsForIdentifier, registrationsForAttendanceSheet], StudentViewModel, {
        name: jko.property([namesForStudent], "<unknown>", "value"),
        notes: jko.property([notesForRegistration],"<notes>","value")
    })
});
