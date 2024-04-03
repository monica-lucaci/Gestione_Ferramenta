using Gestione_ferramenta.Models;
using Gestione_ferramenta.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Gestione_ferramenta.Controllers
{
    [ApiController]
    [Route("api/prodotti")]
    public class ProdottoController : Controller
    {
        [HttpGet]
        public IActionResult ElencoProdotti()
        {
            return Ok(ProdottoRepo.getInstace().GetAll());
        }
        [HttpGet("{valCodice}")]
        public IActionResult DettaglioProdotto(string valCodice)
        {
            Prodotto? prod = ProdottoRepo.getInstace().GetByCodice(valCodice);
            if (prod is not null)
                return Ok(prod);

            return NotFound();
        }

        [HttpPost]
        //public IActionResult InserisciProdotto(Prodotto objProd)
        //{
        //    if (ProdottoRepo.getInstace().Insert(objProd))
        //        return Ok();

        //    return BadRequest();
        //}

        [HttpPost]
        public IActionResult InserisciProdotto(Prodotto objProd)
        {
            Prodotto? existingProd = ProdottoRepo.getInstace().GetByCodice(objProd.Codice);
            if (existingProd is not null)
            {
                existingProd.Quantita += objProd.Quantita;
                if (ProdottoRepo.getInstace().Update(existingProd))
                    return Ok();
            }
            else
            {
                if (ProdottoRepo.getInstace().Insert(objProd))
                    return Ok();
            }

            return BadRequest();
        }



        //[HttpDelete("{id}")]
        private IActionResult EliminaProdottoPerID(int id)
        {
            if (ProdottoRepo.getInstace().Delete(id))
                return Ok();

            return BadRequest();
        }

        //Elimina per codice

        [HttpDelete("codice/{varCodice}"), HttpPost("codice/{varCodice}")]
        public IActionResult EliminaProdottoPerCodice(string varCodice)
        {
            Prodotto? prod = ProdottoRepo.getInstace().GetByCodice(varCodice);
            if (prod is null)
                return BadRequest();

            return EliminaProdottoPerID(prod.ProdottoId);
        }

        [HttpPut]
        public IActionResult ModificaProdotto(Prodotto objProd)
        {
            if (ProdottoRepo.getInstace().Update(objProd))
                return Ok();

            return BadRequest();
        }

        [HttpPut("codice/{varCodice}")]
        public IActionResult ModificaQuantitaProd(string varCodice, [FromQuery] int quantitaModificata)
        {
            Prodotto? prod = ProdottoRepo.getInstace().GetByCodice(varCodice);
            if (prod is null)
            {
                return BadRequest("Il prodotto non è stato trovato.");
            }

            if (quantitaModificata < 0 && Math.Abs(quantitaModificata) > prod.Quantita)
            {
                return BadRequest("La quantità da rimuovere è maggiore della quantità attuale del prodotto.");
            }

            if (quantitaModificata + prod.Quantita < 0)
            {
                return BadRequest("La quantità non può essere negativa.");
            }

            prod.Quantita += quantitaModificata;

            if (ProdottoRepo.getInstace().Update(prod))
            {
                return Ok("Quantità del prodotto aggiornata con successo.");
            }

            return BadRequest("Impossibile aggiornare la quantità del prodotto.");
        }


    }

}
