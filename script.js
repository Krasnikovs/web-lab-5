// execute the script when the HTML document has been completely parsed
document.addEventListener("DOMContentLoaded", (event) => {
	// Select DOM elements
	const gallery = document.getElementById('gallery');
	const allFilter = document.getElementById('allFilter');
	const natureFilter = document.getElementById('natureFilter');
	const cityFilter = document.getElementById('cityFilter');
	const abstractFilter = document.getElementById('abstractFilter');
	const sortBy = document.getElementById('sortBy');
	const imageForm = document.getElementById('imageForm');
	const imageUrlInput = document.getElementById('imageUrl');
	const imageNameInput = document.getElementById('imageName');
	const imageCategoryInput = document.getElementById('imageCategory');
	const urlError = document.getElementById('urlError');
	const nameError = document.getElementById('nameError');
	const categoryError = document.getElementById('categoryError');

	let images = [];  // Array to store image data

	// Function to create image element, supplement the code to set the necessary attributes of the image card in the gallery
	function createImageElement(imageData) {
		const imageItem = document.createElement('div');
		gallery.appendChild(imageItem);
		
		const img = document.createElement('img');
		img.src = imageData.imgUrl;
		
		imageItem.appendChild(img);
		
		const removeButton = document.createElement('button');

		removeButton.addEventListener('click', () => removeImage(imageData));
		removeButton.innerHTML = 'Remove';
		imageItem.appendChild(removeButton);
		

		const imageNameInfo = document.createElement('p');
		imageNameInfo.textContent = imageData.imgName;
		
		imageItem.appendChild(imageNameInfo);

		const imageCatogoryInfo = document.createElement('p');
		imageCatogoryInfo.textContent = imageData.imgCatagory;
		
		imageItem.appendChild(imageCatogoryInfo);

		const imageDateInfoP = document.createElement('p');
		imageDateInfoP.textContent = imageData.imgDate;

		imageItem.appendChild(imageDateInfoP);
		
		
		return imageItem;
	}

	// Function to render images to the gallery
	function renderGallery(filter) {
		gallery.innerHTML = ''; // clean the gallery
		// filter the images according to the filter parameter, run the function createImageElement for each image and append generated images to the gallery
		gallery.innerHTML = filter;
		if (filter === 'All') {
			for (let i = 0; i < images.length; i++) {
				createImageElement(images[i]);
			}
		} else if (filter === 'Nature') {
			for (let i = 0; i < images.length; i++) {
				if (images[i].imgCatagory === filter) {
					createImageElement(images[i]);
				}
			}
		} else if (filter === 'City') {
			for (let i = 0; i < images.length; i++) {
				if (images[i].imgCatagory === filter) {
					createImageElement(images[i]);
				}
			}
		} else if (filter === 'Abstract') {
			for (let i = 0; i < images.length; i++) {
				if (images[i].imgCatagory === filter) {
					createImageElement(images[i]);
				}
			}
		}
	}

	// Function to validate the form
	function validateForm() {
		let valid = true;

		// Clear previous error messages
		urlError.textContent = '';
		nameError.textContent = '';
		categoryError.textContent = '';

		// Validate Image URL (must end with .jpg, .png, .gif, or .svg), in case on error, display error message in urlError
		let imgFormat = [".jpg", ".png", ".gif", ".svg"];
		let noFormat = true;
		for (let i = 0; i < imgFormat.length; i++) {
			if (imageUrlInput.value.includes(imgFormat[i])) {
				noFormat = false;
				break;
			}
		}

		if (noFormat) {
			urlError.textContent = 'Error. Inccorect image format or none';
			valid = false;
			return valid;
		}

		// Validate Image Name (cannot be empty), in case on error, display error message in nameError
		if (!imageNameInput.value) {
			nameError.textContent = 'Error. No name';
			valid = false;
			return valid;
		}

		// Validate Category (must be selected), in case on error, display error message in categoryError
		if (!imageCategoryInput.value) {
			categoryError.textContent = 'Error. No catagory';
			valid = false;
			return valid;
		}

		return valid;
	}

	// Function to add an image
	imageForm.addEventListener('submit', function (e) {
		e.preventDefault(); // cancel form submission
		
		// Validate the fields with the function validateForm(), stop processing if validation fails
		validation = validateForm();
		if (validation) {
			

			// Create image data object
			function ImageData(img, imgName, imgCatagory) {
				this.imgUrl = img;
				this.imgName = imgName;
				this.imgCatagory = imgCatagory;
				const date = new Date();
				this.imgDate = [date.toDateString(), date.toTimeString()]
				// this.imgDate = [date.getDate(), date.getMonth(), date.getHours(), date.getMinutes()];
			}
			

			// Add the image data to the array images
			images.push(new ImageData(imageUrlInput.value, imageNameInput.value, imageCategoryInput.value));

			// Render the updated gallery
			renderGallery('All');

			// Reset the form
			imageUrlInput.value = '';
			imageNameInput.value = '';
			imageCategoryInput.value = '';
		}
	});

	// Function to remove an image from the array images and from the gallery HTML
	function removeImage(imageData) {
		const remove = images.findIndex(x => x === imageData)
        images.splice(remove, 1)

		renderGallery('All');
	}

	// Filter buttons
	allFilter.addEventListener('click', () => {
		renderGallery('All');
	});

	natureFilter.addEventListener('click', () => {
		renderGallery('Nature');
	});

	cityFilter.addEventListener('click', () => {
		renderGallery('City');
	});

	abstractFilter.addEventListener('click', () => {
		renderGallery('Abstract');
	});

	// Add event listeners to other buttons
	
	// Sorting functionality
	sortBy.addEventListener('change', () => {
		// Get selected option from the drop-down list sortBy
		sortation = sortBy.value
		// Sort the array images according to the selected option
		if (sortation === 'nameAsc') {
			images = images.sort(function(a, b) {
				if(a.imgName < b.imgName) { return -1; }
				if(a.imgName > b.imgName) { return 1; }
				return 0;
			})
		} else if (sortation === 'nameDesc') {
			images = images.sort(function(a, b) {
				if(a.imgName > b.imgName) { return -1; }
				if(a.imgName < b.imgName) { return 1; }
				return 0;
			})
		} else if (sortation === 'dateAsc') {
			images = images.sort(function(a, b) {
				if(a.imgDate < b.imgDate) { return -1; }
				if(a.imgDate > b.imgDate) { return 1; }
				return 0;
			})
		} else if (sortation === 'dateDesc') {
			images = images.sort(function(a, b) {
				if(a.imgDate > b.imgDate) { return -1; }
				if(a.imgDate < b.imgDate) { return 1; }
				return 0;
			})
		}
		
		// Render the gallery
		renderGallery('All');
	});

});