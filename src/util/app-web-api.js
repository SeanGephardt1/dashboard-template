export default class QAPI
{
	static Uri = process.env.REACT_APP_SVC_BUILD;
	static AuthorizationHeaders = {
		headers:
		{
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'OPTIONS, GET, POST, PUT, PATCH, DELETE',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization',
			'Content-Type': 'application/json',
			'x-api-user-token': 'X-SYSTEM-TOKEN'
		}
	};
	static DefaultGetOptions = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'x-api-user-token': 'X-SYSTEM-TOKEN'
		}
	};
	static DefaultPostOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'x-api-user-token': 'X-SYSTEM-TOKEN'
		}
	};
	static Routes = {
		// NAMED ACCORDING TO FUNCTION FROM INSOMNIA SCHEMA
		ServerSentEvents: QAPI.Uri + "/events",

		// GENERAL API SERVICE INFO
		GetServiceInfo: QAPI.Uri + "/api/service",

		//	NETWORK METHODS
		PostDiscoveryStart: QAPI.Uri + "/api/net/start-discovery?m=true",
		PostDiscoveryStop: QAPI.Uri + "/api/net/stop-discovery",
		GetNetworkDevices: QAPI.Uri + "/api/net",

		//	DEVICES RELATED
		//PostRequestImageFromDevice: QAPI.Uri + "/api/devices/{device-id}/image-request",
		//PostSendStringToDevice: QAPI.Uri + "/api/devices/{device-id}/send-string/i",
		//PostSetCanPair: QAPI.Uri + "/api/devices/{device-id}/can-pair/{boolean}",
		//GetGetLivePreview: QAPI.Uri + "/api/devices/{device-id}/live-preview",
		//GetGetLivePreviewRGB: QAPI.Uri + "/api/devices/{device-id}/live-preview/rgb",
		GetAllManagedDevices: QAPI.Uri + "/api/devices",
		PostStartManagingDevice: QAPI.Uri + "/api/devices/manage/",
		PostStopManagingDevice: QAPI.Uri + "/api/devices/unmanage/",

		// DEVICE PAIRING
		PostUnpairAll: QAPI.Uri + "/api/devices/unpair-all",
		PostPairDevice: QAPI.Uri + "/api/devices/pair/",
		PostUnpairDevice: QAPI.Uri + "/api/devices/unpair/",

		// REPORTS
		GetGetAllReports: QAPI.Uri + "/api/reports",

		//	AUTHORIZATION
		PostAuthorization: QAPI.Uri + "/api/auth",

		// RESET
		PostResetData: QAPI.Uri + "/api/reset",
	};
};