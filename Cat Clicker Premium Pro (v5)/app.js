
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
    viewAdmin.init();
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
   		viewAdmin.render();
   	},

   	updateCurrentCat: function() {
   		if (form.name.value != '') {
   			model.currentCat.name = form.name.value;
   		}
   		if (form.img.value != '') {
   			model.currentCat.img = form.img.value;
   		}
   		if (form.clickCount.value != '') {
   			model.currentCat.clickCount = form.clickCount.value;
   		}
   		viewList.render();
   		viewCat.render();
   		viewAdmin.render();
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
		
		this.catlist.innerHTML = '';
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
					viewAdmin.render();
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

var viewAdmin = {

	init: function()  {
		this.adminArea = document.getElementById("admin-area");
		this.adminBtn = document.getElementById("admin-button");
		var form = document.getElementById("form");
		this.adminName = document.getElementById("admin-name");
		this.adminImage = document.getElementById("admin-img");
		this.adminClickCount = document.getElementById("admin-clickCount");
		this.adminCancel = document.getElementById("reset");
		this.adminButton = document.getElementById("button");
		
		form.style.display = 'none';
		var t = document.createTextNode("ADMIN");
		this.adminBtn.appendChild(t);

		this.adminBtn.addEventListener('click', function() {
			document.getElementById("form").style.display = 'block';
			viewAdmin.render();
			});
		
		this.adminCancel.addEventListener('click', function() {
			document.getElementById("form").style.display = 'none';
			});

		this.adminButton.addEventListener('click', function() {
			octopus.updateCurrentCat();
			document.getElementById("form").style.display = 'none';
		});
			
		

		this.render();
	},

	render: function() {
		var currentCat = octopus.getCurrentCat();
		this.adminName.value = currentCat.name;
		this.adminImage.value = currentCat.img;
		this.adminClickCount.value = currentCat.clickCount;
		
	}
	
};
octopus.init();


