export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-ivoire pt-32 pb-24 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-serif text-5xl italic font-light text-noir mb-12">
          Mentions légales
        </h1>
        <div className="space-y-8 text-sm text-charcoal/80 leading-relaxed">
          <div>
            <h2 className="font-sans text-xs uppercase tracking-[0.2em] text-stone mb-3">
              Propriétaire du site
            </h2>
            <p>Léni Whitford — Artiste Peintre Illustratrice</p>
            <p>Contact : leni.whitford@orange.fr</p>
          </div>
          <div>
            <h2 className="font-sans text-xs uppercase tracking-[0.2em] text-stone mb-3">
              Réalisation
            </h2>
            <p>Site réalisé par Nova Agency</p>
          </div>
          <div>
            <h2 className="font-sans text-xs uppercase tracking-[0.2em] text-stone mb-3">
              Propriété intellectuelle
            </h2>
            <p>
              Toutes les œuvres présentées sur ce site sont la propriété
              exclusive de Léni Whitford. Toute reproduction, même partielle,
              est interdite sans autorisation écrite préalable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
