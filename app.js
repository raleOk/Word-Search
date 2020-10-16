const input = document.getElementById('wordInput');
const wordButton = document.getElementById ('wordButton');
const wordUlSynon = document.getElementById('synonymText');
const wordUlDef = document.getElementById('definitionText');
const synonCheckbox = document.getElementById('synonBox');
const definitionCheckbox = document.getElementById('defBox');

const fetchSynon = function() { fetch(`https://wordsapiv1.p.rapidapi.com/words/${input.value}/synonyms`, {
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
        printSynons(arrData);
    })
})
.catch((err => {
	console.log(err);
}));
};

const fetchDef = function() { fetch(`https://wordsapiv1.p.rapidapi.com/words/${input.value}/definitions`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
		"x-rapidapi-key": "113c2e81edmshb008c962ffc8e87p1d1cfbjsnd24e95b4e333"
	}
})
.then(res => {
    if (!res.ok) {
        throw Error(res.status)
    }
    res.json()
    .then(data => {
        d = data.definitions[0].definition;
        return d;
    }).then(data => {
        printDefinition(d);
    })
})
.catch(err => {
	console.log(err);
});
}

const printSynons = function () {
    removeSynons();  
    for (let word of arrData) {
        const li = document.createElement('li');
        li.innerHTML = word;
        wordUlSynon.appendChild(li);
    }
    };   

const printDefinition = function () {
    removeDef();
    const div = document.createElement('div');
    div.innerHTML = d;
    wordUlDef.appendChild(div);
};

const removeSynons = function () {
    wordUlSynon.innerHTML = "";
};

const removeDef = function () {
    wordUlDef.innerHTML = "";
};

wordButton.addEventListener('click' , function() {
    if (synonCheckbox.checked & definitionCheckbox.checked) {
        fetchSynon();
        fetchDef();
    } else { 
        if (synonCheckbox.checked) {
        fetchSynon();
        removeDef();
    } else {
        if (definitionCheckbox.checked) {
            fetchDef();
            removeSynons();
        } else {
            alert('Select one of two options');
        }
    } }
   
});     