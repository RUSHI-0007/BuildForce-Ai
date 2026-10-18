/**
 * @file invoiceAudit.js
 * Pure 3-way invoice matching and discrepancy audit engine.
 * Free of React, DOM, HTTP or database dependencies.
 */

/**
 * 3-Way Invoice Audit: PO vs Delivery Challan vs Invoice.
 * @param {Object} invoice 
 * @param {Object} [purchaseOrder] 
 * @param {Object} [delivery] 
 * @param {Object} [toleranceConfig] 
 * @returns {Object} Audit result with payable amount, held amount, and discrepancy items
 */
export function auditInvoice3Way(invoice, purchaseOrder = null, delivery = null, toleranceConfig = {}) {
  const priceTolerancePct = toleranceConfig.priceTolerancePct ?? 2.0; // 2% tolerance
  const discrepancies = [];

  let poMatched = false;
  let deliveryMatched = false;

  const invoiceAmount = Number(invoice.total || invoice.amount || 0);
  let approvedPayable = invoiceAmount;
  let amountHeld = 0;

  // 1. Check PO reference
  if (purchaseOrder) {
    poMatched = true;
    const poTotal = Number(purchaseOrder.total || purchaseOrder.amount || 0);
    const variancePct = poTotal > 0 ? Math.abs((invoiceAmount - poTotal) / poTotal) * 100 : 0;

    if (variancePct > priceTolerancePct && invoiceAmount > poTotal) {
      const overcharge = invoiceAmount - poTotal;
      discrepancies.push({
        type: 'PRICE_VARIANCE',
        severity: 'HIGH',
        message: `Invoice exceeds PO by ₹${overcharge.toLocaleString('en-IN')} (${variancePct.toFixed(1)}% vs max allowed ${priceTolerancePct}%)`,
        amount: overcharge
      });
      amountHeld += overcharge;
      approvedPayable -= overcharge;
    }
  } else {
    discrepancies.push({
      type: 'MISSING_PO',
      severity: 'MEDIUM',
      message: 'No matching Purchase Order found for this invoice.'
    });
  }

  // 2. Check Delivery Challan reference
  if (delivery) {
    deliveryMatched = true;
    // Check lines quantity match if detailed lines provided
    if (invoice.lines && delivery.lines) {
      invoice.lines.forEach((invLine, idx) => {
        const delLine = delivery.lines.find(dl => dl.material_id === invLine.material_id) || delivery.lines[idx];
        if (delLine && Number(invLine.qty) > Number(delLine.qty)) {
          const shortQty = Number(invLine.qty) - Number(delLine.qty);
          const shortAmount = shortQty * Number(invLine.rate || 0);
          discrepancies.push({
            type: 'SHORT_DELIVERY',
            severity: 'HIGH',
            message: `Billed for ${invLine.qty} units but challan shows ${delLine.qty} received (Short: ${shortQty} units)`,
            amount: shortAmount
          });
          amountHeld += shortAmount;
          approvedPayable -= shortAmount;
        }
      });
    }
  } else {
    discrepancies.push({
      type: 'MISSING_DELIVERY',
      severity: 'HIGH',
      message: 'No delivery challan linked to verify physical goods inward.'
    });
  }

  approvedPayable = Math.max(0, approvedPayable);

  return {
    invoiceId: invoice.id || invoice.invoice_no,
    invoiceAmount,
    approvedPayable,
    amountHeld,
    status: discrepancies.length === 0 ? 'CLEAN_MATCH' : (approvedPayable > 0 ? 'PARTIAL_HOLD' : 'REJECTED'),
    poMatched,
    deliveryMatched,
    discrepancies
  };
}
