export type Subjects = {
    id?: string,
    subID: string,
    subTeacherID: string,
    subName: string,
    subFaculty: string,
    subMajor: string,
    subSectionID: string,
    subMiddate?: Date,
    subFinaldate?: Date,
    subTerm: string,
    subStatus: string
    examStdCount: number,
    examStartDate: string,
    examEndDate : string,
    examRoom: string,
    examFileMidURL?: string,
    examFileFinalURL?: string,
    examDetail?: string,
    createAt?: Date,
    updateAt?: Date
}