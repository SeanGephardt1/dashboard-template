import React from 'react';
export const DashboardContext = React.createContext( {
	DEBUG: false,
	User: {
		IsAuthenticated: true,
		Token: "",
	},
	apiDiscoveryStartRan: false,
	apiServiceData: undefined,
	networkDevices: [],
	managedDevices: [],
	UserSessionData: [],
	SignIn: () => { },
	SignOut: () => { }
});