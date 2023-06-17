export interface RouteParamsProps {
    id: string,
    token?: string,
}

export interface ClassDataProps {
    grading?: Object,
}


export interface ClassroomProps {
    token: string,
    className: string,
    instructor: string,
    createDate: string,
    feedbackLevel: number,
}

export interface ClassroomInstProps {
    itoken: string,
    token: string,
    className: string,
    instructor: string,
    feedback: boolean,
    createDate: string,
    feedbackLevel: number,
    point: number,
    dueDate: string,
}

export interface ClassroomInstTokenProps {
    itoken: string,
}

export type Order = 'asc' | 'desc';

export interface EnhancedTableProps {
    order: Order,
    orderBy: string,
    keyGroup: string[],
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof ResultKeyProps) => void,
}

export interface ResultKeyProps {
    studentNum: string,
    result: number,
}

export interface GradingResultProps {
    [key: string]: GradingResultProps,
    id: string,
    token: string,
    isDirect: string,
    studentNum: string,
    className: string,
    feedbackLevel: number,
    gradingDate: string,
    result: number,
    point: number,
    count: {
        deductedPoint: number,
    } | undefined,
    delay: {
        deductedPoint: number,
    } | undefined,
    compile: {
        deductedPoint: number,
    } | undefined,
    oracle: {
        deductedPoint: number,
        violationNumber: [],
        checksumNumber: [],
    } | undefined,
    classes: {
        deductedPoint: number,
    } | undefined,
    methods: {
        deductedPoint: number,
    } | undefined,
    packages: {
        deductedPoint: number,
    } | undefined,
    customException: {
        deductedPoint: number,
    } | undefined,
    customStructure: {
        deductedPoint: number,
    } | undefined,
    inheritInterface: {
        deductedPoint: number,
    } | undefined,
    inheritSuper: {
        deductedPoint: number,
    } | undefined,
    overriding: {
        deductedPoint: number,
    } | undefined,
    overloading: {
        deductedPoint: number,
    } | undefined,
    thread: {
        deductedPoint: number,
    } | undefined,
    javadoc: {
        deductedPoint: number,
    } | undefined,
    encapsulation: {
        deductedPoint: number,
    } | undefined,
}

export interface ClassroomOracle {
    itoken: string,
    className: string,
    instructor: string,
    createDate: string,
    dueDate: string,
    point: number,
    oracle: {
        state: boolean,
        deductPoint: number,
        input: [],
        output: [],
        checksum: [],
        filePath: [],
    } | undefined,
}

export interface GradingPolicyProps {
    itoken: string,
    token: string,
    className: string,
    instructor: string,
    feedback: boolean,
    createDate: string,
    dueDate: string,
    point: number,
    compiled: {
        state: boolean,
        buildTool: boolean,
        deductPoint: number,
    },
    oracle: {
        state: boolean,
        input: string[],
        output: string[],
        checksum: string[],
        filePath: string[],
        deductPoint: number,
        maxDeduct: number,
    },
    packages: {
        state: boolean,
        required: string[],
        deductPoint: number,
        maxDeduct: number,
    },
    classes: {
        state: boolean,
        required: string[],
        deductPoint: number,
        maxDeduct: number,
    },
    methods: {
        state: boolean,
        required: string[],
        count: number[],
        classes: string[],
        deductPoint: number,
        maxDeduct: number,
    },
    customException: {
        state: boolean,
        required: string[],
        deductPoint: number,
        maxDeduct: number,
    },
    customStructure: {
        state: boolean,
        required: string[],
        deductPoint: number,
        maxDeduct: number,
    },
    overriding: {
        state: boolean,
        required: string[],
        deductPoint: number,
        maxDeduct: number,
    },
    overloading: {
        state: false,
        required: string[],
        deductPoint: number,
        maxDeduct: number,
    },
    thread: {
        state: boolean,
        deductPoint : number,
    },
    javadoc: {
        state: boolean,
        deductPoint : number,
    },
    encapsulation: {
        state: boolean,
        deductPoint : number,
    },
    inheritSuper: {
        state: boolean,
        origins: string[],
        inherit: string[],
        deductPoint: number,
        maxDeduct: number,
    },
    inheritInterface: {
        state: boolean,
        origins: string[],
        inherit: string[],
        deductPoint: number,
        maxDeduct: number,
    },
    count: {
        state: boolean,
        methodCount: number,
        fieldCount: number,
        enForCount: number,
        deductPoint: number,
    },
    feedbackLevel: number,
}

export interface GradingFeedbackProps {
    token: string,
    studentNum: string,
    first: {
        line: string,
        suspicious: number,
        lineNum: number,
        file: string
    },
    second: {
        line: string,
        suspicious: number,
        lineNum: number,
        file: string
    },
    third: {
        line: string,
        suspicious: number,
        lineNum: number,
        file: string
    }
}