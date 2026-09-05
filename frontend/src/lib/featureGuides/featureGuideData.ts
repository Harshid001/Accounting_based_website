import type { FeatureGuide, FeatureKey } from '@/types/featureGuides';

export const FEATURE_GUIDES: Record<FeatureKey, FeatureGuide> = {
  dashboard: {
    id: 'dashboard',
    defaultRoute: '/dashboard',
    iconName: 'LayoutDashboard',
    translations: {
      en: {
        title: 'Executive Dashboard',
        subtitle: 'Real-time overview of compliance deadlines, client health, and team workload.',
        badge: 'Practice Command Center',
        simpleExplanation:
          'The Dashboard gives you an instant aerial view of your accounting practice. It automatically tracks upcoming statutory due dates (GST, TDS, IT), monitors uncompleted tasks, and flags pending client documents so no deadline is ever missed.',
        whyItMatters:
          'In tax and accounting, late filings trigger heavy interest and statutory penalties. The Dashboard acts as your safety net by surfacing deadlines 7, 14, and 30 days in advance.',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'Scan Real-time Metrics',
            description: 'Check active clients, overdue filings, items awaiting client inputs, and open requests at a glance.',
          },
          {
            stepNumber: 2,
            title: 'Prioritize Statutory Buckets',
            description: 'Review filings expiring in the next 7, 14, and 30 days and click through to take immediate action.',
          },
          {
            stepNumber: 3,
            title: 'Balance Team Workload',
            description: 'Identify team members who have high open item counts and reassign work to ensure timely completion.',
          },
        ],
        buttons: [
          {
            id: 'tour-dashboard-mywork',
            selector: '[data-tour="dashboard-mywork"]',
            name: 'Open My Work',
            description: 'Jumps directly to your personal queue of filings and tasks assigned specifically to you.',
            proTip: 'Use this button each morning to plan your day’s priority tasks.',
            iconName: 'Briefcase',
          },
          {
            id: 'tour-dashboard-addclient',
            selector: '[data-tour="dashboard-addclient"]',
            name: 'Add Client Button',
            description: 'Opens the client onboarding form to register a new individual or corporate business record.',
            proTip: 'Admins can onboard a client in under 2 minutes with valid PAN and GSTIN.',
            iconName: 'UserPlus',
          },
          {
            id: 'tour-dashboard-stats',
            selector: '[data-tour="dashboard-stats"]',
            name: 'Summary KPI Cards',
            description: 'Displays firm-wide count of total clients, overdue statutory filings, and open client requests.',
            proTip: 'Clicking any metric card filters the respective screen to those specific items.',
            iconName: 'BarChart2',
          },
          {
            id: 'tour-dashboard-buckets',
            selector: '[data-tour="dashboard-buckets"]',
            name: 'Upcoming Filing Buckets',
            description: 'Categorizes pending GST, TDS, and Income Tax returns into 7-day, 14-day, and 30-day countdowns.',
            proTip: 'Prioritize the 7-day red bucket to prevent penalties and interest under section 234E/F.',
            iconName: 'Clock',
          },
          {
            id: 'tour-dashboard-workload',
            selector: '[data-tour="dashboard-workload"]',
            name: 'Workload Distribution Panel',
            description: 'Shows total open filings and tasks carried by each staff accountant in the firm.',
            proTip: 'Helps practice managers prevent burnout and maintain smooth filing pipelines.',
            iconName: 'Users',
          },
        ],
        proTips: [
          'Press Ctrl+K anytime to quickly open the global command palette and jump to any client or screen.',
          'Color-coded badges (Red = Overdue, Amber = Due soon, Green = Completed) help you spot risks at a glance.',
        ],
      },
      hi: {
        title: 'कार्यकारी डैशबोर्ड (Dashboard)',
        subtitle: 'कर अनुपालन समय-सीमा, क्लाइंट स्थिति और टीम कार्यभार का सीधा अवलोकन।',
        badge: 'सीए फर्म कमांड सेंटर',
        simpleExplanation:
          'डैशबोर्ड आपकी अकाउंटिंग और टैक्स फर्म का मुख्य नियंत्रण केंद्र है। यह जीएसटी, टीडीएस और आयकर की आगामी समय-सीमाओं (Deadlines) पर नज़र रखता है, जिससे कोई भी रिटर्न फाइलिंग छूट न जाए।',
        whyItMatters:
          'टैक्स कानूनों में देरी से फाइलिंग पर भारी जुर्माना और ब्याज लगता है। डैशबोर्ड आपको 7, 14 और 30 दिन पहले ही अलर्ट कर देता है।',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'आंकड़े देखें',
            description: 'कुल क्लाइंट्स, लंबित फाइलिंग्स और क्लाइंट्स से अपेक्षित दस्तावेज़ों की स्थिति तुरंत जांचें।',
          },
          {
            stepNumber: 2,
            title: 'समय-सीमा अनुसार काम करें',
            description: 'अगले 7 और 14 दिनों में देय रिटर्न्स पर प्राथमिकता से काम शुरू करें।',
          },
          {
            stepNumber: 3,
            title: 'टीम कार्यभार संतुलित करें',
            description: 'देखें कि किस कर्मचारी के पास कितने काम लंबित हैं और जरूरत पड़ने पर काम पुनः सौंपें।',
          },
        ],
        buttons: [
          {
            id: 'tour-dashboard-mywork',
            selector: '[data-tour="dashboard-mywork"]',
            name: 'मेरा काम खोलें (Open My Work)',
            description: 'सीधे आपके नाम पर दर्ज व्यक्तिगत कार्य और फाइलिंग्स की सूची पर ले जाता है।',
            proTip: 'रोज सुबह अपना दिन शुरू करते समय सबसे पहले इस बटन का उपयोग करें।',
            iconName: 'Briefcase',
          },
          {
            id: 'tour-dashboard-addclient',
            selector: '[data-tour="dashboard-addclient"]',
            name: 'क्लाइंट जोड़ें (Add Client)',
            description: 'फर्म में नया क्लाइंट (कंपनी या व्यक्ति) जोड़ने के लिए फॉर्म खोलता है।',
            proTip: 'पैन और जीएसटी नंबर दर्ज करने पर विवरण आसानी से दर्ज हो जाते हैं।',
            iconName: 'UserPlus',
          },
          {
            id: 'tour-dashboard-stats',
            selector: '[data-tour="dashboard-stats"]',
            name: 'मुख्य सांख्यिकी कार्ड्स (KPI Cards)',
            description: 'फर्म के सभी क्लाइंट्स, बकाया फाइलिंग्स और अनुरोधों की कुल संख्या दर्शाता है।',
            proTip: 'किसी भी कार्ड पर क्लिक करने से विस्तृत सूची खुल जाती है।',
            iconName: 'BarChart2',
          },
          {
            id: 'tour-dashboard-buckets',
            selector: '[data-tour="dashboard-buckets"]',
            name: 'फाइलिंग समय-सीमा बकेट्स',
            description: 'जीएसटी और टीडीएस रिटर्न्स को 7 दिन, 14 दिन और 30 दिनों के समूह में बांटता है।',
            proTip: '7 दिनों वाले लाल बकेट पर सबसे पहले काम करें ताकि लेट फीस से बचा जा सके।',
            iconName: 'Clock',
          },
          {
            id: 'tour-dashboard-workload',
            selector: '[data-tour="dashboard-workload"]',
            name: 'टीम कार्यभार पैनल',
            description: 'दिखाता है कि टीम के प्रत्येक सदस्य के पास कितने लंबित कार्य हैं।',
            proTip: 'कार्य को टीम में समान रूप से बांटने में मदद करता है।',
            iconName: 'Users',
          },
        ],
        proTips: [
          'Ctrl+K दबाकर आप तुरंत किसी भी क्लाइंट को खोज सकते हैं।',
          'लाल रंग का मतलब लंबित (Overdue) और पीला रंग का मतलब शीघ्र देय (Due soon) है।',
        ],
      },
      gu: {
        title: 'મુખ્ય ડેશબોર્ડ (Dashboard)',
        subtitle: 'કર પાલનની મુદત, ગ્રાહકોની સ્થિતિ અને ટીમ વર્કલોડનું જીવંત વિહંગાવલોકન.',
        badge: 'સીએ પ્રેક્ટિસ કમાન્ડ સેન્ટર',
        simpleExplanation:
          'ડેશબોર્ડ તમારી એકાઉન્ટિંગ અને ટેક્સ ફર્મનું કેન્દ્રીય નિયંત્રણ છે. તે GST, TDS અને ઇનકમ ટેક્સ ફાઇલિંગની છેલ્લી તારીખો પર સતત નજર રાખે છે જેથી દંડ કે પેનલ્ટીથી બચી શકાય.',
        whyItMatters:
          'ટેક્સ ફાઇલિંગમાં વિલંબ થવાથી વ્યાજ અને દંડ ભરવો પડે છે. ડેશબોર્ડ તમને ૭, ૧૪ અને ૩૦ દિવસ અગાઉથી ચેતવણી આપી સુરક્ષિત રાખે છે.',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'આંકડા તપાસો',
            description: 'સક્રિય ક્લાયન્ટ્સ, બાકી ફાઇલિંગ્સ અને ખુલ્લી વિનંતીઓ એક નજરમાં જુઓ.',
          },
          {
            stepNumber: 2,
            title: 'મુદત મુજબ આયોજન',
            description: 'આગામી ૭ અને ૧૪ દિવસમાં પૂર્ણ કરવાની થતી ફાઇલિંગ્સને પ્રાથમિકતા આપો.',
          },
          {
            stepNumber: 3,
            title: 'વર્કલોડ સંતુલિત કરો',
            description: 'કયા સ્ટાફ મેમ્બર પાસે કેટલું કામ બાકી છે તે ચકાસી કામની યોગ્ય વહેંચણી કરો.',
          },
        ],
        buttons: [
          {
            id: 'tour-dashboard-mywork',
            selector: '[data-tour="dashboard-mywork"]',
            name: 'મારું કામ ખોલો (Open My Work)',
            description: 'તમને સોંપાયેલ ફાઇલિંગ્સ અને કાર્યોની યાદી સીધી ખોલે છે.',
            proTip: 'રોજ સવારે તમારા દિવસનું આયોજન કરવા માટે આ બટનનો ઉપયોગ કરો.',
            iconName: 'Briefcase',
          },
          {
            id: 'tour-dashboard-addclient',
            selector: '[data-tour="dashboard-addclient"]',
            name: 'ક્લાયન્ટ ઉમેરો (Add Client)',
            description: 'નવા વેપારી કે કંપની ક્લાયન્ટની નોંધણી માટેનું ફોર્મ ખોલે છે.',
            proTip: 'PAN અને GSTIN દાખલ કરીને ઝડપથી નવો ક્લાયન્ટ ઉમેરી શકાય છે.',
            iconName: 'UserPlus',
          },
          {
            id: 'tour-dashboard-stats',
            selector: '[data-tour="dashboard-stats"]',
            name: 'મુખ્ય સ્ટેટ્સ કાર્ડ્સ',
            description: 'ફર્મના કુલ ક્લાયન્ટ્સ, મુદત વીતી ગયેલ ફાઇલિંગ્સ અને વિનંતીઓ દર્શાવે છે.',
            proTip: 'કોઈપણ કાર્ડ પર ક્લિક કરીને સીધી વિગતવાર માહિતી જોઈ શકાય છે.',
            iconName: 'BarChart2',
          },
          {
            id: 'tour-dashboard-buckets',
            selector: '[data-tour="dashboard-buckets"]',
            name: 'આગામી ફાઇલિંગ બકેટ્સ',
            description: '૭ દિવસ, ૧૪ દિવસ અને ૩૦ દિવસમાં બાકી રહેતા રિટર્ન્સને જૂથબદ્ધ કરે છે.',
            proTip: '૭ દિવસવાળા લાલ બકેટને પ્રથમ પ્રાથમિકતા આપો જેથી લેટ ફી ન લાગે.',
            iconName: 'Clock',
          },
          {
            id: 'tour-dashboard-workload',
            selector: '[data-tour="dashboard-workload"]',
            name: 'ટીમ વર્કલોડ પેનલ',
            description: 'ટીમના કયા સભ્ય પાસે કેટલા પેન્ડિંગ કામ છે તે દર્શાવે છે.',
            proTip: 'કામની યોગ્ય વહેંચણી માટે આ પેનલ અત્યંત ઉપયોગી છે.',
            iconName: 'Users',
          },
        ],
        proTips: [
          'Ctrl+K દબાવીને તરત જ કોઈપણ ક્લાયન્ટ અથવા સ્ક્રીન શોધી શકો છો.',
          'લાલ રંગ મુદત વીતી ગયેલ અને પીળો રંગ ટૂંક સમયમાં બાકી કામ દર્શાવે છે.',
        ],
      },
      mr: {
        title: 'कार्यकारी डॅशबोर्ड (Dashboard)',
        subtitle: 'कर अनुपालन मुदत, ग्राहक स्थिती आणि टीम कामाचा थेट आढावा.',
        badge: 'सीए फर्म कमांड सेंटर',
        simpleExplanation:
          'डॅशबोर्ड हे आपल्या कर आणि लेखा फर्मचे नियंत्रण केंद्र आहे. हे जीएसटी, टीडीएस आणि प्राप्तिकर रिटर्नच्या आगामी मुदतींवर सतत लक्ष ठेवते, ज्यामुळे मुदत चुकण्याची शक्यता राहत नाही.',
        whyItMatters:
          'कर विवरणपत्र वेळेवर सादर न केल्यास मोठा दंड आणि व्याज भरावे लागते. डॅशबोर्ड ७, १४ आणि ३० दिवस आधीच माहिती देऊन सुरक्षितता पुरवतो.',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'आकडेवारी तपासा',
            description: 'सक्रिय ग्राहक, प्रलंबित विवरणपत्रे आणि ग्राहकांकडून अपेक्षित कागदपत्रांची सद्यस्थिती पहा.',
          },
          {
            stepNumber: 2,
            title: 'मुदतीनुसार काम प्राधान्य द्या',
            description: 'पुढील ७ आणि १४ दिवसांत देय असणाऱ्या कामांना प्राधान्य देऊन पूर्ण करा.',
          },
          {
            stepNumber: 3,
            title: 'टीम कामाचा समतोल साधा',
            description: 'कोणत्या कर्मचाऱ्याकडे किती काम प्रलंबित आहे ते पाहून कामाचे योग्य वाटप करा.',
          },
        ],
        buttons: [
          {
            id: 'tour-dashboard-mywork',
            selector: '[data-tour="dashboard-mywork"]',
            name: 'माझे काम उघडा (Open My Work)',
            description: 'तुम्हाला नेमून दिलेल्या वैयक्तिक कामांची आणि विवरणपत्रांची यादी उघडते.',
            proTip: 'दररोज सकाळी कामाचे नियोजन करताना हे बटन वापरा.',
            iconName: 'Briefcase',
          },
          {
            id: 'tour-dashboard-addclient',
            selector: '[data-tour="dashboard-addclient"]',
            name: 'ग्राहक जोडा (Add Client)',
            description: 'फर्ममध्ये नवीन ग्राहक (कंपनी किंवा व्यक्ती) नोंदणी करण्यासाठी फॉर्म उघडतो.',
            proTip: 'पॅन आणि जीएसटी क्रमांक टाकून त्वरित ग्राहक नोंदणी करता येते.',
            iconName: 'UserPlus',
          },
          {
            id: 'tour-dashboard-stats',
            selector: '[data-tour="dashboard-stats"]',
            name: 'मुख्य आकडेवारी कार्ड्स',
            description: 'एकूण ग्राहक, थकीत विवरणपत्रे आणि खुल्या विनंत्यांची संख्या दर्शवते.',
            proTip: 'कोणत्याही कार्डवर क्लिक करून थेट सविस्तर यादी पाहता येते.',
            iconName: 'BarChart2',
          },
          {
            id: 'tour-dashboard-buckets',
            selector: '[data-tour="dashboard-buckets"]',
            name: 'आगामी मुदत बकेट्स',
            description: '७ दिवस, १४ दिवस आणि ३० दिवसांच्या मुदतीनुसार विवरणपत्रांचे वर्गीकरण करते.',
            proTip: '७ दिवसांच्या लाल बकेटमधील कामे त्वरित पूर्ण करा जेणेकरून दंड टळेल.',
            iconName: 'Clock',
          },
          {
            id: 'tour-dashboard-workload',
            selector: '[data-tour="dashboard-workload"]',
            name: 'टीम कार्यभार पॅनेल',
            description: 'टीममधील प्रत्येक व्यक्तीकडे किती प्रलंबित कामे आहेत ते दर्शवते.',
            proTip: 'कामाचे समान वाटप करण्यासाठी उपयुक्त.',
            iconName: 'Users',
          },
        ],
        proTips: [
          'Ctrl+K दाबून कोणत्याही ग्राहकाचा शोध त्वरित घेता येतो.',
          'लाल रंग थकीत (Overdue) तर पिवळा रंग लवकरच देय (Due soon) दर्शवतो.',
        ],
      },
    },
  },

  clients: {
    id: 'clients',
    defaultRoute: '/clients',
    iconName: 'Building2',
    translations: {
      en: {
        title: 'Client Management Directory',
        subtitle: 'Comprehensive KYC, business profiles, and records of all firm clients.',
        badge: 'Client Registry',
        simpleExplanation:
          'The Clients feature acts as your master address book and KYC vault. Every individual, partnership, and corporate client has an organized profile with PAN, GSTIN, assigned staff, compliance history, documents, and messages in one place.',
        whyItMatters:
          'Having organized client records with instant search prevents compliance blunders, ensures easy KYC audits, and speeds up filing preparation across your entire firm.',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'Search or Filter Clients',
            description: 'Find any client instantly by typing trade name, PAN, or GSTIN in the search bar.',
          },
          {
            stepNumber: 2,
            title: 'Drill Into Details',
            description: 'Click any client row to view their tax profile, pending filings, documents, and messages.',
          },
          {
            stepNumber: 3,
            title: 'Export Records or Add Clients',
            description: 'Export clean client rosters to CSV or onboard new clients with full statutory details.',
          },
        ],
        buttons: [
          {
            id: 'tour-client-search',
            selector: '[data-tour="client-search"]',
            name: 'Instant Search Bar',
            description: 'Search clients by Company Name, Director Name, PAN, or GSTIN with live debounced filtering.',
            proTip: 'Type just the first 4 characters of a PAN to quickly find a corporate group.',
            iconName: 'Search',
          },
          {
            id: 'tour-client-filter',
            selector: '[data-tour="client-filter"]',
            name: 'Status & Type Filters',
            description: 'Filter clients by status (Active, Inactive, Onboarding) or business constitution (Pvt Ltd, LLP, Prop, Individual).',
            proTip: 'Combine filters to find all Private Limited companies requiring statutory audits.',
            iconName: 'Filter',
          },
          {
            id: 'tour-client-export',
            selector: '[data-tour="client-export"]',
            name: 'Export CSV Button',
            description: 'Generates and downloads a clean spreadsheet of the currently filtered client records.',
            proTip: 'Great for preparing billing rosters, audit checklists, or festival greeting lists.',
            iconName: 'Download',
          },
          {
            id: 'tour-client-add',
            selector: '[data-tour="client-add"]',
            name: 'Add Client (+)',
            description: 'Opens the client registration workflow to set up trade names, legal names, and GST credentials.',
            proTip: 'Assign a dedicated staff manager during creation to route tasks automatically.',
            iconName: 'UserPlus',
          },
          {
            id: 'tour-client-table',
            selector: '[data-tour="client-table"]',
            name: 'Client Record Table',
            description: 'Interactive table listing client names, PAN, GSTIN, assigned managers, and filing statuses.',
            proTip: 'Click column headers to sort alphabetically or by onboarding date.',
            iconName: 'Table',
          },
        ],
        proTips: [
          'Pin your most critical clients to keep them at the top of your list for daily priority check-ins.',
          'Check the "Archived" filter to review historical clients without cluttering daily workflows.',
        ],
      },
      hi: {
        title: 'क्लाइंट प्रबंधन निर्देशिका (Clients)',
        subtitle: 'सभी क्लाइंट्स के व्यवसाय प्रोफाइल, पैन, जीएसटी और केवाईसी रिकॉर्ड का संग्रह।',
        badge: 'क्लाइंट डायरेक्टरी',
        simpleExplanation:
          'क्लाइंट्स फीचर आपकी फर्म की मास्टर डायरेक्टरी है। यहाँ प्रत्येक कंपनी, पार्टनरशिप और व्यक्तिगत क्लाइंट का पूरा विवरण—पैन, जीएसटीएन, संपर्क सूत्र, दस्तावेज़ और फाइलिंग इतिहास सुरक्षित रहता है।',
        whyItMatters:
          'सभी क्लाइंट्स का डेटा व्यवस्थित रहने से रिटर्न फाइलिंग के समय पैन और जीएसटी खोजने में समय बर्बाद नहीं होता।',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'खोजें या फ़िल्टर करें',
            description: 'नाम, पैन या जीएसटी नंबर लिखकर किसी भी क्लाइंट को तुरंत खोजें।',
          },
          {
            stepNumber: 2,
            title: 'विवरण देखें',
            description: 'क्लाइंट के नाम पर क्लिक करके उनके सभी दस्तावेज़, कार्य और फाइलिंग स्थिति देखें।',
          },
          {
            stepNumber: 3,
            title: 'नया क्लाइंट जोड़ें',
            description: 'नया क्लाइंट जोड़ने के लिए "Add client" बटन का उपयोग करें।',
          },
        ],
        buttons: [
          {
            id: 'tour-client-search',
            selector: '[data-tour="client-search"]',
            name: 'सर्च बार (Search)',
            description: 'कंपनी नाम, पैन (PAN) या जीएसटी (GSTIN) लिखकर तुरंत क्लाइंट ढूंढें।',
            proTip: 'पैन के शुरुआती 4 अक्षर लिखने से भी परिणाम आ जाते हैं।',
            iconName: 'Search',
          },
          {
            id: 'tour-client-filter',
            selector: '[data-tour="client-filter"]',
            name: 'फ़िल्टर बार (Filters)',
            description: 'क्लाइंट प्रकार (प्राइवेट लिमिटेड, फर्म, व्यक्तिगत) या स्थिति के अनुसार छांटें।',
            proTip: 'एक साथ कई फ़िल्टर लगाकर सटीक सूची बनाएं।',
            iconName: 'Filter',
          },
          {
            id: 'tour-client-export',
            selector: '[data-tour="client-export"]',
            name: 'एक्सपोर्ट सीएसवी (Export CSV)',
            description: 'वर्तमान सूची को एक्सेल (CSV) फाइल में डाउनलोड करता है।',
            proTip: 'बिलिंग या ऑडिट लिस्ट बनाने के लिए यह बहुत उपयोगी है।',
            iconName: 'Download',
          },
          {
            id: 'tour-client-add',
            selector: '[data-tour="client-add"]',
            name: 'क्लाइंट जोड़ें (Add client)',
            description: 'फर्म में नया क्लाइंट पंजीकृत करने के लिए फॉर्म खोलता है।',
            proTip: 'बनाते समय ही संबंधित स्टाफ सदस्य को सौंप दें।',
            iconName: 'UserPlus',
          },
          {
            id: 'tour-client-table',
            selector: '[data-tour="client-table"]',
            name: 'क्लाइंट तालिका (Table)',
            description: 'सभी क्लाइंट्स के नाम, संपर्क और स्थिति की तालिका।',
            proTip: 'कॉलम हेडर पर क्लिक करके अक्षरों के क्रम में व्यवस्थित करें।',
            iconName: 'Table',
          },
        ],
        proTips: [
          'महत्वपूर्ण क्लाइंट्स को "पिन" करें ताकि वे हमेशा शीर्ष पर रहें।',
        ],
      },
      gu: {
        title: 'ક્લાયન્ટ ડિરેક્ટરી (Clients)',
        subtitle: 'તમામ ગ્રાહકોના વ્યવસાય પ્રોફાઇલ, PAN, GSTIN અને KYC દસ્તાવેજોનું સંચાલન.',
        badge: 'ગ્રાહક રજિસ્ટ્રી',
        simpleExplanation:
          'આ સ્ક્રીન તમારી સીએ ફર્મની માસ્ટર ડિરેક્ટરી છે. દરેક કંપની, પેઢી કે વેપારીના PAN, GST નંબર, સોંપાયેલ સ્ટાફ, દસ્તાવેજો અને ફાઇલિંગ ઇતિહાસ અહીં સુરક્ષિત રહે છે.',
        whyItMatters:
          'વ્યવસ્થિત ક્લાયન્ટ ડેટા હોવાથી રિટર્ન ભરતી વખતે ખોટા નંબરો કે દસ્તાવેજો શોધવાની મુશ્કેલી રહેતી નથી.',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'શોધો અથવા ફિલ્ટર કરો',
            description: 'નામ, PAN અથવા GST નંબર લખીને કોઈપણ ક્લાયન્ટને તુરંત શોધો.',
          },
          {
            stepNumber: 2,
            title: 'પ્રોફાઇલ તપાસો',
            description: 'ક્લાયન્ટની વિગતો, પેન્ડિંગ રિટર્ન્સ અને દસ્તાવેજો જોવા માટે લાઇન પર ક્લિક કરો.',
          },
          {
            stepNumber: 3,
            title: 'નવો ક્લાયન્ટ ઉમેરો',
            description: '"Add client" બટન દબાવીને નવી પેઢી કે કંપનીની નોંધણી કરો.',
          },
        ],
        buttons: [
          {
            id: 'tour-client-search',
            selector: '[data-tour="client-search"]',
            name: 'સર્ચ બાર (Search)',
            description: 'પેઢીનું નામ, PAN અથવા GSTIN લખીને ઝડપથી ક્લાયન્ટ શોધો.',
            proTip: 'PAN ના પ્રથમ ૪ અક્ષરો લખીને પણ ક્લાયન્ટ શોધી શકાય છે.',
            iconName: 'Search',
          },
          {
            id: 'tour-client-filter',
            selector: '[data-tour="client-filter"]',
            name: 'ફિલ્ટર બાર (Filters)',
            description: 'પ્રાઇવેટ લિમિટેડ, ભાગીદારી પેઢી કે સ્થિતિ મુજબ યાદી ફિલ્ટર કરો.',
            proTip: 'ઓડિટ જરૂરી હોય તેવી કંપનીઓને અલગ તારવવા માટે આનો ઉપયોગ કરો.',
            iconName: 'Filter',
          },
          {
            id: 'tour-client-export',
            selector: '[data-tour="client-export"]',
            name: 'એક્સપોર્ટ CSV (Export)',
            description: 'સ્ક્રીન પર દેખાતી ક્લાયન્ટ યાદીને એક્સેલ ફોર્મેટમાં ડાઉનલોડ કરે છે.',
            proTip: 'બિલિંગ અને વાર્ષિક રિવ્યુ માટે ઉપયોગી.',
            iconName: 'Download',
          },
          {
            id: 'tour-client-add',
            selector: '[data-tour="client-add"]',
            name: 'ક્લાયન્ટ ઉમેરો (Add client)',
            description: 'નવા ક્લાયન્ટની સંપૂર્ણ વિગતો દાખલ કરવા માટેનું ફોર્મ ખોલે છે.',
            proTip: 'બનાવતી વખતે જ જવાબદાર સ્ટાફને અસાઇન કરો.',
            iconName: 'UserPlus',
          },
          {
            id: 'tour-client-table',
            selector: '[data-tour="client-table"]',
            name: 'ક્લાયન્ટ ટેબલ',
            description: 'ક્લાયન્ટના નામ, PAN, GSTIN અને સ્ટેટસની વિગતવાર યાદી.',
            proTip: 'નામ પર ક્લિક કરીને પ્રોફાઇલ, દસ્તાવેજો અને ફાઇલિંગ્સ જુઓ.',
            iconName: 'Table',
          },
        ],
        proTips: [
          'મહત્વના ક્લાયન્ટ્સને "Pinned" કરો જેથી તેઓ હંમેશા ટોપ પર દેખાય.',
        ],
      },
      mr: {
        title: 'ग्राहक व्यवस्थापन निर्देशिका (Clients)',
        subtitle: 'सर्व ग्राहकांचे व्यवसाय तपशील, पॅन, जीएसटी आणि केवायसी नोंदवही.',
        badge: 'ग्राहक नोंदणी',
        simpleExplanation:
          'क्लायंट्स हे आपल्या फर्मचे मुख्य रजिस्टर आहे. प्रत्येक कंपनी, भागीदारी किंवा व्यक्तीचे पॅन, जीएसटी क्रमांक, सोपवलेले कर्मचारी, कागदपत्रे आणि विवरणपत्र इतिहास एकाच ठिकाणी उपलब्ध राहतो.',
        whyItMatters:
          'सर्व ग्राहकांची माहिती व्यवस्थित असल्यास वेळेवर विवरणपत्रे भरताना धावपळ होत नाही आणि चुका टळतात.',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'शोधा किंवा फिल्टर करा',
            description: 'नाव, पॅन किंवा जीएसटी क्रमांक लिहून त्वरित ग्राहक शोधा.',
          },
          {
            stepNumber: 2,
            title: 'तपशील पहा',
            description: 'ग्राहकाच्या नावावर क्लिक करून कागदपत्रे आणि कामांची स्थिती तपासा.',
          },
          {
            stepNumber: 3,
            title: 'नवीन ग्राहक जोडा',
            description: '"Add client" बटणावर क्लिक करून नवीन व्यवसाय नोंदणी करा.',
          },
        ],
        buttons: [
          {
            id: 'tour-client-search',
            selector: '[data-tour="client-search"]',
            name: 'शोध बार (Search)',
            description: 'कंपनी नाव, पॅन किंवा जीएसटी क्रमांकाने त्वरित शोध घ्या.',
            proTip: 'पॅनचे सुरुवातीचे अक्षर टाकूनही शोधता येते.',
            iconName: 'Search',
          },
          {
            id: 'tour-client-filter',
            selector: '[data-tour="client-filter"]',
            name: 'फिल्टर बार (Filters)',
            description: 'कंपनी प्रकार (प्रायव्हेट लि., प्रोप्रायटर) किंवा स्थितीनुसार यादी वेगळी करा.',
            proTip: 'ऑडिट आवश्यक असणाऱ्या कंपन्यांची यादी वेगळी करण्यासाठी वापरा.',
            iconName: 'Filter',
          },
          {
            id: 'tour-client-export',
            selector: '[data-tour="client-export"]',
            name: 'एक्स्पोर्ट CSV (Export)',
            description: 'सध्याची ग्राहक यादी एक्सेल स्वरूपात डाऊनलोड करा.',
            proTip: 'बिलिंग आणि वार्षिक आढाव्यासाठी उपयुक्त.',
            iconName: 'Download',
          },
          {
            id: 'tour-client-add',
            selector: '[data-tour="client-add"]',
            name: 'ग्राहक जोडा (Add client)',
            description: 'नवीन ग्राहकाची नोंदणी करण्यासाठी फॉर्म उघडतो.',
            proTip: 'नोंदणी करतानाच जबाबदार सहकाऱ्याला काम सोपवा.',
            iconName: 'UserPlus',
          },
          {
            id: 'tour-client-table',
            selector: '[data-tour="client-table"]',
            name: 'ग्राहक तक्ता (Table)',
            description: 'सर्व ग्राहकांची माहिती आणि स्थिती दर्शवणारा तक्ता.',
            proTip: 'नावावर क्लिक करून सविस्तर माहिती उघडा.',
            iconName: 'Table',
          },
        ],
        proTips: [
          'महत्त्वाच्या ग्राहकांना पिन करा जेणेकरून ते कायम वर दिसतील.',
        ],
      },
    },
  },

  tasks: {
    id: 'tasks',
    defaultRoute: '/tasks',
    iconName: 'CheckSquare',
    translations: {
      en: {
        title: 'Task & Workflow Tracker',
        subtitle: 'Internal firm task management, stage tracking, and assignment delegation.',
        badge: 'Workflow Hub',
        simpleExplanation:
          'Tasks help your accounting firm stay disciplined and organized. While statutory returns (GST, TDS) track government deadlines, Tasks handle everything else: gathering bank statements, reconciling books, drafting audit observations, and following up with clients.',
        whyItMatters:
          'A statutory filing cannot be done without prerequisite accounting tasks. Tracking tasks ensures team accountability and eliminates last-minute panic.',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'Create or Assign Tasks',
            description: 'Add a task, set a deadline, link it to a client, and assign it to a team member.',
          },
          {
            stepNumber: 2,
            title: 'Filter by State or Priority',
            description: 'Track tasks in Not Started, In Progress, Review, and Done states.',
          },
          {
            stepNumber: 3,
            title: 'Review and Complete',
            description: 'Senior CAs review work submitted by juniors and mark items Done with confidence.',
          },
        ],
        buttons: [
          {
            id: 'tour-task-search',
            selector: '[data-tour="task-search"]',
            name: 'Task Title Search',
            description: 'Search task titles and descriptions instantly across all assigned accounts.',
            proTip: 'Search "reconciliation" or "audit" to see all related jobs.',
            iconName: 'Search',
          },
          {
            id: 'tour-task-filter',
            selector: '[data-tour="task-filter"]',
            name: 'Status, Priority & Owner Filters',
            description: 'Filter tasks by Urgency (Urgent, High, Normal, Low) or by Assignee ("Assigned to me").',
            proTip: 'Check "Assigned to me" + "Overdue" to clear your highest risks first.',
            iconName: 'Filter',
          },
          {
            id: 'tour-task-add',
            selector: '[data-tour="task-add"]',
            name: 'Add Task (+)',
            description: 'Opens a modal to create a new task with due date, client link, priority, and checklist items.',
            proTip: 'Break large audit assignments into sub-tasks with checklists.',
            iconName: 'PlusCircle',
          },
          {
            id: 'tour-task-table',
            selector: '[data-tour="task-table"]',
            name: 'Tasks Table & State Badges',
            description: 'Interactive list showing task titles, client names, due dates, and status pills.',
            proTip: 'Click on any task to update its status, leave internal notes, or reassign.',
            iconName: 'ListChecks',
          },
        ],
        proTips: [
          'Move tasks into "Review" state so senior CAs know when work is ready for final sign-off.',
          'Tasks with overdue dates display an amber/red highlight automatically.',
        ],
      },
      hi: {
        title: 'टास्क व कार्यप्रवाह ट्रैकर (Tasks)',
        subtitle: 'फर्म के आंतरिक कार्यों, लेखा समाधान और टीम जिम्मेदारियों का प्रबंधन।',
        badge: 'कार्यप्रवाह हब',
        simpleExplanation:
          'टास्क फीचर फर्म के दैनिक कार्यों को व्यवस्थित रखता है। बैंक समाधान, वाउचर एंट्री, ऑडिट टिप्पणियां और क्लाइंट फॉलो-अप जैसे सभी जरूरी काम यहाँ ट्रैक होते हैं।',
        whyItMatters:
          'रिटर्न फाइल करने से पहले खातों का मिलान जरूरी होता है। टास्क से हर काम की जिम्मेदारी तय रहती है और कोई काम छूटता नहीं।',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'टास्क बनाएं व सौंपें',
            description: 'काम का शीर्षक, समय-सीमा, क्लाइंट और जिम्मेदार कर्मचारी चुनें।',
          },
          {
            stepNumber: 2,
            title: 'प्रगति ट्रैक करें',
            description: 'काम "प्रगति पर (In Progress)" या "समीक्षा (Review)" में है, यह आसानी से देखें।',
          },
          {
            stepNumber: 3,
            title: 'समीक्षा व समापन',
            description: 'काम पूरा होने पर सीनियर सीए द्वारा समीक्षा कर उसे "पूरा (Done)" मार्क करें।',
          },
        ],
        buttons: [
          {
            id: 'tour-task-search',
            selector: '[data-tour="task-search"]',
            name: 'टास्क खोजें (Search)',
            description: 'टास्क का नाम या विषय लिखकर सीधे संबंधित काम खोजें।',
            proTip: '"बैंक" या "ऑडिट" लिखकर संबंधित सभी टास्क देखें।',
            iconName: 'Search',
          },
          {
            id: 'tour-task-filter',
            selector: '[data-tour="task-filter"]',
            name: 'फ़िल्टर विकल्प',
            description: 'प्राथमिकता (High, Urgent) या "मुझे सौंपे गए काम" के अनुसार सूची छांटें।',
            proTip: '"मुझे सौंपे गए" फ़िल्टर से अपनी व्यक्तिगत प्राथमिकताओं पर ध्यान केंद्रित करें।',
            iconName: 'Filter',
          },
          {
            id: 'tour-task-add',
            selector: '[data-tour="task-add"]',
            name: 'टास्क जोड़ें (Add task)',
            description: 'नया कार्य बनाने और टीम सदस्य को सौंपने के लिए विंडो खोलता है।',
            proTip: 'समय-सीमा तय करना कभी न भूलें ताकि सिस्टम रिमाइंडर दे सके।',
            iconName: 'PlusCircle',
          },
          {
            id: 'tour-task-table',
            selector: '[data-tour="task-table"]',
            name: 'टास्क तालिका (Table)',
            description: 'सभी कार्यों की वर्तमान स्थिति, देय तिथि और क्लाइंट का नाम दिखाता है।',
            proTip: 'टास्क पर क्लिक करके स्थिति बदलें या नोट्स जोड़ें।',
            iconName: 'ListChecks',
          },
        ],
        proTips: [
          'काम पूरा होने पर स्थिति को "Review" में डालें ताकि सीनियर सीए जांच कर सकें।',
        ],
      },
      gu: {
        title: 'ટાસ્ક અને વર્કફ્લો ટ્રેકર (Tasks)',
        subtitle: 'ફર્મના આંતરિક કાર્યો, ખાતાવહી મિલાન અને સ્ટાફની જવાબદારીઓનું સંચાલન.',
        badge: 'કાર્યપ્રવાહ કેન્દ્ર',
        simpleExplanation:
          'આ ફીચર ફર્મના રોજિંદા કાર્યોને સુવ્યવસ્થિત રાખે છે. બેંક સ્ટેટમેન્ટ મિલાન, ઓડિટ નોટ્સ, જીએસટી તૈયારી અને ક્લાયન્ટ ફોલો-અપ જેવા કામો અહીં સરળતાથી ટ્રેક થાય છે.',
        whyItMatters:
          'ટેક્સ રિટર્ન ભરતા પહેલા હિસાબો તપાસવા જરૂરી છે. દરેક કામ સમયસર પૂર્ણ થાય તે માટે ટાસ્ક અત્યંત મદદરૂપ છે.',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'ટાસ્ક બનાવો',
            description: 'કામનું નામ, છેલ્લી તારીખ અને જવાબદાર સ્ટાફ નક્કી કરો.',
          },
          {
            stepNumber: 2,
            title: 'સ્થિતિ તપાસો',
            description: 'કામ પ્રગતિમાં છે કે પૂર્ણ થઈ ગયું છે તે લાઈવ મોનિટર કરો.',
          },
          {
            stepNumber: 3,
            title: 'ઓડિટ રીવ્યુ',
            description: 'સીનિયર સીએ કામ ચકાસીને તેને પૂર્ણ (Done) માર્ક કરે છે.',
          },
        ],
        buttons: [
          {
            id: 'tour-task-search',
            selector: '[data-tour="task-search"]',
            name: 'ટાસ્ક સર્ચ',
            description: 'ટાસ્કનું નામ લખીને પેન્ડિંગ કામ શોધો.',
            proTip: 'ક્લાયન્ટનું નામ લખીને તેના તમામ ટાસ્ક જોઈ શકાય છે.',
            iconName: 'Search',
          },
          {
            id: 'tour-task-filter',
            selector: '[data-tour="task-filter"]',
            name: 'ફિલ્ટર વિકલ્પો',
            description: 'અગ્રતા (Priority) અથવા "મને સોંપાયેલ કામ" મુજબ ફિલ્ટર કરો.',
            proTip: '"Assigned to me" પસંદ કરીને તમારું પોતાનું કામ ઝડપથી પતાવો.',
            iconName: 'Filter',
          },
          {
            id: 'tour-task-add',
            selector: '[data-tour="task-add"]',
            name: 'ટાસ્ક ઉમેરો (Add task)',
            description: 'નવું કાર્ય ઉમેરવા અને સ્ટાફને સોંપવા માટેનું ડાયલોગ બોક્સ ખોલે છે.',
            proTip: 'મોટા કામ માટે ચેકલિસ્ટ ઉમેરી શકાય છે.',
            iconName: 'PlusCircle',
          },
          {
            id: 'tour-task-table',
            selector: '[data-tour="task-table"]',
            name: 'ટાસ્ક ટેબલ',
            description: 'કામની સ્થિતિ, છેલ્લી તારીખ અને સોંપેલ વ્યક્તિની માહિતી.',
            proTip: 'ટાસ્ક પર ક્લિક કરીને તેની પ્રગતિ અપડેટ કરો.',
            iconName: 'ListChecks',
          },
        ],
        proTips: [
          'કામ તૈયાર થાય એટલે તેને "Review" માં મૂકો જેથી સીનિયર સાહેબ ચેક કરી શકે.',
        ],
      },
      mr: {
        title: 'कार्य आणि कार्यप्रवाह ट्रॅकर (Tasks)',
        subtitle: 'फर्मची अंतर्गत कामे, बँक ताळेबंद आणि जबाबदाऱ्यांचे व्यवस्थापन.',
        badge: 'वर्कफ्लो केंद्र',
        simpleExplanation:
          'टास्क हे फर्ममधील सर्व दैनंदिन कामांचे व्यवस्थापन करते. बँक रिकन्सिलिएशन, ऑडिट नोट्स, व्हाउचर तपासणी आणि ग्राहकांकडे पाठपुरावा करण्याचे काम येथे नोंदवले जाते.',
        whyItMatters:
          'विवरणपत्र भरण्यापूर्वी हिशोब पूर्ण असणे आवश्यक आहे. टास्कमुळे कोणाकडे कोणते काम आहे हे स्पष्ट राहते.',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'काम तयार करा',
            description: 'कामाचे नाव, मुदत आणि कर्मचाऱ्याची निवड करा.',
          },
          {
            stepNumber: 2,
            title: 'प्रगती तपासा',
            description: 'काम सुरू झाले की पुनरावलोकनासाठी पाठवले ते पहा.',
          },
          {
            stepNumber: 3,
            title: 'पूर्ण करा',
            description: 'काम तपासल्यानंतर अंतिम मंजुरी देऊन पूर्ण (Done) करा.',
          },
        ],
        buttons: [
          {
            id: 'tour-task-search',
            selector: '[data-tour="task-search"]',
            name: 'कार्य शोध (Search)',
            description: 'कामाचे नाव लिहून संबंधित काम त्वरित शोधा.',
            proTip: 'विशिष्ट विषयानुसार शोधण्यासाठी वापरा.',
            iconName: 'Search',
          },
          {
            id: 'tour-task-filter',
            selector: '[data-tour="task-filter"]',
            name: 'फिल्टर पर्याय',
            description: 'प्राधान्य (Priority) किंवा "मला सोपवलेली कामे" निवडा.',
            proTip: 'स्वतःच्या कामांवर लक्ष केंद्रित करण्यासाठी वापरा.',
            iconName: 'Filter',
          },
          {
            id: 'tour-task-add',
            selector: '[data-tour="task-add"]',
            name: 'काम जोडा (Add task)',
            description: 'नवीन काम नोंदवण्यासाठी फॉर्म उघडतो.',
            proTip: 'मुदत नक्की टाका जेणेकरून वेळेवर आठवण होईल.',
            iconName: 'PlusCircle',
          },
          {
            id: 'tour-task-table',
            selector: '[data-tour="task-table"]',
            name: 'कार्य तक्ता (Table)',
            description: 'कामांची यादी, मुदत आणि सद्यस्थिती दर्शवतो.',
            proTip: 'स्थिती बदलण्यासाठी किंवा नोट्स टाकण्यासाठी क्लिक करा.',
            iconName: 'ListChecks',
          },
        ],
        proTips: [
          'काम पूर्ण झाल्यावर "Review" मध्ये पाठवा जेणेकरून वरिष्ठांकडून तपासणी होईल.',
        ],
      },
    },
  },

  compliance: {
    id: 'compliance',
    defaultRoute: '/compliance',
    iconName: 'ShieldCheck',
    translations: {
      en: {
        title: 'Statutory Compliance Radar',
        subtitle: 'GST, TDS, Income Tax, ROC, and Advance Tax filing pipelines.',
        badge: 'Statutory Radar',
        simpleExplanation:
          'The Compliance Radar is your firm’s statutory nerve center. It tracks every statutory filing required for each client across India’s tax regimes: GSTR-1, GSTR-3B, GSTR-9, TDS Returns (24Q, 26Q, 27Q), Advance Tax installments, and Annual Income Tax returns.',
        whyItMatters:
          'Missed statutory due dates mean automatic late fees, interest, and notice issuances. The radar keeps every filing visible with status badges from "Not Started" to "Filed".',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'Auto-Generate Periodic Filings',
            description: 'Use the generator tool to spin up monthly or quarterly filings across all active clients.',
          },
          {
            stepNumber: 2,
            title: 'Track Pipeline Stages',
            description: 'Monitor filings transitioning through Data Gathering, Computations, Client Review, and Portal Upload.',
          },
          {
            stepNumber: 3,
            title: 'Record ARN / Acknowledgement',
            description: 'Mark filed, record acknowledgment numbers, and upload official filing receipts for client access.',
          },
        ],
        buttons: [
          {
            id: 'tour-compliance-search',
            selector: '[data-tour="compliance-search"]',
            name: 'Compliance Search',
            description: 'Search filing records by return form code (e.g. GSTR-3B, 26Q, ITR-6) or client trade name.',
            proTip: 'Search "3B" on the 18th of the month to audit pending GST returns.',
            iconName: 'Search',
          },
          {
            id: 'tour-compliance-generate',
            selector: '[data-tour="compliance-generate"]',
            name: 'Generate Periodic Filings',
            description: 'Batch generates statutory filings for a chosen month or quarter across client cohorts.',
            proTip: 'Run this at the start of each month to prepare the firm’s upcoming filing pipeline in seconds.',
            iconName: 'Sparkles',
          },
          {
            id: 'tour-compliance-filter',
            selector: '[data-tour="compliance-filter"]',
            name: 'Tax Regime & Category Filters',
            description: 'Filter filings by GST, Income Tax, TDS, ROC, or Audit, plus filing status and period.',
            proTip: 'Filter by "Category: GST" + "Status: Overdue" during GST filing weeks.',
            iconName: 'Filter',
          },
          {
            id: 'tour-compliance-radar',
            selector: '[data-tour="compliance-radar"]',
            name: 'Statutory Radar Table',
            description: 'Main table showing return type, period, statutory due date, assigned preparer, and filing status.',
            proTip: 'Click on any compliance item to view Challans, upload receipts, or log acknowledgment details.',
            iconName: 'FileCheck',
          },
        ],
        proTips: [
          'Keep acknowledgment numbers (ARN/Ack No.) logged in the record for instant reference during scrutiny.',
          'Clients see their filed returns in real-time in their client portal once marked filed!',
        ],
      },
      hi: {
        title: 'वैधानिक अनुपालन रडार (Compliance Radar)',
        subtitle: 'जीएसटी, टीडीएस, आयकर और आरओसी फाइलिंग्स का केंद्रीय नियंत्रण।',
        badge: 'टैक्स अनुपालन रडार',
        simpleExplanation:
          'अनुपालन रडार फर्म का सबसे महत्वपूर्ण हिस्सा है। यह भारत सरकार के सभी टैक्स नियमों जैसे GSTR-1, GSTR-3B, टीडीएस (24Q, 26Q), एडवांस टैक्स और इनकम टैक्स रिटर्न को ट्रैक करता है।',
        whyItMatters:
          'समय पर रिटर्न न भरने से सरकारी नोटिस, लेट फीस और ब्याज लगता है। यह रडार सुनिश्चित करता है कि कोई भी रिटर्न समय से पहले तैयार होकर फाइल हो जाए।',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'फाइलिंग्स बनाएं (Generate)',
            description: 'महीने या तिमाही के सभी रिटर्न्स एक साथ कुछ ही सेकंड में बनाएं।',
          },
          {
            stepNumber: 2,
            title: 'प्रगति जांचें',
            description: 'दस्तावेज़ प्राप्ति, टैक्स गणना और फाइलिंग स्थिति पर नज़र रखें।',
          },
          {
            stepNumber: 3,
            title: 'पावती (Ack No.) दर्ज करें',
            description: 'फाइल करने के बाद रसीद और पावती संख्या दर्ज करें ताकि क्लाइंट को तुरंत सूचित हो सके।',
          },
        ],
        buttons: [
          {
            id: 'tour-compliance-search',
            selector: '[data-tour="compliance-search"]',
            name: 'फाइलिंग खोजें (Search)',
            description: 'फॉर्म का नाम (जैसे GSTR-3B, ITR) या क्लाइंट का नाम लिखकर खोजें।',
            proTip: '"3B" लिखकर महीने के सभी जीएसटी रिटर्न्स एक साथ देखें।',
            iconName: 'Search',
          },
          {
            id: 'tour-compliance-generate',
            selector: '[data-tour="compliance-generate"]',
            name: 'फाइलिंग्स उत्पन्न करें (Generate)',
            description: 'सभी क्लाइंट्स के लिए महीने के रिटर्न्स एक क्लिक में तैयार करता है।',
            proTip: 'महीने की पहली तारीख को इसे चलाकर पूरी फाइलिंग लिस्ट तैयार कर लें।',
            iconName: 'Sparkles',
          },
          {
            id: 'tour-compliance-filter',
            selector: '[data-tour="compliance-filter"]',
            name: 'टैक्स श्रेणी फ़िल्टर',
            description: 'जीएसटी, टीडीएस, आयकर या कंपनी मामलों के आधार पर सूची छांटें।',
            proTip: 'जीएसटी सप्ताह के दौरान केवल जीएसटी रिटर्न्स देखने के लिए इसका उपयोग करें।',
            iconName: 'Filter',
          },
          {
            id: 'tour-compliance-radar',
            selector: '[data-tour="compliance-radar"]',
            name: 'रडार तालिका (Table)',
            description: 'रिटर्न का प्रकार, अंतिम तिथि, संबंधित कर्मचारी और स्थिति दर्शाने वाली तालिका।',
            proTip: 'फाइलिंग रसीद या चालान अपलोड करने के लिए लाइन पर क्लिक करें।',
            iconName: 'FileCheck',
          },
        ],
        proTips: [
          'फाइलिंग पूरी होते ही क्लाइंट पोर्टल पर रसीद अपने आप उपलब्ध हो जाती है।',
        ],
      },
      gu: {
        title: 'કાનૂની કર પાલન રડાર (Compliance Radar)',
        subtitle: 'GST, TDS, ઇનકમ ટેક્સ અને કંપની રિટર્ન્સનું કેન્દ્રીય ટ્રેકિંગ.',
        badge: 'ટેક્સ રડાર',
        simpleExplanation:
          'કમ્પ્લાયન્સ રડાર તમારી ફર્મનું ટેક્સ નિયંત્રણ કેન્દ્ર છે. તે GSTR-1, GSTR-3B, TDS (24Q, 26Q), એડવાન્સ ટેક્સ અને વાર્ષિક ઇન્કમટેક્સ રિટર્ન્સ જેવી તમામ કાનૂની મુદતોનું જીવંત ટ્રેકિંગ કરે છે.',
        whyItMatters:
          'સમયસર ફાઇલિંગ ન થવાથી વ્યાજ, દંડ અને સરકારી નોટિસ આવી શકે છે. આ રડાર દ્વારા દરેક ક્લાયન્ટનું રિટર્ન સમયસર ફાઇલ થઈ જાય છે.',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'નવા રિટર્ન્સ જનરેટ કરો',
            description: 'માસિક કે ત્રિમાસિક રિટર્ન્સ એક ક્લિકમાં તમામ ક્લાયન્ટ્સ માટે તૈયાર કરો.',
          },
          {
            stepNumber: 2,
            title: 'પ્રક્રિયા મોનિટર કરો',
            description: 'ડેટા કલેક્શન, ગણતરી અને પોર્ટલ અપલોડની સ્થિતિ ચકાસો.',
          },
          {
            stepNumber: 3,
            title: 'પાવતી (ARN) નોંધો',
            description: 'રિટર્ન ફાઇલ કર્યા પછી પોર્ટલની પાવતી અપલોડ કરો.',
          },
        ],
        buttons: [
          {
            id: 'tour-compliance-search',
            selector: '[data-tour="compliance-search"]',
            name: 'રિટર્ન સર્ચ (Search)',
            description: 'ફોર્મનું નામ (GSTR-3B, 26Q) અથવા ક્લાયન્ટનું નામ શોધો.',
            proTip: 'મહિનાની ૨૦ તારીખે "3B" સર્ચ કરીને બાકી જીએસટી ચેક કરો.',
            iconName: 'Search',
          },
          {
            id: 'tour-compliance-generate',
            selector: '[data-tour="compliance-generate"]',
            name: 'ફાઇલિંગ્સ જનરેટ કરો (Generate)',
            description: 'તમામ સક્રિય ક્લાયન્ટ્સ માટે માસિક રિટર્ન્સની યાદી આપોઆપ બનાવે છે.',
            proTip: 'મહિનાની શરૂઆતમાં આ ચલાવીને આખા મહિનાનું પ્લાનિંગ કરો.',
            iconName: 'Sparkles',
          },
          {
            id: 'tour-compliance-filter',
            selector: '[data-tour="compliance-filter"]',
            name: 'કેટેગરી ફિલ્ટર્સ',
            description: 'GST, TDS, Income Tax કે બાકી (Overdue) સ્થિતિ મુજબ ફિલ્ટર કરો.',
            proTip: 'ઓવરડ્યુ ફાઇલિંગ્સ ઝડપથી જોવા માટે આ ફિલ્ટર વાપરો.',
            iconName: 'Filter',
          },
          {
            id: 'tour-compliance-radar',
            selector: '[data-tour="compliance-radar"]',
            name: 'કમ્પ્લાયન્સ ટેબલ',
            description: 'રિટર્નનો પ્રકાર, મુદત તારીખ અને ફાઇલિંગ સ્ટેટસ દર્શાવતું ટેબલ.',
            proTip: 'ચલાણ કે પાવતી અપલોડ કરવા માટે રિટર્ન પર ક્લિક કરો.',
            iconName: 'FileCheck',
          },
        ],
        proTips: [
          'ફાઇલિંગ પૂર્ણ થયા પછી ક્લાયન્ટ પોર્ટલ પર આપોઆપ પહોંચ મળી જાય છે.',
        ],
      },
      mr: {
        title: 'वैधानिक कर अनुपालन रडार (Compliance Radar)',
        subtitle: 'जीएसटी, टीडीएस, प्राप्तिकर आणि कंपनी विवरणपत्रांचे केंद्रीय नियंत्रण.',
        badge: 'टॅक्स रडार',
        simpleExplanation:
          'कम्प्लायन्स रडार हे आपल्या फर्मचे मुख्य वैधानिक केंद्र आहे. हे GSTR-1, GSTR-3B, टीडीएस (24Q, 26Q), आगाऊ कर आणि वार्षिक प्राप्तिकर विवरणपत्रांच्या मुदतींवर बारीक लक्ष ठेवते.',
        whyItMatters:
          'विवरणपत्र भरण्यास उशीर झाल्यास दंड आणि व्याज भरावे लागते. हे रडार प्रत्येक विवरणपत्र मुदतीपूर्वी तयार आणि सादर करण्यास मदत करते.',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'विवरणपत्रे तयार करा (Generate)',
            description: 'सर्व ग्राहकांसाठी महिन्याची किंवा तिमाहीची विवरणपत्रे एका क्लिकवर तयार करा.',
          },
          {
            stepNumber: 2,
            title: 'कामाची स्थिती पहा',
            description: 'कागदपत्रे जमा होणे, कर गणना आणि पोर्टलवर अपलोडची स्थिती तपासा.',
          },
          {
            stepNumber: 3,
            title: 'पावती नोंदवा',
            description: 'विवरणपत्र भरल्यानंतर पोहोच पावती क्रमांक (Ack No) नोंदवून पावती अपलोड करा.',
          },
        ],
        buttons: [
          {
            id: 'tour-compliance-search',
            selector: '[data-tour="compliance-search"]',
            name: 'विवरणपत्र शोध (Search)',
            description: 'फॉर्मचे नाव (GSTR-3B, 26Q) किंवा ग्राहकाचे नाव टाकून शोधा.',
            proTip: '"3B" शोधून प्रलंबित जीएसटी विवरणपत्रे तपासा.',
            iconName: 'Search',
          },
          {
            id: 'tour-compliance-generate',
            selector: '[data-tour="compliance-generate"]',
            name: 'फायलिंग्स तयार करा (Generate)',
            description: 'चालू महिन्यातील सर्व वैधानिक विवरणपत्रांची यादी त्वरित तयार करते.',
            proTip: 'महिन्याच्या सुरुवातीलाच चालवून महिन्याचे नियोजन करा.',
            iconName: 'Sparkles',
          },
          {
            id: 'tour-compliance-filter',
            selector: '[data-tour="compliance-filter"]',
            name: 'कर वर्गवारी फिल्टर',
            description: 'जीएसटी, टीडीएस, प्राप्तिकर किंवा थकीत (Overdue) यानुसार यादी करा.',
            proTip: 'थकीत कामे तातडीने पूर्ण करण्यासाठी वापरा.',
            iconName: 'Filter',
          },
          {
            id: 'tour-compliance-radar',
            selector: '[data-tour="compliance-radar"]',
            name: 'रडार तक्ता (Table)',
            description: 'विवरणपत्राचा प्रकार, देय दिनांक आणि सद्यस्थिती दर्शवणारा तक्ता.',
            proTip: 'पावती किंवा चलन अपलोड करण्यासाठी ओळीवर क्लिक करा.',
            iconName: 'FileCheck',
          },
        ],
        proTips: [
          'विवरणपत्र भरल्यानंतर ग्राहकाला पोर्टलवर थेट पोहोच पावती दिसते.',
        ],
      },
    },
  },

  documents: {
    id: 'documents',
    defaultRoute: '/documents',
    iconName: 'FileText',
    translations: {
      en: {
        title: 'Document Vault & DMS',
        subtitle: 'Secure cloud repository for client tax files, invoices, notices, and challans.',
        badge: 'Document Vault',
        simpleExplanation:
          'Documents is your firm’s secure digital filing cabinet. Store permanent documents (PAN, Incorporation, MOA), annual financial statements, bank statements, tax challans, and GST notices with version history and verification checks.',
        whyItMatters:
          'Tax audits and assessments often require retrieving 5-year-old bank statements or computation sheets in minutes. Centralized document storage eliminates missing files and emails.',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'Upload or Request Files',
            description: 'Drag and drop files directly, or link them directly to a client and financial year.',
          },
          {
            stepNumber: 2,
            title: 'Verify Authenticity',
            description: 'Review client uploads and mark them "Verified" so filing staff know data is trustworthy.',
          },
          {
            stepNumber: 3,
            title: 'Instant Download & Versioning',
            description: 'Download original files with one click, or upload revisions without losing the original.',
          },
        ],
        buttons: [
          {
            id: 'tour-doc-upload',
            selector: '[data-tour="doc-upload"]',
            name: 'Upload Document Button',
            description: 'Uploads PDF, Excel, or image files with client tagging, category assignment, and FY tags.',
            proTip: 'Tag files with the proper Financial Year (e.g. 2024-25) for clean audit trails.',
            iconName: 'UploadCloud',
          },
          {
            id: 'tour-doc-search',
            selector: '[data-tour="doc-search"]',
            name: 'Document Search Bar',
            description: 'Search document titles, filenames, and client names instantaneously.',
            proTip: 'Type "challan" or "form 16" to find specific receipts.',
            iconName: 'Search',
          },
          {
            id: 'tour-doc-filter',
            selector: '[data-tour="doc-filter"]',
            name: 'Category & Year Filter',
            description: 'Filter files by Permanent Records, Financial Statements, Tax Notices, or Client Uploads.',
            proTip: 'Filter by "Unverified" to see new client uploads that need CA review.',
            iconName: 'Filter',
          },
          {
            id: 'tour-doc-table',
            selector: '[data-tour="doc-table"]',
            name: 'Documents Table & Actions',
            description: 'Lists file names, client associations, upload dates, file sizes, and verification badges.',
            proTip: 'Click the download icon to retrieve any document securely from encrypted storage.',
            iconName: 'File',
          },
        ],
        proTips: [
          'Accepted formats include PDF, Excel, Word, and clear images up to 25 MB.',
          'Always mark verified after checking supporting figures against bank statements.',
        ],
      },
      hi: {
        title: 'दस्तावेज़ तिजोरी (Document Vault)',
        subtitle: 'क्लाइंट फाइलों, चालान, नोटिस और वित्तीय विवरणों का सुरक्षित डिजिटल भंडार।',
        badge: 'दस्तावेज़ वॉल्ट',
        simpleExplanation:
          'दस्तावेज़ फीचर आपकी फर्म की डिजिटल अलमारी है। यहाँ क्लाइंट्स के स्थायी दस्तावेज़ (पैन, जीएसटी प्रमाण पत्र, पैन), बैंक स्टेटमेंट, ऑडिट रिपोर्ट और टैक्स चालान सुरक्षित रहते हैं।',
        whyItMatters:
          'टैक्स स्क्रूटनी या असेसमेंट के समय पुराने दस्तावेज़ तुरंत ढूंढने पड़ते हैं। डिजिटल वॉल्ट से कोई भी फाइल खोती नहीं है।',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'दस्तावेज़ अपलोड करें',
            description: 'फाइल चुनें, क्लाइंट और वित्तीय वर्ष (FY) टैग करके सुरक्षित सहेजें।',
          },
          {
            stepNumber: 2,
            title: 'सत्यापन (Verification) करें',
            description: 'दस्तावेज़ की जांच करके उसे "Verified" मार्क करें।',
          },
          {
            stepNumber: 3,
            title: 'डाउनलोड व उपयोग',
            description: 'फाइलिंग करते समय एक क्लिक में असली दस्तावेज डाउनलोड करें।',
          },
        ],
        buttons: [
          {
            id: 'tour-doc-upload',
            selector: '[data-tour="doc-upload"]',
            name: 'दस्तावेज़ अपलोड करें (Upload)',
            description: 'पीडीएफ, एक्सेल या इमेज फाइल अपलोड करने के लिए डायलॉग खोलता है।',
            proTip: 'सही वित्तीय वर्ष चुनना याद रखें ताकि बाद में खोजना आसान हो।',
            iconName: 'UploadCloud',
          },
          {
            id: 'tour-doc-search',
            selector: '[data-tour="doc-search"]',
            name: 'दस्तावेज़ खोजें (Search)',
            description: 'फाइल का नाम या क्लाइंट का नाम लिखकर तुरंत फाइल निकालें।',
            proTip: '"Challan" या "Bank" लिखकर सीधे प्रासंगिक फाइलें खोजें।',
            iconName: 'Search',
          },
          {
            id: 'tour-doc-filter',
            selector: '[data-tour="doc-filter"]',
            name: 'श्रेणी व वर्ष फ़िल्टर',
            description: 'स्थायी रिकॉर्ड, टैक्स नोटिस या वित्तीय वर्ष के आधार पर छांटें।',
            proTip: 'समीक्षा के लिए "Unverified" फ़िल्टर का उपयोग करें।',
            iconName: 'Filter',
          },
          {
            id: 'tour-doc-table',
            selector: '[data-tour="doc-table"]',
            name: 'दस्तावेज़ तालिका',
            description: 'फाइल का नाम, आकार, अपलोड तिथि और डाउनलोड बटन दर्शाता है।',
            proTip: 'डाउनलोड आइकन पर क्लिक करके सुरक्षित फाइल प्राप्त करें।',
            iconName: 'File',
          },
        ],
        proTips: [
          '25 MB तक की फाइलें सुरक्षित रूप से अपलोड की जा सकती हैं।',
        ],
      },
      gu: {
        title: 'દસ્તાવેજ તિજોરી (Document Vault)',
        subtitle: 'ક્લાયન્ટ કર ફાઇલો, ઇન્વૉઇસ, ચલાણ અને સરકારી નોટિસનું સુરક્ષિત સ્ટોરેજ.',
        badge: 'દસ્તાવેજ વોલ્ટ',
        simpleExplanation:
          'આ સ્ક્રીન તમારી ફર્મની ડિજિટલ તિજોરી છે. અહીં વેપારીઓના કાયમી દસ્તાવેજો (PAN, ભાગીદારી દસ્તાવેજ), બેંક સ્ટેટમેન્ટ્સ, ઇન્કમટેક્સ ચલાણ અને જીએસટી નોટિસો સુરક્ષિત રહે છે.',
        whyItMatters:
          'ઓડિટ કે ચકાસણી વખતે વર્ષો જૂના દસ્તાવેજો ક્ષણવારમાં મળી જાય છે અને ફાઇલ ગુમ થવાની ચિંતા રહેતી નથી.',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'ફાઇલ અપલોડ કરો',
            description: 'ક્લાયન્ટ અને નાણાકીય વર્ષ (FY) સિલેક્ટ કરીને દસ્તાવેજ અપલોડ કરો.',
          },
          {
            stepNumber: 2,
            title: 'વેરિફિકેશન કરો',
            description: 'દસ્તાવેજ ચકાસીને "Verified" માર્ક કરો.',
          },
          {
            stepNumber: 3,
            title: 'ડાઉનલોડ કરો',
            description: 'જરૂર પડે ત્યારે એક ક્લિકમાં સુરક્ષિત ડાઉનલોડ કરો.',
          },
        ],
        buttons: [
          {
            id: 'tour-doc-upload',
            selector: '[data-tour="doc-upload"]',
            name: 'અપલોડ બટન (Upload)',
            description: 'PDF કે Excel ફાઇલો ક્લાયન્ટ ટેગ સાથે અપલોડ કરવા માટે.',
            proTip: 'નાણાકીય વર્ષ બરાબર પસંદ કરો જેથી શોધવામાં સરળતા રહે.',
            iconName: 'UploadCloud',
          },
          {
            id: 'tour-doc-search',
            selector: '[data-tour="doc-search"]',
            name: 'દસ્તાવેજ સર્ચ',
            description: 'ફાઇલનું નામ કે ક્લાયન્ટનું નામ લખીને શોધો.',
            proTip: '"ચલાણ" કે "સ્ટેટમેન્ટ" લખીને સીધા દસ્તાવેજ મેળવો.',
            iconName: 'Search',
          },
          {
            id: 'tour-doc-filter',
            selector: '[data-tour="doc-filter"]',
            name: 'કેટેગરી ફિલ્ટર્સ',
            description: 'સ્થાયી રેકોર્ડ્સ, વાર્ષિક હિસાબો કે વર્ષ મુજબ યાદી ફિલ્ટર કરો.',
            proTip: 'તપાસવા માટે "Unverified" ફિલ્ટર વાપરો.',
            iconName: 'Filter',
          },
          {
            id: 'tour-doc-table',
            selector: '[data-tour="doc-table"]',
            name: 'દસ્તાવેજ ટેબલ',
            description: 'ફાઇલનું નામ, કદ અને ડાઉનલોડ લિંક દર્શાવતું ટેબલ.',
            proTip: 'ડાઉનલોડ આઇકન પર ક્લિક કરીને ફાઇલ મેળવો.',
            iconName: 'File',
          },
        ],
        proTips: [
          'PDF અને Excel બંને ફાઇલો ૨૫ MB સુધી સપોર્ટ કરે છે.',
        ],
      },
      mr: {
        title: 'कागदपत्र दालन (Document Vault)',
        subtitle: 'ग्राहकांच्या कर फाइल्स, पावत्या, चलन आणि सरकारी नोटिसांचे सुरक्षित भांडार.',
        badge: 'दस्तऐवज वॉल्ट',
        simpleExplanation:
          'डॉक्युमेंट्स हे आपल्या फर्मचे डिजिटल कपाट आहे. येथे ग्राहकांची पॅन कार्ड, कंपनी नोंदणी प्रमाणपत्रे, बँक स्टेटमेंट्स, कर चलन आणि नोटिसा सुरक्षितपणे साठवल्या जातात.',
        whyItMatters:
          'प्राप्तिकर छाननीच्या वेळी जुनी कागदपत्रे तात्काळ लागतात. डिजिटल वॉल्टमुळे कागदपत्रे गहाळ होण्याची भीती संपते.',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'अपलोड करा',
            description: 'ग्राहक आणि आर्थिक वर्ष निवडून कागदपत्रे सुरक्षित साठवा.',
          },
          {
            stepNumber: 2,
            title: 'पडताळणी करा',
            description: 'कागदपत्र तपासून "Verified" म्हणून चिन्हांकित करा.',
          },
          {
            stepNumber: 3,
            title: 'वापरा आणि डाऊनलोड करा',
            description: 'काम करताना एका क्लिकवर मूळ कागदपत्र डाऊनलोड करा.',
          },
        ],
        buttons: [
          {
            id: 'tour-doc-upload',
            selector: '[data-tour="doc-upload"]',
            name: 'कागदपत्र अपलोड (Upload)',
            description: 'पीडीएफ किंवा एक्सेल फाइल्स अपलोड करण्यासाठी विंडो उघडते.',
            proTip: 'योग्य आर्थिक वर्ष निवडल्यास नंतर शोधणे सोपे होते.',
            iconName: 'UploadCloud',
          },
          {
            id: 'tour-doc-search',
            selector: '[data-tour="doc-search"]',
            name: 'कागदपत्र शोध (Search)',
            description: 'फाइलचे नाव किंवा ग्राहकाचे नाव टाकून कागदपत्र शोधा.',
            proTip: '"Challan" किंवा "Statement" लिहून थेट फाइल शोधा.',
            iconName: 'Search',
          },
          {
            id: 'tour-doc-filter',
            selector: '[data-tour="doc-filter"]',
            name: 'वर्गवारी फिल्टर',
            description: 'कायमस्वरूपी नोंदी, आर्थिक ताळेबंद किंवा वर्षानुसार वर्गवारी करा.',
            proTip: 'पडताळणीसाठी "Unverified" पर्याय निवडा.',
            iconName: 'Filter',
          },
          {
            id: 'tour-doc-table',
            selector: '[data-tour="doc-table"]',
            name: 'कागदपत्र तक्ता',
            description: 'फाइलचे नाव, आकार आणि डाऊनलोड पर्यायांची यादी.',
            proTip: 'डाऊनलोड चिन्हावर क्लिक करून फाइल मिळवा.',
            iconName: 'File',
          },
        ],
        proTips: [
          '२५ MB पर्यंतच्या फाइल्स सुरक्षित साठवता येतात.',
        ],
      },
    },
  },

  requests: {
    id: 'requests',
    defaultRoute: '/requests',
    iconName: 'Inbox',
    translations: {
      en: {
        title: 'Information & PBC Requests',
        subtitle: 'Track document requests, client follow-ups, and pending submissions.',
        badge: 'PBC Tracker',
        simpleExplanation:
          'Requests manage "Provided By Client" (PBC) items. Instead of sending endless WhatsApp messages or emails for missing bank statements or purchase bills, create a structured request. The client uploads directly into this request in their portal.',
        whyItMatters:
          'Delays from clients waiting to send bank statements or purchase registers is the #1 cause of late filings. Track exactly who owes what in one organized dashboard.',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'Send Request to Client',
            description: 'Specify the required document (e.g. March 2025 Bank Statement), due date, and instructions.',
          },
          {
            stepNumber: 2,
            title: 'Client Receives & Uploads',
            description: 'The client sees the request in their portal, uploads the file, and marks it submitted.',
          },
          {
            stepNumber: 3,
            title: 'Review and Approve',
            description: 'Staff inspect the uploaded document, approve it, or request a re-upload if incomplete.',
          },
        ],
        buttons: [
          {
            id: 'tour-request-create',
            selector: '[data-tour="request-create"]',
            name: 'Create Request Button',
            description: 'Drafts a new document or info request addressed to the client with an explicit deadline.',
            proTip: 'Set the deadline 5 days before the statutory filing due date.',
            iconName: 'PlusCircle',
          },
          {
            id: 'tour-request-search',
            selector: '[data-tour="request-search"]',
            name: 'Request Search',
            description: 'Search requests by title, description, or client name.',
            proTip: 'Search "statement" to see all pending bank requests.',
            iconName: 'Search',
          },
          {
            id: 'tour-request-filter',
            selector: '[data-tour="request-filter"]',
            name: 'Status Filters',
            description: 'Filter by Pending, Submitted by Client, Approved, or Overdue.',
            proTip: 'Filter by "Submitted" to review incoming client uploads immediately.',
            iconName: 'Filter',
          },
          {
            id: 'tour-request-table',
            selector: '[data-tour="request-table"]',
            name: 'Requests Table & Reminders',
            description: 'Lists all open requests with due date indicators and one-click reminder buttons.',
            proTip: 'Click the remind button to trigger a prompt in the client’s portal notification feed.',
            iconName: 'Send',
          },
        ],
        proTips: [
          'Clients get instant email and portal notifications whenever a new request is created.',
        ],
      },
      hi: {
        title: 'दस्तावेज़ व जानकारी अनुरोध (Requests)',
        subtitle: 'क्लाइंट्स से अपेक्षित दस्तावेज़ों का औपचारिक अनुरोध और फॉलो-अप।',
        badge: 'पीबीसी ट्रैकर',
        simpleExplanation:
          'रिक्वेस्ट्स फीचर क्लाइंट्स से दस्तावेज़ मंगवाने की प्रक्रिया को आसान बनाता है। व्हाट्सएप या फोन करने के बजाय यहाँ अनुरोध बनाएं; क्लाइंट अपने पोर्टल पर सीधे फाइल अपलोड कर देता है।',
        whyItMatters:
          'क्लाइंट से समय पर बैंक स्टेटमेंट या बिल न मिलना फाइलिंग में देरी का मुख्य कारण होता है। इस ट्रैकर से पता रहता है कि किस क्लाइंट से क्या बाकी है।',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'अनुरोध भेजें',
            description: 'क्लाइंट चुनें, आवश्यक दस्तावेज़ का नाम और जमा करने की अंतिम तिथि तय करें।',
          },
          {
            stepNumber: 2,
            title: 'क्लाइंट अपलोड करता है',
            description: 'क्लाइंट अपने पोर्टल से सीधे आवश्यक फाइल अपलोड कर देता है।',
          },
          {
            stepNumber: 3,
            title: 'जांचें व स्वीकृत करें',
            description: 'दस्तावेज़ की पुष्टि करके उसे स्वीकृत (Approve) करें।',
          },
        ],
        buttons: [
          {
            id: 'tour-request-create',
            selector: '[data-tour="request-create"]',
            name: 'अनुरोध बनाएं (Create request)',
            description: 'क्लाइंट से नए दस्तावेज़ मांगने के लिए फॉर्म खोलता है।',
            proTip: 'रिटर्न की अंतिम तिथि से कम से कम 5 दिन पहले की तारीख रखें।',
            iconName: 'PlusCircle',
          },
          {
            id: 'tour-request-search',
            selector: '[data-tour="request-search"]',
            name: 'अनुरोध खोजें',
            description: 'अनुरोध का नाम या क्लाइंट का नाम लिखकर खोजें।',
            proTip: '"Bank" लिखकर सभी बैंक स्टेटमेंट से जुड़े अनुरोध देखें।',
            iconName: 'Search',
          },
          {
            id: 'tour-request-filter',
            selector: '[data-tour="request-filter"]',
            name: 'स्थिति फ़िल्टर',
            description: 'लंबित (Pending), जमा किया गया (Submitted) या स्वीकृत अनुसार छांटें।',
            proTip: 'क्लाइंट द्वारा भेजी गई नई फाइलें देखने के लिए "Submitted" चुनें।',
            iconName: 'Filter',
          },
          {
            id: 'tour-request-table',
            selector: '[data-tour="request-table"]',
            name: 'अनुरोध तालिका',
            description: 'सभी अनुरोधों की स्थिति और रिमाइंडर भेजने का विकल्प।',
            proTip: 'रिमाइंडर बटन दबाकर क्लाइंट को दोबारा याद दिलाएं।',
            iconName: 'Send',
          },
        ],
        proTips: [
          'अनुरोध बनते ही क्लाइंट को पोर्टल पर तुरंत अलर्ट जाता है।',
        ],
      },
      gu: {
        title: 'દસ્તાવેજ વિનંતીઓ (Requests)',
        subtitle: 'ક્લાયન્ટ્સ પાસેથી જરૂરી કાગળો મંગાવવા અને ફોલો-અપ રાખવાની વ્યવસ્થા.',
        badge: 'PBC ટ્રેકર',
        simpleExplanation:
          'આ ફીચર ક્લાયન્ટ પાસેથી જરૂરી દસ્તાવેજો (જેમ કે બેંક સ્ટેટમેન્ટ, ખરીદી બિલો) મંગાવવાનું કામ સરળ બનાવે છે. ક્લાયન્ટ પોતાના પોર્ટલ પરથી સીધો જ દસ્તાવેજ અપલોડ કરી શકે છે.',
        whyItMatters:
          'ક્લાયન્ટ તરફથી સમયસર કાગળો ન આવવાથી રિટર્ન મોડું થાય છે. આ સિસ્ટમ દ્વારા કોની પાસે શું બાકી છે તે સ્પષ્ટ જણાય છે.',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'વિનંતી મોકલો',
            description: 'જરૂરી દસ્તાવેજનું નામ અને છેલ્લી તારીખ નક્કી કરો.',
          },
          {
            stepNumber: 2,
            title: 'ક્લાયન્ટ અપલોડ કરે',
            description: 'ક્લાયન્ટ પોતાના મોબાઇલ કે કમ્પ્યુટરથી સીધી ફાઇલ સબમિટ કરે છે.',
          },
          {
            stepNumber: 3,
            title: 'ચકાસો અને મંજૂર કરો',
            description: 'કાગળ સાચો હોય તો તેને મંજૂર (Approve) કરો.',
          },
        ],
        buttons: [
          {
            id: 'tour-request-create',
            selector: '[data-tour="request-create"]',
            name: 'નવી વિનંતી (Create)',
            description: 'ક્લાયન્ટ પાસેથી નવો દસ્તાવેજ મંગાવવા માટે ફોર્મ ખોલે છે.',
            proTip: 'મુદત તારીખ ૫ દિવસ વહેલી રાખવી હિતાવહ છે.',
            iconName: 'PlusCircle',
          },
          {
            id: 'tour-request-search',
            selector: '[data-tour="request-search"]',
            name: 'વિનંતી સર્ચ',
            description: 'ક્લાયન્ટ કે કાગળના નામ પરથી શોધો.',
            proTip: '"Statement" લખીને તમામ બેંક સ્ટેટમેન્ટ વિનંતીઓ જુઓ.',
            iconName: 'Search',
          },
          {
            id: 'tour-request-filter',
            selector: '[data-tour="request-filter"]',
            name: 'સ્ટેટસ ફિલ્ટર',
            description: 'પેન્ડિંગ, સબમિટ થયેલ કે મંજૂર વિનંતીઓ અલગ તારવો.',
            proTip: 'નવા આવેલા કાગળો ચકાસવા માટે "Submitted" ફિલ્ટર વાપરો.',
            iconName: 'Filter',
          },
          {
            id: 'tour-request-table',
            selector: '[data-tour="request-table"]',
            name: 'વિનંતી યાદી ટેબલ',
            description: 'તમામ વિનંતીઓ અને રીમાઇન્ડર મોકલવાના બટન સાથેનું ટેબલ.',
            proTip: 'ક્લાયન્ટને ફરી યાદ અપાવવા રીમાઇન્ડર બટન દબાવો.',
            iconName: 'Send',
          },
        ],
        proTips: [
          'વિનંતી મૂકતા જ ક્લાયન્ટના પોર્ટલ પર નોટિફિકેશન પહોંચી જાય છે.',
        ],
      },
      mr: {
        title: 'माहिती व कागदपत्र विनंत्या (Requests)',
        subtitle: 'ग्राहकांकडून आवश्यक कागदपत्रे मागवणे आणि पाठपुरावा करणे.',
        badge: 'पीबीसी ट्रॅकर',
        simpleExplanation:
          'हे फीचर ग्राहकांकडून हिशोबाची कागदपत्रे (बँक स्टेटमेंट, पावत्या) मागवण्याचे काम सोपे करते. ग्राहक थेट त्यांच्या पोर्टलवरून कागदपत्र अपलोड करू शकतात.',
        whyItMatters:
          'ग्राहकांकडून वेळेवर कागदपत्रे न मिळणे हे विवरणपत्र उशिरा जाण्याचे मुख्य कारण असते. या ट्रॅकरमुळे कोणाकडे काय बाकी आहे हे लगेच समजते.',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'विनंती पाठवा',
            description: 'कागदपत्राचे नाव आणि अंतिम मुदत ठरवून विनंती तयार करा.',
          },
          {
            stepNumber: 2,
            title: 'ग्राहक अपलोड करतो',
            description: 'ग्राहक त्यांच्या पोर्टलवरून आवश्यक कागदपत्र त्वरित अपलोड करतो.',
          },
          {
            stepNumber: 3,
            title: 'तपासा आणि मंजूर करा',
            description: 'कागदपत्र बरोबर असल्यास मंजूर (Approve) करा.',
          },
        ],
        buttons: [
          {
            id: 'tour-request-create',
            selector: '[data-tour="request-create"]',
            name: 'नवीन विनंती (Create request)',
            description: 'ग्राहकाकडे नवीन कागदपत्राची मागणी करण्यासाठी फॉर्म उघडतो.',
            proTip: 'मुदत अंतिम तारखेच्या ५ दिवस आधीची ठेवा.',
            iconName: 'PlusCircle',
          },
          {
            id: 'tour-request-search',
            selector: '[data-tour="request-search"]',
            name: 'विनंती शोध',
            description: 'ग्राहकाच्या नावाने किंवा कागदपत्राच्या नावाने शोधा.',
            proTip: '"बँक" लिहून सर्व बँक विनंत्या तपासा.',
            iconName: 'Search',
          },
          {
            id: 'tour-request-filter',
            selector: '[data-tour="request-filter"]',
            name: 'स्थिती फिल्टर',
            description: 'प्रलंबित, सादर केलेले किंवा मंजूर यानुसार यादी करा.',
            proTip: 'तपासणीसाठी "Submitted" पर्याय निवडा.',
            iconName: 'Filter',
          },
          {
            id: 'tour-request-table',
            selector: '[data-tour="request-table"]',
            name: 'विनंती तक्ता',
            description: 'सर्व विनंत्या आणि ग्राहकाला स्मरणपत्र पाठवण्याचा पर्याय.',
            proTip: 'आठवण करून देण्यासाठी रिमाइंडर बटण वापरा.',
            iconName: 'Send',
          },
        ],
        proTips: [
          'विनंती तयार होताच ग्राहकाला त्वरित नोटीस जाते.',
        ],
      },
    },
  },

  messages: {
    id: 'messages',
    defaultRoute: '/messages',
    iconName: 'MessageSquare',
    translations: {
      en: {
        title: 'Client Communication & Messaging',
        subtitle: 'Secure, professional two-way communications linked directly to client records.',
        badge: 'Firm Messenger',
        simpleExplanation:
          'Messages provides secure, auditable communication between your accounting firm and clients. Instead of informal WhatsApp chats where tax calculations and sensitive notices get scattered, maintain clean discussion threads linked to clients.',
        whyItMatters:
          'Clear written records protect the firm against dispute claims ("I sent the bills on time"). Every message is timestamped and permanently archived.',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'Select Client Conversation',
            description: 'Choose a client thread from the conversation sidebar on the left.',
          },
          {
            stepNumber: 2,
            title: 'Send Messages & Files',
            description: 'Send tax computations, ask clarification questions, or attach invoices.',
          },
          {
            stepNumber: 3,
            title: 'Real-time Updates',
            description: 'Clients receive notifications and reply directly inside their secure portal.',
          },
        ],
        buttons: [
          {
            id: 'tour-message-thread',
            selector: '[data-tour="message-thread"]',
            name: 'Conversation Sidebar',
            description: 'Lists active chat threads with clients, highlighting unread messages with badges.',
            proTip: 'Clients with unread messages sort to the top automatically.',
            iconName: 'Users',
          },
          {
            id: 'tour-message-input',
            selector: '[data-tour="message-input"]',
            name: 'Message Composer',
            description: 'Type professional tax advisories, instructions, or queries for the client.',
            proTip: 'Press Enter to send, or Shift+Enter for a new line.',
            iconName: 'Edit3',
          },
          {
            id: 'tour-message-send',
            selector: '[data-tour="message-send"]',
            name: 'Send Message Button',
            description: 'Dispatches the message instantly to the client portal and sends an email notification.',
            proTip: 'Keeps an immutable timestamp for all communications.',
            iconName: 'Send',
          },
        ],
        proTips: [
          'Keep advice written clearly and avoid informal shorthand for official tax consultations.',
        ],
      },
      hi: {
        title: 'क्लाइंट संदेश व संवाद (Messages)',
        subtitle: 'फर्म और क्लाइंट के बीच सुरक्षित, व्यावसायिक और प्रमाणित बातचीत।',
        badge: 'फर्म मैसेंजर',
        simpleExplanation:
          'मैसेजेस फीचर फर्म और क्लाइंट के बीच सुरक्षित बातचीत की सुविधा देता है। व्हाट्सएप पर जरूरी टैक्स हिसाब खो जाने के बजाय यहाँ हर क्लाइंट के नाम से अलग चैट रिकॉर्ड रहता है।',
        whyItMatters:
          'लिखित रिकॉर्ड रहने से बाद में कोई विवाद नहीं होता कि किसने कब कौन सी जानकारी भेजी थी। हर मैसेज का समय दर्ज रहता है।',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'क्लाइंट चुनें',
            description: 'बाईं तरफ की सूची में से उस क्लाइंट को चुनें जिससे बात करनी है।',
          },
          {
            stepNumber: 2,
            title: 'संदेश लिखें',
            description: 'टैक्स सलाह, प्रश्नों या दस्तावेज़ों के बारे में संदेश लिखें।',
          },
          {
            stepNumber: 3,
            title: 'तुरंत उत्तर प्राप्त करें',
            description: 'क्लाइंट अपने पोर्टल से उत्तर देता है जो यहाँ तुरंत दिखाई देता है।',
          },
        ],
        buttons: [
          {
            id: 'tour-message-thread',
            selector: '[data-tour="message-thread"]',
            name: 'क्लाइंट चैट सूची (Threads)',
            description: 'सभी क्लाइंट्स के साथ बातचीत की सूची, नए संदेशों के साथ बैज दिखाता है।',
            proTip: 'नए संदेश वाले क्लाइंट हमेशा ऊपर आ जाते हैं।',
            iconName: 'Users',
          },
          {
            id: 'tour-message-input',
            selector: '[data-tour="message-input"]',
            name: 'संदेश कंपोजर (Composer)',
            description: 'क्लाइंट के लिए अपना संदेश या कर परामर्श टाइप करें।',
            proTip: 'Enter दबाकर भेजें या Shift+Enter से नई लाइन शुरू करें।',
            iconName: 'Edit3',
          },
          {
            id: 'tour-message-send',
            selector: '[data-tour="message-send"]',
            name: 'संदेश भेजें (Send)',
            description: 'क्लाइंट पोर्टल पर तुरंत संदेश पहुँचाता है।',
            proTip: 'सभी संदेश सुरक्षित रूप से सुरक्षित रहते हैं।',
            iconName: 'Send',
          },
        ],
        proTips: [
          'सभी आधिकारिक कर परामर्श यहाँ सुरक्षित और प्रमाणित रहते हैं।',
        ],
      },
      gu: {
        title: 'ક્લાયન્ટ સંવાદ અને સંદેશા (Messages)',
        subtitle: 'ગ્રાહકો સાથે સુરક્ષિત, વ્યવસાયિક અને રેકોર્ડ થયેલ વાતચીત.',
        badge: 'ફર્મ મેસેન્જર',
        simpleExplanation:
          'મેસેજીસ ફીચર ફર્મ અને વેપારીઓ વચ્ચે સુરક્ષિત વાતચીત માટે છે. વોટ્સએપ પર મહત્વના હિસાબો ખોવાઈ જવાને બદલે અહીં દરેક ક્લાયન્ટ સાથેની વાતચીતનો કાયમી પુરાવો રહે છે.',
        whyItMatters:
          'લેખિત રેકોર્ડ હોવાથી ભવિષ્યમાં કોઈ વિવાદ થતો નથી કે માહિતી સમયસર મળી હતી કે નહીં.',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'ક્લાયન્ટ સિલેક્ટ કરો',
            description: 'ડાબી બાજુની યાદીમાંથી ક્લાયન્ટ પસંદ કરો.',
          },
          {
            stepNumber: 2,
            title: 'મેસેજ મોકલો',
            description: 'કર સલાહ કે બાકી કાગળો અંગે સંદેશ લખો.',
          },
          {
            stepNumber: 3,
            title: 'લાઈવ રીપ્લાય',
            description: 'ક્લાયન્ટ પોતાના પોર્ટલ પરથી જવાબ આપે છે.',
          },
        ],
        buttons: [
          {
            id: 'tour-message-thread',
            selector: '[data-tour="message-thread"]',
            name: 'ચેટ થ્રેડ્સ (Threads)',
            description: 'તમામ ક્લાયન્ટ્સ સાથેની વાતચીતની યાદી.',
            proTip: 'નવા મેસેજવાળા ક્લાયન્ટ આપોઆપ ઉપર આવી જાય છે.',
            iconName: 'Users',
          },
          {
            id: 'tour-message-input',
            selector: '[data-tour="message-input"]',
            name: 'મેસેજ બોક્સ',
            description: 'ક્લાયન્ટ માટે સૂચના કે પ્રશ્નો ટાઇપ કરો.',
            proTip: 'Enter દબાવીને સીધો મેસેજ મોકલો.',
            iconName: 'Edit3',
          },
          {
            id: 'tour-message-send',
            selector: '[data-tour="message-send"]',
            name: 'મોકલો બટન (Send)',
            description: 'ક્લાયન્ટ પોર્ટલ પર તુરંત મેસેજ પહોંચાડે છે.',
            proTip: 'સમય અને તારીખ સાથે કાયમી રેકોર્ડ રહે છે.',
            iconName: 'Send',
          },
        ],
        proTips: [
          'સત્તાવાર ટેક્સ ચર્ચાઓ અહીં કરવાથી કાયદાકીય પુરાવો રહે છે.',
        ],
      },
      mr: {
        title: 'ग्राहक संवाद आणि संदेश (Messages)',
        subtitle: 'ग्राहक आणि फर्ममधील सुरक्षित, व्यावसायिक आणि अधिकृत संवाद.',
        badge: 'फर्म मेसेंजर',
        simpleExplanation:
          'मेसेजेस हे फर्म आणि ग्राहकांमधील सुरक्षित संवादाचे माध्यम आहे. व्हॉट्सअॅपवर महत्त्वाचा हिशोब हरवण्याऐवजी येथे प्रत्येक ग्राहकाची स्वतंत्र आणि सुरक्षित चर्चा नोंदवली जाते.',
        whyItMatters:
          'लेखी नोंदी असल्यामुळे भविष्यात कागदपत्रे वेळेवर दिली होती की नाही यावर वाद निर्माण होत नाहीत.',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'ग्राहक निवडा',
            description: 'डाव्या बाजूच्या यादीतून संबंधित ग्राहक निवडा.',
          },
          {
            stepNumber: 2,
            title: 'संदेश पाठवा',
            description: 'कर सल्ला किंवा कागदपत्रांविषयी विचारणा करा.',
          },
          {
            stepNumber: 3,
            title: 'थेट प्रतिसाद',
            description: 'ग्राहक त्यांच्या पोर्टलवरून थेट उत्तर देतात.',
          },
        ],
        buttons: [
          {
            id: 'tour-message-thread',
            selector: '[data-tour="message-thread"]',
            name: 'संवाद यादी (Threads)',
            description: 'ग्राहकांसोबतच्या सर्व संवादांची यादी.',
            proTip: 'नवीन संदेश असलेले ग्राहक सर्वात वर दिसतात.',
            iconName: 'Users',
          },
          {
            id: 'tour-message-input',
            selector: '[data-tour="message-input"]',
            name: 'संदेश बॉक्स (Composer)',
            description: 'ग्राहकांसाठी सूचना किंवा माहिती टाईप करा.',
            proTip: 'Enter दाबून थेट संदेश पाठवा.',
            iconName: 'Edit3',
          },
          {
            id: 'tour-message-send',
            selector: '[data-tour="message-send"]',
            name: 'पाठवा (Send)',
            description: 'ग्राहकाच्या पोर्टलवर संदेश त्वरित पोहोचवतो.',
            proTip: 'सर्व संदेशांची वेळ आणि दिनांक नोंदवली जाते.',
            iconName: 'Send',
          },
        ],
        proTips: [
          'अधिकृत कर सल्ल्यासाठी या सुविधेचा वापर करा.',
        ],
      },
    },
  },

  myWork: {
    id: 'myWork',
    defaultRoute: '/my-work',
    iconName: 'Briefcase',
    translations: {
      en: {
        title: 'My Work Priority Queue',
        subtitle: 'Personal workbench containing only the tasks, filings, and requests assigned to you.',
        badge: 'Personal Queue',
        simpleExplanation:
          'My Work filters out the noise of the entire firm and focuses purely on what is on your plate today. Every statutory filing, task, and client request assigned to your name appears here in an organized queue.',
        whyItMatters:
          'Staff accountants don’t need to browse through hundreds of firm-wide accounts. My Work gives you an individualized daily action plan.',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'Check Today’s Urgent Items',
            description: 'Review overdue or due-today filings and tasks pinned at the top.',
          },
          {
            stepNumber: 2,
            title: 'Work and Update States',
            description: 'Complete the work, update task states, and attach computation files.',
          },
          {
            stepNumber: 3,
            title: 'Clear Your Queue',
            description: 'Aim for "Inbox Zero" by submitting items for review before end of day.',
          },
        ],
        buttons: [
          {
            id: 'tour-mywork-tabs',
            selector: '[data-tour="mywork-tabs"]',
            name: 'Work Type Tabs',
            description: 'Switch between Assigned Filings, Assigned Tasks, and Awaiting Client Inputs.',
            proTip: 'Start with Assigned Filings during tax deadline weeks.',
            iconName: 'Layers',
          },
          {
            id: 'tour-mywork-filter',
            selector: '[data-tour="mywork-filter"]',
            name: 'Due Date Filter',
            description: 'Filter your assigned work by Overdue, Due Today, Due This Week, or Upcoming.',
            proTip: 'Always tackle Overdue items first to protect firm SLA.',
            iconName: 'Filter',
          },
        ],
        proTips: [
          'Bookmark this page as your home screen for quick daily check-ins.',
        ],
      },
      hi: {
        title: 'मेरा काम (My Work)',
        subtitle: 'आपकी व्यक्तिगत कार्य सूची जिसमें केवल आपको सौंपे गए काम और फाइलिंग्स हैं।',
        badge: 'व्यक्तिगत कार्यसूची',
        simpleExplanation:
          'मेरा काम (My Work) आपको केवल उन्हीं कार्यों पर ध्यान केंद्रित करने देता है जो सीधे आपको सौंपे गए हैं। पूरी फर्म के सैकड़ों क्लाइंट्स के बीच भटकने के बजाय केवल अपना दैनिक काम यहाँ देखें।',
        whyItMatters:
          'कर्मचारियों को अपने हिस्से का काम स्पष्ट दिखने से समय बचता है और कोई भी रिटर्न या काम छूटता नहीं है।',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'आज के जरूरी काम देखें',
            description: 'शीर्ष पर दिखाई दे रहे अति-आवश्यक या आज देय कार्यों को देखें।',
          },
          {
            stepNumber: 2,
            title: 'काम पूरा करें',
            description: 'काम पूरा करके स्थिति को "Review" या "Done" में बदलें।',
          },
          {
            stepNumber: 3,
            title: 'सूची खाली करें',
            description: 'दिन के अंत तक अपने सभी जरूरी काम पूरे करने का लक्ष्य रखें।',
          },
        ],
        buttons: [
          {
            id: 'tour-mywork-tabs',
            selector: '[data-tour="mywork-tabs"]',
            name: 'कार्य श्रेणी टैब्स',
            description: 'फाइलिंग्स, टास्क और क्लाइंट अनुरोधों के बीच बदलें।',
            proTip: 'फाइलिंग की तारीखों में सबसे पहले "Filings" टैब देखें।',
            iconName: 'Layers',
          },
          {
            id: 'tour-mywork-filter',
            selector: '[data-tour="mywork-filter"]',
            name: 'समय-सीमा फ़िल्टर',
            description: 'आज के काम, इस हफ्ते के काम या बकाया काम छांटें।',
            proTip: 'सबसे पहले "Overdue" काम पूरे करें।',
            iconName: 'Filter',
          },
        ],
        proTips: [
          'रोज सुबह सबसे पहले "मेरा काम" खोलकर दिन की योजना बनाएं।',
        ],
      },
      gu: {
        title: 'મારું કામ (My Work)',
        subtitle: 'તમારી વ્યક્તિગત કાર્યસૂચિ જેમાં ફક્ત તમને સોંપાયેલ કાર્યો અને ફાઇલિંગ્સ છે.',
        badge: 'પર્સનલ વર્કબેન્ચ',
        simpleExplanation:
          'આ ફીચર તમને ફક્ત તમારા પોતાના કામ પર ધ્યાન આપવા દે છે. ફર્મના તમામ ક્લાયન્ટ્સમાંથી ફક્ત તમને સોંપાયેલા GST, TDS અને ટાસ્ક અહીં સ્પષ્ટ દેખાય છે.',
        whyItMatters:
          'દરેક સ્ટાફ મેમ્બરને પોતાના કામનું સ્પષ્ટ પ્લાનિંગ મળે છે જેથી કામ ઝડપથી પતે છે.',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'આજના તાકીદના કામ જુઓ',
            description: 'આજે પૂર્ણ કરવાના થતા કામો સૌથી ઉપર દેખાશે.',
          },
          {
            stepNumber: 2,
            title: 'કામ પૂર્ણ કરો',
            description: 'ગણતરી પૂરી કરી સ્ટેટસ અપડેટ કરો.',
          },
          {
            stepNumber: 3,
            title: 'કતાર ખાલી કરો',
            description: 'સાંજ સુધીમાં તમામ પેન્ડિંગ કામ પતાવી દો.',
          },
        ],
        buttons: [
          {
            id: 'tour-mywork-tabs',
            selector: '[data-tour="mywork-tabs"]',
            name: 'વર્ક ટેબ્સ',
            description: 'ફાઇલિંગ્સ અને સામાન્ય ટાસ્ક વચ્ચે સ્વિચ કરો.',
            proTip: 'રિટર્ન ફાઇલિંગના દિવસોમાં પહેલા ફાઇલિંગ્સ પતાવો.',
            iconName: 'Layers',
          },
          {
            id: 'tour-mywork-filter',
            selector: '[data-tour="mywork-filter"]',
            name: 'મુદત ફિલ્ટર',
            description: 'આજના કામ કે બાકી રહેલા કામ મુજબ યાદી જુઓ.',
            proTip: 'ઓવરડ્યુ કામ પહેલા હાથ પર લો.',
            iconName: 'Filter',
          },
        ],
        proTips: [
          'દિવસની શરૂઆત હંમેશા આ સ્ક્રીનથી કરો.',
        ],
      },
      mr: {
        title: 'माझे काम (My Work)',
        subtitle: 'तुमची वैयक्तिक कामांची यादी, ज्यात फक्त तुम्हाला नेमून दिलेली कामे आहेत.',
        badge: 'वैयक्तिक कार्यसूची',
        simpleExplanation:
          'माझे काम हे तुम्हाला थेट सोपवलेल्या कामांवर लक्ष केंद्रित करण्यास मदत करते. संपूर्ण फर्मच्या शेकडो खात्यांमधून फक्त तुमचे स्वतःचे काम येथे वेगळे दिसते.',
        whyItMatters:
          'कर्मचाऱ्यांना स्वतःच्या कामाचे स्पष्ट नियोजन मिळते आणि काम वेळेवर पूर्ण होते.',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'आजची तातडीची कामे पहा',
            description: 'आज मुदत संपणारी कामे तपासा.',
          },
          {
            stepNumber: 2,
            title: 'काम पूर्ण करा',
            description: 'हिशोब तपासून कामाची स्थिती अद्ययावत करा.',
          },
          {
            stepNumber: 3,
            title: 'यादी पूर्ण करा',
            description: 'दिवसअखेर प्रलंबित कामे पूर्ण करून मोकळे व्हा.',
          },
        ],
        buttons: [
          {
            id: 'tour-mywork-tabs',
            selector: '[data-tour="mywork-tabs"]',
            name: 'कार्य प्रकार टॅब',
            description: 'विवरणपत्रे आणि अंतर्गत कामांमध्ये अदलाबदल करा.',
            proTip: 'मुदतीच्या दिवसांत विवरणपत्रांना प्राधान्य द्या.',
            iconName: 'Layers',
          },
          {
            id: 'tour-mywork-filter',
            selector: '[data-tour="mywork-filter"]',
            name: 'मुदत फिल्टर',
            description: 'आज देय किंवा थकीत यानुसार कामे वेगळी करा.',
            proTip: 'थकीत कामे आधी पूर्ण करा.',
            iconName: 'Filter',
          },
        ],
        proTips: [
          'दररोज सकाळी कामाचे नियोजन करण्यासाठी वापरा.',
        ],
      },
    },
  },

  reports: {
    id: 'reports',
    defaultRoute: '/reports/compliance',
    iconName: 'BarChart',
    translations: {
      en: {
        title: 'Practice Analytics & Reports',
        subtitle: 'Audited compliance metrics, team capacity utilization, and client rosters.',
        badge: 'Analytics Suite',
        simpleExplanation:
          'Reports delivers data-driven intelligence for CA practice leaders. Track filing completion rates, discover which staff members are overloaded, and generate PDF/CSV audit summaries for firm partners.',
        whyItMatters:
          'Managing a firm without reports leads to undetected bottlenecks. Reports let partners spot delays days before due dates arrive.',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'Choose Report Type',
            description: 'Select Statutory Compliance Report, Staff Workload Heatmap, or Client Roster.',
          },
          {
            stepNumber: 2,
            title: 'Apply Date & Regime Range',
            description: 'Select specific financial years, quarters, or tax regimes to analyze.',
          },
          {
            stepNumber: 3,
            title: 'Export & Share',
            description: 'Export clean figures for partner meetings or client performance reviews.',
          },
        ],
        buttons: [
          {
            id: 'tour-reports-nav',
            selector: '[data-tour="reports-nav"]',
            name: 'Report Navigation Tabs',
            description: 'Switch between Compliance Report, Workload Report, and Client Roster Report.',
            proTip: 'Use Workload Report before assigning new clients to balance capacity.',
            iconName: 'PieChart',
          },
          {
            id: 'tour-reports-export',
            selector: '[data-tour="reports-export"]',
            name: 'Export Report Button',
            description: 'Downloads structured spreadsheet analysis of the active report.',
            proTip: 'Useful for monthly firm review meetings and performance tracking.',
            iconName: 'Download',
          },
        ],
        proTips: [
          'Review the Compliance Report weekly to ensure your firm maintains a 99%+ on-time filing record.',
        ],
      },
      hi: {
        title: 'विश्लेषण व रिपोर्ट (Reports)',
        subtitle: 'फर्म अनुपालन स्थिति, कर्मचारी कार्यक्षमता और विस्तृत विश्लेषणात्मक रिपोर्ट।',
        badge: 'एनालिटिक्स सूट',
        simpleExplanation:
          'रिपोर्ट्स फीचर फर्म पार्टनर्स को पूरे व्यवसाय का विश्लेषण प्रदान करता है। कितनी फाइलिंग्स समय पर हुईं, किस कर्मचारी पर कितना बोझ है, यह सब यहाँ स्पष्ट चार्ट और तालिकाओं में दिखता है।',
        whyItMatters:
          'सही रिपोर्ट के बिना फर्म में देरी की वजह पता नहीं चलती। यह रिपोर्ट पार्टनर्स को समय से पहले निर्णय लेने में सक्षम बनाती है।',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'रिपोर्ट प्रकार चुनें',
            description: 'अनुपालन रिपोर्ट, कार्यभार रिपोर्ट या क्लाइंट रोस्टर में से चुनें।',
          },
          {
            stepNumber: 2,
            title: 'तारीख व वर्ष चुनें',
            description: 'जिस महीने या वित्तीय वर्ष का विश्लेषण चाहिए, उसे चुनें।',
          },
          {
            stepNumber: 3,
            title: 'एक्सपोर्ट करें',
            description: 'पार्टनर मीटिंग्स के लिए एक्सेल शीट डाउनलोड करें।',
          },
        ],
        buttons: [
          {
            id: 'tour-reports-nav',
            selector: '[data-tour="reports-nav"]',
            name: 'रिपोर्ट नेविगेशन टैब्स',
            description: 'अनुपालन, कार्यभार और रोस्टर रिपोर्ट के बीच बदलें।',
            proTip: 'काम बांटने से पहले कार्यभार रिपोर्ट जरूर देखें।',
            iconName: 'PieChart',
          },
          {
            id: 'tour-reports-export',
            selector: '[data-tour="reports-export"]',
            name: 'एक्सपोर्ट रिपोर्ट (Export)',
            description: 'वर्तमान रिपोर्ट का डेटा स्प्रेडशीट में डाउनलोड करता है।',
            proTip: 'मासिक समीक्षा बैठकों के लिए उपयोगी।',
            iconName: 'Download',
          },
        ],
        proTips: [
          'हर सप्ताह रिपोर्ट देखकर सुनिश्चित करें कि कोई फाइलिंग पेंडिंग न रहे।',
        ],
      },
      gu: {
        title: 'એનાલિટિક્સ અને રિપોર્ટ્સ (Reports)',
        subtitle: 'ફર્મ કર પાલન ટકાવારી, સ્ટાફ ક્ષમતા અને ક્લાયન્ટ વિશ્લેષણ.',
        badge: 'રિપોર્ટિંગ સ્યુટ',
        simpleExplanation:
          'આ ફીચર ફર્મના સંચાલકો માટે સમગ્ર કામગીરીનો ચિતાર આપે છે. કેટલા રિટર્ન સમયસર ફાઇલ થયા અને સ્ટાફની કામગીરી કેવી રહી તે અહીં સ્પષ્ટ જણાય છે.',
        whyItMatters:
          'રિપોર્ટ્સની મદદથી ફર્મમાં ક્યાં વિલંબ થઈ રહ્યો છે તે જાણીને સમયસર સુધારો કરી શકાય છે.',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'રિપોર્ટ પસંદ કરો',
            description: 'કમ્પ્લાયન્સ રિપોર્ટ કે સ્ટાફ વર્કલોડ રિપોર્ટ પસંદ કરો.',
          },
          {
            stepNumber: 2,
            title: 'સમયગાળો નક્કી કરો',
            description: 'નાણાકીય વર્ષ કે ક્વાર્ટર સિલેક્ટ કરો.',
          },
          {
            stepNumber: 3,
            title: 'ડાઉનલોડ કરો',
            description: 'પાર્ટનર રિવ્યુ માટે એક્સેલમાં ડેટા એક્સપોર્ટ કરો.',
          },
        ],
        buttons: [
          {
            id: 'tour-reports-nav',
            selector: '[data-tour="reports-nav"]',
            name: 'રિપોર્ટ ટેબ્સ',
            description: 'વિવિધ રિપોર્ટ્સ વચ્ચે સ્વિચ કરવા માટે.',
            proTip: 'કામની વહેંચણી માટે વર્કલોડ રિપોર્ટ તપાસો.',
            iconName: 'PieChart',
          },
          {
            id: 'tour-reports-export',
            selector: '[data-tour="reports-export"]',
            name: 'એક્સપોર્ટ (Export)',
            description: 'રિપોર્ટ ડેટાને એક્સેલમાં સેવ કરે છે.',
            proTip: 'માસિક મીટિંગ માટે ઉપયોગી.',
            iconName: 'Download',
          },
        ],
        proTips: [
          'અઠવાડિયે એકવાર રિપોર્ટ ચકાસીને ફાઇલિંગ રેટ ૯૯% થી વધુ રાખો.',
        ],
      },
      mr: {
        title: 'व्यवसाय विश्लेषण आणि अहवाल (Reports)',
        subtitle: 'कर पूर्तता आकडेवारी, कर्मचारी क्षमता आणि ग्राहक विश्लेषण अहवाल.',
        badge: 'अहवाल केंद्र',
        simpleExplanation:
          'अहवाल हे सीए फर्मच्या प्रमुखांसाठी संपूर्ण कामाचे विश्लेषण पुरवते. किती विवरणपत्रे वेळेवर भरली गेली आणि कर्मचाऱ्यांवर किती कामाचा ताण आहे हे स्पष्ट समजते.',
        whyItMatters:
          'अहवालांमुळे फर्ममधील कामातील त्रुटी आधीच लक्षात येतात आणि वेळेत सुधारणा करता येते.',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'अहवाल प्रकार निवडा',
            description: 'कर पूर्तता अहवाल किंवा कार्यभार अहवाल निवडा.',
          },
          {
            stepNumber: 2,
            title: 'कालावधी निवडा',
            description: 'आर्थिक वर्ष किंवा तिमाही निवडून विश्लेषण करा.',
          },
          {
            stepNumber: 3,
            title: 'एक्स्पोर्ट करा',
            description: 'महिन्याच्या बैठकीसाठी एक्सेल स्वरूपात माहिती मिळवा.',
          },
        ],
        buttons: [
          {
            id: 'tour-reports-nav',
            selector: '[data-tour="reports-nav"]',
            name: 'अहवाल टॅब',
            description: 'विविध अहवालांमध्ये अदलाबदल करा.',
            proTip: 'नवीन काम देण्यापूर्वी कार्यभार अहवाल तपासा.',
            iconName: 'PieChart',
          },
          {
            id: 'tour-reports-export',
            selector: '[data-tour="reports-export"]',
            name: 'अहवाल डाऊनलोड (Export)',
            description: 'सध्याचा अहवाल एक्सेल फाईलमध्ये डाऊनलोड करतो.',
            proTip: 'मासिक बैठकांसाठी उपयुक्त.',
            iconName: 'Download',
          },
        ],
        proTips: [
          'दर आठवड्याला अहवाल तपासून वेळेवर कामे पूर्ण होत असल्याची खात्री करा.',
        ],
      },
    },
  },

  notifications: {
    id: 'notifications',
    defaultRoute: '/notifications',
    iconName: 'Bell',
    translations: {
      en: {
        title: 'Alerts & Activity Center',
        subtitle: 'Real-time alerts for impending filing deadlines, client uploads, and team mentions.',
        badge: 'Alerts Center',
        simpleExplanation:
          'The Notifications center keeps you informed about critical events happening across the firm: when a client uploads a requested bank statement, when an impending GST deadline is approaching, or when a task is assigned to you.',
        whyItMatters:
          'Instead of constantly refreshing screens or missing client submissions, get instant alerts that take you right to the relevant action.',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'Review Unread Alerts',
            description: 'Scan new notifications with color-coded severity badges.',
          },
          {
            stepNumber: 2,
            title: 'Click to Take Action',
            description: 'Click any notification to navigate directly to the client file, task, or message.',
          },
          {
            stepNumber: 3,
            title: 'Mark Read & Clear',
            description: 'Mark individual notifications read or clear all once reviewed.',
          },
        ],
        buttons: [
          {
            id: 'tour-notif-markall',
            selector: '[data-tour="notif-markall"]',
            name: 'Mark All Read',
            description: 'Quickly marks all pending notifications as read and clears the badge count.',
            proTip: 'Use this once you have reviewed your morning alerts.',
            iconName: 'CheckCheck',
          },
          {
            id: 'tour-notif-filter',
            selector: '[data-tour="notif-filter"]',
            name: 'Read / Unread Filter',
            description: 'Toggles between all notifications and only unread action items.',
            proTip: 'Keep filtered to "Unread only" for focused productivity.',
            iconName: 'Filter',
          },
        ],
        proTips: [
          'The notification bell in the top navigation bar shows an active count wherever you are in the application.',
        ],
      },
      hi: {
        title: 'सूचना व अलर्ट केंद्र (Notifications)',
        subtitle: 'समय-सीमा अलर्ट, क्लाइंट दस्तावेज़ अपलोड और महत्वपूर्ण अपडेट्स।',
        badge: 'अलर्ट केंद्र',
        simpleExplanation:
          'सूचना केंद्र फर्म की सभी जरूरी गतिविधियों की जानकारी तुरंत देता है। जब कोई क्लाइंट दस्तावेज़ अपलोड करता है या टैक्स की समय-सीमा नजदीक आती है, तो यहाँ तुरंत सूचना मिलती है।',
        whyItMatters:
          'बार-बार पेज रीफ्रेश करने की जरूरत नहीं पड़ती और कोई भी जरूरी अपडेट छूटता नहीं है।',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'नए अलर्ट देखें',
            description: 'नए संदेश, फाइल अपलोड और समय-सीमा के अलर्ट देखें।',
          },
          {
            stepNumber: 2,
            title: 'सीधे काम पर जाएं',
            description: 'अलर्ट पर क्लिक करके सीधे संबंधित टास्क या क्लाइंट फाइल पर पहुंचें।',
          },
          {
            stepNumber: 3,
            title: 'पढ़ा हुआ मार्क करें',
            description: 'देखने के बाद सूचनाओं को पढ़ा हुआ (Read) मार्क करें।',
          },
        ],
        buttons: [
          {
            id: 'tour-notif-markall',
            selector: '[data-tour="notif-markall"]',
            name: 'सभी पढ़ा हुआ मार्क करें',
            description: 'एक क्लिक में सभी सूचनाओं को पढ़ा हुआ मानकर बैज हटाता है।',
            proTip: 'सुबह की समीक्षा के बाद इसका उपयोग करें।',
            iconName: 'CheckCheck',
          },
          {
            id: 'tour-notif-filter',
            selector: '[data-tour="notif-filter"]',
            name: 'पढ़ा / न पढ़ा फ़िल्टर',
            description: 'केवल बिना पढ़ी सूचनाएं देखने के लिए फ़िल्टर करें।',
            proTip: '"Unread only" चुनकर केवल नए अलर्ट्स पर ध्यान दें।',
            iconName: 'Filter',
          },
        ],
        proTips: [
          'ऊपर दिए गए घंटी के निशान पर लाल बिंदु नए अलर्ट की जानकारी देता है।',
        ],
      },
      gu: {
        title: 'નોટિફિકેશન અને એલર્ટ કેન્દ્ર (Notifications)',
        subtitle: 'છેલ્લી તારીખો, ક્લાયન્ટ દસ્તાવેજ અપલોડ અને મહત્વની ચેતવણીઓ.',
        badge: 'એલર્ટ સેન્ટર',
        simpleExplanation:
          'આ કેન્દ્ર તમને ફર્મની તમામ મહત્વની ઘટનાઓથી માહિતગાર રાખે છે. જ્યારે કોઈ ક્લાયન્ટ કાગળ અપલોડ કરે કે રિટર્નની મુદત નજીક આવે ત્યારે તુરંત નોટિફિકેશન મળે છે.',
        whyItMatters:
          'કોઈપણ જરૂરી માહિતી છૂટી જતી નથી અને સમયસર પગલાં લઈ શકાય છે.',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'નવા એલર્ટ જુઓ',
            description: 'રિટર્ન મુદત અને ક્લાયન્ટ અપલોડના એલર્ટ્સ તપાસો.',
          },
          {
            stepNumber: 2,
            title: 'ક્લિક કરીને કામ કરો',
            description: 'નોટિફિકેશન પર ક્લિક કરી સીધા સંબંધિત પેજ પર પહોંચો.',
          },
          {
            stepNumber: 3,
            title: 'વાંચેલું માર્ક કરો',
            description: 'જોઈ લીધા પછી "Mark Read" કરો.',
          },
        ],
        buttons: [
          {
            id: 'tour-notif-markall',
            selector: '[data-tour="notif-markall"]',
            name: 'બધું વંચાઈ ગયું (Mark All Read)',
            description: 'બધી નોટિફિકેશન્સ એકસાથે ક્લિયર કરે છે.',
            proTip: 'સવારના રિવ્યુ પછી આનો ઉપયોગ કરો.',
            iconName: 'CheckCheck',
          },
          {
            id: 'tour-notif-filter',
            selector: '[data-tour="notif-filter"]',
            name: 'ફિલ્ટર વિકલ્પ',
            description: 'માત્ર વણવાંચેલા (Unread) એલર્ટ્સ ફિલ્ટર કરો.',
            proTip: 'ધ્યાન કેન્દ્રિત કરવા માટે "Unread" ફિલ્ટર રાખો.',
            iconName: 'Filter',
          },
        ],
        proTips: [
          'ટોપબારમાં રહેલી ઘંટડી પર લાલ બિંદુ નવા એલર્ટ દર્શાવે છે.',
        ],
      },
      mr: {
        title: 'सूचना व अलर्ट केंद्र (Notifications)',
        subtitle: 'मुदत सूचना, ग्राहक कागदपत्र अपलोड आणि तातडीचे अलर्ट.',
        badge: 'अलर्ट केंद्र',
        simpleExplanation:
          'सूचना केंद्र हे फर्ममधील सर्व घडामोडींची त्वरित माहिती देते. ग्राहकाने कागदपत्र पाठवले किंवा कर विवरणपत्राची मुदत जवळ आली की लगेच अलर्ट मिळतो.',
        whyItMatters:
          'कोणतीही महत्त्वाची माहिती वेळेवर समजते आणि मुदत चुकण्याची भीती राहत नाही.',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'नवीन सूचना तपासा',
            description: 'नवीन संदेश, अपलोड आणि मुदतीचे अलर्ट पहा.',
          },
          {
            stepNumber: 2,
            title: 'क्लिक करून थेट जा',
            description: 'सूचनेवर क्लिक करून थेट संबंधित कामावर पोहोचा.',
          },
          {
            stepNumber: 3,
            title: 'वाचलेले म्हणून चिन्हांकित करा',
            description: 'तपासल्यानंतर सूचना क्लिअर करा.',
          },
        ],
        buttons: [
          {
            id: 'tour-notif-markall',
            selector: '[data-tour="notif-markall"]',
            name: 'सर्व वाचलेले चिन्हांकित करा',
            description: 'एका क्लिकवर सर्व सूचना क्लिअर करतो.',
            proTip: 'सकाळी कामाचे नियोजन झाल्यावर वापरा.',
            iconName: 'CheckCheck',
          },
          {
            id: 'tour-notif-filter',
            selector: '[data-tour="notif-filter"]',
            name: 'फिल्टर पर्याय',
            description: 'फक्त न वाचलेल्या सूचना पाहण्यासाठी वापरा.',
            proTip: 'महत्त्वाच्या सूचनांवर लक्ष ठेवण्यासाठी उपयुक्त.',
            iconName: 'Filter',
          },
        ],
        proTips: [
          'वरच्या पट्टीतील घंटा चिन्हावर नवीन सूचनांची संख्या दिसते.',
        ],
      },
    },
  },

  settings: {
    id: 'settings',
    defaultRoute: '/settings/firm',
    iconName: 'Settings',
    translations: {
      en: {
        title: 'Firm Administration & Setup',
        subtitle: 'Configure firm profile, manage staff accounts, statutory catalogues, and audit logs.',
        badge: 'Firm Administration',
        simpleExplanation:
          'Settings is the administrative backbone of FirmDesk. Configure firm credentials (FRN, GSTIN, PAN), invite and manage staff members with granular roles (Admin, Staff), customize filing catalogues, and inspect security audit logs.',
        whyItMatters:
          'Proper firm configuration ensures seamless portal branding for clients and keeps client data secure with role-based access control.',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'Configure Practice Profile',
            description: 'Enter ICAI Firm Registration Number (FRN), contact details, and registered address.',
          },
          {
            stepNumber: 2,
            title: 'Manage Staff & Roles',
            description: 'Invite new articled assistants or senior managers with customized permissions.',
          },
          {
            stepNumber: 3,
            title: 'Inspect Audit Logs',
            description: 'Review immutable audit trails of who created, edited, or downloaded sensitive files.',
          },
        ],
        buttons: [
          {
            id: 'tour-settings-nav',
            selector: '[data-tour="settings-nav"]',
            name: 'Settings Navigation Tabs',
            description: 'Navigate between Firm Details, Staff Users, Statutory Catalogue, and Audit Trail.',
            proTip: 'Use Statutory Catalogue to define custom local filing requirements.',
            iconName: 'Sliders',
          },
          {
            id: 'tour-settings-save',
            selector: '[data-tour="settings-save"]',
            name: 'Save Configuration Button',
            description: 'Commits updated firm configurations and dispatches instant updates across the practice.',
            proTip: 'Changes apply across all staff and client portal screens immediately.',
            iconName: 'Save',
          },
        ],
        proTips: [
          'Ensure 2FA or secure email verification is enabled for all staff accounts.',
        ],
      },
      hi: {
        title: 'फर्म प्रशासन व सेटिंग्स (Settings)',
        subtitle: 'फर्म प्रोफाइल, स्टाफ खाते, टैक्स कैटलॉग और सुरक्षा ऑडिट का प्रबंधन।',
        badge: 'फर्म प्रशासन',
        simpleExplanation:
          'सेटिंग्स फीचर फर्म का प्रशासनिक केंद्र है। यहाँ से सीए फर्म की जानकारी (FRN, पैन, पता), कर्मचारियों के खाते और अनुमतियाँ (Roles), और सुरक्षा ऑडिट लॉग प्रबंधित किए जाते हैं।',
        whyItMatters:
          'कर्मचारियों को उनकी भूमिका के अनुसार सही अधिकार देने से डेटा सुरक्षित रहता है और फर्म सुचारू रूप से चलती है।',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'फर्म प्रोफाइल सेट करें',
            description: 'ICAI फर्म रजिस्ट्रेशन नंबर (FRN), पता और संपर्क सूत्र दर्ज करें।',
          },
          {
            stepNumber: 2,
            title: 'स्टाफ सदस्य जोड़ें',
            description: 'आर्टिकल असिस्टेंट या सीनियर मैनेजर्स को ईमेल से आमंत्रित करें।',
          },
          {
            stepNumber: 3,
            title: 'ऑडिट लॉग जांचें',
            description: 'सुरक्षा के लिए देखें कि किसने कौन सा दस्तावेज़ कब देखा या बदला।',
          },
        ],
        buttons: [
          {
            id: 'tour-settings-nav',
            selector: '[data-tour="settings-nav"]',
            name: 'सेटिंग्स नेविगेशन',
            description: 'फर्म विवरण, कर्मचारी, टैक्स कैटलॉग और ऑडिट लॉग के बीच बदलें।',
            proTip: 'स्टाफ जोड़ने के लिए "Users" टैब का उपयोग करें।',
            iconName: 'Sliders',
          },
          {
            id: 'tour-settings-save',
            selector: '[data-tour="settings-save"]',
            name: 'सेव करें (Save)',
            description: 'बदलावों को सहेजता है जो पूरी फर्म में तुरंत लागू हो जाते हैं।',
            proTip: 'फर्म के पते या फोन में बदलाव के बाद इसे दबाना न भूलें।',
            iconName: 'Save',
          },
        ],
        proTips: [
          'समय-समय पर ऑडिट लॉग देखकर डेटा सुरक्षा सुनिश्चित करें।',
        ],
      },
      gu: {
        title: 'ફર્મ સંચાલન અને સેટિંગ્સ (Settings)',
        subtitle: 'ફર્મ પ્રોફાઇલ, સ્ટાફ ખાતા, ટેક્સ કેટલોગ અને સુરક્ષા ઓડિટનું સંચાલન.',
        badge: 'વહીવટી કેન્દ્ર',
        simpleExplanation:
          'આ સેટિંગ્સ ફર્મનું એડમિન સેન્ટર છે. અહીંથી સીએ ફર્મની વિગતો (FRN નંબર, સરનામું), સ્ટાફ મેમ્બર્સના રોલ્સ અને ઓડિટ લોગ મેનેજ થાય છે.',
        whyItMatters:
          'યોગ્ય એડમિન કંટ્રોલથી ક્લાયન્ટ્સનો ડેટા સંપૂર્ણ સુરક્ષિત રહે છે.',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'પ્રોફાઇલ સેટ કરો',
            description: 'ICAI ફર્મ નંબર, GSTIN અને સરનામું નોંધો.',
          },
          {
            stepNumber: 2,
            title: 'સ્ટાફ એકાઉન્ટ્સ ઉમેરો',
            description: 'નવા આસિસ્ટન્ટ્સને પરમિશન સાથે ઉમેરો.',
          },
          {
            stepNumber: 3,
            title: 'ઓડિટ ટ્રેઇલ જુઓ',
            description: 'ડેટા સુરક્ષા માટે એક્ટિવિટી લોગ તપાસો.',
          },
        ],
        buttons: [
          {
            id: 'tour-settings-nav',
            selector: '[data-tour="settings-nav"]',
            name: 'સેટિંગ્સ નેવિગેશન',
            description: 'ફર્મ પ્રોફાઇલ, યુઝર્સ અને ઓડિટ ટેબ્સ વચ્ચે સ્વિચ કરો.',
            proTip: 'સ્ટાફ મેનેજમેન્ટ માટે "Users" ટેબ ખોલો.',
            iconName: 'Sliders',
          },
          {
            id: 'tour-settings-save',
            selector: '[data-tour="settings-save"]',
            name: 'સેવ બટન (Save)',
            description: 'ફર્મના નવા સેટિંગ્સ તરત જ લાગુ કરે છે.',
            proTip: 'ફેરફાર કર્યા પછી સેવ કરવાનું ભૂલશો નહીં.',
            iconName: 'Save',
          },
        ],
        proTips: [
          'સ્ટાફ એકાઉન્ટ્સ નિયમિતપણે રિવ્યુ કરો.',
        ],
      },
      mr: {
        title: 'फर्म प्रशासन आणि सेटिंग्ज (Settings)',
        subtitle: 'फर्म तपशील, कर्मचारी खाती, कर सूची आणि सुरक्षा ऑडिटचे व्यवस्थापन.',
        badge: 'प्रशासकीय केंद्र',
        simpleExplanation:
          'सेटिंग्ज हे फर्मचे प्रशासकीय केंद्र आहे. येथे सीए फर्मचे तपशील (FRN, पत्ता), कर्मचाऱ्यांची खाती आणि परवानग्या आणि सुरक्षा ऑडिट नियंत्रित केले जातात.',
        whyItMatters:
          'योग्य नियंत्रणामुळे ग्राहकांचा डेटा सुरक्षित राहतो आणि फर्म सुरळीत चालते.',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'फर्म प्रोफाइल सेट करा',
            description: 'ICAI नोंदणी क्रमांक (FRN), पत्ता आणि संपर्क माहिती भरा.',
          },
          {
            stepNumber: 2,
            title: 'कर्मचारी जोडा',
            description: 'नवीन सहकाऱ्यांना त्यांच्या जबाबदारीनुसार खाती द्या.',
          },
          {
            stepNumber: 3,
            title: 'सुरक्षा ऑडिट तपासा',
            description: 'डेटा सुरक्षिततेसाठी कोणती कामे कधी झाली ते पहा.',
          },
        ],
        buttons: [
          {
            id: 'tour-settings-nav',
            selector: '[data-tour="settings-nav"]',
            name: 'सेटिंग्ज नेव्हिगेशन',
            description: 'फर्म तपशील, वापरकर्ते आणि ऑडिट टॅबमध्ये अदलाबदल करा.',
            proTip: 'कर्मचारी व्यवस्थापनासाठी "Users" टॅब वापरा.',
            iconName: 'Sliders',
          },
          {
            id: 'tour-settings-save',
            selector: '[data-tour="settings-save"]',
            name: 'जतन करा (Save)',
            description: 'सर्व नवीन बदल त्वरित लागू करतो.',
            proTip: 'बदल केल्यानंतर सेव्ह करायला विसरू नका.',
            iconName: 'Save',
          },
        ],
        proTips: [
          'डेटा सुरक्षेसाठी ऑडिट लॉग नियमित तपासा.',
        ],
      },
    },
  },

  portal: {
    id: 'portal',
    defaultRoute: '/portal',
    iconName: 'Globe',
    translations: {
      en: {
        title: 'Client Self-Service Portal',
        subtitle: 'Dedicated branded interface for business clients to track filings and upload tax papers.',
        badge: 'Client Portal',
        simpleExplanation:
          'The Client Portal gives your clients 24/7 transparent access to their tax records. Clients can see which filings are complete, download official filing acknowledgments, view pending requests, and securely chat with their CA team.',
        whyItMatters:
          'Empowering clients with self-service downloads reduces repetitive phone calls and status inquiry messages by 80%.',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'Client Signs In',
            description: 'Clients sign in with their registered email to a secure, private dashboard.',
          },
          {
            stepNumber: 2,
            title: 'View Statutory Status',
            description: 'Clients see clear green badges for filed returns and download receipts directly.',
          },
          {
            stepNumber: 3,
            title: 'Upload Papers & Message',
            description: 'Clients fulfill pending document requests or message the firm securely.',
          },
        ],
        buttons: [
          {
            id: 'tour-portal-nav',
            selector: '[data-tour="portal-nav"]',
            name: 'Client Portal Navigation',
            description: 'Access Overview, Compliance, Documents, Requests, and Messages.',
            proTip: 'Designed to be intuitive even for non-accounting business owners.',
            iconName: 'Compass',
          },
          {
            id: 'tour-portal-upload',
            selector: '[data-tour="portal-upload"]',
            name: 'Client Upload Action',
            description: 'Allows clients to upload tax notices, invoices, or bank records directly.',
            proTip: 'Direct uploads automatically alert the assigned CA staff.',
            iconName: 'UploadCloud',
          },
        ],
        proTips: [
          'Clients love the ability to download past GSTR-3B and ITR-V receipts anytime for bank loan applications.',
        ],
      },
      hi: {
        title: 'क्लाइंट सेल्फ-सर्विस पोर्टल (Client Portal)',
        subtitle: 'क्लाइंट्स के लिए टैक्स फाइलिंग स्थिति देखने और दस्तावेज़ अपलोड करने का समर्पित पोर्टल।',
        badge: 'क्लाइंट पोर्टल',
        simpleExplanation:
          'क्लाइंट पोर्टल आपके ग्राहकों को 24/7 उनकी टैक्स स्थिति देखने की सुविधा देता है। वे देख सकते हैं कि कौन से रिटर्न फाइल हो चुके हैं, रसीदें डाउनलोड कर सकते हैं और सीए टीम से सुरक्षित चैट कर सकते हैं।',
        whyItMatters:
          'क्लाइंट खुद अपनी रसीदें और स्थिति देख लेते हैं, जिससे बार-बार फोन आने और समय बर्बाद होने से मुक्ति मिलती है।',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'क्लाइंट लॉगिन करता है',
            description: 'क्लाइंट अपने ईमेल से सुरक्षित पोर्टल में प्रवेश करता है।',
          },
          {
            stepNumber: 2,
            title: 'फाइलिंग रसीदें देखें',
            description: 'फाइल हुए रिटर्न्स की पावती और चालान तुरंत डाउनलोड करें।',
          },
          {
            stepNumber: 3,
            title: 'दस्तावेज़ जमा करें',
            description: 'मांगे गए बैंक स्टेटमेंट और बिल सीधे पोर्टल पर अपलोड करें।',
          },
        ],
        buttons: [
          {
            id: 'tour-portal-nav',
            selector: '[data-tour="portal-nav"]',
            name: 'पोर्टल नेविगेशन',
            description: 'डैशबोर्ड, अनुपालन, दस्तावेज़ और संदेशों के बीच जाने के लिए।',
            proTip: 'व्यापारियों के उपयोग के लिए बेहद सरल इंटरफ़ेस।',
            iconName: 'Compass',
          },
          {
            id: 'tour-portal-upload',
            selector: '[data-tour="portal-upload"]',
            name: 'दस्तावेज़ अपलोड करें',
            description: 'क्लाइंट्स को सीधे टैक्स नोटिस या चालान अपलोड करने की अनुमति देता है।',
            proTip: 'अपलोड होते ही सीए टीम को तुरंत सूचना मिल जाती है।',
            iconName: 'UploadCloud',
          },
        ],
        proTips: [
          'बैंक लोन के लिए आईटीआर और जीएसटी पावती तुरंत यहाँ से डाउनलोड की जा सकती है।',
        ],
      },
      gu: {
        title: 'ક્લાયન્ટ સેલ્ફ-સર્વિસ પોર્ટલ (Client Portal)',
        subtitle: 'વેપારીઓ માટે ટેક્સ રિટર્ન્સ ટ્રેક કરવા અને કાગળો અપલોડ કરવાનું પોર્ટલ.',
        badge: 'ક્લાયન્ટ પોર્ટલ',
        simpleExplanation:
          'આ પોર્ટલ તમારા ક્લાયન્ટ્સને ૨૪ કલાક તેમના ટેક્સ રેકોર્ડ્સ જોવાની સુવિધા આપે છે. તેઓ કયા રિટર્ન ફાઇલ થયા છે તે જોઈ શકે છે અને બેંક લોન માટે પાવતીઓ ડાઉનલોડ કરી શકે છે.',
        whyItMatters:
          'ક્લાયન્ટ પોતે જ પાવતીઓ ડાઉનલોડ કરી લેતા વારંવાર ફોન આવવાની ઝંઝટમાંથી મુક્તિ મળે છે.',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'ક્લાયન્ટ લોગિન કરે',
            description: 'પોતાના ઇમેઇલ વડે સુરક્ષિત પોર્ટલમાં પ્રવેશ કરે છે.',
          },
          {
            stepNumber: 2,
            title: 'રિટર્ન પાવતી મેળવે',
            description: 'ફાઇલ થયેલ રિટર્ન્સની સરકારી પહોંચ સીધી ડાઉનલોડ કરે છે.',
          },
          {
            stepNumber: 3,
            title: 'કાગળો મોકલે',
            description: 'માગેલા બિલ અને બેંક સ્ટેટમેન્ટ સરળતાથી અપલોડ કરે છે.',
          },
        ],
        buttons: [
          {
            id: 'tour-portal-nav',
            selector: '[data-tour="portal-nav"]',
            name: 'પોર્ટલ નેવિગેશન',
            description: 'ઓવરવ્યુ, કમ્પ્લાયન્સ, દસ્તાવેજ અને મેસેજ વચ્ચે જવા માટે.',
            proTip: 'વેપારીઓ માટે વાપરવામાં અત્યંત સરળ.',
            iconName: 'Compass',
          },
          {
            id: 'tour-portal-upload',
            selector: '[data-tour="portal-upload"]',
            name: 'અપલોડ બટન',
            description: 'ક્લાયન્ટ સીધા જ દસ્તાવેજો ફર્મને મોકલી શકે છે.',
            proTip: 'અપલોડ થતાં જ સીએ સ્ટાફને જાણ થઈ જાય છે.',
            iconName: 'UploadCloud',
          },
        ],
        proTips: [
          'બેંક લોન માટે જૂના ITR અને GST 3B અહીંથી ૨૪ કલાક મળી રહે છે.',
        ],
      },
      mr: {
        title: 'ग्राहक सेल्फ-सर्व्हिस पोर्टल (Client Portal)',
        subtitle: 'ग्राहकांसाठी कर विवरणपत्रे पाहणे आणि कागदपत्रे अपलोड करण्याचे दालन.',
        badge: 'ग्राहक पोर्टल',
        simpleExplanation:
          'क्लायंट पोर्टल ग्राहकांना २४ तास त्यांच्या कर नोंदी तपासण्याची सोय देते. कोणते रिटर्न भरले गेले ते पाहणे, पोहोच पावती डाऊनलोड करणे आणि थेट सीए टीमशी संपर्क साधणे शक्य होते.',
        whyItMatters:
          'ग्राहकांना स्वतःच पावत्या डाऊनलोड करता आल्याने वारंवार फोन येणे ८०% कमी होते.',
        howItWorks: [
          {
            stepNumber: 1,
            title: 'ग्राहक लॉगिन करतो',
            description: 'नोंदणीकृत ईमेलने सुरक्षित पोर्टलमध्ये प्रवेश करतो.',
          },
          {
            stepNumber: 2,
            title: 'पोहोच पावती मिळवा',
            description: 'विवरणपत्रांच्या अधिकृत पावत्या थेट डाऊनलोड करा.',
          },
          {
            stepNumber: 3,
            title: 'कागदपत्रे जमा करा',
            description: 'मागितलेली बँक स्टेटमेंट आणि बिले थेट अपलोड करा.',
          },
        ],
        buttons: [
          {
            id: 'tour-portal-nav',
            selector: '[data-tour="portal-nav"]',
            name: 'पोर्टल नेव्हिगेशन',
            description: 'डॅशबोर्ड, कर पूर्तता, कागदपत्रे आणि संवादासाठी.',
            proTip: 'व्यापाऱ्यांना वापरण्यास अत्यंत सोपे.',
            iconName: 'Compass',
          },
          {
            id: 'tour-portal-upload',
            selector: '[data-tour="portal-upload"]',
            name: 'कागदपत्र अपलोड',
            description: 'ग्राहक थेट कागदपत्रे पाठवू शकतात.',
            proTip: 'अपलोड होताच सीए टीमला त्वरित समजते.',
            iconName: 'UploadCloud',
          },
        ],
        proTips: [
          'बँक कर्जासाठी लागणाऱ्या आयटीआर आणि जीएसटी पावत्या येथून केव्हाही मिळतात.',
        ],
      },
    },
  },
};

export const detectFeatureKeyFromPath = (pathname: string): FeatureKey => {
  if (pathname.startsWith('/portal')) return 'portal';
  if (pathname.startsWith('/dashboard')) return 'dashboard';
  if (pathname.startsWith('/my-work')) return 'myWork';
  if (pathname.startsWith('/clients')) return 'clients';
  if (pathname.startsWith('/tasks')) return 'tasks';
  if (pathname.startsWith('/compliance')) return 'compliance';
  if (pathname.startsWith('/documents')) return 'documents';
  if (pathname.startsWith('/requests')) return 'requests';
  if (pathname.startsWith('/messages')) return 'messages';
  if (pathname.startsWith('/reports')) return 'reports';
  if (pathname.startsWith('/notifications')) return 'notifications';
  if (pathname.startsWith('/settings')) return 'settings';
  return 'dashboard';
};
