// creating cat function here will allow us to call it from 
// the viewModel. If we had left this in the view model, we 
// we would have to access from a for loop each time we created
// a cat.

// refactoring Cat() so that it can make a new cat every time. Right now it can only
// use the data we have hard coded into it. Start by creating var data and passing it
// to Cat()
/*jshint strict:false */

// replace this with loading from a server or parse.com for extra credit
var initialCats = [
	{
		name: 'Mimi',
		img: 'img/firstcat.jpg',
		clickCount: 0,
		imgAttribution: '',
		nickNames:['Mimet', 'Mrs. Meow','Cat','Mimsy']
	},
	{
		name: 'Figaro',
		img: 'img/secondcat.jpg',
		clickCount: 0,
		imgAttribution: '',
		nickNames: ['Figgy']
	},
	{
		name: 'Pharoah',
		img: 'img/thirdcat.jpg',
		clickCount: 0,
		imgAttribution: '',
		nickNames: ['Faro']
	},
	{
		name: 'Fluffy',
		img: 'img/fourthcat.jpg',
		clickCount: 0,
		imgAttribution: '',
		nickNames: ['Velu']
	},
	{
		name: 'Kitty',
		img: 'img/fifthcat.jpg',
		clickCount: 0,
		imgAttribution: '',
		nickNames: ['KitKat']
	}
];

var Cat = function(data) {

	this.clickCount = ko.observable(data.clickCount);
	this.name = ko.observable(data.name);
	this.img = ko.observable(data.img);
	this.imgAttribution = ko.observable(data.imgAttribution);
	this.nickNames = ko.observableArray(data.nickNames);

	this.title = ko.computed(function() {
		var title;
		var clicks = this.clickCount();
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
		console.log(title);
	}, this);
};

var ViewModel = function() {
	// this var self makes it so that when you use self instead of this, self maps to the 
	// ViewModel context. when you use self.catlist, you are mapping to the catlist
	// in the ViewModel
	var self = this;
	// this is how we create a new cat.
	// this new cat is a ko observable function.
	// in order to create a new cat, we include the 'data'{}/object into this currentCat.
	
	// create ko array for cats
	this.catList = ko.observableArray([]);
	// pass the cats from var initialCats into the ko observable array
	initialCats.forEach(function(catItem) {
		self.catList.push( new Cat(catItem) );
		console.log(self.catList);
	});

	this.currentCat = ko.observable( this.catList()[0] );

	// adding clickCounter method. the only time we are writing viewModel methods is 
	// when we have to change something ourselve like with clickCounter.
	// this code will be a lot smaller. We are not writing octopus code because
	// knockout is handling view -> model, model -> view sync for us. We are no longer
	// asking the octopus to go get the information from the model for us.
	
	// docs on getting data from list click http://knockoutjs.com/documentation/click-binding.html
	this.incrementCounter = function() {
		self.currentCat().clickCount(self.currentCat().clickCount() + 1);
	};

	this.setClickedCat = function(catItem) {
		self.currentCat(catItem);
	};
};

ko.applyBindings(new ViewModel());



