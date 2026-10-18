/**
 * @file procurement.js
 * Pure stock runout forecasting, WhatsApp RFQ drafting, and quote ranking engine.
 * Free of React, DOM, HTTP or database dependencies.
 */

/**
 * Calculates days of stock cover remaining for site materials based on outward burn rate.
 * @param {Array<Object>} materials 
 * @param {Array<Object>} materialTransactions 
 * @param {number} [burnWindowDays=14] 
 * @returns {Array<Object>} Material runout metrics
 */
export function calculateStockCover(materials = [], materialTransactions = [], burnWindowDays = 14) {
  const windowDays = Math.max(1, burnWindowDays);

  return materials.map(mat => {
    const inStock = Number(mat.in_stock || 0);
    const minThreshold = Number(mat.min_threshold || 0);

    // Sum outward transactions for this material
    const outwards = (materialTransactions || [])
      .filter(tx => tx.material_id === mat.id && (tx.type === 'OUTWARD' || tx.type === 'CONSUMED'))
      .reduce((sum, tx) => sum + Number(tx.quantity || 0), 0);

    // Average daily burn
    const dailyBurnRate = outwards > 0 ? (outwards / windowDays) : (minThreshold / 7);
    const daysRemaining = dailyBurnRate > 0 ? Math.floor(inStock / dailyBurnRate) : 999;
    const isShortage = inStock <= minThreshold || daysRemaining <= 3;

    return {
      materialId: mat.id,
      name: mat.name,
      unit: mat.unit || 'Units',
      inStock,
      minThreshold,
      dailyBurnRate: Number(dailyBurnRate.toFixed(2)),
      daysRemaining,
      isShortage,
      recommendedOrderQty: isShortage ? Math.max(minThreshold * 2, minThreshold - inStock + 50) : 0
    };
  });
}

/**
 * Generates a clean multilingual WhatsApp RFQ message string.
 * @param {Object} params
 * @param {string} params.dealerName
 * @param {string} params.siteName
 * @param {string} params.location
 * @param {Array<{ name: string, qty: number, unit: string }>} params.items
 * @param {'en'|'hi'|'mr'} [params.lang='en']
 * @returns {string} Text formatted for WhatsApp sharing
 */
export function buildWhatsAppRfq({ dealerName, siteName, location, items = [], lang = 'en' }) {
  const itemList = items.map((it, i) => `${i + 1}. ${it.name} - ${it.qty} ${it.unit}`).join('\n');

  if (lang === 'mr') {
    return `नमस्कार ${dealerName} जी,\n` +
      `आम्हाला ${siteName} (${location}) साठी खालील साहित्याचे दर कोटेशन हवे आहेत:\n\n` +
      `${itemList}\n\n` +
      `कृपया वाहतूक (Transport) आणि GST सह अंतिम दर आणि पोहोच वेळ कळवावी.\n` +
      `- BuildForce AI द्वारे पाठवले`;
  }

  if (lang === 'hi') {
    return `नमस्ते ${dealerName} जी,\n` +
      `हमें ${siteName} (${location}) साइट के लिए निम्नलिखित सामग्री का कोटेशन चाहिए:\n\n` +
      `${itemList}\n\n` +
      `कृपया ट्रांसपोर्ट और GST सहित फाइनल रेट और डिलीवरी टाइम बताएं।\n` +
      `- BuildForce AI द्वारा प्रेषित`;
  }

  return `Hello ${dealerName},\n` +
    `Please quote your best rate including transport & GST for delivery at ${siteName} (${location}):\n\n` +
    `${itemList}\n\n` +
    `Payment Terms: As per agreed credit cycle. Please confirm delivery timeline.\n` +
    `- Sent via BuildForce AI`;
}

/**
 * Calculates landed cost and ranks dealer quotes based on price, transport, and credit terms.
 * @param {Array<Object>} quotes 
 * @param {number} [costOfMoneyPctPa=15] - 15% annual cost of capital for cash discount comparison
 * @returns {Array<Object>} Ranked quotes
 */
export function rankDealerQuotes(quotes = [], costOfMoneyPctPa = 15) {
  return quotes.map(quote => {
    const basePrice = Number(quote.price || quote.rate || 0);
    const transport = Number(quote.transport || 0);
    const unloading = Number(quote.unloading || 0);
    const creditDays = Number(quote.creditDays || quote.credit_days || 0);

    // Credit value: 30 days credit is worth (30/365 * costOfMoneyPctPa)% of base price
    const creditBenefit = (basePrice * (creditDays / 365) * (costOfMoneyPctPa / 100));
    const effectiveLandedCost = basePrice + transport + unloading - creditBenefit;

    return {
      ...quote,
      basePrice,
      transport,
      unloading,
      creditDays,
      creditBenefit: Number(creditBenefit.toFixed(2)),
      effectiveLandedCost: Number(effectiveLandedCost.toFixed(2))
    };
  }).sort((a, b) => a.effectiveLandedCost - b.effectiveLandedCost);
}
