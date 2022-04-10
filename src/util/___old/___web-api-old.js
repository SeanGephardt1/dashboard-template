const _api_uri = process.env.REACT_APP_SVC_BUILD;

const _api = {
	// API_AUTH_CALL_PLAIN: '/auth?plain=true',
	API_BASE_URL: _api_uri,
	API_ADMIN_USER_HEADERS: {
		'headers':
		{	
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'OPTIONS, GET, POST, PUT, PATCH, DELETE',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization',
			'Content-Type': 'application/json',
			'x-api-user-token': 'X-SYSTEM-TOKEN'
		}
	},
	API_DEFAULT_GET_OPTIONS: {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'x-api-user-token': 'X-SYSTEM-TOKEN'
		}
	},
	API_DEFAULT_POST_OPTIONS: {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'x-api-user-token': 'X-SYSTEM-TOKEN'
		}
	},
	API_URIS: {
		// NAMED ACCORDING TO FUNCTION FROM INSOMNIA SCHEMA
		ServerSentEvents: _api_uri + "/events",

		// GENERAL API SERVICE INFO
		GetServiceInfo: _api_uri + "/api/service",

		//	NETWORK METHODS
		PostDiscoveryStart: _api_uri + "/api/net/start-discovery?m=true",
		PostDiscoveryStop: _api_uri + "/api/net/stop-discovery",
		GetNetworkDevices: _api_uri + "/api/net",

		//	DEVICES RELATED
		PostRequestImageFromDevice: _api_uri + "/api/devices/{device-id}/image-request",
		PostSendStringToDevice: _api_uri + "/api/devices/{device-id}/send-string/i",
		PostSetCanPair: _api_uri + "/api/devices/{device-id}/can-pair/{boolean}",
		GetGetLivePreview: _api_uri + "/api/devices/{device-id}/live-preview",
		GetGetLivePreviewRGB: _api_uri + "/api/devices/{device-id}/live-preview/rgb",
		GetAllManagedDevices: _api_uri + "/api/devices",
		PostStartManagingDevice: _api_uri + "/api/devices/manage/5f20b116",
		PostStopManagingDevice: _api_uri + "/api/devices/unmanage/b09749e5",

		// DEVICE PAIRING
		PostUnpairAll: _api_uri + "/api/devices/unpair-all",
		PostPairDevice: _api_uri + "/api/devices/pair/b09749e5",
		PostUnpairDevice: _api_uri + "/api/devices/unpair/04234ebd",

		// REPORTS
		GetGetAllReports: _api_uri + "/api/reports",

		//	AUTHORIZATION
		PostAuthorization: _api_uri + "/api/auth",

		// RESET
		PostResetData: _api_uri + "/api/reset",
	}
};

export
{
	_api as ApiValues
};