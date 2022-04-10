// basic "hub" configuration, mapped to "/configuration"
const _server_config_schema = {
	guid: "E09A360C-C143-4E63-B3C5-E5EBDC85CB38",
	name: "dbtemp-trident-hub-0001",
	last_start_date: 1234567890,
	configuration:
	{
		server_version: "dbtemp-trident-server-01",
		defaultGateway: "fe80::10:18ff:fe45:c7ef::11",
		mac_address: "3C-9C-0F-09-33-83",
		ipv4: "100.100.100.1",
		ipv6: "2601:600:8080:9830:b4cc:2e19:705f:7e11",
		subnetMask: "255.255.255.0",
		port: "1137",
		DHCPenabled: "true",
		credentials:
		{
			account: "system",
			password: "system"
		},
		applications: {
			install_location: "//dbtemp-server/web-app/host",
			app_host: "node-x-server.exe",
			app_location: "//dbtemp-server/web-app/app",
			app_uri: "https://100.100.100.1:80",
			api_location: "//dbtemp-server/web-app/api",
			api_uri: "https://100.100.100.1:81",
		}
	},
	paths: {
		firmware: "//dbtemp-server/firmware/[version]/",
		reports: "//dbtemp-server/reporting/",
		archive: "//dbtemp-server/archive/",
		devices: "//dbtemp-server/devices/",
		logging: "//dbtemp-server/logging/"
	},
	devices: [
		"12931AD7-D197-4749-A53E-DCD900EA3AF3",
		"22931AD7-D197-4749-A53E-DCD900EA3AF3",
		"32931AD7-D197-4749-A53E-DCD900EA3AF3"
	],
	connectors: [
		"A07DCB70-0CA0-423E-B29E-1B478D2B24A4",
		"B07DCB70-0CA0-423E-B29E-1B478D2B24A4",
		"C07DCB70-0CA0-423E-B29E-1B478D2B24A4"
	],
};

// per device, mapped to "/devices/[ID]"
const _device_schema =
{	
	device_id: "32931AD7-D197-4749-A53E-DCD900EA3AF3",
	device_instance_id: "32931AD7-D197-4749-A53E-DCD900EA3AF9",
	name: "Friendly Device Name",
	location: "Building 44, Room 12, Area 3, Station 1c",
	defaultGateway: "fe80::10:18ff:fe45:c7ef%11",
	mac_address: "3C-9C-0F-09-33-83",
	ipv4: "100.100.100.1",
	ipv6: "2601:600:8080:9830:b4cc:2e19:705f:7e11",
	subnetMask: "255.255.255.0",
	port: "1137",
	DHCPenabled: "true",
	online_status: true,
	last_reboot_date: 1234567890,
	current_hub: "E09A360C-C143-4E63-B3C5-E5EBDC85CB38",
	archive_data_location: "//dbtemp-server/trident/devices/[device-id]/[year]/[month]/[day]/data",
	archive_image_location: "//dbtemp-server/trident/devices/[device-id]/[year]/[month]/[day]/images",
	diagnostic: {
		//	"install_date" firmware install date
		//	"firmware_version" dbtemp Firmware version
		//	"ruleset_engine" dbtemp Rules engine version
		//	"rules" General rules based on 2d coordinate system, x,y location and h,w dimensions based on camera resolutions
		//	this is a source of techincal challenge, transforming on-device coordinate data with UI coordinate data 
		//  "hardware specific data" TBD: information related to internal hardware quality
		install_date: 1234567890,
		firmware_version: "abcd-1234",
		firmware_instance_version: "abcd-1234-5678",
		protocol: {},
		camera: {},
		sensor: {},
	},
	ruleset_engine: "trident-001-001",
	rules: [
		{
			name: "rule one",
			frame: {
				top: 0,
				bottom: 2160,
				left: 0,
				right: 4096
			},
		},
		{
			name: "rule two",
			frame: {
				top: 1080,
				bottom: 1180,
				left: 1948,
				right: 2148,
			}
		},
		{
			name: "rule three",
			frame: {
				top: 1024,
				bottom: 1224,
				left: 1024,
				right: 1224,
			}
		},
		{
			name: "rule four",
			frame: {
				top: 500,
				bottom: 700,
				left: 800,
				right: 1100,
			}
		}
	],
	notifications: {
		critical: {
			count: 33,
			last_date_sent: 1234567890
		},
		warning: {
			count: 33,
			last_date_sent: 1234567890
		},
		normal: {
			count: 33,
			last_date_sent: 1234567890
		},
		diagnostic: {
			count: 33,
			last_date_sent: 1234567890
		},
	},
};
// device list, mapped to "/devices"
const _device_list_schema = [
	{
		id: "12931AD7-D197-4749-A53E-DCD900EA3AF3",
		name: "Friendly Device Name 1",
		location: "Building 1, Room 12, Area 3, Station 1c",
		firmware: "abcd-1234",
		online_status: true,
		notifications: {
			critical: {
				count: 31,
			},
			warning: {
				count: 32,
			},
			normal: {
				count: 44,
			},
			diagnostic: {
				count: 55,
			},
		},
	},
];

//	per external "connector" - HMI, CMMS, PLC, etc.
//	mapped to "/connectors/[ID]"
//	future - may support third party plugin API connectors
const _connector_schema = {
	guid: "B07DCB70-0CA0-423E-B29E-1B478D2B24A4",
	name: "Product specific name",
	description: "Lorum Ipsum Caliente",
	connector: {
		name: "GE Factory CMMS",
		type: "CMSS", // "HMI", "PLC", "OTHER"
		credentials: {
			account: "dbtemp-hub-001-account",
			password: "9bI*9eGpxbdW",
			pin: "12345678"
		},
		connection_string: "ocp:tcp//comp-x-floor-5-hmi:7531",
		connection_address: "255.255.255.255",
		connection_port: "65535",
		connection_type: "custom", // "api", "database", "custom", "file server"
		// "custom" for trident based current client information
		connection_config:
		{
			message_format: "text",
			attachment:
			{
				supported: true,
				format: "jpg", // "mov", "mp4", 
			},
			message_template:
			{
				"message_title": "Misalignment alert",
				"message_body": "Device 1234566 at location B3-N5 noticed a misalignment on area 6b",
				"asset_id": "pallete #479",
				"asset_location": "Building 4, Room 3, Section H",
				"attachment": "//system//archive//device//{id}//{date}//image-{A48D3AD7-C354-40C8-8C18-403C752E0158}.jpg",
				"call": "INSERT INTO NoticationTable2 (AlertID, AlertTitle, AlertBody, AlertAttachment, AlertPriority, Asset, AssetLocation, AlertDateTime) VALUES(new GUID(), [message_title], [message_title], [attachment], [asset_id], [asset_location], getTime() );"
			}
		}
	},
};
//	connectors list, mapped to "/connectors"
const _connector_list_schema = [
	{
		guid: "a07DCB70-0CA0-423E-B29E-1B478D2B24A4",
		name: "Connector Name 1",
		description: "Lorum Ipsum Caliente",
		connector_type_name: "HMI",
		notifications: {
			critical: {
				count: 31,
			},
			warning: {
				count: 32,
			},
			normal: {
				count: 44,
			},
			diagnostic: {
				count: 55,
			},
		},
	},
];


//	notification management TBD
const _notifications_schema = {
	guid: "05B16C65-4797-4143-B0D7-314CB800726B",
	timestamp: 1123456789, 
	status: "critical", // "diganostic", "informational", "warning", "critical"
	device_name: "Device 101",
	device_guid: "12931AD7-D197-4749-A53E-DCD900EA3AF3",
	device_location: "Building 4, Floor 3, Area 14C",
	text: "Rule #14 is out of compliance by 15%",
	attachment: "//dbtemp/trident/reporting/[device-guid]/[date-time-stamp]/[file-path.jpg]", // base 64?
};
const _notifications_list_schema = [
	{
		guid: "05B16C65-4797-4143-B0D7-314CB800726B",
		timestamp: 1123456789,
		status: "critical",
		device_name: "Device 101",
		device_guid: "12931AD7-D197-4749-A53E-DCD900EA3AF3",
		device_location: "Building 4, Floor 3, Area 14C",
		text: "Rule #14 is out of compliance by 15%",
		attachment: "//dbtemp/trident/reporting/[device-guid]/[date-time-stamp]/[file-path.jpg]"
	}
];


//	reporting management TBD
const _reporting_schema = {
	id: "7ACFE760-ACF4-47CB-B901-B9CEE5199A0F",
	type: "",
};

export 
{
	_device_schema as DeviceSchema,
	_device_list_schema as DevicesSchema,
	_connector_schema as ConnectorSchema,
	_connector_list_schema as ConnectorsSchema,
	_notifications_schema as NotificationSchema,
	_notifications_list_schema as NotifcationsSchema,
	_server_config_schema as ServerConfigSchema,
	_reporting_schema as ResportingSchema,
};