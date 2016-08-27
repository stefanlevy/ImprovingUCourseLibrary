function CoursesViewModel() {
    UserViewModel.call(this, null);

    this.courses = ko.observableArray();
    this.courseDetail = ko.observable();
    this.registration = ko.observable();
    this.accessRequests = ko.observableArray();

    this.requestAccess = function () {
        var user = this.user();
        var catalog = this.catalog();
        if (user && catalog) {
            j.fact(createAccessRequest(user, catalog));
        }
    };
    this.newCourse = function () {
        if (this.courseDetail())
            this.courseDetail().dispose();

        var user = this.user();
        var catalog = this.catalog();
        if (user && catalog) {
            var course = createCourse(user, catalog);
            this.courseDetail(new CourseDetailViewModel(course, user));
            $("#course-detail-dialog").modal();
        }
    };

    var owner = {
        type: "Jinaga.User",
        publicKey: "-----BEGIN RSA PUBLIC KEY-----\nMIGJAoGBAIBsKomutukULWw2zoTW2ECMrM8VmD2xvfpl3R4qh1whzuXV+A4EfRKMb/UAjEfw\n5nBmWvcObGyYUgygKrlNeOhf3MnDj706rej6ln9cKGL++ZNsJgJsogaAtmkPihWVGi908fdP\nLQrWTF5be0b/ZP258Zs3CTpcRTpTvhzS5TC1AgMBAAE=\n-----END RSA PUBLIC KEY-----\n"
    };
    var company = {
        type: "ImprovingU.Company",
        name: "Improving",
        from: owner
    };
    var semester = {
        type: "ImprovingU.Semester",
        name: "Fall 2016",
        _in: company,
        from: owner
    };

    initializeSemester(this);
    initializeAccess(this);

    function initializeSemester(viewModel) {
        viewModel.catalog = ko.computed(function () {
            return getCatalog(viewModel.office());
        });
        watchSemester();

        function watchSemester() {
            var coursesWatch = j.watch(semester, [coursesInSemester], addTo(viewModel.courses, function (course) {
                return new CourseViewModel(course, viewModel.office, viewModel.user, viewModel.courseDetail, viewModel.canWrite, viewModel.registration);
            }), removeFrom(viewModel.courses));
            coursesWatch.watch([titlesForCourse], setChildValue('titleFact'));
            coursesWatch.watch([instructorsForCourse], setChildValue('instructorFact'));
            coursesWatch.watch([abstractsForCourse], setChildValue('abstractFact'));
            coursesWatch.watch([remoteCoursesForCourse], setChildValue('remoteFact'));

            var requestsWatch = j.watch(semester, [accessRequestsInSemester],
                addTo(viewModel.accessRequests, function (r) { return new AccessRequestViewModel(viewModel.user, viewModel.catalog, r); }),
                removeFrom(viewModel.accessRequests));
            requestsWatch.watch([userForFact, namesForUser], setChildValue('nameFact'));
        }

        function getCatalog(office) {
            var catalog = {
                type: "ImprovingU.Catalog",
                office: office,
                _in: semester,
                from: owner
            };
            return catalog;
        }
    }

    function initializeAccess(viewModel) {
        viewModel.access = ko.observableArray();

        viewModel.canAdminister = ko.computed(function () {
            var catalog = viewModel.catalog();
            var user = viewModel.user();
            return catalog && user && catalog.from.publicKey === user.publicKey;
        });
        viewModel.canWrite = ko.computed(function () {
            if (viewModel.canAdminister())
                return true;
            var catalog = viewModel.catalog();
            var user = viewModel.user();
            return catalog && user &&
                viewModel.access().find(function (a) {
                    return a.write.office === catalog.office &&
                        a.to.publicKey === user.publicKey;
                });
        });

        j.watch(semester, [accessInSemester], addTo(viewModel.access), removeFrom(viewModel.access));
    }
}

function AccessRequestViewModel(user, catalog, request) {
    this.nameFact = ko.observable();
    this.name = ko.computed(function () {
        return this.nameFact() ? this.nameFact().value : '';
    }, this);
    this.visible = ko.computed(function () {
        return catalog() && request.catalog.office === catalog().office;
    }, this);

    this.approve = function () {
        if (user())
            j.fact(createAccessRequestApproved(user(), request));
    };
    this.decline = function () {
        if (user())
            j.fact(createAccessRequestDeclined(user(), request));
    };
}