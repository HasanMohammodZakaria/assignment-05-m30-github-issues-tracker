
let allIssues = [];

const allBtnContainer = document.querySelector(".all-btn-container");

const manageSpinner = (status) => {
    if (status === true) {
        document.getElementById('spinner').classList.remove('hidden');
        document.getElementById('spinner').classList.add('flex');
        document.querySelector('.card-tracker-container').classList.add('hidden');
    } else {
        document.querySelector('.card-tracker-container').classList.remove('hidden');
        document.getElementById('spinner').classList.remove('flex');
        document.getElementById('spinner').classList.add('hidden');
    };
};


allBtnContainer.addEventListener("click", (e) => {
    const issueTrackerBtn = e.target.closest("button");
    if (!issueTrackerBtn) {
        return;
    };

    const buttons = allBtnContainer.querySelectorAll("button");

    buttons.forEach((button) => {
        button.classList.remove("bg-[#4A00FF]", "text-white");
        button.classList.add("bg-white", "text-black");
    });

    issueTrackerBtn.classList.remove("bg-white", "text-black");
    issueTrackerBtn.classList.add("bg-[#4A00FF]", "text-white");

    const status = issueTrackerBtn.dataset.status;
    const filteredIssues = issuesFilter(status);
    manageSpinner(true);

    displayIssue(filteredIssues);
    countsUpdate(filteredIssues);

    manageSpinner(false);

});

const loadIssue = async () => {
    manageSpinner(true);
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues",);
    const data = await res.json();
    allIssues = data.data;
    displayIssue(allIssues);
    countsUpdate(allIssues);
    manageSpinner(false);
};

const issuesFilter = (status) => {
    if (status === "all") {
        return allIssues;
    };
    return allIssues.filter(issue => issue.status.toLowerCase() === status.toLowerCase());
};

const countsUpdate = (issues) => {
    const totalCount = issues.length;
    document.querySelector('#total-issue-count span').textContent = `${totalCount} Issues`;
};

const priorityColors = {
    HIGH: 'bg-[#FEECEC] text-[#EF4444]',
    MEDIUM: 'bg-[#FFF6D1] text-[#F59E0B]',
    LOW: 'bg-[#EEEFF2] text-[#9CA3AF]'
};

const statusBorderColors = {
    open: 'border-t-4 border-[#00A96E]',
    closed: 'border-t-4 border-[#A855F7]'
};

const displayIssue = (issues) => {

    const cardContainer = document.querySelector(".card-tracker-container");
    cardContainer.innerHTML = "";

    issues.forEach((issue) => {

        const card = document.createElement("div");
        card.dataset.id = issue.id;

        const priorityLevel = issue.priority.toUpperCase();
        const priorityLevelColors = priorityColors[priorityLevel] || 'bg-[#FEECEC] text-[#EF4444]';
        const statusKey = issue.status.trim().toLowerCase();
        const statusColor = statusBorderColors[statusKey] || 'border-t-4 border-[#00A96E]';

        const statusImg = issue.status === 'open' ? './assets/Open-Status.png' : './assets/Closed-Status.png';


        const dateOnly = new Date(issue.createdAt).toLocaleDateString("en-US");

        card.className = `card-tracker bg-white drop-shadow-sm rounded-lg ${statusColor}`;

        card.innerHTML = `
                    <div class="p-5 space-y-3">
                        <div class="flex justify-between">
                            <img src="${statusImg}" alt="">
                            <div class="w-20 h-6 badge text-sm font-medium p-2 ${priorityLevelColors}">
                            ${priorityLevel}</div>
                        </div>
                        <h3 class="text-[14px] font-semibold text-[#1F2937]">${issue.title}</h3>
                        <p class="text-[12px] text-[#64748B]">${issue.description}</p>

                        <div class="level-container flex gap-2 flex-wrap">
                            ${labelStyle(issue.labels)}
                        </div>
                    </div>


                    <hr class="w-full border-gray-100 ">
                    
                    <div class="p-5">
                        <p class="text-[12px] text-[#64748B]">#1by ${issue.author}</p>
                        <p class="text-[12px] text-[#64748B]">
                        ${dateOnly}</p>
                    </div>

        `;

        cardContainer.appendChild(card);

    });
};


const issuesContainer = document.getElementById('card-container');
issuesContainer.addEventListener('click', (e) => {
    const cardTracker = e.target.closest('.card-tracker');
    if (!cardTracker) {
        return;
    };

    const id = cardTracker.dataset.id;

    loadIssueDetail(id);
});

const loadIssueDetail = async (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;

    const res = await fetch(url);
    const details = await res.json();
    displayIssueDetail(details.data);

}

const labelStyle = (labels) => {
    return labels.map((label, index) => {
        const value = label.toUpperCase();

        let bg = '';
        let text = '';
        let border = '';
        let icon = '';

        if (index === 0) {
            text = 'text-[#EF4444]';
            bg = 'bg-[#FEECEC]';
            border = 'border-[#FECACA]';
            icon = `<i class="fa-solid fa-bug"></i>`;
        }

        if (index === 1) {
            text = 'text-[#D97706]';
            bg = 'bg-[#FFF8DB]';
            border = 'border-[#FDE68A]';
            icon = `<i class="fa-regular fa-life-ring"></i>`;
        }

        if (value === 'ENHANCEMENT') {
            if (index === 0) {
                text = 'text-[#00A96E]';
                bg = 'bg-[#DEFCE8]';
                border = 'border-[#BBF7D0]';
                icon = `<i class="fa-solid fa-paperclip"></i>`;
            } else if (index === 1) {
                text = 'text-[#007A50]';
                bg = 'bg-[#D0F7E3]';
                border = 'border-[#86EFAC]';
                icon = `<i class="fa-solid fa-paperclip"></i>`;
            }
        }

        return `
            <button class="${text} ${bg} border ${border} text-[12px] font-medium px-4 py-2 rounded-4xl flex items-center gap-1">
                ${icon} ${value}
            </button>
        `;
    }).join('');
};

const statusBgColors = {
    open: 'bg-[#00A96E] text-white',
    closed: 'bg-[#A855F7] text-white'
};

const displayIssueDetail = (issue) => {
    console.log(issue);


    const bgStatusColor = statusBgColors[issue.status.toLowerCase()] || 'bg-[#00A96E] text-white';

    const dateOnly = new Date(issue.createdAt).toLocaleDateString("en-US");

    const priorityLevel = issue.priority.toUpperCase();
    const priorityBgColors = priorityColors[priorityLevel] || 'bg-[#FEECEC] text-[#EF4444]';


    const detailsBox = document.getElementById('details-container');
    detailsBox.innerHTML = `
                    <div class="">
                        <h2 class="text-6 text-[#1F2937] font-bold">${issue.title}</h2>
                    </div>
                    <div class="flex items-center gap-2">
                        <button class="bg-[#00A96E] text-white px-4 py-2 rounded-4xl ${bgStatusColor}">${issue.status}</button>
                        <p class="text-[12px] text-[#64748B]">
                            <i class="fa-solid fa-circle text-[8px]"></i>
                            Opened by ${issue.assignee}
                        </p>
                        <p class="text-[12px] text-[#64748B]">
                            <i class="fa-solid fa-circle text-[8px]"></i>
                            ${dateOnly}
                        </p>
                    </div>
                    <div class="level-container flex gap-2 flex-wrap">
                       ${labelStyle(issue.labels)}
                        
                    </div>
                    <p class="text-[12px] text-[#64748B]">
                        ${issue.description}
                    </p>
                    <div class="bg-[#F8FAFC] p-4 rounded-lg flex ">
                        <div class="w-1/2 flex flex-col">
                            <p class="text-4 text-[#64748B]">Assignee:</p>
                            <h4 class="text-4 text-[#1F2937] font-semibold">${issue.assignee ? issue.assignee : N / A}</h4>
                        </div>
                        <div class="w-1/2">
                            <p class="text-4 text-[#64748B]">Priority:</p>
                            <div class="w-20 h-6 badge text-3 p-2 rounded-4xl ${priorityBgColors}">
                                ${priorityLevel}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-action">
                    <form method="dialog">
                        <!-- if there is a button in form, it will close the modal -->
                        <button class="btn bg-[#4A00FF] text-white">Close</button>
                    </form>
                </div>


    `;
    document.getElementById('issue_modal').showModal();
}

loadIssue();

const searchBtn = document.getElementById('btn-search');
searchBtn.addEventListener('click', () => {
    const searchInput = document.getElementById('input-search');
    const searchValue = searchInput.value.trim().toLowerCase();

    manageSpinner(true);

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
        .then((res) => res.json())
        .then((data) => {
            displayIssue(data.data);
            manageSpinner(false);
        });

});






