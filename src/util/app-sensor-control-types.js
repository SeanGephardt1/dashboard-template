const _sensor_control_types = Object.freeze( {
	Unknown: { name: "Unknown control", value: -1 },
	Base: { name: "Base control", value: 0 },
	ImageMatch: { name: "Image Match control", value: 1 },
	LineMatch: { name: "Line Match control", value: 2 },
	MotionTrack: { name: "Motion Tracker control", value: 3 },
	Lights: { name: "Lights control", value: 4 },
	ShapeDetect: { name: "Shape Detection control", value: 5 },
	VoteControl: { name: "Voting control", value: 6 },
	Luminance: { name: "Luminance control", value: 7 },
	EdgeDetect: { name: "edge Detection control", value: 8 },
	Finder: { name: "Finder control", value: 9 },
	QuandrantDetect: { name: "Quandrant Detection control", value: 10 },
	NullControl: { name: "NULL control", value: 11 },
	ThresholdControl: { name: "Threshold control", value: 12 }
} );
export
{
	_sensor_control_types as SensorControlTypes
};

//	LAST UPDATED 10/27/2021

//	https://dbtempai.sharepoint.com/sites/Development/_layouts/15/Doc.aspx?OR=teams&action=edit&sourcedoc={736AF73C-423B-4D5A-AC1B-CFF501DFAFAD}

//[ 2: 28 PM ] John Pella
//enum class QCONTROLTYPE
//{
//	BASE = 0,
//	ImageMatch = 1,
//	LineMatch = 2,
//	MotionTrack = 3,
//	Lights = 4,
//	ShapeDetect = 5,
//	VoteControl = 6,
//	Luminance = 7,
//	EdgeDetect = 8,
//	Finder = 9,
//	QuadrantDetect = 10,
//	Null = 11,
//	Threshold = 12,
//	Unknown,
//};

