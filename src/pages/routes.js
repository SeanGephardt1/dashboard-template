// ORGANIZING BY SECTIONS, SUB-PAGES BASED ON CURRENT DESIGN

// CORE
import AuthenticationPage from './authentication/authentication.js';
import FourOhFourPage from './404/404.js'; 

// MAIN PAGES
import DevicesListPage from './devices/devices-list.js';
import ProtocolsListPage from './protocols/protocols-list.js';
import ReportsListPage from './reporting/reports-list.js';
import SettingsHomePage from './settings/settings.js';
import LearningHomePage from './learn/learn.js';
import SupportHomePage from './support/support.js';

// ACTIVE SECONDARY PAGES
import DevicePage from './devices/device.js';
import IncidentReportPage from './reporting/report.js';

//  TEST PAGES
import WebGlFluidSimTestPage from './wgl-fluid-sim/wgl-sim-test.js';

// EXPORT ALL ROUTES BEING USED
const _all_app_routes = [
    AuthenticationPage,
    FourOhFourPage,
    DevicesListPage,
    DevicePage,
    ProtocolsListPage,
    ReportsListPage,
    IncidentReportPage,
    SettingsHomePage,
    LearningHomePage,
    SupportHomePage,
    WebGlFluidSimTestPage
];

// ROUTES FOR LEFT NAV
const _left_nav = [
    [
        DevicesListPage,
        ReportsListPage,
        SettingsHomePage
    ],
    [
        //LearningHomePage,
        //SupportHomePage
    ]
];

export
{
    _all_app_routes as AppRoutes,
    _left_nav as LeftNav,
    AuthenticationPage,
    FourOhFourPage
};