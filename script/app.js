// button active functionality 

const allBtnContainer = document.querySelector('.all-btn-container');

allBtnContainer.addEventListener('click', (e) => {
    const issueTrackerBtn = e.target.closest('button');
    if (!issueTrackerBtn) {
        return;
    }

    const buttons = allBtnContainer.querySelectorAll('button');

    buttons.forEach(button => {
        button.classList.remove('bg-[#4A00FF]', 'text-white');
        button.classList.add('bg-white', 'text-black')
    });
    issueTrackerBtn.classList.remove('bg-white', 'text-black');
    issueTrackerBtn.classList.add('bg-[#4A00FF]', 'text-white');

});

