const loadButtons = async () => {
    
    const url = "https://openapi.programming-hero.com/api/levels/all";
    
    const res = await fetch(url);
    const data = await res.json();

    displayButtons(data);

}

const displayButtons = (data) => {
// console.log(data.data);
const dataArray = data.data;
const buttonContainer = document.getElementById("label-container");
dataArray.forEach(level => {
// console.log(level);
const button = document.createElement("button");
button.setAttribute("id", `btn-${level.level_no}`);
console.log(button.getAttribute("id"));
button.onclick = () => {
    loadDataWords(level.level_no);
}

button.classList.add("btn", "btn-outline", "btn-primary", "btn-sm");
button.innerHTML = `
<p><i class="fa-solid fa-book-open"></i> Lesson - ${level.level_no} </p>
`
buttonContainer.appendChild(button);
}
)
}

loadButtons();

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const removeActiveBtn = () => {
const removeActive = document.getElementsByClassName("btn-active");
    for (const btn of removeActive) {
        btn.classList.remove("btn-active");
    }
};

const manageSpinner = (status) => {
    if(status === true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    }
    else {
        document.getElementById("spinner").classList.add("hidden");
        document.getElementById("word-container").classList.remove("hidden");
    }
}

const loadDataWords = async (level_no) => {
    manageSpinner(true);
    const wordsContainer = document.getElementById("word-container");
    wordsContainer.innerHTML = "";
    wordsContainer.classList.add("grid", "grid-cols-1",  "gap-5");
    const url = `https://openapi.programming-hero.com/api/level/${level_no}`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data);
    const wordsArray = data.data;
    removeActiveBtn();

    // manageSpinner(false);
    
    const clickBtn = document.getElementById(`btn-${level_no}`);
    clickBtn.classList.add("btn-active");
    if (!wordsArray.length) {
        // console.log(wordsArray.length , wordsArray.length === 0);
        const div = document.createElement("div");
        div.classList.add("py-15", "text-center", "space-y-2", "gap-4", "flex", "flex-col", "justify-center");
        wordsContainer.classList.remove("sm:grid-cols-2", "lg:grid-cols-3");
        div.innerHTML = `
        <div class="flex justify-center">
        <img src="./assets/alert-error.png" alt="">
        </div>
                <p class="text-[#79716B] text-sm font-bangla"> এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি। </p>
                <h2 class="font-bangla font-medium text-3xl">নেক্সট Lesson এ যান</h2>
                `
                wordsContainer.appendChild(div);
            }
    else {
        wordsArray.forEach(word => {
        // console.log(word);
        wordsContainer.classList.add("sm:grid-cols-2", "lg:grid-cols-3");
        const div = document.createElement("div");
        div.classList.add("bg-white", "rounded-xl", "space-y-4", "py-10", "px-10");
        div.innerHTML = `
 
        
        <h2 class="text-2xl font-bold text-center">${word.word? word.word : "শব্দ পাওয়া যায়নি"}</h2>
        <p class="font-medium text-xl text-center">Meaning /Pronounciation</p>
        <h3 class="font-bangla text-2xl font-semibold text-center mb-12">${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"}</h3>
        <div class="flex justify-between">
        
        <button onclick="LoadWordDetails(${word.id})" class="btn h-12 w-12 flex justify-center items-center text-xl bg-gray-100 rounded-lg hover:bg-gray-200"><i class="fa-solid fa-circle-info"></i></button>
        <button onclick="pronounceWord('${word.word}')" class="btn h-12 w-12 flex justify-center items-center text-xl bg-gray-100 rounded-lg"><i class="fa-solid fa-volume-high"></i></button>
        </div>
        
        `
        wordsContainer.appendChild(div);
    }
    
    
    
    
)
}
manageSpinner(false);

}

const LoadWordDetails = async (wordId) => {
    const url = `https://openapi.programming-hero.com/api/word/${wordId}`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data);
    const wordDetails = data.data;
        displayWordDetails(wordDetails);
}

const displayWordDetails = (wordDetails) => {
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = "";
    let html = `
    <h3 class="text-3xl font-bold">${wordDetails.word} (<i class="fa-solid fa-microphone-lines"></i> : ${wordDetails.pronunciation})</h3>
    <div class="space-y-2">
        <h3 class="text-xl font-semibold">Meaning</h3>
        <p class="font-bangla text-xl font-medium">${wordDetails.meaning}</p>
    </div>
    <div class="space-y-2">
        <h3 class="text-xl font-semibold">Example</h3>
        <p class="font-bangla text-xl font-medium">${wordDetails.sentence}</p>
    </div>
    
    <h3 class="font-bangla font-medium text-xl">সমার্থক শব্দ গুলো</h3>
    <div class="flex flex-wrap flex-row gap-3 -mt-3"> 
  
   
    `;
    wordDetails.synonyms.forEach((synonym) => {
        html += `
        <p class="border border-gray-300 px-4 py-2 rounded-md  bg-gray-100 text-sm ">${synonym}</p>
        `

    });

    html += `   
 </div> `;
    detailsContainer.innerHTML = html;
    document.getElementById('my_modal_5').showModal();


}
document.getElementById('btn-search').addEventListener('click', function() {
    const searchInput = document.getElementById('input-search').value.trim().toLowerCase();

    manageSpinner(true);
    removeActiveBtn();

    fetch('https://openapi.programming-hero.com/api/words/all')
    .then(response => response.json())
    .then(data => {
        const allWords = data.data;

        const filteredWords = allWords.filter(word =>
            word.word.toLowerCase().includes(searchInput)
        );

        const wordContainer = document.getElementById('word-container');
        wordContainer.innerHTML = '';
        wordContainer.classList.add("grid", "grid-cols-1", "gap-5");

        if (filteredWords.length === 0) {
            wordContainer.innerHTML = '<p class="text-center text-gray-500"></p> <p class="text-center text-gray-500">No words found.</p>';
        } else {
            wordContainer.classList.add("sm:grid-cols-2", "lg:grid-cols-3");

            filteredWords.forEach(word => {
                const div = document.createElement('div');
                div.classList.add('bg-white', 'rounded-xl', 'space-y-4', 'py-10', 'px-10');

                div.innerHTML = `
                    <h2 class="text-2xl font-bold text-center">${word.word || "শব্দ নাই"}</h2>
                    <p class="font-medium text-xl text-center">Meaning /Pronunciation</p>
                    <h3 class="font-bangla text-2xl font-semibold text-center mb-12">
                        ${word.meaning || "অর্থ নাই"} / ${word.pronunciation || "উচ্চারণ নাই"}
                    </h3>
                    <div class="flex justify-between">
                        <button onclick="LoadWordDetails(${word.id})" class="btn h-12 w-12 flex justify-center items-center text-xl bg-gray-100 rounded-lg hover:bg-gray-200">
                            <i class="fa-solid fa-circle-info"></i>
                        </button>
                        <button onclick="pronounceWord('${word.word}')" class="btn h-12 w-12 flex justify-center items-center text-xl bg-gray-100 rounded-lg">
                            <i class="fa-solid fa-volume-high"></i>
                        </button>
                    </div>
                `;

                wordContainer.appendChild(div);
            });
        }

        manageSpinner(false);
    });
});

// we can follow another method to load the details of a word displayWordDetails. We can use map. We can built a function that will take synonyms and using map it will manipulates the data and return the html. Then we can call that function in the displayWordDetails function. 