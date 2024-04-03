let URL = "https://localhost:7142/api/prodotti";

const stampaTabella = () => {
    $.ajax(
        {
            url:URL,
            type: "GET",
            success: function(risultato){
                let contenuto = "";

                for(let[idx,item] of risultato.entries()){
                    contenuto += `
                    <tr>
                        <td>${idx +1}</td>
                        <td>${item.nome}</td>
                        <td>${item.descrizione}</td>
                        <td>${item.prezzo}</td>
                        <td >
                            <div class="aggiorna">
                                <div>${item.quantita}</div>
                                <div>
                                <button class="btn btn-outline-success text-right" onclick="aggiorna('${item.codice}', '+')">
                                    <i class="fa-solid fa-plus"></i>
                                </button>
                                <button class="btn btn-outline-success text-right" onclick="aggiorna('${item.codice}', '-')">
                                    <i class="fa-solid fa-minus"></i>
                                </button>
                                </div>
                            </div>
                        </td>
                        <td>${item.categoria}</td>
                        <td>${item.dataCreazione}</td>
                        <td>
                            <button class="btn btn-outline-danger text-right" onclick="elimina('${item.codice}')">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </td>

                    </tr>
                    `;
                }
                $("#corpo-tabella").html(contenuto);
            },
            error: function(errore){
                alert("ERRORE");
                console.log(errore);
            }

        }
    );
}

const elimina = (codice) => {
    $.ajax(
        {
            url: "https://localhost:7142/api/prodotti/codice/" + codice,
            type: "POST",
            success: function(){
                alert("Eliminato");
                stampaTabella();

            },
            error: function(errore){
                alert("ERRORE");
                console.log(errore);
            }
        }
    )
}


const aggiorna = (codice, operazione) => {
    const quantitaModificata = operazione === '+' ? 12 : -12;

    $.ajax({
        url: `https://localhost:7142/api/prodotti/codice/${codice}?quantitaModificata=${quantitaModificata}`,
        type: "PUT",
        success: function() {
            alert("Quantità del prodotto aggiornata con successo.");
            stampaTabella();
        },
        error: function(errore) {
            alert("Errore durante l'aggiornamento della quantità del prodotto.");
            console.log(errore);
        }
    });
}



const salvaElemento = () => {
    let nom = $("#input-nome").val();
    let des = $("#input-descrizione").val();
    let pre = $("#input-prezzo").val();
    let qua = $("#input-quantita").val();
    let cat = $("#input-categoria").val();


    $.ajax(
        {
            url: URL,
            type: "POST",
            data: JSON.stringify({
                nome: nom,
                categoria: cat,
                descrizione: des,
                prezzo: pre,
                quantita: qua,
            }),
            contentType: "application/json",
            dataType: "json",
            success: function(){
                console.log(response.responseJSON);
                alert("isnerito");
                stampaTabella();
            },
            error: function(errore){
                alert("ERRORE");
                console.log(errore)
            }
        }
    )
}

$(document).ready(
    function(){
        stampaTabella();
        $(".salva").on("click", () => {
            salvaElemento();
        })

        // $("#searchInput").keyup(function() {
        //     let ricercaVal = $(this).val().toLowerCase();
        //     $("#corpo-tabella tr").filter(function() {
        //         $(this).toggle($(this).text().toLowerCase().indexOf(ricercaVal) > -1);
        //     });
        // });

        $("#searchInput").keyup(function() {
            console.log("Tasto rilasciato nell'input di ricerca");
        
            
            let ricercaVal = $(this).val().toLowerCase(); //prendo valore input
            console.log("Valore della ricerca:", ricercaVal);
        
            
            $("#corpo-tabella tr").filter(function() { //seleziono tutte le righe tr
          
                let rowText = $(this).text().toLowerCase(); //metto testo in minusc.
                console.log("Testo della riga corrente:", rowText);
        
                let isVisible = rowText.indexOf(ricercaVal) > -1;//controllo se lascio la riga visibile  o lanascondo
                console.log("La riga è visibile?", isVisible);
        
                
                $(this).toggle(isVisible); //mostra risultato

                let righeVisibili = $("#corpo-tabella tr:visible").length;

                // Se non ci sono righe visibili, mostra un messaggio
                if (righeVisibili === 0) {
                    $("#messaggioRisultati p").text("Mi dispiace, nessun risultato trovato."); // Imposta il testo
                    $("#messaggioRisultati").show(); // Mostra l'elemento
                } else {
                    $("#messaggioRisultati").hide(); // Nascondi l'elemento se ci sono risultati
                }
            });
        });
        
    
    }
    
)


