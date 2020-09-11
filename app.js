const input = document.getElementById('wordInput');
const wordButton = document.getElementById ('wordButton');
const wordUl = document.getElementById('wordList');

const fetchData = function() { fetch(`https://wordsapiv1.p.rapidapi.com/words/${input.value}/synonyms`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
		"x-rapidapi-key": "113c2e81edmshb008c962ffc8e87p1d1cfbjsnd24e95b4e333"
	}
})
.then((res) => {
    if (!res.ok) {
        throw Error(res.status)
    }
    res.json()
    .then(data => {
       arrData = data.synonyms;
       return data.synonyms;
    }).then(data => {
        printWords(arrData);
    })
})
.catch((err => {
    console.log('Error')
	console.log(err);
}));
};

const removeItems = function () {
    wordUl.innerHTML = "";  
};
    
const printWords = function () {
    removeItems();
    for (let word of arrData) {
        const li = document.createElement("li");
        li.innerHTML=word;
        wordUl.appendChild(li);
    }
    };   
    
wordButton.addEventListener('click', function() {
    fetchData();
});
