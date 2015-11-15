
var model = {
	currentCat: null,
	cats: [
		{
			name: 'Mimi',
			img: 'img/firstcat.jpg',
			clickCount: 0
		},
		{
			name: 'Figaro',
			img: 'img/secondcat.jpg',
			clickCount: 0
		},
		{
			name: 'Pharoah',
			img: 'img/thirdcat.jpg',
			clickCount: 0
		},
		{
			name: 'Fluffy',
			img: 'img/fourthcat.jpg',
			clickCount: 0
		},
		{
			name: 'Kitty',
			img: 'img/fifthcat.jpg',
			clickCount: 0
		}
	]
};

var octopus = {
	
	init: function() {
	model.currentCat = model.cats[0];

    viewList.init();
    viewCat.init();
	},

	getCatNames: function() {
	 	return model.cats;
   	},

   	getCurrentCat: function() {
   		return model.currentCat;
   	},

   	setClickedCat: function(cat) {
   		model.currentCat = cat;
   		console.log(cat);
   	},

   	clickCount: function() {
   		model.currentCat.clickCount++;
   		viewCat.render();
   	}
};


var viewList = {
	init: function() {
        this.catlist = document.getElementById('catlist');
    	viewList.render();
	},

	render: function(){
		var i;
		var cats = octopus.getCatNames();
		
		// build a list in the function and posts the list to DOM
		for(i = 0; i < cats.length; i++) {
			// give name to each instance of cat to use through code.
			// i tried using cats[i] but received and error when passing it through
			// octopus.setClickedCat(cats[i];)
			cat = cats[i];
			// make a new cat list item
			catToDom = document.createElement('li');
			// set its contents by passing the cat.name element from octopus.getCatNames();
      		catToDom.appendChild(document.createTextNode( cat.name ));
      		// adds event listener. "click" is the js event being listened for. 
      		// "onClick" is my function that tells what I want to happen after hearing click. 'false' is event public value see https://youtu.be/mC7FxTmgUuQ?t=4m13s
      		catToDom.addEventListener('click', (function(catCopy) {  
		//the element has been clicked... do stuff here
				return function () {
					octopus.setClickedCat(catCopy);
					viewCat.render();
				};
			})(cat));

      		this.catlist.appendChild(catToDom);
		}	
	}
};

var viewCat = {
	init: function() {
		this.catFrame = document.getElementById("cat-frame");
		this.catName = document.getElementById("catname");
		this.clickNum = document.getElementById("counter");
		this.catImage = document.getElementById("cat-img");

		// increment clickCounter
		this.catImage.addEventListener('click', function() {
			octopus.clickCount();
		});
		
		this.render();
	},
	render: function() {
		var currentCat = octopus.getCurrentCat();
		this.catImage.src = currentCat.img;
		this.catName.textContent = currentCat.name;
		this.clickNum.textContent = currentCat.clickCount;
	}
};
octopus.init();


