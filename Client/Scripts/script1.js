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
                        <td>${item.quantita}</td>
                        <td>
                            <button class="btn btn-outline-success text-right" onclick="elimina('${item.codice}')">
                                <i class="fa-solid fa-plus"></i>
                            </button>
                            <button class="btn btn-outline-success text-right" onclick="elimina('${item.codice}')">
                                <i class="fa-solid fa-minus"></i>
                            </button>
                        </td>
                        <td>${item.categoria}</td>
                        <td>${item.dataCreazione}</td>
                        <td>
                             <img  src='${item.foto}' width="50" height="50" alt='immagine bacchetta' />
                        </td>
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


const salvaElemento = () => {
    let nome = $("#input-nome").val();
    let descrizione = $("#input-descrizione").val();
    let prezzo = $("#input-prezzo").val();
    let quantita = $("#input-quantita").val();
    let categoria = $("#input-categoria").val();
    let foto = $("#input-foto").val();

    $.ajax(
        {
            url: URL,
            type: "POST",
            data: JSON.stringify({
                nome: nome,
                categoria: categoria,
                descrizione: descrizione,
                prezzo: prezzo,
                quantita: quantita,
              
                foto: foto
            }),
            contentType: "application/json",
            dataType: "json",
            success: function(){
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
    
    }
)


//https://res.cloudinary.com/rsc/image/upload/b_rgb:FFFFFF,c_pad,dpr_2.625,f_auto,h_214,q_auto,w_380/c_pad,h_214,w_380/Y1829692-01?pgw=1