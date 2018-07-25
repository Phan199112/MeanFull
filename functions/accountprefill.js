var groupfunctions = require('./groups');
var GroupModel = require('../db.models/group.model');

function getPrefillRoles () {
    return {
        "kristopherwindsor+test3@gmail.com": "professor",
    };
}

function getPrefillClassesFall2018 () {
    return [
        {
            "admins": ["kristopherwindsor+qeieub7@gmail.com"],
            "members": ["kristopherwindsor+zxzx@gmail.com"],
            "classdata": {
                "Course": "414A",
                "Sec": "01",
                "CourseTitle": "LEADERSHIP FOUNDATIONS I",
                "Units": 2,
                "Faculty": "Shih, M.",
                "Room": "TBA",
                "Day": "VARIES",
                "ClassTime": "VARIES",
                "Comments": "Aug. 28th-Sept. 1st",
                "Area": "MANG_ORG",
                "Type": "CORE"
            }
        }, {
            "admins": ["kristopherwindsor+qeieub7@gmail.com"],
            "members": [],
            "classdata": {
                "Course": "414A",
                "Sec": "02",
                "CourseTitle": "LEADERSHIP FOUNDATIONS I",
                "Units": 2,
                "Faculty": "Whitson, J.",
                "Room": "TBA",
                "Day": "VARIES",
                "ClassTime": "VARIES",
                "Comments": "Aug. 28th-Sept. 1st",
                "Area": "MANG_ORG",
                "Type": "CORE"
            }
        }, {
            "admins": [],
            "members": ["kristopherwindsor+qeieub7@gmail.com"],
            "classdata": {
                "Course": "414A",
                "Sec": "03",
                "CourseTitle": "LEADERSHIP FOUNDATIONS I",
                "Units": 2,
                "Faculty": "Dai, H.",
                "Room": "TBA",
                "Day": "VARIES",
                "ClassTime": "VARIES",
                "Comments": "Aug. 28th-Sept. 1st",
                "Area": "MANG_ORG",
                "Type": "CORE"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": "414A",
                "Sec": "04",
                "CourseTitle": "LEADERSHIP FOUNDATIONS I",
                "Units": 2,
                "Faculty": "Bendersky, C.",
                "Room": "TBA",
                "Day": "VARIES",
                "ClassTime": "VARIES",
                "Comments": "Aug. 28th-Sept. 1st",
                "Area": "MANG_ORG",
                "Type": "CORE"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": "414A",
                "Sec": "05",
                "CourseTitle": "LEADERSHIP FOUNDATIONS I",
                "Units": 2,
                "Faculty": "Fox, C.",
                "Room": "TBA",
                "Day": "VARIES",
                "ClassTime": "VARIES",
                "Comments": "Aug. 28th-Sept. 1st",
                "Area": "MANG_ORG",
                "Type": "CORE"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": 402,
                "Sec": "06",
                "CourseTitle": "DATA AND DECISIONS",
                "Units": 4,
                "Faculty": "Misic, V.",
                "Room": "C301",
                "Day": "SAT",
                "ClassTime": "2:00PM - 5:15PM",
                "Comments": "",
                "Area": "DOTM",
                "Type": "CORE"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": 402,
                "Sec": "07",
                "CourseTitle": "DATA AND DECISIONS",
                "Units": 4,
                "Faculty": "Bikhchandani, S.",
                "Room": "C315",
                "Day": "SAT",
                "ClassTime": "9:30AM - 12:45PM",
                "Comments": "",
                "Area": "DOTM",
                "Type": "CORE"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": 402,
                "Sec": "08",
                "CourseTitle": "DATA AND DECISIONS",
                "Units": 4,
                "Faculty": "Sarin, R.",
                "Room": "D301",
                "Day": "TUES",
                "ClassTime": "6:30PM - 9:45PM",
                "Comments": "",
                "Area": "DOTM",
                "Type": "CORE"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": 402,
                "Sec": "09",
                "CourseTitle": "DATA AND DECISIONS",
                "Units": 4,
                "Faculty": "Misic, V.",
                "Room": "C315",
                "Day": "THURS",
                "ClassTime": "6:30PM - 9:45PM",
                "Comments": "",
                "Area": "DOTM",
                "Type": "CORE"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": 402,
                "Sec": 10,
                "CourseTitle": "DATA AND DECISIONS",
                "Units": 4,
                "Faculty": "Mamer, J.",
                "Room": "A201",
                "Day": "SUN",
                "ClassTime": "9:00AM - 3:00PM",
                "Comments": "HYBRID section",
                "Area": "DOTM",
                "Type": "CORE"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": 409,
                "Sec": "01",
                "CourseTitle": "ORGANIZATIONAL BEHAVIOR",
                "Units": 4,
                "Faculty": "Caruso, E.",
                "Room": "C301",
                "Day": "SAT",
                "ClassTime": "9:30AM - 12:45PM",
                "Comments": "",
                "Area": "MANG_ORG",
                "Type": "CORE"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": 409,
                "Sec": "02",
                "CourseTitle": "ORGANIZATIONAL BEHAVIOR",
                "Units": 4,
                "Faculty": "Caruso, E.",
                "Room": "C315",
                "Day": "SAT",
                "ClassTime": "2:00PM - 5:15PM",
                "Comments": "",
                "Area": "MANG_ORG",
                "Type": "CORE"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": 409,
                "Sec": "03",
                "CourseTitle": "ORGANIZATIONAL BEHAVIOR",
                "Units": 4,
                "Faculty": "Bendersky, C.",
                "Room": "D301",
                "Day": "THURS",
                "ClassTime": "6:30PM - 9:45PM",
                "Comments": "",
                "Area": "MANG_ORG",
                "Type": "CORE"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": 409,
                "Sec": "04",
                "CourseTitle": "ORGANIZATIONAL BEHAVIOR",
                "Units": 4,
                "Faculty": "Bendersky, C.",
                "Room": "C315",
                "Day": "TUES",
                "ClassTime": "6:30PM - 9:45PM",
                "Comments": "",
                "Area": "MANG_ORG",
                "Type": "CORE"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": 409,
                "Sec": "05",
                "CourseTitle": "ORGANIZATIONAL BEHAVIOR",
                "Units": 4,
                "Faculty": "Shih, M.",
                "Room": "D301",
                "Day": "SAT",
                "ClassTime": "2:00PM - 8:00PM",
                "Comments": "HYBRID section",
                "Area": "MANG_ORG",
                "Type": "CORE"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": 410,
                "Sec": "01",
                "CourseTitle": "OPERATIONS & TECH. MGMT",
                "Units": 4,
                "Faculty": "Rajaram, K.",
                "Room": "A201",
                "Day": "SAT",
                "ClassTime": "9:30AM - 12:45PM",
                "Comments": "",
                "Area": "DOTM",
                "Type": "CORE"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": 410,
                "Sec": "02",
                "CourseTitle": "OPERATIONS & TECH. MGMT",
                "Units": 4,
                "Faculty": "Hall, J.",
                "Room": "B313",
                "Day": "SAT",
                "ClassTime": "2:00PM - 5:15PM",
                "Comments": "",
                "Area": "DOTM",
                "Type": "CORE"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": 410,
                "Sec": "03",
                "CourseTitle": "OPERATIONS & TECH. MGMT",
                "Units": 4,
                "Faculty": "Rajaram, K.",
                "Room": "A301",
                "Day": "THURS",
                "ClassTime": "6:30PM - 9:45PM",
                "Comments": "",
                "Area": "DOTM",
                "Type": "CORE"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": 410,
                "Sec": "04",
                "CourseTitle": "OPERATIONS & TECH. MGMT",
                "Units": 4,
                "Faculty": "Hall, J.",
                "Room": "B313",
                "Day": "TUES",
                "ClassTime": "6:30PM - 9:45PM",
                "Comments": "",
                "Area": "DOTM",
                "Type": "CORE"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": 410,
                "Sec": "05",
                "CourseTitle": "OPERATIONS & TECH. MGMT",
                "Units": 4,
                "Faculty": "DeHoratius, N.",
                "Room": "B117",
                "Day": "SAT",
                "ClassTime": "2:00PM - 8:00PM",
                "Comments": "HYBRID section",
                "Area": "DOTM",
                "Type": "CORE"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": 410,
                "Sec": "06",
                "CourseTitle": "OPERATIONS & TECH. MGMT",
                "Units": 4,
                "Faculty": "Karmarkar, U.",
                "Room": "D301",
                "Day": "SUN",
                "ClassTime": "9:00AM - 3:00PM",
                "Comments": "HYBRID section",
                "Area": "DOTM",
                "Type": "CORE"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": 420,
                "Sec": "01",
                "CourseTitle": "BUSINESS STRATEGY",
                "Units": 4,
                "Faculty": "Brown, J.",
                "Room": "A201",
                "Day": "SAT",
                "ClassTime": "2:00PM - 5:15PM",
                "Comments": "",
                "Area": "STRATEGY",
                "Type": "CORE"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": 420,
                "Sec": "02",
                "CourseTitle": "BUSINESS STRATEGY",
                "Units": 4,
                "Faculty": "Brown, J.",
                "Room": "B313",
                "Day": "SAT",
                "ClassTime": "9:30AM - 12:45PM",
                "Comments": "",
                "Area": "STRATEGY",
                "Type": "CORE"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": 420,
                "Sec": "03",
                "CourseTitle": "BUSINESS STRATEGY",
                "Units": 4,
                "Faculty": "Poliquin, C.",
                "Room": "A301",
                "Day": "TUES",
                "ClassTime": "6:30PM - 9:45PM",
                "Comments": "",
                "Area": "STRATEGY",
                "Type": "CORE"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": 420,
                "Sec": "04",
                "CourseTitle": "BUSINESS STRATEGY",
                "Units": 4,
                "Faculty": "Poliquin, C.",
                "Room": "B313",
                "Day": "THURS",
                "ClassTime": "6:30PM - 9:45PM",
                "Comments": "",
                "Area": "STRATEGY",
                "Type": "CORE"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": 420,
                "Sec": "05",
                "CourseTitle": "BUSINESS STRATEGY",
                "Units": 4,
                "Faculty": "Schmitt, M.",
                "Room": "B313",
                "Day": "SUN",
                "ClassTime": "9:00AM - 3:00PM",
                "Comments": "HYBRID section",
                "Area": "STRATEGY",
                "Type": "CORE"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": 420,
                "Sec": "06",
                "CourseTitle": "BUSINESS STRATEGY",
                "Units": 4,
                "Faculty": "Schmitt, M.",
                "Room": "D313",
                "Day": "SAT",
                "ClassTime": "2:00PM - 8:00PM",
                "Comments": "HYBRID section",
                "Area": "STRATEGY",
                "Type": "CORE"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": 427,
                "Sec": "01",
                "CourseTitle": "GLOBAL ACCESS PROGRAM",
                "Units": 5,
                "Faculty": "FOSTER, B.",
                "Room": "N\/A",
                "Day": "SAT",
                "ClassTime": "VARIES",
                "Comments": "3rd Year FEMBAs ONLY",
                "Area": "DOTM",
                "Type": "CORE"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": 427,
                "Sec": "02",
                "CourseTitle": "BUSINESS CREATION OPTION",
                "Units": 5,
                "Faculty": "FARRELL, B.",
                "Room": "N\/A",
                "Day": "SAT",
                "ClassTime": "VARIES",
                "Comments": "3rd Year FEMBAs ONLY",
                "Area": "PRICE",
                "Type": "CORE"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": 220,
                "Sec": "01",
                "CourseTitle": "CORPORATE FINANCIAL REPORTING",
                "Units": 4,
                "Faculty": "Sussman, E.",
                "Room": "B301",
                "Day": "TUES",
                "ClassTime": "4:10PM- 7:00PM",
                "Comments": "",
                "Area": "ACCOUNTING",
                "Type": "Joint MBA\/FEMBA"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": 228,
                "Sec": "01",
                "CourseTitle": "FINANCIAL REPORTING & EQUITY VALUATION",
                "Units": 4,
                "Faculty": "Caskey, J.",
                "Room": "B313",
                "Day": "MON",
                "ClassTime": "4:10PM-7:10PM",
                "Comments": "",
                "Area": "ACCOUNTING",
                "Type": "Joint MBA\/FEMBA"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": "231E",
                "Sec": "01",
                "CourseTitle": "MANAGING FINANCE AND THE FINANCIAL EMERGING MARKETS",
                "Units": 4,
                "Faculty": "Cockrum, B.",
                "Room": "D307",
                "Day": "MON",
                "ClassTime": "4:10PM-7:10PM",
                "Comments": "",
                "Area": "PRICE",
                "Type": ""
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": "240F",
                "Sec": "02",
                "CourseTitle": "GLOBAL SUPPLY CHAIN",
                "Units": 4,
                "Faculty": "Caro, F.",
                "Room": "A301",
                "Day": "WED",
                "ClassTime": "7:10PM-10:00PM",
                "Comments": "",
                "Area": "DOTM",
                "Type": ""
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": "250D",
                "Sec": "02",
                "CourseTitle": "PATTERNS OF PROBLEM SOLVING",
                "Units": 4,
                "Faculty": "Firstenberg, I.",
                "Room": "C315",
                "Day": "SUN",
                "ClassTime": "9:00AM- 3:00PM",
                "Comments": "5-WEEK COURSE BCO\/GAP FRIENDLY- CLASS MEETS ON 10\/7, 11\/4, 11\/8, 12\/2 and 12\/9 (Final)",
                "Area": "MANG_ORG",
                "Type": "FEMBA"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": "266A",
                "Sec": "01",
                "CourseTitle": "NEW PRODUCT DEVELOPMENT",
                "Units": 4,
                "Faculty": "Terech, A",
                "Room": "B313",
                "Day": "THURS",
                "ClassTime": "7:10PM- 10:00PM",
                "Comments": "",
                "Area": "MARKETING",
                "Type": "Joint MBA\/FEMBA"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": 275,
                "Sec": "01",
                "CourseTitle": "CURRENT TOPICS IN EMERGING TECHNOLOGIES : INNOVATION IN MEDIA AND ENTERTAINMENT THROUGH TECHNOLOGY",
                "Units": 2,
                "Faculty": "Montgomery, M. & Miller, D.",
                "Room": "C315",
                "Day": "MON",
                "ClassTime": "7:10PM - 8:40PM",
                "Comments": "2-UNIT CLASS",
                "Area": "EASTON",
                "Type": "Joint MBA\/FEMBA"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": "279C",
                "Sec": "02",
                "CourseTitle": "REAL ESTATE ECON, CPTL MKTS & SCRTZTN",
                "Units": 4,
                "Faculty": "Gabriel, S.",
                "Room": "B117",
                "Day": "TUES",
                "ClassTime": "7:10PM - 8:40PM",
                "Comments": "(w\/ hybrid component)",
                "Area": "ZIMAN",
                "Type": "FEMBA"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": "285B",
                "Sec": "01",
                "CourseTitle": "MANAGERIAL INTERPERSONAL COMMUNICATION",
                "Units": 4,
                "Faculty": "Ullmen, J.",
                "Room": "A301",
                "Day": "SUN",
                "ClassTime": "9:00AM - 3:00PM",
                "Comments": "HYBRID section",
                "Area": "MANG_ORG",
                "Type": "FEMBA"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": "295A",
                "Sec": "01",
                "CourseTitle": "ENTREP AND VENTURE INITIATION",
                "Units": 4,
                "Faculty": "Scheinrock, J.",
                "Room": "D310",
                "Day": "THURS",
                "ClassTime": "4:10PM-7:00PM",
                "Comments": "",
                "Area": "PRICE",
                "Type": "Joint MBA\/FEMBA"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": "298D",
                "Sec": "01",
                "CourseTitle": "SPECIAL TOPICS IN MANAGEMENT: HEDGE FUNDS",
                "Units": 4,
                "Faculty": "STAFF",
                "Room": "TBD",
                "Day": "TBD",
                "ClassTime": "7:10PM- 10:00PM",
                "Comments": "",
                "Area": "FINANCE",
                "Type": "Joint MBA\/FEMBA"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": "298D",
                "Sec": "02",
                "CourseTitle": "SPECIAL TOPICS IN MANAGEMENT: MANAGING DISRUPTIVE TECHNOLOGIES AND BUSINESS MODELS",
                "Units": 4,
                "Faculty": "FARRELL, B.",
                "Room": "D301",
                "Day": "WED",
                "ClassTime": "4:10PM-7:00PM",
                "Comments": "",
                "Area": "MEMES",
                "Type": "Joint MBA\/FEMBA"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": "298D",
                "Sec": "03",
                "CourseTitle": "SPECIAL TOPICS IN MANAGEMENT: SPORTS MARKETING MANAGEMENT",
                "Units": 4,
                "Faculty": "Sanders, B.",
                "Room": "B117",
                "Day": "THURS",
                "ClassTime": "4:10PM-7:00PM",
                "Comments": "",
                "Area": "MEMES",
                "Type": "Joint MBA\/FEMBA"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": "298D",
                "Sec": "06",
                "CourseTitle": "SPECIAL TOPICS IN MANAGEMENT: TOOLS & ANALYSIS FOR BUSINESS STRATEGY",
                "Units": 4,
                "Faculty": "Santikian, L.",
                "Room": "B301",
                "Day": "TUES",
                "ClassTime": "7:10PM-10:00PM",
                "Comments": "",
                "Area": "STRATEGY",
                "Type": "Joint MBA\/FEMBA"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": "298D",
                "Sec": "07",
                "CourseTitle": "SPECIAL TOPICS IN MANAGEMENT: CONTENT CREATION & EXPLOITATION IN THE GLOBAL, DIGITAL AGE",
                "Units": 4,
                "Faculty": "FRONS, B.",
                "Room": "B313",
                "Day": "WED",
                "ClassTime": "7:10PM-10:00PM",
                "Comments": "",
                "Area": "MEMES",
                "Type": "Joint MBA\/FEMBA"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": 425,
                "Sec": "01",
                "CourseTitle": "ADVANCED MANAGEMENT COMMUNICATION",
                "Units": 4,
                "Faculty": "McCann, R.",
                "Room": "D307",
                "Day": "SAT",
                "ClassTime": "2:00PM - 8:00PM",
                "Comments": "4-WEEK COURSE BCO\/GAP-FRIENDLY: CLASS MEETS on 9\/29, 10\/13, 11\/10 and 12\/8 (20% Hybrid Component)",
                "Area": "MANG_ORG",
                "Type": "FEMBA"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": 457,
                "Sec": "02",
                "CourseTitle": "FIELDWORK IN INVESTMENT MANAGEMENT",
                "Units": 4,
                "Faculty": "Welch, I",
                "Room": "N\/A",
                "Day": "MON",
                "ClassTime": "6:30PM - 9:30PM",
                "Comments": "ENROLL BY APPLICATION ONLY.",
                "Area": "FINANCE",
                "Type": "FEMBA"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": "458A",
                "Sec": "01",
                "CourseTitle": "GLOBAL IMMERSIONS:TWO-QUARTER PLAN: INTERNATIONAL STUDIES IN CHILE",
                "Units": 2,
                "Faculty": "Edwards, S.",
                "Room": "N\/A",
                "Day": "N\/A",
                "ClassTime": "N\/A",
                "Comments": "",
                "Area": "AT_LARGE",
                "Type": "FEMBA"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": "458A",
                "Sec": "02",
                "CourseTitle": "GLOBAL IMMERSIONS: TWO-QUARTER PLAN: INTERNATIONAL STUDIES IN VIETNAM",
                "Units": 2,
                "Faculty": "Abe, G.",
                "Room": "N\/A",
                "Day": "N\/A",
                "ClassTime": "N\/A",
                "Comments": "",
                "Area": "AT_LARGE",
                "Type": "FEMBA"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": "458B",
                "Sec": "01",
                "CourseTitle": "GLOBAL IMMERSIONS: TWO-QUARTER PLAN: INTERNATIONAL STUDIES IN AUSTRIA & CZECH REPUBLIC",
                "Units": 2,
                "Faculty": "Zeithammer, R.",
                "Room": "N\/A",
                "Day": "FRI",
                "ClassTime": "6:00PM-9:00PM",
                "Comments": "CONTINUATION OF MGMT 458A, MEETS ON 9\/28",
                "Area": "AT_LARGE",
                "Type": "FEMBA"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": "458B",
                "Sec": "02",
                "CourseTitle": "GLOBAL IMMERSIONS: TWO-QUARTER PLAN: INTERNATIONAL STUDIES IN SOUTH AFRICA",
                "Units": 2,
                "Faculty": "Northrop, G.",
                "Room": "N\/A",
                "Day": "FRI",
                "ClassTime": "6:00PM-9:00PM",
                "Comments": "CONTINUATION OF MGMT 458A, MEETS ON 9\/28",
                "Area": "AT_LARGE",
                "Type": "FEMBA"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": "278A",
                "Sec": "01",
                "CourseTitle": "URBAN REAL ESTATE FINANCING & INVESTMENT",
                "Units": 4,
                "Faculty": "Habibi, P.",
                "Room": "B313",
                "Day": "WED",
                "ClassTime": "4:10PM-7:00PM",
                "Comments": 8,
                "Area": "ZIMAN",
                "Type": "FTMBA"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": "291C",
                "Sec": "01",
                "CourseTitle": "STRATEGIES FOR TECH-BASED CORP. DEV.",
                "Units": 4,
                "Faculty": "Geis, G.",
                "Room": "B313",
                "Day": "WED",
                "ClassTime": "1:00PM-3:50PM",
                "Comments": 5,
                "Area": "STRATEGY",
                "Type": "FTMBA"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": "293C",
                "Sec": "01",
                "CourseTitle": "ETHICAL CONSIDERATIONS IN BUSINESS",
                "Units": 4,
                "Faculty": "Farrell, B. & Cockrum, B.",
                "Room": "D310",
                "Day": "WED",
                "ClassTime": "1:00PM-3:50PM",
                "Comments": 5,
                "Area": "PRICE",
                "Type": "FTMBA"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": "295D",
                "Sec": "01",
                "CourseTitle": "BUSINESS PLAN DEVELOPMENT",
                "Units": 4,
                "Faculty": "Nathanson, D.",
                "Room": "D310",
                "Day": "WED",
                "ClassTime": "4:10PM-7:00PM",
                "Comments": 10,
                "Area": "PRICE",
                "Type": "FTMBA"
            }
        }, {
            "admins": [],
            "members": [],
            "classdata": {
                "Course": "298D",
                "Sec": "04",
                "CourseTitle": "SPECIAL TOPICS IN MANAGEMENT: INSIGHT TO OUTCOME",
                "Units": 4,
                "Faculty": "Wurster, T.",
                "Room": "B117",
                "Day": "T\/TH",
                "ClassTime": "9:45PM-11:15AM",
                "Comments": 5,
                "Area": "STRATEGY",
                "Type": "FTMBA"
            }
        }
    ];
}

function doClassesFall2018Prefill (user) {
    var data = getPrefillClassesFall2018();

    data.forEach(function (prefill) {
        if (prefill.admins.indexOf(user.email) === -1 && prefill.members.indexOf(user.email) === -1) {
            return;
        }

        var doUpdate = function (group) {
            if (prefill.admins.indexOf(user.email) !== -1) {
                group.adminuserid.push(user._id);
            }
            group.members.push(user._id);
            group.save(function (xx) {});
        };

        var doCreate = function (callback) {
            GroupModel.create(
                {
                    adminuserid: [],
                    members: [],
                    title: prefill.classdata.CourseTitle,
                    category: "class",
                    organization: user.organization,
                    hashtags: [],
                    public: false,
                    pic: '',
                    description: '',
                    timestamp: Date.now(),
                    session: "fall2018",
                    classdata: prefill.classdata,
                },
                callback
            );
        };

        var findOne = function (callback) {
            GroupModel.findOne(
                {
                    "organization": user.organization,
                    "classdata.Course": prefill.classdata.Course,
                    "classdata.Sec": prefill.classdata.Sec,
                    "classdata.CourseTitle": prefill.classdata.CourseTitle,
                },
                callback
            );
        };

        findOne(
            function (err, group) {
                if (group) {
                    doUpdate(group);
                } else {
                    doCreate(function (err, group) {
                        doUpdate(group);
                    });
                }
            }
        );
    });
}

function getPrefillStudentOrgs () {
    // Every new user is added to all of these student orgs
    return [
        "student org A",
        "student org B",
    ];
}

function doStudentOrgsPrefill (user) {
    // Adds the new user to all of the student orgs
    // If the student org does not already exist (based on title), it is created as public with no admins

    var data = getPrefillStudentOrgs();

    data.forEach(function (studentOrgName) {
        var doUpdate = function (group) {
            group.members.push(user._id);
            group.save(function (xx) {});
        };

        var doCreate = function (callback) {
            GroupModel.create(
                {
                    adminuserid: [],
                    members: [],
                    title: studentOrgName,
                    category: "studentorg",
                    organization: user.organization,
                    hashtags: [],
                    public: true,
                    pic: '',
                    description: '',
                    timestamp: Date.now(),
                },
                callback
            );
        };

        var findOne = function (callback) {
            GroupModel.findOne(
                {
                    organization: user.organization,
                    category: "studentorg",
                    title: studentOrgName,
                },
                callback
            );
        };

        findOne(
            function (err, group) {
                if (group) {
                    doUpdate(group);
                } else {
                    doCreate(function (err, group) {
                        doUpdate(group);
                    });
                }
            }
        );
    });
}

exports.getInitialAccountRole = function (email) {
    var data = getPrefillRoles()[email];

    return data ? data : 'student';
};

exports.doGroupsPrefill = function (user) {
    doClassesFall2018Prefill(user);
    doStudentOrgsPrefill(user);
}
