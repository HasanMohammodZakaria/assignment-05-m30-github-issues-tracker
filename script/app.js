
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
    }
}


allBtnContainer.addEventListener("click", (e) => {
    const issueTrackerBtn = e.target.closest("button");
    if (!issueTrackerBtn) {
        return;
    }

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
    console.log(data);
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
}



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
    //console.log(issues);
    const cardContainer = document.querySelector(".card-tracker-container");
    cardContainer.innerHTML = "";

    issues.forEach((issue) => {
        //console.log(issue);

        const card = document.createElement("div");
        card.dataset.id = issue.id;

        const priorityLevel = issue.priority.toUpperCase();
        const priorityLevelColors = priorityColors[priorityLevel] || 'bg-[#FEECEC] text-[#EF4444]';
        const statusKey = issue.status.trim().toLowerCase();
        const statusColor = statusBorderColors[statusKey] || 'border-t-4 border-[#00A96E]';

        //console.log("Status:", issue.status, "StatusKey:", statusKey, "StatusColor:", statusColor);

        const statusImg = issue.status === 'open' ? './assets/Open-Status.png' : './assets/Closed-Status.png';

        const labelFirst = issue.labels[0] || "";
        const labelSec = issue.labels[1] || "";
        const labelFrtUpp = labelFirst.toUpperCase();
        const labelSecUpp = labelSec.toUpperCase();

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
                            ${labelFirst ? `
                            <button
                                class="text-[#EF4444] text-[12px] font-medium bg-[#FEECEC] border border-[#FECACA] px-4 py-2 rounded-4xl">
                                <i class="fa-solid fa-bug"></i>
                                ${labelFrtUpp}
                            </button>` : ""}

                            ${labelSec ? `
                            <button
                                class="text-[#D97706] text-[12px] font-medium bg-[#FFF8DB] border border-[#FDE68A] px-4 py-2 rounded-4xl">
                                <i class="fa-chisel fa-regular fa-life-ring"></i>
                                ${labelSecUpp}
                            </button>` : ""}
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
    //my_modal_5.showModal();
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

        let text = index === 0 ? 'text-[#EF4444]' : 'text-[#D97706]';
        let border = index === 0 ? 'border-[#FECACA]' : 'border-[#FDE68A]';
        let icon = index === 0 ? `<i class="fa-solid fa-bug"></i>` : `<i class="fa-regular fa-life-ring"></i>`;

        if (value === 'ENHANCEMENT') {
            bg = 'bg-[#DEFCE8]';
            text = 'text-[#00A96E]';
            border = 'border-[#BBF7D0]';
            icon = `<i class="fa-solid fa-paperclip"></i>`;
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

    // assignee
    // : 
    // "john_doe"
    // author
    // : 
    // "security_sam"
    // createdAt
    // : 
    // "2024-01-20T09:00:00Z"
    // description
    // : 
    // "Implement JWT-based authentication with login, registration, and password reset functionality."
    // id
    // : 
    // 5
    // labels
    // : 
    // ['enhancement']
    // priority
    // : 
    // "high"
    // status
    // : 
    // "open"
    // title
    // : 
    // "Add user authentication system"
    // updatedAt
    // : 
    // "2024-01-20T09:00:00Z"

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
    //console.log(searchValue);

    // const searchUrl = 'https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q={searchText}';

    manageSpinner(true);

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
        .then((res) => res.json())
        .then((data) => {
            displayIssue(data.data);
            manageSpinner(false);
        });

});






