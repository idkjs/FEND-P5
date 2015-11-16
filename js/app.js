// creating cat function here will allow us to call it from 
// the viewModel. If we had left this in the view model, we 
// we would have to access from a for loop each time we created
// a cat.
var Cat = function() {

	this.clickCount = ko.observable(0);
	this.name = ko.observable('Mimi');
	this.imgSrc = ko.observable('img/434164568_fea0ad4013_z.jpg');
	this.imgAttribution = ko.observable('https://www.flickr.com');
	this.title = ko.computed(function() {
		var clicks = this.clickCount();
		var title;
		if (clicks < 11 ) {
			title = 'Newborn';
		} else if (clicks < 51 ) {
			title = 'Infant';
		} else if (clicks < 100) {
			title = 'Youngin';
		} else {
			title = 'Adult';
		}
		return title;
	}, this);

	this.nickNames = ko.observableArray([
		{ nickName: 'Mimet'},
		{ nickName: 'Mrs. Meow'},
		{ nickName: 'Cat'},
		{ nickName: 'Mimsy'}
	]);
}

var ViewModel = function() {

	// this is how we create a new cat.
	// this new cat is a ko observable function.
	this.currentCat = ko.observable( new Cat() );

	// adding clickCounter method. the only time we are writing viewModel methods is 
	// when we have to change something ourselve like with clickCounter.
	// this code will be a lot smaller. We are not writing octopus code because
	// knockout is handling view -> model, model -> view sync for us. We are no longer
	// asking the octopus to go get the information from the model for us.
	this.incrementCounter = function() {
		this.currentCat().clickCount(this.currentCat().clickCount() + 1);
	};
};

ko.applyBindings(new ViewModel());