using Gestione_ferramenta.Models;
using System.Xml.Schema;

namespace Gestione_ferramenta.Repositories
{
    public class ProdottoRepo : IRepo<Prodotto>
    {

        private static ProdottoRepo? _istance;

        public static ProdottoRepo getInstace()
        {
            if (_istance == null)
            {
                _istance = new ProdottoRepo();
            }
            return _istance;
        }

        private ProdottoRepo() { }

        public bool Delete(int id)
        {
            bool risultato = false;
            using(DbGestioneFerramentaContext ctx = new DbGestioneFerramentaContext())
            {
                try
                {
                    Prodotto prod = ctx.Prodottos.Single(p => p.ProdottoId == id);
                    ctx.Prodottos.Remove(prod);
                    ctx.SaveChanges();
                    risultato = true;
                }
                catch  (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }
            return risultato;
        }

        public List<Prodotto> GetAll()
        {
            List<Prodotto> elenco = new List<Prodotto> ();
            using(DbGestioneFerramentaContext ctx = new DbGestioneFerramentaContext())
            {
                elenco = ctx.Prodottos.ToList();
            }
            return elenco;
        }

        public Prodotto? GetById(int id)
        {
            Prodotto? prod = null;
            using (DbGestioneFerramentaContext ctx = new DbGestioneFerramentaContext())
            {
                prod = ctx.Prodottos.FirstOrDefault(p => p.ProdottoId == id);

            }
            return prod;
        }

        public bool Insert(Prodotto t)
        {
            bool risultato = false;
            using (DbGestioneFerramentaContext ctx = new DbGestioneFerramentaContext())
            {
                try
                {
                    ctx.Prodottos.Add(t);
                    ctx.SaveChanges();
                    risultato = true;
                }
                catch (Exception ex)
                {

                    Console.WriteLine(ex.Message);
                }
            }
            return risultato;
        }

        public bool Update(Prodotto t)
        {
            bool risultato = false;
            using (DbGestioneFerramentaContext ctx = new DbGestioneFerramentaContext())
            {
                try
                {
                    Prodotto prod = ctx.Prodottos.Single(p => p.Codice == t.Codice);
                    t.ProdottoId = prod.ProdottoId;
                    t.Nome = t.Nome is not null ? t.Nome : prod.Nome;
                    t.Categoria = t.Categoria is not null ? t.Categoria : prod.Categoria;
                    t.Descrizione = t.Descrizione is not null ? t.Descrizione : prod.Descrizione;
                    t.Prezzo = t.Prezzo==0 ? prod.Prezzo : t.Prezzo;
                    t.Quantita = t.Quantita is null ? prod.Quantita : t.Quantita;
                    t.DataCreazione = prod.DataCreazione;

                    ctx.Entry(prod).CurrentValues.SetValues(t);
                    ctx.SaveChanges();

                    risultato = true;
                }
                catch (Exception ex)
                {

                    Console.WriteLine(ex.Message);
                }
            }

            return risultato;
                
        }

        public Prodotto? GetByCodice(string codice)
        {
            Prodotto? prod = null;
            using(DbGestioneFerramentaContext ctx = new DbGestioneFerramentaContext())
            {
                prod =  ctx.Prodottos.FirstOrDefault(p => p.Codice == codice);

            }

            return prod;
        }
    }
}
