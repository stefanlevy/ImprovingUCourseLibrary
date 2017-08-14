function RemoteIdeaViewModel(user, remoteIdea, semester, details) {
    this.titleFact = ko.observable();
    this.title = ko.computed(function () {
        var t = this.titleFact();
        var value = t ? t.value : remoteIdea.idea.title;
        return value + ' (Remote)';
    }, this);
    this.takeVotesAll = ko.observableArray();
    this.teachVotesAll = ko.observableArray();
    this.recommendVotesAll = ko.observableArray();
    this.takeVotes = ko.observableArray();
    this.teachVotes = ko.observableArray();
    this.recommendVotes = ko.observableArray();
    this.authorNameFact = ko.observable();
    this.abstractFact = ko.observable();

    this.takeCount = ko.computed(function () {
        return this.takeVotesAll().filter(voteInOffice).length;
    }, this);
    this.teachCount = ko.computed(function () {
        return this.teachVotesAll().filter(voteInOffice).length;
    }, this);
    this.recommendCount = ko.computed(function () {
        return this.recommendVotesAll().filter(voteInOffice).length;
    }, this);
    function voteInOffice(v) {
        return v.ideaConsumer.remoteIdeaOffice.semester.office.name === semester.office.name;
    }

    var remoteIdeaOffice = createRemoteIdeaOffice(remoteIdea, semester);
    var ideaConsumer = createRemoteIdeaOfficeConsumer(remoteIdeaOffice, user);

    this.visible = remoteIdea.idea.semester.office.name !== semester.office.name;
    this.authorName = ko.computed(function () {
        return this.authorNameFact() ? this.authorNameFact().value : "";
    }, this);
    this.abstract = ko.computed(function () {
        return this.abstractFact() ? converter.makeHtml(this.abstractFact().value) : "";
    }, this);

    function watchVotes(type, votesObservable) {
        return [
            j.watch(ideaConsumer, [votesForIdeaConsumer(type)],
                addTo(votesObservable),
                removeFrom(votesObservable))
        ];
    }
    var watches = []
        .concat(watchVotes("ImprovingU.TakeVote", this.takeVotes))
        .concat(watchVotes("ImprovingU.TeachVote", this.teachVotes))
        .concat(watchVotes("ImprovingU.RecommendVote", this.recommendVotes));

    function toggleVote(type, votesObservable) {
        return function() {
            if (votesObservable().length) {
                createRescindVote(user, votesObservable());
            }
            else {
                createVote(type, user, ideaConsumer);
            }
        };
    }
    function rescindVote(votesObservable) {
        return function() {
            if (votesObservable().length) {
                createRescindVote(user, votesObservable());
            }
        };
    }
    this.toggleTakeVote = toggleVote("ImprovingU.TakeVote", this.takeVotes);
    this.toggleTeachVote = toggleVote("ImprovingU.TeachVote", this.teachVotes);
    this.toggleRecommendVote = toggleVote("ImprovingU.RecommendVote", this.recommendVotes);
    this.rescindTakeVote = rescindVote(this.takeVotes);
    this.rescindTeachVote = rescindVote(this.teachVotes);
    this.rescindRecommendVote = rescindVote(this.recommendVotes);
    this.showDetails = function () {
        if (details())
            details().dispose();
        details(new RemoteIdeaDetails(remoteIdeaOffice));
        $("#remote-idea-details").modal();
    };
    this.dispose = dispose(watches);
}
