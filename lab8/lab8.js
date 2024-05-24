document.addEventListener('DOMContentLoaded', () => {
    const dogList = document.getElementById('dogList');
    const modal = document.getElementById('modal');
    const closeButton = document.getElementById('closeButton');
  
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalSex = document.getElementById('modalSex');
    const modalAge = document.getElementById('modalAge');
    const modalDescription = document.getElementById('modalDescription');
  
    fetch('https://usersdogs.dmytrominochkin.cloud/dogs')
      .then(response => response.json())
      .then(data => {
        data.forEach(dog => {
          const dogItem = document.createElement('div');
          dogItem.classList.add('dog-item');
          dogItem.innerHTML = `
            <img src="https://usersdogs.dmytrominochkin.cloud${dog.dogImage}" alt="${dog.title}">
            <h3>${dog.title}</h3>
            <p>${dog.sex.toLowerCase()}</p>
          `;
          dogItem.addEventListener('click', () => {
            modalImage.src = `https://usersdogs.dmytrominochkin.cloud${dog.dogImage}`;
            modalTitle.textContent = dog.title;
            modalSex.textContent = `Sex: ${dog.sex}`;
            modalAge.textContent = `Age: ${dog.age}`;
            modalDescription.textContent = dog.description;
            modal.style.display = 'block';
          });
          dogList.appendChild(dogItem);
        });
      });
  
    closeButton.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  });
  