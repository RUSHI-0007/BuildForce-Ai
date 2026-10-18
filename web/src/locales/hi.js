/**
 * @file hi.js
 * Hindi strings and RFQ templates.
 */

export default {
  common: {
    appName: 'बिल्डफोर्स AI',
    activeSite: 'सक्रिय साइट',
    allSites: 'सभी साइटें',
    save: 'सहेजें',
    cancel: 'रद्द करें',
    delete: 'हटाएं',
    preview: 'पूर्वावलोकन'
  },
  agents: {
    hubTitle: 'एजेंट टीम हब',
    capture: 'कैप्चर AI',
    scheduler: 'शेड्यूलर और पीएम AI',
    procurement: 'खरीद और RFQ AI',
    cash: 'कैश और बिल AI',
    client: 'क्लाइंट अपडेट्स AI',
    coordinator: 'समन्वयक AI'
  },
  rfq: {
    greeting: (dealerName) => `नमस्ते ${dealerName} जी,`,
    inquiry: (siteName, location) => `हमें ${siteName} (${location}) साइट के लिए निम्नलिखित सामग्री का कोटेशन चाहिए:`,
    closing: 'कृपया ट्रांसपोर्ट और GST सहित फाइनल रेट और डिलीवरी टाइम बताएं।\n- BuildForce AI द्वारा प्रेषित'
  }
};
