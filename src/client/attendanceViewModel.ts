const j = new Jinaga();
const jko = new JinagaKnockout(j, ko);
const distributor = new JinagaDistributor(distributorUrl);

j.sync(distributor);

class AttendanceViewModel {
    public error = ko.observable();
    public queueCount = ko.observable(0);
    public loading = ko.observable(false);
    
    public status = ko.computed(() => {
        return this.error()
            ? "Error"
            : this.queueCount() > 0
            ? "Saving..."
            : this.loading()
            ? "Loading..."
            : "";
    }, this);

    constructor() {
        j.onError((message) => {
            this.error(message);
         });
        j.onProgress((queueCount) => {
            this.queueCount(queueCount);
        });
        j.onLoading((loading) => {
            this.loading(loading);
        });
    }
}

class StudentViewModel {}

const AttendanceViewModelSpec = jko.root(AttendanceViewModel, {
    students: jko.collection([courseForSession, registrationsForCourse], StudentViewModel, {
        name: jko.property([namesForStudent], "<unknown>", "value")
    })
});

const session = {"type":"ImprovingU.Session","from":{"type":"Jinaga.User","publicKey":"-----BEGIN RSA PUBLIC KEY-----\nMIGJAoGBAIBsKomutukULWw2zoTW2ECMrM8VmD2xvfpl3R4qh1whzuXV+A4EfRKMb/UAjEfw\n5nBmWvcObGyYUgygKrlNeOhf3MnDj706rej6ln9cKGL++ZNsJgJsogaAtmkPihWVGi908fdP\nLQrWTF5be0b/ZP258Zs3CTpcRTpTvhzS5TC1AgMBAAE=\n-----END RSA PUBLIC KEY-----\n"},"course":{"type":"ImprovingU.Course","from":{"type":"Jinaga.User","publicKey":"-----BEGIN RSA PUBLIC KEY-----\nMIGJAoGBAIBsKomutukULWw2zoTW2ECMrM8VmD2xvfpl3R4qh1whzuXV+A4EfRKMb/UAjEfw\n5nBmWvcObGyYUgygKrlNeOhf3MnDj706rej6ln9cKGL++ZNsJgJsogaAtmkPihWVGi908fdP\nLQrWTF5be0b/ZP258Zs3CTpcRTpTvhzS5TC1AgMBAAE=\n-----END RSA PUBLIC KEY-----\n"},"_in":{"type":"ImprovingU.Catalog","office":"Dallas","_in":{"type":"ImprovingU.Semester","name":"Fall 2017","_in":{"type":"ImprovingU.Company","name":"Improving","from":{"type":"Jinaga.User","publicKey":"-----BEGIN RSA PUBLIC KEY-----\nMIGJAoGBAIBsKomutukULWw2zoTW2ECMrM8VmD2xvfpl3R4qh1whzuXV+A4EfRKMb/UAjEfw\n5nBmWvcObGyYUgygKrlNeOhf3MnDj706rej6ln9cKGL++ZNsJgJsogaAtmkPihWVGi908fdP\nLQrWTF5be0b/ZP258Zs3CTpcRTpTvhzS5TC1AgMBAAE=\n-----END RSA PUBLIC KEY-----\n"}},"from":{"type":"Jinaga.User","publicKey":"-----BEGIN RSA PUBLIC KEY-----\nMIGJAoGBAIBsKomutukULWw2zoTW2ECMrM8VmD2xvfpl3R4qh1whzuXV+A4EfRKMb/UAjEfw\n5nBmWvcObGyYUgygKrlNeOhf3MnDj706rej6ln9cKGL++ZNsJgJsogaAtmkPihWVGi908fdP\nLQrWTF5be0b/ZP258Zs3CTpcRTpTvhzS5TC1AgMBAAE=\n-----END RSA PUBLIC KEY-----\n"}},"from":{"type":"Jinaga.User","publicKey":"-----BEGIN RSA PUBLIC KEY-----\nMIGJAoGBAIBsKomutukULWw2zoTW2ECMrM8VmD2xvfpl3R4qh1whzuXV+A4EfRKMb/UAjEfw\n5nBmWvcObGyYUgygKrlNeOhf3MnDj706rej6ln9cKGL++ZNsJgJsogaAtmkPihWVGi908fdP\nLQrWTF5be0b/ZP258Zs3CTpcRTpTvhzS5TC1AgMBAAE=\n-----END RSA PUBLIC KEY-----\n"}},"createdAt":new Date("2017-08-28T02:15:28.504Z")},"catalogDate":{"type":"ImprovingU.Catalog.Date","catalog":{"type":"ImprovingU.Catalog","office":"Dallas","_in":{"type":"ImprovingU.Semester","name":"Fall 2017","_in":{"type":"ImprovingU.Company","name":"Improving","from":{"type":"Jinaga.User","publicKey":"-----BEGIN RSA PUBLIC KEY-----\nMIGJAoGBAIBsKomutukULWw2zoTW2ECMrM8VmD2xvfpl3R4qh1whzuXV+A4EfRKMb/UAjEfw\n5nBmWvcObGyYUgygKrlNeOhf3MnDj706rej6ln9cKGL++ZNsJgJsogaAtmkPihWVGi908fdP\nLQrWTF5be0b/ZP258Zs3CTpcRTpTvhzS5TC1AgMBAAE=\n-----END RSA PUBLIC KEY-----\n"}},"from":{"type":"Jinaga.User","publicKey":"-----BEGIN RSA PUBLIC KEY-----\nMIGJAoGBAIBsKomutukULWw2zoTW2ECMrM8VmD2xvfpl3R4qh1whzuXV+A4EfRKMb/UAjEfw\n5nBmWvcObGyYUgygKrlNeOhf3MnDj706rej6ln9cKGL++ZNsJgJsogaAtmkPihWVGi908fdP\nLQrWTF5be0b/ZP258Zs3CTpcRTpTvhzS5TC1AgMBAAE=\n-----END RSA PUBLIC KEY-----\n"}},"from":{"type":"Jinaga.User","publicKey":"-----BEGIN RSA PUBLIC KEY-----\nMIGJAoGBAIBsKomutukULWw2zoTW2ECMrM8VmD2xvfpl3R4qh1whzuXV+A4EfRKMb/UAjEfw\n5nBmWvcObGyYUgygKrlNeOhf3MnDj706rej6ln9cKGL++ZNsJgJsogaAtmkPihWVGi908fdP\nLQrWTF5be0b/ZP258Zs3CTpcRTpTvhzS5TC1AgMBAAE=\n-----END RSA PUBLIC KEY-----\n"}},"date":"2017-09-07"},"time":"6:00","place":"Improving","createdAt":new Date("2017-08-28T02:17:28.012Z")};
const vmFactory = AttendanceViewModelSpec.load(session);
const vm = vmFactory.viewModel;

ko.applyBindings(vm);