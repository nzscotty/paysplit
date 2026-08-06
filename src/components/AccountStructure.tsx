import {
  CreditCard,
  Home,
  PiggyBank,
  TrendingDown,
  Wallet,
} from "lucide-react";

const accounts = [
  {
    icon: Wallet,
    name: "Pay account",
    description:
      "Your pay comes in here. Consistent bills go out from here too: rent or mortgage, insurance, power, internet, phone, and other fixed commitments.",
    tone: "coral",
    target: "60% starting point",
  },
  {
    icon: CreditCard,
    name: "Card account",
    description:
      "Everyday spending only. Pay should not come here: give yourself a pay-period allowance instead of access to the full cash pool. That friction makes spending more visible and limits the damage if your card is stolen.",
    tone: "gold",
  },
  {
    icon: TrendingDown,
    name: "Debt buster account",
    description:
      "Use this to get rid of debt as fast as possible, especially high-interest debt. A 20% allocation is a strong default while there is expensive debt to clear. once your debts are gone, you can move more into your long term and short term accounts. keep this account around $2000 for emergencies once debt is gone. ",
    tone: "violet",
    target: "20% starting point",
  },
  {
    icon: PiggyBank,
    name: "Short term account",
    description:
      "Save for near-term goals such as new shoes or a holiday. A 10% allocation is a simple starting point for building those plans. This account lets you still spend money on fun things, so the saving doesnt feel like a punishment. ",
    tone: "green",
    target: "10% starting point",
  },
  {
    icon: Home,
    name: "Long term account",
    description:
      "Save for bigger goals such as a house or car. A 10% allocation gives long-term plans a regular place in your pay.",
    tone: "blue",
    target: "10% starting point",
  },
];

export function AccountStructure() {
  return (
    <div className="account-grid">
      {accounts.map(
        ({ icon: Icon, name, description, tone, target }, index) => (
          <article className={`account-card tone-${tone}`} key={name}>
            <div className="account-card-topline">
              <span className="account-icon" aria-hidden="true">
                <Icon size={20} strokeWidth={1.8} />
              </span>
              <span className="account-card-number">0{index + 1}</span>
            </div>
            <h3>{name}</h3>
            {target ? <span className="account-target">{target}</span> : null}
            <p>{description}</p>
          </article>
        ),
      )}
    </div>
  );
}
