export class Task {
    constructor(
        public id: number,
        public number: string,
        public description: string,
        public status: string,
        public dateEnd: Date,
        public createTime: Date) {}
}
