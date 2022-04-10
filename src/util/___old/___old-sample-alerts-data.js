//  import TestPicture2 from './test-image-02.jpg';
import TestPicture2 from './test-image-02-4k.jpg';

const ControlTypes = {
    Identifier: "Trigger",
    Area: "RectArea",
    ComplexArea: "PolyArea",
    RoundArea: "CircleArea"
};

const ControlStatus = {
    OK: 0,
    Informational: 1,
    Warning: 2,
    Error: 3
};

const ReportTypes = {
    Movement: "movement",
    Obstruction: "obstruction",
    Connection: "connection"
};

const _reporting_data = [
    {
        id: "0381FC7C",
        dbtemp_guid: "0381FC7C-ABB9-41B4-980F-36043B59A989",
        ex_sys_id: "89C77627-1759-48F4-B117-4A0E78502487",
        timestamp: new Date(),
        report_type: ReportTypes.Movement,
        status: "Open",
        severity: "Minor",
        assigned_to: "Unassigned", 
        deviation_type: "Alignment issue",
        description: "dbtemp has detected part # abc-13579 is misaligned. ",
        base_image: TestPicture2,
        location: [
            "BODY SHOP 2",
            "BODY SIDE MAIN LH",
            "325 587 BODY SIDE MAIN LH",
            "CONV-BLEICHERT-11",
            "CONV-BLEICHERT-PALLET-127"
        ],
        controls: [
            {
                name: "Area 1",
                type: ControlTypes.Area,
                status: ControlStatus.Error,
                x: 276, y: 100, h: 200, w: 200
            },
            {
                name: "Area 2",
                type: ControlTypes.Area,
                status: ControlStatus.OK,
                x: 890, y: 140, h: 200, w: 200
            },
            {
                name: "Area 3",
                type: ControlTypes.Area,
                status: ControlStatus.OK,
                x: 1450, y: 100, h: 200, w: 300,
            },
            {
                name: "Area 4",
                type: ControlTypes.Area,
                status: ControlStatus.OK,
                x: 140, y: 450, h: 300, w: 400,
            },
            {
                name: "Area 5",
                type: ControlTypes.Area,
                status: ControlStatus.OK,
                x: 1340, y: 350, h: 340, w: 400,
            },
            {
                name: "Area 6",
                type: ControlTypes.Area,
                status: ControlStatus.OK,
                x: 820, y: 650, h: 140, w: 300,
            },
            {
                name: "Area 7",
                type: ControlTypes.Area,
                status: ControlStatus.OK,
                x: 560, y: 250, h: 230, w: 380,
            },
        ],
        boundary_normal: [
            [ 602, 293 ],
            [ 694, 300 ],
            [ 698, 320 ],
            [ 728, 324 ],
            [ 728, 336 ],
            [ 744, 342 ],
        ],
        boundary_tolerance: [],
        boundary_deviation: [],
    },
    {
        id: "89C77627",
        dbtemp_guid: "1381FC7C-ABB9-41B4-980F-36043B59A989",
        ex_sys_id: "C32EE225-D3CA-451F-9233-3D7C96956007",
        timestamp: new Date(),
        report_type: ReportTypes.Movement,
        status: "Online",
        severity: "Major",
        assigned_to: "Unassigned",
        deviation_type: "Alignment issue",
        description: "dbtemp has detected part # abc-13579 is misaligned. ",
        base_image: TestPicture2,
        location: [
            "BODY SHOP 2",
            "BODY SIDE MAIN RH",
            "325 587 BODY SIDE MAIN RH",
            "CONV-BLEICHERT-9",
            "CONV-BLEICHERT-PALLET-131"
        ],
        controls: [
            {
                name: "Area 1",
                type: ControlTypes.Area,
                status: ControlStatus.OK,
                x: 276, y: 100, h: 200, w: 200
            },
            {
                name: "Area 2",
                type: ControlTypes.Area,
                status: ControlStatus.OK,
                x: 890, y: 140, h: 200, w: 200
            },
            {
                name: "Area 3",
                type: ControlTypes.Area,
                status: ControlStatus.OK,
                x: 1450, y: 100, h: 200, w: 300,
            },
            {
                name: "Area 4",
                type: ControlTypes.Area,
                status: ControlStatus.OK,
                x: 140, y: 450, h: 300, w: 400,
            },
            {
                name: "Area 5",
                type: ControlTypes.Area,
                status: ControlStatus.Error,
                x: 1340, y: 350, h: 340, w: 400,
            },
            {
                name: "Area 6",
                type: ControlTypes.Area,
                status: ControlStatus.OK,
                x: 820, y: 650, h: 140, w: 300,
            },
            {
                name: "Area 7",
                type: ControlTypes.Area,
                status: ControlStatus.OK,
                x: 560, y: 250, h: 230, w: 380,
            },
        ],
        boundary_normal: [
            [ 100, 100 ],
            [ 200, 100 ],
            [ 300, 200 ],
            [ 400, 150 ],
            [ 300, 350 ],
            [ 200, 327 ],
            [ 100, 277 ],
        ],
        boundary_tolerance: [],
        boundary_deviation: [],
    },
    {
        id: "2381FC7C",
        dbtemp_guid: "2381FC7C-ABB9-41B4-980F-36043B59A989",
        ex_sys_id: "E2007059-BA08-476A-A47B-A6AB718ED325",
        timestamp: new Date(),
        report_type: ReportTypes.Movement,
        status: "Online",
        severity: "Major",
        assigned_to: "Unassigned",
        deviation_type: "Alignment issue",
        description: "dbtemp has detected part # abc-13579 is misaligned. ",
        base_image: TestPicture2,
        location: [
            "BODY SHOP 2",
            "BODY SIDE MAIN LH",
            "325 587 BODY SIDE MAIN (merged)",
            "CONV-BLEICHERT-31",
            "CONV-BLEICHERT-PALLET-991"
        ],
        controls: [
            {
                name: "Area 1",
                type: ControlTypes.Area,
                status: ControlStatus.OK,
                x: 276, y: 100, h: 200, w: 200
            },
            {
                name: "Area 2",
                type: ControlTypes.Area,
                status: ControlStatus.OK,
                x: 890, y: 140, h: 200, w: 200
            },
            {
                name: "Area 3",
                type: ControlTypes.Area,
                status: ControlStatus.OK,
                x: 1450, y: 100, h: 200, w: 300,
            },
            {
                name: "Area 4",
                type: ControlTypes.Area,
                status: ControlStatus.OK,
                x: 140, y: 450, h: 300, w: 400,
            },
            {
                name: "Area 5",
                type: ControlTypes.Area,
                status: ControlStatus.OK,
                x: 1340, y: 350, h: 340, w: 400,
            },
            {
                name: "Area 6",
                type: ControlTypes.Area,
                status: ControlStatus.OK,
                x: 820, y: 650, h: 140, w: 300,
            },
            {
                name: "Area 7",
                type: ControlTypes.Area,
                status: ControlStatus.Error,
                x: 560, y: 250, h: 230, w: 380,
            },
        ],
        boundary_normal: [
            [ 200, 200 ],
            [ 400, 200 ],
            [ 400, 400 ],
            [ 200, 400 ],
        ],
        boundary_tolerance: [],
        boundary_deviation: [],
    },
    {
        id: "9381FC7D",
        dbtemp_guid: "2381FC7C-ABB9-41B4-980F-36043B59A989",
        ex_sys_id: "BD381A25-848F-42B0-883F-15FA00E05C73",
        timestamp: new Date(),
        report_type: ReportTypes.Movement,
        status: "Online",
        severity: "Minor",
        assigned_to: "Unassigned",
        deviation_type: "Alignment issue",
        description: "dbtemp has detected part # abc-13579 is misaligned. ",
        base_image: TestPicture2,
        location: [
            "BODY SHOP 2",
            "BODY SIDE MAIN LH",
            "325 587 BODY SIDE MAIN (pre-merged)",
            "CONV-BLEICHERT-27",
            "CONV-BLEICHERT-PALLET-754"
        ],
        controls: [
            {
                name: "Area 1",
                type: ControlTypes.Area,
                status: ControlStatus.OK,
                x: 276, y: 100, h: 200, w: 200
            },
            {
                name: "Area 2",
                type: ControlTypes.Area,
                status: ControlStatus.OK,
                x: 890, y: 140, h: 200, w: 200
            },
            {
                name: "Area 3",
                type: ControlTypes.Area,
                status: ControlStatus.OK,
                x: 1450, y: 100, h: 200, w: 300,
            },
            {
                name: "Area 4",
                type: ControlTypes.Area,
                status: ControlStatus.OK,
                x: 140, y: 450, h: 300, w: 400,
            },
            {
                name: "Area 5",
                type: ControlTypes.Area,
                status: ControlStatus.Error,
                x: 1340, y: 350, h: 340, w: 400,
            },
            {
                name: "Area 6",
                type: ControlTypes.Area,
                status: ControlStatus.OK,
                x: 820, y: 650, h: 140, w: 300,
            },
            {
                name: "Area 7",
                type: ControlTypes.Area,
                status: ControlStatus.Error,
                x: 560, y: 250, h: 230, w: 380,
            },
        ],
        boundary_normal: [],
        boundary_tolerance: [],
        boundary_deviation: [],
    },
];

export
{
    TestPicture2,
    ControlTypes,
    ControlStatus,
    ReportTypes,
    _reporting_data as SampleReportingData
};