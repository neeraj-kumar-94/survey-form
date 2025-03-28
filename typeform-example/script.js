const pages = document.querySelectorAll('.page');
        const progressSteps = document.querySelectorAll('.step');

        let currentPage = 0;

        function showPage(pageIndex) {
            pages.forEach((page, index) => {
                page.classList.remove('active');
                if (index === pageIndex) {
                    page.classList.add('active');
                }
            });

            progressSteps.forEach((step, index) => {
                const bullet = step.querySelector('.bullet');
                if (index <= pageIndex) {
                    bullet.classList.add('active');
                } else {
                    bullet.classList.remove('active');
                }
            });
        }

        function validatePage(page) {
            const fields = page.querySelectorAll('[required]');
            const alert = page.querySelector('.alert');
            let isValid = true;

            fields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                }
            });

            if (!isValid) {
                alert.textContent = 'Please fill in all required fields.';
                alert.className = 'alert error';
                return false;
            }

            if (alert) {
                alert.style.display = 'none';
            }
            return true;
        }

        document.querySelectorAll('.next').forEach(button => {
            button.addEventListener('click', () => {
                if (validatePage(pages[currentPage])) {
                    currentPage++;
                    showPage(currentPage);
                }
            });
        });

        document.querySelectorAll('.prev').forEach(button => {
            button.addEventListener('click', () => {
                currentPage--;
                showPage(currentPage);
            });
        });

        document.querySelector('.submit').addEventListener('click', () => {
            if (validatePage(pages[currentPage])) {
                const formData = new FormData(document.querySelector('.form'));
                const data = Object.fromEntries(formData);
                
                // Here you would typically send the data to your server
                console.log('Form submitted:', data);
                
                const alert = pages[currentPage].querySelector('.alert');
                alert.textContent = 'Form submitted successfully!';
                alert.className = 'alert success';
                
                // Disable all form inputs and buttons after submission
                document.querySelectorAll('input, select, textarea, button').forEach(element => {
                    element.disabled = true;
                });
            }
        });