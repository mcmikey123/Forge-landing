import NutritionInput from "./NutritionInput";

const ptPains = [
  "Formulas break when you insert a row.",
  "Version history is a guessing game.",
  "The sheet doesn't work on your phone between sessions.",
];

const clientPains = [
  "Macro lookups take longer than eating the meal.",
  "Logging on the gym floor between sets.",
  "\u201CDid I already log breakfast?\u201D",
];

export default function SheetsTax() {
  return (
    <section className="sheets-tax-section" id="sheets-tax">
      <div className="wrap">
        <span className="section-eyebrow">The spreadsheet tax</span>
        <h2 className="section-title">
          Your coaching business shouldn&apos;t live in a <em>Google Sheet.</em>
        </h2>
        <p className="section-sub">
          Spreadsheets weren&apos;t built for coaching. They break when you need them, and they make your clients do the work your software should.
        </p>

        <div className="sheets-tax">
          <div className="sheets-tax-pains">
            <div className="sheets-tax-group">
              <div className="sheets-tax-group-tag">For you</div>
              <ul className="sheets-tax-list">
                {ptPains.map((p, i) => (
                  <li key={i}><span className="ic">✕</span>{p}</li>
                ))}
              </ul>
            </div>
            <div className="sheets-tax-group">
              <div className="sheets-tax-group-tag">For your clients</div>
              <ul className="sheets-tax-list">
                {clientPains.map((p, i) => (
                  <li key={i}><span className="ic">✕</span>{p}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="sheets-tax-demo">
            <NutritionInput />
            <p className="sheets-tax-caption">
              Instead of searching a dropdown, just type the meal.
            </p>
          </div>
        </div>

        <p className="sheets-tax-close">
          No formulas to break. No dropdowns to scroll.
        </p>
        <p className="sheets-tax-reassure">
          Already deep in a spreadsheet? <em>We&apos;ll import your current client data for you.</em>
        </p>
      </div>
    </section>
  );
}
