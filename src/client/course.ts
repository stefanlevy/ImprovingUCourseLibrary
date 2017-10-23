class Catalog {
    public static Type = "ImprovingU.Catalog";
    public type: string;

    constructor (
        public office?: string,
        public _in?: Semester,
        public from?: User
    ) {
        this.type = Catalog.Type;
    }
}

class Course {
    public static Type = "ImprovingU.Course";
    public type: string;
    public createdAt?: Date;

    constructor (
        public from?: User,
        public _in?: Catalog
    ) {
        this.type = Course.Type;
        this.createdAt = new Date();
    }
}

class CourseDelete {
    public static Type = "ImprovingU.Course.Delete";
    public type: string;

    constructor (
        public from?: User,
        public course?: Course,
        public _in?: Catalog
    ) {
        this.type = CourseDelete.Type;
    }
}

class CourseTitle {
    public static Type = "ImprovingU.Course.Title";
    public type: string;

    constructor (
        public from?: User,
        public course?: Course,
        public value?: string,
        public prior?: CourseTitle[],
        public _in?: Catalog
    ) {
        this.type = CourseTitle.Type;
    }
}

class CourseInstructor {
    public static Type = "ImprovingU.Course.Instructor";
    public type: string;

    constructor (
        public from?: User,
        public course?: Course,
        public value?: string,
        public prior?: CourseInstructor[],
        public _in?: Catalog
    ) {
        this.type = CourseInstructor.Type;
    }
}


// Template functions
function courseIsDeleted(c: Course) : CourseDelete {
    return {
        type: CourseDelete.Type,
        course: c
    };
}

function coursesInSemester(s: Semester) : Course {
    return j.where({
        type: Course.Type,
        _in: {
            type: Catalog.Type,
            _in: s
        }
    }, [j.not(courseIsDeleted)]);
}

function courseTitleIsCurrent(n: CourseTitle) : CourseTitle {
    return j.not({
        type: CourseTitle.Type,
        prior: [n]
    });
}

function titlesForCourse(c: Course) : CourseTitle {
    return j.where({
        type: CourseTitle.Type,
        course: c
    }, [courseTitleIsCurrent]);
}

function courseInstructorIsCurrent(n: CourseInstructor) : CourseInstructor {
    return j.not({
        type: CourseInstructor.Type,
        prior: [n]
    });
}

function instructorsForCourse(c: Course) : CourseInstructor {
    return j.where({
        type: CourseInstructor.Type,
        course: c
    }, [courseInstructorIsCurrent]);
}