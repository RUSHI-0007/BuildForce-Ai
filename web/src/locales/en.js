/**
 * @file en.js
 * English strings and RFQ templates.
 */

export default {
  common: {
    appName: 'BuildForce AI',
    activeSite: 'Active Site',
    allSites: 'All Sites',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    preview: 'Preview'
  },
  agents: {
    hubTitle: 'Agent Team Hub',
    capture: 'Capture AI',
    scheduler: 'Scheduler & PM AI',
    procurement: 'Procurement & RFQ AI',
    cash: 'Cash & Bills AI',
    client: 'Client Updates AI',
    coordinator: 'Coordinator AI'
  },
  rfq: {
    greeting: (dealerName) => `Hello ${dealerName},`,
    inquiry: (siteName, location) => `Please quote your best rate including transport & GST for delivery at ${siteName} (${location}):`,
    closing: 'Payment Terms: As per agreed credit cycle. Please confirm delivery timeline.\n- Sent via BuildForce AI'
  }
};
