export function calculateCost(storage) {
    const ratePerNote = storage <= 10 ? 4 : storage <= 100 ? 2 : 1;
    // Charge $4 per note if less tha 10 notes, else 2 per note while less than 100 notes.
    // Stripe wants your total amount in pennies, so multiply by 100.
    return storage * ratePerNote * 100;
}