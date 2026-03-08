
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
    return allIssues.filter(issue => issue.status === status);
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
    OPEN: 'border-t-4 border-[#00A96E]',
    CLOSED: 'border-t-4 border-[#A855F7]'
};

const displayIssue = (issues) => {
    //console.log(issues);
    const cardContainer = document.querySelector(".card-tracker-container");
    cardContainer.innerHTML = "";

    issues.forEach((issue) => {
        console.log(issue);
        const card = document.createElement("div");

        const priorityLevel = issue.priority.toUpperCase();
        const priorityLevelColors = priorityColors[priorityLevel] || 'bg-[#FEECEC] text-[#EF4444]';
        const statusColor = statusBorderColors[issue.status.toUpperCase()] || 'border-t-4 border-[#00A96E]';

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

loadIssue();




