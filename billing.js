import stripePackage from 'stripe';
import { calculateCost } from './libs/billing-lib.js';
import { success, failure } from './libs/response-lib.js';

export async function main(event, context) {
    const { storage, source } = JSON.parse(event.body);
    const amount = calculateCost(storage);
    const description = 'Note charge.';

    const stripe = stripePackage(process.env.stripeSecretKey);

    try {
        await stripe.charges.create({
            source,
            amount,
            description,
            currency: 'usd'
        });
        return success({ status: true });
    } catch (e) {
        return failure({ status: false });
    }
}