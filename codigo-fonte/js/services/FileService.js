export class FileService {
	previewImage(isEdit = false) {
		const fileInputSelection = isEdit ? '#edit-event-form' : '#new-event-form';
		const fileInput = document.querySelector(
			`${fileInputSelection} .image-container input[type=file]#image`
		);
		const imagePreview = document.querySelector(
			`${fileInputSelection} .image-container #image-preview`
		);

		if (fileInput.files && fileInput.files[0]) {
			const reader = new FileReader();
			reader.onload = function (e) {
				imagePreview.src = e.target.result;
				localStorage.setItem('preview-image', e.target.result);
			};
			reader.readAsDataURL(fileInput.files[0]);
		}
	}

	async returnImageFromFieldFile() {
		return localStorage.getItem('preview-image');
	}
}

const fileService = new FileService();

export { fileService };
