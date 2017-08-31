const j = new Jinaga();
const jko = new JinagaKnockout(j, ko);
const distributor = new JinagaDistributor(distributorUrl);

j.sync(distributor);

class AttendanceViewModel extends StatusViewModel {
}

class StudentViewModel {}

const AttendanceViewModelSpec = jko.root(AttendanceViewModel, {
    identifier: jko.fact(),
    students: jko.collection([attendanceSheetsForIdentifier, registrationsForAttendanceSheet], StudentViewModel, {
        name: jko.property([namesForStudent], "<unknown>", "value")
    })
});

const identifier = new AttendanceSheetIdentifier("ABC");
const vmFactory = AttendanceViewModelSpec.load(j.fact(identifier));
const vm = vmFactory.viewModel;

ko.applyBindings(vm);