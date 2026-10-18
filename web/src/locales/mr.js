/**
 * @file mr.js
 * Marathi strings and RFQ templates.
 */

export default {
  common: {
    appName: 'बिल्डफोर्स AI',
    activeSite: 'सक्रिय साईट',
    allSites: 'सर्व साईट्स',
    save: 'जतन करा',
    cancel: 'रद्द करा',
    delete: 'हटवा',
    preview: 'पूर्वावलोकन'
  },
  agents: {
    hubTitle: 'एजंट टीम हब',
    capture: 'कॅप्चर AI',
    scheduler: 'शेड्यूलर आणि पीएम AI',
    procurement: 'खरेदी आणि RFQ AI',
    cash: 'कॅश आणि बिल AI',
    client: 'क्लायंट अपडेट्स AI',
    coordinator: 'समन्वयक AI'
  },
  rfq: {
    greeting: (dealerName) => `नमस्कार ${dealerName} जी,`,
    inquiry: (siteName, location) => `आम्हाला ${siteName} (${location}) साठी खालील साहित्याचे दर कोटेशन हवे आहेत:`,
    closing: 'कृपया वाहतूक (Transport) आणि GST सह अंतिम दर आणि पोहोच वेळ कळवावी.\n- BuildForce AI द्वारे पाठवले'
  }
};
