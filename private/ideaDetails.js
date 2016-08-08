var converter = new showdown.Converter();

function IdeaDetails(idea) {
    this.title = idea.title;
    this.abstractValues = ko.observableArray();
    this.abstract = ko.computed(function () {
        var values = this.abstractValues();
        return values.length == 0
            ? ""
            : converter.makeHtml(values[0].value);
    }, this);
    this.editing = ko.observable(false);
    this.editAbstract = ko.computed({
        read: function () {
            var values = this.abstractValues();
            return values.length == 0
                ? ""
                : values[0].value;
        },
        write: function (value) {
            createAbstract(idea, viewModel.user(), value, this.abstractValues());
        },
        owner: this
    });

    this.toggleEditAbstract = function () {
        this.editing(!this.editing());
    };

    this.takeVotes = ko.observableArray();
    this.teachVotes = ko.observableArray();
    this.recommendVotes = ko.observableArray();
    function watchVotes(type, observable) {
        return [
            j.watch(idea, [votesForIdea(type), userForVote, namesForUser],
                addTo(observable),
                removeFrom(observable))
        ]
    }
    var watches = []
        .concat([
            j.watch(idea, [abstractsInIdea], addTo(this.abstractValues), removeFrom(this.abstractValues))
        ])
        .concat(watchVotes("ImprovingU.TakeVote", this.takeVotes))
        .concat(watchVotes("ImprovingU.TeachVote", this.teachVotes))
        .concat(watchVotes("ImprovingU.RecommendVote", this.recommendVotes));
    this.dispose = dispose(watches);
}
