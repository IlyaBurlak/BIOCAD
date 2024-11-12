
document.addEventListener('DOMContentLoaded', () => {
    function navigate(page) {
        const contentDiv = document.getElementById('content');
        fetch(page)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка загрузки страницы');
                }
                return response.text();
            })
            .then(html => {
                contentDiv.innerHTML = html;
            })
            .catch(error => {
                console.error(error);
                window.location.href = 'error.html';
            });
    }
})