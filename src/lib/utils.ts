export const NGN_RATE = 1500; // 1 USD = 1500 NGN

/** Your number for private DMs: verify payment (marketplace) and submit account request (Sell to Us) */
export const WHATSAPP_PRIVATE_NUMBER = "2348169925603";
export const WHATSAPP_PRIVATE_URL = `https://wa.me/${WHATSAPP_PRIVATE_NUMBER}`;

export function formatDualPrice(usdAmount: number): string {
    const ngnAmount = usdAmount * NGN_RATE;

    // Format USD
    const usd = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(usdAmount);

    // Format NGN
    const ngn = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        maximumFractionDigits: 0
    }).format(ngnAmount);

    return `${ngn} / ${usd}`;
}

export function formatNGN(usdAmount: number): string {
    const ngnAmount = usdAmount * NGN_RATE;
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        maximumFractionDigits: 0
    }).format(ngnAmount);
}
