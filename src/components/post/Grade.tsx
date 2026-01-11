import RawGrade, { type GradeProps } from "./ClimbingLog/Grade"
export type { GradeProps } from "./ClimbingLog/Grade"

const Grade = (props: GradeProps) => <RawGrade {...props} />

export default Grade
